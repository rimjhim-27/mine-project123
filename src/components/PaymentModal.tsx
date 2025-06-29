import React, { useState, useEffect } from 'react';
import { X, CreditCard, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { TestBookingData } from '../services/stripe';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: TestBookingData | null;
  onPaymentSuccess: (paymentId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  onPaymentSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  useEffect(() => {
    if (isOpen) {
      setPaymentStatus('idle');
      setErrorMessage('');
      setCardDetails({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
      });
    }
  }, [isOpen]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData) return;

    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, you would:
      // 1. Create payment intent with Stripe
      // 2. Confirm payment with card details
      // 3. Handle the response
      
      const mockPaymentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      setPaymentStatus('success');
      setTimeout(() => {
        onPaymentSuccess(mockPaymentId);
        onClose();
      }, 2000);
      
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!isOpen || !bookingData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-2xl font-bold text-secondary-900">Secure Payment</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-secondary-600" />
          </button>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'success' && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            <h3 className="text-xl font-bold text-success-600 mb-2">Payment Successful!</h3>
            <p className="text-secondary-600">Your test has been booked successfully.</p>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Payment Failed</h3>
            <p className="text-secondary-600">{errorMessage}</p>
          </div>
        )}

        {(paymentStatus === 'idle' || paymentStatus === 'processing') && (
          <>
            {/* Order Summary */}
            <div className="p-6 bg-secondary-50">
              <h3 className="font-bold text-secondary-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Test:</span>
                  <span className="font-semibold text-secondary-900">{bookingData.testName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Patient:</span>
                  <span className="font-semibold text-secondary-900">{bookingData.patientInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Collection Date:</span>
                  <span className="font-semibold text-secondary-900">{bookingData.collectionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Collection Time:</span>
                  <span className="font-semibold text-secondary-900">{bookingData.collectionTime}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-secondary-900">Total Amount:</span>
                  <span className="font-bold text-primary-600 text-xl">₹{bookingData.price}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayment} className="p-6 space-y-6">
              <div className="flex items-center space-x-2 text-sm text-secondary-600 bg-primary-50 p-3 rounded-lg">
                <Lock className="w-4 h-4 text-primary-600" />
                <span>Your payment information is encrypted and secure</span>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                    className="w-full px-4 py-3 pl-12 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                  <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                </div>
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-success-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-success-600" />
                  <span className="font-semibold text-success-800">Secure Payment</span>
                </div>
                <ul className="text-sm text-success-700 space-y-1">
                  <li>• 256-bit SSL encryption</li>
                  <li>• PCI DSS compliant</li>
                  <li>• No card details stored</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-medical-600 text-white font-bold rounded-lg hover:from-primary-700 hover:to-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Pay ₹{bookingData.price}</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;