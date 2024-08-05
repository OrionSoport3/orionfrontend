import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Subnavbar } from '../components/Subnavbar';
import { SrBoton } from '../components/Subcomponents/SrBoton';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { ObjetoMes } from '../components/ObjetoMes';
import { toast, Toaster } from 'sonner';
import { getEmpresasSucursales } from '../store/empresas_sucursales';
import { getAllActivities } from '../store/actividades';
import Pusher from 'pusher-js';
import { LoadingItems } from '../utils/LoadingItems';

const Welcome: React.FC = () => {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [activity, setActivity] = useState<any[]>([]);
  const [parametrosBusqueda, setParametrosBusqueda] = useState<any[]>([]);
  const [empresas, setEmpresas] = useState<any[]>([]);
  const [estado, setEstado] = useState<any[]>([]);
  const [renderedObjects, setRenderedObjects] = useState<JSX.Element[]>([]);
  const contenedorPrincipalRef = useRef<HTMLDivElement>(null);
  const [numeroDeItems, setNumeroDeItems] = useState<number>(0);

  useEffect(() => {
    if (contenedorPrincipalRef.current) {
      const alturaTotal = contenedorPrincipalRef.current.offsetHeight;
      const valorDividido = alturaTotal / 248;
      const valorRedondeado = Math.round(valorDividido);
      setNumeroDeItems(valorRedondeado);
    }
  }, []);

  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const isLoadingActivities = useSelector((state: RootState) => state.actividades.isLoading);
  const isCompletedActividades = useSelector((state: RootState) => state.actividades.isCompleted);

  const pusher = new Pusher('07f871ddb43ea7c54a41', {
    cluster: 'us2',
    authEndpoint: 'http://192.168.10.44:8000/api/userId',
    auth: {
      headers: {
        'Referer': 'http://192.168.10.44:3000',
        'Authorization': `Bearer ${token}`
      }
    }
  });

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

    // Listener for window resize
    window.addEventListener('resize', ajustarMenuSegunPantalla);
    return () => {
      window.removeEventListener('resize', ajustarMenuSegunPantalla);
    };
  }, []);

  useEffect(() => {
    
    if (token && userId) {
      const channel = pusher.subscribe(`activities-channel.${userId}`);

      channel.bind('ActivitiesFetched', (data: any) => {
        setActivity(data.result.actividad);
      });

      return () => {
        pusher.unsubscribe(`activities-channel.${userId}`);
      };
    }
  }, [token, userId]);

  useEffect(() => {
    fetchActivities();
  }, [token, parametrosBusqueda]);
  

  const fetchActivities = async () => {
    if (!token) {
      console.error('Token is null or undefined');
      return;
    }

    try {
      if (parametrosBusqueda) {
        const nuevosParametros = {
          ...parametrosBusqueda,
          estado: estado
        }
        const objeto = { token, data: nuevosParametros };   
        console.log(objeto);
             
        const valores = await despacho(getAllActivities(objeto)).unwrap();
        setActivity(valores);
        
      }
      await despacho(getAllActivities({token: token, data: null})).unwrap()
      // .then((valores) => {setActivity(valores)})
      const values = await despacho(getEmpresasSucursales(token)).unwrap();
      setEmpresas(values.empresas_sucursales);
    } catch (error) {
      console.error(error);
    }
  };

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

const renderObject = (actividad: any) => {
  const objetosFecha: JSX.Element[] = [];

  if (Array.isArray(actividad) && actividad.length > 0) {
    const groupFechasItem = activity.reduce((acc: { [key: string]: { [key: string]: any[] } }, item) => {
      const [granAño, granMes] = item.fecha_final.split('-');
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
      const mes = monthNames[parseInt(mesNumero, 10) - 1];
      const items = groupFechasItem[mes_año];

      objetosFecha.push(
        <div key={mes_año} className='space-y-2'>
          <ObjetoMes mes={mes} año={año} items={items} />
        </div>
      );
    });
  } else if (typeof actividad === 'object') {
    const [granAño, granMes] = actividad.fecha_final.split('-');
    const mes = monthNames[parseInt(granMes, 10) - 1];

    objetosFecha.push(
      <div key={actividad.id_actividad} className='space-y-2'>
        <h2>{`${mes} ${granAño}`}</h2>
        <div>
          <h3>{actividad.titulo}</h3>
          <p>{actividad.resumen}</p>
          <p>Fecha Inicio: {actividad.fecha_inicio}</p>
          <p>Fecha Final: {actividad.fecha_final}</p>
          <p>Vendedor: {actividad.vendedor}</p>
          <p>Inconvenientes: {actividad.inconvenientes}</p>
          <p>Vehículo: {actividad.vehiculo}</p>
          <p>Estado: {actividad.estado}</p>
          <h4>Personal:</h4>
          <ul>
            {actividad.personal.map((persona: any, index: number) => (
              <li key={index}>
                {persona}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return objetosFecha;
};

  useEffect(() => {
    if (activity.length > 0) {
      const rendered = renderObject(activity);
      setRenderedObjects(rendered);
    }

  }, [activity]);

  return (
    <div className="fixed w-screen h-screen bg-design-one bg-no-repeat bg-contain bg-fixed text-black bg-colores-pantalla">
      <div className='w-full h-full px-4 BP1:px-6 pb-2 overflow-hidden'>
        <div className='flex justify-center'>
          <Navbar />
        </div>
        <Toaster richColors position='bottom-right' />
        <div className={`flex h-[calc(100%-75px)] w-full overflow-hidden BP1:pt-5 pt-1 ${menuAbierto ? '' : 'pl-0'}`}>
          <div className='w-fit h-full'>
            <Sidebar menuAbierto={menuAbierto} toggleMenu={toggleMenu} empresas={empresas} busqueda={(valores) => {try {
              setParametrosBusqueda([valores, estado]);
            } catch (error) {
              console.log(error);
              
            }}}/>
          </div>
          <div className={`transform transition-all md:duration-500 sm:pt-2 BP1:pl-12 ${menuAbierto ? 'w-[0] md:w-11/12 opacity-0 md:opacity-100 duration-300' : 'w-full'}`}>
            <Subnavbar seleccionar={(values) => {setEstado(values)}}/>
            <div ref={contenedorPrincipalRef} className='w-full h-[calc(100%-70px)] overflow-hidden'>
              <div className='h-full w-full  py-5 pl-2 overflow-y-auto'>
                <div className='w-full h-full'>
                  {isCompletedActividades 
                  ?
                  <div className='w-full h-fit'>
                    {renderedObjects}
                  </div>
                  : (isLoadingActivities ? 
                    <div className='w-full h-full space-y-4'>
                      {Array.from({ length: numeroDeItems }).map((_, index) => (
                        <LoadingItems key={index} />
                      ))}
                    </div>
                    : <div className='w-full h-full space-y-3'>
                      <h1>No se ha podido cargar las actividades...</h1>
                    </div>
                    )
                  }  

                </div>
              </div>
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
