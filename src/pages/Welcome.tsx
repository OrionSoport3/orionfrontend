import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Subnavbar } from '../components/Subnavbar';

const Welcome: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(true);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  useEffect(() => {
    const ajustarMenuSegunPantalla = () => {
      if (window.innerWidth >= 768) { 
        setMenuAbierto(true);
      } else {
        setMenuAbierto(false);
      }
    };

    ajustarMenuSegunPantalla(); 
  }, []);

  return (
    <div className="fixed w-screen h-screen bg-design-one bg-no-repeat bg-contain bg-fixed text-black bg-colores-pantalla ">
      <div className='flex justify-center'>
        <Navbar/>
      </div>
      <div className={`flex BP1:pt-5 md:pl-9 ${menuAbierto ? 'pl-5' : 'pl-0'}`}>
        <Sidebar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
        <div className={`transform transition-all md:duration-500 px-5 sm:pt-2 BP1:pl-12  ${menuAbierto ? ' w-[0] md:w-11/12 opacity-0 md:opacity-100 duration-300' : 'w-full'}`}>
          <Subnavbar />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
