import React from 'react';
import { Star, Shield, Award, Users, Loader2 } from 'lucide-react';
import { useTestimonials } from '../hooks/useSupabase';

const TrustElements: React.FC = () => {
  const { testimonials, loading, error } = useTestimonials();

  const certifications = [
    {
      id: '1',
      name: 'NABL Accredited',
      issuer: 'National Accreditation Board for Testing and Calibration Laboratories',
      image: 'https://images.pexels.com/photos/3912572/pexels-photo-3912572.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'CAP Certified',
      issuer: 'College of American Pathologists',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'ISO 15189 Certified',
      issuer: 'International Organization for Standardization',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Users, number: '50,000+', label: 'Happy Patients' },
            { icon: Shield, number: '99.9%', label: 'Accuracy Rate' },
            { icon: Award, number: '15+', label: 'Years Experience' },
            { icon: Star, number: '4.9/5', label: 'Customer Rating' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted & Certified
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our laboratory is accredited by leading healthcare organizations, 
              ensuring the highest standards of accuracy and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read genuine reviews from thousands of satisfied customers who chose 
              our home collection services for their healthcare needs.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
              <span className="ml-2 text-lg text-secondary-600">Loading testimonials...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">Error loading testimonials</div>
              <p className="text-secondary-600">{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-accent-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                    "{testimonial.comment}"
                  </p>

                  {/* Customer Info */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-200">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustElements;