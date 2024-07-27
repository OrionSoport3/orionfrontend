import { Outlet, useParams } from 'react-router-dom'
import { MenuManage } from '../components/manage/MenuManage'
import { Navbar } from '../components/Navbar'
import { useEffect, useState } from 'react';
import { Api } from '../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { PopWindow } from '../components/PopWindow';
import { toast, Toaster } from 'sonner';

export const ServiceInfo = () => {
  const id_Actividad = useParams<{ id: string }>();
  const [servicio, setServicio] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [contenido, setContenido] = useState<any>(null);
  const [carpeta, setCarpeta] = useState<any>(null);
  const [showPopWindow, setShowPopWindow] = useState<boolean>(false);  
  const serviceId = id_Actividad.id ? parseInt(id_Actividad.id) : null;
  const token = useSelector((state: RootState) => state.auth.token);
  const props = useParams<{id_carpeta: string; nombre_carpeta: string}>();

  const objeto = {
    id: serviceId,
  }

  const data = {
    id_carpeta: props.id_carpeta,
    nombre_carpeta: props.nombre_carpeta,
    file: selectedFile
  }

  const infoCarpeta = (carpeta: any) => {
    if (carpeta) {
      setCarpeta(carpeta);
      setShowPopWindow(true);
    }
  }


  const deleteCarpetasAndDocuments = async () => {
    if (!token) {
      return toast.error('Ups, no hay token');
    }
    try {
      const deleteCarpeta = await Api.postActivitie('delete_carpeta', carpeta, token);
      if (deleteCarpeta.statusCode === 200) {
        window.location.reload();
      }
    } catch (error) {
    }
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

  const isActive = (value: boolean) => {
    if (value === false) {
      return toast.info('No hay mensaje?¿');
    }
    setShowPopWindow(value);
  }

  const isFile = (file: any): file is File => file instanceof File;
  
  const handleAccept = async () => {
    if (!token) {
      return toast.error('Ups, no hay token');
    }
    try {
        if (isFile(data.file)) {
          console.log(isFile(data.file));
          const eliminateDoc = await Api.postFile('replace_document', data, token);
          if (eliminateDoc.statusCode === 200) {
            try {
              const replaceDocument = await Api.postFile('subir_archivo', data, token);
              if (replaceDocument.statusCode === 201) {
                window.location.reload();
                toast.success('Archivo reemplazado exitosamente');
              }
            } catch (error) {
              toast.error(JSON.stringify(error));
            }         
          }
        }  
        if (typeof data.file === 'object') {
          const eliminar = await Api.postActivitie('replace_document', data, token);
          if (eliminar.statusCode === 200) {
            window.location.reload()
            toast.success('Archivo eliminado exitosamente');
          }
          toast.error(['Ha ocurrido un error al eliminar el archivo', JSON.stringify(eliminar.data)]);
        }
      setShowPopWindow(false);
    } catch (error) {
      toast.error('Error en la llamada a la API');
      setShowPopWindow(false);
    }
  };

  const handleContenido = (objeto: any) => {
    if (objeto) {
      setContenido(objeto);
    }
  }
  
  const handleFileSelect = (file: any) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setCarpeta(null);
    setShowPopWindow(false);
  }

  useEffect(() => {
  fetchService();

  }, []);

  return (
    <div className='w-screen h-screen fixed p-0 m-0 bg-[#D1D5E8] bg-rect-morado bg-no-repeat bg-fixed bg-contain'>
      {showPopWindow && (
        <PopWindow
          documentName={selectedFile ? selectedFile.name || selectedFile.nombre : (props.nombre_carpeta || '')}
          onAccept={selectedFile ? handleAccept : deleteCarpetasAndDocuments}
          onCancel={handleCancel}
          icono={selectedFile ? contenido.icono : '/error-solid-240.png'}
          texto1={selectedFile ? contenido.texto1 : 'La carpeta'}
          texto2={selectedFile ? contenido.texto2 : 'será eliminada y todos los archivos dentro de esta. ¿Está seguro de que desea eliminarla de todos modos?'}
          aviso={selectedFile ? contenido.aviso : 'PRECAUCIÓN'}
        />
      )}
        <Toaster richColors position='top-center'/>
      <div className='w-full h-full px-6 flex flex-col'>
        <Navbar estilo='border-white text-white'/>
        <div className='items-center h-[calc(100vh-70px)] py-4 w-full flex flex-row'>
          <div className='w-[20rem] h-full'>
            <MenuManage empresa={servicio.empresa} sucursal={servicio.sucursal} titulo={servicio.titulo} resumen={servicio.resumen}/>
          </div>
          <div className='flex-1 overflow-auto h-full'>
            <Outlet context={{ onFileSelect: handleFileSelect, onActive: isActive, showPopWindow, onContent: handleContenido, deleteCarpeta: infoCarpeta}} />
          </div>
        </div>
      </div>
    </div>
  );

}
