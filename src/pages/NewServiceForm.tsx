import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { InputNew } from "../components/Subcomponents/InputNew";
import { NewTitulo } from "../components/form/NewTitulo";
import { Formik } from "formik";

export const NewServiceForm = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (value: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    setSelectedOption(value);
    setFieldValue("empresa", value);
  };

  const setFieldValue = (field: string, value: any) => void {}

  return (
    <div className="w-screen h-screen fixed text-black flex flex-col items-center bg-colores-pantalla-form px-12">
      <Navbar />
      <div className="flex w-full h-full">
        <div className="flex w-full items-center justify-center mt-4">
          <div className="w-full h-full space-y-3">
            <Formik
            
            >

            </Formik>
            <NewTitulo texto="NUEVO SERVICIO" />
            <InputNew texto="Titulo del proyecto" name="new_project" type="text" incheck={false} />
            <div className="flex flex-row w-full h-auto">
            <InputNew name="departamento" type="text" texto="Empresa" incheck options={["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4"]} label="Seleccione una empresa" onSelect={(value) => handleSelect(value, setFieldValue)}/>
            <InputNew name="sucursal" type="text" texto="Sucursal" incheck options={["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4"]} label="Seleccione una sucursal" onSelect={(value) => handleSelect(value, setFieldValue)}/>
            </div>
            <InputNew texto="Titulo del proyecto" name="new_project" type="text" incheck={false} css="h-24" center="items-start"/>
            
          </div>
          <div className="w-full h-full">
          </div>
        </div>
      </div>
    </div>
  );
};
