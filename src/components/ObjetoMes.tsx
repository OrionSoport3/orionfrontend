import { useState } from "react";
import { Actividad } from "./Actividad";
import { FechaMes } from "./FechaMes";

type Props = {
    mes: string,
    año: string,
    items: { [key: string]: any[] },
}
export const ObjetoMes = ({mes, año, items}: Props) => {

    const [Abrir, SetAbrir] = useState(false);

    const abrirYCerrar = () => {
        SetAbrir(!Abrir);
    }

  return (
    <div className='w-full h-auto space-y-5'>
        <button onClick={abrirYCerrar}>
            <h2 className={`font-marcellus font-semibold text-3xl hover:text-gray-700 `}>{mes} {año}</h2>
        </button>
        <div className={`space-y-6 transform transition-all duration-150 ${Abrir ? 'opactiy-100 max-h-[4000rem] py-3' : 'opacity-0 max-h-[0px] pointer-events-none'}`}>
            {Object.keys(items).map((fecha) => {
                const mesesito = mes
                return (
                    <div key={fecha}>
                        <FechaMes fecha={fecha} objetoFecha={items[fecha]} mesesito={mesesito}/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
