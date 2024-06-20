import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Subnavbar } from '../components/Subnavbar';
import { SrBoton } from '../components/Subcomponents/SrBoton';

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
    <div className="fixed w-screen h-screen bg-design-one bg-no-repeat bg-contain bg-fixed text-black bg-colores-pantalla">
      <div className='flex justify-center'>
        <Navbar/>
      </div>
      <div className={`flex h-[96%] BP1:pt-5 md:pl-9 ${menuAbierto ? 'pl-5' : 'pl-0'}`}>
        <Sidebar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
        <div className={`transform transition-all md:duration-500 sm:pt-2 BP1:pl-12 px-4 ${menuAbierto ? ' w-[0] md:w-11/12 opacity-0 md:opacity-100 duration-300' : 'w-full'}`}>
          <Subnavbar />
          <div className='absolute bottom-28 right-5 BP1:bottom-20 BP1:right-8 '>
            <SrBoton ruta='/new_service' contenido='NUEVO SERVICIO'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
