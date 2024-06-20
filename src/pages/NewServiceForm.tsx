import { Navbar } from "../components/Navbar"
import { FormField } from "../components/form/FormField"

export const NewServiceForm = () => {
  return (
    <div className="w-screen h-screen fixed bg-rectangulo-azul  BP1:text-white flex flex-col items-center bg-colores-pantalla-form bg-contain bg-no-repeat">
        <Navbar isForm={true} estilo="border-white"/>
        <div className="flex w-full h-full">
            <div className="w-3/12 flex flex-col relative items-center h-full justify-start">
                <div className="w-[10px] bg-white h-full mt-12"></div>
                <div className="absolute top-10 flex flex-row justify-center items-center">
                    <div className="w-10 h-10 bg-white rounded-full"></div>
                    <h3>Descripcion del servicio a realizar</h3>
                </div>
            </div>
            <div className="flex flex-col w-full items-center justify-center">
                <FormField/>
            </div>
        </div>
    </div>
  )
}