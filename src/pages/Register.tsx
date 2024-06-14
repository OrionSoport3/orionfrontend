import { Formik } from "formik";
import { Navbar } from "../components/loginComponents/Navbar";
import { InputLogin } from "../components/Subcomponents/InputLogin";
import { SignBoton } from "../components/Subcomponents/SignBoton";
import { TituloSection } from "../components/register/TituloSection";
import { Api } from "../services/Api";
import * as Yup from 'yup';
const Register = () => {

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "El nombre minimo debe contener al menos 3 letras").max(100).required("Por favor ingrese un nombre"),
    email: Yup.string().email("Por favor ingrese un correo valido").required(),
    birthday: Yup.date().required(),
    password: Yup.string().min(8, "La contraseña debe contener al menos 8 caracteres").max(20,"Su contraseña debe estar entre 8 y 20 caracteres").required("Por favor ingrese una contraseña"),
    password_confirmation: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required("Confirme su contraseña"),
    token: Yup.string().ensure()
  });

  const valoresIniciales = {
    name: '',
    lastname: '',
    birthday: '',
    departamento: '',
    email: '',
    password: '',
    password_confirmation: '',
    token: '',
  };

  const onSubmit = (values: typeof valoresIniciales) => {
    console.log(values);
    Api.post('auth/register',values).then(response => {
      console.log(response);
    })
  };

  return (
    <div className=" w-screen fixed h-screen">
      <Navbar ruta="Iniciar sesion" lugar="/"/>
      <div className="flex bg-fondo-register bg-no-repeat bg-cover mt-14 bg-center flex-col min-h-screen  items-center w-screen h-screen overflow-y-auto">
          <Formik
            initialValues={valoresIniciales}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({
                values,
                errors,
                handleChange,
                handleSubmit,
                /* and other goodies */
              }) => (

            <form onSubmit={handleSubmit} className="mt-14 mb-44 w-10/12 md:w-9/12 xl:w-1/2 h-auto bg-gradient-to-tr relative from-blue-600 to-blue-950  md:px-6 flex flex-col items-center rounded-3xl">
              <div className="bg-blue-100 bg-opacity-50 w-4/12 bottom-0 left-0 rounded-bl-[4000px] sm:rounded-bl-[2000px] md:rounded-bl-[2000px] rounded-t-full absolute h-1/4"></div>
              <div className="bg-blue-100 bg-opacity-40 w-2/6 bottom-0 rounded-t-full absolute rounded-b-2xl h-3/6"></div>
              <div className="bg-blue-100 bg-opacity-20 w-2/6 bottom-0 right-0 rounded-br-[4000px] sm:rounded-br-[2000px] md:rounded-br-[2000px] rounded-t-full absolute h-4/5"></div>
              <h3 className="font-crushed text-white text-4xl md:text-6xl text-bold pt-9 ">REGISTRARSE</h3>
              <TituloSection contenido="DATOS PERSONALES" />
              <div className="flex-wrap med:flex-nowrap sm:flex sm:flex-row  md:text w-full pb-7">
                <InputLogin type="text" name="name" label="name" placeholder="" inside="Ingrese sus nombres:" error={errors.name} onChange={handleChange} value={values.name}/>
                <InputLogin type="text" name="lastname" label="lastname" inside="Ingrese sus apellidos:" onChange={handleChange}/>
                <InputLogin type="date" name="birthday" label="birthday" inside="Fecha de nacimiento:" onChange={handleChange}/>
              </div>
              <TituloSection contenido="DATOS DE USUARIO" />
              <div className=" sm:flex sm:flex-row md:text w-full">
                <InputLogin type="text" name="departamento" label="departamento" placeholder="" inside="Departamento:"  onChange={handleChange}/>                
                <InputLogin type="email" name="email" label="correo" inside="Escriba su correo:" onChange={handleChange} error={errors.email} value={values.email}/>
              </div>
                <InputLogin type="password" name="password" label="password" placeholder="****************" inside="Ingrese su contraseña:" error={errors.password} onChange={handleChange} value={values.password}/>
                <InputLogin type="password" name="password_confirmation" label="password_confirmation" placeholder="****************" inside="Confirme su contraseña:" error={errors.password_confirmation} onChange={handleChange} value={values.password_confirmation} />
                <div className="w-4/5 mt-10 h-[125px] BP1:h-auto bg-blue-950 flex justify-center items-center relative z-50 rounded-3xl px-4 BP1:px-10">
                  <InputLogin csslabel="w-full pl-1 text-white font-josefin text-base nose:text-base md:text-xl mt-0 py-0 pb-3 truncate" css="flex flex-col justify-center w-full items-cent pt-0 h-[150px]"
                  type="password" name="token" label ="token" placeholder="****" inside="Token de seguridad" error={errors.token} value={values.token} onChange={handleChange}/>
                </div>
              <SignBoton inside="Ingresar" type="submit" /> 
            </form>
          )}
          </Formik>
      </div>
    </div>
  )
}

export default Register