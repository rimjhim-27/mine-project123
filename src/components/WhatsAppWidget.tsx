import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = '+917870810192'; // Updated WhatsApp number to match UPI
  
  const quickMessages = [
    'I want to book a test',
    'I need help with my report',
    'What are your service areas?',
    'I have a question about pricing',
    'I need help with payment'
  ];

  const handleQuickMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  const handleDirectChat = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Widget Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded Chat Menu */}
        {isExpanded && (
          <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-80 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">The LABs Support</h3>
                  <p className="text-xs text-gray-600">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Messages */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick messages:</p>
              {quickMessages.map((message, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(message)}
                  className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  {message}
                </button>
              ))}
            </div>

            {/* Direct Chat Button */}
            <button
              onClick={handleDirectChat}
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Start New Chat
            </button>

            {/* Contact Info */}
            <div className="mt-3 text-center text-xs text-gray-500">
              <p>📞 +917870810192</p>
              <p>Available 24/7 for support</p>
            </div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            isExpanded ? 'rotate-180' : 'animate-bounce-slow'
          }`}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>

        {/* Online Status Indicator */}
        {!isExpanded && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
        )}
      </div>
    </>
  );
};

export default WhatsAppWidget;