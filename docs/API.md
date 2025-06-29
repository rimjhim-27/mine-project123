# API Documentation

This document describes the API endpoints and data structures used in The LABs application.

## 🔗 Base URL

```
Production: https://your-domain.com/api
Development: http://localhost:5173/api
```

## 🔐 Authentication

The application uses localStorage-based authentication for demo purposes. In production, implement proper JWT or session-based authentication.

### Authentication Headers
```javascript
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

## 📊 Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}
```

### Test Package
```typescript
interface TestPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  tests: string[];
  category: string;
  popular: boolean;
  home_collection: boolean;
  created_at: string;
  updated_at: string;
}
```

### Individual Test
```typescript
interface IndividualTest {
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
}
```

### Booking
```typescript
interface Booking {
  id: string;
  user_id: string;
  test_type: 'package' | 'individual';
  test_id: string;
  test_name: string;
  price: number;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_address: string;
  collection_date: string;
  collection_time: string;
  status: 'pending' | 'confirmed' | 'collected' | 'completed' | 'cancelled';
  payment_id?: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}
```

## 🧪 Test Endpoints

### Get Test Packages
```http
GET /api/test-packages
```

**Response:**
```json
{
  "data": [
    {
      "id": "pkg_001",
      "name": "Complete Health Checkup",
      "description": "Comprehensive health screening...",
      "price": 1499,
      "original_price": 2500,
      "tests": ["CBC", "Lipid Profile", "LFT"],
      "category": "Health Checkup",
      "popular": true,
      "home_collection": true
    }
  ],
  "total": 4,
  "page": 1,
  "limit": 10
}
```

### Get Individual Tests
```http
GET /api/individual-tests?category=Blood Test&search=CBC
```

**Query Parameters:**
- `category` (optional): Filter by test category
- `search` (optional): Search in test name and description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)

**Response:**
```json
{
  "data": [
    {
      "id": "test_001",
      "name": "Complete Blood Count (CBC)",
      "description": "Comprehensive blood analysis...",
      "price": 299,
      "category": "Blood Test",
      "symptoms": ["Fatigue", "Weakness"],
      "preparation_required": false,
      "report_time": "6 hours",
      "home_collection": true
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 50
}
```

## 📅 Booking Endpoints

### Create Booking
```http
POST /api/bookings
```

**Request Body:**
```json
{
  "test_type": "package",
  "test_id": "pkg_001",
  "test_name": "Complete Health Checkup",
  "price": 1499,
  "patient_name": "John Doe",
  "patient_email": "john@example.com",
  "patient_phone": "+91 9876543210",
  "patient_address": "123 Main St, Patna",
  "collection_date": "2024-01-25",
  "collection_time": "08:00 AM - 10:00 AM"
}
```

**Response:**
```json
{
  "data": {
    "id": "booking_001",
    "status": "pending",
    "payment_status": "pending",
    "created_at": "2024-01-20T10:30:00Z"
  },
  "message": "Booking created successfully"
}
```

### Get User Bookings
```http
GET /api/bookings?user_id=user_123
```

**Response:**
```json
{
  "data": [
    {
      "id": "booking_001",
      "test_name": "Complete Health Checkup",
      "collection_date": "2024-01-25",
      "status": "confirmed",
      "payment_status": "completed"
    }
  ]
}
```

### Update Booking Status
```http
PATCH /api/bookings/:id
```

**Request Body:**
```json
{
  "status": "confirmed",
  "payment_status": "completed",
  "payment_id": "pay_123456"
}
```

## 💳 Payment Endpoints

### Create Payment Intent
```http
POST /api/payments/create-intent
```

**Request Body:**
```json
{
  "amount": 1499,
  "currency": "inr",
  "booking_id": "booking_001",
  "description": "Lab Test Payment"
}
```

**Response:**
```json
{
  "client_secret": "pi_123_secret_456",
  "payment_intent_id": "pi_123456"
}
```

### Confirm Payment
```http
POST /api/payments/confirm
```

**Request Body:**
```json
{
  "payment_intent_id": "pi_123456",
  "booking_id": "booking_001"
}
```

## 📋 Content Endpoints

### Get FAQs
```http
GET /api/faqs?category=Booking
```

**Response:**
```json
{
  "data": [
    {
      "id": "faq_001",
      "question": "How do I book a test?",
      "answer": "You can book a test by...",
      "category": "Booking",
      "active": true
    }
  ]
}
```

### Get Testimonials
```http
GET /api/testimonials
```

**Response:**
```json
{
  "data": [
    {
      "id": "testimonial_001",
      "name": "John Doe",
      "location": "Patna",
      "rating": 5,
      "comment": "Excellent service!",
      "approved": true
    }
  ]
}
```

## 🔒 Admin Endpoints

### Admin Authentication
```http
POST /api/admin/login
```

**Request Body:**
```json
{
  "email": "admin@thelabs.com",
  "password": "admin123"
}
```

### Get All Bookings (Admin)
```http
GET /api/admin/bookings?status=pending&date=2024-01-20
```

### Update Test Package (Admin)
```http
PUT /api/admin/test-packages/:id
```

## 📊 Analytics Endpoints

### Dashboard Stats
```http
GET /api/admin/stats
```

**Response:**
```json
{
  "total_bookings": 1234,
  "revenue_this_month": 245000,
  "active_tests": 10247,
  "test_packages": 24
}
```

## 🔔 Notification Endpoints

### Send SMS
```http
POST /api/notifications/sms
```

**Request Body:**
```json
{
  "phone": "+91 9876543210",
  "message": "Your test booking is confirmed...",
  "booking_id": "booking_001"
}
```

### Send Email
```http
POST /api/notifications/email
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "subject": "Test Booking Confirmation",
  "template": "booking_confirmation",
  "data": {
    "booking_id": "booking_001",
    "patient_name": "John Doe"
  }
}
```

## 📁 File Upload Endpoints

### Upload Report
```http
POST /api/reports/upload
```

**Request Body:** (multipart/form-data)
```
file: [PDF file]
booking_id: booking_001
password: report_password_123
```

## ⚠️ Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "timestamp": "2024-01-20T10:30:00Z"
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400): Invalid input data
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `RATE_LIMITED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

## 🔄 Rate Limiting

- **General API**: 100 requests per minute per IP
- **Authentication**: 5 attempts per minute per IP
- **File Upload**: 10 uploads per hour per user

## 📝 Response Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642680000
Content-Type: application/json
Cache-Control: public, max-age=300
```

## 🧪 Testing

### Test API with curl
```bash
# Get test packages
curl -X GET "https://your-domain.com/api/test-packages" \
  -H "Content-Type: application/json"

# Create booking
curl -X POST "https://your-domain.com/api/bookings" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "test_type": "package",
    "test_id": "pkg_001",
    "patient_name": "John Doe"
  }'
```

## 📚 SDK Examples

### JavaScript/TypeScript
```typescript
// Initialize API client
const api = new LabsAPI({
  baseURL: 'https://your-domain.com/api',
  apiKey: 'your-api-key'
});

// Get test packages
const packages = await api.testPackages.list();

// Create booking
const booking = await api.bookings.create({
  testType: 'package',
  testId: 'pkg_001',
  patientInfo: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});
```

---

**Need help?** Contact our development team at rimjhim58096@gmail.com