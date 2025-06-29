import React, { useState, useEffect } from 'react';
import { Shield, Clock, Home, Star, CheckCircle, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      url: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Professional medical testing at home"
    },
    {
      url: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Medical professional collecting samples"
    },
    {
      url: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Laboratory testing equipment"
    },
    {
      url: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Digital health reports"
    },
    {
      url: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Home healthcare service"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="pt-20 bg-gradient-to-br from-primary-50 via-medical-50 to-secondary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 via-transparent to-medical-100/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-medical-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            {/* Trust Badge */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent-400 fill-current" />
                ))}
                <span className="text-secondary-700 font-semibold ml-2">4.9/5</span>
              </div>
              <div className="flex items-center space-x-2 bg-success-100 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-success-600" />
                <span className="text-success-700 font-semibold text-sm">50,000+ Patients</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-secondary-900 mb-6 leading-tight">
              Professional
              <span className="bg-gradient-to-r from-primary-600 to-medical-600 bg-clip-text text-transparent block">
                Lab Testing
              </span>
              <span className="text-4xl lg:text-5xl text-secondary-700">at Your Doorstep</span>
            </h1>
            
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed max-w-xl">
              Experience premium pathology services from the comfort of your home. 
              NABL-certified lab with accurate results, expert phlebotomists, and secure digital reports.
            </p>

            {/* Key Features */}
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <Home className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">Home Collection</h3>
                <p className="text-sm text-secondary-600">Free for orders ₹500+</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-medical-500 to-medical-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">Fast Reports</h3>
                <p className="text-sm text-secondary-600">Within 6-24 hours</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">NABL Certified</h3>
                <p className="text-sm text-secondary-600">99.9% Accuracy</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-medical-600 text-white text-lg font-bold rounded-xl hover:from-primary-700 hover:to-medical-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Book a Test Now
              </button>
              <button className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-primary-600 text-primary-600 text-lg font-bold rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                View Test Packages
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 mt-8 pt-8 border-t border-secondary-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success-500" />
                <span className="text-sm font-medium text-secondary-700">100% Safe & Hygienic</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success-500" />
                <span className="text-sm font-medium text-secondary-700">Certified Professionals</span>
              </div>
            </div>
          </div>

          {/* Hero Image Slider */}
          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Background Blur Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200/50 to-medical-200/50 rounded-3xl blur-2xl transform rotate-6"></div>
              
              {/* Image Slider Container */}
              <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative h-96 lg:h-[500px]">
                  {/* Images */}
                  {heroImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide 
                          ? 'opacity-100 transform scale-100' 
                          : 'opacity-0 transform scale-105'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group"
                  >
                    <ChevronLeft className="w-6 h-6 text-secondary-700 group-hover:text-primary-600" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group"
                  >
                    <ChevronRight className="w-6 h-6 text-secondary-700 group-hover:text-primary-600" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentSlide 
                            ? 'bg-white shadow-lg scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-primary-100">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-secondary-900 text-lg">100% Safe</p>
                    <p className="text-sm text-secondary-600">Certified Professionals</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-medical-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-medical-600">24/7</div>
                  <div className="text-xs text-secondary-600 font-medium">Available</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute -bottom-16 left-0 right-0">
                <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <div className="flex items-center justify-center space-x-2 text-sm text-secondary-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Auto-changing gallery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;