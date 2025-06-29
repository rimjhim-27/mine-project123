/*
  # Initial Schema for The LABs Pathology Website

  1. New Tables
    - `test_packages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (integer)
      - `original_price` (integer, nullable)
      - `tests` (text array)
      - `category` (text)
      - `popular` (boolean)
      - `home_collection` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `individual_tests`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (integer)
      - `category` (text)
      - `symptoms` (text array)
      - `preparation_required` (boolean)
      - `report_time` (text)
      - `home_collection` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `test_type` (text) -- 'package' or 'individual'
      - `test_id` (uuid)
      - `test_name` (text)
      - `price` (integer)
      - `patient_name` (text)
      - `patient_email` (text)
      - `patient_phone` (text)
      - `patient_address` (text)
      - `collection_date` (date)
      - `collection_time` (text)
      - `status` (text) -- 'pending', 'confirmed', 'collected', 'completed', 'cancelled'
      - `payment_id` (text)
      - `payment_status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text)
      - `location` (text)
      - `rating` (integer)
      - `comment` (text)
      - `approved` (boolean)
      - `created_at` (timestamp)

    - `faqs`
      - `id` (uuid, primary key)
      - `question` (text)
      - `answer` (text)
      - `category` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `reports`
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `user_id` (uuid, references auth.users)
      - `report_url` (text)
      - `report_password` (text)
      - `generated_at` (timestamp)
      - `downloaded_at` (timestamp, nullable)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access where appropriate
*/

-- Create test_packages table
CREATE TABLE IF NOT EXISTS test_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  original_price integer,
  tests text[] NOT NULL DEFAULT '{}',
  category text NOT NULL,
  popular boolean DEFAULT false,
  home_collection boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create individual_tests table
CREATE TABLE IF NOT EXISTS individual_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  category text NOT NULL,
  symptoms text[] NOT NULL DEFAULT '{}',
  preparation_required boolean DEFAULT false,
  report_time text NOT NULL DEFAULT '24 hours',
  home_collection boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  test_type text NOT NULL CHECK (test_type IN ('package', 'individual')),
  test_id uuid NOT NULL,
  test_name text NOT NULL,
  price integer NOT NULL,
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  patient_address text NOT NULL,
  collection_date date NOT NULL,
  collection_time text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'collected', 'completed', 'cancelled')),
  payment_id text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  report_url text NOT NULL,
  report_password text NOT NULL,
  generated_at timestamptz DEFAULT now(),
  downloaded_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE test_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE individual_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policies for test_packages (public read)
CREATE POLICY "Anyone can read test packages"
  ON test_packages
  FOR SELECT
  TO public
  USING (true);

-- Policies for individual_tests (public read)
CREATE POLICY "Anyone can read individual tests"
  ON individual_tests
  FOR SELECT
  TO public
  USING (true);

-- Policies for bookings (users can manage their own bookings)
CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Policies for testimonials (public read, authenticated insert)
CREATE POLICY "Anyone can read approved testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (approved = true);

CREATE POLICY "Authenticated users can create testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for faqs (public read)
CREATE POLICY "Anyone can read active FAQs"
  ON faqs
  FOR SELECT
  TO public
  USING (active = true);

-- Policies for reports (users can access their own reports)
CREATE POLICY "Users can read their own reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_collection_date ON bookings(collection_date);
CREATE INDEX IF NOT EXISTS idx_reports_booking_id ON reports(booking_id);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_test_packages_category ON test_packages(category);
CREATE INDEX IF NOT EXISTS idx_individual_tests_category ON individual_tests(category);