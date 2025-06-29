import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, FlaskConical } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-medical-900/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary-600/10 to-transparent rounded-full blur-3xl"></div>
      
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
                <p className="text-sm text-secondary-300">Professional Diagnostics</p>
              </div>
            </div>
            <p className="text-secondary-300 mb-6 leading-relaxed">
              Leading pathology services at your doorstep. NABL-certified lab with 
              accurate results and convenient home collection across major cities.
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
                  <p className="text-secondary-300">1800-123-4567</p>
                  <p className="text-secondary-300">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-secondary-800/30 backdrop-blur-sm rounded-xl border border-secondary-700">
                <Mail className="w-5 h-5 text-medical-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Email Support</p>
                  <p className="text-secondary-300">support@thelabs.com</p>
                  <p className="text-secondary-300">info@thelabs.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-secondary-800/30 backdrop-blur-sm rounded-xl border border-secondary-700">
                <MapPin className="w-5 h-5 text-accent-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Head Office</p>
                  <p className="text-secondary-300">
                    123 Healthcare Street,<br />
                    Medical District, Mumbai - 400001
                  </p>
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
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2024 The LABs. All rights reserved. | NABL Accredited Lab
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