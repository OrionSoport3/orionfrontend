import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Subnavbar } from '../components/Subnavbar';
import { SrBoton } from '../components/Subcomponents/SrBoton';
import { Actividad } from '../components/Actividad';
import { Api } from '../services/Api';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const Welcome: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [activity, setActivity] = useState<any[]>([]);
  const [personitas, setPersonas] = useState<any[]>([]);

  const token = useSelector((state: RootState) => state.auth.token);


  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const getPersona = (id: number) => {
    const people = activity.find(actividad => actividad.id_actividad === id).personal.map((personas: any) => personas.nombre);
    setPersonas(people);
  }

  const DisplayActivity = (index: number) => {

  }

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


  const fetchActivities = async () => {
    if (!token) {
      console.error('Token is null or undefined');
      return;
    }
    try {
      const response = await Api.withToken('get_activities', token);
      const actividades = response.data.actividad.map((activities: any) => ({
        id_actividad: activities.id_actividad,
        sucursal: activities.sucursal,
        empresa: activities.empresa,
        titulo: activities.titulo,
        resumen: activities.resumen,
        fecha_inicio: activities.fecha_inicio,
        fecha_final: activities.fecha_final,
        vendedor: activities.vendedor,
        inconvenientes: activities.inconvenientes,
        estado: activities.estado,
        personal: activities.personal.map((nombres: any) => ({
          nombre: nombres.nombre
        })),
        vehiculo: activities.vehiculo
      }));
      setActivity(actividades);
      console.log(actividades);
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Failed to fetch users');
    }
  }
  useEffect(() => {
    fetchActivities();
  }, [token]);

  return (
    <div className="fixed w-screen h-screen px-4 BP1:px-6 bg-design-one bg-no-repeat bg-contain bg-fixed text-black bg-colores-pantalla">
      <div className='flex justify-center'>
        <Navbar/>
      </div>
      <div className={`flex h-[96%] BP1:pt-5 pt-1 ${menuAbierto ? '' : 'pl-0'}`}>
        <Sidebar menuAbierto={menuAbierto} toggleMenu={toggleMenu} />
        <div className={`transform transition-all md:duration-500 sm:pt-2 BP1:pl-12 ${menuAbierto ? ' w-[0] md:w-11/12 opacity-0 md:opacity-100 duration-300' : 'w-full'}`}>
          <Subnavbar />
          <div className='w-auto h-full pb-32  overflow-y-auto overflow-x-hidden pl-2'>
          <div className='w-full h-auto'><button><h2 className="font-marcellus font-semibold text-3xl">{}{} MAYO 2024</h2></button></div>
          <div className=''><button><h3 className="font-mukta text-2xl">{} 8 de Julio de 2024</h3></button></div>
            {activity.length > 0 
              ? 
              (activity.map((actividades: any, index) => (
                <div key={index} className=''>
                  <Actividad 
                    empresa={actividades.empresa} 
                    sucursal={actividades.sucursal} 
                    fecha_inicio={actividades.fecha_inicio} 
                    fecha_final={actividades.fecha_final}
                    titulo_proyecto={actividades.titulo}
                    personal={actividades.personal}
                    resumen={actividades.resumen}
                    vehiculo={actividades.vehiculo}
                    estado={actividades.estado}
                    isOpen
                    />
                </div>
              ))) 
            : ''
            }
          </div>
          <div className='absolute bottom-28 right-0 BP1:bottom-20 BP1:right-8 '>
            <SrBoton ruta='/new_service' contenido='NUEVO SERVICIO'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
