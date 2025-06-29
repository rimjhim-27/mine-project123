/*
  # Seed Initial Data for The LABs

  1. Insert test packages
  2. Insert individual tests
  3. Insert sample testimonials
  4. Insert FAQs
*/

-- Insert test packages
INSERT INTO test_packages (name, description, price, original_price, tests, category, popular, home_collection) VALUES
('Complete Health Checkup', 'Comprehensive health screening with 45+ parameters including CBC, lipid profile, liver function, kidney function, and diabetes screening.', 1499, 2500, ARRAY['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'HbA1c', 'Thyroid Profile'], 'Health Checkup', true, true),
('Diabetes Care Package', 'Essential tests for diabetes monitoring and management including glucose levels, HbA1c, and related parameters.', 899, 1200, ARRAY['Fasting Glucose', 'HbA1c', 'Post Prandial Glucose', 'Insulin Levels'], 'Diabetes', false, true),
('Heart Health Package', 'Comprehensive cardiac risk assessment with lipid profile, cardiac markers, and ECG interpretation.', 1299, 1800, ARRAY['Lipid Profile', 'CRP', 'Troponin-I', 'ECG', 'Homocysteine'], 'Cardiac', true, true),
('Women''s Health Package', 'Specialized health screening for women including hormonal assessment, vitamin levels, and general health parameters.', 1699, 2200, ARRAY['Complete Blood Count', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12', 'Iron Studies', 'PAP Smear'], 'Women''s Health', false, true);

-- Insert individual tests
INSERT INTO individual_tests (name, description, price, category, symptoms, preparation_required, report_time, home_collection) VALUES
('Complete Blood Count (CBC)', 'Comprehensive blood test that evaluates overall health and detects various disorders.', 299, 'Blood Test', ARRAY['Fatigue', 'Weakness', 'Fever', 'Bruising'], false, '6 hours', true),
('Lipid Profile', 'Measures cholesterol levels and assesses cardiovascular risk.', 399, 'Cardiac', ARRAY['Chest pain', 'High blood pressure', 'Family history of heart disease'], true, '12 hours', true),
('HbA1c (Glycated Hemoglobin)', 'Measures average blood sugar levels over the past 2-3 months.', 499, 'Diabetes', ARRAY['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'], false, '24 hours', true),
('Thyroid Profile (T3, T4, TSH)', 'Evaluates thyroid gland function and metabolism.', 599, 'Hormonal', ARRAY['Weight changes', 'Fatigue', 'Hair loss', 'Mood changes'], false, '24 hours', true),
('Vitamin D Total', 'Measures vitamin D levels for bone health assessment.', 799, 'Vitamins', ARRAY['Bone pain', 'Muscle weakness', 'Fatigue', 'Depression'], false, '48 hours', true);

-- Insert sample testimonials
INSERT INTO testimonials (name, location, rating, comment, approved) VALUES
('Priya Sharma', 'Mumbai', 5, 'Excellent service! The home collection was very convenient and the staff was professional. Got my reports on time with detailed explanations.', true),
('Rajesh Kumar', 'Delhi', 5, 'Very satisfied with the service. The phlebotomist was skilled and the entire process was smooth. Highly recommend for anyone looking for home collection.', true),
('Sneha Patel', 'Bangalore', 4, 'Good experience overall. The booking process was easy and the results were accurate. The home collection saved me a lot of time.', true),
('Amit Singh', 'Pune', 5, 'Outstanding service! The team is very professional and the reports are comprehensive. The convenience of home collection is unmatched.', true);

-- Insert FAQs
INSERT INTO faqs (question, answer, category, active) VALUES
('How do I book a test for home collection?', 'You can book a test by clicking the "Book a Test" button, selecting your desired tests or packages, providing your address, and choosing a convenient time slot. Our team will visit your location.', 'Booking', true),
('Is home collection safe and hygienic?', 'Yes, absolutely. Our certified phlebotomists follow strict hygiene protocols, use sterile equipment, and maintain the highest safety standards during home visits.', 'Safety', true),
('How long does it take to get test results?', 'Report delivery time varies by test type. Most routine tests are available within 6-24 hours, while specialized tests may take 48-72 hours. You''ll receive an SMS/email notification when reports are ready.', 'Reports', true),
('Can I download my reports online?', 'Yes, you can securely download your reports using your unique User ID. Reports are also sent via email and SMS for your convenience.', 'Reports', true),
('Do I need to prepare for the tests?', 'Some tests require fasting or specific preparation. During booking, you''ll receive detailed instructions for any preparation needed. Our team will also remind you before the visit.', 'Preparation', true),
('Are your tests accurate and reliable?', 'Yes, we use state-of-the-art equipment and follow international quality standards. Our lab is certified by NABL and CAP, ensuring accurate and reliable results.', 'Quality', true),
('What are your service areas?', 'We currently provide home collection services in major cities including Mumbai, Delhi, Bangalore, Pune, Chennai, Hyderabad, and Kolkata. We''re expanding to more cities soon.', 'Service Area', true),
('How much does home collection cost?', 'Home collection is free for all test packages and orders above ₹500. For individual tests below ₹500, a nominal collection fee of ₹50 applies.', 'Pricing', true);