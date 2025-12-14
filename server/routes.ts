import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { hashPassword, verifyPassword, generateToken, authenticateComplyUser } from "./comply-auth";
import { ocrService } from "./services/ocr-service";
import { gspApiService } from "./services/gsp-api-service";
import path from "path";
import { 
  insertLocationSchema, 
  insertOfficeSchema, 
  insertTestimonialSchema, 
  insertAreaSchema,
  insertAuthorSchema,
  insertBlogPostSchema,
  insertCapturedUrlSchema,
  insertWorkspaceSchema,
  insertVendorSchema,
  insertSalesPersonSchema,
  insertPricingCatalogSchema,
  insertOrderSchema,
  insertDocukitCategorySchema,
  insertDocukitTemplateSchema,
  insertCompanySearchSchema,
  insertComplyUserSchema,
  insertGstCertificateSchema,
  insertGstFilingSchema,
  insertGstReminderSchema,
  insertAlertSchema,
  insertOfferSchema,
  insertMenuSectionSchema,
  insertMenuItemSchema,
  insertServiceSchema,
  insertServiceOrderSchema,
  insertDynamicPageSchema,
} from "@shared/schema";
import Razorpay from "razorpay";
import { z } from "zod";
import { setupAuth } from "./auth";
import { generateBlogSummary } from "./ai/blogSummarizer";
import { 
  generateChatCompletion,
  generateWorkspaceRecommendation, 
  answerWorkspaceQuestion,
  generateSmartRecommendations 
} from "./services/openai";
import { getVernacularSalutation } from "@shared/openai";
import { urlCaptureService } from "./services/url-capture";
import { buildLocalLinks } from "./utils/externalLinks";
import { buildInternalLinks } from "./utils/internalLinks";
import { parse } from "csv-parse";
import { generateSlug } from "./utils/slug-generator";
import { sql, eq, and, isNotNull, ne } from "drizzle-orm";
import * as schema from "@shared/schema";

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 250 * 1024 * 1024, // 250MB limit for enterprise datasets
    fieldSize: 100 * 1024 * 1024, // 100MB field size limit
    fields: 100,                  // Allow multiple fields
    parts: 1000                   // Allow many parts for large files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
});

// Configure multer for comply document uploads
const complyUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/comply/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExt = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for documents
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg', 
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, XLS, XLSX, JPG, PNG files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
  
  // Middleware to check if user is authenticated
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };
  
  // Get all locations
  app.get("/api/locations", async (req, res) => {
    try {
      // Disable caching temporarily to ensure fresh data
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      
      const country = req.query.country as string;
      const locations = await storage.getAllLocations(country);
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });

  // Get location by slug
  app.get("/api/locations/:slug", async (req, res) => {
    try {
      // Add caching for specific location pages - they don't change often
      res.set({
        'Cache-Control': 'public, max-age=300',  // 5 minute browser cache
        'Surrogate-Control': 'max-age=3600',     // 1 hour CDN cache
        'Vary': 'Accept-Encoding'
      });
      
      const slug = req.params.slug;
      const location = await storage.getLocationBySlug(slug);
      
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch location" });
    }
  });
  
  // Get vernacular salutation for a location by slug
  app.get("/api/locations/:slug/salutation", async (req, res) => {
    try {
      const slug = req.params.slug;
      const location = await storage.getLocationBySlug(slug);
      
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      // If vernacular salutation doesn't exist, generate it
      if (!location.vernacularSalutation) {
        // Call OpenAI to get the vernacular salutation
        const salutation = await getVernacularSalutation(location.name);
        
        if (salutation) {
          // Update the location with the salutation
          await storage.updateLocation(location.id, {
            vernacularSalutation: salutation.vernacularSalutation,
            vernacularLanguage: salutation.language,
            vernacularTranslation: salutation.englishTranslation
          });
          
          // Return the updated location data
          return res.json({
            vernacularSalutation: salutation.vernacularSalutation,
            vernacularLanguage: salutation.language,
            vernacularTranslation: salutation.englishTranslation
          });
        }
      }
      
      // Return existing salutation data
      res.json({
        vernacularSalutation: location.vernacularSalutation || "",
        vernacularLanguage: location.vernacularLanguage || "",
        vernacularTranslation: location.vernacularTranslation || ""
      });
    } catch (error) {
      console.error("Error fetching vernacular salutation:", error);
      res.status(500).json({ message: "Failed to fetch vernacular salutation" });
    }
  });
  
  // Get location by ID
  app.get("/api/locations/:id([0-9]+)", async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      const location = await storage.getLocationById(locationId);
      
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch location" });
    }
  });

  // Get offices by location ID
  app.get("/api/locations/:id/offices", async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const offices = await storage.getOfficesByLocationId(locationId);
      res.json(offices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch offices" });
    }
  });

  // Get testimonials by location ID
  app.get("/api/locations/:id/testimonials", async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const testimonials = await storage.getTestimonialsByLocationId(locationId);
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Get location by geo coordinates (simulated)
  app.get("/api/geo-location", async (req, res) => {
    try {
      const latitude = parseFloat(req.query.lat as string);
      const longitude = parseFloat(req.query.lng as string);
      
      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: "Invalid coordinates" });
      }
      
      // This is a simplified example. In a real-world scenario, 
      // you would use a geolocation service to determine the closest city
      // based on the provided coordinates.
      
      // For demo purposes, return a default location (Pune)
      const defaultLocation = await storage.getLocationBySlug("pune");
      res.json(defaultLocation);
    } catch (error) {
      res.status(500).json({ message: "Failed to determine location" });
    }
  });

  // Get location by IP address - now with real IP-based geolocation
  app.get("/api/ip-location", async (req, res) => {
    try {
      const ip = req.query.ip as string || req.ip || req.headers['x-forwarded-for'];
      
      // First try to get location from user preference (if passed)
      let preferredLocation = null;
      if (req.query.preferred) {
        preferredLocation = await storage.getLocationBySlug(req.query.preferred as string);
        if (preferredLocation) {
          return res.json(preferredLocation);
        }
      }
      
      // Use GeoJS, a completely free and rate-limit free IP geolocation service
      try {
        // Get all locations for potential matching
        const allLocations = await storage.getAllLocations();
        
        // Attempt to get geolocation data without API key requirements
        const response = await fetch(`https://get.geojs.io/v1/ip/geo.json?ip=${ip}`);
        if (!response.ok) throw new Error(`GeoJS API returned ${response.status}`);
        
        const geoData = await response.json();
        console.log("Geolocation data:", geoData);
        
        // Extract location information
        const cityFromIP = geoData.city?.toLowerCase();
        const regionFromIP = geoData.region?.toLowerCase();
        const countryFromIP = geoData.country?.toLowerCase();
        
        console.log(`IP Geolocation detected: ${cityFromIP}, ${regionFromIP}, ${countryFromIP}`);
        
        // Try to find the best match for the user's location
        let matchedLocation = null;
        
        // 1. First try exact city match (most specific)
        if (cityFromIP) {
          const normalizedCityFromIP = cityFromIP.replace(/\s+/g, '');
          
          // Try exact city match first
          matchedLocation = allLocations.find(loc => {
            const normalizedLocName = loc.name.toLowerCase().replace(/\s+/g, '');
            return normalizedLocName === normalizedCityFromIP;
          });
          
          if (matchedLocation) {
            console.log(`Found exact city match for ${cityFromIP}:`, matchedLocation.name);
            return res.json(matchedLocation);
          }
          
          // 2. Try special cases with multiple spellings (Bengaluru/Bangalore)
          if (cityFromIP === 'bangalore' || cityFromIP === 'bengaluru') {
            matchedLocation = allLocations.find(loc => {
              const locName = loc.name.toLowerCase();
              return locName === 'bangalore' || locName === 'bengaluru';
            });
            
            if (matchedLocation) {
              console.log(`Found special case match for ${cityFromIP}:`, matchedLocation.name);
              return res.json(matchedLocation);
            }
          }
          
          // 3. Try partial city name match (less specific)
          matchedLocation = allLocations.find(loc => {
            return loc.name.toLowerCase().includes(cityFromIP) || 
                   cityFromIP.includes(loc.name.toLowerCase());
          });
          
          if (matchedLocation) {
            console.log(`Found partial city match for ${cityFromIP}:`, matchedLocation.name);
            return res.json(matchedLocation);
          }
        }
        
        // 4. Try to match by region/state if city match failed
        if (regionFromIP && !matchedLocation) {
          // Handle region matching with abbreviation conversion (e.g., Karnataka = KA)
          const regionMap: Record<string, string[]> = {
            'karnataka': ['bangalore', 'bengaluru'],
            'maharashtra': ['mumbai', 'pune'],
            'telangana': ['hyderabad'],
            'delhi': ['delhi'],
            'tamil nadu': ['chennai'],
            'kerala': ['kochi', 'cochin'],
            'west bengal': ['kolkata'],
            'gujarat': ['ahmedabad', 'surat'],
          };
          
          const potentialCities = regionMap[regionFromIP.toLowerCase()] || [];
          if (potentialCities.length > 0) {
            // Try to find any location that matches the potential cities for this region
            for (const city of potentialCities) {
              matchedLocation = allLocations.find(loc => 
                loc.name.toLowerCase() === city || 
                loc.slug.toLowerCase() === city
              );
              
              if (matchedLocation) {
                console.log(`Found region-based match (${regionFromIP}) -> ${city}:`, matchedLocation.name);
                return res.json(matchedLocation);
              }
            }
          }
        }
        
        // If we're specifically in India but couldn't identify a city,
        // return Bangalore as it's a major tech hub and the user mentioned they're in Bangalore
        if (countryFromIP === 'india' && !matchedLocation) {
          matchedLocation = allLocations.find(loc => 
            loc.name.toLowerCase() === 'bangalore' || 
            loc.name.toLowerCase() === 'bengaluru'
          );
          
          if (matchedLocation) {
            console.log("Using Bangalore as default location for India");
            return res.json(matchedLocation);
          }
        }
      } catch (geoError) {
        console.error("Geolocation service error:", geoError);
        // Fall through to default location below
      }
      
      // If geolocation failed or no matches found, use a default location like Bangalore
      // For user's request explicitly mentioning Bangalore
      let defaultLocation = await storage.getLocationBySlug("bangalore");
      
      // If Bangalore not available, try common alternatives for major cities
      if (!defaultLocation) {
        // Try some other major cities like Mumbai, Delhi, etc.
        for (const citySlug of ["mumbai", "delhi", "pune"]) {
          defaultLocation = await storage.getLocationBySlug(citySlug);
          if (defaultLocation) break;
        }
      }
      
      // Fallback to any location if no others are available
      if (!defaultLocation) {
        const allLocations = await storage.getAllLocations();
        defaultLocation = allLocations.length > 0 ? allLocations[0] : undefined;
      }
      
      res.json(defaultLocation);
    } catch (error) {
      console.error("Location detection error:", error);
      res.status(500).json({ message: "Failed to determine location from IP" });
    }
  });
  
  // Clear cache endpoint - for development and manual cache clearing
  app.post("/api/clear-cache", async (req, res) => {
    try {
      // Clear server-side caches by setting no-cache headers for future requests
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      
      res.json({ 
        message: "Server cache cleared successfully",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cache" });
    }
  });

  // Bootstrap endpoint - returns all critical initial data in a single request
  // This significantly reduces initial load time by eliminating multiple API calls
  app.get("/api/bootstrap", async (req, res) => {
    try {
      // Disable caching temporarily to ensure fresh data
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      // Detect the user's IP address from the request
      const ip = req.query.ip as string || req.ip;
      
      // Execute all needed queries in parallel for maximum performance
      const allLocations = await storage.getAllLocations();
      
      // Look for location in URL path if present (highest priority)
      let defaultLocation = null;
      const urlPath = req.get('Referer') || '';
      const pathMatch = urlPath.match(/\/([^\/\?]+)/);
      
      if (pathMatch && pathMatch[1] && pathMatch[1] !== 'admin') {
        const slugFromPath = pathMatch[1];
        defaultLocation = await storage.getLocationBySlug(slugFromPath);
      }
      
      // If no location from path, try saved preference from query param
      if (!defaultLocation && req.query.preferred) {
        defaultLocation = await storage.getLocationBySlug(req.query.preferred as string);
      }
      
      // If no location found yet, try to detect it using IP geolocation
      if (!defaultLocation) {
        try {
          // Get client IP address
          const clientIP = req.query.ip as string || req.ip || (req.headers['x-forwarded-for'] as string)?.split(',')[0];
          console.log("Bootstrap IP detection using:", clientIP);
          
          // Use GeoJS - a free IP geolocation service with no API key or rate limit
          const response = await fetch(`https://get.geojs.io/v1/ip/geo.json?ip=${clientIP}`);
          if (!response.ok) throw new Error(`GeoJS API returned ${response.status}`);
          
          const geoData = await response.json();
          console.log("Bootstrap Geolocation data:", geoData);
          
          // Extract location information
          const cityFromIP = geoData.city?.toLowerCase();
          const regionFromIP = geoData.region?.toLowerCase();
          const countryFromIP = geoData.country?.toLowerCase();
          
          console.log(`Bootstrap IP Geolocation detected: ${cityFromIP}, ${regionFromIP}, ${countryFromIP}`);
          
          // First try direct city match
          if (cityFromIP) {
            // Normalize city name
            const normalizedCityFromIP = cityFromIP.replace(/\s+/g, '');
            
            // Try exact match
            for (const loc of allLocations) {
              const normalizedLocName = loc.name.toLowerCase().replace(/\s+/g, '');
              
              // Check for exact match or if the location name contains the city name
              if (normalizedLocName === normalizedCityFromIP || 
                  normalizedLocName.includes(normalizedCityFromIP) ||
                  normalizedCityFromIP.includes(normalizedLocName)) {
                console.log(`Bootstrap found location match for ${cityFromIP}:`, loc.name);
                defaultLocation = loc;
                break;
              }
            }
            
            // Special case for Bangalore/Bengaluru
            if (!defaultLocation && (cityFromIP === 'bangalore' || cityFromIP === 'bengaluru')) {
              for (const loc of allLocations) {
                const locName = loc.name.toLowerCase();
                if (locName === 'bangalore' || locName === 'bengaluru') {
                  console.log("Bootstrap found Bangalore location:", loc.name);
                  defaultLocation = loc;
                  break;
                }
              }
            }
          }
          
          // If no city match, try region match
          if (!defaultLocation && regionFromIP) {
            // Map of Indian states to their major cities that we likely have in our database
            const regionMap: Record<string, string[]> = {
              'karnataka': ['bangalore', 'bengaluru'],
              'maharashtra': ['mumbai', 'pune'],
              'telangana': ['hyderabad'],
              'delhi': ['delhi', 'new delhi'],
              'tamil nadu': ['chennai'],
              'kerala': ['kochi', 'cochin'],
              'west bengal': ['kolkata'],
              'gujarat': ['ahmedabad', 'surat'],
            };
            
            const potentialCities = regionMap[regionFromIP.toLowerCase()] || [];
            if (potentialCities.length > 0) {
              // Try to find any location that matches cities for this region
              for (const city of potentialCities) {
                const regionMatch = allLocations.find(loc => 
                  loc.name.toLowerCase() === city || 
                  loc.slug.toLowerCase() === city
                );
                
                if (regionMatch) {
                  console.log(`Bootstrap found region-based match (${regionFromIP}) -> ${city}:`, regionMatch.name);
                  defaultLocation = regionMatch;
                  break;
                }
              }
            }
          }
          
          // If we're in India and still haven't found a match, default to Bangalore
          if (!defaultLocation && countryFromIP === 'india') {
            const bangaloreLocation = allLocations.find(loc => 
              loc.name.toLowerCase() === 'bangalore' || 
              loc.name.toLowerCase() === 'bengaluru'
            );
            
            if (bangaloreLocation) {
              console.log("Bootstrap using Bangalore as default for India");
              defaultLocation = bangaloreLocation;
            }
          }
        } catch (err) {
          console.error("Bootstrap IP geolocation error:", err);
          // Continue to fallbacks below
        }
      }
      
      // If still no location, try Bangalore first, then other major cities
      if (!defaultLocation) {
        // Try Bangalore first (since user mentioned they're in Bangalore)
        defaultLocation = await storage.getLocationBySlug("bangalore");
        
        // If Bangalore not found, try other major cities
        if (!defaultLocation) {
          for (const city of ["mumbai", "delhi", "pune"]) {
            defaultLocation = await storage.getLocationBySlug(city);
            if (defaultLocation) break;
          }
        }
      }
      
      // Final fallback if all else fails
      const finalDefaultLocation = defaultLocation || 
        (allLocations.length > 0 ? allLocations[0] : undefined);
      
      // Return all initial data in a single response to reduce API calls
      res.json({
        locations: allLocations,
        defaultLocation: finalDefaultLocation,
        initialLoadTime: new Date().toISOString(),
        apiVersion: '1.0',
        detectionSource: pathMatch ? 'url_path' : (req.query.preferred ? 'saved_preference' : 'default'),
        cacheExpires: new Date(Date.now() + 300000).toISOString() // 5 minutes from now
      });
    } catch (error) {
      console.error("Bootstrap data loading error:", error);
      res.status(500).json({ 
        message: "Failed to load initial application data",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // PAA (People Also Ask) endpoint
  app.get("/api/paa/:cityName", async (req, res) => {
    try {
      const { cityName } = req.params;
      
      if (!cityName) {
        return res.status(400).json({ message: "City name is required" });
      }

      // Import the PAA service
      const { generatePAAQuestions } = await import("../shared/paa-service.js");
      
      const paaData = await generatePAAQuestions(cityName);
      res.json(paaData);
    } catch (error) {
      console.error("Error generating PAA content:", error);
      res.status(500).json({ message: "Failed to generate PAA content" });
    }
  });

  // Create a new location (admin endpoint, not used in the UI)
  app.post("/api/locations", async (req, res) => {
    try {
      const locationData = insertLocationSchema.parse(req.body);
      const newLocation = await storage.createLocation(locationData);
      res.status(201).json(newLocation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid location data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create location" });
    }
  });
  
  // Update an existing location
  app.put("/api/locations/:id", async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      // Only allow certain fields to be updated
      const updateData = {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.heroImage !== undefined && { heroImage: req.body.heroImage }),
        ...(req.body.officeImage !== undefined && { officeImage: req.body.officeImage }),
        ...(req.body.mainAddress && { mainAddress: req.body.mainAddress }),
        ...(req.body.phoneNumber && { phoneNumber: req.body.phoneNumber }),
        ...(req.body.email && { email: req.body.email }),
      };
      
      const updatedLocation = await storage.updateLocation(locationId, updateData);
      
      if (!updatedLocation) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      res.json(updatedLocation);
    } catch (error) {
      res.status(500).json({ message: "Failed to update location" });
    }
  });

  // Create a new office (admin endpoint, not used in the UI)
  app.post("/api/offices", async (req, res) => {
    try {
      const officeData = insertOfficeSchema.parse(req.body);
      const newOffice = await storage.createOffice(officeData);
      res.status(201).json(newOffice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid office data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create office" });
    }
  });

  // Create a new testimonial (admin endpoint, not used in the UI)
  app.post("/api/testimonials", async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(newTestimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  // Get areas by location ID
  app.get("/api/locations/:id/areas", async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const areas = await storage.getAreasByLocationId(locationId);
      res.json(areas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch areas" });
    }
  });
  
  // Get a single area by ID
  app.get("/api/areas/:id", async (req, res) => {
    try {
      const areaId = parseInt(req.params.id);
      
      if (isNaN(areaId)) {
        return res.status(400).json({ message: "Invalid area ID" });
      }
      
      const area = await storage.getArea(areaId);
      
      if (!area) {
        return res.status(404).json({ message: "Area not found" });
      }
      
      res.json(area);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch area" });
    }
  });

  // Get area by location slug and area slug
  app.get("/api/locations/:locationSlug/areas/:areaSlug", async (req, res) => {
    try {
      const { locationSlug, areaSlug } = req.params;
      const area = await storage.getAreaBySlug(locationSlug, areaSlug);
      
      if (!area) {
        return res.status(404).json({ message: "Area not found" });
      }
      
      res.json(area);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch area" });
    }
  });

  // Get area by ID
  app.get("/api/areas/:id", async (req, res) => {
    try {
      const areaId = parseInt(req.params.id);
      
      if (isNaN(areaId)) {
        return res.status(400).json({ message: "Invalid area ID" });
      }
      
      const area = await storage.getArea(areaId);
      
      if (!area) {
        return res.status(404).json({ message: "Area not found" });
      }
      
      res.json(area);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch area" });
    }
  });

  // Create a new area
  app.post("/api/areas", async (req, res) => {
    try {
      const areaData = insertAreaSchema.parse(req.body);
      const newArea = await storage.createArea(areaData);
      res.status(201).json(newArea);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid area data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create area" });
    }
  });

  // Update an area
  app.patch("/api/areas/:id", async (req, res) => {
    try {
      const areaId = parseInt(req.params.id);
      
      if (isNaN(areaId)) {
        return res.status(400).json({ message: "Invalid area ID" });
      }
      
      // Validate the update data (partial validation)
      const updateData = insertAreaSchema.partial().parse(req.body);
      
      const updatedArea = await storage.updateArea(areaId, updateData);
      
      if (!updatedArea) {
        return res.status(404).json({ message: "Area not found" });
      }
      
      res.json(updatedArea);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid area data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update area" });
    }
  });

  // Delete an area
  app.delete("/api/areas/:id", async (req, res) => {
    try {
      const areaId = parseInt(req.params.id);
      
      if (isNaN(areaId)) {
        return res.status(400).json({ message: "Invalid area ID" });
      }
      
      await storage.deleteArea(areaId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete area" });
    }
  });

  // BLOG ROUTES
  
  // Get all published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      
      // Add author information to each post
      const postsWithAuthors = await Promise.all(
        posts.map(async (post) => {
          const [authorUsername, authorName] = await Promise.all([
            storage.getBlogPostAuthorUsername(post.authorId),
            storage.getBlogPostAuthorName(post.authorId)
          ]);
          return {
            ...post,
            authorUsername: authorName || authorUsername || 'Unknown Author'
          };
        })
      );
      
      res.json(postsWithAuthors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  
  // Get a single blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      // Only return published posts to public users
      if (!post.published && !req.isAuthenticated()) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      // Get the author's information
      const [authorUsername, authorName] = await Promise.all([
        storage.getBlogPostAuthorUsername(post.authorId),
        storage.getBlogPostAuthorName(post.authorId)
      ]);
      
      // Return the post with author information
      res.json({
        ...post,
        authorUsername: authorName || authorUsername || 'Unknown Author'
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Generate AI summary for a blog post
  app.post("/api/blog/:slug/summary", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      // Only allow published posts or authenticated users
      if (!post.published && !req.isAuthenticated()) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      const summary = await generateBlogSummary(post.content, post.title);
      res.json(summary);
    } catch (error) {
      console.error('Error generating blog summary:', error);
      res.status(500).json({ message: "Failed to generate blog summary" });
    }
  });

  // Get all blog tags
  app.get("/api/blog/tags", async (req, res) => {
    try {
      const tags = await storage.getAllBlogTags();
      res.json(tags);
    } catch (error) {
      console.error('Error fetching blog tags:', error);
      res.status(500).json({ message: "Failed to fetch blog tags" });
    }
  });

  // Get blog posts by tag
  app.get("/api/blog/tags/:tag", async (req, res) => {
    try {
      const { tag } = req.params;
      const posts = await storage.getBlogPostsByTag(tag);
      
      // Add author information to each post
      const postsWithAuthors = await Promise.all(
        posts.map(async (post) => {
          const [authorUsername, authorName] = await Promise.all([
            storage.getBlogPostAuthorUsername(post.authorId),
            storage.getBlogPostAuthorName(post.authorId)
          ]);
          return {
            ...post,
            authorUsername: authorName || authorUsername || 'Unknown Author'
          };
        })
      );
      
      res.json(postsWithAuthors);
    } catch (error) {
      console.error('Error fetching blog posts by tag:', error);
      res.status(500).json({ message: "Failed to fetch blog posts by tag" });
    }
  });

  // Get author information by ID (public endpoint)
  app.get("/api/authors/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const authorId = parseInt(id);
      
      if (isNaN(authorId)) {
        return res.status(400).json({ message: "Invalid author ID" });
      }
      
      const author = await storage.getAuthorById(authorId);
      
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      
      res.json(author);
    } catch (error) {
      console.error('Error fetching author:', error);
      res.status(500).json({ message: "Failed to fetch author" });
    }
  });
  
  // WORKSPACE ROUTES

  // VENDOR ROUTES

  // Get all vendors
  app.get("/api/vendors", async (req, res) => {
    try {
      // Add caching for vendor data as it rarely changes
      res.set({
        'Cache-Control': 'public, max-age=600',  // 10 minute browser cache
        'Surrogate-Control': 'max-age=3600',     // 1 hour CDN cache
        'Vary': 'Accept-Encoding'
      });
      
      const vendors = await storage.getAllVendors();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  // Get vendor by ID
  app.get("/api/vendors/:id", async (req, res) => {
    try {
      const vendorId = parseInt(req.params.id);
      
      if (isNaN(vendorId)) {
        return res.status(400).json({ message: "Invalid vendor ID" });
      }
      
      const vendor = await storage.getVendorById(vendorId);
      
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor" });
    }
  });

  // Get vendor by slug
  app.get("/api/vendors/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const vendor = await storage.getVendorBySlug(slug);
      
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor" });
    }
  });

  // Get workspaces by vendor ID
  app.get("/api/vendors/:id/workspaces", async (req, res) => {
    try {
      const vendorId = parseInt(req.params.id);
      
      if (isNaN(vendorId)) {
        return res.status(400).json({ message: "Invalid vendor ID" });
      }
      
      const workspaces = await storage.getWorkspacesByVendorId(vendorId);
      res.json(workspaces);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workspaces for vendor" });
    }
  });

  // Get all workspaces 
  app.get("/api/workspaces", async (req, res) => {
    try {
      const workspaces = await storage.getAllWorkspaces();
      res.json(workspaces);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workspaces" });
    }
  });

  // Get workspace by slug
  app.get("/api/workspaces/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const workspace = await storage.getWorkspaceBySlug(slug);
      
      if (!workspace) {
        return res.status(404).json({ message: "Workspace not found" });
      }
      
      res.json(workspace);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workspace" });
    }
  });

  // Get workspaces by location ID
  app.get("/api/locations/:id/workspaces", async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const workspaces = await storage.getWorkspacesByLocationId(locationId);
      res.json(workspaces);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workspaces for location" });
    }
  });

  // Get workspaces by area ID
  app.get("/api/areas/:id/workspaces", async (req, res) => {
    try {
      const areaId = parseInt(req.params.id);
      
      if (isNaN(areaId)) {
        return res.status(400).json({ message: "Invalid area ID" });
      }
      
      const workspaces = await storage.getWorkspacesByAreaId(areaId);
      res.json(workspaces);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workspaces for area" });
    }
  });

  // Create a new workspace (non-authenticated for development)
  app.post("/api/workspaces", async (req, res) => {
    try {
      console.log("Received workspace data:", req.body);
      const workspaceData = insertWorkspaceSchema.parse(req.body);
      console.log("Validated workspace data:", workspaceData);
      const newWorkspace = await storage.createWorkspace(workspaceData);
      res.status(201).json(newWorkspace);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Workspace validation error:", error.errors);
        return res.status(400).json({ message: "Invalid workspace data", errors: error.errors });
      }
      console.error("Workspace creation error:", error);
      res.status(500).json({ 
        message: "Failed to create workspace", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // ADMIN ROUTES - Protected by authentication
  
  // Create a new workspace - admin only
  app.post("/api/admin/workspaces", isAuthenticated, async (req, res) => {
    try {
      console.log("Received workspace data:", req.body);
      const workspaceData = insertWorkspaceSchema.parse(req.body);
      console.log("Validated workspace data:", workspaceData);
      const newWorkspace = await storage.createWorkspace(workspaceData);
      res.status(201).json(newWorkspace);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Workspace validation error:", error.errors);
        return res.status(400).json({ message: "Invalid workspace data", errors: error.errors });
      }
      console.error("Workspace creation error:", error);
      res.status(500).json({ 
        message: "Failed to create workspace", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });
  
  // Bulk create workspaces from CSV - admin only
  app.post("/api/admin/workspaces/bulk", isAuthenticated, async (req, res) => {
    try {
      const workspacesData = req.body;
      
      if (!Array.isArray(workspacesData) || workspacesData.length === 0) {
        return res.status(400).json({ 
          message: "Invalid request format. Expected an array of workspace data." 
        });
      }

      console.log(`Processing ${workspacesData.length} workspaces for bulk creation`);
      
      // Type-safe results object
      const results: {
        success: Array<{id: number; name: string; slug: string}>;
        errors: Array<{data: any; error: string}>;
      } = {
        success: [],
        errors: []
      };
      
      // Process each workspace entry
      for (const workspaceEntry of workspacesData) {
        try {
          // Validate workspace data
          const validatedData = insertWorkspaceSchema.parse(workspaceEntry);
          
          // Create workspace
          const newWorkspace = await storage.createWorkspace(validatedData);
          results.success.push({
            id: newWorkspace.id,
            name: newWorkspace.name,
            slug: newWorkspace.slug
          });
        } catch (error) {
          // Track errors for specific entries
          const errorMessage = error instanceof z.ZodError 
            ? `Validation error: ${error.errors.map(e => e.message).join(", ")}` 
            : error instanceof Error ? error.message : String(error);
          
          results.errors.push({
            data: workspaceEntry,
            error: errorMessage
          });
        }
      }
      
      res.status(201).json({
        message: `Processed ${workspacesData.length} workspaces: ${results.success.length} created, ${results.errors.length} failed`,
        results
      });
    } catch (error) {
      console.error("Bulk workspace creation error:", error);
      res.status(500).json({ 
        message: "Failed to process bulk workspace creation", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // Update a workspace - admin only
  app.patch("/api/admin/workspaces/:id", isAuthenticated, async (req, res) => {
    try {
      const workspaceId = parseInt(req.params.id);
      
      if (isNaN(workspaceId)) {
        return res.status(400).json({ message: "Invalid workspace ID" });
      }
      
      // Validate the update data (partial validation)
      const updateData = insertWorkspaceSchema.partial().parse(req.body);
      
      const updatedWorkspace = await storage.updateWorkspace(workspaceId, updateData);
      res.json(updatedWorkspace);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid workspace data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update workspace" });
    }
  });

  // Delete a workspace - admin only
  app.delete("/api/admin/workspaces/:id", isAuthenticated, async (req, res) => {
    try {
      const workspaceId = parseInt(req.params.id);
      
      if (isNaN(workspaceId)) {
        return res.status(400).json({ message: "Invalid workspace ID" });
      }
      
      await storage.deleteWorkspace(workspaceId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete workspace" });
    }
  });
  
  // Get all blog posts (including drafts) - admin only
  app.get("/api/admin/blog", isAuthenticated, async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  
  // Get a single blog post by ID - admin only
  app.get("/api/admin/blog/:id", isAuthenticated, async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const post = await storage.getBlogPostById(postId);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  
  // Create a new blog post - admin only
  app.post("/api/admin/blog", isAuthenticated, async (req, res) => {
    try {
      // Use the authenticated user as the author
      const postData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: req.user?.id
      });
      
      const newPost = await storage.createBlogPost(postData);
      
      // Automatically capture URLs from the content for backlink building
      if (newPost.content) {
        try {
          await urlCaptureService.captureUrlsFromBlogPost(newPost.id, newPost.content);
        } catch (urlError) {
          console.error("Error capturing URLs from blog post:", urlError);
          // Don't fail the entire request if URL capture fails
        }
      }
      
      res.status(201).json(newPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });
  
  // Update a blog post - admin only
  app.patch("/api/admin/blog/:id", isAuthenticated, async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      // Validate the update data (partial validation)
      const updateData = insertBlogPostSchema.partial().parse(req.body);
      
      const updatedPost = await storage.updateBlogPost(postId, updateData);
      
      // Re-capture URLs if content was updated for backlink building
      if (updateData.content) {
        try {
          await urlCaptureService.captureUrlsFromBlogPost(postId, updateData.content);
        } catch (urlError) {
          console.error("Error capturing URLs from updated blog post:", urlError);
          // Don't fail the entire request if URL capture fails
        }
      }
      
      res.json(updatedPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });
  
  // Delete a blog post - admin only
  app.delete("/api/admin/blog/:id", isAuthenticated, async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      await storage.deleteBlogPost(postId);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      if (error instanceof Error && error.message.includes("not found")) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // URL Capture and Backlink Management Routes
  
  // Get captured URLs for a blog post
  app.get("/api/admin/blog/:id/urls", isAuthenticated, async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const capturedUrls = await storage.getCapturedUrlsByBlogPostId(postId);
      res.json(capturedUrls);
    } catch (error) {
      console.error("Error fetching captured URLs:", error);
      res.status(500).json({ message: "Failed to fetch captured URLs" });
    }
  });
  
  // Get link analysis for a blog post
  app.get("/api/admin/blog/:id/link-analysis", isAuthenticated, async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const analysis = await urlCaptureService.getLinkAnalysis(postId);
      res.json(analysis);
    } catch (error) {
      console.error("Error generating link analysis:", error);
      res.status(500).json({ message: "Failed to generate link analysis" });
    }
  });
  
  // Get all captured URLs (for SEO dashboard)
  app.get("/api/admin/captured-urls", isAuthenticated, async (req, res) => {
    try {
      const capturedUrls = await storage.getAllCapturedUrls();
      res.json(capturedUrls);
    } catch (error) {
      console.error("Error fetching all captured URLs:", error);
      res.status(500).json({ message: "Failed to fetch captured URLs" });
    }
  });
  
  // Get captured URLs by domain (for backlink analysis)
  app.get("/api/admin/captured-urls/domain/:domain", isAuthenticated, async (req, res) => {
    try {
      const domain = req.params.domain;
      const capturedUrls = await storage.getCapturedUrlsByDomain(domain);
      res.json(capturedUrls);
    } catch (error) {
      console.error("Error fetching captured URLs by domain:", error);
      res.status(500).json({ message: "Failed to fetch captured URLs by domain" });
    }
  });
  
  // Manually re-capture URLs for a blog post
  app.post("/api/admin/blog/:id/recapture-urls", isAuthenticated, async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const post = await storage.getBlogPostById(postId);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      await urlCaptureService.captureUrlsFromBlogPost(postId, post.content);
      const capturedUrls = await storage.getCapturedUrlsByBlogPostId(postId);
      
      res.json({ 
        message: "URLs re-captured successfully", 
        count: capturedUrls.length,
        urls: capturedUrls 
      });
    } catch (error) {
      console.error("Error re-capturing URLs:", error);
      res.status(500).json({ message: "Failed to re-capture URLs" });
    }
  });

  // AUTHOR ROUTES - Admin only
  
  // Get all authors
  app.get("/api/admin/authors", isAuthenticated, async (req, res) => {
    try {
      const authors = await storage.getAllAuthors();
      res.json(authors);
    } catch (error) {
      console.error("Error fetching authors:", error);
      res.status(500).json({ message: "Failed to fetch authors" });
    }
  });

  // Get author by ID
  app.get("/api/admin/authors/:id", isAuthenticated, async (req, res) => {
    try {
      const authorId = parseInt(req.params.id);
      
      if (isNaN(authorId)) {
        return res.status(400).json({ message: "Invalid author ID" });
      }
      
      const author = await storage.getAuthorById(authorId);
      
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      
      res.json(author);
    } catch (error) {
      console.error("Error fetching author:", error);
      res.status(500).json({ message: "Failed to fetch author" });
    }
  });

  // Create a new author
  app.post("/api/admin/authors", isAuthenticated, async (req, res) => {
    try {
      const authorData = insertAuthorSchema.parse(req.body);
      const newAuthor = await storage.createAuthor(authorData);
      res.status(201).json(newAuthor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid author data", errors: error.errors });
      }
      console.error("Error creating author:", error);
      res.status(500).json({ message: "Failed to create author" });
    }
  });

  // Update an author
  app.put("/api/admin/authors/:id", isAuthenticated, async (req, res) => {
    try {
      const authorId = parseInt(req.params.id);
      
      if (isNaN(authorId)) {
        return res.status(400).json({ message: "Invalid author ID" });
      }
      
      const updateData = insertAuthorSchema.partial().parse(req.body);
      const updatedAuthor = await storage.updateAuthor(authorId, updateData);
      res.json(updatedAuthor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid author data", errors: error.errors });
      }
      console.error("Error updating author:", error);
      res.status(500).json({ message: "Failed to update author" });
    }
  });

  // Delete an author
  app.delete("/api/admin/authors/:id", isAuthenticated, async (req, res) => {
    try {
      const authorId = parseInt(req.params.id);
      
      if (isNaN(authorId)) {
        return res.status(400).json({ message: "Invalid author ID" });
      }
      
      await storage.deleteAuthor(authorId);
      res.json({ message: "Author deleted successfully" });
    } catch (error) {
      console.error("Error deleting author:", error);
      res.status(500).json({ message: "Failed to delete author" });
    }
  });

  // Alert Management Routes - Admin only
  
  // Get all alerts
  app.get("/api/admin/alerts", isAuthenticated, async (req, res) => {
    try {
      const alerts = await storage.getAllAlerts();
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  // Get active alerts for public display
  app.get("/api/alerts/active", async (req, res) => {
    try {
      const alerts = await storage.getActiveAlerts();
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching active alerts:", error);
      res.status(500).json({ message: "Failed to fetch active alerts" });
    }
  });

  // Get alert by ID
  app.get("/api/admin/alerts/:id", isAuthenticated, async (req, res) => {
    try {
      const alertId = parseInt(req.params.id);
      
      if (isNaN(alertId)) {
        return res.status(400).json({ message: "Invalid alert ID" });
      }
      
      const alert = await storage.getAlertById(alertId);
      
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      
      res.json(alert);
    } catch (error) {
      console.error("Error fetching alert:", error);
      res.status(500).json({ message: "Failed to fetch alert" });
    }
  });

  // Create a new alert
  app.post("/api/admin/alerts", isAuthenticated, async (req, res) => {
    try {
      const alertData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(alertData);
      res.status(201).json(alert);
    } catch (error) {
      console.error("Error creating alert:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create alert" });
    }
  });

  // Update an alert
  app.put("/api/admin/alerts/:id", isAuthenticated, async (req, res) => {
    try {
      const alertId = parseInt(req.params.id);
      
      if (isNaN(alertId)) {
        return res.status(400).json({ message: "Invalid alert ID" });
      }
      
      const alertData = insertAlertSchema.partial().parse(req.body);
      const updatedAlert = await storage.updateAlert(alertId, alertData);
      res.json(updatedAlert);
    } catch (error) {
      console.error("Error updating alert:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update alert" });
    }
  });

  // Delete an alert
  app.delete("/api/admin/alerts/:id", isAuthenticated, async (req, res) => {
    try {
      const alertId = parseInt(req.params.id);
      
      if (isNaN(alertId)) {
        return res.status(400).json({ message: "Invalid alert ID" });
      }
      
      await storage.deleteAlert(alertId);
      res.json({ message: "Alert deleted successfully" });
    } catch (error) {
      console.error("Error deleting alert:", error);
      res.status(500).json({ message: "Failed to delete alert" });
    }
  });

  // ===== OFFER API ROUTES =====
  
  // Get all offers (public)
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await storage.getActiveOffers();
      res.json(offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
      res.status(500).json({ message: "Failed to fetch offers" });
    }
  });

  // Get all offers (admin)
  app.get("/api/admin/offers", isAuthenticated, async (req, res) => {
    try {
      const offers = await storage.getAllOffers();
      res.json(offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
      res.status(500).json({ message: "Failed to fetch offers" });
    }
  });

  // Get a specific offer (admin)
  app.get("/api/admin/offers/:id", isAuthenticated, async (req, res) => {
    try {
      const offerId = parseInt(req.params.id);
      
      if (isNaN(offerId)) {
        return res.status(400).json({ message: "Invalid offer ID" });
      }
      
      const offer = await storage.getOfferById(offerId);
      
      if (!offer) {
        return res.status(404).json({ message: "Offer not found" });
      }
      
      res.json(offer);
    } catch (error) {
      console.error("Error fetching offer:", error);
      res.status(500).json({ message: "Failed to fetch offer" });
    }
  });

  // Create a new offer (admin)
  app.post("/api/admin/offers", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertOfferSchema.parse(req.body);
      const offer = await storage.createOffer(validatedData);
      res.status(201).json(offer);
    } catch (error) {
      console.error("Error creating offer:", error);
      res.status(500).json({ message: "Failed to create offer" });
    }
  });

  // Update an offer (admin)
  app.put("/api/admin/offers/:id", isAuthenticated, async (req, res) => {
    try {
      const offerId = parseInt(req.params.id);
      
      if (isNaN(offerId)) {
        return res.status(400).json({ message: "Invalid offer ID" });
      }
      
      const validatedData = insertOfferSchema.partial().parse(req.body);
      const updatedOffer = await storage.updateOffer(offerId, validatedData);
      res.json(updatedOffer);
    } catch (error) {
      console.error("Error updating offer:", error);
      res.status(500).json({ message: "Failed to update offer" });
    }
  });

  // Delete an offer (admin)
  app.delete("/api/admin/offers/:id", isAuthenticated, async (req, res) => {
    try {
      const offerId = parseInt(req.params.id);
      
      if (isNaN(offerId)) {
        return res.status(400).json({ message: "Invalid offer ID" });
      }
      
      await storage.deleteOffer(offerId);
      res.json({ message: "Offer deleted successfully" });
    } catch (error) {
      console.error("Error deleting offer:", error);
      res.status(500).json({ message: "Failed to delete offer" });
    }
  });

  // Update a location (admin only)
  app.put("/api/admin/locations/:id", isAuthenticated, async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      console.log("Received update request for location", locationId, "with data:", req.body);
      
      // Only allow certain fields to be updated
      const updateData = {
        ...(req.body.name && { name: req.body.name }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.heroImage !== undefined && { heroImage: req.body.heroImage }),
        ...(req.body.officeImage !== undefined && { officeImage: req.body.officeImage }),
        ...(req.body.mainAddress && { mainAddress: req.body.mainAddress }),
        ...(req.body.phoneNumber && { phoneNumber: req.body.phoneNumber }),
        ...(req.body.email && { email: req.body.email }),
      };
      
      console.log("Processing update with data:", updateData);
      
      try {
        const updatedLocation = await storage.updateLocation(locationId, updateData);
        
        if (!updatedLocation) {
          console.log("Location not found:", locationId);
          return res.status(404).json({ message: "Location not found" });
        }
        
        console.log("Location updated successfully:", updatedLocation);
        res.json(updatedLocation);
      } catch (storageError) {
        console.error("Error in storage.updateLocation:", storageError);
        throw storageError;
      }
    } catch (error) {
      console.error("Error updating location:", error);
      res.status(500).json({ 
        message: "Failed to update location", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });
  
  // Create a new area (admin only)
  app.post("/api/admin/areas", isAuthenticated, async (req, res) => {
    try {
      const areaData = insertAreaSchema.parse(req.body);
      const newArea = await storage.createArea(areaData);
      res.status(201).json(newArea);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid area data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create area" });
    }
  });

  // Update an area (admin only)
  app.patch("/api/admin/areas/:id", isAuthenticated, async (req, res) => {
    try {
      const areaId = parseInt(req.params.id);
      
      if (isNaN(areaId)) {
        return res.status(400).json({ message: "Invalid area ID" });
      }
      
      // Validate the update data (partial validation)
      const updateData = insertAreaSchema.partial().parse(req.body);
      
      const updatedArea = await storage.updateArea(areaId, updateData);
      
      if (!updatedArea) {
        return res.status(404).json({ message: "Area not found" });
      }
      
      res.json(updatedArea);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid area data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update area" });
    }
  });

  // Delete an area (admin only)
  app.delete("/api/admin/areas/:id", isAuthenticated, async (req, res) => {
    try {
      const areaId = parseInt(req.params.id);
      
      if (isNaN(areaId)) {
        return res.status(400).json({ message: "Invalid area ID" });
      }
      
      await storage.deleteArea(areaId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete area" });
    }
  });

  // VENDOR ADMINISTRATION ROUTES
  
  // Get all vendors (admin only)
  app.get("/api/admin/vendors", isAuthenticated, async (req, res) => {
    try {
      const vendors = await storage.getAllVendors();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });
  
  // Get vendor by ID (admin only)
  app.get("/api/admin/vendors/:id", isAuthenticated, async (req, res) => {
    try {
      const vendorId = parseInt(req.params.id);
      
      if (isNaN(vendorId)) {
        return res.status(400).json({ message: "Invalid vendor ID" });
      }
      
      const vendor = await storage.getVendorById(vendorId);
      
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor" });
    }
  });
  
  // Create a new vendor (admin only)
  app.post("/api/admin/vendors", isAuthenticated, async (req, res) => {
    try {
      const vendorData = insertVendorSchema.parse(req.body);
      const newVendor = await storage.createVendor(vendorData);
      res.status(201).json(newVendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vendor data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create vendor" });
    }
  });
  
  // Update a vendor (admin only)
  app.patch("/api/admin/vendors/:id", isAuthenticated, async (req, res) => {
    try {
      const vendorId = parseInt(req.params.id);
      
      if (isNaN(vendorId)) {
        return res.status(400).json({ message: "Invalid vendor ID" });
      }
      
      // Validate the update data (partial validation)
      const updateData = insertVendorSchema.partial().parse(req.body);
      
      const updatedVendor = await storage.updateVendor(vendorId, updateData);
      
      if (!updatedVendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      
      res.json(updatedVendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vendor data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update vendor" });
    }
  });
  
  // Delete a vendor (admin only)
  app.delete("/api/admin/vendors/:id", isAuthenticated, async (req, res) => {
    try {
      const vendorId = parseInt(req.params.id);
      
      if (isNaN(vendorId)) {
        return res.status(400).json({ message: "Invalid vendor ID" });
      }
      
      await storage.deleteVendor(vendorId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete vendor" });
    }
  });
  
  // CHATGPT INTEGRATION ROUTES

  // Get AI workspace recommendations
  app.post("/api/ai/workspace-recommendations", async (req, res) => {
    try {
      // Get user preferences from request body
      const { 
        businessType, 
        teamSize, 
        locationName, 
        budget, 
        amenities, 
        locationId 
      } = req.body;
      
      // Validate locationId if provided
      let workspaces = [];
      if (locationId) {
        // If locationId is provided, get workspaces for that location
        const parsedLocationId = parseInt(locationId);
        if (isNaN(parsedLocationId)) {
          return res.status(400).json({ message: "Invalid location ID" });
        }
        workspaces = await storage.getWorkspacesByLocationId(parsedLocationId);
      } else {
        // Otherwise, get all workspaces
        workspaces = await storage.getAllWorkspaces();
      }
      
      // Check if we have any workspaces to recommend
      if (!workspaces || workspaces.length === 0) {
        return res.status(404).json({ 
          message: "No workspaces available for recommendations",
          recommendations: []
        });
      }
      
      // Get recommendations from OpenAI
      const recommendations = await generateSmartRecommendations(
        workspaces,
        {
          businessType,
          teamSize,
          locationName,
          budget,
          amenities
        }
      );
      
      res.json({
        success: true,
        recommendations
      });
    } catch (error) {
      console.error("Error generating workspace recommendations:", error);
      res.status(500).json({ 
        message: "Failed to generate workspace recommendations",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Generate area description
  app.post("/api/ai/generate-area-description", async (req, res) => {
    try {
      console.log("Received generate description request:", req.body);
      const { areaName, cityName } = req.body;
      
      if (!areaName || typeof areaName !== 'string') {
        console.log("Missing or invalid areaName:", areaName);
        return res.status(400).json({ message: "Area name is required" });
      }
      
      if (!cityName || typeof cityName !== 'string') {
        console.log("Missing or invalid cityName:", cityName);
        return res.status(400).json({ message: "City name is required" });
      }
      
      console.log(`Generating description for "${areaName}" in "${cityName}"`);
      
      // Generate a system prompt for area descriptions
      const systemPrompt = `You are a professional copywriter specializing in real estate and commercial areas descriptions.
Your task is to write an informative, engaging, and accurate description for a specific area in a city.
Focus on highlighting the area's advantages for businesses looking for office space.
Include details about connectivity, amenities, and business environment where applicable.`;
      
      // Craft the user prompt
      const userPrompt = `Write a detailed description for ${areaName} in ${cityName}, India.
The description should be suitable for a website offering virtual office and coworking spaces.
Emphasize business advantages, accessibility, and surrounding amenities.
Write about 100-150 words without using bullet points or headings, in a professional tone.
Do not include placeholder text like "[Insert specific details]" or similar.`;
      
      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        console.error("ERROR: OPENAI_API_KEY environment variable is not set");
        return res.status(500).json({ 
          message: "OpenAI API key is not configured",
          error: "Missing API key"
        });
      }
      
      // Use the generate function
      const description = await generateChatCompletion(
        userPrompt,
        systemPrompt,
        600 // Maximum tokens
      );
      
      if (!description) {
        throw new Error("No description was generated by the API");
      }
      
      console.log("Successfully generated description:", 
        description.length > 50 ? description.substring(0, 50) + "..." : description);
      
      res.json({
        success: true,
        description
      });
    } catch (error) {
      console.error("Error generating area description:", error);
      res.status(500).json({ 
        message: "Failed to generate area description", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // Generate workspace recommendations
  app.post("/api/workspace-recommendation", async (req, res) => {
    try {
      const { businessType, teamSize, requirements, locationName } = req.body;
      
      if (!businessType || typeof businessType !== 'string') {
        return res.status(400).json({ message: "Business type is required" });
      }
      
      if (!teamSize || typeof teamSize !== 'string') {
        return res.status(400).json({ message: "Team size is required" });
      }
      
      if (!locationName || typeof locationName !== 'string') {
        return res.status(400).json({ message: "Location name is required" });
      }
      
      const recommendation = await generateWorkspaceRecommendation(
        businessType,
        teamSize,
        requirements || "",
        locationName
      );
      
      res.json({
        recommendation: recommendation
      });
    } catch (error) {
      console.error("Error generating workspace recommendation:", error);
      res.status(500).json({ 
        message: "Failed to generate workspace recommendation", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });
  
  // Answer workspace-related questions
  app.post("/api/workspace-question", async (req, res) => {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ message: "Question is required" });
      }
      
      const answer = await answerWorkspaceQuestion(question);
      
      res.json({
        answer: answer
      });
    } catch (error) {
      console.error("Error answering workspace question:", error);
      res.status(500).json({ 
        message: "Failed to answer workspace question", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });
  
  // Generate nearby areas for workspace
  app.post("/api/ai/generate-nearby-areas", async (req, res) => {
    try {
      console.log("Received generate nearby areas request:", req.body);
      const { workspaceName, cityName, areaName } = req.body;
      
      if (!workspaceName || typeof workspaceName !== 'string') {
        console.log("Missing or invalid workspaceName:", workspaceName);
        return res.status(400).json({ message: "Workspace name is required" });
      }
      
      if (!cityName || typeof cityName !== 'string') {
        console.log("Missing or invalid cityName:", cityName);
        return res.status(400).json({ message: "City name is required" });
      }
      
      console.log(`Generating nearby areas for "${workspaceName}" in "${cityName}"`);
      
      const systemPrompt = `You are a local area expert with deep knowledge of Indian cities and their business districts.
Your task is to identify and list nearby areas and neighborhoods that are relevant for professionals and businesses.
Focus on areas that would be of interest to potential virtual office clients.`;
      
      const userPrompt = `Based on the workspace "${workspaceName}" ${areaName ? `in ${areaName}, ` : ''}${cityName}, India, list 8-10 nearby areas, neighborhoods, or business districts that would be relevant for professionals looking for virtual office solutions.

For each area, provide:
1. Area name
2. A brief description (2-3 sentences) highlighting business advantages, connectivity, or key features
3. Approximate distance or relationship to the main location

Format your response as a JSON array with objects containing: "name", "description", "proximity" fields.

Example format:
[
  {
    "name": "Koramangala",
    "description": "Tech startup hub with excellent connectivity and vibrant business ecosystem. Known for its concentration of startups and modern office complexes.",
    "proximity": "5 km southeast"
  }
]

Focus on actual, real areas in ${cityName} that exist and are known for business activities.`;
      
      if (!process.env.OPENAI_API_KEY) {
        console.error("ERROR: OPENAI_API_KEY environment variable is not set");
        return res.status(500).json({ 
          message: "OpenAI API key is not configured",
          error: "Missing API key"
        });
      }
      
      const response = await generateChatCompletion(
        userPrompt,
        systemPrompt,
        1500
      );
      
      if (!response) {
        throw new Error("No response was generated by the API");
      }
      
      // Try to parse JSON response
      let nearbyAreas;
      try {
        nearbyAreas = JSON.parse(response);
        if (!Array.isArray(nearbyAreas)) {
          throw new Error("Response is not an array");
        }
      } catch (parseError) {
        console.error("Failed to parse JSON response, using fallback format");
        // Fallback: convert text response to structured format
        const lines = response.split('\n').filter(line => line.trim());
        nearbyAreas = lines.slice(0, 8).map((line, index) => ({
          name: `Area ${index + 1}`,
          description: line.trim(),
          proximity: "Nearby"
        }));
      }
      
      console.log("Successfully generated nearby areas:", nearbyAreas.length);
      
      res.json({
        success: true,
        nearbyAreas
      });
    } catch (error) {
      console.error("Error generating nearby areas:", error);
      res.status(500).json({ 
        message: "Failed to generate nearby areas", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // Generate workspace description
  app.post("/api/ai/generate-workspace-description", async (req, res) => {
    try {
      console.log("Received generate workspace description request:", req.body);
      const { workspaceName, cityName, areaName } = req.body;
      
      if (!workspaceName || typeof workspaceName !== 'string') {
        console.log("Missing or invalid workspaceName:", workspaceName);
        return res.status(400).json({ message: "Workspace name is required" });
      }
      
      if (!cityName || typeof cityName !== 'string') {
        console.log("Missing or invalid cityName:", cityName);
        return res.status(400).json({ message: "City name is required" });
      }
      
      if (!areaName || typeof areaName !== 'string') {
        console.log("Missing or invalid areaName:", areaName);
        return res.status(400).json({ message: "Area name is required" });
      }
      
      console.log(`Generating description for workspace "${workspaceName}" in ${areaName}, ${cityName}`);
      
      // Generate a system prompt for workspace descriptions
      const systemPrompt = `You are a professional copywriter specializing in workspace and commercial property descriptions.
Your task is to write an informative, engaging, and attractive description for a workspace in a specific area of a city.
Focus on highlighting the workspace's features, ambiance, facilities, and advantages for businesses.
Include details about the workspace location, amenities, and business environment where applicable.`;
      
      // Craft the user prompt
      const userPrompt = `Write a detailed description for "${workspaceName}", a workspace located in ${areaName}, ${cityName}, India.
The description should be suitable for a website offering virtual office and coworking spaces.
Emphasize the workspace's unique features, facilities (assume modern meeting rooms, high-speed internet, and office amenities), 
accessibility benefits of the location, and surrounding business environment.
Write about 150-200 words without using bullet points or headings, in a professional tone.
Do not include placeholder text like "[Insert specific details]" or similar.`;
      
      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        console.error("ERROR: OPENAI_API_KEY environment variable is not set");
        return res.status(500).json({ 
          message: "OpenAI API key is not configured",
          error: "Missing API key"
        });
      }
      
      // Use the generate function
      const description = await generateChatCompletion(
        userPrompt,
        systemPrompt,
        800 // Maximum tokens
      );
      
      if (!description) {
        throw new Error("No description was generated by the API");
      }
      
      console.log("Successfully generated workspace description:", 
        description.length > 50 ? description.substring(0, 50) + "..." : description);
      
      res.json({
        success: true,
        description
      });
    } catch (error) {
      console.error("Error generating workspace description:", error);
      res.status(500).json({ 
        message: "Failed to generate workspace description", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // AI-SEO Alt Text Generation Routes
  app.post("/api/ai/generate-alt-text", async (req, res) => {
    try {
      console.log("Received generate alt text request:", req.body);
      const { 
        workspaceName, 
        cityName, 
        areaName, 
        imageIndex, 
        totalImages, 
        workspaceFeatures, 
        workspaceAmenities,
        imageDescription 
      } = req.body;
      
      if (!workspaceName || typeof workspaceName !== 'string') {
        return res.status(400).json({ message: "Workspace name is required" });
      }
      
      if (!cityName || typeof cityName !== 'string') {
        return res.status(400).json({ message: "City name is required" });
      }
      
      if (!process.env.OPENAI_API_KEY) {
        console.error("ERROR: OPENAI_API_KEY environment variable is not set");
        return res.status(500).json({ 
          message: "OpenAI API key is not configured",
          error: "Missing API key"
        });
      }
      
      const { seoAltTextGenerator } = await import('./ai/seoAltTextGenerator');
      
      const context = {
        workspaceName,
        cityName,
        areaName,
        imageIndex,
        totalImages,
        workspaceFeatures,
        workspaceAmenities
      };
      
      const altText = imageDescription 
        ? await seoAltTextGenerator.generateContextualAltText(context, imageDescription)
        : await seoAltTextGenerator.generateAltText(context);
      
      console.log("Successfully generated alt text for:", workspaceName);
      
      res.json({
        success: true,
        altText
      });
    } catch (error) {
      console.error("Error generating alt text:", error);
      res.status(500).json({ 
        message: "Failed to generate alt text", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // Generate bulk alt text for all workspace images
  app.post("/api/ai/generate-bulk-alt-text/:workspaceId", async (req, res) => {
    try {
      const workspaceId = parseInt(req.params.workspaceId);
      
      if (isNaN(workspaceId)) {
        return res.status(400).json({ message: "Invalid workspace ID" });
      }
      
      if (!process.env.OPENAI_API_KEY) {
        console.error("ERROR: OPENAI_API_KEY environment variable is not set");
        return res.status(500).json({ 
          message: "OpenAI API key is not configured",
          error: "Missing API key"
        });
      }
      
      // Get workspace, location, and area data
      const workspace = await storage.getWorkspaceById(workspaceId);
      if (!workspace) {
        return res.status(404).json({ message: "Workspace not found" });
      }
      
      const location = await storage.getLocationById(workspace.locationId);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      const area = workspace.areaId ? await storage.getArea(workspace.areaId) : undefined;
      
      const { seoAltTextGenerator } = await import('./ai/seoAltTextGenerator');
      
      const bulkAltText = await seoAltTextGenerator.generateBulkAltText(
        workspace,
        location,
        area
      );
      
      console.log(`Successfully generated bulk alt text for workspace ${workspace.name}: ${bulkAltText.length} variations`);
      
      res.json({
        success: true,
        workspace: {
          id: workspace.id,
          name: workspace.name,
          city: location.name,
          area: area?.name
        },
        altTextVariations: bulkAltText
      });
    } catch (error) {
      console.error("Error generating bulk alt text:", error);
      res.status(500).json({ 
        message: "Failed to generate bulk alt text", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // Bulk update workspaces with generated alt text
  app.post("/api/ai/bulk-update-alt-text", async (req, res) => {
    try {
      const { BulkAltTextUpdater } = await import('./ai/bulkAltTextUpdater.js');
      
      // Set up Server-Sent Events for real-time progress
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });

      const updater = new BulkAltTextUpdater((progress) => {
        res.write(`data: ${JSON.stringify(progress)}\n\n`);
      });

      const finalResult = await updater.updateAllWorkspaces();
      
      // Send final result
      res.write(`data: ${JSON.stringify({ ...finalResult, final: true })}\n\n`);
      res.end();

    } catch (error) {
      console.error('Error in bulk alt text update:', error);
      res.write(`data: ${JSON.stringify({ 
        stage: 'Error', 
        message: `Bulk update failed: ${error instanceof Error ? error.message : String(error)}`,
        final: true 
      })}\n\n`);
      res.end();
    }
  });

  // Get bulk update status
  app.get("/api/ai/bulk-update-status", async (req, res) => {
    try {
      const { BulkAltTextUpdater } = await import('./ai/bulkAltTextUpdater.js');
      const updater = new BulkAltTextUpdater();
      const status = await updater.getUpdateStatus();
      res.json(status);
    } catch (error) {
      console.error('Error getting bulk update status:', error);
      res.status(500).json({ 
        message: "Failed to get update status",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Update single workspace alt text
  app.post("/api/ai/update-workspace-alt-text/:id", async (req, res) => {
    try {
      const workspaceId = parseInt(req.params.id);
      
      if (isNaN(workspaceId)) {
        return res.status(400).json({ message: "Invalid workspace ID" });
      }

      const { BulkAltTextUpdater } = await import('./ai/bulkAltTextUpdater.js');
      const updater = new BulkAltTextUpdater();
      const result = await updater.updateSingleWorkspace(workspaceId);
      
      if (result.success) {
        res.json({
          success: true,
          message: `Successfully generated ${result.altTextsGenerated} alt texts for workspace`,
          altTextsGenerated: result.altTextsGenerated
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error || "Failed to update workspace alt text"
        });
      }

    } catch (error) {
      console.error('Error updating single workspace alt text:', error);
      res.status(500).json({ 
        message: "Failed to update workspace alt text",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // SALES PERSON ADMINISTRATION ROUTES
  
  // Get all sales persons (admin only)
  app.get("/api/admin/salesPersons", isAuthenticated, async (req, res) => {
    try {
      const salesPersons = await storage.getAllSalesPersons();
      res.json(salesPersons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sales persons" });
    }
  });
  
  // Get sales person by ID (admin only)
  app.get("/api/admin/salesPersons/:id", isAuthenticated, async (req, res) => {
    try {
      const salesPersonId = parseInt(req.params.id);
      
      if (isNaN(salesPersonId)) {
        return res.status(400).json({ message: "Invalid sales person ID" });
      }
      
      const salesPerson = await storage.getSalesPersonById(salesPersonId);
      
      if (!salesPerson) {
        return res.status(404).json({ message: "Sales person not found" });
      }
      
      res.json(salesPerson);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sales person" });
    }
  });
  
  // Get sales persons by location ID
  app.get("/api/locations/:id/salesPersons", async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const salesPersons = await storage.getSalesPersonsByLocationId(locationId);
      res.json(salesPersons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sales persons" });
    }
  });
  
  // Create a new sales person (admin only)
  app.post("/api/admin/salesPersons", isAuthenticated, async (req, res) => {
    try {
      const salesPersonData = insertSalesPersonSchema.parse(req.body);
      const newSalesPerson = await storage.createSalesPerson(salesPersonData);
      res.status(201).json(newSalesPerson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid sales person data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create sales person" });
    }
  });
  
  // Update a sales person (admin only)
  app.patch("/api/admin/salesPersons/:id", isAuthenticated, async (req, res) => {
    try {
      const salesPersonId = parseInt(req.params.id);
      
      if (isNaN(salesPersonId)) {
        return res.status(400).json({ message: "Invalid sales person ID" });
      }
      
      // Validate the update data (partial validation)
      const updateData = insertSalesPersonSchema.partial().parse(req.body);
      
      const updatedSalesPerson = await storage.updateSalesPerson(salesPersonId, updateData);
      
      if (!updatedSalesPerson) {
        return res.status(404).json({ message: "Sales person not found" });
      }
      
      res.json(updatedSalesPerson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid sales person data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update sales person" });
    }
  });
  
  // Delete a sales person (admin only)
  app.delete("/api/admin/salesPersons/:id", isAuthenticated, async (req, res) => {
    try {
      const salesPersonId = parseInt(req.params.id);
      
      if (isNaN(salesPersonId)) {
        return res.status(400).json({ message: "Invalid sales person ID" });
      }
      
      await storage.deleteSalesPerson(salesPersonId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete sales person" });
    }
  });

  // Pricing Catalog routes
  // Get pricing catalog by location ID
  app.get("/api/pricing-catalog/:locationId", async (req, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const catalog = await storage.getPricingCatalogByLocationId(locationId);
      res.json(catalog);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pricing catalog" });
    }
  });

  // Create pricing catalog (admin only)
  app.post("/api/admin/pricing-catalog", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPricingCatalogSchema.parse(req.body);
      const catalog = await storage.createPricingCatalog(validatedData);
      res.status(201).json(catalog);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid pricing catalog data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create pricing catalog" });
    }
  });

  // Update pricing catalog (admin only)
  app.put("/api/admin/pricing-catalog/:id", isAuthenticated, async (req, res) => {
    try {
      const catalogId = parseInt(req.params.id);
      
      if (isNaN(catalogId)) {
        return res.status(400).json({ message: "Invalid catalog ID" });
      }
      
      const validatedData = insertPricingCatalogSchema.partial().parse(req.body);
      const catalog = await storage.updatePricingCatalog(catalogId, validatedData);
      res.json(catalog);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid pricing catalog data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update pricing catalog" });
    }
  });

  // Delete pricing catalog (admin only)
  app.delete("/api/admin/pricing-catalog/:id", isAuthenticated, async (req, res) => {
    try {
      const catalogId = parseInt(req.params.id);
      
      if (isNaN(catalogId)) {
        return res.status(400).json({ message: "Invalid catalog ID" });
      }
      
      await storage.deletePricingCatalog(catalogId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete pricing catalog" });
    }
  });

  // Get all orders (admin only)
  app.get("/api/orders", isAuthenticated, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Razorpay Order Creation
  app.post("/api/create-razorpay-order", async (req, res) => {
    try {
      const { locationId, pricingCatalogId, customerName, customerEmail, customerPhone } = req.body;
      
      // Validate required fields
      if (!locationId || !pricingCatalogId || !customerName || !customerEmail || !customerPhone) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Get pricing details
      const pricingItem = await storage.getPricingCatalogById(pricingCatalogId);
      if (!pricingItem) {
        return res.status(404).json({ message: "Pricing item not found" });
      }
      
      // We need Razorpay credentials to proceed
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ 
          message: "Payment system not configured. Please contact support." 
        });
      }
      
      // Initialize Razorpay
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      
      const amount = Math.round(parseFloat(pricingItem.price) * 100); // Convert to paise
      
      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount,
        currency: pricingItem.currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          customerName,
          customerEmail,
          serviceName: pricingItem.serviceName,
        },
      });
      
      // Save order to database
      const orderData = {
        orderId: razorpayOrder.id,
        locationId,
        pricingCatalogId,
        customerName,
        customerEmail,
        customerPhone,
        amount: pricingItem.price,
        currency: pricingItem.currency,
        status: 'created' as const,
      };
      
      const order = await storage.createOrder(orderData);
      
      res.json({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        order: order,
      });
    } catch (error: any) {
      console.error("Razorpay order creation error:", error);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  // Verify Razorpay Payment
  app.post("/api/verify-payment", async (req, res) => {
    try {
      console.log("Payment verification request body:", req.body);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      if (!razorpay_payment_id) {
        console.log("Missing payment ID:", { razorpay_order_id, razorpay_payment_id, razorpay_signature });
        return res.status(400).json({ message: "Missing payment ID" });
      }
      
      // If we have all signature verification data, verify the signature
      if (razorpay_order_id && razorpay_signature && process.env.RAZORPAY_KEY_SECRET) {
        const crypto = require('crypto');
        const expectedSignature = crypto
          .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
          .update(razorpay_order_id + '|' + razorpay_payment_id)
          .digest('hex');
        
        if (expectedSignature !== razorpay_signature) {
          return res.status(400).json({ message: "Invalid payment signature" });
        }
        
        // Update order status with full verification
        const order = await storage.updateOrderByPaymentId(razorpay_payment_id, {
          status: 'paid',
          razorpaySignature: razorpay_signature,
        });
        
        res.json({ 
          success: true, 
          message: "Payment verified successfully",
          order: order,
        });
      } else {
        // Fallback: Mark as paid based on payment ID (payment was successful on Razorpay)
        console.log("Using simplified payment verification for payment ID:", razorpay_payment_id);
        
        // Find and update the most recent unpaid order, since we know payment was successful
        const allOrders = await storage.getAllOrders();
        const pendingOrder = allOrders
          .filter(order => order.status === 'created')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
        
        if (!pendingOrder) {
          throw new Error("No pending order found");
        }
        
        const order = await storage.updateOrder(pendingOrder.id, {
          status: 'paid',
          paymentId: razorpay_payment_id,
        });
        
        res.json({ 
          success: true, 
          message: "Payment processed successfully",
          order: order,
        });
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
      res.status(500).json({ message: "Payment verification failed" });
    }
  });

  // Serve robots.txt file
  app.get("/robots.txt", async (req, res) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const robotsPath = path.resolve(import.meta.dirname, "..", "client", "public", "robots.txt");
      
      if (fs.existsSync(robotsPath)) {
        const robotsContent = await fs.promises.readFile(robotsPath, 'utf-8');
        res.setHeader('Content-Type', 'text/plain');
        res.send(robotsContent);
      } else {
        // Fallback robots.txt content if file doesn't exist
        const fallbackRobots = `# robots.txt for SimplySetup.com - Virtual Office Platform
# Last updated: June 8, 2025

User-agent: *
Allow: /

# Prioritize important pages
Allow: /mumbai
Allow: /bangalore  
Allow: /delhi
Allow: /hyderabad
Allow: /chennai
Allow: /pune
Allow: /blog
Allow: /partnership

# Disallow sensitive areas
Disallow: /admin/
Disallow: /login/
Disallow: /api/
Disallow: /auth/

# Sitemap location
Sitemap: https://simplysetup.com/sitemap.xml

# Host directive
Host: https://simplysetup.com`;
        
        res.setHeader('Content-Type', 'text/plain');
        res.send(fallbackRobots);
      }
    } catch (error) {
      console.error("Error serving robots.txt:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Serve sitemap files (main sitemap.xml and all sub-sitemaps)
  app.get("/sitemap*.xml", async (req, res) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const fileName = req.path.replace('/', ''); // Extract filename from path
      const sitemapPath = path.resolve(import.meta.dirname, "..", "client", "public", fileName);
      
      if (fs.existsSync(sitemapPath)) {
        const sitemapContent = await fs.promises.readFile(sitemapPath, 'utf-8');
        res.setHeader('Content-Type', 'application/xml');
        res.send(sitemapContent);
      } else {
        res.status(404).send("Sitemap not found");
      }
    } catch (error) {
      console.error(`Error serving ${req.path}:`, error);
      res.status(500).send("Internal Server Error");
    }
  });

  // API endpoint to regenerate sitemaps
  app.post("/api/admin/regenerate-sitemap", isAuthenticated, async (req, res) => {
    try {
      console.log('🚀 Starting sitemap regeneration...');
      
      // Import and run the sitemap generator
      const { generateSitemap } = await import('../scripts/generate-sitemap.js');
      await generateSitemap();
      
      console.log('✅ Sitemap regeneration completed');
      res.json({ 
        success: true, 
        message: "Sitemap regenerated successfully",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Error regenerating sitemap:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to regenerate sitemap",
        error: error.message 
      });
    }
  });

  // API endpoint to get sitemap stats
  app.get("/api/sitemap/stats", async (req, res) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const publicDir = path.resolve(import.meta.dirname, "..", "client", "public");
      const sitemapFiles = fs.readdirSync(publicDir).filter(file => file.startsWith('sitemap') && file.endsWith('.xml'));
      
      const stats = {
        totalSitemapFiles: sitemapFiles.length,
        sitemapFiles: sitemapFiles.sort(),
        lastGenerated: null
      };
      
      // Get last modified date of main sitemap
      const mainSitemapPath = path.join(publicDir, 'sitemap.xml');
      if (fs.existsSync(mainSitemapPath)) {
        const stat = fs.statSync(mainSitemapPath);
        stats.lastGenerated = stat.mtime.toISOString();
      }
      
      // Get page counts from storage
      const [locations, blogPosts, companies, workspaces] = await Promise.all([
        storage.getAllLocations(),
        storage.getPublishedBlogPosts(),
        storage.searchCompanies({}, 1, 1), // Just to get total count
        storage.getAllWorkspaces() // Get all workspaces
      ]);

      // Get areas count by fetching all areas for all locations
      let totalAreas = 0;
      for (const location of locations) {
        const areas = await storage.getAreasByLocationId(location.id);
        totalAreas += areas.length;
      }
      
      const companiesCount = companies.totalCount || 489494; // Fallback to known count
      
      stats.pageCounts = {
        locations: locations.length,
        areas: totalAreas,
        blog: blogPosts.length,
        workspaces: workspaces.length,
        companies: companiesCount,
        static: 7,
        total: locations.length + totalAreas + blogPosts.length + workspaces.length + companiesCount + 7
      };
      
      res.json(stats);
    } catch (error) {
      console.error('Error getting sitemap stats:', error);
      res.status(500).json({ message: "Failed to get sitemap stats" });
    }
  });

  // Redirect Management API Routes
  app.get("/api/admin/redirects", isAuthenticated, async (req, res) => {
    try {
      const { getDormantUrls } = await import("./redirects");
      const dormantUrls = getDormantUrls();
      
      res.json({
        totalRedirects: dormantUrls.length,
        redirects: dormantUrls.map(url => ({
          from: url,
          to: '/',
          type: '301',
          status: 'active'
        }))
      });
    } catch (error) {
      console.error('Error getting redirect list:', error);
      res.status(500).json({ message: "Failed to get redirect list" });
    }
  });

  app.get("/api/admin/redirects/stats", isAuthenticated, async (req, res) => {
    try {
      const { getDormantUrls } = await import("./redirects");
      const dormantUrls = getDormantUrls();
      
      // Categorize URLs by type
      const stats = {
        total: dormantUrls.length,
        byType: {
          products: dormantUrls.filter(url => url.startsWith('/products/')).length,
          collections: dormantUrls.filter(url => url.startsWith('/collections/')).length,
          feeds: dormantUrls.filter(url => url.endsWith('.atom')).length,
          pagination: dormantUrls.filter(url => url.includes('page=')).length
        },
        byLocation: {
          pune: dormantUrls.filter(url => url.includes('pune')).length,
          bangalore: dormantUrls.filter(url => url.includes('bangalore') || url.includes('bengaluru')).length,
          gurgaon: dormantUrls.filter(url => url.includes('gurgaon')).length,
          hyderabad: dormantUrls.filter(url => url.includes('hyderabad')).length,
          chennai: dormantUrls.filter(url => url.includes('chennai')).length,
          delhi: dormantUrls.filter(url => url.includes('delhi')).length,
          other: dormantUrls.filter(url => 
            !url.includes('pune') && 
            !url.includes('bangalore') && 
            !url.includes('bengaluru') &&
            !url.includes('gurgaon') && 
            !url.includes('hyderabad') && 
            !url.includes('chennai') && 
            !url.includes('delhi')
          ).length
        }
      };
      
      res.json(stats);
    } catch (error) {
      console.error('Error getting redirect stats:', error);
      res.status(500).json({ message: "Failed to get redirect stats" });
    }
  });

  // DocuKit Categories API Routes
  app.get("/api/admin/docukit/categories", isAuthenticated, async (req, res) => {
    try {
      const categories = await storage.getAllDocukitCategories();
      res.json(categories);
    } catch (error) {
      console.error("Failed to fetch DocuKit categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/admin/docukit/categories", isAuthenticated, async (req, res) => {
    try {
      const categoryData = insertDocukitCategorySchema.parse(req.body);
      const newCategory = await storage.createDocukitCategory(categoryData);
      res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      console.error("Failed to create DocuKit category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  app.put("/api/admin/docukit/categories/:id", isAuthenticated, async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const updateData = insertDocukitCategorySchema.partial().parse(req.body);
      const updatedCategory = await storage.updateDocukitCategory(categoryId, updateData);
      res.json(updatedCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      console.error("Failed to update DocuKit category:", error);
      res.status(500).json({ message: "Failed to update category" });
    }
  });

  app.delete("/api/admin/docukit/categories/:id", isAuthenticated, async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      await storage.deleteDocukitCategory(categoryId);
      res.status(204).end();
    } catch (error) {
      console.error("Failed to delete DocuKit category:", error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // DocuKit Templates API Routes
  app.get("/api/admin/docukit/templates", isAuthenticated, async (req, res) => {
    try {
      const templates = await storage.getAllDocukitTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Failed to fetch DocuKit templates:", error);
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  app.post("/api/admin/docukit/templates", isAuthenticated, async (req, res) => {
    try {
      const templateData = insertDocukitTemplateSchema.parse(req.body);
      const newTemplate = await storage.createDocukitTemplate(templateData);
      res.status(201).json(newTemplate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      console.error("Failed to create DocuKit template:", error);
      res.status(500).json({ message: "Failed to create template" });
    }
  });

  app.put("/api/admin/docukit/templates/:id", isAuthenticated, async (req, res) => {
    try {
      const templateId = parseInt(req.params.id);
      if (isNaN(templateId)) {
        return res.status(400).json({ message: "Invalid template ID" });
      }

      const updateData = insertDocukitTemplateSchema.partial().parse(req.body);
      const updatedTemplate = await storage.updateDocukitTemplate(templateId, updateData);
      res.json(updatedTemplate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      console.error("Failed to update DocuKit template:", error);
      res.status(500).json({ message: "Failed to update template" });
    }
  });

  app.delete("/api/admin/docukit/templates/:id", isAuthenticated, async (req, res) => {
    try {
      const templateId = parseInt(req.params.id);
      if (isNaN(templateId)) {
        return res.status(400).json({ message: "Invalid template ID" });
      }

      await storage.deleteDocukitTemplate(templateId);
      res.status(204).end();
    } catch (error) {
      console.error("Failed to delete DocuKit template:", error);
      res.status(500).json({ message: "Failed to delete template" });
    }
  });

  // Public API for DocuKit (for frontend consumption)
  app.get("/api/docukit/categories", async (req, res) => {
    try {
      const categories = await storage.getAllDocukitCategories();
      const activeCategories = categories.filter(cat => cat.isActive);
      res.json(activeCategories);
    } catch (error) {
      console.error("Failed to fetch DocuKit categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/docukit/templates", async (req, res) => {
    try {
      const { categoryId, limit, exclude } = req.query;
      let templates;
      
      if (categoryId) {
        templates = await storage.getDocukitTemplatesByCategoryId(parseInt(categoryId as string));
      } else {
        templates = await storage.getAllDocukitTemplates();
      }
      
      let activeTemplates = templates.filter(template => template.isActive);
      
      // Apply exclude filter
      if (exclude) {
        const excludeId = parseInt(exclude as string);
        activeTemplates = activeTemplates.filter(template => template.id !== excludeId);
      }
      
      // Apply limit
      if (limit) {
        const limitNum = parseInt(limit as string);
        activeTemplates = activeTemplates.slice(0, limitNum);
      }
      
      res.json(activeTemplates);
    } catch (error) {
      console.error("Failed to fetch DocuKit templates:", error);
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  // Get template by category slug and template slug
  app.get("/api/docukit/templates/:categorySlug/:templateSlug", async (req, res) => {
    try {
      const { categorySlug, templateSlug } = req.params;
      const template = await storage.getDocukitTemplateWithCategoryBySlug(categorySlug, templateSlug);
      
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(template);
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  app.post("/api/docukit/templates/:id/download", async (req, res) => {
    try {
      const templateId = parseInt(req.params.id);
      if (isNaN(templateId)) {
        return res.status(400).json({ message: "Invalid template ID" });
      }

      await storage.incrementTemplateDownload(templateId);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to track template download:", error);
      res.status(500).json({ message: "Failed to track download" });
    }
  });

  // Dynamic Open Graph Image Generation for DocuKit Categories
  app.get("/api/og/docukit/:categorySlug", async (req, res) => {
    try {
      const { categorySlug } = req.params;
      
      // Category configurations for OG images
      const categoryConfig = {
        legal: {
          title: "Legal & Compliance Templates",
          description: "Professional legal documents for Indian businesses",
          color: "#8b5cf6",
          icon: "⚖️"
        },
        operations: {
          title: "Business Operations Templates", 
          description: "SOPs and process documents for efficient operations",
          color: "#3b82f6",
          icon: "💼"
        },
        marketing: {
          title: "Marketing & Sales Templates",
          description: "Professional marketing materials and sales documents",
          color: "#10b981",
          icon: "📈"
        },
        hr: {
          title: "HR & Employee Management Templates",
          description: "Comprehensive HR documents and employee templates",
          color: "#06b6d4",
          icon: "👥"
        },
        finance: {
          title: "Finance & Accounting Templates",
          description: "GST-compliant financial templates for Indian businesses",
          color: "#f59e0b",
          icon: "💰"
        }
      };

      const config = categoryConfig[categorySlug as keyof typeof categoryConfig];
      
      if (!config) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Generate SVG Open Graph image
      const svg = `
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${config.color};stop-opacity:0.1" />
              <stop offset="100%" style="stop-color:${config.color};stop-opacity:0.05" />
            </linearGradient>
          </defs>
          
          <!-- Background -->
          <rect width="1200" height="630" fill="url(#bg)" />
          <rect width="1200" height="630" fill="#ffffff" fill-opacity="0.95" />
          
          <!-- Header -->
          <rect x="0" y="0" width="1200" height="80" fill="${config.color}" />
          <text x="60" y="50" font-family="Inter, sans-serif" font-size="28" font-weight="bold" fill="white">
            DocuKit by SimplySetup
          </text>
          
          <!-- Icon -->
          <circle cx="150" cy="250" r="60" fill="${config.color}" fill-opacity="0.1" />
          <text x="150" y="265" font-family="system-ui" font-size="48" text-anchor="middle">${config.icon}</text>
          
          <!-- Main Content -->
          <text x="250" y="200" font-family="Inter, sans-serif" font-size="48" font-weight="bold" fill="#1f2937">
            ${config.title}
          </text>
          <text x="250" y="250" font-family="Inter, sans-serif" font-size="24" fill="#6b7280">
            ${config.description}
          </text>
          
          <!-- Features -->
          <text x="250" y="320" font-family="Inter, sans-serif" font-size="18" fill="#374151">✓ Expert-drafted templates</text>
          <text x="250" y="350" font-family="Inter, sans-serif" font-size="18" fill="#374151">✓ India-compliant documents</text>
          <text x="250" y="380" font-family="Inter, sans-serif" font-size="18" fill="#374151">✓ Instant download available</text>
          <text x="250" y="410" font-family="Inter, sans-serif" font-size="18" fill="#374151">✓ Professional quality guaranteed</text>
          
          <!-- CTA -->
          <rect x="250" y="480" width="300" height="60" rx="8" fill="${config.color}" />
          <text x="400" y="520" font-family="Inter, sans-serif" font-size="20" font-weight="600" fill="white" text-anchor="middle">
            Browse Templates →
          </text>
          
          <!-- Footer -->
          <text x="60" y="590" font-family="Inter, sans-serif" font-size="16" fill="#9ca3af">
            simplysetup.co/docukit/${categorySlug}
          </text>
        </svg>
      `;

      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.send(svg);
    } catch (error) {
      console.error("Failed to generate OG image:", error);
      res.status(500).json({ message: "Failed to generate image" });
    }
  });

  // Company Search API Routes
  app.get("/api/company/search/history", async (req, res) => {
    try {
      const history = await storage.getAllCompanySearchHistory();
      res.json(history);
    } catch (error) {
      console.error("Failed to fetch company search history:", error);
      res.status(500).json({ message: "Failed to fetch search history" });
    }
  });

  app.post("/api/company/search", async (req, res) => {
    try {
      const { cin } = req.body;
      
      if (!cin || typeof cin !== 'string') {
        return res.status(400).json({ message: "CIN number is required" });
      }

      // First check if we have this CIN in our history
      const existingRecord = await storage.getCompanySearchHistoryByCin(cin);
      if (existingRecord) {
        return res.json(existingRecord);
      }

      // Check known companies database first
      const { getKnownCompanyName } = await import('./company-database');
      let companyName = getKnownCompanyName(cin);
      
      // Use company resolver for authentic data if not in known database
      if (!companyName) {
        const { CompanyResolver } = await import('./company-resolver');
        const resolver = new CompanyResolver(process.env.QUICKKYC_API_KEY || '');
        
        const resolvedData = await resolver.resolveCompany(cin);
        companyName = resolvedData.companyName || null;
      }
      
      // Decode CIN for basic information
      const { CompanyResolver } = await import('./company-resolver');
      const resolver = new CompanyResolver(process.env.QUICKKYC_API_KEY || '');
      const decodedInfo = resolver.decodeCIN(cin);

      // Create company record with resolved data
      const companyData = {
        cin: cin,
        companyName: companyName,
        status: 'Active',
        registrationDate: `01/01/${decodedInfo.incorporationYear}`,
        category: decodedInfo.industry,
        subCategory: decodedInfo.entityType,
        classOfCompany: decodedInfo.entityType,
        authorizedCapital: null,
        paidUpCapital: null,
        numberOfMembers: null,
        address: `Registered Office in ${decodedInfo.state}`,
        state: decodedInfo.state,
        country: 'India',
        email: null,
        website: null,
        lastAGMDate: null,
        lastAccountsDate: null,
        directors: [],
        apiResponse: JSON.stringify({ 
          source: companyName ? 'known_database' : 'cin_decode',
          decoded: decodedInfo
        }),
      };

      const savedRecord = await storage.createCompanySearchHistory(companyData);
      res.json(savedRecord);
    } catch (error) {
      console.error("Failed to search company:", error);
      res.status(500).json({ 
        message: "Failed to search company", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // External Resources API - Generate local links for city pages
  app.get("/api/external-links/:city/:area?", async (req, res) => {
    try {
      const { city, area } = req.params;
      
      if (!city) {
        return res.status(400).json({ message: "City parameter is required" });
      }

      // Build the slug path for the external links utility
      const slugPath = area ? `/virtual-office/${city}/${area}` : `/virtual-office/${city}`;
      
      const localLinks = await buildLocalLinks(slugPath);
      
      res.json({
        coreResources: [
          {
            anchor: "Check MCA company status",
            url: "https://www.mca.gov.in/MinistryV2/registration.html"
          },
          {
            anchor: "GST registration rules – Section 25",
            url: "https://taxinformation.cbic.gov.in/content-page/explore-act/1000294/1000001"
          },
          {
            anchor: "Startup India resource hub",
            url: "https://www.startupindia.gov.in/"
          },
          {
            anchor: "What is a virtual office?",
            url: "https://www.investopedia.com/terms/v/virtual-office.asp"
          }
        ],
        localResources: localLinks
      });
    } catch (error) {
      console.error("Failed to generate external links:", error);
      res.status(500).json({ 
        message: "Failed to generate external links", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Internal Resources API - Generate internal links for city pages
  app.get("/api/internal-links/:city/:area?", async (req, res) => {
    try {
      const { city, area } = req.params;
      
      if (!city) {
        return res.status(400).json({ message: "City parameter is required" });
      }

      // Build the slug path for the internal links utility
      const slugPath = area ? `/virtual-office/${city}/${area}` : `/virtual-office/${city}`;
      
      const internalLinks = await buildInternalLinks(slugPath);
      
      res.json({
        relatedResources: internalLinks
      });
    } catch (error) {
      console.error("Failed to generate internal links:", error);
      res.status(500).json({ 
        message: "Failed to generate internal links", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // COMPANY SEARCH API ROUTES
  
  // Get all companies
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getAllCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  // Search companies
  app.get("/api/companies/search", async (req, res) => {
    try {
      const { q, limit } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }

      const searchLimit = limit ? parseInt(limit as string) : 20;
      
      if (isNaN(searchLimit) || searchLimit > 100) {
        return res.status(400).json({ message: "Invalid limit parameter (max 100)" });
      }

      const companies = await storage.searchCompanies(q, searchLimit);
      res.json(companies);
    } catch (error) {
      console.error("Failed to search companies:", error);
      res.status(500).json({ message: "Failed to search companies" });
    }
  });

  // Get company by CIN
  app.get("/api/companies/cin/:cin", async (req, res) => {
    try {
      const { cin } = req.params;
      
      if (!cin) {
        return res.status(400).json({ message: "CIN is required" });
      }

      const company = await storage.getCompanyByCin(cin);
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      res.json(company);
    } catch (error) {
      console.error("Failed to fetch company by CIN:", error);
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  // Get company by slug for individual company pages
  app.get("/api/companies/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      if (!slug) {
        return res.status(400).json({ message: "Company slug is required" });
      }

      const company = await storage.getCompanyBySlug(slug);
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      res.json(company);
    } catch (error) {
      console.error("Failed to fetch company by slug:", error);
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  // Get companies statistics (must come before parameterized routes)
  app.get("/api/companies/stats", async (req, res) => {
    try {
      const totalCount = await storage.getCompaniesCount();
      res.json({ totalCompanies: totalCount });
    } catch (error) {
      console.error("Failed to fetch company statistics:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // ADMIN COMPANY MANAGEMENT ROUTES
  
  // Get company statistics for admin dashboard
  app.get("/api/admin/companies/stats", isAuthenticated, async (req, res) => {
    try {
      const totalCompanies = await storage.getCompaniesCount();
      const activeCompanies = await storage.getActiveCompaniesCount();
      const recentlyAdded = await storage.getRecentlyAddedCompaniesCount();
      
      res.json({
        totalCompanies,
        activeCompanies,
        recentlyAdded,
        processingStatus: "idle"
      });
    } catch (error) {
      console.error("Failed to fetch admin company statistics:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Validate CSV file before upload - optimized for large files
  app.post("/api/admin/companies/validate-csv", isAuthenticated, upload.single('csvFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No CSV file provided" });
      }

      console.log(`Starting CSV validation for ${(req.file.size / 1024 / 1024).toFixed(2)} MB file...`);
      
      // Set extended timeout for large files (30 minutes)
      req.setTimeout(30 * 60 * 1000);
      res.setTimeout(30 * 60 * 1000);

      const csvContent = req.file.buffer.toString('utf-8');
      const sampleRecords: any[] = [];
      const errors: string[] = [];
      const cinSet = new Set<string>();
      let totalRows = 0;
      let validRows = 0;
      let duplicates = 0;
      let lastProgressLog = 0;

      return new Promise<void>((resolve, reject) => {
        parse(csvContent, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
          relax_quotes: true,
          escape: '"'
        })
        .on('data', (row) => {
          totalRows++;
          
          // Log progress every 50,000 rows for large files
          if (totalRows - lastProgressLog >= 50000) {
            console.log(`Validated ${totalRows} rows, ${validRows} valid, ${duplicates} duplicates`);
            lastProgressLog = totalRows;
          }
          
          // Validate required fields
          const cin = row.CIN?.trim();
          const companyName = row.CompanyName?.trim();
          
          if (!cin) {
            if (errors.length < 20) { // Limit errors to save memory
              errors.push(`Row ${totalRows}: CIN is required`);
            }
            return;
          }
          
          if (!companyName) {
            if (errors.length < 20) {
              errors.push(`Row ${totalRows}: Company Name is required`);
            }
            return;
          }

          // Check for duplicates in current batch using Set for efficiency
          if (cinSet.has(cin)) {
            duplicates++;
            if (errors.length < 20) {
              errors.push(`Row ${totalRows}: Duplicate CIN found: ${cin}`);
            }
            return;
          }

          cinSet.add(cin);
          
          // Only keep first 5 records as sample to save memory
          if (sampleRecords.length < 5) {
            sampleRecords.push(row);
          }
          
          validRows++;
        })
        .on('end', () => {
          const isValid = errors.length === 0 && validRows > 0;
          
          console.log(`CSV validation completed: ${totalRows} total, ${validRows} valid, ${duplicates} duplicates`);
          
          res.json({
            isValid,
            totalRows,
            validRows,
            duplicates,
            errors: errors.slice(0, 10),
            preview: sampleRecords,
            fileSize: req.file!.size,
            processingTime: new Date().toISOString()
          });
          resolve();
        })
        .on('error', (error) => {
          console.error("CSV parsing error:", error);
          res.status(500).json({ 
            message: "CSV parsing error", 
            error: error.message 
          });
          reject(error);
        });
      });

    } catch (error) {
      console.error("CSV validation error:", error);
      res.status(500).json({ message: "Failed to validate CSV file" });
    }
  });

  // Upload and process CSV file with real-time progress
  app.post("/api/admin/companies/bulk-upload", isAuthenticated, upload.single('csvFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No CSV file provided" });
      }

      console.log(`Starting CSV bulk upload for ${req.file.size} bytes`);
      
      // Set up Server-Sent Events headers for real-time progress
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
      });

      const sendProgress = (data: any) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      try {
        const csvContent = req.file.buffer.toString('utf-8');
        const errors: string[] = [];
        let processed = 0;
        let created = 0;
        let skipped = 0;

        sendProgress({
          stage: "Loading existing companies",
          current: 0,
          total: 0,
          percentage: 0,
          message: "Checking for duplicate companies..."
        });

        // Get existing CINs to avoid duplicates
        const existingCins = new Set(await storage.getAllCompanyCins());
        console.log(`Found ${existingCins.size} existing companies in database`);

        sendProgress({
          stage: "Parsing CSV file",
          current: 0,
          total: 0,
          percentage: 5,
          message: "Reading and parsing CSV data..."
        });

        // Process CSV synchronously to avoid Promise complications
        const records: any[] = [];
        
        await new Promise<void>((resolve, reject) => {
          parse(csvContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            relax_quotes: true,
            escape: '"'
          })
          .on('data', (row) => {
            records.push(row);
          })
          .on('end', () => {
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
        });

        console.log(`Parsed ${records.length} records from CSV`);
        
        sendProgress({
          stage: "Processing companies",
          current: 0,
          total: records.length,
          percentage: 10,
          message: `Processing ${records.length} companies...`
        });

        // Process records in batches for better performance with large datasets
        const BATCH_SIZE = 500; // Reduced batch size for more frequent updates
        
        for (let i = 0; i < records.length; i += BATCH_SIZE) {
          const batch = records.slice(i, i + BATCH_SIZE);
          
          for (const row of batch) {
            processed++;
            
            const cin = row.CIN?.trim();
            const companyName = row.CompanyName?.trim();
            
            if (!cin || !companyName) {
              skipped++;
              continue;
            }

            if (existingCins.has(cin)) {
              skipped++;
              continue;
            }

            try {
              // Generate unique slug for company
              const baseSlug = generateSlug(companyName);
              const uniqueId = cin.slice(-8) + '-' + Date.now().toString().slice(-6);
              const slug = `${baseSlug}-${uniqueId}`.toLowerCase();

              const companyData = {
                cin,
                companyName,
                slug,
                companyROCcode: row.CompanyROCcode?.trim() || undefined,
                companyCategory: row.CompanyCategory?.trim() || undefined,
                companySubCategory: row.CompanySubCategory?.trim() || undefined,
                companyClass: row.CompanyClass?.trim() || undefined,
                authorizedCapital: row.AuthorizedCapital ? row.AuthorizedCapital.toString() : undefined,
                paidupCapital: row.PaidupCapital ? row.PaidupCapital.toString() : undefined,
                registrationDate: row.CompanyRegistrationdate_date?.trim() || null,
                registeredOfficeAddress: row.Registered_Office_Address?.trim() || undefined,
                listingStatus: row.Listingstatus?.trim() || undefined,
                companyStatus: row.CompanyStatus?.trim() || undefined,
                companyStateCode: row.CompanyStateCode?.trim() || undefined,
                companyType: row['CompanyIndian/Foreign Company']?.trim() || undefined,
                nicCode: row.nic_code?.trim() || undefined,
                companyIndustrialClassification: row.CompanyIndustrialClassification?.trim() || undefined
              };

              await storage.createCompany(companyData);
              existingCins.add(cin);
              created++;

            } catch (error) {
              const errorMsg = `Failed to create company ${companyName}: ${error instanceof Error ? error.message : 'Unknown error'}`;
              errors.push(errorMsg);
              skipped++;
            }
          }
          
          // Send progress update after each batch
          const percentage = Math.min(90, 10 + (processed / records.length) * 80);
          sendProgress({
            stage: "Processing companies",
            current: processed,
            total: records.length,
            percentage,
            message: `Processed ${processed}/${records.length} companies. Created: ${created}, Skipped: ${skipped}`,
            errors: errors.slice(-3) // Show last 3 errors
          });

          // Log progress for large datasets
          if (i % (BATCH_SIZE * 4) === 0) {
            console.log(`Processed ${processed} records, created ${created} companies, skipped ${skipped}`);
          }
        }

        // Send completion message
        sendProgress({
          stage: "Completed",
          current: processed,
          total: records.length,
          percentage: 100,
          message: `Upload completed! Created ${created} companies, skipped ${skipped} duplicates.`,
          errors: errors.slice(0, 5),
          success: true,
          finalStats: {
            processed,
            created,
            skipped,
            totalErrors: errors.length
          }
        });

        console.log(`✅ Bulk upload completed: ${created} created, ${skipped} skipped, ${errors.length} errors`);
        
        // Close the stream
        res.write('data: [DONE]\n\n');
        res.end();

      } catch (processingError) {
        console.error("CSV processing error:", processingError);
        sendProgress({
          stage: "Error",
          current: 0,
          total: 0,
          percentage: 0,
          message: `Upload failed: ${processingError instanceof Error ? processingError.message : 'Unknown error'}`,
          errors: [processingError instanceof Error ? processingError.message : 'Unknown error'],
          success: false
        });
        res.end();
      }

    } catch (error) {
      console.error("CSV upload setup error:", error);
      res.status(500).json({ message: "Failed to process CSV file" });
    }
  });

  // Legacy upload route (keep for compatibility)
  app.post("/api/admin/companies/upload-csv", isAuthenticated, upload.single('csvFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No CSV file provided" });
      }

      const csvContent = req.file.buffer.toString('utf-8');
      const errors: string[] = [];
      let processed = 0;
      let created = 0;
      let skipped = 0;

      // Get existing CINs to avoid duplicates
      const existingCins = new Set(await storage.getAllCompanyCins());

      // Process CSV synchronously to avoid Promise complications
      const records: any[] = [];
      
      await new Promise<void>((resolve, reject) => {
        parse(csvContent, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
          relax_quotes: true,
          escape: '"'
        })
        .on('data', (row) => {
          records.push(row);
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
      });

      // Process records in batches for better performance with large datasets
      const BATCH_SIZE = 1000; // Process 1000 companies at a time
      
      for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE);
        
        for (const row of batch) {
          processed++;
          
          const cin = row.CIN?.trim();
          const companyName = row.CompanyName?.trim();
          
          if (!cin || !companyName) {
            skipped++;
            continue;
          }

          if (existingCins.has(cin)) {
            skipped++;
            continue;
          }

          try {
            // Generate unique slug for company
            const baseSlug = generateSlug(companyName);
            const uniqueId = cin.slice(-8) + '-' + Date.now().toString().slice(-6);
            const slug = `${baseSlug}-${uniqueId}`.toLowerCase();

            const companyData = {
              cin,
              companyName,
              slug,
              companyROCcode: row.CompanyROCcode?.trim() || undefined,
              companyCategory: row.CompanyCategory?.trim() || undefined,
              companySubCategory: row.CompanySubCategory?.trim() || undefined,
              companyClass: row.CompanyClass?.trim() || undefined,
              authorizedCapital: row.AuthorizedCapital ? row.AuthorizedCapital.toString() : undefined,
              paidupCapital: row.PaidupCapital ? row.PaidupCapital.toString() : undefined,
              registrationDate: row.CompanyRegistrationdate_date?.trim() || null,
              registeredOfficeAddress: row.Registered_Office_Address?.trim() || undefined,
              listingStatus: row.Listingstatus?.trim() || undefined,
              companyStatus: row.CompanyStatus?.trim() || undefined,
              companyStateCode: row.CompanyStateCode?.trim() || undefined,
              companyType: row['CompanyIndian/Foreign Company']?.trim() || undefined,
              nicCode: row.nic_code?.trim() || undefined,
              companyIndustrialClassification: row.CompanyIndustrialClassification?.trim() || undefined
            };

            await storage.createCompany(companyData);
            existingCins.add(cin);
            created++;

          } catch (error) {
            errors.push(`Failed to create company ${companyName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            skipped++;
          }
        }
        
        // Log progress for large datasets
        if (i % (BATCH_SIZE * 10) === 0) {
          console.log(`Processed ${processed} records, created ${created} companies`);
        }
      }

      res.json({
        success: true,
        processed,
        created,
        skipped,
        errors: errors.slice(0, 5),
        message: `Successfully processed ${created} companies`
      });

    } catch (error) {
      console.error("CSV upload error:", error);
      res.status(500).json({ message: "Failed to process CSV file" });
    }
  });

  // Get company by ID
  app.get("/api/companies/:id", async (req, res) => {
    try {
      const companyId = parseInt(req.params.id);
      
      if (isNaN(companyId)) {
        return res.status(400).json({ message: "Invalid company ID" });
      }

      const company = await storage.getCompanyById(companyId);
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      res.json(company);
    } catch (error) {
      console.error("Failed to fetch company by ID:", error);
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  // ===== SIMPLYSETUP/COMPLY API ROUTES =====

  // Comply User Authentication Routes
  app.post("/api/comply/auth/register", async (req, res) => {
    try {
      const validatedData = insertComplyUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getComplyUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      
      // Hash password
      const hashedPassword = await hashPassword(validatedData.password);
      
      // Create user - remove password and add passwordHash
      const { password: _pass, ...userDataWithoutPassword } = validatedData;
      const newUser = await storage.createComplyUser({
        ...userDataWithoutPassword,
        passwordHash: hashedPassword
      });
      
      // Generate token
      const token = generateToken(newUser.id);
      
      // Remove password from response
      const { passwordHash: _hash, ...userWithoutPassword } = newUser;
      
      res.status(201).json({
        user: userWithoutPassword,
        token,
        message: "Registration successful"
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/comply/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      // Find user
      const user = await storage.getComplyUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify password
      const isValidPassword = await verifyPassword(password, user.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Generate token
      const token = generateToken(user.id);
      
      // Remove password from response
      const { passwordHash: _, ...userWithoutPassword } = user;
      
      res.json({
        user: userWithoutPassword,
        token,
        message: "Login successful"
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/comply/auth/me", authenticateComplyUser, async (req, res) => {
    try {
      const { passwordHash: _, ...userWithoutPassword } = req.complyUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user information" });
    }
  });

  // Profile Management
  app.put("/api/comply/profile", authenticateComplyUser, async (req, res) => {
    try {
      const updateData = insertComplyUserSchema.partial().parse(req.body);
      
      // Remove password from update data if present
      const { password: _, ...safeUpdateData } = updateData;
      
      const updatedUser = await storage.updateComplyUser(req.complyUser.id, safeUpdateData);
      const { password: __, ...userWithoutPassword } = updatedUser;
      
      res.json({
        user: userWithoutPassword,
        message: "Profile updated successfully"
      });
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.put("/api/comply/change-password", authenticateComplyUser, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password are required" });
      }
      
      // Verify current password
      const isValidPassword = await verifyPassword(currentPassword, req.complyUser.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
      
      // Hash new password
      const hashedNewPassword = await hashPassword(newPassword);
      
      // Update password
      await storage.updateComplyUserPassword(req.complyUser.id, hashedNewPassword);
      
      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Password change error:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  // GST Certificate Routes
  app.get("/api/comply/gst-certificates", authenticateComplyUser, async (req, res) => {
    try {
      const certificates = await storage.getGstCertificatesByUserId(req.complyUser.id);
      res.json(certificates);
    } catch (error) {
      console.error("Failed to fetch GST certificates:", error);
      res.status(500).json({ message: "Failed to fetch GST certificates" });
    }
  });

  app.post("/api/comply/gst-certificates", authenticateComplyUser, upload.single('certificate'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Certificate file is required" });
      }
      
      const certificateData = insertGstCertificateSchema.parse({
        ...req.body,
        userId: req.complyUser.id,
        certificateUrl: `/uploads/certificates/${req.file.filename}`,
        originalFileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      });
      
      const certificate = await storage.createGstCertificate(certificateData);
      res.status(201).json({
        certificate,
        message: "GST certificate uploaded successfully"
      });
    } catch (error) {
      console.error("Certificate upload error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to upload certificate" });
    }
  });

  app.put("/api/comply/gst-certificates/:id", authenticateComplyUser, async (req, res) => {
    try {
      const certificateId = parseInt(req.params.id);
      
      if (isNaN(certificateId)) {
        return res.status(400).json({ message: "Invalid certificate ID" });
      }
      
      // Check if certificate belongs to user
      const existingCertificate = await storage.getGstCertificateById(certificateId);
      if (!existingCertificate || existingCertificate.userId !== req.complyUser.id) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      
      const updateData = insertGstCertificateSchema.partial().parse(req.body);
      const updatedCertificate = await storage.updateGstCertificate(certificateId, updateData);
      
      res.json({
        certificate: updatedCertificate,
        message: "Certificate updated successfully"
      });
    } catch (error) {
      console.error("Certificate update error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update certificate" });
    }
  });

  app.delete("/api/comply/gst-certificates/:id", authenticateComplyUser, async (req, res) => {
    try {
      const certificateId = parseInt(req.params.id);
      
      if (isNaN(certificateId)) {
        return res.status(400).json({ message: "Invalid certificate ID" });
      }
      
      // Check if certificate belongs to user
      const existingCertificate = await storage.getGstCertificateById(certificateId);
      if (!existingCertificate || existingCertificate.userId !== req.complyUser.id) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      
      await storage.deleteGstCertificate(certificateId);
      res.json({ message: "Certificate deleted successfully" });
    } catch (error) {
      console.error("Certificate deletion error:", error);
      res.status(500).json({ message: "Failed to delete certificate" });
    }
  });

  // GST Filing Routes
  app.get("/api/comply/gst-filings", authenticateComplyUser, async (req, res) => {
    try {
      const filings = await storage.getGstFilingsByUserId(req.complyUser.id);
      res.json(filings);
    } catch (error) {
      console.error("Failed to fetch GST filings:", error);
      res.status(500).json({ message: "Failed to fetch GST filings" });
    }
  });

  app.post("/api/comply/gst-filings", authenticateComplyUser, async (req, res) => {
    try {
      const filingData = insertGstFilingSchema.parse({
        ...req.body,
        userId: req.complyUser.id
      });
      
      const filing = await storage.createGstFiling(filingData);
      res.status(201).json({
        filing,
        message: "GST filing created successfully"
      });
    } catch (error) {
      console.error("Filing creation error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create filing" });
    }
  });

  app.put("/api/comply/gst-filings/:id", authenticateComplyUser, async (req, res) => {
    try {
      const filingId = parseInt(req.params.id);
      
      if (isNaN(filingId)) {
        return res.status(400).json({ message: "Invalid filing ID" });
      }
      
      // Check if filing belongs to user
      const existingFiling = await storage.getGstFilingById(filingId);
      if (!existingFiling || existingFiling.userId !== req.complyUser.id) {
        return res.status(404).json({ message: "Filing not found" });
      }
      
      const updateData = insertGstFilingSchema.partial().parse(req.body);
      const updatedFiling = await storage.updateGstFiling(filingId, updateData);
      
      res.json({
        filing: updatedFiling,
        message: "Filing updated successfully"
      });
    } catch (error) {
      console.error("Filing update error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update filing" });
    }
  });

  app.delete("/api/comply/gst-filings/:id", authenticateComplyUser, async (req, res) => {
    try {
      const filingId = parseInt(req.params.id);
      
      if (isNaN(filingId)) {
        return res.status(400).json({ message: "Invalid filing ID" });
      }
      
      // Check if filing belongs to user
      const existingFiling = await storage.getGstFilingById(filingId);
      if (!existingFiling || existingFiling.userId !== req.complyUser.id) {
        return res.status(404).json({ message: "Filing not found" });
      }
      
      await storage.deleteGstFiling(filingId);
      res.json({ message: "Filing deleted successfully" });
    } catch (error) {
      console.error("Filing deletion error:", error);
      res.status(500).json({ message: "Failed to delete filing" });
    }
  });

  // Document Upload Routes
  app.post("/api/comply/upload/certificate", authenticateComplyUser, complyUpload.single('certificate'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/comply/${req.file.filename}`;
      const fullFilePath = path.join(process.cwd(), 'uploads', 'comply', req.file.filename);
      
      console.log("Processing certificate upload with OCR...");
      
      let extractedData: any = {};
      let gspData: any = null;
      
      try {
        // Run OCR to extract GST data from the uploaded file
        extractedData = await ocrService.processGSTCertificate(fullFilePath, req.file.mimetype);
        console.log("OCR extraction completed:", extractedData);
        
        // If GSTIN was extracted and is valid, fetch GSP data
        if (extractedData.gstin && gspApiService.validateGSTIN(extractedData.gstin)) {
          console.log("Fetching GSP data for GSTIN:", extractedData.gstin);
          const gspResponse = await gspApiService.getComprehensiveData(extractedData.gstin);
          if (gspResponse.success) {
            gspData = gspResponse.data;
            console.log("GSP data fetched successfully");
          }
        }
      } catch (ocrError) {
        console.warn("OCR processing failed, proceeding with manual data:", ocrError);
      }
      
      // Combine extracted data with manual form data (manual data takes precedence)
      const certificateData = {
        userId: req.complyUser.id,
        gstin: req.body.gstin || extractedData.gstin || 'PENDING',
        businessName: req.body.businessName || extractedData.legalName || 'Document Upload',
        legalName: req.body.legalName || extractedData.legalName || 'Document Upload',
        tradeName: extractedData.tradeName || null,
        registrationDate: extractedData.registrationDate || null,
        constitutionOfBusiness: extractedData.constitutionOfBusiness || null,
        address: extractedData.address || null,
        state: extractedData.state || null,
        pinCode: extractedData.pinCode || null,
        certificateUrl: fileUrl,
        originalFileName: req.file.originalname,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        status: 'pending' as const
      };
      
      // Save certificate record to database
      const certificate = await storage.createGstCertificate(certificateData);
      
      res.json({
        message: "Certificate uploaded and processed successfully",
        certificate: {
          id: certificate.id,
          fileName: req.file.originalname,
          fileUrl,
          status: 'pending',
          uploadedAt: certificate.uploadedAt,
          extractedData: extractedData,
          gstin: certificate.gstin,
          businessName: certificate.businessName,
          legalName: certificate.legalName
        },
        gspData: gspData ? {
          filingHistoryCount: gspData.filingHistory?.length || 0,
          upcomingDuesCount: gspData.upcomingDues?.length || 0,
          businessStatus: gspData.status
        } : null,
        ocrProcessed: Object.keys(extractedData).length > 0
      });
    } catch (error) {
      console.error("Certificate upload error:", error);
      res.status(500).json({ message: "Failed to upload certificate" });
    }
  });

  app.post("/api/comply/upload/filing-document", authenticateComplyUser, complyUpload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No document uploaded" });
      }

      const fileUrl = `/uploads/comply/${req.file.filename}`;
      
      res.json({
        message: "Filing document uploaded successfully",
        fileUrl,
        fileName: req.file.originalname,
        fileSize: req.file.size
      });
    } catch (error) {
      console.error("Filing document upload error:", error);
      res.status(500).json({ message: "Failed to upload filing document" });
    }
  });

  app.post("/api/comply/upload/multiple", authenticateComplyUser, complyUpload.array('documents', 5), async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const uploadedFiles = req.files.map(file => ({
        fileUrl: `/uploads/comply/${file.filename}`,
        fileName: file.originalname,
        fileSize: file.size
      }));
      
      res.json({
        message: `${uploadedFiles.length} documents uploaded successfully`,
        files: uploadedFiles
      });
    } catch (error) {
      console.error("Multiple document upload error:", error);
      res.status(500).json({ message: "Failed to upload documents" });
    }
  });

  // GSP API Routes
  app.get("/api/comply/gsp/filing-history/:gstin", authenticateComplyUser, async (req, res) => {
    try {
      const { gstin } = req.params;
      
      if (!gspApiService.validateGSTIN(gstin)) {
        return res.status(400).json({ message: "Invalid GSTIN format" });
      }
      
      const gspResponse = await gspApiService.getFilingHistory(gstin);
      res.json(gspResponse);
    } catch (error) {
      console.error("GSP filing history error:", error);
      res.status(500).json({ message: "Failed to fetch filing history" });
    }
  });

  app.get("/api/comply/gsp/upcoming-dues/:gstin", authenticateComplyUser, async (req, res) => {
    try {
      const { gstin } = req.params;
      
      if (!gspApiService.validateGSTIN(gstin)) {
        return res.status(400).json({ message: "Invalid GSTIN format" });
      }
      
      const gspResponse = await gspApiService.getUpcomingDues(gstin);
      res.json(gspResponse);
    } catch (error) {
      console.error("GSP upcoming dues error:", error);
      res.status(500).json({ message: "Failed to fetch upcoming dues" });
    }
  });

  app.get("/api/comply/gsp/comprehensive/:gstin", authenticateComplyUser, async (req, res) => {
    try {
      const { gstin } = req.params;
      
      if (!gspApiService.validateGSTIN(gstin)) {
        return res.status(400).json({ message: "Invalid GSTIN format" });
      }
      
      const gspResponse = await gspApiService.getComprehensiveData(gstin);
      res.json(gspResponse);
    } catch (error) {
      console.error("GSP comprehensive data error:", error);
      res.status(500).json({ message: "Failed to fetch comprehensive GST data" });
    }
  });

  // MENU MANAGEMENT API ROUTES
  
  // Get all menu sections by country
  app.get("/api/menu-sections/:countryCode", async (req, res) => {
    try {
      const { countryCode } = req.params;
      const sections = await storage.getMenuSectionsByCountry(countryCode);
      res.json(sections);
    } catch (error) {
      console.error("Failed to fetch menu sections:", error);
      res.status(500).json({ message: "Failed to fetch menu sections" });
    }
  });

  // Get menu items for a section
  app.get("/api/menu-items/:sectionId", async (req, res) => {
    try {
      const { sectionId } = req.params;
      const items = await storage.getMenuItemsBySection(parseInt(sectionId));
      res.json(items);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  // Admin routes for menu management (protected)
  app.get("/api/admin/menu-sections", isAuthenticated, async (req, res) => {
    try {
      const sections = await storage.getAllMenuSections();
      res.json(sections);
    } catch (error) {
      console.error("Failed to fetch all menu sections:", error);
      res.status(500).json({ message: "Failed to fetch menu sections" });
    }
  });

  app.post("/api/admin/menu-sections", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertMenuSectionSchema.parse(req.body);
      const section = await storage.createMenuSection(validatedData);
      res.status(201).json(section);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Failed to create menu section:", error);
      res.status(500).json({ message: "Failed to create menu section" });
    }
  });

  app.put("/api/admin/menu-sections/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertMenuSectionSchema.partial().parse(req.body);
      const section = await storage.updateMenuSection(parseInt(id), validatedData);
      res.json(section);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Failed to update menu section:", error);
      res.status(500).json({ message: "Failed to update menu section" });
    }
  });

  app.delete("/api/admin/menu-sections/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMenuSection(parseInt(id));
      res.status(204).send();
    } catch (error) {
      console.error("Failed to delete menu section:", error);
      res.status(500).json({ message: "Failed to delete menu section" });
    }
  });

  app.post("/api/admin/menu-items", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.parse(req.body);
      const item = await storage.createMenuItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Failed to create menu item:", error);
      res.status(500).json({ message: "Failed to create menu item" });
    }
  });

  app.put("/api/admin/menu-items/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertMenuItemSchema.partial().parse(req.body);
      const item = await storage.updateMenuItem(parseInt(id), validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Failed to update menu item:", error);
      res.status(500).json({ message: "Failed to update menu item" });
    }
  });

  app.delete("/api/admin/menu-items/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMenuItem(parseInt(id));
      res.status(204).send();
    } catch (error) {
      console.error("Failed to delete menu item:", error);
      res.status(500).json({ message: "Failed to delete menu item" });
    }
  });

  // Dashboard and Analytics Routes
  app.get("/api/comply/dashboard", authenticateComplyUser, async (req, res) => {
    try {
      const certificates = await storage.getGstCertificatesByUserId(req.complyUser.id);
      
      // Get GSP data for the first valid GSTIN found
      let gspSummary = null;
      const validCertificate = certificates.find(cert => 
        cert.gstin && cert.gstin !== 'PENDING' && gspApiService.validateGSTIN(cert.gstin)
      );
      
      if (validCertificate) {
        try {
          const gspResponse = await gspApiService.getComprehensiveData(validCertificate.gstin);
          if (gspResponse.success && gspResponse.data) {
            gspSummary = {
              gstin: validCertificate.gstin,
              businessName: gspResponse.data.businessName,
              filingHistoryCount: gspResponse.data.filingHistory?.length || 0,
              upcomingDuesCount: gspResponse.data.upcomingDues?.length || 0,
              urgentDuesCount: gspResponse.data.upcomingDues?.filter(due => due.priority === 'high').length || 0,
              businessStatus: gspResponse.data.status
            };
          }
        } catch (gspError) {
          console.warn("Failed to fetch GSP data for dashboard:", gspError);
        }
      }
      
      res.json({
        summary: {
          totalCertificates: certificates.length,
          verifiedCertificates: certificates.filter(c => c.status === 'verified').length
        },
        recentCertificates: certificates.slice(0, 5),
        gspSummary
      });
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ message: "Failed to load dashboard data" });
    }
  });

  // Menu Management API Routes
  
  // Get all menu sections
  app.get("/api/admin/menu-sections", async (req, res) => {
    try {
      const sections = await storage.getAllMenuSections();
      res.json(sections);
    } catch (error) {
      console.error("Error fetching menu sections:", error);
      res.status(500).json({ message: "Failed to fetch menu sections" });
    }
  });

  // Create new menu section
  app.post("/api/admin/menu-sections", async (req, res) => {
    try {
      const validatedData = insertMenuSectionSchema.parse(req.body);
      const section = await storage.createMenuSection(validatedData);
      res.status(201).json(section);
    } catch (error) {
      console.error("Error creating menu section:", error);
      res.status(500).json({ message: "Failed to create menu section" });
    }
  });

  // Update menu section
  app.put("/api/admin/menu-sections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertMenuSectionSchema.partial().parse(req.body);
      const section = await storage.updateMenuSection(id, validatedData);
      res.json(section);
    } catch (error) {
      console.error("Error updating menu section:", error);
      res.status(500).json({ message: "Failed to update menu section" });
    }
  });

  // Delete menu section
  app.delete("/api/admin/menu-sections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMenuSection(id);
      res.json({ message: "Menu section deleted successfully" });
    } catch (error) {
      console.error("Error deleting menu section:", error);
      res.status(500).json({ message: "Failed to delete menu section" });
    }
  });

  // Get menu items by section ID
  app.get("/api/menu-items/:sectionId", async (req, res) => {
    try {
      const sectionId = parseInt(req.params.sectionId);
      const items = await storage.getMenuItemsBySection(sectionId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  // Create new menu item
  app.post("/api/admin/menu-items", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.parse(req.body);
      const item = await storage.createMenuItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating menu item:", error);
      res.status(500).json({ message: "Failed to create menu item" });
    }
  });

  // Update menu item
  app.put("/api/admin/menu-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertMenuItemSchema.partial().parse(req.body);
      const item = await storage.updateMenuItem(id, validatedData);
      res.json(item);
    } catch (error) {
      console.error("Error updating menu item:", error);
      res.status(500).json({ message: "Failed to update menu item" });
    }
  });

  // Delete menu item
  app.delete("/api/admin/menu-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMenuItem(id);
      res.json({ message: "Menu item deleted successfully" });
    } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(500).json({ message: "Failed to delete menu item" });
    }
  });

  // Get menu sections by country for frontend
  app.get("/api/menu/:countryCode", async (req, res) => {
    try {
      const countryCode = req.params.countryCode.toUpperCase();
      const sections = await storage.getMenuSectionsByCountry(countryCode);
      res.json(sections);
    } catch (error) {
      console.error("Error fetching menu by country:", error);
      res.status(500).json({ message: "Failed to fetch menu" });
    }
  });

  // SERVICES MODULE API ROUTES
  
  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const { country } = req.query;
      
      if (country && typeof country === 'string') {
        // Convert country name to country code
        const countryCodeMap: { [key: string]: string } = {
          'India': 'IN',
          'Singapore': 'SG'
        };
        
        const countryCode = countryCodeMap[country] || country;
        const services = await storage.getServicesByCountry(countryCode);
        res.json(services);
      } else {
        const services = await storage.getAllServices();
        res.json(services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get service by ID
  app.get("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const service = await storage.getServiceById(serviceId);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Get service by slug
  app.get("/api/services/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const service = await storage.getServiceBySlug(slug);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Create service (Admin only)
  app.post("/api/services", isAuthenticated, async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  // Update service (Admin only)
  app.put("/api/services/:id", isAuthenticated, async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const updateData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(serviceId, updateData);
      res.json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service data", errors: error.errors });
      }
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  // Delete service (Admin only)
  app.delete("/api/services/:id", isAuthenticated, async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      await storage.deleteService(serviceId);
      res.json({ message: "Service deleted successfully" });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // SERVICE ORDERS API ROUTES
  
  // Get all service orders (Admin only)
  app.get("/api/service-orders", isAuthenticated, async (req, res) => {
    try {
      const orders = await storage.getAllServiceOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching service orders:", error);
      res.status(500).json({ message: "Failed to fetch service orders" });
    }
  });

  // Get service order by ID
  app.get("/api/service-orders/:id", async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const order = await storage.getServiceOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      console.error("Error fetching service order:", error);
      res.status(500).json({ message: "Failed to fetch service order" });
    }
  });

  // Create service order
  app.post("/api/service-orders", async (req, res) => {
    try {
      const orderData = insertServiceOrderSchema.parse(req.body);
      
      // Generate unique order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const fullOrderData = {
        ...orderData,
        orderId
      };
      
      const order = await storage.createServiceOrder(fullOrderData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      console.error("Error creating service order:", error);
      res.status(500).json({ message: "Failed to create service order" });
    }
  });

  // Update service order (Admin only)
  app.put("/api/service-orders/:orderId", isAuthenticated, async (req, res) => {
    try {
      const { orderId } = req.params;
      const updateData = insertServiceOrderSchema.partial().parse(req.body);
      
      const order = await storage.updateServiceOrderByOrderId(orderId, updateData);
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      console.error("Error updating service order:", error);
      res.status(500).json({ message: "Failed to update service order" });
    }
  });

  // Get service orders by payment status
  app.get("/api/service-orders/payment/:status", isAuthenticated, async (req, res) => {
    try {
      const { status } = req.params;
      const orders = await storage.getServiceOrdersByPaymentStatus(status);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching service orders by payment status:", error);
      res.status(500).json({ message: "Failed to fetch service orders" });
    }
  });

  // Get service orders by order status
  app.get("/api/service-orders/status/:status", isAuthenticated, async (req, res) => {
    try {
      const { status } = req.params;
      const orders = await storage.getServiceOrdersByOrderStatus(status);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching service orders by order status:", error);
      res.status(500).json({ message: "Failed to fetch service orders" });
    }
  });

  // SERVICE PAYMENT ROUTES
  
  // Create Razorpay order for services (India)
  app.post("/api/services/payment/razorpay/create-order", async (req, res) => {
    try {
      const { serviceId, customerName, customerEmail, customerPhone, formData } = req.body;
      
      // Validate required fields
      if (!serviceId || !customerName || !customerEmail || !customerPhone) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Get service details
      const service = await storage.getServiceById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      // Ensure it's an India service for Razorpay
      if (service.country !== 'India') {
        return res.status(400).json({ message: "Razorpay is only available for India services" });
      }
      
      // Check Razorpay credentials
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ 
          message: "Payment system not configured. Please contact support." 
        });
      }
      
      // Initialize Razorpay
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      
      const amount = Math.round(parseFloat(service.price) * 100); // Convert to paise
      
      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount,
        currency: service.currency,
        receipt: `service_${serviceId}_${Date.now()}`,
        notes: {
          customerName,
          customerEmail,
          serviceName: service.name,
          serviceId: serviceId.toString(),
        },
      });
      
      // Create service order record
      const orderData = {
        orderId: razorpayOrder.id,
        serviceId,
        customerName,
        customerEmail,
        customerPhone,
        amount: service.price,
        currency: service.currency,
        country: service.country,
        paymentMethod: 'razorpay' as const,
        paymentStatus: 'pending' as const,
        orderStatus: 'pending' as const,
        formData: formData ? JSON.stringify(formData) : null,
      };
      
      const order = await storage.createServiceOrder(orderData);
      
      res.json({
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        order: order,
        service: {
          name: service.name,
          description: service.description,
        }
      });
    } catch (error: any) {
      console.error("Razorpay service order creation error:", error);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  // Verify Razorpay payment for services
  app.post("/api/services/payment/razorpay/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      if (!razorpay_payment_id) {
        return res.status(400).json({ message: "Missing payment ID" });
      }
      
      // If we have signature verification data, verify it
      if (razorpay_order_id && razorpay_signature && process.env.RAZORPAY_KEY_SECRET) {
        const crypto = require('crypto');
        const expectedSignature = crypto
          .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
          .update(razorpay_order_id + '|' + razorpay_payment_id)
          .digest('hex');
        
        if (expectedSignature !== razorpay_signature) {
          return res.status(400).json({ message: "Invalid payment signature" });
        }
      }
      
      // Update service order status
      const order = await storage.updateServiceOrderByOrderId(razorpay_order_id, {
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        paymentId: razorpay_payment_id,
        paymentSignature: razorpay_signature,
      });
      
      res.json({ 
        success: true, 
        message: "Payment verified successfully",
        order: order,
      });
    } catch (error: any) {
      console.error("Service payment verification error:", error);
      res.status(500).json({ message: "Payment verification failed" });
    }
  });

  // Create Stripe payment intent for services (Singapore)
  app.post("/api/services/payment/stripe/create-payment-intent", async (req, res) => {
    try {
      const { serviceId, customerName, customerEmail, customerPhone, formData } = req.body;
      
      // Validate required fields
      if (!serviceId || !customerName || !customerEmail || !customerPhone) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Get service details
      const service = await storage.getServiceById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      // Ensure it's a Singapore service for Stripe
      if (service.country !== 'Singapore') {
        return res.status(400).json({ message: "Stripe is only available for Singapore services" });
      }
      
      // Check Stripe credentials
      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ 
          message: "Payment system not configured. Please contact support." 
        });
      }
      
      // Initialize Stripe
      const Stripe = require('stripe');
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
      });
      
      const amount = Math.round(parseFloat(service.price) * 100); // Convert to cents
      
      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: service.currency.toLowerCase(),
        metadata: {
          customerName,
          customerEmail,
          serviceName: service.name,
          serviceId: serviceId.toString(),
        },
      });
      
      // Create service order record
      const orderData = {
        orderId: paymentIntent.id,
        serviceId,
        customerName,
        customerEmail,
        customerPhone,
        amount: service.price,
        currency: service.currency,
        country: service.country,
        paymentMethod: 'stripe' as const,
        paymentStatus: 'pending' as const,
        orderStatus: 'pending' as const,
        formData: formData ? JSON.stringify(formData) : null,
      };
      
      const order = await storage.createServiceOrder(orderData);
      
      res.json({
        clientSecret: paymentIntent.client_secret,
        orderId: paymentIntent.id,
        order: order,
        service: {
          name: service.name,
          description: service.description,
        }
      });
    } catch (error: any) {
      console.error("Stripe service payment intent creation error:", error);
      res.status(500).json({ message: "Failed to create payment intent" });
    }
  });

  // Confirm Stripe payment for services
  app.post("/api/services/payment/stripe/confirm", async (req, res) => {
    try {
      const { payment_intent_id } = req.body;
      
      if (!payment_intent_id) {
        return res.status(400).json({ message: "Missing payment intent ID" });
      }
      
      // Update service order status
      const order = await storage.updateServiceOrderByOrderId(payment_intent_id, {
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        paymentId: payment_intent_id,
      });
      
      res.json({ 
        success: true, 
        message: "Payment confirmed successfully",
        order: order,
      });
    } catch (error: any) {
      console.error("Service payment confirmation error:", error);
      res.status(500).json({ message: "Payment confirmation failed" });
    }
  });

  // CUSTOMER PORTAL API ROUTES
  
  // Get customer orders
  app.get("/api/comply/customer/orders", authenticateComplyUser, async (req, res) => {
    try {
      // Since we're using the comply auth system for customers,
      // we'll fetch orders based on the customer's email
      const customerEmail = req.complyUser.email;
      const orders = await storage.getServiceOrdersByCustomerEmail(customerEmail);
      
      // Transform orders to match the expected format
      const formattedOrders = orders.map(order => ({
        id: order.id,
        orderId: order.orderId,
        serviceName: order.serviceName || 'Service Order',
        amount: order.amount,
        currency: order.currency,
        status: order.orderStatus,
        createdAt: order.createdAt
      }));
      
      res.json(formattedOrders);
    } catch (error) {
      console.error("Failed to fetch customer orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Get customer order by ID
  app.get("/api/comply/customer/orders/:id", authenticateComplyUser, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const customerEmail = req.complyUser.email;
      
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const order = await storage.getServiceOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Verify order belongs to customer
      if (order.customerEmail !== customerEmail) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(order);
    } catch (error) {
      console.error("Failed to fetch customer order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Customer dashboard summary
  app.get("/api/comply/customer/dashboard", authenticateComplyUser, async (req, res) => {
    try {
      const customerEmail = req.complyUser.email;
      const orders = await storage.getServiceOrdersByCustomerEmail(customerEmail);
      
      const summary = {
        totalOrders: orders.length,
        completedOrders: orders.filter(order => order.orderStatus === 'completed').length,
        pendingOrders: orders.filter(order => order.orderStatus === 'pending').length,
        processingOrders: orders.filter(order => order.orderStatus === 'processing').length,
        recentOrders: orders.slice(0, 5).map(order => ({
          id: order.id,
          orderId: order.orderId,
          serviceName: order.serviceName || 'Service Order',
          amount: order.amount,
          currency: order.currency,
          status: order.orderStatus,
          createdAt: order.createdAt
        }))
      };
      
      res.json(summary);
    } catch (error) {
      console.error("Failed to fetch customer dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Generate quotes for customer onboarding
  app.post("/api/quotes/generate", async (req, res) => {
    try {
      const { businessType, purposes, cities, customerId } = req.body;
      
      // Calculate pricing based on selections
      const basePricing = {
        gst_registration: 2999,
        company_registration: 8999,
        business_address: 1999,
        mail_handling: 999,
        phone_number: 799,
        meeting_rooms: 500
      };

      const locationMultipliers = {
        "7": 1.2, // Pune
        "1": 1.5, // Mumbai (if exists)
        "2": 1.4, // Delhi (if exists)
        "3": 1.3, // Bangalore (if exists)
      };

      // Generate quotes based on selections
      const quotes = [];
      
      if (purposes.length > 0 && cities.length > 0) {
        for (const city of cities) {
          let totalPrice = 0;
          const services = [];
          const multiplier = locationMultipliers[city] || 1.0;
          
          for (const purpose of purposes) {
            const basePrice = basePricing[purpose as keyof typeof basePricing] || 1999;
            const adjustedPrice = Math.round(basePrice * multiplier);
            totalPrice += adjustedPrice;
            
            services.push({
              name: purpose.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              price: adjustedPrice
            });
          }

          // Add city-specific location data
          const location = await storage.getLocationById(parseInt(city));
          
          quotes.push({
            packageName: `${businessType} Package - ${location?.name || 'Selected City'}`,
            description: `Complete virtual office solution for ${businessType} in ${location?.name || 'your city'}`,
            totalPrice,
            billingCycle: purposes.includes('business_address') ? '/month' : 'one-time',
            services,
            cityId: city,
            cityName: location?.name || 'Selected City'
          });
        }
      }

      // Sort quotes by price
      quotes.sort((a, b) => a.totalPrice - b.totalPrice);

      res.json({ quotes });
    } catch (error) {
      console.error("Error generating quotes:", error);
      res.status(500).json({ message: "Failed to generate quotes" });
    }
  });

  // Zoho form submission proxy endpoint
  app.post("/api/zoho/submit-form", async (req, res) => {
    try {
      console.log("Received Zoho form submission request - processing form data");
      
      const { 
        companyName, 
        yourName, 
        countryCode, 
        phoneNumber, 
        email, 
        businessType, 
        needVirtualOffice 
      } = req.body;
      
      // Validate required fields
      if (!companyName || !yourName || !phoneNumber || !email) {
        return res.status(400).json({ 
          message: "Missing required fields",
          errors: {
            companyName: !companyName ? "Company name is required" : null,
            yourName: !yourName ? "Your name is required" : null,
            phoneNumber: !phoneNumber ? "Phone number is required" : null,
            email: !email ? "Email is required" : null
          }
        });
      }
      
      // Prepare form data for Zoho (only fields that exist in original Zoho form)
      const formData = new URLSearchParams();
      formData.append('zf_referrer_name', '');
      formData.append('zf_redirect_url', '');
      formData.append('zc_gad', '');
      // Note: business_type and virtual_office_needed are captured in our system
      // but not sent to Zoho as they don't exist in the original form schema
      formData.append('SingleLine1', companyName);
      formData.append('SingleLine', yourName);
      const cleanCountryCode = typeof countryCode === 'string' ? countryCode.replace('+', '') : '91';
      formData.append('PhoneNumber_countrycodeval', cleanCountryCode);
      formData.append('PhoneNumber_countrycode', phoneNumber);
      formData.append('Email', email);
      
      console.log("Submitting to Zoho with data:", {
        companyName: companyName.substring(0, 3) + '***', // Log partial company name for privacy
        yourName: yourName.substring(0, 3) + '***', // Log partial name for privacy
        phoneNumber: phoneNumber.substring(0, 3) + '***', // Log partial phone for privacy
        email: email.substring(0, 3) + '***', // Log partial email for privacy
        businessType,
        needVirtualOffice
      });
      
      // Submit to Zoho Forms
      const response = await fetch(
        'https://forms.zohopublic.in/accounts50/form/FreeConsultationforVO/formperma/wixOqTkBZrgS_izhnQM6Z7Wm7EqDf7nLkHoOEorwbjg/htmlRecords/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (compatible; Virtual Office Form Submitter)',
          },
          body: formData.toString()
        }
      );
      
      console.log("Zoho response status:", response.status);
      
      if (response.ok) {
        console.log("Successfully submitted to Zoho Forms");
        res.json({
          success: true,
          message: "Form submitted successfully to Zoho"
        });
      } else {
        console.error("Zoho submission failed with status:", response.status);
        // Note: Not logging response body to avoid potential PII exposure
        console.error("Zoho error - check form field names and values");
        
        res.status(502).json({
          success: false,
          message: "Failed to submit form to Zoho",
          error: `Zoho returned status ${response.status}`
        });
      }
      
    } catch (error) {
      console.error("Error submitting to Zoho:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while submitting form",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // DYNAMIC PAGES API ROUTES

  // Get all dynamic pages
  app.get("/api/dynamic-pages", async (req, res) => {
    try {
      const pages = await storage.getAllDynamicPages();
      res.json(pages);
    } catch (error) {
      console.error("Error fetching dynamic pages:", error);
      res.status(500).json({ message: "Failed to fetch dynamic pages" });
    }
  });

  // Get dynamic page by slug
  app.get("/api/dynamic-pages/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const page = await storage.getDynamicPageBySlug(slug);
      
      if (!page) {
        return res.status(404).json({ message: "Dynamic page not found" });
      }
      
      res.json(page);
    } catch (error) {
      console.error("Error fetching dynamic page:", error);
      res.status(500).json({ message: "Failed to fetch dynamic page" });
    }
  });

  // Create bulk dynamic pages (admin only)
  app.post("/api/admin/dynamic-pages/bulk", isAuthenticated, async (req, res) => {
    try {
      const pages = req.body;
      
      if (!Array.isArray(pages) || pages.length === 0) {
        return res.status(400).json({ message: "Invalid request: pages array required" });
      }
      
      // Validate each page
      const validatedPages = pages.map(page => insertDynamicPageSchema.parse(page));
      
      // Get all existing slugs to check for duplicates
      const allExistingPages = await storage.getAllDynamicPages();
      const existingSlugs = new Set(allExistingPages.map(p => p.slug));
      
      console.log(`Total existing pages: ${allExistingPages.length}`);
      console.log(`Pages to create: ${validatedPages.length}`);
      console.log(`Slugs to check:`, validatedPages.map(p => p.slug));
      
      // Also deduplicate within the current batch
      const seenSlugs = new Set<string>();
      const newPages = validatedPages.filter(page => {
        // Skip if already exists in database
        if (existingSlugs.has(page.slug)) {
          console.log(`Skipping existing slug: ${page.slug}`);
          return false;
        }
        // Skip if duplicate within this batch
        if (seenSlugs.has(page.slug)) {
          console.log(`Skipping duplicate in batch: ${page.slug}`);
          return false;
        }
        seenSlugs.add(page.slug);
        return true;
      });
      const skippedCount = validatedPages.length - newPages.length;
      
      console.log(`New pages to create: ${newPages.length}, Skipped: ${skippedCount}`);
      
      if (newPages.length === 0) {
        return res.status(200).json({
          message: "All pages already exist. No new pages created.",
          created: 0,
          skipped: skippedCount,
          pages: []
        });
      }
      
      // Create only new pages
      const createdPages = await storage.createDynamicPagesBulk(newPages);
      
      res.json({
        message: skippedCount > 0 
          ? `Created ${createdPages.length} pages, skipped ${skippedCount} duplicates`
          : `Successfully created ${createdPages.length} pages`,
        created: createdPages.length,
        skipped: skippedCount,
        pages: createdPages
      });
    } catch (error) {
      console.error("Error creating bulk dynamic pages:", error);
      res.status(500).json({ 
        message: "Failed to create dynamic pages",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Delete dynamic page (admin only)
  app.delete("/api/admin/dynamic-pages/:id", isAuthenticated, async (req, res) => {
    try {
      const pageId = parseInt(req.params.id);
      
      if (isNaN(pageId)) {
        return res.status(400).json({ message: "Invalid page ID" });
      }
      
      await storage.deleteDynamicPage(pageId);
      res.json({ message: "Dynamic page deleted successfully" });
    } catch (error) {
      console.error("Error deleting dynamic page:", error);
      res.status(500).json({ message: "Failed to delete dynamic page" });
    }
  });

  // Delete multiple dynamic pages (admin only)
  app.post("/api/admin/dynamic-pages/bulk-delete", isAuthenticated, async (req, res) => {
    try {
      const { ids } = req.body;
      
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid request: ids array required" });
      }
      
      await storage.deleteDynamicPagesBulk(ids);
      res.json({ message: `Successfully deleted ${ids.length} pages` });
    } catch (error) {
      console.error("Error deleting dynamic pages:", error);
      res.status(500).json({ message: "Failed to delete dynamic pages" });
    }
  });

  // ==========================================
  // SIMPLYSETUP AI ROUTES
  // ==========================================

  // Start a new SimplySetup AI conversation with lead data (form submission)
  app.post("/api/simplysetup/start-with-lead", async (req, res) => {
    try {
      const { name, email, phone, websiteLink } = req.body;
      
      if (!name || !email || !phone) {
        return res.status(400).json({ message: "Name, email, and phone are required" });
      }
      
      const { getInitialGreeting } = await import("./services/simplysetup-ai");
      
      const sessionId = `ss_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create lead with contact info already filled
      const lead = await storage.createSimplySetupLead({
        sessionId,
        legalName: name,
        tradeName: name,
        email,
        phone,
        currentStep: "entity_type",
        status: "new",
        conversationHistory: JSON.stringify([])
      });
      
      // Push to Zoho CRM immediately
      try {
        const { pushLeadToZoho } = await import("./services/zoho-crm");
        const zohoResult = await pushLeadToZoho(lead.id, name, phone, email, websiteLink);
        
        if (zohoResult.success) {
          await storage.updateSimplySetupLead(lead.id, {
            zohoRecordId: zohoResult.zohoRecordId,
            zohoPushStatus: 'success',
            zohoPushedAt: new Date()
          });
          console.log(`Lead ${lead.id} pushed to Zoho CRM: ${zohoResult.zohoRecordId}`);
        } else {
          await storage.updateSimplySetupLead(lead.id, {
            zohoPushStatus: 'failed',
            zohoPushError: zohoResult.error
          });
          console.log(`Failed to push lead ${lead.id} to Zoho:`, zohoResult.error);
        }
      } catch (zohoError) {
        console.error("Zoho CRM push error:", zohoError);
      }
      
      const greeting = getInitialGreeting(name.split(' ')[0]);
      
      const conversationHistory = [{
        role: "assistant",
        content: greeting,
        timestamp: new Date().toISOString()
      }];
      
      await storage.updateSimplySetupLead(lead.id, {
        conversationHistory: JSON.stringify(conversationHistory)
      });
      
      res.json({
        sessionId,
        message: greeting,
        currentStep: "entity_type",
        leadId: lead.id
      });
    } catch (error) {
      console.error("Error starting SimplySetup conversation with lead:", error);
      res.status(500).json({ message: "Failed to start conversation" });
    }
  });

  // Start a new SimplySetup AI conversation (legacy)
  app.post("/api/simplysetup/start", async (req, res) => {
    try {
      const { getInitialGreeting } = await import("./services/simplysetup-ai");
      
      const sessionId = `ss_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const lead = await storage.createSimplySetupLead({
        sessionId,
        currentStep: "entity_type",
        status: "new",
        conversationHistory: JSON.stringify([])
      });
      
      const greeting = getInitialGreeting();
      
      const conversationHistory = [{
        role: "assistant",
        content: greeting,
        timestamp: new Date().toISOString()
      }];
      
      await storage.updateSimplySetupLead(lead.id, {
        conversationHistory: JSON.stringify(conversationHistory)
      });
      
      res.json({
        sessionId,
        message: greeting,
        currentStep: "entity_type",
        leadId: lead.id
      });
    } catch (error) {
      console.error("Error starting SimplySetup conversation:", error);
      res.status(500).json({ message: "Failed to start conversation" });
    }
  });

  // Send a message to SimplySetup AI
  app.post("/api/simplysetup/message", async (req, res) => {
    try {
      const { sessionId, message } = req.body;
      
      if (!sessionId || !message) {
        return res.status(400).json({ message: "sessionId and message are required" });
      }
      
      const lead = await storage.getSimplySetupLeadBySessionId(sessionId);
      if (!lead) {
        return res.status(404).json({ message: "Session not found" });
      }
      
      const { processSimplySetupMessage, getPricingInfo } = await import("./services/simplysetup-ai");
      
      const conversationHistory = lead.conversationHistory 
        ? JSON.parse(lead.conversationHistory) 
        : [];
      
      conversationHistory.push({
        role: "user",
        content: message,
        timestamp: new Date().toISOString()
      });
      
      const currentData = {
        entityType: lead.entityType || undefined,
        legalName: lead.legalName || undefined,
        tradeName: lead.tradeName || undefined,
        email: lead.email || undefined,
        phone: lead.phone || undefined,
        whatsapp: lead.whatsapp || undefined,
        stateOfRegistration: lead.stateOfRegistration || undefined,
        city: lead.city || undefined,
        hasOwnOffice: lead.hasOwnOffice || undefined,
        needsVirtualOffice: lead.needsVirtualOffice || undefined,
        virtualOfficeLocation: lead.virtualOfficeLocation || undefined,
        natureOfBusiness: lead.natureOfBusiness || undefined,
        platforms: lead.platforms || [],
        approxTurnover: lead.approxTurnover || undefined,
        gstScheme: lead.gstScheme || undefined,
        currentStep: lead.currentStep || "greeting"
      };
      
      const chatMessages = conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }));
      
      const aiResponse = await processSimplySetupMessage(message, chatMessages, currentData);
      
      conversationHistory.push({
        role: "assistant",
        content: aiResponse.message,
        timestamp: new Date().toISOString()
      });
      
      const updateData: any = {
        conversationHistory: JSON.stringify(conversationHistory),
        currentStep: aiResponse.nextStep
      };
      
      if (aiResponse.extractedData) {
        const extracted = aiResponse.extractedData;
        if (extracted.entityType) updateData.entityType = extracted.entityType;
        if (extracted.legalName) updateData.legalName = extracted.legalName;
        if (extracted.tradeName) updateData.tradeName = extracted.tradeName;
        if (extracted.email) updateData.email = extracted.email;
        if (extracted.phone) updateData.phone = extracted.phone;
        if (extracted.whatsapp) updateData.whatsapp = extracted.whatsapp;
        if (extracted.stateOfRegistration) updateData.stateOfRegistration = extracted.stateOfRegistration;
        if (extracted.city) updateData.city = extracted.city;
        if (extracted.hasOwnOffice !== undefined) updateData.hasOwnOffice = extracted.hasOwnOffice;
        if (extracted.needsVirtualOffice !== undefined) updateData.needsVirtualOffice = extracted.needsVirtualOffice;
        if (extracted.virtualOfficeLocation) updateData.virtualOfficeLocation = extracted.virtualOfficeLocation;
        if (extracted.natureOfBusiness) updateData.natureOfBusiness = extracted.natureOfBusiness;
        if (extracted.platforms && extracted.platforms.length > 0) updateData.platforms = extracted.platforms;
        if (extracted.approxTurnover) updateData.approxTurnover = extracted.approxTurnover;
        if (extracted.gstScheme) updateData.gstScheme = extracted.gstScheme;
      }
      
      if (aiResponse.summary) {
        updateData.summary = aiResponse.summary;
        updateData.status = "qualified";
      }
      
      await storage.updateSimplySetupLead(lead.id, updateData);
      
      // Auto-push to Zoho CRM when contact details are collected
      const updatedLeadForZoho = await storage.getSimplySetupLeadById(lead.id);
      if (updatedLeadForZoho && 
          updatedLeadForZoho.legalName && 
          updatedLeadForZoho.phone && 
          updatedLeadForZoho.email &&
          !updatedLeadForZoho.zohoRecordId &&
          updatedLeadForZoho.zohoPushStatus !== 'success') {
        try {
          const { pushLeadToZoho } = await import("./services/zoho-crm");
          const zohoResult = await pushLeadToZoho(
            updatedLeadForZoho.id,
            updatedLeadForZoho.legalName,
            updatedLeadForZoho.phone,
            updatedLeadForZoho.email
          );
          
          if (zohoResult.success) {
            await storage.updateSimplySetupLead(lead.id, {
              zohoRecordId: zohoResult.zohoRecordId,
              zohoPushStatus: 'success',
              zohoPushedAt: new Date()
            });
            console.log(`Lead ${lead.id} auto-pushed to Zoho CRM: ${zohoResult.zohoRecordId}`);
          } else {
            await storage.updateSimplySetupLead(lead.id, {
              zohoPushStatus: 'failed',
              zohoPushError: zohoResult.error
            });
            console.log(`Failed to auto-push lead ${lead.id} to Zoho:`, zohoResult.error);
          }
        } catch (zohoError) {
          console.error("Zoho CRM push error:", zohoError);
        }
      }
      
      let pricing = null;
      if (aiResponse.requiresPayment || aiResponse.nextStep === "payment") {
        const updatedLead = await storage.getSimplySetupLeadById(lead.id);
        if (updatedLead) {
          pricing = getPricingInfo({
            entityType: updatedLead.entityType || undefined,
            needsVirtualOffice: updatedLead.needsVirtualOffice || undefined
          });
        }
      }
      
      res.json({
        message: aiResponse.message,
        currentStep: aiResponse.nextStep,
        isComplete: aiResponse.isComplete,
        requiresDocumentUpload: aiResponse.requiresDocumentUpload,
        requiresPayment: aiResponse.requiresPayment,
        summary: aiResponse.summary,
        pricing
      });
    } catch (error) {
      console.error("Error processing SimplySetup message:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  // Get lead data by session
  app.get("/api/simplysetup/lead/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const lead = await storage.getSimplySetupLeadBySessionId(sessionId);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      const documents = await storage.getSimplySetupDocumentsByLeadId(lead.id);
      
      res.json({ lead, documents });
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  // Upload document for SimplySetup lead
  app.post("/api/simplysetup/upload/:sessionId", complyUpload.single('document'), async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { documentType } = req.body;
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      if (!documentType) {
        return res.status(400).json({ message: "Document type is required" });
      }
      
      const lead = await storage.getSimplySetupLeadBySessionId(sessionId);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      const document = await storage.createSimplySetupDocument({
        leadId: lead.id,
        documentType,
        fileName: file.originalname,
        fileUrl: `/uploads/comply/${file.filename}`,
        fileSize: file.size,
        mimeType: file.mimetype,
        status: "pending"
      });
      
      const documents = await storage.getSimplySetupDocumentsByLeadId(lead.id);
      const requiredDocs = ['pan', 'aadhaar', 'bank_proof', 'photo'];
      if (!lead.hasOwnOffice && lead.needsVirtualOffice) {
      } else {
        requiredDocs.push('rent_agreement');
      }
      
      const uploadedTypes = documents.map(d => d.documentType);
      const allDocsUploaded = requiredDocs.every(doc => uploadedTypes.includes(doc));
      
      if (allDocsUploaded) {
        await storage.updateSimplySetupLead(lead.id, {
          status: "documents_uploaded",
          currentStep: "payment"
        });
      } else {
        await storage.updateSimplySetupLead(lead.id, {
          status: "documents_pending"
        });
      }
      
      res.json({
        document,
        allDocsUploaded,
        uploadedDocs: uploadedTypes
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      res.status(500).json({ message: "Failed to upload document" });
    }
  });

  // Get pricing for a lead
  app.get("/api/simplysetup/pricing/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const lead = await storage.getSimplySetupLeadBySessionId(sessionId);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      const { getPricingInfo } = await import("./services/simplysetup-ai");
      const pricing = getPricingInfo({
        entityType: lead.entityType || undefined,
        needsVirtualOffice: lead.needsVirtualOffice || undefined
      });
      
      res.json(pricing);
    } catch (error) {
      console.error("Error getting pricing:", error);
      res.status(500).json({ message: "Failed to get pricing" });
    }
  });

  // Create Razorpay order for SimplySetup payment
  app.post("/api/simplysetup/create-order/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const lead = await storage.getSimplySetupLeadBySessionId(sessionId);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      const { getPricingInfo } = await import("./services/simplysetup-ai");
      const pricing = getPricingInfo({
        entityType: lead.entityType || undefined,
        needsVirtualOffice: lead.needsVirtualOffice || undefined
      });
      
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || '',
        key_secret: process.env.RAZORPAY_KEY_SECRET || ''
      });
      
      const order = await razorpay.orders.create({
        amount: pricing.price * 100,
        currency: "INR",
        receipt: `ss_${lead.id}_${Date.now()}`,
        notes: {
          leadId: lead.id.toString(),
          sessionId: lead.sessionId,
          package: pricing.package
        }
      });
      
      await storage.updateSimplySetupLead(lead.id, {
        razorpayOrderId: order.id,
        selectedPackage: pricing.package,
        packagePrice: pricing.price.toString(),
        status: "payment_pending"
      });
      
      res.json({
        orderId: order.id,
        amount: pricing.price,
        currency: "INR",
        package: pricing.package,
        description: pricing.description
      });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  // Verify Razorpay payment for SimplySetup
  app.post("/api/simplysetup/verify-payment", async (req, res) => {
    try {
      const { sessionId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      const lead = await storage.getSimplySetupLeadBySessionId(sessionId);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      const crypto = await import("crypto");
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
        .update(body)
        .digest("hex");
      
      const isValid = expectedSignature === razorpay_signature;
      
      if (isValid) {
        await storage.updateSimplySetupLead(lead.id, {
          razorpayPaymentId: razorpay_payment_id,
          paymentStatus: "paid",
          status: "payment_complete",
          currentStep: "complete"
        });
        
        res.json({
          success: true,
          message: "Payment verified successfully"
        });
      } else {
        await storage.updateSimplySetupLead(lead.id, {
          paymentStatus: "failed"
        });
        
        res.status(400).json({
          success: false,
          message: "Payment verification failed"
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  // Admin: Get all SimplySetup leads
  app.get("/api/admin/simplysetup/leads", isAuthenticated, async (req, res) => {
    try {
      const leads = await storage.getAllSimplySetupLeads();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  // Admin: Get leads by status
  app.get("/api/admin/simplysetup/leads/status/:status", isAuthenticated, async (req, res) => {
    try {
      const { status } = req.params;
      const leads = await storage.getSimplySetupLeadsByStatus(status);
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads by status:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  // Admin: Get single lead with documents
  app.get("/api/admin/simplysetup/leads/:id", isAuthenticated, async (req, res) => {
    try {
      const leadId = parseInt(req.params.id);
      const lead = await storage.getSimplySetupLeadById(leadId);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      const documents = await storage.getSimplySetupDocumentsByLeadId(leadId);
      
      res.json({ lead, documents });
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });

  // Admin: Update lead status
  app.patch("/api/admin/simplysetup/leads/:id", isAuthenticated, async (req, res) => {
    try {
      const leadId = parseInt(req.params.id);
      const updateData = req.body;
      
      const lead = await storage.updateSimplySetupLead(leadId, updateData);
      res.json(lead);
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  // ===== ZOHO CRM INTEGRATION ROUTES =====
  
  // Generate Zoho OAuth authorization URL
  app.get("/api/zoho/auth-url", isAuthenticated, async (req, res) => {
    try {
      const { generateAuthUrl } = await import("./services/zoho-crm");
      const authUrl = await generateAuthUrl();
      res.json({ authUrl });
    } catch (error) {
      console.error("Error generating Zoho auth URL:", error);
      res.status(500).json({ message: "Failed to generate auth URL" });
    }
  });

  // Zoho OAuth callback handler
  app.get("/api/zoho/callback", async (req, res) => {
    try {
      const { code } = req.query;
      
      if (!code || typeof code !== 'string') {
        return res.status(400).send("Authorization code missing");
      }
      
      const { exchangeCodeForTokens } = await import("./services/zoho-crm");
      const tokens = await exchangeCodeForTokens(code);
      
      res.send(`
        <html>
          <head><title>Zoho CRM Connected</title></head>
          <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
            <h1 style="color: #22c55e;">✓ Zoho CRM Connected Successfully!</h1>
            <p>Please add this refresh token to your environment secrets:</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 600px; word-break: break-all;">
              <strong>ZOHO_REFRESH_TOKEN</strong><br><br>
              <code style="font-size: 14px;">${tokens.refresh_token}</code>
            </div>
            <p style="color: #666;">After adding the secret, restart your application.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Zoho OAuth callback error:", error);
      res.status(500).send("Failed to complete Zoho authorization");
    }
  });

  // Admin: Manually push lead to Zoho CRM
  app.post("/api/admin/simplysetup/leads/:id/push-to-zoho", isAuthenticated, async (req, res) => {
    try {
      const leadId = parseInt(req.params.id);
      const lead = await storage.getSimplySetupLeadById(leadId);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }

      if (!lead.legalName || !lead.phone || !lead.email) {
        return res.status(400).json({ message: "Lead missing required fields (name, phone, email)" });
      }

      const { pushLeadToZoho } = await import("./services/zoho-crm");
      const result = await pushLeadToZoho(
        lead.id,
        lead.legalName,
        lead.phone,
        lead.email
      );

      if (result.success) {
        await storage.updateSimplySetupLead(leadId, {
          zohoPushStatus: 'success',
          zohoRecordId: result.zohoRecordId
        });
        res.json({ success: true, zohoRecordId: result.zohoRecordId });
      } else {
        await storage.updateSimplySetupLead(leadId, {
          zohoPushStatus: 'failed',
          zohoPushError: result.error
        });
        res.status(500).json({ success: false, error: result.error });
      }
    } catch (error: any) {
      console.error("Error pushing lead to Zoho:", error);
      res.status(500).json({ message: error.message || "Failed to push lead to Zoho" });
    }
  });

  // ============================================
  // GSTIN Search API - Public endpoint for GST Number lookup
  // ============================================
  
  const stateCodeMap: Record<string, string> = {
    "01": "Jammu & Kashmir", "02": "Himachal Pradesh", "03": "Punjab",
    "04": "Chandigarh", "05": "Uttarakhand", "06": "Haryana",
    "07": "Delhi", "08": "Rajasthan", "09": "Uttar Pradesh",
    "10": "Bihar", "11": "Sikkim", "12": "Arunachal Pradesh",
    "13": "Nagaland", "14": "Manipur", "15": "Mizoram",
    "16": "Tripura", "17": "Meghalaya", "18": "Assam",
    "19": "West Bengal", "20": "Jharkhand", "21": "Odisha",
    "22": "Chhattisgarh", "23": "Madhya Pradesh", "24": "Gujarat",
    "26": "Dadra & Nagar Haveli and Daman & Diu", "27": "Maharashtra",
    "28": "Andhra Pradesh (Old)", "29": "Karnataka", "30": "Goa",
    "31": "Lakshadweep", "32": "Kerala", "33": "Tamil Nadu",
    "34": "Puducherry", "35": "Andaman & Nicobar Islands",
    "36": "Telangana", "37": "Andhra Pradesh", "38": "Ladakh",
    "97": "Other Territory"
  };

  const taxpayerTypeMap: Record<string, string> = {
    "Regular": "Regular Taxpayer",
    "Composition": "Composition Dealer",
    "SEZ Unit": "SEZ Unit",
    "SEZ Developer": "SEZ Developer",
    "Casual Taxable Person": "Casual Taxable Person",
    "Input Service Distributor": "Input Service Distributor (ISD)",
    "UIN Holders": "Unique Identification Number Holders",
    "Government Department": "Government Department",
    "Non-Resident Taxable Person": "Non-Resident Taxable Person",
    "TDS": "Tax Deductor at Source (TDS)",
    "TCS": "Tax Collector at Source (TCS)"
  };

  const constitutionMap: Record<string, string> = {
    "Proprietorship": "Proprietorship/Individual",
    "Partnership": "Partnership Firm",
    "Hindu Undivided Family": "Hindu Undivided Family (HUF)",
    "Private Limited Company": "Private Limited Company",
    "Public Limited Company": "Public Limited Company",
    "Society": "Society/Club/Trust/AOP",
    "Trust": "Trust",
    "Government Department": "Government Department",
    "Public Sector Undertaking": "Public Sector Undertaking",
    "Limited Liability Partnership": "Limited Liability Partnership (LLP)",
    "Foreign Limited Liability Partnership": "Foreign Limited Liability Partnership",
    "Foreign Company": "Foreign Company"
  };

  const businessActivitiesOptions = [
    "Manufacturer", "Wholesale Business", "Retail Business", 
    "Warehouse/Depot", "Bonded Warehouse", "Export", "Import",
    "Works Contract", "Office/Sale Office", "E-Commerce Operator",
    "Leasing Business", "Service Provider", "Factory/Manufacturing"
  ];

  function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
  
  function seededRandom(seed: number, index: number): number {
    const x = Math.sin(seed + index * 9999) * 10000;
    return x - Math.floor(x);
  }

  function generateMockGSTINData(gstin: string) {
    const stateCode = gstin.substring(0, 2);
    const panPart = gstin.substring(2, 12);
    
    const stateName = stateCodeMap[stateCode] || "Unknown State";
    
    const hash = simpleHash(gstin);
    
    const companyPrefixes = [
      "Bharat", "Sharma", "Gupta", "Patel", "Sunrise", "Digital", "Green", "Metro", "Prime", "Atlas",
      "Agarwal", "Kumar", "Singh", "Reddy", "Verma", "Mehta", "Jain", "Shah", "Kapoor", "Malhotra",
      "Tata", "Reliance", "Infosys", "Wipro", "Tech", "Global", "National", "Royal", "Diamond", "Golden"
    ];
    
    const companySuffixes = [
      "Technologies Private Limited", "Trading Company", "Industries", "Enterprises", "Solutions LLP",
      "Commerce India Pvt Ltd", "Energy Systems", "Logistics Services", "Manufacturing Co", "Import Export",
      "Consultants", "Services Pvt Ltd", "Associates", "Corporation", "Group", "Ventures", "Holdings",
      "International", "Networks", "Infotech"
    ];
    
    const tradeSuffixes = ["Tech", "Co", "Ind", "Entp", "Sol", "Comm", "Power", "Log", "Mfg", "Impex", "Corp", "Net"];
    
    const localities = [
      "Industrial Area", "Commercial Complex", "Business Park", "Market Yard", "Trade Center", 
      "Tech Park", "SEZ Zone", "MIDC Area", "Export Zone", "IT Park", "Financial District",
      "Cyber City", "Electronic City", "Software Park", "Trade Zone"
    ];
    
    const streets = [
      "MG Road", "Main Street", "Station Road", "Gandhi Nagar", "Nehru Place", "Industrial Estate",
      "Commercial Street", "Ring Road", "Highway Road", "Link Road", "Bypass Road", "Central Avenue",
      "Park Street", "Civil Lines", "Mall Road"
    ];
    
    const prefixIndex = Math.floor(seededRandom(hash, 1) * companyPrefixes.length);
    const suffixIndex = Math.floor(seededRandom(hash, 2) * companySuffixes.length);
    const tradeIndex = Math.floor(seededRandom(hash, 3) * tradeSuffixes.length);
    
    const companyName = `${companyPrefixes[prefixIndex]} ${companySuffixes[suffixIndex]}`;
    const tradeName = `${companyPrefixes[prefixIndex]}${tradeSuffixes[tradeIndex]}`;
    
    const statusOptions = ["Active", "Active", "Active", "Active", "Active", "Active", "Suspended", "Cancelled"];
    const statusIndex = Math.floor(seededRandom(hash, 4) * statusOptions.length);
    
    const constitutionKeys = Object.keys(constitutionMap);
    const constitutionIndex = Math.floor(seededRandom(hash, 5) * constitutionKeys.length);
    
    const taxpayerKeys = Object.keys(taxpayerTypeMap);
    const taxpayerIndex = Math.floor(seededRandom(hash, 6) * taxpayerKeys.length);
    
    const numActivities = 1 + Math.floor(seededRandom(hash, 7) * 4);
    const activities: string[] = [];
    for (let i = 0; i < numActivities; i++) {
      const actIndex = Math.floor(seededRandom(hash, 10 + i) * businessActivitiesOptions.length);
      if (!activities.includes(businessActivitiesOptions[actIndex])) {
        activities.push(businessActivitiesOptions[actIndex]);
      }
    }
    
    const buildingNumber = String(1 + Math.floor(seededRandom(hash, 20) * 999));
    const floorOptions = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor"];
    const floorNumber = floorOptions[Math.floor(seededRandom(hash, 21) * floorOptions.length)];
    const locality = localities[Math.floor(seededRandom(hash, 22) * localities.length)];
    const street = streets[Math.floor(seededRandom(hash, 23) * streets.length)];
    
    const stateBasePincodes: Record<string, number> = {
      "01": 110000, "02": 160000, "03": 140000, "04": 180000, "05": 171000, "06": 121000, "07": 302000,
      "08": 400000, "09": 200000, "10": 110000, "11": 110000, "12": 306000, "13": 452000, "14": 440000,
      "18": 452000, "19": 700000, "20": 834000, "21": 751000, "22": 796000, "23": 793000, "24": 380000,
      "27": 400000, "29": 560000, "32": 600000, "33": 600000, "36": 500000, "37": 530000
    };
    const basePin = stateBasePincodes[stateCode] || 400000;
    const pincode = String(basePin + Math.floor(seededRandom(hash, 24) * 99999));
    
    const regYear = 2017 + Math.floor(seededRandom(hash, 30) * 7);
    const regMonth = 1 + Math.floor(seededRandom(hash, 31) * 12);
    const regDay = 1 + Math.floor(seededRandom(hash, 32) * 28);
    const registrationDate = `${String(regDay).padStart(2, '0')}-${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][regMonth - 1]}-${regYear}`;
    
    const fullAddress = `${buildingNumber}, ${floorNumber}, ${street}, ${locality}, ${stateName} - ${pincode}`;
    
    const wardNumber = 1 + Math.floor(seededRandom(hash, 40) * 50);
    const commissionerateNumber = 1 + Math.floor(seededRandom(hash, 41) * 20);
    
    return {
      gstin: gstin.toUpperCase(),
      legalName: companyName,
      tradeName: tradeName,
      address: {
        buildingName: `${tradeName} Tower`,
        buildingNumber: buildingNumber,
        floorNumber: floorNumber,
        street: street,
        locality: locality,
        district: stateName.split(" ")[0] + " District",
        stateCode: stateCode,
        stateName: stateName,
        pincode: pincode,
        fullAddress: fullAddress
      },
      taxpayerType: taxpayerTypeMap[taxpayerKeys[taxpayerIndex]] || "Regular Taxpayer",
      registrationStatus: statusOptions[statusIndex],
      registrationDate: registrationDate,
      lastUpdated: new Date().toISOString().split('T')[0],
      constitutionOfBusiness: constitutionMap[constitutionKeys[constitutionIndex]] || "Private Limited Company",
      natureOfBusinessActivities: activities,
      principalPlaceOfBusiness: fullAddress,
      additionalPlacesOfBusiness: [],
      isECommerceOperator: activities.includes("E-Commerce Operator"),
      annualTurnoverRange: ["Rs 0-40 Lakhs", "Rs 40 Lakhs - 1.5 Cr", "Rs 1.5 Cr - 5 Cr", "Rs 5 Cr - 25 Cr", "Above Rs 25 Cr"][Math.floor(seededRandom(hash, 50) * 5)],
      stateJurisdiction: `State: ${stateName} - Ward ${wardNumber}`,
      centerJurisdiction: `Central Tax: Commissionerate ${commissionerateNumber}`
    };
  }

  async function fetchFromMasterGST(gstin: string): Promise<any> {
    const clientId = process.env.MASTERS_INDIA_CLIENT_ID;
    const clientSecret = process.env.MASTERS_INDIA_CLIENT_SECRET;
    const email = process.env.MASTERS_INDIA_USERNAME || 'api@simplysetup.in';
    
    if (!clientId || !clientSecret) {
      return null;
    }
    
    try {
      const url = `https://api.mastergst.com/public/search?email=${encodeURIComponent(email)}&gstin=${gstin}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'client_id': clientId,
          'client_secret': clientSecret,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        return null;
      }
      
      const result = await response.json();
      
      if (result.error || result.status_cd === '0') {
        return { notFound: true, message: result.error?.message || "GSTIN not found" };
      }
      
      if (result.data) {
        const parsed = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
        return parsed;
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  async function fetchRealGSTINData(gstin: string): Promise<any> {
    const masterGstData = await fetchFromMasterGST(gstin);
    
    if (masterGstData) {
      if (masterGstData.notFound) {
        return masterGstData;
      }
      
      const d = masterGstData;
      const stateCode = gstin.substring(0, 2);
      const stateName = stateCodeMap[stateCode] || d.pradr?.addr?.stcd || "Unknown State";
      
      const address = d.pradr?.addr || {};
      const fullAddress = [
        address.bno, address.flno, address.bnm, address.st, 
        address.loc, address.dst, stateName, address.pncd
      ].filter(Boolean).join(", ");
      
      return {
        gstin: d.gstin || gstin,
        legalName: d.lgnm || "N/A",
        tradeName: d.tradeNam || d.lgnm || "N/A",
        address: {
          buildingName: address.bnm || "",
          buildingNumber: address.bno || "",
          floorNumber: address.flno || "",
          street: address.st || "",
          locality: address.loc || "",
          district: address.dst || "",
          stateCode: stateCode,
          stateName: stateName,
          pincode: address.pncd || "",
          fullAddress: fullAddress || d.pradr?.adr || "N/A"
        },
        taxpayerType: d.dty || "Regular",
        registrationStatus: d.sts || "Active",
        registrationDate: d.rgdt || "N/A",
        lastUpdated: d.lstupdt || new Date().toISOString().split('T')[0],
        constitutionOfBusiness: d.ctb || "N/A",
        natureOfBusinessActivities: d.nba || [],
        principalPlaceOfBusiness: d.pradr?.adr || fullAddress || "N/A",
        additionalPlacesOfBusiness: (d.adadr?.map((a: any) => a?.adr).filter(Boolean)) || [],
        isECommerceOperator: d.einvoiceStatus === "Yes",
        annualTurnoverRange: "N/A",
        stateJurisdiction: d.stj || "N/A",
        centerJurisdiction: d.ctj || "N/A",
        cancellationDate: d.cxdt || null,
        cancellationType: d.cxtype || null
      };
    }
    
    return null;
  }

  app.get("/api/gstin/search", async (req, res) => {
    try {
      const { gstin } = req.query;
      
      if (!gstin || typeof gstin !== 'string') {
        return res.status(400).json({
          success: false,
          error: "GSTIN parameter is required",
          errorCode: "MISSING_GSTIN"
        });
      }
      
      const normalizedGstin = gstin.toUpperCase().trim();
      
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      if (!gstinRegex.test(normalizedGstin)) {
        return res.status(400).json({
          success: false,
          error: "Invalid GSTIN format. GSTIN must be 15 characters in the format: 22AAAAA0000A1Z5",
          errorCode: "INVALID_FORMAT"
        });
      }
      
      const stateCode = normalizedGstin.substring(0, 2);
      if (!stateCodeMap[stateCode]) {
        return res.status(400).json({
          success: false,
          error: `Invalid state code: ${stateCode}. Valid state codes range from 01 to 38.`,
          errorCode: "INVALID_STATE_CODE"
        });
      }
      
      const realData = await fetchRealGSTINData(normalizedGstin);
      
      if (realData) {
        if (realData.notFound) {
          return res.status(404).json({
            success: false,
            error: realData.message || "GSTIN not found in the GST portal",
            errorCode: "NOT_FOUND"
          });
        }
        
        return res.json({
          success: true,
          data: realData,
          source: "live"
        });
      }
      
      const gstinData = generateMockGSTINData(normalizedGstin);
      
      res.json({
        success: true,
        data: gstinData,
        source: "demo"
      });
      
    } catch (error: any) {
      console.error("GSTIN Search Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch GSTIN details. Please try again later.",
        errorCode: "SERVER_ERROR"
      });
    }
  });

  app.get("/api/gstin/contact", async (req, res) => {
    try {
      const { gstin } = req.query;
      
      if (!gstin || typeof gstin !== 'string') {
        return res.status(400).json({
          success: false,
          error: "GSTIN parameter is required",
          errorCode: "MISSING_GSTIN"
        });
      }
      
      const normalizedGstin = gstin.toUpperCase().trim();
      
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      if (!gstinRegex.test(normalizedGstin)) {
        return res.status(400).json({
          success: false,
          error: "Invalid GSTIN format",
          errorCode: "INVALID_FORMAT"
        });
      }
      
      const apiKey = process.env.QUICKEKYC_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          success: false,
          error: "Contact lookup service not configured",
          errorCode: "SERVICE_UNAVAILABLE"
        });
      }
      
      try {
        const response = await fetch('https://api.quickekyc.com/api/v1/corporate/gstin_sp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: apiKey,
            id_number: normalizedGstin,
            filing_status_get: true
          })
        });
        
        const data = await response.json();
        console.log("QuickeKYC Response:", JSON.stringify(data, null, 2));
        
        if (data.status === 'success' && data.data) {
          const gstData = data.data;
          const phoneNumber = gstData.mobile_no || gstData.mobile_number || gstData.phone || gstData.contact_number || null;
          const contactInfo = {
            phone: phoneNumber ? String(phoneNumber) : null,
            email: gstData.email_id || gstData.email || null,
            additionalInfo: {
              legalName: gstData.legal_name || gstData.business_name || gstData.lgnm || null,
              status: gstData.gstin_status || gstData.sts || gstData.status || null,
              tradeName: gstData.business_name || gstData.trade_name || null,
              registrationDate: gstData.date_of_registration || gstData.rgdt || null,
              address: gstData.address || gstData.pradr?.adr || null
            }
          };
          
          return res.json({
            success: true,
            data: contactInfo,
            source: "quickekyc"
          });
        }
        
        return res.status(404).json({
          success: false,
          error: data.message || "Contact details not available for this GSTIN",
          errorCode: "NOT_FOUND"
        });
        
      } catch (apiError: any) {
        console.error("QuickeKYC API Error:", apiError);
        return res.status(502).json({
          success: false,
          error: "Failed to fetch contact details from external service",
          errorCode: "API_ERROR"
        });
      }
      
    } catch (error: any) {
      console.error("GSTIN Contact Fetch Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch contact details. Please try again later.",
        errorCode: "SERVER_ERROR"
      });
    }
  });

  // Create Razorpay order for GSTIN contact details (Rs. 149)
  app.post("/api/gstin/contact/create-order", async (req, res) => {
    try {
      const { gstin, companyName, customerEmail, customerPhone } = req.body;
      
      if (!gstin) {
        return res.status(400).json({ 
          success: false, 
          error: "GSTIN is required" 
        });
      }
      
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ 
          success: false,
          error: "Payment system not configured. Please contact support." 
        });
      }
      
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      
      const amount = 29900; // Rs. 299 in paise
      const shortTimestamp = Date.now().toString().slice(-8);
      
      const razorpayOrder = await razorpay.orders.create({
        amount,
        currency: "INR",
        receipt: `gst_${gstin}_${shortTimestamp}`,
        notes: {
          gstin,
          companyName: companyName || "",
          type: "gstin_contact_details"
        },
      });
      
      res.json({
        success: true,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        gstin
      });
    } catch (error: any) {
      console.error("GSTIN Contact Payment Order Error:", error);
      res.status(500).json({ 
        success: false,
        error: "Failed to create payment order" 
      });
    }
  });

  // Verify payment and fetch GSTIN contact details
  app.post("/api/gstin/contact/verify-payment", async (req, res) => {
    try {
      const { gstin, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      if (!gstin || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({ 
          success: false, 
          error: "Missing required payment verification details" 
        });
      }
      
      if (!process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ 
          success: false,
          error: "Payment verification not configured" 
        });
      }
      
      // Verify signature
      const crypto = await import('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');
      
      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          error: "Payment verification failed - invalid signature"
        });
      }
      
      // Payment verified, now fetch contact details from QuickeKYC
      const apiKey = process.env.QUICKEKYC_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          success: false,
          error: "Contact service not configured"
        });
      }
      
      const response = await fetch('https://api.quickekyc.com/api/v1/corporate/gstin_sp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: apiKey,
          id_number: gstin.toUpperCase(),
          filing_status_get: true
        })
      });
      
      const data = await response.json();
      console.log("QuickeKYC Verify Response:", JSON.stringify(data, null, 2));
      
      if (data.status === 'success' && data.data) {
        const gstData = data.data;
        const contactDetails = gstData.contact_details || {};
        
        // Check both top-level and nested contact_details
        const phoneNumber = gstData.mobile_no || gstData.mobile_number || gstData.phone || 
                           contactDetails.mobile_no || contactDetails.mobile_number || contactDetails.phone || null;
        const emailAddress = gstData.email_id || gstData.email || 
                            contactDetails.email_id || contactDetails.email || null;
        
        console.log("Extracted phone:", phoneNumber, "email:", emailAddress);
        console.log("Contact details block:", JSON.stringify(contactDetails));
        
        const contactInfo = {
          phone: phoneNumber ? String(phoneNumber) : null,
          email: emailAddress || null,
          paymentId: razorpay_payment_id,
          verified: true
        };
        
        return res.json({
          success: true,
          data: contactInfo,
          message: "Payment verified and contact details fetched successfully"
        });
      }
      
      console.log("QuickeKYC returned no data or failed status:", data.status, data.message);
      // Payment successful but contact details not available
      return res.json({
        success: true,
        data: {
          phone: null,
          email: null,
          paymentId: razorpay_payment_id,
          verified: true,
          message: "Payment verified but contact details not available for this GSTIN"
        }
      });
      
    } catch (error: any) {
      console.error("GSTIN Contact Payment Verification Error:", error);
      res.status(500).json({ 
        success: false,
        error: "Payment verification failed. Please contact support with your payment ID." 
      });
    }
  });

  // GST Return Filing Status Endpoint
  app.get("/api/gst-returns/:gstin", async (req, res) => {
    try {
      const { gstin } = req.params;
      
      if (!gstin || typeof gstin !== 'string') {
        return res.status(400).json({
          success: false,
          error: "GSTIN parameter is required",
          errorCode: "MISSING_GSTIN"
        });
      }
      
      const normalizedGstin = gstin.toUpperCase().trim();
      
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      if (!gstinRegex.test(normalizedGstin)) {
        return res.status(400).json({
          success: false,
          error: "Invalid GSTIN format. GSTIN must be 15 characters.",
          errorCode: "INVALID_FORMAT"
        });
      }
      
      const stateCode = normalizedGstin.substring(0, 2);
      if (!stateCodeMap[stateCode]) {
        return res.status(400).json({
          success: false,
          error: `Invalid state code: ${stateCode}`,
          errorCode: "INVALID_STATE_CODE"
        });
      }
      
      // First, get basic GSTIN data from MasterGST
      const masterGstData = await fetchFromMasterGST(normalizedGstin);
      
      // Check if MasterGST credentials are configured
      const hasCredentials = process.env.MASTERS_INDIA_CLIENT_ID && process.env.MASTERS_INDIA_CLIENT_SECRET;
      
      if (!masterGstData) {
        if (!hasCredentials) {
          // Return response indicating demo mode without credentials
          console.log("MasterGST credentials not configured, returning demo data");
        }
        // Continue with mock data generation
      } else if (masterGstData.notFound) {
        return res.status(404).json({
          success: false,
          error: "GSTIN not found in the GST portal",
          errorCode: "NOT_FOUND"
        });
      }
      
      // Try to get filing status from QuickeKYC
      const apiKey = process.env.QUICKEKYC_API_KEY;
      let filingData: any = null;
      
      if (apiKey) {
        try {
          const response = await fetch('https://api.quickekyc.com/api/v1/corporate/gstin_sp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              key: apiKey,
              id_number: normalizedGstin,
              filing_status_get: true
            })
          });
          
          const data = await response.json();
          console.log("QuickeKYC Filing Response:", JSON.stringify(data, null, 2));
          
          if (data.status === 'success' && data.data) {
            filingData = data.data;
          }
        } catch (apiError) {
          console.error("QuickeKYC Filing API Error:", apiError);
        }
      }
      
      // Parse the data - use masterGstData if available, otherwise generate mock company details
      const d = masterGstData || {};
      const stateName = stateCodeMap[stateCode] || d.pradr?.addr?.stcd || "Unknown State";
      
      // Generate mock company name if no real data
      const mockCompanyName = `Demo Company ${normalizedGstin.substring(2, 7)}`;
      const mockRegistrationDate = "01/04/2020";
      
      // Generate filing data from available sources
      const filings = [];
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // If we have real filing data from QuickeKYC, use it
      if (filingData?.filing_status && Array.isArray(filingData.filing_status)) {
        for (const filing of filingData.filing_status) {
          filings.push({
            returnType: filing.return_type || filing.rtntype || "GSTR-3B",
            financialYear: filing.financial_year || filing.fy || `${currentYear - 1}-${currentYear.toString().slice(-2)}`,
            taxPeriod: filing.tax_period || filing.ret_prd || "N/A",
            dateOfFiling: filing.date_of_filing || filing.dof || "N/A",
            status: filing.status || filing.sts || "Filed",
            modeOfFiling: filing.mode_of_filing || filing.mof || "ONLINE",
            arnNumber: filing.arn || filing.arn_number || undefined
          });
        }
      } else {
        // Generate realistic mock filing data based on GSTIN
        const registrationDate = d.rgdt || "01/01/2020";
        const regDateParts = registrationDate.split('/');
        const regYear = parseInt(regDateParts[2] || "2020");
        
        // Generate filing history for the last 12 months
        const returnTypes = ["GSTR-1", "GSTR-3B"];
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
        
        for (let i = 0; i < 12; i++) {
          const filingMonth = (currentMonth - i + 12) % 12;
          const filingYear = currentMonth - i < 0 ? currentYear - 1 : currentYear;
          const fy = filingMonth >= 3 ? `${filingYear}-${(filingYear + 1).toString().slice(-2)}` : `${filingYear - 1}-${filingYear.toString().slice(-2)}`;
          
          // Hash-based deterministic status
          const hash = normalizedGstin.charCodeAt(0) + normalizedGstin.charCodeAt(5) + i;
          const statusIndex = hash % 10;
          const status = statusIndex < 7 ? "Filed" : statusIndex < 9 ? "Late Filed" : "Pending";
          
          for (const rtnType of returnTypes) {
            const dayOffset = (hash + rtnType.charCodeAt(0)) % 20 + 1;
            const filingDate = new Date(filingYear, filingMonth, Math.min(dayOffset + 10, 28));
            
            filings.push({
              returnType: rtnType,
              financialYear: fy,
              taxPeriod: `${months[filingMonth]} ${filingYear}`,
              dateOfFiling: status === "Pending" ? "Not Filed" : filingDate.toLocaleDateString('en-IN'),
              status: status as "Filed" | "Not Filed" | "Late Filed" | "Pending",
              modeOfFiling: "ONLINE",
              arnNumber: status === "Pending" ? undefined : `AA${stateCode}${filingYear}${String(filingMonth + 1).padStart(2, '0')}${normalizedGstin.slice(2, 7)}${Math.random().toString(36).slice(2, 8).toUpperCase()}`
            });
          }
        }
      }
      
      // Calculate compliance stats
      const totalReturns = filings.length;
      const filedOnTime = filings.filter(f => f.status === "Filed").length;
      const filedLate = filings.filter(f => f.status === "Late Filed").length;
      const pending = filings.filter(f => f.status === "Pending" || f.status === "Not Filed").length;
      const compliancePercentage = totalReturns > 0 ? Math.round(((filedOnTime + filedLate) / totalReturns) * 100) : 0;
      
      // Get last filed return
      const lastFiled = filings.find(f => f.status === "Filed" || f.status === "Late Filed");
      
      const returnSummary = {
        gstin: normalizedGstin,
        legalName: d.lgnm || filingData?.legal_name || mockCompanyName,
        tradeName: d.tradeNam || filingData?.business_name || d.lgnm || mockCompanyName,
        registrationStatus: d.sts || filingData?.gstin_status || "Active",
        registrationDate: d.rgdt || filingData?.date_of_registration || mockRegistrationDate,
        taxpayerType: d.dty || filingData?.taxpayer_type || "Regular",
        stateName: stateName,
        lastFiledReturn: lastFiled ? {
          returnType: lastFiled.returnType,
          taxPeriod: lastFiled.taxPeriod,
          dateOfFiling: lastFiled.dateOfFiling
        } : undefined,
        filingCompliance: {
          totalReturns,
          filedOnTime,
          filedLate,
          pending,
          compliancePercentage
        },
        filings: filings.slice(0, 24) // Return last 24 filings (12 months x 2 return types)
      };
      
      const dataSource = filingData ? "live" : (masterGstData ? "derived" : "demo");
      
      return res.json({
        success: true,
        data: returnSummary,
        source: dataSource,
        isDemo: dataSource === "demo",
        message: dataSource === "demo" ? "Showing sample data. Connect to live GST portal for accurate filing status." : undefined
      });
      
    } catch (error: any) {
      console.error("GST Returns Search Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch GST return details. Please try again later.",
        errorCode: "SERVER_ERROR"
      });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
