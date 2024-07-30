import React from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Api } from '../../services/Api';
import { toast } from 'sonner';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

type Props = {
  onCancel: (set: boolean) => void,
  placeholder: string,
};

export const EditFolderButton: React.FC<Props> = ({ onCancel, placeholder }) => {
  const { id, id_carpeta } = useParams<{ id: string; id_carpeta: string }>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const initialValues = {
    nuevo_nombre: '',
    id_actividad: id,
    id_carpeta: id_carpeta,
  };

  const onEdit = async (values: typeof initialValues) => {
    if (!token) {
        return toast.error('Ups, no hay token');
      }
    
    try {
      const response = await Api.postActivitie('update_carpeta', values, token);
      if (!response || !response.data) {
        throw new Error('Respuesta vacía del servidor');
      }
  
      console.log('Response:', response);
      switch (response.statusCode) {
        case 200:
          onCancel(false);
          navigate(`/servicio/${id}/archivos`);
          return;
        case 404:
          response.data.message.id ? toast.error(response.data.message.id) : '';
          onCancel(false);
          response.data.message.nombre ? toast.error(response.data.message.nombre) : '';
          return;
        default:
          onCancel(false);
      }
    } catch (error) {
      console.log('Error:', error);
    }
    onCancel(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onEdit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => (
            <div className='flex space-x-2 items-center'>
                <form onSubmit={handleSubmit} className='flex space-x-2 items-center'>
                    <div className='bg-morrado flex flex-row items-center rounded-xl overflow-hidden'>
                        <input name='nuevo_nombre' id='nuevo_nombre' className='h-10 outline-none autofill:bg-moradito p-2 border-r-2 bg-moradito text-white placeholder:text-slate-300' type="text" value={values.nuevo_nombre} onChange={handleChange} placeholder={placeholder} maxLength={10}/>
                    </div>
                    <button type='submit' className='w-fit h-fit border-2 border-black bg-white rounded-md hover:bg-[#d2d0dd]'>
                        <img src="/check-regular-240.png" alt="Aceptar Icono" className='h-6 max-w-6'/>
                    </button>
                </form>
                    <button type='button' className='w-fit h-fit border-2 border-black bg-white rounded-md hover:bg-[#d2d0dd]' onClick={() => {onCancel(false)}}>
                        <img src="/X.png" alt="Cancelar Icono" className='h-6 max-w-6'/>
                    </button>
            </div>
        )}
      </Formik>
    </div>
  );
};
