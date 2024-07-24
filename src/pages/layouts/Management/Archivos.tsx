import { Outlet, useParams } from "react-router-dom";
import { AddFolderButton } from "../../../components/manage/AddFolderButton";
import { FolderButton } from "../../../components/manage/FolderButton";
import { useEffect, useRef, useState } from "react";
import { Api } from "../../../services/Api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Toaster } from "sonner";


export const Archivos = () => {
  const [carpetas, setCarpetas] = useState<any[]>([]);
  const [newCarpeta, setNewCarpeta] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carpeta_nombre = useParams<{nombre_carpeta: string}>();
  const id = useParams<{id: string}>();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const togglePopup = () => {
    setNewCarpeta((prev) => !prev);
  };

  const fetchInfo = async () => {
    try {
      const response = await Api.postActivitie('get_carpetas', id, token);
      const responsillo = response.data.carpetas.map((carpetillas: any) => ({
        id_carpeta: carpetillas.id_carpetas,
        id_actividad: carpetillas.id_actividad,
        nombre: carpetillas.nombre
      }));
      setCarpetas(responsillo);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchInfo();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setNewCarpeta(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [token]);


  return (
    <div className="w-full h-full pl-6 flex flex-col">
      <Toaster richColors position="bottom-right"/>
      <div className="w-full h-10 flex items-center justify-center">
        <h2 className="font-NATS text-4xl shadow-white ">ARCHIVOS DEL SERVICIO</h2>
      </div>
      <div className="w-full flex overflow-x-auto overflow-y-hidden no-scroll h-20 items-center space-x-4">
        <div ref={containerRef} id="add" className="h-10 flex flex-col items-center justify-center">
          <AddFolderButton change={togglePopup} mostrar={newCarpeta}/>
        </div>
        <div className="w-max flex space-x-4 flex-row items-center justify-center">
          {carpetas.map((carpeta: any) => (
            <div key={carpeta.id_carpeta} id={carpeta.id_carpeta} className="w-full h-full">
              {carpeta.nombre === carpeta_nombre.nombre_carpeta ? (
                <FolderButton nombre={carpeta.nombre} id_carpeta={carpeta.id_carpeta} css="bg-moradito"/>
              ) : (
                <FolderButton nombre={carpeta.nombre} id_carpeta={carpeta.id_carpeta}/>
              )}
            </div>
          ))} 
        </div>
      </div>
      <div className=" w-full h-full overflow-x-hidden flex">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
  
  
};
