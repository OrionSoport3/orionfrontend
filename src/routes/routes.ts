import Customers from "../pages/Customers";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import BaseDashboard from "../pages/layouts/BaseDashboard";

export const routes = [
    {
        path: "/",
        element: Welcome
    }, {
        path: "/login",
        element: Login
    }, {
        path: "/register",
        element: Register
    }, {
        path: "dashboard",
        element: BaseDashboard,
        children: [
            {
                path: "",
                element: Customers
            }
        ]
    }
]