import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { startLoginRedirect } from './session';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const profileReturnTo = `${window.location.origin}/profile`;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      startLoginRedirect(profileReturnTo);
    }
  }, [isAuthenticated, loading, profileReturnTo]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
