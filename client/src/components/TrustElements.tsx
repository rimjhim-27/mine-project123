import React from 'react';
import { Star, Shield, Award, Users, Loader2 } from 'lucide-react';
import { useTestimonials } from '../hooks/useApi';

const TrustElements: React.FC = () => {
  const { testimonials, isLoading, error } = useTestimonials();

  const certifications = [
    {
      id: '1',
      name: 'NABL Accredited',
      issuer: 'National Accreditation Board for Testing and Calibration Laboratories',
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'CAP Certified',
      issuer: 'College of American Pathologists',
      image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'ISO 15189 Certified',
      issuer: 'International Organization for Standardization',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Subtle Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary-100/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-100/5 to-secondary-100/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Simplified Stats Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">1000+</div>
                <div className="text-sm text-secondary-600">Happy Patients</div>
              </div>
            </div>
            <div className="w-px h-12 bg-secondary-200"></div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success-600">5+</div>
                <div className="text-sm text-secondary-600">Years of Experience</div>
              </div>
            </div>
          </div>
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
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
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
              What Our Patna Patients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read genuine reviews from our satisfied customers across Patna, 
              from Kankarbagh to Boring Road and Rajendra Nagar.
            </p>
          </div>

          {isLoading ? (
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
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
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