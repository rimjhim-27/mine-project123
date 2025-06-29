import React from 'react';
import { useAuth } from './AuthProvider';
import AuthModal from './AuthModal';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Authentication Required</h2>
          <p className="text-secondary-600 mb-6">Please log in to access this page.</p>
          <AuthModal
            isOpen={true}
            onClose={() => window.location.href = '/'}
            onAuthSuccess={login}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;