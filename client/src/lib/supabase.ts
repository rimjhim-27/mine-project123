import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a fallback client if environment variables are not available
let supabase: any = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn('Supabase environment variables not found. Using fallback mode.');
    // Create a mock client for development
    supabase = {
      from: () => ({
        select: () => ({ data: [], error: new Error('Supabase not configured') }),
        insert: () => ({ data: null, error: new Error('Supabase not configured') }),
        update: () => ({ data: null, error: new Error('Supabase not configured') }),
        eq: () => ({ data: [], error: new Error('Supabase not configured') }),
        order: () => ({ data: [], error: new Error('Supabase not configured') })
      })
    };
  }
} catch (error) {
  console.warn('Failed to initialize Supabase:', error);
  supabase = null;
}

export { supabase };

// Database types
export interface Database {
  public: {
    Tables: {
      test_packages: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          original_price: number | null;
          tests: string[];
          category: string;
          popular: boolean;
          home_collection: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          original_price?: number | null;
          tests?: string[];
          category: string;
          popular?: boolean;
          home_collection?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          original_price?: number | null;
          tests?: string[];
          category?: string;
          popular?: boolean;
          home_collection?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      individual_tests: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: string;
          symptoms: string[];
          preparation_required: boolean;
          report_time: string;
          home_collection: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          category: string;
          symptoms?: string[];
          preparation_required?: boolean;
          report_time?: string;
          home_collection?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          category?: string;
          symptoms?: string[];
          preparation_required?: boolean;
          report_time?: string;
          home_collection?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string | null;
          test_type: string;
          test_id: string;
          test_name: string;
          price: number;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          patient_address: string;
          collection_date: string;
          collection_time: string;
          status: string;
          payment_id: string | null;
          payment_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          test_type: string;
          test_id: string;
          test_name: string;
          price: number;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          patient_address: string;
          collection_date: string;
          collection_time: string;
          status?: string;
          payment_id?: string | null;
          payment_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          test_type?: string;
          test_id?: string;
          test_name?: string;
          price?: number;
          patient_name?: string;
          patient_email?: string;
          patient_phone?: string;
          patient_address?: string;
          collection_date?: string;
          collection_time?: string;
          status?: string;
          payment_id?: string | null;
          payment_status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          location: string;
          rating: number;
          comment: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          rating: number;
          comment: string;
          approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string;
          rating?: number;
          comment?: string;
          approved?: boolean;
          created_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          category: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          category?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          booking_id: string;
          user_id: string;
          report_url: string;
          report_password: string;
          generated_at: string;
          downloaded_at: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          user_id: string;
          report_url: string;
          report_password: string;
          generated_at?: string;
          downloaded_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          user_id?: string;
          report_url?: string;
          report_password?: string;
          generated_at?: string;
          downloaded_at?: string | null;
        };
      };
    };
  };
}