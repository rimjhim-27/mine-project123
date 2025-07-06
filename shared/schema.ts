import { pgTable, text, serial, integer, boolean, uuid, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const testPackages = pgTable("test_packages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  tests: text("tests").array().notNull().default([]),
  category: text("category").notNull(),
  popular: boolean("popular").default(false),
  homeCollection: boolean("home_collection").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const individualTests = pgTable("individual_tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  symptoms: text("symptoms").array().notNull().default([]),
  preparationRequired: boolean("preparation_required").default(false),
  reportTime: text("report_time").notNull().default("24 hours"),
  homeCollection: boolean("home_collection").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  testType: text("test_type").notNull(),
  testId: uuid("test_id").notNull(),
  testName: text("test_name").notNull(),
  price: integer("price").notNull(),
  patientName: text("patient_name").notNull(),
  patientEmail: text("patient_email").notNull(),
  patientPhone: text("patient_phone").notNull(),
  patientAddress: text("patient_address").notNull(),
  collectionDate: date("collection_date").notNull(),
  collectionTime: text("collection_time").notNull(),
  status: text("status").default("pending"),
  paymentId: text("payment_id"),
  paymentStatus: text("payment_status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").notNull(),
  userId: uuid("user_id").notNull(),
  reportUrl: text("report_url").notNull(),
  reportPassword: text("report_password").notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
  downloadedAt: timestamp("downloaded_at"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTestPackageSchema = createInsertSchema(testPackages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertIndividualTestSchema = createInsertSchema(individualTests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertFAQSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  generatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TestPackage = typeof testPackages.$inferSelect;
export type InsertTestPackage = z.infer<typeof insertTestPackageSchema>;
export type IndividualTest = typeof individualTests.$inferSelect;
export type InsertIndividualTest = z.infer<typeof insertIndividualTestSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = z.infer<typeof insertFAQSchema>;
export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
