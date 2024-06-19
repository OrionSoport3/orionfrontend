import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store/store';
import { routes } from './routes/routes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const router = createBrowserRouter(routes.map(route => ({
    ...route,
    element: route.protected
      ? <ProtectedRoute element={React.createElement(route.element)} />
      : React.createElement(route.element),
    children: route.children?.map(child => ({
      ...child,
      element: child.protected
        ? <ProtectedRoute element={React.createElement(child.element)} />
        : React.createElement(child.element),
    })),
  })));

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
