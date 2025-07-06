import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail, User, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: 'Hello! Welcome to The LABs support. How can I help you today?',
      sender: 'support',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Simulate support agent typing and responses
  const simulateSupportResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      let responseText = '';
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('book') || lowerMessage.includes('test')) {
        responseText = 'I can help you book a test! You can browse our test packages or individual tests on our website. Would you like me to guide you through the booking process?';
      } else if (lowerMessage.includes('report') || lowerMessage.includes('result')) {
        responseText = 'For report downloads, please use your User ID in the "Download Report" section. If you need help finding your User ID, I can assist you with that.';
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        responseText = 'Our test prices are very competitive! Individual tests start from ₹99, and our comprehensive packages start from ₹899. Would you like information about specific tests?';
      } else if (lowerMessage.includes('home collection') || lowerMessage.includes('collection')) {
        responseText = 'Yes! We provide free home collection for all test packages and orders above ₹500. Our certified phlebotomists will visit your location at your preferred time.';
      } else if (lowerMessage.includes('area') || lowerMessage.includes('location')) {
        responseText = 'We provide services across all areas of Patna including Kankarbagh, Boring Road, Rajendra Nagar, Patna City, Gandhi Maidan, Danapur, and Fraser Road.';
      } else {
        responseText = 'Thank you for your message! For immediate assistance, you can also call us at +91 96936 31158 or email us at support@thelabs.com. How else can I help you?';
      }
      
      const supportMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: 'support',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, supportMessage]);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate support response
    simulateSupportResponse(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    'Book a test',
    'Download report',
    'Check prices',
    'Home collection info',
    'Service areas'
  ];

  const handleQuickAction = (action: string) => {
    setNewMessage(action);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-pulse"
          >
            <MessageCircle className="w-6 h-6" />
            {isOnline && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            )}
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">The LABs Support</h3>
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors duration-200"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Options */}
            <div className="px-4 pb-4">
              <div className="flex justify-center space-x-4 text-xs">
                <a
                  href="tel:+919693631158"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <a
                  href="mailto:support@thelabs.com"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </a>
                <a
                  href="https://wa.me/919693631158"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LiveChatWidget;