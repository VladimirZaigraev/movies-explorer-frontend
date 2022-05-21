import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

export const AutoriseProtectedRoute = () => {
  return (
    !localStorage.getItem('token') ? <Outlet /> : < Navigate to="/" />
  )
}