import { Link } from 'react-router-dom';

type Props = {
  ruta: string,
  lugar: string,
  isRestablish?: boolean,
  segundoLugar?: string,
  segundaRuta?: string,
  color?: string
}

export const Navbar = ({ruta, lugar, isRestablish, segundoLugar, segundaRuta, color}: Props) => {
  return (
    <div className={`w-screen h-16 md:h-20 flex items-center justify-between absolute smartwatch:fixed  z-50 ${color ?? 'bg-azul-navbar'}`}>
      <div className="flex justify-between items-center BP1:w-auto w-[30px]">
        <img src="../logo_orion.jpg" className="w-auto h-9 md:h-14 ml-5 mr-0"/>
        <h3 className="text-white font-league text-xl md:text-3xl pl-5">ADMINISTRADORES</h3>
      </div>
      {isRestablish ?
      <div className='flex flex-row'>
      <Link to={lugar} className="text-white BP1:text-base font-semibold text-sm font-josefin w-auto BP1:w-28 h-9 BP1:h-10 mr-5 flex justify-center items-center rounded-full hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-400">{ruta}</Link>
      <Link to={segundoLugar ?? ''} className="text-white BP1:text-base text-sm font-josefin w-14 BP1:w-28 h-9 md:h-10 mr-5 flex justify-center items-center rounded-full hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-400">{segundaRuta}</Link>
      </div> 
      : 
      <Link to={lugar} className="text-white font-josefin w-28 h-9 md:h-10 mr-5 flex justify-center items-center hover:rounded-full hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-400 transition duration-500 ease-in">{ruta}</Link>
      }
    </div>
  )
}
