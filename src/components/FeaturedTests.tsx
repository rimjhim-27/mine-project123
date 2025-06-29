import React, { useState } from 'react';
import { Search, Clock, Home, Droplets, Heart, Brain, Bone, Eye, Lungs, Shield } from 'lucide-react';
import BookingModal from './BookingModal';

const FeaturedTests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState<{
    id: string;
    name: string;
    price: number;
    description: string;
  } | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const featuredTests = [
    {
      id: 'ft001',
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive blood analysis to detect infections, anemia, and blood disorders.',
      price: 299,
      icon: Droplets,
      image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      reportTime: '6 hours',
      category: 'Blood Test'
    },
    {
      id: 'ft002',
      name: 'Lipid Profile',
      description: 'Heart health assessment measuring cholesterol and cardiovascular risk factors.',
      price: 399,
      icon: Heart,
      image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      reportTime: '12 hours',
      category: 'Cardiac'
    },
    {
      id: 'ft003',
      name: 'HbA1c (Diabetes Check)',
      description: 'Long-term blood sugar monitoring for diabetes management and prevention.',
      price: 499,
      icon: Shield,
      image: 'https://images.pexels.com/photos/3786160/pexels-photo-3786160.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      reportTime: '24 hours',
      category: 'Diabetes'
    },
    {
      id: 'ft004',
      name: 'Thyroid Profile (TSH, T3, T4)',
      description: 'Complete thyroid function assessment for metabolism and hormone balance.',
      price: 599,
      icon: Brain,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      reportTime: '24 hours',
      category: 'Hormonal'
    },
    {
      id: 'ft005',
      name: 'Vitamin D Total',
      description: 'Essential vitamin D levels for bone health and immune system support.',
      price: 799,
      icon: Bone,
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      reportTime: '48 hours',
      category: 'Vitamins'
    },
    {
      id: 'ft006',
      name: 'Liver Function Test (LFT)',
      description: 'Comprehensive liver health assessment including enzymes and proteins.',
      price: 599,
      icon: Lungs,
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      reportTime: '12 hours',
      category: 'Liver'
    },
    {
      id: 'ft007',
      name: 'Kidney Function Test (KFT)',
      description: 'Complete kidney health evaluation including creatinine and urea levels.',
      price: 599,
      icon: Eye,
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      reportTime: '12 hours',
      category: 'Kidney'
    },
    {
      id: 'ft008',
      name: 'Iron Studies',
      description: 'Complete iron deficiency and anemia assessment including ferritin levels.',
      price: 899,
      icon: Droplets,
      image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      reportTime: '24 hours',
      category: 'Blood Test'
    }
  ];

  // All available tests for search
  const allTests = [
    ...featuredTests,
    { id: 'at001', name: 'Urine Routine', price: 199, description: 'Complete urine analysis' },
    { id: 'at002', name: 'Stool Routine', price: 249, description: 'Stool examination for infections' },
    { id: 'at003', name: 'Blood Sugar Fasting', price: 149, description: 'Fasting glucose levels' },
    { id: 'at004', name: 'Blood Sugar Random', price: 99, description: 'Random glucose levels' },
    { id: 'at005', name: 'Hemoglobin', price: 149, description: 'Hemoglobin levels check' },
    { id: 'at006', name: 'ESR', price: 199, description: 'Erythrocyte sedimentation rate' },
    { id: 'at007', name: 'CRP', price: 399, description: 'C-reactive protein inflammation marker' },
    { id: 'at008', name: 'Vitamin B12', price: 699, description: 'Vitamin B12 deficiency check' },
    { id: 'at009', name: 'Calcium', price: 199, description: 'Serum calcium levels' },
    { id: 'at010', name: 'Magnesium', price: 299, description: 'Serum magnesium levels' }
  ];

  const filteredTests = allTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookTest = (test: any) => {
    setSelectedTest({
      id: test.id,
      name: test.name,
      price: test.price,
      description: test.description,
    });
    setIsBookingModalOpen(true);
  };

  const handleSearchSelect = (test: any) => {
    setSearchTerm('');
    handleBookTest(test);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white to-primary-50 relative overflow-hidden">
        {/* Brand Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-9xl font-bold text-primary-100/20 transform rotate-12 select-none">
            The LABs
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Featured Health Tests
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
              Popular diagnostic tests with home collection service across Patna. 
              Search for any test or browse our featured selections.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for any test..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                />
              </div>

              {/* Search Results Dropdown */}
              {searchTerm && filteredTests.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-secondary-200 rounded-xl shadow-xl mt-2 max-h-60 overflow-y-auto z-10">
                  {filteredTests.slice(0, 8).map((test) => (
                    <button
                      key={test.id}
                      onClick={() => handleSearchSelect(test)}
                      className="w-full text-left px-4 py-3 hover:bg-primary-50 border-b border-secondary-100 last:border-b-0 transition-colors duration-200"
                    >
                      <div className="font-semibold text-secondary-900">{test.name}</div>
                      <div className="text-sm text-secondary-600">₹{test.price}</div>
                    </button>
                  ))}
                  {filteredTests.length > 8 && (
                    <div className="px-4 py-2 text-sm text-secondary-500 text-center">
                      +{filteredTests.length - 8} more tests available
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Featured Tests Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Test Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <test.icon className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {test.category}
                    </span>
                  </div>
                </div>

                {/* Test Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-secondary-900 mb-2">{test.name}</h3>
                  <p className="text-sm text-secondary-600 mb-4 leading-relaxed">{test.description}</p>

                  {/* Test Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-secondary-500">
                      <Clock className="w-4 h-4" />
                      <span>{test.reportTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-secondary-500">
                      <Home className="w-4 h-4" />
                      <span>Home Collection</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-600">₹{test.price}</div>
                    <button
                      onClick={() => handleBookTest(test)}
                      className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Tests CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => document.getElementById('tests')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-medical-600 text-white font-bold rounded-xl hover:from-primary-700 hover:to-medical-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All 10,000+ Tests
            </button>
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

export default FeaturedTests;