import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { InputNew } from "../utils/InputNew";
import { NewTitulo } from "../components/form/NewTitulo";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ItemSeleccionable } from "../utils/ItemSeleccionable";
import { useSelector } from 'react-redux';
import { SignBoton } from "../components/Subcomponents/SignBoton";
import { Toaster } from "sonner";
import { RootState, useAppDispatch } from "../store/store";
import { Api } from "../services/Api";
import { setItems } from "../store/select";
import { selected, unselect } from "../store/empresas";
import { ButtonNew } from "../utils/ButtonNew";
import { InputDate } from "../utils/InputDate";
import { CarroSeleccionable } from "../utils/CarroSeleccionable";
import { CreateBoton } from "../components/Subcomponents/CreateBoton";
import { Navigate, useNavigate } from "react-router-dom";
import { clearSelectedUsers } from "../store/form";

export  const NewServiceForm = () => {
  
  const navigate = useNavigate();

  // Almacenar informacion de las llamadas de la Api
  const [chequeaEsto, setChequea] = useState<any[]>([]);
  const [fotos, setFotos] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [carro, setCarro] = useState<string>('');
  const [companis, setEmpresas] = useState<any[]>([]);
  const [sucursaless, setSucursales] = useState<any[]>([]);
  const [selectionCompani, setSelected] = useState<any>({}); 
  const [sucusal_compani, setSucursalCompani] = useState<any>({}); 


  //Traer datos del store
  const token = useSelector((state: RootState) => state.auth.token);
  const usuariosState = useSelector((state: RootState) => state.select.items);
  const empresaState = useSelector((state: RootState) => state.empresas.empresas);

  //Despacho judicial
  const dispatch = useAppDispatch();

  const nombresCompanis = companis.map(empresarios_modestos => empresarios_modestos.nombre_empresa);
  // const vendedorsito = vendedores.map(objetito => objetito.nombre_vendedor);
  const carroChequeado = fotos.find(objeto => objeto.chequeado === true)?.modelo;


  //cambiar estado del vehiculo seleccionado
  const chequearCarro = (id: number, field: string, setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void) => {
    if (field === "carro") {
      setFotos(prevFotos =>
        prevFotos.map(foto =>
          foto.id === id ? { ...foto, chequeado: !foto.chequeado } : { ...foto, chequeado: false }
        )
      );
      const carrito = fotos.find(carrito => carrito.id === id).modelo;
      if (fotos.find((carrito: any) => carrito.id === id).chequeado) {
        setFieldValue(field, '');
      } else {
        setFieldValue(field, carrito);
        setCarro(carrito);
      }
    }

  };
  
  const manejarSelect = (field: string, value: string, setFieldValue: (field: any, value: string, shouldValidate?: boolean | undefined) => void) => {
    dispatch(unselect());
    if (field === "empresa") {
      const CompaniSelected = companis.find(empresas => empresas.nombre_empresa === value);
      setSelected(CompaniSelected);
      const nombresSucursales = CompaniSelected?.sucursales.map((sucursales: any) => sucursales.nombre_sucursal);
      setSucursales(nombresSucursales);
      setFieldValue(field, value);
    }
    if (field === 'sucursal') {
      const company_sucursal = (selectionCompani as any).sucursales.find((sucursal: any) => sucursal.nombre_sucursal === value);
      const company = {
        id_empresa: selectionCompani.id_empresa,
        nombre_empresa: selectionCompani.nombre_empresa,
        sucursales: company_sucursal ? [company_sucursal] : []
      };
      setSucursalCompani(company);
      setFieldValue(field, value);
      dispatch(selected(company));
    }


  };
  

  const selection = (id: number) => {
    const updatedUsers =  users.map(user => user.id ===id ? {...user, isSelected: !user.isSelected} : user);
    dispatch(setItems(updatedUsers));
    setUsers(updatedUsers);
  }

  const fetchAll = async () => {
    if (!token) {
      console.error('Token is null or undefined');
      return;
    }
    try {
      const response = await Api.withToken('get', token);
      const usuarios = response.data.personal.map((user: any) => ({
          id: user.id,
          name: user.nombre,
          departamento: user.departamento,
          isSelected: usuariosState.find((storedUser: any) => storedUser.id === user.id)?.isSelected || false,
        }));
      setUsers(usuarios);      
       const empresas = response.data.empresas_sucursales.map((empresas: any) => ({
          id_empresa: empresas.id_empresa,
          nombre_empresa: empresas.nombre_empresa,
          sucursales: empresas.sucursales.map((sucursales: any) => ({
            id_sucursal: sucursales.id_sucursales,
            nombre_sucursal: sucursales.nombre,
            direccion_sucursal: sucursales.direccion,
            enlace_sucursal: sucursales.enlace,
            telefono_sucursal: sucursales.telefono,
          })),
      }));
      setEmpresas(empresas);
      try {
        const response = await Api.withToken('fotos', token);
        const fotosCarro = response.data.fotos.map((carros: any) => ({
          id: carros.carro_id ,
          modelo: carros.modelo,
          fotoUrl: carros.ruta,
          descripcion: carros.descripcion,
          chequeado: false,
        }));
        setFotos(fotosCarro);    
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
  }
    useEffect(() => {
      fetchAll();
    }, [token]);

  const validationSchema = Yup.object({
    nombre_proyecto: Yup.string().required("Por favor ingrese el titulo del proyecto"),
    empresa: Yup.string().required("Por favor seleccione una empresa"),
    sucursal: Yup.string().required("Por favor elija la sucursal"),
    resume: Yup.string(),
    fecha_inicial: Yup.date().min(new Date(), 'La fecha debe ser posterior a la fecha actual').required('Por favor ingrese una fecha de inicio'),
    fecha_final: Yup.date().min(new Date(), 'La fecha debe ser posterior a la fecha actual').required('Por favor seleccione una ficha de finalización'),
    vendedor: Yup.string().required("Este campo no puede quedar vacío"),
    carro: Yup.string().required('Por favor seleccione un vehiculo'),
  })


  const valoresIniciales = {
    nombre_proyecto: '',
    empresa: '',
    sucursal: '',
    resume: '',
    fecha_inicial: '',
    fecha_final: '',
    vendedor: '',
    inconveniente: '',
    carro: '',
  }

  const onSubmit = async (values: typeof valoresIniciales, ) => {
    const selectedItems = users.filter(user => user.isSelected === true);
    const personal = selectedItems.map((item: {name: string}) => item.name);
    
    const mensaje = {
      ...values,
      personal: personal,
      vehiculo: carroChequeado,
    }
    try {
      const response = await Api.postActivitie('new_activity', mensaje, token);
      if (response.statusCode === 200) {
       navigate('/welcome');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const groupedUnselectedItems = users.reduce((acc: { [key: string]: any[] }, item) => {
    if (!acc[item.departamento]) {
      acc[item.departamento] = [];
    }
    acc[item.departamento].push(item);
    return acc;
  }, {});

  const column1: JSX.Element[] = [];
  const column2: JSX.Element[] = [];

  Object.entries(groupedUnselectedItems).forEach(([departamento, items]: [string, any], index: number) => {
    const columnContent = (
      <div key={departamento} className="w-full pl-4 space-y-2 py-2">
        <h2 className="font-josefin py-3 font-bold">{departamento}</h2>
        <div className="flex flex-col">
          {items.map((item: any) => (
            <div key={item.id} className="col-span-1">
              <ItemSeleccionable
                key={item.id}
                name={item.name}
                selected={() => selection(item.id)}
                isSelected={item.isSelected}
              />
            </div>
          ))}
        </div>
      </div>
    );

    if (index % 2 === 0) {
      column1.push(columnContent);
    } else {
      column2.push(columnContent);
    }
  });

  return (
    <div className="w-screen h-screen overflow-hidden fixed text-black flex flex-col items-center bg-gradient-to-t from-gray-300 to-colores-pantalla-form px-7">
      <Navbar/>
      <Toaster/>
      <div className="flex flex-col w-full h-full">
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={valoresIniciales}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
            <form onSubmit={handleSubmit} className="space-y-6 h-full">
              <div className="flex w-full pt-3 h-full items-center justify-center">
                <div className="w-[70%] h-full pb-24 pr-4 flex flex-col overflow-y-auto">
                  <div className="space-y-4 h-full overflow-y-auto pr-4 pb-8">
                    <NewTitulo texto="NUEVO SERVICIO"/>
                    <InputNew value={values.nombre_proyecto} onChange={handleChange} error={errors.nombre_proyecto} texto="Titulo del proyecto" name="nombre_proyecto" type="text" />
                    <div className="flex flex-row w-full h-auto">
                    <ButtonNew value={values.empresa} onChange={handleChange} error={errors.empresa} name="empresa" type="text" texto="Empresa"  options={nombresCompanis} label="Seleccione una empresa" onSelect={(value) => manejarSelect("empresa" ,value, setFieldValue)}/>
                    <ButtonNew value={values.sucursal} onChange={handleChange} error={errors.sucursal} name="sucursal" type="text" texto="Sucursal"  options={sucursaless} label="Seleccione una sucursal" onSelect={(value) => manejarSelect('sucursal', value,setFieldValue)}/>
                    </div>
                    <InputNew value={values.resume} onChange={handleChange} error={errors.resume} rows={5} texto="Resumen del proyecto" name="resume" type="text" css="h-auto P-2" center="items-start"/>
                    <NewTitulo texto="VENDEDOR"/>
                    <div className="w-3/4">
                      <InputNew value={values.vendedor} onChange={handleChange} error={errors.vendedor} name="vendedor" type="text" texto="Vendedor"/>
                    </div>
                    <NewTitulo texto="PERSONAL ENCARGADO"/>
                    {users.length > 0 ? (
                        <div className={`w-[100%] overflow-hidden flex flex-col`}>
                          <div className={`w-full flex pt-5`} style={{ height: `${users.length * 56}px` }}>
                          <div className="w-1/2 pr-2 flex flex-col space-y-2">
                            {column1}
                          </div>
                          <div className="w-1/2 pl-2 flex flex-col space-y-2">
                            {column2}
                          </div>
                          </div>
                      </div>
                    ) : (
                      <div className="h-[200px]">
                        <div>Hubo un error al cargar los usuarios</div>
                      </div>
                    )}
                      <br />
                      <NewTitulo texto="VEHICULO"/>
                      
                        <h2 className="text-xl font-josefin pt-1 pb-4 border-b-[1px] border-b-gray-400">Moverse en:</h2>
                        <small className={`text-red-500 text-base font-bold mt-2 visible`}>{errors.carro}</small>
                        
                      <div className="grid grid-cols-3 gap-4 w-full h-auto">
                        {fotos.map((fotito, index) => (
                          <CarroSeleccionable value={values.carro} key={index} modelo={fotito.modelo} imgUrl={fotito.fotoUrl} toggleChecked={() => chequearCarro(fotito.id, "carro", setFieldValue)} chequeado={fotito.chequeado}/>
                        ))}
                      </div>
                    </div>
                </div>
                <div className="w-[30%] h-full pl-3 pb-20">
                  <div className="w-full h-[100%] relative bg-gris rounded-3xl overflow-hidden flex flex-col px-3 pt-10 items-center">
                    <div className={`flex flex-col w-full h-auto items-center z-50 px-5 ${errors.fecha_final || errors.fecha_inicial ? 'space-y-4' : 'space-y-8'}`}>
                      <h1 className="font-marcellus text-white text-3xl">PROGRAMAR FECHA</h1>
                      <br />
                      <InputDate texto="Fecha inicial" name="fecha_inicial" value={values.fecha_inicial} error={errors.fecha_inicial} onChange={handleChange}/>
                      <br />
                      <InputDate texto="Fecha tentativa de finalizado" name="fecha_final" value={values.fecha_final} error={errors.fecha_final} onChange={handleChange}/>
                      <div className="w-full items-center text-center bg-[#262F4B] rounded-2xl py-3 px-3">
                      <InputDate texto="Inconvenientes" name="inconveniente" value={values.inconveniente} type="text" onChange={handleChange}/>
                      </div>
                      <CreateBoton inside="CREAR SERVICIO" type="submit"/>
                    </div>
                    <div className="w-full bottom-0 absolute h-4/6 bg-[#565E78] rounded-tl-full z-0"></div>
                  </div>
                </div>
              </div>
            </form>
            )}
            </Formik>
      </div>
    </div>
  );
};
