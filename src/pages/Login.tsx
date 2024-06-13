import { Formik } from "formik";
import { Navbar } from "../components/loginComponents/Navbar";
import { InputLogin } from "../components/Subcomponents/InputLogin";
import { SignBoton } from "../components/Subcomponents/SignBoton";


const Login = () => {

    const initialValues = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }

    const onSubmit = (values: typeof initialValues) => {
      console.log(values)
    }

  return (
    <div className=" bg-fondo-it w-screen relative h-screen bg-center bg-no-repeat bg-cover">
      <Navbar ruta="Registrarse" lugar="/register"/>
      <div className="flex justify-center smartwatch:justify-normal smartwatch:w-screen flex-col items-center w-screen h-full ">
          <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          >
            <form action="" className=" h-[380px] md:smartwatch:h-[150px] md:smartwatch:flex-row md:smartwatch:w-screen md:smartwatch:items-center 
            smartwatch:mt-20 smartwatch:h-auto w-72 md:altura-si:h-[460px] nose:h-[400px] nose:mt-14 md:altura-no:h-auto md:w-[400px] lg:h-[480px] 
            lg:w-[500px] bg-gradient-to-tr fixed from-blue-600 to-blue-950 md:px-6 flex flex-col items-center rounded-3xl overflow-hidden">
            <div className="bg-blue-100 bg-opacity-50 w-4/12 bottom-0 left-0 rounded-bl-2xl rounded-t-full absolute h-1/4 "></div>
            <div className="bg-blue-100 bg-opacity-20 w-2/6 bottom-0 right-0 rounded-br-2xl rounded-t-full absolute h-4/5"></div>
            <div className="bg-blue-100 bg-opacity-40 w-2/6 bottom-0 rounded-t-full absolute h-3/6"></div>
            <h3 className="font-crushed text-white  text-4xl nose:text-4xl md:text-5xl text-bold pt-9 md:smartwatch:w-2/5 md:smartwatch:text-2xl">INICIAR SESION</h3>
              <InputLogin type="text" name="email" label="email" placeholder="example@email.com" inside="Ingrese su correo:"/>
              <InputLogin type="password" name="password" label="password" placeholder="*********" inside="Ingrese su contraseña:"/>
              <SignBoton inside="Ingresar" />
            </form>
          </Formik>
      </div>
    </div>
  )
};

export default Login;