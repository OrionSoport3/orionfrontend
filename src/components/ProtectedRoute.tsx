// components/ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    
    const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;
