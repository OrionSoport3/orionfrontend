import { Outlet, useParams } from "react-router-dom";
import { AddFolderButton } from "../../../components/manage/AddFolderButton";
import { FolderButton } from "../../../components/manage/FolderButton";
import { useEffect, useRef, useState } from "react";
import { Api } from "../../../services/Api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export const Archivos = () => {
  const [carpetas, setCarpetas] = useState<any[]>([]);
  const [newCarpeta, setNewCarpeta] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const id = useParams<{id: string}>();
  const token = useSelector((state: RootState) => state.auth.token);
  
  const togglePopup = () => {
    setNewCarpeta((prev) => !prev);
  };

  const fetchInfo = async() => {
    try {
      const response = await Api.postActivitie('get_carpetas', id, token);
      const responsillo = response.data.carpetas.map((carpetillas: any) => ({
        id_carpeta: carpetillas.id_carpetas,
        id_actividad: carpetillas.id_actividad,
        nombre: carpetillas.nombre
      }));
      setCarpetas(responsillo);
      console.log(response);
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
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-row items-center justify-center">
        <h2 className="font-NATS text-4xl">ARCHIVOS DEL SERVICIO</h2>
      </div>
      <div className="flex flex-row space-x-4 items-center h-16">
        {carpetas.map((carpeta: any) => (
          <div key={carpeta.id_carpeta}>
            <FolderButton nombre={carpeta.nombre} id_carpeta={carpeta.id_carpeta}/>
          </div>
        ))}
        <div ref={containerRef}>
          <AddFolderButton change={togglePopup} mostrar={newCarpeta} />
        </div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};
