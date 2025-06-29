import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TestPackages from './components/TestPackages';
import IndividualTests from './components/IndividualTests';
import TrustElements from './components/TrustElements';
import ReportDownload from './components/ReportDownload';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TestPackages />
      <IndividualTests />
      <TrustElements />
      <ReportDownload />
      <FAQ />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

export default App;