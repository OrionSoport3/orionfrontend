import { useState } from "react";
import { Actividad } from "./Actividad";

type Props = {
    objetoFecha: any[],
    fecha: string,
    mesesito: string
}

export const FechaMes = ({objetoFecha, fecha}: Props) => {
    const [añito, mesesito, dia] = fecha.split('-');
    const [asi, SetAbrir] = useState(false);

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const mes = monthNames[parseInt(mesesito, 10) - 1];
    const abrirYCerrar = () => {
        SetAbrir(!asi);
    }

  return (
    <div className="pl-4">
        <button onClick={abrirYCerrar} className='flex flex-row justify-center space-x-3 pl-2'>
          <img src="/flecha_morada.png" className={`h-6 w-5 transform `}/>
          <h2 className="font-manjari font-bold text-xl">{dia} de {mes} de {añito} </h2><h2 className="text-white bg-azul-de-mujer w-6 rounded-full">{objetoFecha.length}</h2>
        </button>
        <div className={`w-full flex flex-col justify-center transform transition-all duration-150 ${asi ? 'opacity-100 max-h-[4000px]' : 'opacity-0 max-h-0 pointer-events-none'}`}>
            {objetoFecha.map((item: any) => (
               <div key={item.id_actividad} className="space-y-4 pl-8">
               <Actividad
               estado={item.estado}
               empresa={item.empresa}
               sucursal={item.sucursal}
               fecha_final={item.fecha_final}
               fecha_inicio={item.fecha_inicio}
               titulo_proyecto={item.titulo}
               vehiculo={item.vehiculo}
               personal={item.personal}
               resumen={item.resumen}
               />
             </div> 
            ))}
        </div>
    </div>
  )
}
