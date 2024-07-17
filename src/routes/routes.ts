import { InsertPhotos } from "../components/pruebas/InsertPhotos";
import Login from "../pages/Login";
import { NewServiceForm } from "../pages/NewServiceForm";
import Register from "../pages/Register";
import { Restablish } from "../pages/Restablish";
import { ServiceInfo } from "../pages/ServiceInfo";
import Welcome from "../pages/Welcome";
import { Archivos } from "../pages/layouts/Management/Archivos";
import { StateDate } from "../pages/layouts/Management/StateDate";
import { Croquis } from "../pages/layouts/Management/Croquis";
import UserDetails from "../pages/layouts/Management/UserDetails";
import { Files } from "../pages/layouts/Management/FilesNames/Files";
import { Api } from "../services/Api";


export const routes = [
    {
        path: "/welcome",
        element: Welcome,
        protected: true,
    },
    {
        path: "/servicio/:id",
        element: ServiceInfo,
        protected: true,
        children: [
            {
                path:"fecha",
                element: StateDate,
                protected: true,
            },{
                path: "croquis",
                element: Croquis,
                protected: true,
            },{
                path: "archivos",
                element: Archivos,
                protected: true,
                children: [
                    {
                        path: "documentos/:id_carpeta/:nombre_carpeta",
                        element: Files,
                        protected: true,
                    }
                ],
            }, {
                path: "detalles_usuario",
                element: UserDetails,
                protected: true,
            }
        ]
    },
    {
        path: "/new_service",
        element: NewServiceForm,
        protected: true,
    },
    {
        path: "/login",
        element: Login,
        public: true
    },
    {
        path: "/restablecer_contraseña",
        element: Restablish,
        public: true
    },
    {
        path: "/register",
        element: Register,
        public: true
    },{
        path: "/insert_photo",
        element: InsertPhotos,
        protected: true
    },
];
