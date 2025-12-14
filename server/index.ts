import compression from "compression";
import { config } from "dotenv";
import express, { NextFunction, type Request, Response } from "express";
import { resolve } from "path";
import { handleDormantRedirects } from "./redirects";
import { registerRoutes } from "./routes";
import seed from "./seed";
import { log, serveStatic, setupVite } from "./vite";
config({ path: resolve(process.cwd(), ".env") });

const app = express();

// Security middleware disabled for Replit preview compatibility
// Will be re-enabled for production deployment

app.use(compression());
app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({ extended: false, limit: '300mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Add redirect middleware for dormant URLs before routes
app.use(handleDormantRedirects);

(async () => {
  // Run database migrations and seed
  try {
    console.log("🗄️ Running database migrations...");
    // Run custom migrations for adding new columns
    const { addVernacularFields } = await import("./migrations/add-vernacular-fields");
    await addVernacularFields();

    // Seed the database with initial data
    console.log("🌱 Seeding database...");
    await seed();
    console.log("✅ Database setup complete");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    // The application can still function with in-memory storage for now
  }

  // Health check endpoint for deployment - must be before registerRoutes
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      message: "Workspace discovery app is running",
      timestamp: new Date().toISOString()
    });
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(port, "127.0.0.1", () => {
    log(`serving on port ${port}`);
  });
})();
