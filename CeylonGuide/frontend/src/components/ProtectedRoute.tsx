import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    if (allowedRole === 'admin') return <Navigate to="/admin/login" state={{ from: location }} replace />;
    if (allowedRole === 'guide') return <Navigate to="/guide/login" state={{ from: location }} replace />;
    return <Navigate to="/tourist/login" state={{ from: location }} replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to respective dashboard if logged in with wrong role
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'guide') return <Navigate to="/guide/dashboard" replace />;
    return <Navigate to="/tourist/dashboard" replace />;
  }

  return <>{children}</>;
};