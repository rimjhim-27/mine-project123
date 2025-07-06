# The LABs - Home Collection Pathology Service Provider

A modern, responsive web application for pathology lab services with home collection booking system.

## Features

- 🏠 **Home Collection Booking** - Schedule lab tests at your convenience
- 🧪 **Test Packages & Individual Tests** - Comprehensive health checkup options
- 📱 **Responsive Design** - Works perfectly on all devices
- 💳 **Payment Integration** - Secure payment processing with Stripe
- 📊 **Report Download** - Secure access to test reports
- 🔒 **Database Integration** - Optional Supabase backend
- ⚡ **Fast Performance** - Built with Vite and optimized for speed

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Database**: Supabase (optional)
- **Payments**: Stripe (optional)
- **Deployment**: Vercel

## Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd pathology-lab-website
npm install
```

### 2. Environment Setup (Optional)
Copy `.env.example` to `.env` and add your credentials:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## Deployment

### Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project

2. **Environment Variables** (Optional):
   - Add your Supabase and Stripe keys in Vercel dashboard
   - Go to Project Settings → Environment Variables

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Your site will be live at `https://your-project.vercel.app`

### Manual Deployment Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting service

## Configuration

### Database (Optional)
The app works perfectly without a database using fallback data. To enable Supabase:

1. Create a Supabase project
2. Run the migration files in `supabase/migrations/`
3. Add environment variables to `.env`

### Payments (Optional)
To enable Stripe payments:

1. Create a Stripe account
2. Add your publishable key to `.env`
3. Set up webhook endpoints for production

## Contact Information

- **Phone**: +919693631158
- **Email**: rimjhim58096@gmail.com
- **Admin Access**: rimjhim58096@gmail.com

## Features Overview

### 🏥 Test Packages
- Complete Health Checkup
- Diabetes Care Package
- Heart Health Package
- Women's Health Package

### 🔬 Individual Tests
- Complete Blood Count (CBC)
- Lipid Profile
- HbA1c (Glycated Hemoglobin)
- Thyroid Profile
- Vitamin D Total

### 🛡️ Trust & Safety
- NABL Accredited Laboratory
- 99.9% Accuracy Rate
- Certified Professionals
- Secure Data Handling

### 📱 User Experience
- Responsive design for all devices
- Intuitive booking process
- Real-time WhatsApp support
- Secure report download

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── services/           # External service integrations
├── types/              # TypeScript type definitions
└── data/               # Static data and fallbacks
```

## License

This project is proprietary software for The LABs pathology services.