import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedTests from './components/FeaturedTests';
import TestPackages from './components/TestPackages';
import IndividualTests from './components/IndividualTests';
import TrustElements from './components/TrustElements';
import ReportDownload from './components/ReportDownload';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Global Brand Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 text-8xl font-bold text-primary-50/30 transform -rotate-45 select-none">
          The LABs
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-8xl font-bold text-medical-50/30 transform rotate-45 select-none">
          The LABs
        </div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <FeaturedTests />
        <TestPackages />
        <IndividualTests />
        <TrustElements />
        <ReportDownload />
        <FAQ />
        <Footer />
        <WhatsAppWidget />
      </div>
    </div>
  );
}

export default App;