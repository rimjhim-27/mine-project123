import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Filter,
  X,
  Save
} from 'lucide-react';

const TestsManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTest, setEditingTest] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    symptoms: '',
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true
  });

  // Mock tests data
  const tests = [
    {
      id: 'T001',
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive blood analysis to detect infections, anemia, and blood disorders.',
      price: 299,
      category: 'Blood Test',
      symptoms: ['Fatigue', 'Weakness', 'Fever', 'Bruising'],
      preparation_required: false,
      report_time: '6 hours',
      home_collection: true
    },
    {
      id: 'T002',
      name: 'Lipid Profile',
      description: 'Heart health assessment measuring cholesterol and cardiovascular risk factors.',
      price: 399,
      category: 'Cardiac',
      symptoms: ['Chest pain', 'High blood pressure', 'Family history of heart disease'],
      preparation_required: true,
      report_time: '12 hours',
      home_collection: true
    },
    {
      id: 'T003',
      name: 'HbA1c (Diabetes Check)',
      description: 'Long-term blood sugar monitoring for diabetes management and prevention.',
      price: 499,
      category: 'Diabetes',
      symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
      preparation_required: false,
      report_time: '24 hours',
      home_collection: true
    }
  ];

  const categories = ['All', 'Blood Test', 'Cardiac', 'Diabetes', 'Thyroid', 'Liver', 'Kidney', 'Vitamins', 'Hormonal'];

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || test.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddTest = () => {
    setEditingTest(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      symptoms: '',
      preparation_required: false,
      report_time: '24 hours',
      home_collection: true
    });
    setShowModal(true);
  };

  const handleEditTest = (test: any) => {
    setEditingTest(test);
    setFormData({
      name: test.name,
      description: test.description,
      price: test.price.toString(),
      category: test.category,
      symptoms: test.symptoms.join(', '),
      preparation_required: test.preparation_required,
      report_time: test.report_time,
      home_collection: test.home_collection
    });
    setShowModal(true);
  };

  const handleSaveTest = () => {
    // In real app, this would make an API call
    console.log('Saving test:', formData);
    setShowModal(false);
  };

  const handleDeleteTest = (testId: string) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      // In real app, this would make an API call
      console.log(`Deleting test ${testId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleAddTest}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Test</span>
        </button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.name}</h3>
                <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                  {test.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditTest(test)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTest(test.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{test.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price:</span>
                <span className="font-semibold text-gray-900">₹{test.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Report Time:</span>
                <span className="text-gray-900">{test.report_time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Home Collection:</span>
                <span className={`font-medium ${test.home_collection ? 'text-green-600' : 'text-red-600'}`}>
                  {test.home_collection ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Preparation:</span>
                <span className={`font-medium ${test.preparation_required ? 'text-yellow-600' : 'text-green-600'}`}>
                  {test.preparation_required ? 'Required' : 'Not Required'}
                </span>
              </div>
            </div>

            {test.symptoms.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Related Symptoms:</p>
                <div className="flex flex-wrap gap-1">
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
          </div>
        ))}
      </div>

      {/* Add/Edit Test Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTest ? 'Edit Test' : 'Add New Test'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter test name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter test description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Time</label>
                  <select
                    value={formData.report_time}
                    onChange={(e) => setFormData({...formData, report_time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="2 hours">2 hours</option>
                    <option value="4 hours">4 hours</option>
                    <option value="6 hours">6 hours</option>
                    <option value="12 hours">12 hours</option>
                    <option value="24 hours">24 hours</option>
                    <option value="48 hours">48 hours</option>
                    <option value="72 hours">72 hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Related Symptoms</label>
                <input
                  type="text"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter symptoms separated by commas"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="preparation_required"
                    checked={formData.preparation_required}
                    onChange={(e) => setFormData({...formData, preparation_required: e.target.checked})}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="preparation_required" className="ml-2 text-sm text-gray-700">
                    Preparation Required
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="home_collection"
                    checked={formData.home_collection}
                    onChange={(e) => setFormData({...formData, home_collection: e.target.checked})}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="home_collection" className="ml-2 text-sm text-gray-700">
                    Home Collection Available
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTest}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingTest ? 'Update Test' : 'Add Test'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsManager;