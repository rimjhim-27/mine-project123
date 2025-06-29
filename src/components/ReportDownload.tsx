import React, { useState } from 'react';
import { Download, User, Lock, FileText, CheckCircle, Phone, Mail } from 'lucide-react';

const ReportDownload: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setUserId('');
    }, 3000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Download Your Reports
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access your test reports securely using your unique User ID. 
            All reports are encrypted and available for download 24/7.
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div>
              <form onSubmit={handleDownload} className="space-y-6">
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Your User ID
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="userId"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="e.g., MH2024001234"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Your User ID was sent via SMS and email after test completion
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !userId.trim()}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : showSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Report Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download Report</span>
                    </>
                  )}
                </button>
              </form>

              {/* Security Features */}
              <div className="mt-8 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Security Features:</h3>
                {[
                  { icon: Lock, text: 'Password-protected PDF files' },
                  { icon: FileText, text: 'Digital signature verification' },
                  { icon: CheckCircle, text: 'Secure encrypted transmission' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-secondary-600" />
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Secure report download"
                className="rounded-2xl shadow-lg mx-auto mb-6"
              />
              <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Can't find your User ID?</strong>
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-primary-600" />
                    <span>Call: +919693631158</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4 text-primary-600" />
                    <span>Email: rimjhim58096@gmail.com</span>
                  </div>
                </div>
                <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportDownload;