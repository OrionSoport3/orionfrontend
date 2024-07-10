import { BigBoton } from "./Subcomponents/BigBoton"
import { Subboton } from "./Subcomponents/Subboton"

export const Subnavbar = () => {
    return (
        <div className="w-full BP1:px-0 BP2:w-4/5 md:h-[60px] flex flex-row items-center justify-between z-50">
            <BigBoton/>
            <Subboton texto="EN CURSO" ruta=""></Subboton>
            <Subboton texto="FINALIZADO" ruta=""></Subboton>
            <Subboton texto="CANCELADO" ruta=""></Subboton>
        </div>
    )
}