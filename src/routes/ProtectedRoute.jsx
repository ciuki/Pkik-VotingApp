import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }) => {
    if (localStorage.getItem('token') === null) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };

export default ProtectedRoute;