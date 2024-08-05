import { useEffect, useState } from "react"
import { BigBoton } from "./Subcomponents/BigBoton"
import { Subboton } from "./Subcomponents/Subboton"

type Props = {
    seleccionar: (parametros: any[]) => void;
}

export const Subnavbar = ({seleccionar}: Props) => {
    const [seleccionado, setSeleccionar] = useState<any[]>(["TODOS"]);

    const handleSelect = (valor: any) => {
        setSeleccionar((prevSeleccionado) => {
            if (valor === "TODOS") {
                // Si seleccionas "TODOS", resetea a ["TODOS"]
                return ["TODOS"];
            } else {
                // Si "TODOS" está en la lista y se selecciona otro valor, reemplaza "TODOS" con el nuevo valor
                if (prevSeleccionado.includes("TODOS")) {
                    // Reemplaza "TODOS" con el nuevo valor
                    return [valor];
                } else {
                    // Si el valor ya está en la lista, elimínalo
                    if (prevSeleccionado.includes(valor)) {
                        const newSelection = prevSeleccionado.filter(item => item !== valor);
                        // Si después de eliminar todos los valores, el array queda vacío, añade "TODOS"
                        return newSelection.length === 0 ? ["TODOS"] : newSelection;
                    }
                    // Si el valor no está en la lista, agrégalo
                    return [...prevSeleccionado, valor];
                }
            }
        });
        seleccionar(seleccionado);
    };

    useEffect(() => {
        handleSelect(seleccionado);
    }, []);
    
    //corregir, mejor probar usando la funcion importada y mandado de regreso los parametros
    return (
        <div className="w-full BP1:px-0 BP2:w-4/5 md:h-[60px] flex flex-row items-center justify-between z-50">
            <Subboton label="TODOS" select={() => handleSelect("TODOS")}></Subboton>
            <Subboton label="EN CURSO" select={() => handleSelect("EN CURSO")}></Subboton>
            <Subboton label="FINALIZADO" select={() => handleSelect("FINALIZADO")}></Subboton>
            <Subboton label="CANCELADO" select={() => handleSelect("CANCELADO")}></Subboton>
            <div>Seleccionado: {JSON.stringify(seleccionado)}</div>
        </div>
    )
}