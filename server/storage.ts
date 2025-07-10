import { 
  users, 
  testPackages, 
  individualTests, 
  bookings, 
  testimonials, 
  faqs, 
  reports,
  type User, 
  type InsertUser,
  type TestPackage,
  type InsertTestPackage,
  type IndividualTest,
  type InsertIndividualTest,
  type Booking,
  type InsertBooking,
  type Testimonial,
  type InsertTestimonial,
  type FAQ,
  type InsertFAQ,
  type Report,
  type InsertReport
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Mock data for development when database is not available
const mockTestPackages = [
  {
    id: "1",
    name: "Complete Health Checkup",
    description: "Comprehensive health screening with 45+ parameters",
    price: 1499,
    originalPrice: 2500,
    tests: ["Complete Blood Count", "Lipid Profile", "Liver Function Test"],
    category: "Health Checkup",
    popular: true,
    homeCollection: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockIndividualTests = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    description: "Comprehensive blood test that evaluates overall health",
    price: 299,
    category: "Blood Test",
    symptoms: ["Fatigue", "Weakness", "Fever"],
    preparationRequired: false,
    reportTime: "6 hours",
    homeCollection: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockTestimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    comment: "Excellent service! Very professional and convenient.",
    approved: true,
    createdAt: new Date()
  }
];

const mockFAQs = [
  {
    id: "1",
    question: "How do I book a test?",
    answer: "You can book a test by clicking the 'Book a Test' button.",
    category: "Booking",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Test packages
  getTestPackages(): Promise<TestPackage[]>;
  getTestPackage(id: string): Promise<TestPackage | undefined>;
  createTestPackage(testPackage: InsertTestPackage): Promise<TestPackage>;
  
  // Individual tests
  getIndividualTests(): Promise<IndividualTest[]>;
  getIndividualTest(id: string): Promise<IndividualTest | undefined>;
  createIndividualTest(test: InsertIndividualTest): Promise<IndividualTest>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<Booking>): Promise<Booking | undefined>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // FAQs
  getFAQs(): Promise<FAQ[]>;
  getActiveFAQs(): Promise<FAQ[]>;
  createFAQ(faq: InsertFAQ): Promise<FAQ>;
  
  // Reports
  getReports(): Promise<Report[]>;
  getReport(id: string): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return undefined;
    }
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return undefined;
    }
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) {
      console.warn("Database not available - using mock data");
      throw new Error("Database not available");
    }
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Test packages
  async getTestPackages(): Promise<TestPackage[]> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return mockTestPackages as TestPackage[];
    }
    return await db.select().from(testPackages);
  }

  async getTestPackage(id: string): Promise<TestPackage | undefined> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return mockTestPackages.find(pkg => pkg.id === id) as TestPackage;
    }
    const result = await db.select().from(testPackages).where(eq(testPackages.id, id));
    return result[0];
  }

  async createTestPackage(testPackage: InsertTestPackage): Promise<TestPackage> {
    if (!db) {
      console.warn("Database not available - using mock data");
      throw new Error("Database not available");
    }
    const result = await db.insert(testPackages).values(testPackage).returning();
    return result[0];
  }

  // Individual tests
  async getIndividualTests(): Promise<IndividualTest[]> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return mockIndividualTests as IndividualTest[];
    }
    return await db.select().from(individualTests);
  }

  async getIndividualTest(id: string): Promise<IndividualTest | undefined> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return mockIndividualTests.find(test => test.id === id) as IndividualTest;
    }
    const result = await db.select().from(individualTests).where(eq(individualTests.id, id));
    return result[0];
  }

  async createIndividualTest(test: InsertIndividualTest): Promise<IndividualTest> {
    if (!db) {
      console.warn("Database not available - using mock data");
      throw new Error("Database not available");
    }
    const result = await db.insert(individualTests).values(test).returning();
    return result[0];
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return [];
    }
    return await db.select().from(bookings);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return undefined;
    }
    const result = await db.select().from(bookings).where(eq(bookings.id, id));
    return result[0];
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    if (!db) {
      console.warn("Database not available - using mock data");
      throw new Error("Database not available");
    }
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }

  async updateBooking(id: string, booking: Partial<Booking>): Promise<Booking | undefined> {
    if (!db) {
      console.warn("Database not available - using mock data");
      throw new Error("Database not available");
    }
    const result = await db.update(bookings).set(booking).where(eq(bookings.id, id)).returning();
    return result[0];
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return mockTestimonials as Testimonial[];
    }
    return await db.select().from(testimonials);
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return mockTestimonials as Testimonial[];
    }
    return await db.select().from(testimonials).where(eq(testimonials.approved, true));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    if (!db) {
      console.warn("Database not available - using mock data");
      throw new Error("Database not available");
    }
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return mockFAQs as FAQ[];
    }
    return await db.select().from(faqs);
  }

  async getActiveFAQs(): Promise<FAQ[]> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return mockFAQs as FAQ[];
    }
    return await db.select().from(faqs).where(eq(faqs.active, true));
  }

  async createFAQ(faq: InsertFAQ): Promise<FAQ> {
    if (!db) {
      console.warn("Database not available - using mock data");
      throw new Error("Database not available");
    }
    const result = await db.insert(faqs).values(faq).returning();
    return result[0];
  }

  // Reports
  async getReports(): Promise<Report[]> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return [];
    }
    return await db.select().from(reports);
  }

  async getReport(id: string): Promise<Report | undefined> {
    if (!db) {
      console.warn("Database not available - using mock data");
      return undefined;
    }
    const result = await db.select().from(reports).where(eq(reports.id, id));
    return result[0];
  }

  async createReport(report: InsertReport): Promise<Report> {
    if (!db) {
      console.warn("Database not available - using mock data");
      throw new Error("Database not available");
    }
    const result = await db.insert(reports).values(report).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
