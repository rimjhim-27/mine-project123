import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Tables = Database['public']['Tables'];

// Hook for fetching test packages
export function useTestPackages() {
  const [packages, setPackages] = useState<Tables['test_packages']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data, error } = await supabase
          .from('test_packages')
          .select('*')
          .order('popular', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPackages(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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
        const { data, error } = await supabase
          .from('individual_tests')
          .select('*')
          .order('category')
          .order('name');

        if (error) throw error;
        setTests(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('active', true)
          .order('category')
          .order('created_at');

        if (error) throw error;
        setFaqs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id: string, updates: Tables['bookings']['Update']) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update booking';
      setError(errorMessage);
      throw new Error(errorMessage);
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