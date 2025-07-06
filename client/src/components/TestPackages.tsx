import React, { useState } from 'react';
import { Check, Star, Clock, Home, Sparkles, Loader2, Phone, Mail, MessageCircle } from 'lucide-react';
import { useTestPackages } from '../hooks/useApi';
import BookingModal from './BookingModal';

const TestPackages: React.FC = () => {
  const { testPackages, isLoading, error } = useTestPackages();
  const [selectedTest, setSelectedTest] = useState<{
    id: string;
    name: string;
    price: number;
    description: string;
  } | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookTest = (pkg: any) => {
    setSelectedTest({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      description: pkg.description,
    });
    setIsBookingModalOpen(true);
  };

  const handleContactCall = () => {
    window.open('tel:+917870810192', '_self');
  };

  const handleContactEmail = () => {
    window.open('mailto:rimjhim58096@gmail.com?subject=Custom Package Inquiry', '_self');
  };

  const handleContactWhatsApp = () => {
    const message = encodeURIComponent('Hi! I need a custom test package. Please help me.');
    window.open(`https://wa.me/917870810192?text=${message}`, '_blank');
  };

  if (isLoading) {
    return (
      <section id="packages" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            <span className="ml-2 text-lg text-secondary-600">Loading test packages...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="packages" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-red-600 mb-4">Error loading test packages</div>
            <p className="text-secondary-600">{error?.message || 'An error occurred'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="packages" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 relative">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-radial from-medical-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-primary-200/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700 font-semibold text-sm">Popular Packages</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
              Comprehensive Health
              <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent block">
                Test Packages
              </span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
              Expertly curated health checkup packages designed by medical professionals. 
              Save money with our bundled tests and get complete health insights.
            </p>
          </div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testPackages.map((pkg: any, index: number) => (
              <div
                key={pkg.id}
                className={`relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 transform hover:-translate-y-2 ${
                  pkg.popular 
                    ? 'border-gradient-to-r from-primary-500 to-medical-500 scale-105 lg:scale-110' 
                    : 'border-secondary-200 hover:border-primary-300'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-600 to-medical-600 text-white py-2 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm">MOST POPULAR</span>
                    </div>
                  </div>
                )}

                <div className={`p-8 ${pkg.popular ? 'pt-16' : ''}`}>
                  {/* Package Name */}
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">{pkg.name}</h3>
                  
                  {/* Package Description */}
                  <p className="text-secondary-600 mb-6 text-sm leading-relaxed">{pkg.description}</p>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline space-x-3">
                      <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent">
                        ₹{pkg.price}
                      </span>
                      {pkg.original_price && (
                        <span className="text-xl text-secondary-400 line-through">₹{pkg.original_price}</span>
                      )}
                    </div>
                    {pkg.original_price && (
                      <div className="bg-success-100 text-success-700 text-sm font-bold px-3 py-1 rounded-full inline-block mt-2">
                        Save ₹{pkg.original_price - pkg.price} ({Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)}% off)
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-8 h-8 bg-gradient-to-br from-medical-500 to-medical-600 rounded-lg flex items-center justify-center">
                        <Home className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-secondary-700 font-medium">Free home collection</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-secondary-700 font-medium">Reports in 6-24 hours</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-8 h-8 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-secondary-700 font-medium">{pkg.tests.length} tests included</span>
                    </div>
                  </div>

                  {/* Included Tests */}
                  <div className="mb-8">
                    <h4 className="font-bold text-secondary-900 mb-3">Tests Included:</h4>
                    <div className="space-y-2">
                      {pkg.tests.slice(0, 3).map((test: string, testIndex: number) => (
                        <div key={testIndex} className="flex items-center space-x-3 text-sm">
                          <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-medical-500 rounded-full"></div>
                          <span className="text-secondary-600">{test}</span>
                        </div>
                      ))}
                      {pkg.tests.length > 3 && (
                        <div className="text-sm text-primary-600 font-bold">
                          +{pkg.tests.length - 3} more tests
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => handleBookTest(pkg)}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-primary-600 to-medical-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200'
                    }`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-secondary-200">
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Need a Custom Package?</h3>
              <p className="text-secondary-600 mb-6">Our medical experts can create a personalized test package based on your specific health needs.</p>
              
              {/* Contact Options */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={handleContactCall}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>
                
                <button 
                  onClick={handleContactEmail}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-medical-600 to-medical-700 text-white font-bold rounded-xl hover:from-medical-700 hover:to-medical-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </button>
                
                <button 
                  onClick={handleContactWhatsApp}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
              </div>
              
              <div className="mt-4 text-sm text-secondary-600">
                <p>📞 +917870810192 | 📧 rimjhim58096@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        testData={selectedTest}
      />
    </>
  );
};

export default TestPackages;