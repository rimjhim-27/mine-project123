import React, { useState } from 'react';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication check
    // In real app, this would make an API call to verify credentials
    if (email === 'rimjhim58096@gmail.com' && password === 'admin123') {
      setIsAuthenticated(true);
      setAdminEmail(email);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminEmail('');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} adminEmail={adminEmail} />;
};

export default AdminPanel;