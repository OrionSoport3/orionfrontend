import { Link } from 'react-router-dom';

type Props = {
  ruta: string,
  lugar: string,
}

export const Navbar = ({ruta, lugar}: Props) => {
  return (
    <div className="w-screen h-16 md:h-20 bg-azul-navbar flex items-center justify-between absolute smartwatch:fixed  z-50">
      <div className="flex justify-between items-center">
        <img src="../logo_orion.jpg" className="w-auto h-9 md:h-14 ml-5 mr-0"/>
        <h3 className="text-white font-league text-xl md:text-3xl pl-5">ADMINISTRADORES</h3>
      </div>
      <Link to={lugar} className="text-white font-josefin w-28 h-9 md:h-10 mr-5 flex justify-center items-center hover:rounded-full hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-400 transition duration-500 ease-in">
        {ruta}
      </Link>
    </div>
  )
}
