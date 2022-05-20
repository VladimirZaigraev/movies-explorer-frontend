import React from 'react';
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedIn, children, navigate }) => {
  console.log('ProtectedRoute', isLoggedIn)
  return (
    isLoggedIn ? children : < Navigate replace to={navigate} />
  )
}