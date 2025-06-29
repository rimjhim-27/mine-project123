import React, { useState } from 'react';
import { Menu, X, Phone, Download, FlaskConical, MessageCircle } from 'lucide-react';
import BookingModal from './BookingModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Test Packages', href: '#packages' },
    { name: 'Individual Tests', href: '#tests' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleBookTest = () => {
    // Show options for booking
    const userChoice = window.confirm(
      'Choose your booking method:\n\nOK - Browse Tests & Packages\nCancel - Call/WhatsApp for Assistance'
    );
    
    if (userChoice) {
      // Scroll to tests section
      document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Show contact options
      const contactChoice = window.confirm(
        'Contact us for booking assistance:\n\nOK - Call Now\nCancel - WhatsApp'
      );
      
      if (contactChoice) {
        window.open('tel:+919693631158', '_self');
      } else {
        const message = encodeURIComponent('Hi! I want to book a test. Please help me.');
        window.open(`https://wa.me/919693631158?text=${message}`, '_blank');
      }
    }
    setIsMenuOpen(false);
  };

  const handleDownloadReport = () => {
    // Scroll to report download section
    document.getElementById('reports')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-medical-600 rounded-xl flex items-center justify-center shadow-lg">
                <FlaskConical className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-medical-700 bg-clip-text text-transparent">
                  The LABs
                </h1>
                <p className="text-xs text-secondary-600 font-medium">Professional Diagnostics</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={handleDownloadReport}
                className="flex items-center space-x-2 px-5 py-2.5 text-primary-600 border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-all duration-200 font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
              <button 
                onClick={handleBookTest}
                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-medical-600 text-white rounded-xl hover:from-primary-700 hover:to-medical-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>Book a Test</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-secondary-700" /> : <Menu className="w-6 h-6 text-secondary-700" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary-100 bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col space-y-3 pt-4">
                  <button 
                    onClick={handleDownloadReport}
                    className="flex items-center justify-center space-x-2 px-5 py-3 text-primary-600 border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-all duration-200 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                  <button 
                    onClick={handleBookTest}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-medical-600 text-white rounded-xl hover:from-primary-700 hover:to-medical-700 transition-all duration-200 shadow-lg font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Book a Test</span>
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        testData={null}
      />
    </>
  );
};

export default Header;