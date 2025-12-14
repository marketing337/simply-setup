import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Location } from "@shared/schema";
import { useLocation as useWouterLocation } from "wouter";

// Local storage key for saved location
const SAVED_LOCATION_KEY = "virtualoffice_location";
// Cache key for bootstrap data (to avoid refetching on page refreshes)
const BOOTSTRAP_CACHE_KEY = "virtualoffice_bootstrap_cache";
// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

type LocationContextType = {
  currentLocation: Location | null;
  locationId?: number;  // Added for easy access to current location ID
  isLoading: boolean;
  error: string | null;
  allLocations: Location[];
  setLocation: (location: Location, dontNavigate?: boolean) => void;
  navigateToLocation: (slug: string) => void;
};

interface BootstrapCache {
  locations: Location[];
  defaultLocation: Location;
  timestamp: string;
  expires: number;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  // Don't show loading screen at all
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useWouterLocation();

  // Check for cached bootstrap data first before making API calls
  const getCachedBootstrapData = (): BootstrapCache | null => {
    try {
      const cached = localStorage.getItem(BOOTSTRAP_CACHE_KEY);
      if (cached) {
        const parsedCache = JSON.parse(cached) as BootstrapCache;
        // Check if cache is still valid
        if (parsedCache.expires > Date.now()) {
          return parsedCache;
        }
      }
    } catch (err) {
      console.error("Error reading bootstrap cache:", err);
    }
    return null;
  };

  // Save bootstrap data to cache
  const cacheBootstrapData = (data: any) => {
    try {
      const cacheData: BootstrapCache = {
        ...data,
        expires: Date.now() + CACHE_EXPIRATION
      };
      localStorage.setItem(BOOTSTRAP_CACHE_KEY, JSON.stringify(cacheData));
    } catch (err) {
      console.error("Error saving bootstrap cache:", err);
    }
  };

  // Handle location detection with provided locations and default location
  const handleLocationDetection = (locations: Location[], defaultLocation: Location | null) => {
    if (locations.length === 0) {
      setError("No locations available");
      return;
    }
    
    // Step 1: Try to get location from URL path first (highest priority)
    const path = window.location.pathname;
    // More accurate path regex that handles the root path correctly
    const slugMatch = path.match(/^\/([^\/\?]+)/);
    
    if (slugMatch && slugMatch[1] && slugMatch[1] !== "admin") {
      const locationSlug = slugMatch[1];
      console.log("Location detection - Found slug in URL path:", locationSlug);
      
      // Find matching location from our list
      const matchedLocation = locations.find(loc => loc.slug === locationSlug);
      
      if (matchedLocation) {
        console.log("Location detection - Setting location from URL path:", matchedLocation.name);
        setCurrentLocation(matchedLocation);
        // Save this location preference
        saveLocationToLocalStorage(matchedLocation);
        setIsLoading(false);
        return;
      }
    }

    // Step 2: If we're on the home page, don't auto-redirect - just set a default location for context
    if (window.location.pathname === "/") {
      // Try to get user's saved preference from localStorage
      const savedLocation = getSavedLocationFromLocalStorage();
      if (savedLocation) {
        const matchedLocation = locations.find(loc => loc.id === savedLocation.id);
        if (matchedLocation) {
          setCurrentLocation(matchedLocation);
          setIsLoading(false);
          return;
        }
      }
      
      // Use the default location from bootstrap data (but don't redirect)
      if (defaultLocation) {
        setCurrentLocation(defaultLocation);
        saveLocationToLocalStorage(defaultLocation);
        return;
      }
      
      // Fall back to first location if all else fails (but don't redirect)
      setCurrentLocation(locations[0]);
      saveLocationToLocalStorage(locations[0]);
      return;
    }

    // Step 3: For non-home pages, try to get user's saved preference from localStorage
    const savedLocation = getSavedLocationFromLocalStorage();
    if (savedLocation) {
      const matchedLocation = locations.find(loc => loc.id === savedLocation.id);
      if (matchedLocation) {
        setCurrentLocation(matchedLocation);
        setIsLoading(false);
        return;
      }
    }

    // Step 4: Use the default location from bootstrap data
    if (defaultLocation) {
      setCurrentLocation(defaultLocation);
      saveLocationToLocalStorage(defaultLocation);
      return;
    }
    
    // Step 5: Fall back to first location if all else fails
    setCurrentLocation(locations[0]);
    saveLocationToLocalStorage(locations[0]);
  };

  // Fetch critical application data on component mount - optimized to reduce API calls
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Check for cached data first
        const cachedData = getCachedBootstrapData();
        
        if (cachedData) {
          console.log("Using cached bootstrap data");
          setAllLocations(cachedData.locations);
          // Continue with location detection using the cached data
          handleLocationDetection(cachedData.locations, cachedData.defaultLocation);
          return;
        }
        
        // If no valid cache, fetch from API
        console.log("Fetching fresh bootstrap data");
        
        // Check URL path for city slug
        const path = window.location.pathname;
        const pathMatch = path.match(/^\/([^\/\?]+)/);
        let endpoint = "/api/bootstrap";
        
        // If we're on a specific city page, pass that as the preferred location
        if (pathMatch && pathMatch[1] && pathMatch[1] !== 'admin') {
          const citySlug = pathMatch[1];
          console.log("Found city in URL path for bootstrap:", citySlug);
          endpoint += `?preferred=${citySlug}`;
        }
        
        const response = await apiRequest("GET", endpoint);
        const bootstrapData = await response.json();
        
        // Cache the response for future use
        cacheBootstrapData(bootstrapData);
        
        // Set locations from the bootstrap data
        setAllLocations(bootstrapData.locations);
        
        // Handle location detection with the bootstrap data
        handleLocationDetection(bootstrapData.locations, bootstrapData.defaultLocation);
      } catch (err) {
        console.error("Failed to fetch bootstrap data:", err);
        setError("Failed to load application data");
        
        // Fall back to separate API calls if bootstrap fails
        fallbackToSeparateApiCalls();
      }
    };

    // Fallback to individual API calls if bootstrap endpoint fails
    const fallbackToSeparateApiCalls = async () => {
      try {
        const response = await apiRequest("GET", "/api/locations");
        const locations = await response.json();
        setAllLocations(locations);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
        setError("Failed to fetch locations");
      }
    };

    fetchInitialData();
  }, []);

  // This effect is no longer needed as we use handleLocationDetection from the bootstrap data
  // which handles all the location detection strategies more efficiently
  // We're removing this duplicate effect to avoid race conditions and improve performance

  // Save location to localStorage
  const saveLocationToLocalStorage = (location: Location) => {
    try {
      localStorage.setItem(SAVED_LOCATION_KEY, JSON.stringify(location));
    } catch (err) {
      console.error("Failed to save location to localStorage:", err);
    }
  };

  // Get saved location from localStorage
  const getSavedLocationFromLocalStorage = (): Location | null => {
    try {
      const savedLocation = localStorage.getItem(SAVED_LOCATION_KEY);
      if (savedLocation) {
        return JSON.parse(savedLocation);
      }
    } catch (err) {
      console.error("Failed to retrieve location from localStorage:", err);
    }
    return null;
  };
  
  // Clear bootstrap cache to force fresh data next time
  const clearBootstrapCache = () => {
    try {
      localStorage.removeItem(BOOTSTRAP_CACHE_KEY);
    } catch (err) {
      console.error("Failed to clear bootstrap cache:", err);
    }
  };

  // Detect location using IP address (no permissions required) - but don't auto-redirect
  const detectLocationByIP = async () => {
    try {
      // Don't set loading state to avoid showing loading screens
      const response = await apiRequest("GET", "/api/ip-location");
      const detectedLocation = await response.json();
      setCurrentLocation(detectedLocation);
      
      // Save this location for future visits
      saveLocationToLocalStorage(detectedLocation);
      
      // Don't auto-redirect to location pages anymore - let users stay on home page
    } catch (err) {
      console.error("Failed to get location from IP:", err);
      
      // If all else fails, default to the first location in our list
      if (allLocations.length > 0) {
        setCurrentLocation(allLocations[0]);
        // Don't auto-redirect to location pages anymore
      } else {
        setError("Could not determine your location");
      }
    }
  };

  const setLocationManually = (location: Location, dontNavigate = false) => {
    // Set the location in state
    setCurrentLocation(location);
    
    // Save user's selection for future visits
    saveLocationToLocalStorage(location);
    
    // Clear bootstrap cache to ensure we get fresh data that matches the selected city
    clearBootstrapCache();
    
    // Check if we're in the admin section or workspace section
    // Don't navigate to city page if in admin or workspace routes
    const currentPath = window.location.pathname;
    const isAdminRoute = currentPath.startsWith('/admin');
    const isWorkspaceRoute = currentPath.startsWith('/workspaces/');
    
    // Only navigate if explicitly not prevented and not in special routes
    if (!dontNavigate && !isAdminRoute && !isWorkspaceRoute) {
      setLocation(`/${location.slug}`);
    }
  };

  const navigateToLocation = (slug: string) => {
    console.log("useLocation hook: navigateToLocation called with slug:", slug);
    console.log("All locations:", allLocations);
    
    // First check if we have locations
    if (allLocations.length === 0) {
      console.error("useLocation hook: No locations available to navigate to");
      return;
    }
    
    const location = allLocations.find(loc => loc.slug === slug);
    if (location) {
      console.log("useLocation hook: Found location:", location.name);
      // Always navigate to location page when using this method
      setCurrentLocation(location);
      
      // Save user's selection
      saveLocationToLocalStorage(location);
      
      // Clear bootstrap cache for fresh data
      clearBootstrapCache();
      
      console.log("useLocation hook: Current pathname:", window.location.pathname);
      console.log("useLocation hook: Target pathname:", `/${location.slug}`);
      
      // Use wouter navigation
      setLocation(`/${location.slug}`);
      
      // Force a window location change to ensure navigation
      if (window.location.pathname !== `/${location.slug}`) {
        console.log("useLocation hook: Applying forced navigation to:", `/${location.slug}`);
        window.location.href = `/${location.slug}`;
      }
    } else {
      console.error("useLocation hook: Location not found for slug:", slug);
      console.error("useLocation hook: Available slugs:", allLocations.map(l => l.slug).join(", "));
    }
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        locationId: currentLocation?.id,
        isLoading,
        error,
        allLocations,
        setLocation: setLocationManually,
        navigateToLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};