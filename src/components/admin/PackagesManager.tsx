import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Save,
  Star
} from 'lucide-react';

const PackagesManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category: '',
    tests: '',
    popular: false,
    home_collection: true
  });

  // Mock packages data
  const packages = [
    {
      id: 'P001',
      name: 'Complete Health Checkup',
      description: 'Comprehensive health screening with 45+ parameters including CBC, lipid profile, liver function, kidney function, and diabetes screening.',
      price: 1499,
      original_price: 2500,
      tests: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'HbA1c', 'Thyroid Profile'],
      category: 'Health Checkup',
      popular: true,
      home_collection: true
    },
    {
      id: 'P002',
      name: 'Diabetes Care Package',
      description: 'Essential tests for diabetes monitoring and management including glucose levels, HbA1c, and related parameters.',
      price: 899,
      original_price: 1200,
      tests: ['Fasting Glucose', 'HbA1c', 'Post Prandial Glucose', 'Insulin Levels'],
      category: 'Diabetes',
      popular: false,
      home_collection: true
    },
    {
      id: 'P003',
      name: 'Heart Health Package',
      description: 'Comprehensive cardiac risk assessment with lipid profile, cardiac markers, and ECG interpretation.',
      price: 1299,
      original_price: 1800,
      tests: ['Lipid Profile', 'CRP', 'Troponin-I', 'ECG', 'Homocysteine'],
      category: 'Cardiac',
      popular: true,
      home_collection: true
    }
  ];

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPackage = () => {
    setEditingPackage(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      category: '',
      tests: '',
      popular: false,
      home_collection: true
    });
    setShowModal(true);
  };

  const handleEditPackage = (pkg: any) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      original_price: pkg.original_price?.toString() || '',
      category: pkg.category,
      tests: pkg.tests.join(', '),
      popular: pkg.popular,
      home_collection: pkg.home_collection
    });
    setShowModal(true);
  };

  const handleSavePackage = () => {
    // In real app, this would make an API call
    console.log('Saving package:', formData);
    setShowModal(false);
  };

  const handleDeletePackage = (packageId: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      // In real app, this would make an API call
      console.log(`Deleting package ${packageId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleAddPackage}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                  {pkg.popular && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>
                <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                  {pkg.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditPackage(pkg)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Price:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-primary-600">₹{pkg.price}</span>
                  {pkg.original_price && (
                    <span className="text-sm text-gray-400 line-through">₹{pkg.original_price}</span>
                  )}
                </div>
              </div>
              {pkg.original_price && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Savings:</span>
                  <span className="font-semibold text-green-600">
                    ₹{pkg.original_price - pkg.price} ({Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)}% off)
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tests Included:</span>
                <span className="font-semibold text-gray-900">{pkg.tests.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Home Collection:</span>
                <span className={`font-medium ${pkg.home_collection ? 'text-green-600' : 'text-red-600'}`}>
                  {pkg.home_collection ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Included Tests:</p>
              <div className="space-y-1">
                {pkg.tests.slice(0, 4).map((test, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                    <span>{test}</span>
                  </div>
                ))}
                {pkg.tests.length > 4 && (
                  <div className="text-sm text-primary-600 font-medium">
                    +{pkg.tests.length - 4} more tests
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Package Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPackage ? 'Edit Package' : 'Add New Package'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter package name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter category"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter package description"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({...formData, original_price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter original price (optional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Included Tests</label>
                <textarea
                  value={formData.tests}
                  onChange={(e) => setFormData({...formData, tests: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter tests separated by commas"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="popular" className="ml-2 text-sm text-gray-700">
                    Mark as Popular
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="home_collection_pkg"
                    checked={formData.home_collection}
                    onChange={(e) => setFormData({...formData, home_collection: e.target.checked})}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="home_collection_pkg" className="ml-2 text-sm text-gray-700">
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
                  onClick={handleSavePackage}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingPackage ? 'Update Package' : 'Add Package'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesManager;