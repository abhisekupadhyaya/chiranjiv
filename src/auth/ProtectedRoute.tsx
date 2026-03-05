import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { startLoginRedirect } from './session';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, isLoggingOut } = useAuth();
  const profileReturnTo = `${window.location.origin}/profile`;

  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoggingOut) {
      startLoginRedirect(profileReturnTo);
    }
  }, [isAuthenticated, loading, isLoggingOut, profileReturnTo]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (isLoggingOut) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
