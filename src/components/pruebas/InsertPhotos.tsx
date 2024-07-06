import { Formik } from 'formik';
import React, { useState } from 'react';
import { InputNew } from '../../utils/InputNew';
import { SignBoton } from '../Subcomponents/SignBoton';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const InsertPhotos = () => {
    const token = useSelector((state: RootState) => state.auth.token);

    const initialValues = {
        modelo: '',
        descripcion: '',
        foto: null,
    };

    const onSubmit = async (values: typeof initialValues) => {
        if (!token) {
            console.error('Token is null or undefined');
            return;
          }
        try {
            const response = await Api.postFile('carro', values, token);
            console.log(values);
            console.log(values.foto);
            console.log(values.modelo);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({
                values,
                handleSubmit,
                handleChange,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <InputNew texto="Modelo del vehiculo" name="modelo" type="text" value={values.modelo} onChange={handleChange} />
                    <input type="file" name="foto" id="foto" onChange={(e) => {
                        if (e.target.files) {
                            setFieldValue('foto', e.target.files[0]);
                        }
                    }} />
                    <InputNew texto="Descripcion" name="descripcion" type="text" value={values.descripcion} onChange={handleChange} />
                    <SignBoton type="submit" inside="SUBIR FOTO" />
                </form>
            )}
        </Formik>
    );
};
