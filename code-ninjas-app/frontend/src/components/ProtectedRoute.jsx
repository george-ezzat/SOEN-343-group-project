import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ element: Component, adminOnly, ...rest }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    alert('You must be logged in to access this page');
    return <Navigate to="/" />;
  }

  if (adminOnly && !isAdmin) {
    alert('You must be an admin to access this page');
    return <Navigate to="/" />;
  }

  return Component;
};

export default ProtectedRoute;