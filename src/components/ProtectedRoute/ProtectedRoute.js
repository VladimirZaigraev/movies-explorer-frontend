import React from 'react';
import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  console.log('loggedIn', isLoggedIn)
  // console.log('component', component)
  return (
    isLoggedIn ? children : < Navigate replace to="/signin" />
  )
}

{/* <Route path="/profile" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                onSignOut={onSignOut} />
            </ProtectedRoute>
          } /> */}