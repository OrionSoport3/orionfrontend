import { Formik } from "formik";
import { Navbar } from "../components/loginComponents/Navbar";
import { InputLogin } from "../components/Subcomponents/InputLogin";
import { SignBoton } from "../components/Subcomponents/SignBoton";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { Api } from "../services/Api";
import { useNavigate } from 'react-router-dom';
import { login } from "../store";
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const validationSchema = Yup.object({
      email: Yup.string().email("Por favor ingrese un correo valido").required('Por favor ingrese su correo'),
      password: Yup.string().required("Por favor ingrese su contraseña"),
    });

    const initialValues = {
      email: '',
      password: '',
    }

    const onSubmit = async (values: typeof initialValues) => {
      const response = await Api.post('auth/login', values);

      switch (response.statusCode) {
        case 200: 
          localStorage.setItem('token', response.data.token);
          dispatch(login({ token: response.data.token, user: true }));
          navigate('/welcome');
          break
        case 401:
          toast.error('No existe un usuario con los datos proporcionados');
          break
        case 422:
          toast.error('El usuario y/o contraseña no son correctos');
          break
        default:
          toast.info(response.statusCode)
      }
    };

  return (
    <div className=" bg-fondo-it fixed w-screen h-screen bg-center bg-no-repeat bg-cover">
      <Toaster position="bottom-right" richColors/>
      <Navbar ruta="Registrarse" lugar="/register"/>
      <div className="flex justify-center flex-col items-center w-screen h-full ">
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
            <form onSubmit={handleSubmit} className=" h-auto md:smartwatch:flex-row md:smartwatch:w-screen md:smartwatch:items-center w-72 
            lg:w-[500px] bg-gradient-to-tr fixed from-blue-600 to-blue-950 md:px-6 flex flex-col items-center rounded-3xl overflow-hidden">
            <div className="bg-blue-100 bg-opacity-50 w-4/12 bottom-0 left-0 rounded-bl-2xl rounded-t-full absolute h-1/4"></div>
            <div className="bg-blue-100 bg-opacity-20 w-2/6 bottom-0 right-0 rounded-br-2xl rounded-t-full absolute h-4/5"></div>
            <div className="bg-blue-100 bg-opacity-40 w-2/6 bottom-0 rounded-t-full absolute h-3/6 "></div>
            <h3 className="font-crushed text-white  text-4xl nose:text-4xl md:text-5xl text-bold pt-9 ">INICIAR SESION</h3>
              <InputLogin type="text" name="email" label="email" placeholder="example@email.com" inside="Ingrese su correo:" value={values.email} error={errors.email} onChange={handleChange} />
              <InputLogin type="password" name="password" label="password" placeholder="*********" inside="Ingrese su contraseña:" value={values.password} error={errors.password} onChange={handleChange}/>
              <div className="w-11/12 pt-5 pl-3 BP1:pl-0 flex flex-row h-auto">
                <h3 className="BP1:text-xl text-base text-white hover:text-blue-300 font-josefin relative"><Link to="/restablecer_contraseña">¿Olvidó su contraseña?</Link></h3>
              </div>
              <SignBoton inside="Ingresar" type="submit" />
            </form>
          )}
          </Formik>
      </div>
    </div>
  )
};

export default Login;