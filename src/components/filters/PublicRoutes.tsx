import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';

interface PublicRouteProps {
  element: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);

  if (isLogged ) {
    return <Navigate to="/welcome" />;
  }

  return element;
};

export default PublicRoute;
