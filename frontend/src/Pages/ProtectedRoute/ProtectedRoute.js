import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashBoard from '../DashBoard/DashBoard';

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useSelector((state) => state.user);

    { user && user.isAuthenticated ? <DashBoard /> : <Navigate to="/login" /> }
};

export default ProtectedRoute;
