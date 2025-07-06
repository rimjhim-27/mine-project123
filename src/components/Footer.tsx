import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, FlaskConical, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const handleDirections = () => {
    // Open Google Maps with specific Patna location
    const address = encodeURIComponent('Medical District, Patna, Bihar 800001, India');
    window.open(`https://www.google.com/maps/search/${address}`, '_blank');
  };

  const handleContactCall = () => {
    window.open('tel:+919693631158', '_self');
  };

  const handleContactEmail = () => {
    window.open('mailto:support@thelabs.com', '_self');
  };

  const handleContactWhatsApp = () => {
    const message = encodeURIComponent('Hi! I need assistance with your services.');
    window.open(`https://wa.me/919693631158?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-medical-900/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary-600/10 to-transparent rounded-full blur-3xl"></div>
      
      {/* Brand Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-9xl font-bold text-white/5 transform rotate-12 select-none">
          The LABs
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-medical-600 rounded-xl flex items-center justify-center shadow-lg">
                <FlaskConical className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-300 to-medical-300 bg-clip-text text-transparent">
                  The LABs
                </h3>
                <p className="text-sm text-secondary-300">Service Provider</p>
              </div>
            </div>
            <p className="text-secondary-300 mb-6 leading-relaxed">
              Leading pathology services at your doorstep in Patna. NABL-certified lab with 
              accurate results and convenient home collection across all areas of Patna.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-secondary-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-600 hover:to-medical-600 transition-all duration-200 border border-secondary-700 hover:border-primary-500"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary-300">Quick Links</h4>
            <ul className="space-y-3">
              {[
                'Test Packages',
                'Individual Tests',
                'Home Collection',
                'Download Reports',
                'Book a Test',
                'Track Your Order',
                'Cancellation Policy',
                'Privacy Policy'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-medical-300">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Complete Health Checkup',
                'Diabetes Care Package',
                'Heart Health Package',
                'Women\'s Health Package',
                'Senior Citizen Package',
                'Corporate Health Checkup',
                'Home Sample Collection',
                'Digital Reports'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-300">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-secondary-800/30 backdrop-blur-sm rounded-xl border border-secondary-700">
                <Phone className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Customer Care</p>
                  <button 
                    onClick={handleContactCall}
                    className="text-secondary-300 hover:text-primary-300 transition-colors duration-200"
                  >
                    +919693631158
                  </button>
                  <p className="text-secondary-300">Emergency: +919693631158</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-secondary-800/30 backdrop-blur-sm rounded-xl border border-secondary-700">
                <Mail className="w-5 h-5 text-medical-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Email Support</p>
                  <button 
                    onClick={handleContactEmail}
                    className="text-secondary-300 hover:text-medical-300 transition-colors duration-200"
                  >
                    support@thelabs.com
                  </button>
                  <p className="text-secondary-300">info@thelabs.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-secondary-800/30 backdrop-blur-sm rounded-xl border border-secondary-700">
                <MapPin className="w-5 h-5 text-accent-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Head Office</p>
                  <p className="text-secondary-300">
                    123 Healthcare Street,<br />
                    Medical District, Patna - 800001<br />
                    Bihar, India
                  </p>
                  <button 
                    onClick={handleDirections}
                    className="flex items-center space-x-1 mt-2 text-primary-300 hover:text-primary-200 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Get Directions</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-secondary-800/30 backdrop-blur-sm rounded-xl border border-secondary-700">
                <Clock className="w-5 h-5 text-success-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Service Hours</p>
                  <p className="text-secondary-300">Monday - Sunday</p>
                  <p className="text-secondary-300">6:00 AM - 10:00 PM</p>
                </div>
              </div>

              {/* WhatsApp Support */}
              <button
                onClick={handleContactWhatsApp}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 rounded-xl transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="font-semibold">WhatsApp Support</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2024 The LABs. All rights reserved. | NABL Accredited Lab | Patna, Bihar
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-secondary-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-secondary-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-400 hover:text-white text-sm transition-colors duration-200">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;