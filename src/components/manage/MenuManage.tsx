import { MiniManage } from "./MiniManage"

type Props = {
    empresa: string,
    sucursal: string,
    titulo: string,
    resumen: string,
}

export const MenuManage = ({empresa, sucursal, titulo, resumen}: Props) => {
  return (
    <div className='w-full h-full rounded-[24px] bg-[#E9E9F4]'>
        <div className='w-full h-full flex flex-col items-center'>
            <div className='grid grid-cols-1 grid-rows-3 items-center h-full w-full'>
                <div className='flex flex-col space-y-3'>
                    <h2 className='font-marcellus text-4xl text-center'>{empresa}</h2>
                    <h2 className='font-manjari text-center text-xl'>{sucursal}</h2>
                    <h2 className='font-manjari text-center'>{titulo}</h2>
                </div>
                <div className='w-full bg-[#DDDDE7] grid grid-cols-1 grid-rows-4 h-full items-center justify-items-center'>
                    <MiniManage link='fecha' texto="dd - mm - yy" img="/calendar.png" img2="/calendar_white.png"/>
                    <MiniManage link="croquis" texto="Croquis del sitio" img="/mapa.png" img2="/map_white.png"/>
                    <MiniManage link="archivos" texto="Archivos" img="/file.png" img2="/file_white.png"/>
                    <MiniManage link="" texto="Usuario y contraseña" img="/user_detail.png" img2="/user_detail_white.png"/>
                </div>
                <div className='bg-[#A4AACA] w-full h-full rounded-2xl'>
                    <div className="w-full h-full py-4 px-6 flex flex-col">
                        <h1 className="font-semibold font-manjari">Resumen:</h1>
                        <p className="font-manjari">{resumen}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
