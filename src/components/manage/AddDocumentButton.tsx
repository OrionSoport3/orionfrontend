import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';

export const AddDocumentButton = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const props = useParams<{id_carpeta: string; nombre_carpeta: string}>();

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
    }

    const onSubmit = async (values: typeof initialValues) => {
        const amigos = {
            ...values,
            id_carpeta: props.id_carpeta,
            nombre_carpeta: props.nombre_carpeta,
        }
        if (!values.file || !token) {
          console.log('File or token is missing');
          return;
      }
        try {
            const response = await Api.postFile('subir_archivo', amigos, token);
            if (response.statusCode === 201) {
              setFileName('');
            }
        } catch (error) {
            console.log('error', error);
        }
    }
  
    useEffect(() => {
      console.log();
    });

  return (
    <div className='w-fit h-fit flex flex-col justify-center absolute right-6 bottom-6'>
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
              ?  <div className='cursor-pointer text-white bg-morrado font-NATS text-xl py-2 px-4 rounded-xl flex flex-col'>
                    <span className="border-b-2">{fileName}</span>
                    <button className='' type="submit">SUBIR</button>
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

