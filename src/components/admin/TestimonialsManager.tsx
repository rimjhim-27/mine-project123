import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  Check, 
  X,
  Trash2,
  Star,
  Filter
} from 'lucide-react';

const TestimonialsManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock testimonials data
  const testimonials = [
    {
      id: 'T001',
      name: 'प्रिया शर्मा',
      location: 'कंकड़बाग, पटना',
      rating: 5,
      comment: 'बहुत ही बेहतरीन सेवा और रिपोर्ट समय पर मिली, धन्यवाद The LABs! घर पर सैंपल लेने की सुविधा बहुत अच्छी है।',
      approved: true,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: 'T002',
      name: 'राजेश कुमार',
      location: 'बोरिंग रोड, पटना',
      rating: 5,
      comment: 'Very satisfied with the service. The phlebotomist was skilled and professional. Home collection saved me a lot of time. Highly recommend The LABs!',
      approved: true,
      created_at: '2024-01-14T14:20:00Z'
    },
    {
      id: 'T003',
      name: 'अनिता देवी',
      location: 'राजेंद्र नगर, पटना',
      rating: 4,
      comment: 'अच्छी सेवा मिली। रिपोर्ट सही समय पर मिल गई और सभी टेस्ट सही थे। The LABs की टीम बहुत प्रोफेशनल है।',
      approved: false,
      created_at: '2024-01-13T09:15:00Z'
    },
    {
      id: 'T004',
      name: 'विकास झा',
      location: 'दानापुर, पटना',
      rating: 5,
      comment: 'Outstanding service! घर बैठे टेस्ट हो गया और रिपोर्ट भी जल्दी मिल गई। The LABs का स्टाफ बहुत अच्छा है। धन्यवाद!',
      approved: false,
      created_at: '2024-01-12T16:45:00Z'
    }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'approved' && testimonial.approved) ||
                         (statusFilter === 'pending' && !testimonial.approved);
    return matchesSearch && matchesStatus;
  });

  const handleViewTestimonial = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
    setShowModal(true);
  };

  const handleApproveTestimonial = (testimonialId: string) => {
    // In real app, this would make an API call
    console.log(`Approving testimonial ${testimonialId}`);
  };

  const handleRejectTestimonial = (testimonialId: string) => {
    if (window.confirm('Are you sure you want to reject this testimonial?')) {
      // In real app, this would make an API call
      console.log(`Rejecting testimonial ${testimonialId}`);
    }
  };

  const handleDeleteTestimonial = (testimonialId: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      // In real app, this would make an API call
      console.log(`Deleting testimonial ${testimonialId}`);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
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
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Testimonials</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Total: {testimonials.length} | Approved: {testimonials.filter(t => t.approved).length} | Pending: {testimonials.filter(t => !t.approved).length}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    testimonial.approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {testimonial.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewTestimonial(testimonial)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {!testimonial.approved && (
                  <button
                    onClick={() => handleApproveTestimonial(testimonial.id)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleRejectTestimonial(testimonial.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              "{testimonial.comment}"
            </p>

            <div className="text-xs text-gray-500">
              Submitted: {new Date(testimonial.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Details Modal */}
      {showModal && selectedTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Testimonial Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTestimonial.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTestimonial.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(selectedTestimonial.rating)}
                    <span className="text-sm text-gray-600 ml-2">({selectedTestimonial.rating}/5)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                    selectedTestimonial.approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedTestimonial.approved ? 'Approved' : 'Pending Approval'}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 leading-relaxed">"{selectedTestimonial.comment}"</p>
                </div>
              </div>

              {/* Submission Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Submitted On</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedTestimonial.created_at).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                {!selectedTestimonial.approved && (
                  <button
                    onClick={() => {
                      handleApproveTestimonial(selectedTestimonial.id);
                      setShowModal(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    handleRejectTestimonial(selectedTestimonial.id);
                    setShowModal(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;