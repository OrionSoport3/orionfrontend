import { Outlet, useParams } from 'react-router-dom'
import { MenuManage } from '../components/manage/MenuManage'
import { Navbar } from '../components/Navbar'
import { useEffect, useState } from 'react';
import { Api } from '../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const ServiceInfo = () => {
  const id_Actividad = useParams<{id: string}>();
  const [servicio, setServicio] = useState<any>({});


  const serviceId = id_Actividad.id ? parseInt(id_Actividad.id) : null;
  const token = useSelector((state: RootState) => state.auth.token);

  const objeto = {
    id: serviceId,
  }

  
const fetchService = async () => {
  if (!token) {
    console.error('Token is null or undefined');
    return;
  }
  try {
    const response = await Api.postActivitie('get_service', objeto, token);
    const actividad = {
      id_servicio: response.data.respuesta.id_actividad,
      estado: response.data.respuesta.estado,
      fecha_final: response.data.respuesta.fecha_final,
      fecha_inicial: response.data.respuesta.fecha_inicial,
      inconvenientes: response.data.respuesta.inconvenientes,
      empresa: response.data.respuesta.empresa,
      sucursal: response.data.respuesta.sucursal,
      titulo: response.data.respuesta.titulo,
      vehiculo: response.data.respuesta.vehiculo,
      vendedor: response.data.respuesta.vendedor,
      resumen: response.data.respuesta.resumen,
    }
    setServicio(actividad);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
fetchService();
}, []);

return (
  <div className='w-screen h-screen fixed p-0 m-0 bg-[#D1D5E8] bg-rect-morado bg-no-repeat bg-fixed bg-contain'>
    <div className='w-full h-full px-6 flex flex-col'>
      <Navbar estilo='border-white text-white'/>
      <div className='items-center h-[calc(100vh-70px)] py-4 w-full flex flex-row'>
        <div className='w-[20rem] h-full'>
          <MenuManage empresa={servicio.empresa} sucursal={servicio.sucursal} titulo={servicio.titulo} resumen={servicio.resumen}/>
        </div>
        <div className='flex-1 overflow-auto h-full'>
          <Outlet/> 
        </div>
      </div>
    </div>
  </div>
);

}
