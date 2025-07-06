import React from 'react';
import { 
  Users, 
  TestTube, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const DashboardOverview: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Bookings',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Revenue (This Month)',
      value: '₹2,45,000',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Tests',
      value: '10,247',
      change: '+156',
      changeType: 'positive',
      icon: TestTube,
      color: 'bg-purple-500'
    },
    {
      title: 'Test Packages',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: Package,
      color: 'bg-orange-500'
    }
  ];

  const recentBookings = [
    {
      id: 'B001',
      patientName: 'राज कुमार',
      testName: 'Complete Blood Count',
      amount: 299,
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 'B002',
      patientName: 'प्रिया शर्मा',
      testName: 'Lipid Profile',
      amount: 399,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'B003',
      patientName: 'अमित सिंह',
      testName: 'Thyroid Profile',
      amount: 599,
      status: 'confirmed',
      date: '2024-01-14'
    },
    {
      id: 'B004',
      patientName: 'सुनीता देवी',
      testName: 'Diabetes Care Package',
      amount: 899,
      status: 'completed',
      date: '2024-01-14'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'confirmed':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(booking.status)}
                    <div>
                      <p className="font-medium text-gray-900">{booking.patientName}</p>
                      <p className="text-sm text-gray-600">{booking.testName}</p>
                      <p className="text-xs text-gray-500">{booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{booking.amount}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200 text-center">
                <TestTube className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-primary-700">Add New Test</p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 text-center">
                <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-700">Create Package</p>
              </button>
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-700">View Customers</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-700">Analytics</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Database: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Payment Gateway: Active</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">SMS Service: Running</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;