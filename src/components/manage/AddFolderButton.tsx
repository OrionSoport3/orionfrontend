import React from 'react';
import { Formik } from "formik";
import { Api } from '../../services/Api';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

type Props = {
  change: () => void,
  mostrar: boolean,
};

export const AddFolderButton: React.FC<Props> = ({ change, mostrar }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const id = useParams<{id: string}>();

  const initialValues = {
    nombre: '',
    id: id.id,
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await Api.postActivitie('post_carpeta', values,token );
      switch (response.statusCode) {
        case 202:
          toast.success('Nueva carpeta creada exitosamente');
          change();
          window.location.reload();
          return;
        case 422:
          response.data.message.id ? toast.error(response.data.message.id) : '';
          response.data.message.nombre ? toast.error(response.data.message.nombre) : '';
          return;
        default:
        }
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <div>
      {mostrar ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            values,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className='bg-morrado flex flex-row items-center rounded-xl overflow-hidden'>
                <input name='nombre' id='nombre' className='outline-none autofill:bg-morrado p-2 border-r-2 bg-morrado text-white placeholder:text-slate-300' type="text" value={values.nombre} onChange={handleChange} placeholder='Nombre de la carpeta' />
                <button type='submit' className='w-10 h-10'><img src="/check-blanco.png" alt="Check"/></button>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <button onClick={() => {change()}} id='add' className='w-8 h-8 rounded-xl bg-morrado text-white flex justify-center items-center text-3xl hover:h-10 hover:w-10 transform transition-all duration-150'>
          <h1 className='text-center align-middle -mt-1'>+</h1>
        </button>
      )}
    </div>
  );
};
