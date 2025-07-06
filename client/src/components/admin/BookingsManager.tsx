import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';

const BookingsManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock bookings data
  const bookings = [
    {
      id: 'B001',
      patientName: 'राज कुमार',
      patientEmail: 'raj.kumar@email.com',
      patientPhone: '+917870810192',
      patientAddress: 'कंकड़बाग, पटना, बिहार 800020',
      testType: 'package',
      testName: 'Complete Health Checkup',
      price: 1499,
      collectionDate: '2024-01-16',
      collectionTime: '08:00 AM - 10:00 AM',
      status: 'confirmed',
      paymentStatus: 'completed',
      paymentId: 'pay_123456789',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'B002',
      patientName: 'प्रिया शर्मा',
      patientEmail: 'priya.sharma@email.com',
      patientPhone: '+917870810193',
      patientAddress: 'बोरिंग रोड, पटना, बिहार 800001',
      testType: 'individual',
      testName: 'Lipid Profile',
      price: 399,
      collectionDate: '2024-01-16',
      collectionTime: '10:00 AM - 12:00 PM',
      status: 'pending',
      paymentStatus: 'pending',
      paymentId: null,
      createdAt: '2024-01-15T14:20:00Z'
    },
    {
      id: 'B003',
      patientName: 'अमित सिंह',
      patientEmail: 'amit.singh@email.com',
      patientPhone: '+917870810194',
      patientAddress: 'राजेंद्र नगर, पटना, बिहार 800016',
      testType: 'individual',
      testName: 'Thyroid Profile',
      price: 599,
      collectionDate: '2024-01-15',
      collectionTime: '06:00 AM - 08:00 AM',
      status: 'completed',
      paymentStatus: 'completed',
      paymentId: 'pay_987654321',
      createdAt: '2024-01-14T09:15:00Z'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleUpdateStatus = (bookingId: string, newStatus: string) => {
    // In real app, this would make an API call
    console.log(`Updating booking ${bookingId} status to ${newStatus}`);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      // In real app, this would make an API call
      console.log(`Deleting booking ${bookingId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.patientName}</div>
                      <div className="text-sm text-gray-500">{booking.patientPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.testName}</div>
                    <div className="text-sm text-gray-500 capitalize">{booking.testType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{booking.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.collectionDate}</div>
                    <div className="text-sm text-gray-500">{booking.collectionTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(booking.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Booking Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Booking ID</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created At</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedBooking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Patient Info */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Patient Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {selectedBooking.patientName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedBooking.patientName}</p>
                      <p className="text-sm text-gray-500">Patient Name</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedBooking.patientPhone}</p>
                      <p className="text-sm text-gray-500">Phone Number</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedBooking.patientEmail}</p>
                      <p className="text-sm text-gray-500">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedBooking.patientAddress}</p>
                      <p className="text-sm text-gray-500">Collection Address</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Info */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Test Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Test Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBooking.testName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Test Type</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{selectedBooking.testType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Collection Date</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBooking.collectionDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Collection Time</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedBooking.collectionTime}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Payment Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">₹{selectedBooking.price}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.paymentStatus)}`}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                  {selectedBooking.paymentId && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Payment ID</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{selectedBooking.paymentId}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Update */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Update Status</h4>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'confirmed')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'completed')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedBooking.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManager;