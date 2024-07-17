import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';

type Props = {
}

export const AddDocumentButton = () => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const props = useParams<{id_carpeta: string}>();
    

    const initialValues = {
        file: null,
    }

    const onSubmit = async (values: typeof initialValues) => {
        const amigos = {
            ...values,
            id_carpeta: props.id_carpeta
        }
        if (token === null) {
            console.log('token cannot be null');
            return;
        }
        try {
            const response = await Api.postFile('subir_archivo', amigos, token);
            console.log(props.id_carpeta);
            console.log(response);
            console.log(values);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <h1>File Upload</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
            handleSubmit,
            handleChange,
            setFieldValue
        }) => (
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
              <label htmlFor="file">File</label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={(e) => {
                    if (e.target.files) {
                        setFieldValue('file', e.target.files[0]);
                    }
                }}
              />
            </div>
            <button type="submit">Upload</button>
          </form>
        )}
      </Formik>
      {fileUrl && (
        <div>
          <p>File uploaded successfully. You can download it <a href={fileUrl} target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      )}
    </div>
  );
};

