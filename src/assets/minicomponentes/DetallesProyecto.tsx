type Props = {
    titulo_proyecto: string,
    prop: string,
}


export const DetallesProyecto = ({titulo_proyecto, prop} : Props) => {
  return (
    <div className="flex flex-row items-baseline h-auto w-full space-x-5 space-y-2">
        <div className="w-2/6">
            <h1 className="font-manjari font-bold">{prop}</h1>        
        </div>
        <div className="w-full">
            <h1 className="font-manajari">{titulo_proyecto}</h1>
        </div>
    </div>
  )
}
