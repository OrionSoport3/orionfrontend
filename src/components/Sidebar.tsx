import React, { useEffect, useRef, useState } from 'react';
import { Checkbox } from "./Checkbox";
import { Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Root } from 'react-dom/client';
import { LoadingItems } from '../utils/LoadingItems';

interface SidebarProps {
  menuAbierto: boolean;
  toggleMenu: () => void;
  empresas: any[],
  busqueda: (parametros: any) => void,
}

const SidebarComponent: React.FC<SidebarProps> = ({ menuAbierto, toggleMenu, empresas, busqueda }) => {

  const [selectedEmpresas, setSelectedEmpresas] = useState<any[]>([]);
  const today = new Date().toISOString().split('T')[0];
  const isLoadingEmpresas = useSelector((state: RootState) => state.empresasGente.isLoading);
  const isCompletedEmpresas = useSelector((state: RootState) => state.empresasGente.isCompleted);
  const contenedorPrincipalRef = useRef<HTMLDivElement>(null);
  const [numeroDeItems, setNumeroDeItems] = useState<number>(0);

  useEffect(() => {
    if (contenedorPrincipalRef.current) {
      const alturaTotal = contenedorPrincipalRef.current.offsetHeight;
      const valorDividido = alturaTotal / 8;
      const valorRedondeado = Math.round(valorDividido);
      setNumeroDeItems(valorRedondeado);
    }
  }, []);

  const initialValues = {
    fecha_inicio: '',
    fecha_final: '',
    nombre_actividad: '',
  }


  const adjuntarEmpresa = (id: number) => {
    const empresario = empresas.find(emprese => emprese.id_empresa === id).id_empresa;
    if (!empresario) {
      return
    }
    setSelectedEmpresas(prevSelectedEmpresas => {
      if (prevSelectedEmpresas.includes(empresario)) {
          return prevSelectedEmpresas.filter(emp => emp !== empresario);
      } else {
          return [...prevSelectedEmpresas, empresario];
      }
  });
    
  }

  const buscar = (values: typeof initialValues) => {
    const nuevosValores = {
      ...values,
      empresas: selectedEmpresas,
    }
    busqueda(nuevosValores);
  }

  useEffect(() => {
    if (contenedorPrincipalRef.current) {
      const alturaTotal = contenedorPrincipalRef.current.offsetHeight;
      const valorDividido = alturaTotal / 8;
      const valorRedondeado = Math.round(valorDividido);
      setNumeroDeItems(valorRedondeado);
    }
  }, []);

  return (
  <div className={`w-full h-full transform transition-all duration-500 ${menuAbierto ? 'w-[18rem] md:w-[20rem]' : 'w-6 sm:w-9 BP1:w-10 h-fit  opacity-100'}`}>
      <Formik
      initialValues={initialValues}
      onSubmit={buscar}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit} className='h-full '>
            <div className={` ${menuAbierto ? 'h-full w-full overflow-hidden flex flex-col' : 'h-fit w-full'}`}>
            <div className="flex justify-between items-center">
                <h1 className={`flex-grow text-black font-bold text-xl sm:text-2xl BP1:text-3xl  font-marcellus transform transition-transform duration-500
                  ${menuAbierto ? 'opacity-100' : 'w-[0px] opacity-0 hidden'}`}>FILTRAR</h1>
                <button className="list_arrow ml-auto outline-none" onClick={toggleMenu} type='button'>
                  <img src="/chevrons-right-solid-240.png" className={`h-6 sm:h-8 md:m-0 md:h-10 transform transition-transform duration-200 ${menuAbierto ? 'rotate-90' : 'rotate-0'}`} />
                </button>
            </div>
            <div className={`w-full transform transition-all duration-500 ${menuAbierto ? ' h-fit flex border-b-2 border-black pb-3 opacity-100' : 'opacity-0 hidden'}`}></div>
            <div className={` pt-2 md:pt-3 transform transition-all duration-200 ${menuAbierto ? 'opacity-100' : 'opacity-0 pointer-events-none h-[0px] w-[0px] '}`}>
              <h3 className="font-josefin text-sm sm:text-base md:text-xl font-bold truncate">Fecha inicial</h3>
                <div className="h-fit flex flex-col mt-3 justify-start space-y-3">
                  <div className="flex">
                    <Field type="date" className="bg-white rounded-lg w-full h-9 BP1:h-10 pl-2 outline-none shadow-lg" name="fecha_inicio" value={values.fecha_inicio} onChange={handleChange}/>
                    <button type="button" className="ml-5 px-2 py-1 bg-gradient-to-r from-blue-button to-black rounded-lg text-white md:text-lg text-base hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer" onClick={() => setFieldValue('fecha_inicio', today)} >
                      Hoy
                    </button>
                  </div>
                  <h3 className="font-josefin text-sm sm:text-base md:text-xl font-bold truncate">Fecha final</h3>
                  <div className="flex">
                    <Field type="date" className="bg-white rounded-lg w-full h-9 BP1:h-10 pl-2 outline-none shadow-lg" name="fecha_final" value={values.fecha_final} onChange={handleChange}/>
                    <button type="button" className="ml-5 px-2 py-1 bg-gradient-to-r from-blue-button to-black rounded-lg text-white md:text-lg text-base hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer" onClick={() => setFieldValue('fecha_final', today)}>
                      Hoy
                    </button>
                  </div>
                  <br />
                    <button type="submit" className="px-2 py-1 bg-gradient-to-r from-blue-button to-black rounded-lg text-white md:text-lg text-base hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer mt-3">
                      Consultar
                    </button>
                  </div>
                  <h3 className="font-josefin text-base md:text-xl font-bold mt-6 truncate">Nombre del proyecto</h3>
                    <div className="flex mt-3 justify-start">
                      <input className="bg-white rounded-lg w-full h-9 BP1:h-10 pl-2 outline-none shadow-lg" type="text" name='nombre_actividad' placeholder="Buscar.." value={values.nombre_actividad} onChange={handleChange}/>
                      <button  className="h-auto px-2 py-1 bg-gradient-to-r from-blue-button to-black rounded-lg md:text-lg text-base text-white justify-end ml-5 hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer transition ease-in-out duration-500" type="submit">Buscar</button>
                    </div>
                </div>
                <div className={`w-full h-fit flex items-center justify-between mt-3 pt-1 ${menuAbierto ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  <h3 className={` ${menuAbierto ? 'opacity-100 font-josefin text-base md:text-xl font-bold' : 'opacity-0 w-[0px] h-[0px] overflow-hidden'}`}>Empresas</h3> 
                  <div className='w-fit h-full flex justify-between items-center font-josefin space-x-3'>
                    <button className='w-full shadow rounded-md py-1 px-2 hover:bg-[#dddfeb]'>Limpiar</button>
                    <button className='w-full shadow rounded-md py-1 px-2 hover:bg-[#dde3eb]'>Todos</button>
                  </div>     
                </div>
                <div className={` ${menuAbierto ? 'max-h-full w-full overflow-y-auto' : 'w-[0px] h-[0px] opacity-0 overflow-hidden'}`}>
                    <div ref={contenedorPrincipalRef} className='w-full h-full'>
                      <div className='h-full w-full overflow-y-auto'>
                        {isCompletedEmpresas 
                        ? <>
                            {empresas.map((empresa: any, index: number) => (
                              <div key={empresa.id_empresa} className=''> 
                                <Checkbox key={index} name={empresa.nombre_empresa} label={empresa.nombre_empresa} select={() => {adjuntarEmpresa(empresa.id_empresa)}}/>
                              </div>
                            ))} 
                          </>
                        : (isLoadingEmpresas 
                            ? <div className='w-full h-full space-y-4'>
                                {Array.from({ length: numeroDeItems }).map((_, index) => (
                                  <div key={index} className="h-fit w-full space-y-1">
                                      <div className='w-full h-8 flex flex-col items-center justify-center'>
                                          <span className='animated-gradient'></span>
                                      </div>
                                  </div>
                                ))}
                              </div>
                            : 'No hay actividades'
                          )
                        }

                      </div>
                    </div>
                  </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export const Sidebar = React.memo(SidebarComponent);