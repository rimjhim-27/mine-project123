import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TestTube, 
  Package, 
  Users, 
  MessageSquare, 
  HelpCircle, 
  FileText, 
  Settings,
  LogOut,
  TrendingUp,
  Calendar,
  DollarSign,
  Activity
} from 'lucide-react';
import BookingsManager from './BookingsManager';
import TestsManager from './TestsManager';
import PackagesManager from './PackagesManager';
import TestimonialsManager from './TestimonialsManager';
import FAQManager from './FAQManager';
import ReportsManager from './ReportsManager';
import DashboardOverview from './DashboardOverview';

interface AdminDashboardProps {
  onLogout: () => void;
  adminEmail: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, adminEmail }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'packages', label: 'Test Packages', icon: Package },
    { id: 'tests', label: 'Individual Tests', icon: TestTube },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'bookings':
        return <BookingsManager />;
      case 'packages':
        return <PackagesManager />;
      case 'tests':
        return <TestsManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'faqs':
        return <FAQManager />;
      case 'reports':
        return <ReportsManager />;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Settings</h2><p>Settings panel coming soon...</p></div>;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img
                src="/Screenshot (82).png"
                alt="The LABs Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-secondary-900">The LABs</h1>
              <p className="text-xs text-secondary-600">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Admin Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 w-64 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">
                {adminEmail.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary-900 truncate">Admin</p>
              <p className="text-xs text-secondary-500 truncate">{adminEmail}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-secondary-900">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-secondary-600">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;