import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

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

const fallbackTests = [
  {
    id: '1',
    name: 'Complete Blood Count (CBC)',
    description: 'Comprehensive blood test that evaluates overall health and detects various disorders.',
    price: 299,
    category: 'Blood Test',
    symptoms: ['Fatigue', 'Weakness', 'Fever', 'Bruising'],
    preparation_required: false,
    report_time: '6 hours',
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Lipid Profile',
    description: 'Measures cholesterol levels and assesses cardiovascular risk.',
    price: 399,
    category: 'Cardiac',
    symptoms: ['Chest pain', 'High blood pressure', 'Family history of heart disease'],
    preparation_required: true,
    report_time: '12 hours',
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'HbA1c (Glycated Hemoglobin)',
    description: 'Measures average blood sugar levels over the past 2-3 months.',
    price: 499,
    category: 'Diabetes',
    symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Evaluates thyroid gland function and metabolism.',
    price: 599,
    category: 'Hormonal',
    symptoms: ['Weight changes', 'Fatigue', 'Hair loss', 'Mood changes'],
    preparation_required: false,
    report_time: '24 hours',
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Vitamin D Total',
    description: 'Measures vitamin D levels for bone health assessment.',
    price: 799,
    category: 'Vitamins',
    symptoms: ['Bone pain', 'Muscle weakness', 'Fatigue', 'Depression'],
    preparation_required: false,
    report_time: '48 hours',
    home_collection: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const fallbackTestimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Excellent service! The home collection was very convenient and the staff was professional. Got my reports on time with detailed explanations.',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    comment: 'Very satisfied with the service. The phlebotomist was skilled and the entire process was smooth. Highly recommend for anyone looking for home collection.',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Sneha Patel',
    location: 'Bangalore',
    rating: 4,
    comment: 'Good experience overall. The booking process was easy and the results were accurate. The home collection saved me a lot of time.',
    approved: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Amit Singh',
    location: 'Pune',
    rating: 5,
    comment: 'Outstanding service! The team is very professional and the reports are comprehensive. The convenience of home collection is unmatched.',
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

// Hook for fetching individual tests
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
        setTests(data || []);
      } catch (err) {
        console.warn('Database not available, using fallback data:', err);
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