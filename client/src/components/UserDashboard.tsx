import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  LogOut
} from 'lucide-react';
import { useAuth } from './auth/AuthProvider';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's bookings
    const fetchUserBookings = () => {
      try {
        // Get bookings from localStorage (in real app, this would be from API)
        const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const userSpecificBookings = allBookings.filter((booking: any) => 
          booking.patientEmail === user?.email
        );
        setUserBookings(userSpecificBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserBookings();
    }
  }, [user]);

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

  const handleDownloadReport = (bookingId: string) => {
    // Simulate report download
    alert(`Downloading report for booking ${bookingId}`);
  };

  const handleViewReport = (bookingId: string) => {
    // Simulate report viewing
    alert(`Viewing report for booking ${bookingId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">My Dashboard</h1>
              <p className="text-secondary-600">Welcome back, {user?.name}!</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-6">Profile Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900">{user?.name}</p>
                    <p className="text-sm text-secondary-600">Patient</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-secondary-400" />
                    <span className="text-secondary-700">{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-secondary-400" />
                    <span className="text-secondary-700">{user?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-secondary-400" />
                    <span className="text-secondary-700">
                      Member since {new Date(user?.createdAt || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Total Bookings</span>
                  <span className="font-semibold text-secondary-900">{userBookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Completed Tests</span>
                  <span className="font-semibold text-secondary-900">
                    {userBookings.filter(b => b.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Pending Tests</span>
                  <span className="font-semibold text-secondary-900">
                    {userBookings.filter(b => b.status === 'pending').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary-900">My Test Bookings</h2>
              </div>

              {userBookings.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-6">You haven't booked any tests yet. Start by browsing our test packages.</p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Browse Tests
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {userBookings.map((booking) => (
                    <div key={booking.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900">{booking.testName}</h3>
                          <p className="text-secondary-600 capitalize">{booking.testType} Test</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(booking.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-secondary-400" />
                            <span className="text-sm text-secondary-700">
                              {booking.collectionDate} at {booking.collectionTime}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-secondary-400" />
                            <span className="text-sm text-secondary-700">{booking.patientAddress}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-secondary-600">Amount: </span>
                            <span className="font-semibold text-secondary-900">₹{booking.price}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-secondary-600">Payment: </span>
                            <span className={`font-semibold ${
                              booking.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {booking.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      {booking.status === 'completed' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleViewReport(booking.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Report</span>
                          </button>
                          <button
                            onClick={() => handleDownloadReport(booking.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      )}

                      <div className="mt-4 text-xs text-secondary-500">
                        Booked on {new Date(booking.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;