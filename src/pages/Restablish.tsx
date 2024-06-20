import { Formik } from "formik";
import { Navbar } from "../components/loginComponents/Navbar";
import { InputLogin } from "../components/Subcomponents/InputLogin";
import * as Yup from 'yup';
import { Api } from "../services/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SignBoton } from "../components/Subcomponents/SignBoton";


export const Restablish = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email("Por favor ingrese un correo valido").required("El campo correo es necesario"),
        password: Yup.string().min(8, "La contraseña debe contener al menos 8 caracteres").max(20,"Su contraseña debe estar entre 8 y 20 caracteres").required("Por favor ingrese una contraseña"),
        password_confirmation: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required("Confirme su contraseña"),
        token: Yup.string().ensure()
      });

    const initialValues = {
        email: '',
        token: '',
        password: '',
        password_confirmation: '',

    }

    const onSubmit = async (values: typeof initialValues) => {
        const response = await Api.post('auth/update', values);
    
        if (response.statusCode === 200) {
            navigate('/login');
            console.log(response);
            toast.success('Registro exitoso');
        } else {
          toast.error('Token incorrecto');
        }
    };

  return (
    <div className="w-screen fixed h-screen">
        <Navbar ruta="Iniciar sesion" lugar="/login" isRestablish={true} segundoLugar="/register" segundaRuta="Registrarse" color="bg-azul-hombre"/>
        <div className="flex bg-fondito bg-no-repeat bg-cover mt-14 bg-center flex-col min-h-screen  items-center w-screen h-screen overflow-y-auto">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
            {({
                values,
                errors,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit} className=" mt-14 mb-44 w-10/12 md:w-9/12 xl:w-1/2 h-auto bg-gradient-to-tr relative from-azulote to-azulaso md:px-6 flex flex-col items-center rounded-3xl">
                    <div className="bg-blue-100 bg-opacity-50 w-4/12 bottom-0 left-0 rounded-bl-[4000px] sm:rounded-bl-[2000px] md:rounded-bl-[2000px] rounded-t-full absolute h-1/4"></div>
                    <div className="bg-blue-100 bg-opacity-40 w-2/6 bottom-0 rounded-t-full absolute rounded-b-2xl h-3/6"></div>
                    <div className="bg-blue-100 bg-opacity-20 w-2/6 bottom-0 right-0 rounded-br-[4000px] sm:rounded-br-[2000px] md:rounded-br-[2000px] rounded-t-full absolute h-4/5"></div>
                    <h3 className="font-crushed text-white w-10/12 text-4xl text-center sm:text-4xl  md:text-5xl text-bold pt-9 ">RESTABLECER CONTRASEÑA</h3>
                    <div className="w-full pb-7">
                    <InputLogin type="text" name="email" label="email" placeholder="example@email.com" inside="Ingrese su correo:" value={values.email} error={errors.email} onChange={handleChange}/>
                    <InputLogin type="password" name="password" label="password" placeholder="****************" inside="Ingrese su contraseña:" error={errors.password} onChange={handleChange} value={values.password}/>
                    <InputLogin type="password" name="password_confirmation" label="password_confirmation" placeholder="****************" inside="Confirme su contraseña:" error={errors.password_confirmation} onChange={handleChange} value={values.password_confirmation} />
                    </div>
                    <div className="w-4/5 BP1:mt-10 h-[125px] BP1:h-auto bg-azul-hombre flex justify-center items-center relative z-50 rounded-3xl px-4 BP1:px-10">
                        <InputLogin csslabel="w-full pl-1 text-white font-josefin text-base nose:text-base md:text-xl mt-0 py-0 pb-3 truncate" css="flex flex-col justify-center w-full items-cent pt-0 h-[150px]"
                        type="password" name="token" label ="token" placeholder="****" inside="Token de seguridad" error={errors.token} value={values.token} onChange={handleChange}/>
                    </div>
                    <SignBoton inside="Ingresar" type="submit" color="bg-azul-hombre hover:bg-azul-gris"/>
                </form>
              )}
            </Formik>
        </div>
    </div>
  )
}
