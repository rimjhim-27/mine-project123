# The LABs - Medical Testing Web Application

## Overview

The LABs is a comprehensive medical testing web application that provides home collection services for medical tests and health checkups. Built with modern web technologies, it offers a seamless user experience for booking tests, managing appointments, and downloading reports.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: React hooks and context
- **Authentication**: Custom JWT-based authentication
- **Data Fetching**: TanStack Query for API calls

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Database**: Neon PostgreSQL (serverless)
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **API Design**: RESTful endpoints with Express routes

### Development Environment
- **Development Server**: Vite dev server with HMR
- **Build Process**: Vite for frontend, esbuild for backend
- **Development Tools**: Replit integration with runtime error overlay

## Key Components

### Authentication System
- Custom authentication provider with React Context
- JWT token management
- Role-based access control (user/admin)
- Secure password handling

### Test Management
- Individual test catalog with 10,000+ tests
- Test packages with bundled offerings
- Category-based filtering and search
- Symptom-based test recommendations

### Booking System
- Multi-step booking process
- Home collection scheduling
- Real-time availability checking
- Payment integration with Stripe

### Admin Panel
- Dashboard with analytics
- Booking management
- Test catalog management
- User testimonials moderation
- FAQ management
- Report generation

### User Features
- Personal dashboard
- Booking history
- Report downloads
- Profile management

## Data Flow

1. **User Authentication**: Users authenticate through the custom auth system
2. **Test Discovery**: Browse tests via search, categories, or symptoms
3. **Booking Process**: Select tests → Fill details → Choose collection time → Payment
4. **Collection**: Home collection by certified phlebotomists
5. **Report Generation**: Lab processing and digital report creation
6. **Report Delivery**: Secure download with user ID authentication

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Connection**: WebSocket-based connection for serverless environments
- **Schema**: Drizzle ORM schema definitions in shared/schema.ts

### Payment Processing
- **Stripe**: Payment gateway integration
- **Features**: Card payments, UPI, digital wallets
- **Security**: PCI compliant payment processing

### UI Framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library
- **Tailwind CSS**: Utility-first CSS framework

### Communication
- **WhatsApp Integration**: Direct messaging for customer support
- **Email Service**: Automated notifications and reports
- **SMS Service**: Booking confirmations and alerts

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to dist/public
2. **Backend**: esbuild compiles TypeScript server to dist/
3. **Database**: Drizzle migrations deployed to production database

### Environment Configuration
- **Development**: Local development with HMR
- **Production**: Node.js server serving static files and API
- **Database**: Environment-specific connection strings

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database access
- SSL/TLS certificates for HTTPS
- Static file serving capability

## Changelog
- July 06, 2025. Initial setup
- July 06, 2025. Migrated from Bolt to Replit environment:
  - Replaced Supabase with Neon PostgreSQL database
  - Updated frontend routing from React Router DOM to Wouter
  - Migrated to server-side API endpoints with Drizzle ORM
  - Added TanStack Query for data fetching
  - Successfully seeded database with test data
  - API endpoints functional for test packages, individual tests, testimonials, and FAQs

## User Preferences

Preferred communication style: Simple, everyday language.