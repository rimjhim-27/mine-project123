import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Check if DATABASE_URL is set and valid
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('username:password@localhost')) {
  console.warn("⚠️  DATABASE_URL not configured properly. Using mock database for development.");
  console.warn("📝 To fix this:");
  console.warn("   1. Create a Neon database at https://neon.tech");
  console.warn("   2. Copy your connection string");
  console.warn("   3. Update DATABASE_URL in your .env file");
  
  // Export mock database for development
  export const pool = null;
  export const db = null;
} else {
  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle({ client: pool, schema });
}
