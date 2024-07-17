import { Link } from "react-router-dom"

type Props = {
  nombre: string,
  id_carpeta: string | number
}

export const FolderButton = ({nombre, id_carpeta}: Props) => {
  return (
    <Link to={`documentos/${id_carpeta}/${nombre}`} className="w-52 rounded-2xl flex flex-row justify-center items-center bg-morrado text-white h-14 font-NATS text-3xl
    hover:w-60 hover:h-16 transform transition-all duration-150">
        {nombre}
    </Link>
  )
}
