import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../assets/firebase-config';

const ProtectedRoute = ({ element: Component }) => {
  return auth.currentUser ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
