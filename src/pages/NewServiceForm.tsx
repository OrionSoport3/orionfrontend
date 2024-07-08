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

export const NewServiceForm = () => {
  
  // Almacenar informacion de las llamadas de la Api
  const [chequeaEsto, setChequea] = useState<any[]>([]);
  const [fotos, setFotos] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
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
  const selectedItems = users.filter(user => user.isSelected);
  const unselectedItems = users.filter(user => !user.isSelected);

  //cambiar estado del vehiculo seleccionado
  const chequearCarro = (id: number) => {
    setFotos(prevFotos =>
      prevFotos.map(foto =>
        foto.id === id ? { ...foto, chequeado: !foto.chequeado } : { ...foto, chequeado: false }
      )
    );
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
      console.log(fotos);
    }, [token]);

  const validationSchema = Yup.object({
    nombre_proyecto: Yup.string().required("Por favor ingrese el titulo del proyecto"),
    empresa: Yup.string().required("Por favor seleccione una empresa"),
    sucursal: Yup.string().required("Por favor elija la sucursal"),
    resume: Yup.string(),
    fecha_inicial: Yup.date().min(new Date(), 'La fecha debe ser posterior a la fecha actual').required('Por favor ingrese una fecha de inicio'),
    fecha_final: Yup.date().min(new Date(), 'La fecha debe ser posterior a la fecha actual').required('Por favor seleccione una ficha de finalización'),
  })


  const valoresIniciales = {
    nombre_proyecto: '',
    empresa: '',
    sucursal: '',
    resume: '',
    fecha_inicial: '',
    fecha_final: ''
  }

  const onSubmit = async (values: typeof valoresIniciales) => {
    const personal = selectedItems.map((item: {name: string}) => item.name);
    const carroChequeado = fotos.find(objeto => objeto.chequeado === true)?.modelo;

    const mensaje = {
      ...values,
      personal: personal,
      vehiculo: carroChequeado,
    }
    console.log(mensaje);
  }

  // Agrupar usuarios no seleccionados por departamento
  const groupedUnselectedItems = unselectedItems.reduce((acc: any, item) => {
    if (!acc[item.departamento]) {
      acc[item.departamento] = [];
    }
    acc[item.departamento].push(item);
    return acc;
  }, {});

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
              <div className="flex w-full pt-3 h-full items-center justify-center  ">
                <div className="w-[70%] h-full pb-24 pr-4 flex flex-col overflow-y-auto">
                  <div className="space-y-4 h-full overflow-y-auto pr-4 pb-8">
                    <NewTitulo texto="NUEVO SERVICIO"/>
                    <InputNew value={values.nombre_proyecto} onChange={handleChange} error={errors.nombre_proyecto} texto="Titulo del proyecto" name="nombre_proyecto" type="text" />
                    <div className="flex flex-row w-full h-auto">
                    <ButtonNew value={values.empresa} onChange={handleChange} error={errors.empresa} name="empresa" type="text" texto="Empresa"  options={nombresCompanis} label="Seleccione una empresa" onSelect={(value) => manejarSelect("empresa" ,value, setFieldValue)}/>
                    <ButtonNew value={values.sucursal} onChange={handleChange} error={errors.sucursal} name="sucursal" type="text" texto="Sucursal"  options={sucursaless} label="Seleccione una sucursal" onSelect={(value) => manejarSelect('sucursal', value,setFieldValue)}/>
                    </div>
                    <InputNew value={values.resume} onChange={handleChange} error={errors.resume} rows={5} texto="Resumen del proyecto" name="resume" type="text" css="h-auto P-2" center="items-start"/>
                    <NewTitulo texto="PERSONAL ENCARGADO"/>
                    {users.length > 0 ? (
                        <div className={`w-[100%] overflow-hidden flex flex-col ${unselectedItems.length > 0 ?  `h-[300px]`: 'h-auto' }`}>
                          <div className="w-full h-auto pb-6 pr-8 flex flex-row border-b-[1px] border-b-gray-400">
                              <h2 className="text-xl font-josefin pt-1">Personal:</h2>
                              <div className="flex flex-wrap h-auto px-3 space-x-3">
                                {selectedItems.map((item) => (
                                  <>
                                  <ItemSeleccionable key={item.id} name={item.name} selected={() => selection(item.id)} isSelected={item.isSelected}/>
                                  </>
                                ))}
                              </div>
                          </div>
                          <div className="w-full h-auto space-y-2 grid grid-cols-2 pt-5">
                          {Object.entries(groupedUnselectedItems).map(([departamento, items]: [string, any]) => (
                            <div key={departamento} className="w-full h-auto pl-4 space-y-2">
                              <h2 className="font-josefin py-3">{departamento}</h2>
                              {items.map((item: any) => (
                                <ItemSeleccionable key={item.id} name={item.name} selected={() => selection(item.id)} isSelected={item.isSelected} />
                              ))}
                            </div>
                          ))}
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
                      <div className="grid grid-cols-3 gap-4 w-full h-auto">
                        {fotos.map((fotito, index) => (
                          <CarroSeleccionable key={index} modelo={fotito.modelo} imgUrl={fotito.fotoUrl} toggleChecked={() => chequearCarro(fotito.id)} chequeado={fotito.chequeado}/>
                        ))}
                      </div>
                    </div>
                </div>
                <div className="w-[30%] h-full pl-3 pb-20">
                  <div className="w-full h-[100%] relative bg-gris rounded-3xl overflow-hidden flex flex-col px-3 pt-10 items-center">
                    <div className="flex flex-col w-full h-auto items-center z-50 px-5 space-y-3">
                      <h1 className="font-marcellus text-white text-3xl">PROGRAMAR FECHA</h1>
                      <br />
                      <InputDate texto="Fecha inicial" name="fecha_inicial" value={values.fecha_inicial} error={errors.fecha_inicial} onChange={handleChange}/>
                      <br />
                      <InputDate texto="Fecha final" name="fecha_final" value={values.fecha_final} error={errors.fecha_final} onChange={handleChange}/>
                      <SignBoton inside="CREAR SERVICIO" type="submit"/>
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
