import { TestPackage, IndividualTest, Testimonial, FAQ, Certification } from '../types';

export const testPackages: TestPackage[] = [
  {
    id: '1',
    name: 'Complete Health Checkup',
    description: 'Comprehensive health screening with 45+ parameters including CBC, lipid profile, liver function, kidney function, and diabetes screening.',
    price: 1499,
    originalPrice: 2500,
    tests: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'HbA1c', 'Thyroid Profile'],
    category: 'Health Checkup',
    popular: true,
    homeCollection: true
  },
  {
    id: '2',
    name: 'Diabetes Care Package',
    description: 'Essential tests for diabetes monitoring and management including glucose levels, HbA1c, and related parameters.',
    price: 899,
    originalPrice: 1200,
    tests: ['Fasting Glucose', 'HbA1c', 'Post Prandial Glucose', 'Insulin Levels'],
    category: 'Diabetes',
    homeCollection: true
  },
  {
    id: '3',
    name: 'Heart Health Package',
    description: 'Comprehensive cardiac risk assessment with lipid profile, cardiac markers, and ECG interpretation.',
    price: 1299,
    originalPrice: 1800,
    tests: ['Lipid Profile', 'CRP', 'Troponin-I', 'ECG', 'Homocysteine'],
    category: 'Cardiac',
    popular: true,
    homeCollection: true
  },
  {
    id: '4',
    name: 'Women\'s Health Package',
    description: 'Specialized health screening for women including hormonal assessment, vitamin levels, and general health parameters.',
    price: 1699,
    originalPrice: 2200,
    tests: ['Complete Blood Count', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12', 'Iron Studies', 'PAP Smear'],
    category: 'Women\'s Health',
    homeCollection: true
  }
];

export const individualTests: IndividualTest[] = [
  {
    id: '1',
    name: 'Complete Blood Count (CBC)',
    description: 'Comprehensive blood test that evaluates overall health and detects various disorders.',
    price: 299,
    category: 'Blood Test',
    symptoms: ['Fatigue', 'Weakness', 'Fever', 'Bruising'],
    preparationRequired: false,
    reportTime: '6 hours',
    homeCollection: true
  },
  {
    id: '2',
    name: 'Lipid Profile',
    description: 'Measures cholesterol levels and assesses cardiovascular risk.',
    price: 399,
    category: 'Cardiac',
    symptoms: ['Chest pain', 'High blood pressure', 'Family history of heart disease'],
    preparationRequired: true,
    reportTime: '12 hours',
    homeCollection: true
  },
  {
    id: '3',
    name: 'HbA1c (Glycated Hemoglobin)',
    description: 'Measures average blood sugar levels over the past 2-3 months.',
    price: 499,
    category: 'Diabetes',
    symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
    preparationRequired: false,
    reportTime: '24 hours',
    homeCollection: true
  },
  {
    id: '4',
    name: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Evaluates thyroid gland function and metabolism.',
    price: 599,
    category: 'Hormonal',
    symptoms: ['Weight changes', 'Fatigue', 'Hair loss', 'Mood changes'],
    preparationRequired: false,
    reportTime: '24 hours',
    homeCollection: true
  },
  {
    id: '5',
    name: 'Vitamin D Total',
    description: 'Measures vitamin D levels for bone health assessment.',
    price: 799,
    category: 'Vitamins',
    symptoms: ['Bone pain', 'Muscle weakness', 'Fatigue', 'Depression'],
    preparationRequired: false,
    reportTime: '48 hours',
    homeCollection: true
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Excellent service! The home collection was very convenient and the staff was professional. Got my reports on time with detailed explanations.',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    comment: 'Very satisfied with the service. The phlebotomist was skilled and the entire process was smooth. Highly recommend for anyone looking for home collection.',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Sneha Patel',
    location: 'Bangalore',
    rating: 4,
    comment: 'Good experience overall. The booking process was easy and the results were accurate. The home collection saved me a lot of time.',
    date: '2024-01-08'
  },
  {
    id: '4',
    name: 'Amit Singh',
    location: 'Pune',
    rating: 5,
    comment: 'Outstanding service! The team is very professional and the reports are comprehensive. The convenience of home collection is unmatched.',
    date: '2024-01-05'
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I book a test for home collection?',
    answer: 'You can book a test by clicking the "Book a Test" button, selecting your desired tests or packages, providing your address, and choosing a convenient time slot. Our team will visit your location.',
    category: 'Booking'
  },
  {
    id: '2',
    question: 'Is home collection safe and hygienic?',
    answer: 'Yes, absolutely. Our certified phlebotomists follow strict hygiene protocols, use sterile equipment, and maintain the highest safety standards during home visits.',
    category: 'Safety'
  },
  {
    id: '3',
    question: 'How long does it take to get test results?',
    answer: 'Report delivery time varies by test type. Most routine tests are available within 6-24 hours, while specialized tests may take 48-72 hours. You\'ll receive an SMS/email notification when reports are ready.',
    category: 'Reports'
  },
  {
    id: '4',
    question: 'Can I download my reports online?',
    answer: 'Yes, you can securely download your reports using your unique User ID. Reports are also sent via email and SMS for your convenience.',
    category: 'Reports'
  },
  {
    id: '5',
    question: 'Do I need to prepare for the tests?',
    answer: 'Some tests require fasting or specific preparation. During booking, you\'ll receive detailed instructions for any preparation needed. Our team will also remind you before the visit.',
    category: 'Preparation'
  },
  {
    id: '6',
    question: 'Are your tests accurate and reliable?',
    answer: 'Yes, we use state-of-the-art equipment and follow international quality standards. Our lab is certified by NABL and CAP, ensuring accurate and reliable results.',
    category: 'Quality'
  },
  {
    id: '7',
    question: 'What are your service areas?',
    answer: 'We currently provide home collection services in major cities including Mumbai, Delhi, Bangalore, Pune, Chennai, Hyderabad, and Kolkata. We\'re expanding to more cities soon.',
    category: 'Service Area'
  },
  {
    id: '8',
    question: 'How much does home collection cost?',
    answer: 'Home collection is free for all test packages and orders above ₹500. For individual tests below ₹500, a nominal collection fee of ₹50 applies.',
    category: 'Pricing'
  }
];

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'NABL Accredited',
    issuer: 'National Accreditation Board for Testing and Calibration Laboratories',
    image: 'https://images.pexels.com/photos/3912572/pexels-photo-3912572.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'CAP Certified',
    issuer: 'College of American Pathologists',
    image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'ISO 15189 Certified',
    issuer: 'International Organization for Standardization',
    image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
  }
];