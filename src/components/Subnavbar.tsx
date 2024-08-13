import { useEffect, useState } from "react";
import { Subboton } from "./Subcomponents/Subboton";

type Props = {
    seleccionar: (parametros: string) => void;
    lista: { estado: string[] };
};

export const Subnavbar = ({ seleccionar, lista }: Props) => {
    const [botonesEstado, setBotonesEstado] = useState<Record<string, boolean>>({
        TODOS: false,
        "EN CURSO": false,
        FINALIZADO: false,
        CANCELADO: false,
    });

    useEffect(() => {
        const nuevoEstado: Record<string, boolean> = {
            TODOS: false,
            "EN CURSO": false,
            FINALIZADO: false,
            CANCELADO: false,
        };

        if (lista.estado.length === 1 && lista.estado[0] === "TODOS") {
            nuevoEstado.TODOS = true;
        } else {
            if (lista.estado.includes("EN CURSO")) nuevoEstado["EN CURSO"] = true;
            if (lista.estado.includes("FINALIZADO")) nuevoEstado.FINALIZADO = true;
            if (lista.estado.includes("CANCELADO")) nuevoEstado.CANCELADO = true;
        }

        setBotonesEstado(nuevoEstado);
    }, [lista.estado]);

    const handleSeleccionar = (valor: string) => {
        setBotonesEstado(prev => {
            const nuevoEstado: Record<string, boolean> = {
                TODOS: false,
                "EN CURSO": false,
                FINALIZADO: false,
                CANCELADO: false,
            };

            if (valor === "TODOS") {
                nuevoEstado.TODOS = true;
            } else {
                nuevoEstado[valor] = true;
            }

            return nuevoEstado;
        });

        seleccionar(valor);
    };

    return (
        <div className="w-full BP1:px-0 BP2:w-full md:h-[60px] flex flex-row items-center justify-between z-50">
            <Subboton label="TODOS" estado={botonesEstado} select={handleSeleccionar} />
            <Subboton label="EN CURSO" estado={botonesEstado} select={handleSeleccionar} />
            <Subboton label="FINALIZADO" estado={botonesEstado} select={handleSeleccionar} />
            <Subboton label="CANCELADO" estado={botonesEstado} select={handleSeleccionar} />
        </div>
    );
};
