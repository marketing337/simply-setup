import { useEffect, useState } from "react";
import { Link, useLocation as useWouterLocation } from "wouter";
import {
  MapPin,
  Filter,
  Building2,
  ArrowRight,
  CheckSquare,
  Map as MapIcon,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  X,
  User,
  Star,
  Users,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import OptimizedImage from "../components/OptimizedImage";
import ContactForm from "@/components/ContactForm";
import GetStartedZohoForm from "../components/GetStartedZohoForm";
import SalesPersonCards from "@/components/SalesPersonCards";
import ExternalResources from "@/components/ExternalResources";
import InternalResources from "@/components/InternalResources";
import { Location, Area, Workspace } from "@shared/schema";
import { useLocation } from "../hooks/useLocation";
import { formatCurrency } from "../lib/utils";

interface WorkspacesPageProps {
  citySlug?: string;
  areaSlug?: string;
}

// Mobile Components for Reels-like Experience
function MobileWorkspaceCard({
  workspace,
  locationName,
  areaName,
}: {
  workspace: Workspace;
  locationName: string;
  areaName: string;
}) {
  const handleNavigate = () => {
    window.location.href = `/virtual-office/${workspace.slug}`;
  };

  return (
    <div className="h-screen w-full snap-start snap-always flex flex-col relative bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {workspace.images && workspace.images.length > 0 ? (
          <OptimizedImage
            src={workspace.images[0]}
            alt={workspace.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
            <Building2 className="h-20 w-20 text-blue-400" />
          </div>
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 pb-12">
        {/* Location Badge */}
        <div className="flex items-center mb-4">
          <div className="bg-white bg-opacity-90 rounded-full px-3 py-1 flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-blue-600" />
            <span className="text-xs font-medium text-gray-800">
              {locationName}
            </span>
            {areaName && (
              <>
                <span className="mx-1 text-gray-600">•</span>
                <span className="text-xs text-gray-600">{areaName}</span>
              </>
            )}
          </div>
          {workspace.isActive && (
            <Badge className="ml-2 bg-green-500 text-white">Available</Badge>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
          Virtual Office at {workspace.name}
        </h2>

        {/* Description */}
        <p className="text-white text-opacity-90 mb-4 line-clamp-3">
          {workspace.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {workspace.amenities &&
            workspace.amenities.slice(0, 4).map((amenity, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1"
              >
                <span className="text-xs text-white font-medium">
                  {amenity}
                </span>
              </div>
            ))}
          {workspace.amenities && workspace.amenities.length > 4 && (
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs text-white font-medium">
                +{workspace.amenities.length - 4} more
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleNavigate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg"
        >
          View Details <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default function WorkspacesPage({
  citySlug,
  areaSlug,
}: WorkspacesPageProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredWorkspaces, setFilteredWorkspaces] = useState<Workspace[]>([]);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Filters
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [areas, setAreas] = useState<Area[]>([]);
  const [areasForLocation, setAreasForLocation] = useState<Area[]>([]);
  const [showGetStartedForm, setShowGetStartedForm] = useState(false);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] =
    useState(false);
  // Grid view only - list view disabled

  const { currentLocation } = useLocation();
  const [, setWouterLocation] = useWouterLocation();

  // Fetch areas for a specific location
  const fetchAreasForLocation = async (locationId: number) => {
    try {
      const response = await fetch(`/api/locations/${locationId}/areas`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      // Ensure data is an array
      const areasData = Array.isArray(data) ? data : [];
      setAreasForLocation(areasData);
    } catch (error) {
      console.error(`Error fetching areas for location ${locationId}:`, error);
      setAreasForLocation([]);
    }
  };

  // Fetch all areas across all locations
  const fetchAllAreas = async () => {
    try {
      // Get all locations first
      const locationsResponse = await fetch("/api/locations");

      if (!locationsResponse.ok) {
        throw new Error(
          `Error ${locationsResponse.status}: ${locationsResponse.statusText}`,
        );
      }

      const locationsData = await locationsResponse.json();
      const locationsArray = Array.isArray(locationsData) ? locationsData : [];

      // For each location, fetch its areas
      const areaPromises = locationsArray.map(async (loc: Location) => {
        try {
          const areasResponse = await fetch(`/api/locations/${loc.id}/areas`);

          if (!areasResponse.ok) {
            console.error(
              `Error fetching areas for location ${loc.id}: ${areasResponse.statusText}`,
            );
            return [];
          }

          const areasData = await areasResponse.json();
          return Array.isArray(areasData) ? areasData : [];
        } catch (err) {
          console.error(`Error processing areas for location ${loc.id}:`, err);
          return [];
        }
      });

      // Wait for all area requests to complete
      const areasNestedResults = await Promise.all(areaPromises);

      // Flatten the nested array of areas
      const allAreas = areasNestedResults.flat();
      setAreas(allAreas);
    } catch (error) {
      console.error("Error fetching all areas:", error);
      setAreas([]);
    }
  };

  // Check URL parameters for filters
  useEffect(() => {
    // Get URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const locationParam = searchParams.get("location");
    const areaParam = searchParams.get("area");

    // Store these for later use
    if (locationParam) {
      // If locationParam is a slug (string), find the corresponding location ID
      if (isNaN(parseInt(locationParam))) {
        const locationObject = locations.find(
          (loc) => loc.slug === locationParam,
        );
        if (locationObject) {
          setSelectedLocation(locationObject.id.toString());
          fetchAreasForLocation(locationObject.id);
        }
      } else {
        // If locationParam is already an ID
        setSelectedLocation(locationParam);
        fetchAreasForLocation(parseInt(locationParam));
      }
    }

    if (areaParam) {
      setSelectedArea(areaParam);
    }
  }, [locations]);

  // Handle URL-based area selection from areaSlug prop
  useEffect(() => {
    if (areaSlug && areas.length > 0) {
      // Find area by slug and set it as selected
      const areaBySlug = areas.find((area) => area.slug === areaSlug);
      if (areaBySlug) {
        setSelectedArea(areaBySlug.id.toString());

        // Also ensure the correct location is selected
        const areaLocation = locations.find(
          (loc) => loc.id === areaBySlug.locationId,
        );
        if (areaLocation) {
          setSelectedLocation(areaLocation.id.toString());
          fetchAreasForLocation(areaLocation.id);
        }
      }
    } else if (!areaSlug) {
      // If no area slug in URL, reset area selection to "all"
      setSelectedArea("all");
    }
  }, [areaSlug, areas, locations]);

  // Fetch workspaces and locations on initial load
  useEffect(() => {
    // Fetch all workspaces
    fetch("/api/workspaces")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        const workspaceData = Array.isArray(data) ? data : [];
        setWorkspaces(workspaceData);
        setFilteredWorkspaces(workspaceData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
        // Set empty array to avoid errors
        setWorkspaces([]);
        setFilteredWorkspaces([]);
        setIsLoading(false);
      });

    // Fetch all locations
    fetch("/api/locations")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        const locationsData = Array.isArray(data) ? data : [];
        setLocations(locationsData);

        // If we have a citySlug, use it to set the selected location
        if (citySlug) {
          const locationBySlug = locationsData.find(
            (loc) => loc.slug === citySlug,
          );
          if (locationBySlug) {
            setSelectedLocation(locationBySlug.id.toString());
            fetchAreasForLocation(locationBySlug.id);
          }
        }
        // Otherwise use the preferred location from context if available and no query params
        else if (currentLocation && !window.location.search) {
          setSelectedLocation(currentLocation.id.toString());
          fetchAreasForLocation(currentLocation.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
        setLocations([]);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Fetch all areas
    fetchAllAreas();
  }, [currentLocation, citySlug]);

  // Apply filters when filter values change
  useEffect(() => {
    // Check if workspaces array exists and has items
    if (!workspaces || workspaces.length === 0) {
      setFilteredWorkspaces([]);
      return;
    }

    let filtered = [...workspaces];

    // Apply location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter(
        (workspace) => workspace.locationId === parseInt(selectedLocation),
      );
    }

    // Apply area filter
    if (selectedArea !== "all") {
      filtered = filtered.filter(
        (workspace) => workspace.areaId === parseInt(selectedArea),
      );
    }

    // Apply price filter
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map((p) => parseInt(p));
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter(
          (workspace) =>
            Number(workspace.monthlyPrice) >= min &&
            Number(workspace.monthlyPrice) <= max,
        );
      } else if (!isNaN(min) && isNaN(max)) {
        // For "10000+" case
        filtered = filtered.filter(
          (workspace) => Number(workspace.monthlyPrice) >= min,
        );
      }
    }

    // Apply search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (workspace) =>
          workspace.name.toLowerCase().includes(query) ||
          workspace.description.toLowerCase().includes(query) ||
          workspace.address.toLowerCase().includes(query) ||
          (workspace.amenities &&
            workspace.amenities.some((amenity) =>
              amenity.toLowerCase().includes(query),
            )),
      );
    }

    setFilteredWorkspaces(filtered);
  }, [selectedLocation, selectedArea, priceRange, searchQuery, workspaces]);

  // Handle location selection with URL navigation
  const handleLocationSelection = (locationValue: string) => {
    if (locationValue === "all") {
      // Navigate to base virtual office page
      setWouterLocation("/virtual-office");
    } else {
      // Find the location slug for the selected location ID
      const selectedLocationObj = locations.find(
        (loc) => loc.id.toString() === locationValue,
      );
      if (selectedLocationObj) {
        setWouterLocation(`/virtual-office/${selectedLocationObj.slug}`);
      }
    }

    setSelectedLocation(locationValue);
    setSelectedArea("all"); // Reset area when changing location
  };

  // Update areas when location changes
  useEffect(() => {
    if (selectedLocation !== "all") {
      fetchAreasForLocation(parseInt(selectedLocation));
      // Reset area selection when location changes
      setSelectedArea("all");
    } else {
      setAreasForLocation([]);
    }
  }, [selectedLocation]);

  // Mobile auto-scroll functionality for smooth UX
  useEffect(() => {
    if (hasAutoScrolled || typeof window === "undefined") return;

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    let isHandling = false;

    const handleFirstScroll = (e: Event) => {
      if (hasAutoScrolled || isHandling) return;

      isHandling = true;
      setHasAutoScrolled(true);

      // Prevent default scroll behavior temporarily
      e.preventDefault();

      // Immediately scroll to workspace section
      const workspaceSection = document.querySelector(
        ".mobile-workspace-container",
      );
      if (workspaceSection) {
        const rect = workspaceSection.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = scrollTop + rect.top;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    };

    const handleFirstTouch = () => {
      if (hasAutoScrolled) return;

      // Set up scroll listener for the next scroll event
      window.addEventListener("scroll", handleFirstScroll, {
        once: true,
        passive: false,
      });
    };

    // Listen for touch start to prepare for scroll
    window.addEventListener("touchstart", handleFirstTouch, {
      once: true,
      passive: true,
    });
    // Also listen for wheel events on devices with mouse
    window.addEventListener("wheel", handleFirstScroll, {
      once: true,
      passive: false,
    });

    // Cleanup function
    return () => {
      window.removeEventListener("touchstart", handleFirstTouch);
      window.removeEventListener("wheel", handleFirstScroll);
      window.removeEventListener("scroll", handleFirstScroll);
    };
  }, [hasAutoScrolled]);

  // Back to top functionality for mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Grid view is the only option now

  // Get location name by ID
  const getLocationName = (locationId: number) => {
    const location = locations.find((loc) => loc.id === locationId);
    return location ? location.name : "Unknown Location";
  };

  // Get area name by ID
  const getAreaName = (areaId: number | null) => {
    if (!areaId) return "";
    const area = areas.find((a) => a.id === areaId);
    return area ? area.name : "";
  };

  // Get area slug by ID
  const getAreaSlug = (areaId: number | null) => {
    if (!areaId) return "";
    const area = areas.find((a) => a.id === areaId);
    return area ? area.slug : "";
  };

  // Get location slug by ID
  const getLocationSlug = (locationId: number) => {
    const location = locations.find((l) => l.id === locationId);
    return location ? location.slug : "";
  };

  // Handle area selection with URL navigation
  const handleAreaSelection = (areaValue: string) => {
    const currentLocationSlug = getLocationSlug(parseInt(selectedLocation));

    if (areaValue === "all") {
      // Navigate to city page without area
      if (currentLocationSlug) {
        setWouterLocation(`/virtual-office/${currentLocationSlug}`);
      }
    } else {
      // Find the area slug for the selected area ID
      const selectedAreaObj = areasForLocation.find(
        (area) => area.id.toString() === areaValue,
      );
      if (selectedAreaObj && currentLocationSlug) {
        setWouterLocation(
          `/virtual-office/${currentLocationSlug}/${selectedAreaObj.slug}`,
        );
      }
    }

    setSelectedArea(areaValue);
  };

  return (
    <>
      <SEO
        title={
          citySlug && locations.length > 0
            ? `${locations.find((loc) => loc.slug === citySlug)?.name || "Virtual Office"} Virtual Office Solutions - SimplySetup`
            : "Virtual Office Solutions for Business - SimplySetup"
        }
        description={
          citySlug && locations.length > 0
            ? `Browse our selection of virtual office solutions in ${locations.find((loc) => loc.slug === citySlug)?.name || "your city"}. Find the perfect professional business address for your company's GST registration.`
            : "Browse our selection of virtual office solutions across multiple locations in India. Find the perfect professional business address for your company."
        }
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Affordable Virtual Office Solutions in{" "}
              {areaSlug && areas.length > 0 && citySlug && locations.length > 0
                ? `${areas.find((area) => area.slug === areaSlug)?.name || ""}, ${locations.find((loc) => loc.slug === citySlug)?.name || ""}`
                : citySlug && locations.length > 0
                ? locations.find((loc) => loc.slug === citySlug)?.name ||
                  "India"
                : "India"}
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Get a prestigious business address for GST registration, company
              incorporation, and professional correspondence.
            </p>
            <Dialog
              open={showGetStartedForm}
              onOpenChange={setShowGetStartedForm}
            >
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader className="sr-only">
                  <DialogTitle>Get Started Form</DialogTitle>
                </DialogHeader>
                <GetStartedZohoForm
                  locationName={
                    citySlug && locations.length > 0
                      ? locations.find((loc) => loc.slug === citySlug)?.name
                      : undefined
                  }
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Sales Person Card */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {citySlug && locations.length > 0 && (
            <SalesPersonCards
              locationId={
                locations.find((loc) => loc.slug === citySlug)?.id || 0
              }
            />
          )}
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        {/* Filters section */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm p-3 mb-6 md:static md:bg-white md:rounded-lg md:shadow-sm md:border md:backdrop-blur-none md:z-auto">
          <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-3">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-medium">Quick Filters</h2>
              </div>

              {/* Mobile toggle button */}
              <button
                className="md:hidden flex items-center justify-center text-muted-foreground"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                aria-expanded={filtersExpanded}
                aria-controls="filter-controls"
              >
                {filtersExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div
            id="filter-controls"
            className={`grid gap-3 ${
              !filtersExpanded ? "hidden md:grid" : ""
            } grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search virtual offices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Select
                value={selectedLocation}
                onValueChange={handleLocationSelection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id.toString()}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Area</label>
              <Select
                value={selectedArea}
                onValueChange={handleAreaSelection}
                disabled={
                  selectedLocation === "all" || areasForLocation.length === 0
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {areasForLocation.map((area) => (
                    <SelectItem key={area.id} value={area.id.toString()}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price per month</label>
              <Select
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-1000">Under ₹1,000</SelectItem>
                  <SelectItem value="1000-5000">₹1,000 - ₹5,000</SelectItem>
                  <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                  <SelectItem value="10000-">₹10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedLocation("all");
                  setSelectedArea("all");
                  setPriceRange("all");
                  setSearchQuery("");
                }}
              >
                Reset filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading virtual offices..."
              : `Showing ${filteredWorkspaces.length} virtual office${filteredWorkspaces.length !== 1 ? "s" : ""}`}
            {selectedLocation !== "all" && (
              <span> in {getLocationName(parseInt(selectedLocation))}</span>
            )}
            {selectedArea !== "all" && (
              <span> ({getAreaName(parseInt(selectedArea))})</span>
            )}
          </p>
        </div>

        {/* Workspaces listing */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(8)].map((_, index) => (
              <WorkspaceCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredWorkspaces.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No virtual offices found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query to find more options.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedLocation("all");
                setSelectedArea("all");
                setPriceRange("all");
                setSearchQuery("");
              }}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet Grid View */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredWorkspaces.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  locationName={getLocationName(workspace.locationId)}
                  areaName={getAreaName(workspace.areaId)}
                />
              ))}
            </div>

            {/* Mobile Reels-like View */}
            <div className="md:hidden mobile-workspace-container">
              <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
                {filteredWorkspaces.map((workspace) => (
                  <MobileWorkspaceCard
                    key={workspace.id}
                    workspace={workspace}
                    locationName={getLocationName(workspace.locationId)}
                    areaName={getAreaName(workspace.areaId)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* FAQ Section - Only show on city pages */}
        {citySlug && (
          <section className="py-12 bg-gray-50">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Frequently Asked Questions - Virtual Office in {locations.find(loc => loc.slug === citySlug)?.name || 'Your City'}
                </h2>
                <p className="text-muted-foreground">
                  Everything you need to know about virtual office services in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="what-is-virtual-office" className="border-b">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="text-lg font-medium">
                        What is a virtual office in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="text-muted-foreground space-y-3">
                        <p>
                          A virtual office in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'} is a professional business address service that allows you to establish your company's presence without the need for a physical office space.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Professional business address</li>
                              <li>Mail receiving and forwarding</li>
                              <li>GST registration support</li>
                              <li>Address proof documentation</li>
                              <li>Call forwarding service</li>
                              <li>Meeting room access (plans vary)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Perfect For:</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Startups and new businesses</li>
                              <li>Remote workers and freelancers</li>
                              <li>Small businesses expanding to {locations.find(loc => loc.slug === citySlug)?.name || 'new markets'}</li>
                              <li>Companies needing GST registration</li>
                              <li>Businesses wanting professional credibility</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cost-pricing" className="border-b">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="text-lg font-medium">
                        How much does a virtual office cost in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="text-muted-foreground space-y-3">
                        <p>
                          Virtual office pricing in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'} is designed to be affordable and competitive, starting from just ₹699 per month.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Basic Plan</h4>
                            <p className="text-xl font-bold text-primary mb-2">₹699/month</p>
                            <ul className="text-sm space-y-1">
                              <li>• Business address</li>
                              <li>• Mail receiving</li>
                              <li>• GST registration</li>
                              <li>• Address proof</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Premium Plan</h4>
                            <p className="text-xl font-bold text-primary mb-2">₹1,299/month</p>
                            <ul className="text-sm space-y-1">
                              <li>• Everything in Basic</li>
                              <li>• Call forwarding</li>
                              <li>• Meeting room (4hrs)</li>
                              <li>• Priority support</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Enterprise Plan</h4>
                            <p className="text-xl font-bold text-primary mb-2">₹2,499/month</p>
                            <ul className="text-sm space-y-1">
                              <li>• Everything in Premium</li>
                              <li>• Dedicated phone line</li>
                              <li>• Meeting room (12hrs)</li>
                              <li>• Multiple locations</li>
                            </ul>
                          </div>
                        </div>
                        <p className="text-sm">
                          <strong>Setup fee:</strong> One-time ₹999 for documentation. No hidden charges, cancel anytime.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="registration-process" className="border-b">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="text-lg font-medium">
                        How to register for virtual office in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="text-muted-foreground space-y-3">
                        <p>
                          Getting started with a virtual office in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'} is simple and can be completed in just a few steps:
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Choose Your Plan</h4>
                              <p className="text-sm">Select the virtual office plan that best fits your business needs and budget.</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Submit Documents</h4>
                              <p className="text-sm">Provide required documents like PAN, Aadhaar, business registration papers, and identity proofs.</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Verification & Approval</h4>
                              <p className="text-sm">Our team verifies your documents and approves your virtual office address within 24-48 hours.</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">4</div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Start Using Your Address</h4>
                              <p className="text-sm">Receive your address proof documents and start using your professional business address immediately.</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>⚡ Fast Track:</strong> Need urgent setup? Our express service can get your virtual office 
                            ready within 6 hours for an additional ₹500 fee.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="gst-registration" className="border-b">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="text-lg font-medium">
                        Can I use virtual office for GST registration in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="text-muted-foreground space-y-3">
                        <p>
                          <strong>Yes, absolutely!</strong> Virtual office addresses are fully valid and accepted by the GST department for business registration in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">GST Registration Benefits:</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li><strong>Instant Eligibility:</strong> Get GST number immediately with valid commercial address</li>
                              <li><strong>Input Tax Credit:</strong> Claim ITC on all business purchases and expenses</li>
                              <li><strong>Interstate Business:</strong> Conduct business across India with proper compliance</li>
                              <li><strong>Professional Credibility:</strong> Build trust with clients and suppliers</li>
                              <li><strong>Government Acceptance:</strong> 100% legal and department-approved addresses</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Required Documents for GST with Virtual Office:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <ul className="list-disc pl-6 space-y-1">
                                <li>PAN Card of business/proprietor</li>
                                <li>Aadhaar Card of authorized signatory</li>
                                <li>Address proof from virtual office provider</li>
                                <li>Bank account statement</li>
                              </ul>
                              <ul className="list-disc pl-6 space-y-1">
                                <li>Business registration certificate (if any)</li>
                                <li>NOC from virtual office provider</li>
                                <li>Rent agreement copy</li>
                                <li>Board resolution (for companies)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>✅ Government Approved:</strong> Our virtual office addresses in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'} are 
                            pre-verified with GST authorities and come with all necessary documentation for smooth registration.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="business-benefits" className="border-b">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="text-lg font-medium">
                        What are the business benefits of virtual office in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="text-muted-foreground space-y-3">
                        <p>
                          Choosing a virtual office in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'} provides numerous strategic business advantages:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Financial Benefits:</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li><strong>Cost Savings:</strong> Save 80-90% compared to physical office rent</li>
                              <li><strong>No Security Deposits:</strong> Avoid large upfront payments</li>
                              <li><strong>Tax Benefits:</strong> Claim virtual office expenses as business costs</li>
                              <li><strong>Reduced Overhead:</strong> No utilities, maintenance, or facility costs</li>
                              <li><strong>Flexible Scaling:</strong> Upgrade or downgrade plans as needed</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Business Advantages:</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li><strong>Professional Image:</strong> Prime {locations.find(loc => loc.slug === citySlug)?.name || 'business district'} address</li>
                              <li><strong>Market Expansion:</strong> Establish presence in new markets quickly</li>
                              <li><strong>Remote Operations:</strong> Work from anywhere while maintaining local presence</li>
                              <li><strong>Client Trust:</strong> Professional address builds credibility</li>
                              <li><strong>Legal Compliance:</strong> Meet all regulatory requirements</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Success Statistics:</h4>
                          <p className="text-sm">
                            Businesses using virtual offices in {locations.find(loc => loc.slug === citySlug)?.name || 'major cities'} report 65% faster market entry, 
                            40% cost reduction in operations, and 80% improvement in professional credibility among clients and partners.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="legal-compliance">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="text-lg font-medium">
                        Is virtual office legally valid for all business registrations in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="text-muted-foreground space-y-3">
                        <p>
                          <strong>Yes, virtual offices are 100% legally valid</strong> and accepted by all government departments and regulatory bodies in India.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Government Department Acceptance:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <ul className="list-disc pl-6 space-y-1">
                                <li><strong>MCA (Ministry of Corporate Affairs):</strong> Company registration</li>
                                <li><strong>GST Department:</strong> GST registration and compliance</li>
                                <li><strong>Income Tax Department:</strong> PAN and TAN applications</li>
                                <li><strong>RBI:</strong> Banking and financial services</li>
                              </ul>
                              <ul className="list-disc pl-6 space-y-1">
                                <li><strong>State Government:</strong> Trade licenses and permits</li>
                                <li><strong>DGFT:</strong> Import Export Code (IEC)</li>
                                <li><strong>MSME Ministry:</strong> MSME registration</li>
                                <li><strong>EPF & ESI:</strong> Employee compliance</li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Legal Framework Support:</h4>
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <ul className="text-sm space-y-1">
                                <li>• <strong>Companies Act 2013:</strong> Section 12 allows registered office at shared premises</li>
                                <li>• <strong>GST Act 2017:</strong> Virtual offices accepted under Place of Business rules</li>
                                <li>• <strong>FEMA Guidelines:</strong> Valid for foreign investment and compliance</li>
                                <li>• <strong>Supreme Court Ruling:</strong> Virtual offices recognized as valid business addresses</li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Documentation Provided:</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Registered office address proof certificate</li>
                              <li>No Objection Certificate (NOC) from property owner</li>
                              <li>Rent agreement with proper stamp duty payment</li>
                              <li>Municipal corporation verification certificate</li>
                              <li>Utility bills and property tax receipts</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>⚖️ Legal Guarantee:</strong> We provide complete legal compliance documentation and 
                            take full responsibility for the validity of your virtual office address in {locations.find(loc => loc.slug === citySlug)?.name || 'this city'}.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
        )}

        {/* External Resources Section - Only show on city pages */}
        {citySlug && (
          <div className="container mx-auto px-4 py-8">
            <ExternalResources citySlug={citySlug} areaSlug={areaSlug} />
            <InternalResources citySlug={citySlug} areaSlug={areaSlug} />
          </div>
        )}
      </main>

      {/* Back to Top Button - Mobile Only */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 md:hidden"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <Footer location={null} />
    </>
  );
}

function WorkspaceCard({
  workspace,
  locationName,
  areaName,
}: {
  workspace: Workspace;
  locationName: string;
  areaName: string;
}) {
  const handleNavigate = () => {
    window.location.href = `/virtual-office/${workspace.slug}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div
        className="cursor-pointer flex flex-col h-full"
        onClick={handleNavigate}
      >
        <div className="aspect-video relative overflow-hidden">
          {workspace.images && workspace.images.length > 0 ? (
            <OptimizedImage
              src={workspace.images[0]}
              alt={workspace.name}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Building2 className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          {workspace.isActive && (
            <Badge className="absolute top-2 right-2 bg-green-500">
              Available
            </Badge>
          )}
        </div>

        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{locationName}</span>
            {areaName && (
              <>
                <span className="mx-1 flex-shrink-0">•</span>
                <span className="truncate">{areaName}</span>
              </>
            )}
          </div>

          <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-1">
            Virtual Office at {workspace.name}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
            {workspace.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {workspace.amenities &&
              workspace.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            {workspace.amenities && workspace.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{workspace.amenities.length - 3} more
              </Badge>
            )}
          </div>

          <Separator className="my-2 sm:my-3" />

          <div className="flex justify-between items-center mt-auto">
            <Button variant="ghost" size="sm" className="text-primary">
              <span className="hidden sm:inline">View Details</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function WorkspaceListItem({
  workspace,
  locationName,
  areaName,
}: {
  workspace: Workspace;
  locationName: string;
  areaName: string;
}) {
  const handleNavigate = () => {
    window.location.href = `/virtual-office/${workspace.slug}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div
          className="block md:w-1/3 lg:w-1/4 cursor-pointer"
          onClick={handleNavigate}
        >
          <div className="aspect-video md:h-full relative overflow-hidden">
            {workspace.images && workspace.images.length > 0 ? (
              <OptimizedImage
                src={workspace.images[0]}
                alt={workspace.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Building2 className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            {workspace.isActive && (
              <Badge className="absolute top-2 right-2 bg-green-500">
                Available
              </Badge>
            )}
          </div>
        </div>

        <div className="p-3 flex-1">
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{locationName}</span>
            {areaName && (
              <>
                <span className="mx-1">•</span>
                <span>{areaName}</span>
              </>
            )}
          </div>

          <div
            className="hover:underline cursor-pointer"
            onClick={handleNavigate}
          >
            <h3 className="font-medium text-base mb-1">Virtual Office at {workspace.name}</h3>
          </div>

          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {workspace.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-2">
            {workspace.amenities &&
              workspace.amenities.slice(0, 3).map((amenity, index) => (
                <div key={index} className="flex items-center text-xs">
                  <CheckSquare className="h-2.5 w-2.5 mr-1 text-primary" />
                  <span>{amenity}</span>
                </div>
              ))}
            {workspace.amenities && workspace.amenities.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{workspace.amenities.length - 3} more
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground truncate pr-2">
              {workspace.address}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleNavigate}
              className="shrink-0"
            >
              Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function WorkspaceCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-3 flex-1 flex flex-col">
        <div className="h-3 bg-muted rounded animate-pulse w-2/3 mb-1" />
        <div className="h-4 bg-muted rounded animate-pulse w-4/5 mb-1" />
        <div className="h-3 bg-muted rounded animate-pulse w-full mb-2" />

        <div className="flex gap-1 mb-2 flex-wrap">
          <div className="h-4 bg-muted rounded animate-pulse w-12" />
          <div className="h-4 bg-muted rounded animate-pulse w-12" />
          <div className="h-4 bg-muted rounded animate-pulse w-12" />
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="h-4 bg-muted rounded animate-pulse w-16" />
          <div className="h-7 bg-muted rounded animate-pulse w-16" />
        </div>
      </div>
    </Card>
  );
}
