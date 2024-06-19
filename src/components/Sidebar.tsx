import React from 'react';
import { Checkbox } from "./Checkbox";

interface SidebarProps {
  menuAbierto: boolean;
  toggleMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ menuAbierto, toggleMenu }) => {
  return (
    <div className={`transform transition-all duration-500 mt-3 BP1:mt-0 ${menuAbierto ? 'w-[17rem] md:w-[22rem] abs' : 'w-10 h-10 BP1:h-20 opacity-100'}`}>
      <div className="flex justify-between items-center">
        <h1 className={`flex-grow text-black font-bold text-xl sm:text-2xl BP1:text-3xl border-b-2 border-black pb-3 font-marcellus transform transition-transform duration-500
          ${menuAbierto ? 'opacity-100' : 'w-[0px] opacity-0'}`}>FILTRAR</h1>
        <button className="list_arrow ml-auto outline-none" onClick={toggleMenu}>
          <img src="/chevrons-right-solid-240.png" className={`h-6 sm:h-8 -mt-3 md:m-0 md:h-10 transform transition-transform duration-200 ${menuAbierto ? 'rotate-90' : 'rotate-0'}`} />
        </button>
      </div>
      <div className={`pt-2 md:pt-6 transform transition-all duration-200 ${menuAbierto ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <h3 className="font-josefin text-sm sm:text-base md:text-xl font-bold">Fecha</h3>
        <form action="">
          <div className="flex mt-3 justify-start">
            <input type="date" className="bg-white rounded-lg w-full h-9 BP1:h-10 pl-2 outline-none shadow-lg" />
            <button className=" px-2 py-1 bg-gradient-to-r from-blue-button to-black rounded-lg text-white md:text-lg text-base justify-end ml-5 hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer" type="submit">Consultar</button> 
          </div>
        </form>
        <h3 className="font-josefin text-base md:text-xl font-bold mt-6 truncate">Nombre del proyecto</h3>
        <form action="">
          <div className="flex mt-3 justify-start">
            <input className="bg-white rounded-lg w-full h-9 BP1:h-10 pl-2 outline-none shadow-lg" type="text" placeholder="Buscar.." />
            <button className="h-auto px-2 py-1 bg-gradient-to-r from-blue-button to-black rounded-lg md:text-lg text-base text-white justify-end ml-5 hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer transition ease-in-out duration-500" type="submit">Buscar</button>
          </div>
        </form>
        <h3 className="font-josefin text-base md:text-xl font-bold mt-6">Empresas</h3>
        <form action="">
          <div className="flex mt-3 justify-start">
            <Checkbox /> <h3 className='ml-3 truncate'>Pico Energy</h3>
          </div>
          <div className="flex mt-3 justify-start">
            <Checkbox /> <h3 className='ml-3'>WeatherFord</h3>
          </div>
        </form>
      </div>
    </div>
  );
};
