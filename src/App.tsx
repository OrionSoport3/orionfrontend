import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import {createElement} from "react";
import { routes } from "./routes/routes";

function App() {

  const router = createBrowserRouter(routes.map(route => ({
    ...route,
    element: createElement(route.element),
    children: route.children?.map((child) => ({
      ...child,
      element: createElement(child.element)
    }))

  })));

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
