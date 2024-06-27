import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { InputNew } from "../utils/InputNew";
import { NewTitulo } from "../components/form/NewTitulo";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ItemSeleccionable } from "../utils/ItemSeleccionable";
import { useDispatch, useSelector } from 'react-redux';
import { SignBoton } from "../components/Subcomponents/SignBoton";
import { Toaster, toast } from "sonner";
import { useAppDispatch } from "../store/store";
import { Api } from "../services/Api";



export const NewServiceForm = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const items = useSelector((state: any) => state.select.items);

  const selectedItems = items.filter((item: any) => item.isSelected);
  const unselectedItems = items.filter((item: any) => !item.isSelected);

  const handleSelect = (field: string, value: string, setFieldValue: (field: any, value: string, shouldValidate?: boolean | undefined) => void) => {
    setSelectedOption(value);
    setFieldValue(field,value);
  };

  const fetchUsers = async () => {
    try {
      const response = await Api.getUser('get');
      const usuarios = response.data.user.map((user: any) => ({
          name: user.name,
          departamento: user.departamento,
      }));
      return usuarios;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
  }
  }


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
                <InputNew value={values.empresa} onChange={handleChange} error={errors.empresa} name="empresa" type="text" texto="Empresa" incheck options={["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4"]} label="Seleccione una empresa" onSelect={(value) => handleSelect("empresa" ,value, setFieldValue)}/>
                <InputNew value={values.sucursal} onChange={handleChange} error={errors.sucursal} name="sucursal" type="text" texto="Sucursal" incheck options={["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4"]} label="Seleccione una sucursal" onSelect={(value) => handleSelect('sucursal', value,setFieldValue)}/>
                </div>
                <InputNew value={values.resume} onChange={handleChange} error={errors.resume} texto="Resumen del proyecto" name="resume" type="text" incheck={false} css="h-24" center="items-start"/>
                <NewTitulo texto="PERSONAL ENCARGADO"/>
                <div className={``}>

                </div>
                <div className="w-full h-auto flex flex-col">
                  <div className="flex w-full items-center justify-center">
                    <h2 className="font-semibold w-1/5 my-5">Personal: </h2>
                    <div className="flex flex-wrap space-x-3 w-full">
                      {selectedItems.map((item: any) => (
                        <ItemSeleccionable key={item.name} name={item.name}  />
                      ))}
                    </div>
                  </div>
                <div className="flex flex-wrap space-x-3 w-full">
                  {unselectedItems.map((item: any) => (
                    <ItemSeleccionable key={item.name} name={item.name} />
                  ))}
                </div>
              </div>
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
