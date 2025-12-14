import { Pool, neonConfig } from '@neondatabase/serverless';
import * as schema from "@shared/schema";
import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-serverless';
import { resolve } from "path";
import ws from "ws";

// Load .env file from project root
config({ path: resolve(process.cwd(), ".env") });

// Configure Neon with WebSocket constructor
neonConfig.webSocketConstructor = ws;

// Set connection pooling and timeout settings for better reliability
neonConfig.poolQueryViaFetch = true;
neonConfig.useSecureWebSocket = true;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure pool with better connection settings
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  maxUses: 7500,
  allowExitOnIdle: false
};

export const pool = new Pool(poolConfig);

// Add error handling for pool connections
pool.on('error', (err) => {
  console.error('Database pool error:', err);
});

export const db = drizzle(pool, { schema });
