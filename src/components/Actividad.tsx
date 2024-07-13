import { useEffect, useState } from "react"
import { DetallesProyecto } from "../assets/minicomponentes/DetallesProyecto"

type Props = {
    fecha_inicio: string,
    fecha_final: string,
    fecha_mes: string,
    estado?: string,
    empresa: string,
    sucursal: string,
    titulo_proyecto: string,
    personal: { nombre: string} [],
    resumen: string,
    vehiculo: string
    toDisplay: () => void,
    isOpen: boolean,
}


export const Actividad = ({toDisplay,isOpen , fecha_inicio, fecha_final, estado, empresa, sucursal, titulo_proyecto, personal, resumen, vehiculo }: Props, ) => {


  return (
    <div className='w-full h-auto flex flex-col py-8 space-x-3 space-y-2'>

        <div className="w-full auto flex flex-row justify-between h-auto">
            {estado === 'EN CURSO' && (
                <div className="w-2/12 flex flex-col justify-center text-2xl font-NATS text-green-600">{estado}</div>
            )}
            {estado === 'FINALIZADO' && (
                <div className="w-2/12 flex flex-col justify-center text-2xl font-NATS text-[#132375]">{estado}</div>
            )}
            {estado === 'CANCELADO' && (
                <div className="w-2/12 flex flex-col justify-center text-2xl font-NATS text-red-600">{estado}</div>
            )}
            <div className="flex flex-col w-full rounded-2xl overflow-hidden h-auto shadow-xl items-center relative">
                <button onClick={toDisplay} type="button"  className="bg-gradient-to-r from-[#727FBF] to-[#050A25] h-[56px] flex w-full flex-row items-center px-8 py-6 justify-between">
                    <div className="flex flex-row justify-center items-center space-x-3">
                        <h2 className="font-marcellus text-xl text-white">{empresa}</h2><h1 className="text-white">-</h1><h2 className="font-marcellus text-xl text-white">{sucursal}</h2>
                    </div>
                    <div className="flex flex-row items-center justify-center space-x-4">
                        <h1 className="font-manjari text-white text-md">{fecha_inicio}</h1><h1 className="text-white text-md font-manjari">{fecha_final}</h1>
                    </div>
                </button>
                <div className="transition-all duration-200 flex flex-col items-center w-full bg-white">
                    { isOpen 
                    ?  
                    <div className="w-10/12 h-auto flex flex-col py-4 align-text-bottom ">
                        <DetallesProyecto prop="Titulo del proyecto" titulo_proyecto={`${titulo_proyecto} titulo proyecto`}/>
                        <div className="flex flex-row items-baseline h-auto w-full space-x-5 space-y-2">
                            <div className="w-2/6">
                                <h1 className="font-manjari font-bold">Encargados de sitio</h1>
                            </div>
                            <div className="w-full">
                            {personal.map((items, index) => (
                                <div key={index} className="">
                                    {items.nombre}
                                </div>
                            ))}
                            </div>
                        </div>
                        <DetallesProyecto prop="Resumen del trabajo a realizar" titulo_proyecto={`${resumen}`}/>
                        <DetallesProyecto prop="Medio de transporte" titulo_proyecto={`Moverse en la ${vehiculo}`}/>
                    </div>
                    : 
                    <div className="w-full h-[0px] hidden">
                    </div>
                    }

                </div>
                
                <div className="absolute bottom-4 right-8">
                    <button className="flex flex-row h-[28px] w-[28px]">
                        <img src="../edit.png" />
                    </button>
                </div>
            </div>
            <div className="w-3/12"></div>
        </div>
    </div>
  )
}
