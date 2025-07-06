import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  User,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleCall = () => {
    window.open('tel:+919693631158', '_self');
  };

  const handleEmail = () => {
    window.open('mailto:support@thelabs.com', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I need assistance with your services.');
    window.open(`https://wa.me/919693631158?text=${message}`, '_blank');
  };

  const handleDirections = () => {
    const address = encodeURIComponent('Medical District, Patna, Bihar 800001, India');
    window.open(`https://www.google.com/maps/search/${address}`, '_blank');
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our support team',
      value: '+91 96936 31158',
      action: handleCall,
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us your queries and feedback',
      value: 'support@thelabs.com',
      action: handleEmail,
      color: 'bg-purple-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Quick support via WhatsApp',
      value: '+91 96936 31158',
      action: handleWhatsApp,
      color: 'bg-green-500'
    }
  ];

  const locations = [
    {
      name: 'Head Office',
      address: '123 Healthcare Street, Medical District, Patna - 800001',
      phone: '+91 96936 31158',
      hours: 'Mon-Sun: 6:00 AM - 10:00 PM'
    },
    {
      name: 'Kankarbagh Branch',
      address: 'Near Kankarbagh Main Road, Patna - 800020',
      phone: '+91 96936 31158',
      hours: 'Mon-Sun: 7:00 AM - 9:00 PM'
    },
    {
      name: 'Boring Road Branch',
      address: 'Boring Road, Near Hanuman Mandir, Patna - 800001',
      phone: '+91 96936 31158',
      hours: 'Mon-Sun: 7:00 AM - 9:00 PM'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our services? Need help with booking or reports? 
            We're here to help you 24/7 across all areas of Patna.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">Send us a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h4>
                <p className="text-secondary-600">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Test Booking Inquiry</option>
                    <option value="report">Report Download Help</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="home-collection">Home Collection Service</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-secondary-400 w-5 h-5" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-primary-600 to-medical-600 text-white font-bold rounded-lg hover:from-primary-700 hover:to-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">Quick Contact</h3>
              {contactMethods.map((method, index) => (
                <button
                  key={index}
                  onClick={method.action}
                  className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-secondary-900 mb-1">{method.title}</h4>
                      <p className="text-sm text-secondary-600 mb-1">{method.description}</p>
                      <p className="font-semibold text-primary-600">{method.value}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-primary-600" />
                <h4 className="text-xl font-bold text-secondary-900">Business Hours</h4>
              </div>
              <div className="space-y-2 text-secondary-700">
                <div className="flex justify-between">
                  <span>Monday - Sunday</span>
                  <span className="font-semibold">6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Services</span>
                  <span className="font-semibold text-green-600">24/7 Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Home Collection</span>
                  <span className="font-semibold">6:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
                <h4 className="text-xl font-bold text-secondary-900">Our Locations</h4>
              </div>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div key={index} className="border-b border-secondary-200 last:border-b-0 pb-4 last:pb-0">
                    <h5 className="font-semibold text-secondary-900 mb-1">{location.name}</h5>
                    <p className="text-sm text-secondary-600 mb-1">{location.address}</p>
                    <p className="text-sm text-secondary-600 mb-1">📞 {location.phone}</p>
                    <p className="text-sm text-secondary-600">🕒 {location.hours}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={handleDirections}
                className="w-full mt-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Service Areas in Patna</h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            {[
              'Kankarbagh', 'Boring Road', 'Rajendra Nagar', 'Patna City',
              'Gandhi Maidan', 'Danapur', 'Fraser Road', 'Patna Junction',
              'Ashok Rajpath', 'Bailey Road', 'Mithapur', 'Kurji'
            ].map((area, index) => (
              <div key={index} className="bg-primary-50 rounded-lg p-3">
                <span className="text-primary-700 font-medium">{area}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-secondary-600 mt-4">
            Free home collection available in all areas • Emergency services 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;