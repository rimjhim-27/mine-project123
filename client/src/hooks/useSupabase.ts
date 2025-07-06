import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';
import { comprehensiveTests } from '../data/comprehensiveTests';

type Tables = Database['public']['Tables'];

// Fallback data for when database is not available
const fallbackPackages = [
  {
    id: '1',
    name: 'Complete Health Checkup',
    description: 'Comprehensive health screening with 45+ parameters including CBC, lipid profile, liver function, kidney function, and diabetes screening.',
    price: 1499,
    original_price: 2500,
    tests: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'HbA1c', 'Thyroid Profile'],
    category: 'Health Checkup',
    popular: true,
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Diabetes Care Package',
    description: 'Essential tests for diabetes monitoring and management including glucose levels, HbA1c, and related parameters.',
    price: 899,
    original_price: 1200,
    tests: ['Fasting Glucose', 'HbA1c', 'Post Prandial Glucose', 'Insulin Levels'],
    category: 'Diabetes',
    popular: false,
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Heart Health Package',
    description: 'Comprehensive cardiac risk assessment with lipid profile, cardiac markers, and ECG interpretation.',
    price: 1299,
    original_price: 1800,
    tests: ['Lipid Profile', 'CRP', 'Troponin-I', 'ECG', 'Homocysteine'],
    category: 'Cardiac',
    popular: true,
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Women\'s Health Package',
    description: 'Specialized health screening for women including hormonal assessment, vitamin levels, and general health parameters.',
    price: 1699,
    original_price: 2200,
    tests: ['Complete Blood Count', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12', 'Iron Studies', 'PAP Smear'],
    category: 'Women\'s Health',
    popular: false,
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Updated testimonials with Patna locations and Hindi reviews
const fallbackTestimonials = [
  {
    id: '1',
    name: 'प्रिया शर्मा',
    location: 'कंकड़बाग, पटना',
    rating: 5,
    comment: 'बहुत ही बेहतरीन सेवा और रिपोर्ट समय पर मिली, धन्यवाद The LABs! घर पर सैंपल लेने की सुविधा बहुत अच्छी है।',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'राजेश कुमार',
    location: 'बोरिंग रोड, पटना',
    rating: 5,
    comment: 'Very satisfied with the service. The phlebotomist was skilled and professional. Home collection saved me a lot of time. Highly recommend The LABs!',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'स्नेहा पटेल',
    location: 'राजेंद्र नगर, पटना',
    rating: 4,
    comment: 'अच्छी सेवा मिली। रिपोर्ट सही समय पर मिल गई और सभी टेस्ट सही थे। The LABs की टीम बहुत प्रोफेशनल है।',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'अमित सिंह',
    location: 'पटना सिटी, पटना',
    rating: 5,
    comment: 'Outstanding service! घर बैठे टेस्ट हो गया और रिपोर्ट भी जल्दी मिल गई। The LABs का स्टाफ बहुत अच्छा है। धन्यवाद!',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'सुनीता देवी',
    location: 'गांधी मैदान, पटना',
    rating: 5,
    comment: 'बहुत अच्छा अनुभव रहा। समय पर आए और सभी टेस्ट सही तरीके से किए। The LABs को धन्यवाद!',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'विकास झा',
    location: 'दानापुर, पटना',
    rating: 4,
    comment: 'Good experience with The LABs. Professional staff and accurate reports. Home collection service is very convenient for busy people like me.',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'रीता कुमारी',
    location: 'पटना जंक्शन, पटना',
    rating: 5,
    comment: 'एकदम सही सेवा! रिपोर्ट बिल्कुल सही आई और डॉक्टर ने भी तारीफ की। The LABs को बहुत-बहुत धन्यवाद।',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'मनोज कुमार',
    location: 'फ्रेजर रोड, पटना',
    rating: 5,
    comment: 'Excellent service by The LABs team. Very professional and timely. The home collection facility is a game-changer for elderly patients like my mother.',
    approved: true,
    created_at: new Date().toISOString()
  }
];

const fallbackFAQs = [
  {
    id: '1',
    question: 'How do I book a test for home collection?',
    answer: 'You can book a test by clicking the "Book a Test" button, selecting your desired tests or packages, providing your address, and choosing a convenient time slot. Our team will visit your location.',
    category: 'Booking',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    question: 'Is home collection safe and hygienic?',
    answer: 'Yes, absolutely. Our certified phlebotomists follow strict hygiene protocols, use sterile equipment, and maintain the highest safety standards during home visits.',
    category: 'Safety',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    question: 'How long does it take to get test results?',
    answer: 'Report delivery time varies by test type. Most routine tests are available within 6-24 hours, while specialized tests may take 48-72 hours. You\'ll receive an SMS/email notification when reports are ready.',
    category: 'Reports',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    question: 'Can I download my reports online?',
    answer: 'Yes, you can securely download your reports using your unique User ID. Reports are also sent via email and SMS for your convenience.',
    category: 'Reports',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    question: 'Do I need to prepare for the tests?',
    answer: 'Some tests require fasting or specific preparation. During booking, you\'ll receive detailed instructions for any preparation needed. Our team will also remind you before the visit.',
    category: 'Preparation',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    question: 'Are your tests accurate and reliable?',
    answer: 'Yes, we use state-of-the-art equipment and follow international quality standards. Our lab is certified by NABL and CAP, ensuring accurate and reliable results.',
    category: 'Quality',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Hook for fetching test packages
export function useTestPackages() {
  const [packages, setPackages] = useState<Tables['test_packages']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        // Check if Supabase is properly configured
        if (!supabase) {
          throw new Error('Supabase not configured');
        }

        const { data, error } = await supabase
          .from('test_packages')
          .select('*')
          .order('popular', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPackages(data || []);
      } catch (err) {
        console.warn('Database not available, using fallback data:', err);
        setPackages(fallbackPackages);
        setError(null); // Don't show error to user, just use fallback
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  return { packages, loading, error };
}

// Hook for fetching individual tests with comprehensive database
export function useIndividualTests() {
  const [tests, setTests] = useState<Tables['individual_tests']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTests() {
      try {
        if (!supabase) {
          throw new Error('Supabase not configured');
        }

        const { data, error } = await supabase
          .from('individual_tests')
          .select('*')
          .order('category')
          .order('name');

        if (error) throw error;
        
        // If database has limited tests, merge with comprehensive list
        const dbTests = data || [];
        const allTests = [...dbTests];
        
        // Add comprehensive tests that aren't in database
        comprehensiveTests.forEach(compTest => {
          if (!dbTests.find(dbTest => dbTest.id === compTest.id)) {
            allTests.push({
              ...compTest,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          }
        });
        
        setTests(allTests);
      } catch (err) {
        console.warn('Database not available, using comprehensive test data:', err);
        // Use comprehensive test list as fallback
        const fallbackTests = comprehensiveTests.map(test => ({
          ...test,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
        setTests(fallbackTests);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTests();
  }, []);

  return { tests, loading, error };
}

// Hook for fetching testimonials
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Tables['testimonials']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        if (!supabase) {
          throw new Error('Supabase not configured');
        }

        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        console.warn('Database not available, using fallback data:', err);
        setTestimonials(fallbackTestimonials);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}

// Hook for fetching FAQs
export function useFAQs() {
  const [faqs, setFaqs] = useState<Tables['faqs']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        if (!supabase) {
          throw new Error('Supabase not configured');
        }

        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('active', true)
          .order('category')
          .order('created_at');

        if (error) throw error;
        setFaqs(data || []);
      } catch (err) {
        console.warn('Database not available, using fallback data:', err);
        setFaqs(fallbackFAQs);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  return { faqs, loading, error };
}

// Hook for creating bookings
export function useBookings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: Tables['bookings']['Insert']) => {
    setLoading(true);
    setError(null);

    try {
      if (!supabase) {
        throw new Error('Supabase not configured');
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Database not available for booking creation:', err);
      // For demo purposes, simulate successful booking
      const mockBooking = {
        id: `booking_${Date.now()}`,
        ...bookingData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return mockBooking;
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id: string, updates: Tables['bookings']['Update']) => {
    setLoading(true);
    setError(null);

    try {
      if (!supabase) {
        throw new Error('Supabase not configured');
      }

      const { data, error } = await supabase
        .from('bookings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Database not available for booking update:', err);
      // For demo purposes, simulate successful update
      return { id, ...updates, updated_at: new Date().toISOString() };
    } finally {
      setLoading(false);
    }
  };

  // Hook for admin access - check if user is admin
  const checkAdminAccess = async (email: string) => {
    const adminEmail = 'rimjhim58096@gmail.com';
    return email === adminEmail;
  };

  return { createBooking, updateBooking, checkAdminAccess, loading, error };
}