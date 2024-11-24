import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}