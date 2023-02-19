import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const ProtectedRouteElement = () => {
  const { loggedIn } = useContext(CurrentUserContext);
  return (
    loggedIn ? <HomePage /> : <Navigate to="/sign-in" replace />
  )
}

export default ProtectedRouteElement;
