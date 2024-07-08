type Props = {
    mes: string,
    año: string,
    fecha: string
    estado: string,
}

export const Actividad = ({mes, año, fecha, estado}: Props) => {
  return (
    <div className='w-full h-auto flex flex-col py-8 space-x-3 space-y-2'>
        <div className='w-full h-auto'><button><h2 className="font-marcellus font-semibold text-3xl">{mes}{año} MAYO 2024</h2></button></div>
        <div className=''><button><h3 className="font-mukta text-2xl">{fecha} 8 de Julio de 2024</h3></button></div>
        <div className="w-full auto flex flex-row justify-between h-auto">
            <div className="w-2/12">{estado}EN CURSO</div>
            <div className="flex flex-col w-full rounded-2xl overflow-hidden h-[150px] shadow-xl">
                <div className="bg-gradient-to-r from-[#727FBF] to-[#050A25] w-full h-3/6 flex flex-row items-center">
                    <h2>EMPRESA</h2>-<h2>Sucursal</h2>
                </div>
                <div className="w-full bg-white h-full"></div>
            </div>
            <div className="w-3/12"></div>
        </div>
    </div>
  )
}
