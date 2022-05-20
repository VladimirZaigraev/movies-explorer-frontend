import React from 'react';
import { Navigate } from "react-router-dom";

export const AutoriseProtectedRoute = ({ isLoggedIn, children }) => {
  console.log('ProtectedRoute', isLoggedIn)
  return (
    !isLoggedIn ? children : < Navigate replace navigate="/" />
  )
}