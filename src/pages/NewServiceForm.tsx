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



export const NewServiceForm = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const [isSelect, setSelect] = useState(false);
  const dispatch = useAppDispatch();

  const selectedItems = useSelector((state: RootState) => state.select.items.filter(item => item.isSelected));
  const unselectedItems = useSelector((state: RootState) => state.select.items.filter(item => !item.isSelected));

  const manejarSelect = (field: string, value: string, setFieldValue: (field: any, value: string, shouldValidate?: boolean | undefined) => void) => {
    setSelectedOption(value);
    setFieldValue(field,value);
  };

  const selection = (id: number) => {
    const updatedUsers = users.map((user) =>
      user.id === id  ? { ...user, isSelected: !user.isSelected } : user
    );
    dispatch(setItems(updatedUsers));
    setUsers(updatedUsers);
  }
 
  const fetchUsers = async () => {
    if (!token) {
      console.error('Token is null or undefined');
      return;
    }
    try {
      const response = await Api.getUser('get', token);
      const usuarios = response.data.user.map((user: any) => ({
          id: user.id,
          name: user.nombre,
          departamento: user.departamento,
          isSelected: false,
      }));
      setUsers(usuarios);
  } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
  }
  }

    useEffect(() => {
      fetchUsers();
      console.log(users)
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
    <div className="w-screen h-screen fixed text-black flex flex-col items-center bg-gradient-to-t from-gray-300 to-colores-pantalla-form px-12">
      <Navbar/>
      <Toaster/>
      <div className="flex w-full h-full">
        <div className="flex w-full items-center justify-center mt-4">
          <div className="w-full h-full ">
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
              <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto">
                <NewTitulo texto="NUEVO SERVICIO" />
                <InputNew value={values.nombre_proyecto} onChange={handleChange} error={errors.nombre_proyecto} texto="Titulo del proyecto" name="nombre_proyecto" type="text" incheck={false} />
                <div className="flex flex-row w-full h-auto">
                <InputNew value={values.empresa} onChange={handleChange} error={errors.empresa} name="empresa" type="text" texto="Empresa" incheck options={["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4"]} label="Seleccione una empresa" onSelect={(value) => manejarSelect("empresa" ,value, setFieldValue)}/>
                <InputNew value={values.sucursal} onChange={handleChange} error={errors.sucursal} name="sucursal" type="text" texto="Sucursal" incheck options={["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4"]} label="Seleccione una sucursal" onSelect={(value) => manejarSelect('sucursal', value,setFieldValue)}/>
                </div>
                <InputNew value={values.resume} onChange={handleChange} error={errors.resume} texto="Resumen del proyecto" name="resume" type="text" incheck={false} css="h-24" center="items-start"/>
                <NewTitulo texto="PERSONAL ENCARGADO"/>
                {users.length > 0 ? (
                    <div className="w-full h-auto flex flex-col">
                      <div className="w-full h-auto py-5 pr-8 flex flex-row">
                          <h2 className="text-xl font-josefin">Personal:</h2>
                          <div className="flex flex-wrap h-auto">
                            {selectedItems.map((item) => (
                              <>    
                              <h1>{`usuario: ${item}`}</h1>                          
                              <ItemSeleccionable key={item.name} name={item.name} selected={() => selection(item.id)} isSelected={isSelect} />
                              </>
                            ))}
                          </div>
                      </div>
                          <h2>Unselected Items</h2>
                          <div>
                            {unselectedItems.map((item) => (
                              <>
                              <ItemSeleccionable key={item.name} name={item.name} selected={() => selection(item.id)} isSelected={isSelect} />                              
                              </>
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
          <div className="w-full h-full">
          </div>
        </div>
      </div>
    </div>
  );
};
