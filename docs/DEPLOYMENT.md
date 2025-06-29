# Deployment Guide

This guide covers deploying The LABs application to various platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)
- Node.js 18+ locally (for development)

### Steps

1. **Fork the Repository**
   ```bash
   # Fork this repository to your GitHub account
   # Then clone your fork
   git clone https://github.com/YOUR_USERNAME/the-labs-pathology.git
   cd the-labs-pathology
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables** (Optional)
   In Vercel dashboard → Project Settings → Environment Variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

## 🔧 Manual Deployment

### Build the Project
```bash
npm install
npm run build
```

### Deploy to Static Hosting
Upload the `dist` folder to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🌐 Custom Domain Setup

### Vercel Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. SSL certificate is automatically provisioned

### DNS Configuration
```
Type: CNAME
Name: www
Value: your-project.vercel.app

Type: A
Name: @
Value: 76.76.19.61
```

## 🔒 Environment Variables

### Required for Full Functionality
```env
# Supabase (Optional - app works without)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Stripe (Optional - for payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-key
```

### Development vs Production
- **Development**: Use `.env` file
- **Production**: Set in hosting platform dashboard

## 📊 Database Setup (Optional)

### Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run migrations from `supabase/migrations/`
4. Get URL and anon key from Settings → API
5. Add to environment variables

### Database Schema
The app includes migration files for:
- Test packages
- Individual tests
- User bookings
- Testimonials
- FAQs
- Reports

## 💳 Payment Setup (Optional)

### Stripe Configuration
1. Create [Stripe account](https://stripe.com)
2. Get publishable key from Dashboard → Developers → API keys
3. Add to environment variables
4. Configure webhooks for production

## 🔄 CI/CD Setup

### GitHub Actions (Included)
The project includes automated deployment:
- Triggers on push to main/master
- Runs tests and builds
- Deploys to Vercel automatically

### Required Secrets
Add these to GitHub repository secrets:
```
VERCEL_TOKEN=your-vercel-token
ORG_ID=your-vercel-org-id
PROJECT_ID=your-vercel-project-id
```

## 📱 Performance Optimization

### Build Optimizations
- Code splitting enabled
- Tree shaking for unused code
- Image optimization
- CSS purging with Tailwind

### Caching Strategy
```javascript
// vercel.json includes caching headers
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🔍 Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics (built-in)
- Web Vitals tracking
- Error boundary reporting

### Custom Analytics
Add your analytics service:
```javascript
// Add to index.html or main.tsx
// Google Analytics, Mixpanel, etc.
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Restart development server after changes
   - Check Vercel dashboard for production

3. **Database Connection Issues**
   - App works without database (uses fallback data)
   - Check Supabase URL and key
   - Verify network connectivity

4. **Payment Issues**
   - Verify Stripe publishable key
   - Check browser console for errors
   - Test with Stripe test cards

### Support
- **Email**: rimjhim58096@gmail.com
- **GitHub Issues**: For bugs and feature requests
- **Documentation**: Check README.md for detailed info

## 📈 Scaling Considerations

### Performance
- CDN for static assets (Vercel includes this)
- Database connection pooling
- Image optimization service
- Caching strategies

### Security
- Regular dependency updates
- Security headers configuration
- Rate limiting for API endpoints
- Input validation and sanitization

### Monitoring
- Uptime monitoring
- Performance metrics
- Error tracking
- User analytics

---

**Need help?** Contact our team at rimjhim58096@gmail.com