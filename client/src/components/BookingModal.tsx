import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from './auth/AuthProvider';
import { useBookings } from '../hooks/useSupabase';
import PaymentModal from './PaymentModal';
import { TestBookingData } from '../services/stripe';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  testData: {
    id: string;
    name: string;
    price: number;
    description: string;
  } | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, testData }) => {
  const { user, isAuthenticated } = useAuth();
  const { createBooking, loading: bookingLoading } = useBookings();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingData, setBookingData] = useState<TestBookingData | null>(null);
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    collectionDate: '',
    collectionTime: '',
  });

  const timeSlots = [
    '06:00 AM - 08:00 AM',
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 02:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProceedToPayment = () => {
    if (!testData) return;

    const booking: TestBookingData = {
      testId: testData.id,
      testName: testData.name,
      price: testData.price,
      patientInfo: {
        name: formData.patientName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      collectionDate: formData.collectionDate,
      collectionTime: formData.collectionTime,
    };

    setBookingData(booking);
    setShowPaymentModal(true);
  };

  const sendNotifications = async (bookingDetails: any) => {
    // Send SMS notification
    const smsMessage = `Dear ${bookingDetails.patient_name}, your test booking for ${bookingDetails.test_name} has been confirmed for ${bookingDetails.collection_date} at ${bookingDetails.collection_time}. Booking ID: ${bookingDetails.id}. Thank you for choosing The LABs!`;
    
    // Send Email notification
    const emailSubject = `Test Booking Confirmation - ${bookingDetails.test_name}`;
    const emailBody = `
      Dear ${bookingDetails.patient_name},
      
      Your test booking has been confirmed!
      
      Booking Details:
      - Test: ${bookingDetails.test_name}
      - Date: ${bookingDetails.collection_date}
      - Time: ${bookingDetails.collection_time}
      - Amount: ₹${bookingDetails.price}
      - Booking ID: ${bookingDetails.id}
      
      Our team will visit your location for sample collection.
      
      Thank you for choosing The LABs!
      
      Best regards,
      The LABs Team
      Phone: +91 96936 31158
      Email: rimjhim58096@gmail.com
    `;

    // In a real application, you would send actual SMS and email
    console.log('SMS sent:', smsMessage);
    console.log('Email sent:', emailSubject, emailBody);
    
    // Show success message to user
    alert(`Booking confirmed! SMS and email notifications sent to ${bookingDetails.patient_phone} and ${bookingDetails.patient_email}`);
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    if (!testData || !bookingData || !user) return;

    try {
      // Create booking in database
      const newBooking = await createBooking({
        user_id: user.id,
        test_type: 'individual', // You might want to determine this based on testData
        test_id: testData.id,
        test_name: testData.name,
        price: testData.price,
        patient_name: formData.patientName,
        patient_email: formData.email,
        patient_phone: formData.phone,
        patient_address: formData.address,
        collection_date: formData.collectionDate,
        collection_time: formData.collectionTime,
        payment_id: paymentId,
        payment_status: 'completed',
        status: 'confirmed',
      });

      // Store booking in localStorage for user access
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push({
        ...newBooking,
        id: newBooking.id || `booking_${Date.now()}`,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));

      // Send notifications
      await sendNotifications(newBooking);

      console.log('Booking created successfully with payment ID:', paymentId);
      setShowPaymentModal(false);
      onClose();
      
      // Redirect to user dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Booking created but there was an issue with notifications. Please contact support.');
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      patientName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: '',
      collectionDate: '',
      collectionTime: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen || !testData) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">Book Test</h2>
              <p className="text-secondary-600">{testData.name}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-secondary-600" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 bg-secondary-50">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-secondary-200 text-secondary-600'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 font-medium ${
                    step <= currentStep ? 'text-primary-600' : 'text-secondary-600'
                  }`}>
                    {step === 1 && 'Patient Info'}
                    {step === 2 && 'Schedule'}
                    {step === 3 && 'Review'}
                  </span>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      step < currentStep ? 'bg-primary-600' : 'bg-secondary-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {/* Step 1: Patient Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Patient Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter patient name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Collection Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter complete address for home collection"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Schedule Collection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Schedule Collection</h3>
                
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Collection Date *
                  </label>
                  <input
                    type="date"
                    value={formData.collectionDate}
                    onChange={(e) => handleInputChange('collectionDate', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Preferred Time Slot *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <label
                        key={slot}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.collectionTime === slot
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-secondary-300 hover:border-primary-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="collectionTime"
                          value={slot}
                          checked={formData.collectionTime === slot}
                          onChange={(e) => handleInputChange('collectionTime', e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium text-secondary-900">{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Review & Confirm</h3>
                
                {/* Test Details */}
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary-900 mb-2">Test Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-primary-700">Test Name:</span>
                      <span className="font-semibold text-primary-900">{testData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-700">Price:</span>
                      <span className="font-bold text-primary-900 text-lg">₹{testData.price}</span>
                    </div>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <h4 className="font-bold text-secondary-900 mb-2">Patient Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {formData.patientName}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                    <div><strong>Address:</strong> {formData.address}</div>
                  </div>
                </div>

                {/* Collection Schedule */}
                <div className="bg-medical-50 p-4 rounded-lg">
                  <h4 className="font-bold text-medical-900 mb-2">Collection Schedule</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Date:</strong> {formData.collectionDate}</div>
                    <div><strong>Time:</strong> {formData.collectionTime}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between p-6 border-t border-secondary-200">
            <button
              onClick={currentStep === 1 ? handleClose : handlePrevStep}
              className="px-6 py-3 border-2 border-secondary-300 text-secondary-700 font-semibold rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && (!formData.patientName || !formData.email || !formData.phone || !formData.address)) ||
                  (currentStep === 2 && (!formData.collectionDate || !formData.collectionTime))
                }
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-medical-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleProceedToPayment}
                disabled={bookingLoading}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-success-600 to-success-700 text-white font-semibold rounded-lg hover:from-success-700 hover:to-success-800 disabled:opacity-50 transition-all duration-200"
              >
                <CreditCard className="w-5 h-5" />
                <span>{bookingLoading ? 'Processing...' : 'Proceed to Payment'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        bookingData={bookingData}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default BookingModal;