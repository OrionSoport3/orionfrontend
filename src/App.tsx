import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { persistor, store } from './store/store';
import { routes } from './routes/routes';
import ProtectedRoute from './components/filters/ProtectedRoute';
import PublicRoute from './components/filters/PublicRoutes';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const router = createBrowserRouter(
    routes.map(route => ({
      path: route.path,
      element: route.protected
        ? <ProtectedRoute element={React.createElement(route.element)}/>
        : route.public
          ? <PublicRoute element={React.createElement(route.element)}/>
          : React.createElement(route.element),
      children: route.children?.map(child => ({
        path: child.path,
        element: child.protected
          ? <ProtectedRoute element={React.createElement(child.element)}/>
          : React.createElement(child.element),
      })),
    }))
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
