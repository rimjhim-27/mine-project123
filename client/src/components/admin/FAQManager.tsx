import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X,
  Save,
  Filter
} from 'lucide-react';

const FAQManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<any>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    active: true
  });

  // Mock FAQs data
  const faqs = [
    {
      id: 'F001',
      question: 'How do I book a test for home collection?',
      answer: 'You can book a test by clicking the "Book a Test" button, selecting your desired tests or packages, providing your address, and choosing a convenient time slot. Our team will visit your location.',
      category: 'Booking',
      active: true,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 'F002',
      question: 'Is home collection safe and hygienic?',
      answer: 'Yes, absolutely. Our certified phlebotomists follow strict hygiene protocols, use sterile equipment, and maintain the highest safety standards during home visits.',
      category: 'Safety',
      active: true,
      created_at: '2024-01-14T14:20:00Z',
      updated_at: '2024-01-14T14:20:00Z'
    },
    {
      id: 'F003',
      question: 'How long does it take to get test results?',
      answer: 'Report delivery time varies by test type. Most routine tests are available within 6-24 hours, while specialized tests may take 48-72 hours. You\'ll receive an SMS/email notification when reports are ready.',
      category: 'Reports',
      active: true,
      created_at: '2024-01-13T09:15:00Z',
      updated_at: '2024-01-13T09:15:00Z'
    },
    {
      id: 'F004',
      question: 'What are your service areas in Patna?',
      answer: 'We provide home collection services across all areas of Patna including Kankarbagh, Boring Road, Rajendra Nagar, Patna City, Gandhi Maidan, Danapur, and Fraser Road.',
      category: 'Service Area',
      active: false,
      created_at: '2024-01-12T16:45:00Z',
      updated_at: '2024-01-12T16:45:00Z'
    }
  ];

  const categories = ['All', 'Booking', 'Safety', 'Reports', 'Service Area', 'Pricing', 'Preparation', 'Quality'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddFAQ = () => {
    setEditingFAQ(null);
    setFormData({
      question: '',
      answer: '',
      category: '',
      active: true
    });
    setShowModal(true);
  };

  const handleEditFAQ = (faq: any) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      active: faq.active
    });
    setShowModal(true);
  };

  const handleSaveFAQ = () => {
    // In real app, this would make an API call
    console.log('Saving FAQ:', formData);
    setShowModal(false);
  };

  const handleDeleteFAQ = (faqId: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      // In real app, this would make an API call
      console.log(`Deleting FAQ ${faqId}`);
    }
  };

  const handleToggleActive = (faqId: string, currentStatus: boolean) => {
    // In real app, this would make an API call
    console.log(`Toggling FAQ ${faqId} active status from ${currentStatus} to ${!currentStatus}`);
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
              placeholder="Search FAQs..."
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
          onClick={handleAddFAQ}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                    {faq.category}
                  </span>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    faq.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {faq.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleActive(faq.id, faq.active)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors duration-200 ${
                    faq.active 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {faq.active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEditFAQ(faq)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteFAQ(faq.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Last updated: {new Date(faq.updated_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit FAQ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter the question"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter the answer"
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                  Active (visible to users)
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFAQ}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingFAQ ? 'Update FAQ' : 'Add FAQ'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManager;