import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface TestBookingData {
  testId: string;
  testName: string;
  price: number;
  patientInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  collectionDate: string;
  collectionTime: string;
}

export class StripeService {
  private static instance: StripeService;
  
  public static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  async createPaymentIntent(paymentData: PaymentData) {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async processTestBooking(bookingData: TestBookingData) {
    const paymentData: PaymentData = {
      amount: bookingData.price * 100, // Convert to cents
      currency: 'inr',
      description: `Lab Test: ${bookingData.testName}`,
      metadata: {
        testId: bookingData.testId,
        patientName: bookingData.patientInfo.name,
        patientEmail: bookingData.patientInfo.email,
        collectionDate: bookingData.collectionDate,
        collectionTime: bookingData.collectionTime,
      },
    };

    return this.createPaymentIntent(paymentData);
  }

  async confirmPayment(clientSecret: string, paymentMethod: any) {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');

    return stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod,
    });
  }

  async redirectToCheckout(sessionId: string) {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');

    return stripe.redirectToCheckout({ sessionId });
  }
}

export default StripeService.getInstance();