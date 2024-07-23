import { Link } from "react-router-dom"

type Props = {
  nombre: string,
  id_carpeta: string | number
  css?: string
}

export const FolderButton = ({nombre, id_carpeta, css}: Props) => {
  return (
    <Link to={`documentos/${id_carpeta}/${nombre}`} className={`w-52 rounded-2xl flex flex-row justify-center items-center  text-white h-10 font-NATS text-3xl
    hover:w-56 hover:h-12 transform transition-all duration-150 ${nombre && nombre.length  ? 'truncate' : '' }  ${css ?? 'bg-morrado'}`}>
        {nombre}
    </Link>
  )
}
