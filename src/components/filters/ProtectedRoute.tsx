import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
  element: JSX.Element;
  path: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
