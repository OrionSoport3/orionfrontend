import React, { useState, memo } from 'react';
import { Formik } from 'formik';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';

type Props = {
  onChange: (newValue: boolean) => void;
  onConflict: (file: any) => void;
  onContent: (objeto: any) => void;
  value: boolean;
}

const AddDocumentButtonComponent: React.FC<Props> = ({ onChange, onConflict, value, onContent }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const props = useParams<{id: string; id_carpeta: string; nombre_carpeta: string}>();

  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        console.log('El archivo excede el tamaño máximo permitido de 10MB');
      } else {
        setFileName(event.target.files[0].name);
      }
    } else {
      setFileName('Ningún archivo seleccionado');
    }
  };

  const initialValues = {
    file: null,
  };

  const onSubmit = async (values: typeof initialValues) => {
    const amigos = {
      ...values,
      id_carpeta: props.id_carpeta,
      nombre_carpeta: props.nombre_carpeta,
    };
    if (!values.file || !token) {
      console.log('File or token is missing');
      return;
    }
    try {
      const response = await Api.postFile('subir_archivo', amigos, token);
      switch (response.statusCode) {
        case 201:
          setFileName('');
          window.location.reload();
          break;
        case 409:
          onChange(!value);
          onContent({ icono: '/error-regular-240.png', texto1: 'El archivo', texto2: 'ya se encuentra actualmente en la carpeta. ¿Desea reemplazarlo?', aviso: 'Advertencia' });
          onConflict(amigos.file);
          setFileName('');
          break;
        default:
          console.log(response.data);
          break;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='w-fit h-fit flex flex-col justify-center absolute bottom-8 right-12 z-40'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
            handleSubmit,
            setFieldValue
        }) => (
          <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col text-white items-center justify-center'>
            <div className='flex flex-col items-center'>
              {fileName 
              ?  <div className='cursor-pointer  text-white bg-morrado font-NATS text-xl py-2 pl-3 rounded-xl h-full flex flex-row items-center'>
                    <div className='flex flex-col w-full'>
                      <span className="border-b-2">{fileName}</span>
                      <button className='' type="submit">SUBIR</button>
                    </div>
                    <button onClick={() => {setFileName('')}} className='h-full px-3'>
                      <img src="/trash_can.png" alt="Delete Icon" className='h-8 w-9'/>
                    </button>
                </div>
              : <>
                  <label htmlFor="file-upload" className="cursor-pointer bg-morrado text-white py-2 px-4 rounded-lg font-NATS text-2xl">
                    SUBIR ARCHIVO
                  </label>
                  <input
                      id="file-upload"
                      name="file"
                      className='hidden'
                      multiple
                      type="file"
                      accept='.xlsx,.xls,.ppt,.pptx,.doc,.docx,.pdf,.txt,.png,.jpeg,.jpg'
                      onChange={(e) => {
                          if (e.target.files) {
                              setFieldValue('file', e.target.files[0]);
                              handleFileChange(e);
                          }
                      }}
                    />
                </>
              }
              </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export const AddDocumentButton = memo(AddDocumentButtonComponent);
