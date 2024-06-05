import { BigBoton } from "./Subcomponents/BigBoton"
import { Subboton } from "./Subcomponents/Subboton"

export const Subnavbar = () => {
    return (
        <div className="w-5/6 flex flex-row items-center justify-between">
            <BigBoton />
            <Subboton>EN CURSO</Subboton>
            <Subboton>FINALIZADO</Subboton>
            <Subboton>CANCELADO</Subboton>
        </div>
    )
}