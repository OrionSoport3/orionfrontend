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

export const NewServiceForm = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Almacenar informacion de las llamadas de la Api
  const [users, setUsers] = useState<any[]>([]);
  const [companis, setEmpresas] = useState<any[]>([]);
  const [sucursaless, setSucursales] = useState<any[]>([]);
  const [selectionCompani, setSelected] = useState<any[]>([]); 
  const [sucusal_compani, setSucursalCompani] = useState<any[]>([]); 


  //Traer datos del store
  const token = useSelector((state: RootState) => state.auth.token);
  const usuariosState = useSelector((state: RootState) => state.select.items);
  const empresaState = useSelector((state: RootState) => state.empresas.empresas);

  //Despacho judicial
  const dispatch = useAppDispatch();

  // buscar propiedades
  const nombresCompanis = companis.map(empresarios_modestos => empresarios_modestos.nombre_empresa);
  const selectedItems = users.filter(user => user.isSelected);
  const unselectedItems = users.filter(user => !user.isSelected);
  

  const manejarSelect = (field: string, value: string, setFieldValue: (field: any, value: string, shouldValidate?: boolean | undefined) => void) => {
    dispatch(unselect());
    if (field === "empresa") {
      const CompaniSelected = companis.find(empresas => empresas.nombre_empresa === value);
      setSelected(CompaniSelected);
      const nombresSucursales = companis.find(empresas => empresas.nombre_empresa === value)?.sucursales.map((sucursales: any) => sucursales.nombre_sucursal);
      setSucursales(nombresSucursales);
      setFieldValue(field, value)
    }
    if (field === 'sucursal') {
      const company_sucursal = selectionCompani.sucursales.find((sucursal: any) => sucursal.nombre_sucursal === value);
      const company = {...selectionCompani, sucursales: company_sucursal};
      setSucursalCompani(company);
      dispatch(selected(sucusal_compani));
      console.log(company);
    }
  };

  const selection = (id: number) => {
    const updatedUsers =  users.map(user => user.id ===id ? {...user, isSelected: !user.isSelected} : user);
    dispatch(setItems(updatedUsers));
    setUsers(updatedUsers);
  }

  const fetchCompanis = async () => {
    if (!token) {
      console.error('El token no es válido');
      return
    }
    try {
      const response = await Api.withToken('companies', token);
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
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw new Error('Failed to fetch companies');
    }
  }
 
  const fetchUsers = async () => {
    if (!token) {
      console.error('Token is null or undefined');
      return;
    }
    try {
      const response = await Api.withToken('get', token);
      const usuarios = response.data.user.map((user: any) => ({
          id: user.id,
          name: user.nombre,
          departamento: user.departamento,
          isSelected: usuariosState.find((storedUser: any) => storedUser.id === user.id)?.isSelected || false,
      }));
     setUsers(usuarios);      
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
  }
    useEffect(() => {
      fetchUsers();
      fetchCompanis();
    }, [token]);

  const validationSchema = Yup.object({
    nombre_proyecto: Yup.string().required("Por favor ingrese el titulo del proyecto"),
    empresa: Yup.string().required("Por favor seleccione una empresa"),
    sucursal: Yup.string().required("Por favor elija la sucursal"),
    resume: Yup.string()
  })

  const valoresIniciales = {
    nombre_proyecto: '',
    empresa: '',
    sucursal: '',
    resume: '',
  }

  const onSubmit = async (values: typeof valoresIniciales) => {

  }

  return (
    <div className="w-screen h-screen fixed text-black flex flex-col items-center bg-gradient-to-t from-gray-300 to-colores-pantalla-form px-7">
      <Navbar/>
      <Toaster/>
      <div className="flex w-full h-full">
        <div className="flex w-full items-center justify-center mt-4 ">
          <div className="w-[70%] h-[95%] overflow-y-auto pb-10 pr-4">
            <Formik
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <NewTitulo texto="NUEVO SERVICIO" />
                <InputNew value={values.nombre_proyecto} onChange={handleChange} error={errors.nombre_proyecto} texto="Titulo del proyecto" name="nombre_proyecto" type="text" incheck={false} />
                <div className="flex flex-row w-full h-auto">
                <InputNew value={values.empresa} onChange={handleChange} error={errors.empresa} name="empresa" type="text" texto="Empresa" incheck options={nombresCompanis} label="Seleccione una empresa" onSelect={(value) => manejarSelect("empresa" ,value, setFieldValue)}/>
                <InputNew value={values.sucursal} onChange={handleChange} error={errors.sucursal} name="sucursal" type="text" texto="Sucursal" incheck options={sucursaless} label="Seleccione una sucursal" onSelect={(value) => manejarSelect('sucursal', value,setFieldValue)}/>
                </div>
                <InputNew value={values.resume} onChange={handleChange} error={errors.resume} texto="Resumen del proyecto" name="resume" type="text" incheck={false} css="h-24" center="items-start"/>
                <NewTitulo texto="PERSONAL ENCARGADO"/>
                {users.length > 0 ? (
                    <div className="w-full h-auto flex flex-col">
                      <div className="w-full h-auto pb-6 pr-8 flex flex-row border-b-[1px] border-b-gray-400">
                          <h2 className="text-xl font-josefin pt-1">Personal:</h2>
                          <div className="flex flex-wrap h-auto px-3 space-x-3">
                            {selectedItems.map((item) => (
                              <>    
                              <ItemSeleccionable key={item.id} name={item.name} selected={() => selection(item.id)} isSelected={item.isSelected} />
                              </>
                            ))}
                          </div>
                      </div>
                      <div className="w-full h-auto space-y-2 pt-5">
                        {unselectedItems.map((item, index) => (
                          <div key={item.id} className="w-full h-auto pl-4">
                             {index === 0 || item.departamento !== unselectedItems[index - 1].departamento ? (
                              <h2 className="font-josefin py-3">{item.departamento}</h2>
                            ) : null}
                            <ItemSeleccionable key={item.id} name={item.name} selected={() => selection(item.id)} isSelected={item.isSelected}/>
                          </div>
                        ))}
                      </div>
                          {/* <h2>Fetched usuarios: {`usuarios: ${JSON.stringify(users)}`}</h2> */}
                    </div>
                  ) : (
                    <>
                    <div>Hubo un error al cargar los usuarios</div>
                    </>
                  )}
              <SignBoton inside="Crear" type="submit"/>
              </form>
            )}
            </Formik>
          </div>
          <div className="w-[30%] h-full">
          </div>
        </div>
      </div>
    </div>
  );
};
