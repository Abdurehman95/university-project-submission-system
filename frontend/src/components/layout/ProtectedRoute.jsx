import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role.name.toLowerCase() !== role.toLowerCase()) {
    // Redirect to their appropriate dashboard if they try to access wrong one
    return <Navigate to={`/dashboard/${user.role.name.toLowerCase()}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
