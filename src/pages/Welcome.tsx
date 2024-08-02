import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Subnavbar } from '../components/Subnavbar';
import { SrBoton } from '../components/Subcomponents/SrBoton';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { ObjetoMes } from '../components/ObjetoMes';
import { toast, Toaster } from 'sonner';
import pusher from '../services/pusher';
import { getEmpresasSucursales } from '../store/empresas_sucursales';
import { getAllActivities } from '../store/actividades';

const Welcome: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [activity, setActivity] = useState<any[]>([]);
  const [parametrosBusqueda, setParametrosBusqueda] = useState<any[]>([]);
  const [empresas, setEmpresas] = useState<any[]>([]);


  const token = useSelector((state: RootState) => state.auth.token);
  // const io = new Server({
  //   cors: {
  //     origin: socketURL
  //   }
  // })
  const despacho = useAppDispatch();

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

  useEffect(() => {
    
    pusher.connection.bind('connected', () => {
      console.log('Pusher connected');


  });
  
  const channel = pusher.subscribe('activities-channel');

  channel.bind('ActivitiesFetched', (data: any) => {
      console.log('ActivitiesFetched event received:', data);
  });
  
fetchActivities();

  
    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      pusher.unsubscribe('activities-channel');
    };
  }, []);

  const fetchActivities = async () => {
    if (!token) {
      console.error('Token is null or undefined');
      return;
    }
    if (parametrosBusqueda) {
      console.log(parametrosBusqueda);
      const objeto = {token: token, data: parametrosBusqueda}
      despacho(getAllActivities(objeto)).unwrap().then((valores: any) => {setActivity(valores)}).catch((error) => toast.error(JSON.stringify(error)));
      
    }    
      despacho(getEmpresasSucursales(token)).unwrap().then(((values: any) => {setEmpresas(values.empresas_sucursales)}));

  }


  // useEffect(() => {

  //   // Configurar eventos del socket
  //   socket.on('new_activity', (data) => {
  //     console.log('Nueva actividad recibida:', data);
  //     // Actualiza el estado o maneja la nueva actividad como sea necesario
  //     fetchActivities(); // Re-fetch activities if needed
  //   });

  //   // Desconectar el socket cuando el componente se desmonta
  //   return () => {
  //     socket.disconnect();
  //     socket.off('new_activity');
  //   };
  // }, [token]); 

  const objetosFecha: JSX.Element[] = [];
  
  const groupFechasItem = activity.reduce((acc: { [key: string]: { [key: string]: any[] } }, item) => {
    const granMes = item.fecha_final.split('-')[1];
    const granAño = item.fecha_final.split('-')[0];
    const mesAño = `${granMes} ${granAño}`;

    if (!acc[mesAño]) {
      acc[mesAño] = {};
    }

    if (!acc[mesAño][item.fecha_final]) {
      acc[mesAño][item.fecha_final] = [];
    }

    acc[mesAño][item.fecha_final].push(item); 

    return acc;
  }, {});

  Object.keys(groupFechasItem).forEach((mes_año) => {
    const [mesNumero, año] = mes_año.split(' ');

    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const mes = monthNames[parseInt(mesNumero, 10) - 1];
    const items = groupFechasItem[mes_año];

    objetosFecha.push(
      <div key={mes_año} className='space-y-2'>
        <ObjetoMes mes={mes} año={año} items={items}/>
      </div>
    );

  });

  return (
    <div className="fixed w-screen h-screen bg-design-one bg-no-repeat bg-contain bg-fixed text-black bg-colores-pantalla">
      <div className='w-full h-full px-4 BP1:px-6 pb-2 overflow-hidden'>
        <div className='flex justify-center'>
          <Navbar/>
        </div>
        <Toaster richColors position='bottom-right'/>
        <div className={`flex h-[calc(100%-80px)] w-full overflow-hidden BP1:pt-5 pt-1 ${menuAbierto ? '' : 'pl-0'}`}>
          <div className='w-fit h-full relative '>
          <Sidebar menuAbierto={menuAbierto} toggleMenu={toggleMenu} empresas={empresas} busqueda={(values) => {setParametrosBusqueda(values)}}/>
          </div>
          <div className={`transform transition-all md:duration-500 sm:pt-2 BP1:pl-12 ${menuAbierto ? ' w-[0] md:w-11/12 opacity-0 md:opacity-100 duration-300' : 'w-full'}`}>
            <Subnavbar />
            <div className='w-full h-full py-5 overflow-y-auto overflow-x-hidden pl-2'>
              {activity.length > 0 
                ? (objetosFecha)
              : ''
              }
            </div>
            <div className='absolute bottom-6 right-0 BP1:bottom-6 BP1:right-8'>
             <SrBoton ruta='/new_service' contenido='NUEVO SERVICIO'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
