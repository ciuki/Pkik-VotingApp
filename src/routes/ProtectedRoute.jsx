import React from 'react';
import { Route, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }) => {
    if (localStorage.getItem('token') === null) {
      toast.error("Najpierw musisz się zalogować!", {
        position: "top-center",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };

export default ProtectedRoute;