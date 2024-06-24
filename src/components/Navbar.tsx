import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../store';
import { useDispatch } from 'react-redux';

type Properties = {
  estilo?: string,
  isForm?: boolean,
}

export const Navbar = ({estilo, isForm}: Properties)  => {

  const [openNavbar, setOpenr] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setOpenr(!openNavbar);
  };

  const cerrar_sesion = () => {
    dispatch(logout());
    navigate('/login');
  }

  useEffect(() => {
    const ajustarMenuSegunPantalla = () => {
      if (window.innerWidth >= 768) { 
        setOpenr(true);
      } else {
        setOpenr(false);
      }
    };
    
    ajustarMenuSegunPantalla(); 
    window.addEventListener('resize', ajustarMenuSegunPantalla); 

    return () => {
      window.removeEventListener('resize', ajustarMenuSegunPantalla);
    };
  }, []);

  return (
    <div className={`border-b-2 w-[100%] pt-2 BP1:pb-2 ${estilo ?? 'border-black'}`}>
      <div className='flex flex-row justify-between w-full items-center'>
        <div className={`flex flex-col flex-grow justify-start  items-start md:flex-row md:items-center`}>
        <img src="../logo_orion.jpg" className="w-10 h-10 BP1:block hidden"/>
          <div className='flex flex-row  w-full justify-between BP1:hidden'>
            <img src="../logo_orion.jpg" className="w-9 h-9 sm:w-11 sm:h-11"/>
            <button onClick={toggleNavbar}><img src={`${isForm ? '/menu-white.png' : '/menu-regular-240.png'}`} className='ml-4 w-7 sm:w-10 BP1:hidden block'/></button>
          </div>
          <div className={`flex flex-col space-y-2 mt-3 md:flex-row BP1:justify-between md:w-7/12  transform transition-all duration-300 BP1:pl-5 ${openNavbar ? 'h-[200px] BP1:h-auto opacity-100' : 'h-[0px] opacity-0 pointer-events-none'}`}>
            <div className="font-josefin py-2 font-bold md:text-base text-base sm:text-xl  border-black"><Link to={'/welcome'}>Historial de servicios</Link></div>
            <div className="text-sm py-2 md:py-0 md:text-base border-t-1 border-black"><Link to={'/login'}>Empresas</Link></div>
            <div className="text-sm py-2 md:py-0 md:text-base border-t-1 border-black"><a href="">Servicios</a></div>
            <div className="text-sm py-2 md:py-0 md:text-base border-t-1 border-black"><a href="">Personal</a></div>
          </div>
        </div>
        <button onClick={cerrar_sesion}><img src={`${isForm ? '/logout-white.png' : '/log-out-regular-240.png'}`} className='w-7 h-8 BP1:block hidden'/></button>
      </div>
    </div>
  )
}