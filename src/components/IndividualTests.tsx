import React, { useState, useMemo } from 'react';
import { Search, Filter, Clock, Home, AlertCircle } from 'lucide-react';
import { individualTests } from '../data/mockData';

const IndividualTests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSymptom, setSelectedSymptom] = useState('All');

  // Get unique categories and symptoms
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(individualTests.map(test => test.category)))];
    return cats;
  }, []);

  const symptoms = useMemo(() => {
    const symp = ['All', ...Array.from(new Set(individualTests.flatMap(test => test.symptoms)))];
    return symp;
  }, []);

  // Filter tests based on search and filters
  const filteredTests = useMemo(() => {
    return individualTests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
      const matchesSymptom = selectedSymptom === 'All' || test.symptoms.includes(selectedSymptom);
      
      return matchesSearch && matchesCategory && matchesSymptom;
    });
  }, [searchTerm, selectedCategory, selectedSymptom]);

  return (
    <section id="tests" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Individual Tests
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the specific test you need. Search by test name, category, or symptoms 
            to get accurate health insights with professional home collection.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tests by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Symptoms
              </label>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedSymptom}
                  onChange={(e) => setSelectedSymptom(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {symptoms.map(symptom => (
                    <option key={symptom} value={symptom}>{symptom}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTests.length} of {individualTests.length} tests
          </div>
        </div>

        {/* Test Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Test Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{test.name}</h3>
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                    {test.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{test.description}</p>
              </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-primary-600">₹{test.price}</span>
              </div>

              {/* Test Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-secondary-500" />
                  <span className="text-gray-700">Report in {test.reportTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Home className="w-4 h-4 text-secondary-500" />
                  <span className="text-gray-700">
                    {test.homeCollection ? 'Home collection available' : 'Lab visit required'}
                  </span>
                </div>
                {test.preparationRequired && (
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-accent-500" />
                    <span className="text-gray-700">Preparation required</span>
                  </div>
                )}
              </div>

              {/* Symptoms */}
              {test.symptoms.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Related Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {test.symptoms.slice(0, 3).map((symptom, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {symptom}
                      </span>
                    ))}
                    {test.symptoms.length > 3 && (
                      <span className="text-xs text-primary-600 font-medium">
                        +{test.symptoms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <button className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Book This Test
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tests found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or contact us for help finding the right test.
            </p>
            <button className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Contact Support
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndividualTests;