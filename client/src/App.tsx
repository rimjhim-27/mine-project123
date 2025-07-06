import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { AuthProvider } from './components/auth/AuthProvider';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedTests from './components/FeaturedTests';
import TestPackages from './components/TestPackages';
import IndividualTests from './components/IndividualTests';
import About from './components/About';
import Contact from './components/Contact';
import TrustElements from './components/TrustElements';
import ReportDownload from './components/ReportDownload';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import LiveChatWidget from './components/LiveChatWidget';
import AdminPanel from './components/AdminPanel';
import UserDashboard from './components/UserDashboard';
import AuthGuard from './components/auth/AuthGuard';

function HomePage() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-secondary-50/20"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <FeaturedTests />
        <TestPackages />
        <IndividualTests />
        <About />
        <Contact />
        <TrustElements />
        <ReportDownload />
        <FAQ />
        <Footer />
        <WhatsAppWidget />
        <LiveChatWidget />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/dashboard">
            <AuthGuard>
              <UserDashboard />
            </AuthGuard>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;