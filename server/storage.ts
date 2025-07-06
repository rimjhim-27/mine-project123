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
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Test packages
  async getTestPackages(): Promise<TestPackage[]> {
    return await db.select().from(testPackages);
  }

  async getTestPackage(id: string): Promise<TestPackage | undefined> {
    const result = await db.select().from(testPackages).where(eq(testPackages.id, id));
    return result[0];
  }

  async createTestPackage(testPackage: InsertTestPackage): Promise<TestPackage> {
    const result = await db.insert(testPackages).values(testPackage).returning();
    return result[0];
  }

  // Individual tests
  async getIndividualTests(): Promise<IndividualTest[]> {
    return await db.select().from(individualTests);
  }

  async getIndividualTest(id: string): Promise<IndividualTest | undefined> {
    const result = await db.select().from(individualTests).where(eq(individualTests.id, id));
    return result[0];
  }

  async createIndividualTest(test: InsertIndividualTest): Promise<IndividualTest> {
    const result = await db.insert(individualTests).values(test).returning();
    return result[0];
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.id, id));
    return result[0];
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }

  async updateBooking(id: string, booking: Partial<Booking>): Promise<Booking | undefined> {
    const result = await db.update(bookings).set(booking).where(eq(bookings.id, id)).returning();
    return result[0];
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.approved, true));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    return await db.select().from(faqs);
  }

  async getActiveFAQs(): Promise<FAQ[]> {
    return await db.select().from(faqs).where(eq(faqs.active, true));
  }

  async createFAQ(faq: InsertFAQ): Promise<FAQ> {
    const result = await db.insert(faqs).values(faq).returning();
    return result[0];
  }

  // Reports
  async getReports(): Promise<Report[]> {
    return await db.select().from(reports);
  }

  async getReport(id: string): Promise<Report | undefined> {
    const result = await db.select().from(reports).where(eq(reports.id, id));
    return result[0];
  }

  async createReport(report: InsertReport): Promise<Report> {
    const result = await db.insert(reports).values(report).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
