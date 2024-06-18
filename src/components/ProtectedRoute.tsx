// components/ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        const navigate = useNavigate();
        navigate('/login')
    }

    return element;
};

export default ProtectedRoute;
