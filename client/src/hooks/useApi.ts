import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';

export function useTestPackages() {
  const { data: testPackages, isLoading, error } = useQuery({
    queryKey: ['testPackages'],
    queryFn: () => apiRequest('/api/test-packages'),
  });

  return {
    testPackages: testPackages || [],
    isLoading,
    error,
  };
}

export function useIndividualTests() {
  const { data: individualTests, isLoading, error } = useQuery({
    queryKey: ['individualTests'],
    queryFn: () => apiRequest('/api/individual-tests'),
  });

  return {
    individualTests: individualTests || [],
    isLoading,
    error,
  };
}

export function useTestimonials() {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => apiRequest('/api/testimonials'),
  });

  return {
    testimonials: testimonials || [],
    isLoading,
    error,
  };
}

export function useFAQs() {
  const { data: faqs, isLoading, error } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => apiRequest('/api/faqs'),
  });

  return {
    faqs: faqs || [],
    isLoading,
    error,
  };
}

export function useBookings() {
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => apiRequest('/api/bookings'),
  });

  return {
    bookings: bookings || [],
    isLoading,
    error,
  };
}