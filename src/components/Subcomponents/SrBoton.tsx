import { Link } from "react-router-dom"

type Properties = {
    ruta: string,
    contenido: string,
}

export const SrBoton = ({ruta, contenido}: Properties) => {
  return (
    <button className={`relative w-44 BP1:w-52 h-10 BP1:h-14 flex py-2 BP1:py-4 rounded-xl font-josefin bg-gradient-to-r from-pricha to-moradito text-white transition duration-200 hover:bg-gradient-to-r hover:from-[#b9c0df] hover:to-[#586086]`}>
      <Link 
        to={ruta ?? '/welcome'} 
        className="absolute inset-0 flex items-center justify-center">
        {contenido}
      </Link>
    </button>  
    )
}
