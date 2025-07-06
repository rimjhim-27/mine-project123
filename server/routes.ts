import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTestPackageSchema, 
  insertIndividualTestSchema, 
  insertBookingSchema, 
  insertTestimonialSchema, 
  insertFAQSchema, 
  insertReportSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Test packages routes
  app.get("/api/test-packages", async (req, res) => {
    try {
      const packages = await storage.getTestPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch test packages" });
    }
  });

  app.get("/api/test-packages/:id", async (req, res) => {
    try {
      const testPackage = await storage.getTestPackage(req.params.id);
      if (!testPackage) {
        return res.status(404).json({ error: "Test package not found" });
      }
      res.json(testPackage);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch test package" });
    }
  });

  app.post("/api/test-packages", async (req, res) => {
    try {
      const validatedData = insertTestPackageSchema.parse(req.body);
      const testPackage = await storage.createTestPackage(validatedData);
      res.status(201).json(testPackage);
    } catch (error) {
      res.status(400).json({ error: "Invalid test package data" });
    }
  });

  // Individual tests routes
  app.get("/api/individual-tests", async (req, res) => {
    try {
      const tests = await storage.getIndividualTests();
      res.json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch individual tests" });
    }
  });

  app.get("/api/individual-tests/:id", async (req, res) => {
    try {
      const test = await storage.getIndividualTest(req.params.id);
      if (!test) {
        return res.status(404).json({ error: "Individual test not found" });
      }
      res.json(test);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch individual test" });
    }
  });

  app.post("/api/individual-tests", async (req, res) => {
    try {
      const validatedData = insertIndividualTestSchema.parse(req.body);
      const test = await storage.createIndividualTest(validatedData);
      res.status(201).json(test);
    } catch (error) {
      res.status(400).json({ error: "Invalid individual test data" });
    }
  });

  // Bookings routes
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  app.put("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.updateBooking(req.params.id, req.body);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // Testimonials routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  // FAQs routes
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getActiveFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  app.post("/api/faqs", async (req, res) => {
    try {
      const validatedData = insertFAQSchema.parse(req.body);
      const faq = await storage.createFAQ(validatedData);
      res.status(201).json(faq);
    } catch (error) {
      res.status(400).json({ error: "Invalid FAQ data" });
    }
  });

  // Reports routes
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });

  app.get("/api/reports/:id", async (req, res) => {
    try {
      const report = await storage.getReport(req.params.id);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch report" });
    }
  });

  app.post("/api/reports", async (req, res) => {
    try {
      const validatedData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(validatedData);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ error: "Invalid report data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
