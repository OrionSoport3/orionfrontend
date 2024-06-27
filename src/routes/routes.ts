import Customers from "../pages/Customers";
import Login from "../pages/Login";
import { NewServiceForm } from "../pages/NewServiceForm";
import Register from "../pages/Register";
import { Restablish } from "../pages/Restablish";
import Welcome from "../pages/Welcome";
import BaseDashboard from "../pages/layouts/BaseDashboard";

export const routes = [
    {
        path: "/welcome",
        element: Welcome,
        protected: true,
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
    },
    {
        path: "/dashboard",
        element: BaseDashboard,
        protected: true,
        children: [
            {
                path: "",
                element: Customers,
                protected: true,
            },
        ],
    },
];
