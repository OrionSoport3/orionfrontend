import Customers from "../pages/Customers";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Restablish } from "../pages/Restablish";
import Welcome from "../pages/Welcome";
import BaseDashboard from "../pages/layouts/BaseDashboard";

export const routes = [
    {
        path: "/welcome",
        element: Welcome,
        protected: true
    }, {
        path: "/login",
        element: Login
    }, {
        path: "/restablecer_contraseña",
        element: Restablish
    }, {
        path: "/register",
        element: Register
    }, {
        path: "dashboard",
        element: BaseDashboard,
        protected: true,
        children: [
            {
                path: "",
                element: Customers,
                protected: true
            }
        ]
    }
]