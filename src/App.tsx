import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
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
import AdminPanel from './components/AdminPanel';
import UserDashboard from './components/UserDashboard';
import AuthGuard from './components/auth/AuthGuard';

function HomePage() {
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route 
            path="/dashboard" 
            element={
              <AuthGuard>
                <UserDashboard />
              </AuthGuard>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;