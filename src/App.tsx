import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { persistor, store } from './store/store';
import { routes } from './routes/routes';
import ProtectedRoute from './components/ProtectedRoute';
import { PersistGate } from 'redux-persist/integration/react';

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
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
