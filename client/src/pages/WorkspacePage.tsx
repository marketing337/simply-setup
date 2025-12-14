import { useEffect, useState, useRef } from "react";
import { useParams, useRoute } from "wouter";
import { useWorkspaceBySlug, useLocationBySlug, useAreaById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useVendorById } from "@/lib/api-vendors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Calendar,
  CheckSquare,
  MapPin,
  Phone,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { WorkspaceImage } from "@/components/SEOOptimizedImage";
import { useLocation } from "@/hooks/useLocation";
import { formatCurrency } from "@/lib/utils";
import { Workspace, Location, Area, Vendor } from "@shared/schema";
import MobileContactButton from "@/components/MobileContactButton";
import ContactForm from "@/components/ContactForm";
import SimplyVerifiedSeal from "@/components/SimplyVerifiedSeal";
import SalesPersonCards from "@/components/SalesPersonCards";
import NearbyAreasSection from "@/components/NearbyAreasSection";

export default function WorkspacePage() {
  // Get slug parameter from the URL - check all potential routes
  const [match, params] = useRoute<{ slug: string }>(
    "/virtual-office-space/:slug",
  );
  const [legacyMatch, legacyParams] = useRoute<{ slug: string }>(
    "/workspaces/:slug",
  );
  const [virtualOfficeMatch, virtualOfficeParams] = useRoute<{ slug: string }>(
    "/virtual-office/:slug",
  );

  // Try to get the slug from any of the route params
  let slug = params?.slug || legacyParams?.slug || virtualOfficeParams?.slug;

  // If we're coming from a direct URL, extract the slug from the pathname
  if (!slug) {
    const path = window.location.pathname;
    slug = path.split("/").pop() || "";
  }

  console.log(
    "WorkspacePage rendering with match:",
    match,
    "legacyMatch:",
    legacyMatch,
    "virtualOfficeMatch:",
    virtualOfficeMatch,
    "resolved slug:",
    slug,
  );

  const { data: workspaceData, isLoading: workspaceLoading } =
    useWorkspaceBySlug(slug);
  const [locationData, setLocationData] = useState<Location | null>(null);
  const [areaData, setAreaData] = useState<Area | null>(null);
  const { setLocation } = useLocation();

  // State for collapsible sections on mobile
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(true);
  const [featuresExpanded, setFeaturesExpanded] = useState(true);

  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use undefined when vendorId is null to avoid type error
  const vendorId = workspaceData?.vendorId ? workspaceData.vendorId : undefined;
  const { data: vendorData } = useVendorById(vendorId);

  // Optimized data fetching with React Query for better performance
  const { data: locations } = useQuery<Location[]>({
    queryKey: ['/api/locations'],
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Optimized area data fetching using React Query
  const { data: areaDataQuery } = useQuery<Area>({
    queryKey: ['/api/areas', workspaceData?.areaId],
    queryFn: () => fetch(`/api/areas/${workspaceData!.areaId}`).then(res => res.json()),
    enabled: !!workspaceData?.areaId,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Set area data when query completes
  useEffect(() => {
    if (areaDataQuery && !areaData) {
      setAreaData(areaDataQuery);
    }
  }, [areaDataQuery, areaData]);

  // Derived location data from cached locations
  useEffect(() => {
    if (workspaceData && locations && !locationData) {
      const location = locations.find((loc: Location) => loc.id === workspaceData.locationId);
      
      if (location) {
        setLocationData(location);
        // Store location for global context without navigation
        try {
          localStorage.setItem("virtualoffice_location", JSON.stringify(location));
          // Set in the context but don't navigate (true parameter prevents navigation)
          setLocation(location, true);
        } catch (e) {
          console.error("Failed to save location to localStorage:", e);
        }
      }
    }
  }, [workspaceData, locations, locationData, setLocation]);

  if (workspaceLoading) {
    return <WorkspacePageSkeleton />;
  }

  if (!workspaceData) {
    return (
      <>
        <Navbar />
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Virtual Office Not Found</h1>
          <p className="mb-8">
            The virtual office you're looking for doesn't exist or may have been
            moved.
          </p>
          <Button asChild variant="default">
            <a href="/">Return to Home</a>
          </Button>
        </div>
        <Footer location={null} />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Virtual Office at ${workspaceData.name} - Virtual Office ${locationData?.name || ''} | SimplySetup`}
        description={`${workspaceData.description.slice(0, 160)}...`}
        location={locationData}
        area={areaData}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "OfficeSpace",
          "name": `Virtual Office at ${workspaceData.name}`,
          "description": workspaceData.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": workspaceData.address,
            "addressLocality": locationData?.name,
            "addressCountry": "IN"
          },
          "geo": workspaceData.mapCoordinates ? {
            "@type": "GeoCoordinates",
            "latitude": workspaceData.mapCoordinates.split(',')[0]?.trim(),
            "longitude": workspaceData.mapCoordinates.split(',')[1]?.trim()
          } : undefined,
          "offers": {
            "@type": "Offer",
            "name": "Virtual Office Services",
            "price": workspaceData.monthlyPrice,
            "priceCurrency": "INR"
          },
          "image": workspaceData.images?.[0] || "",
          "provider": {
            "@type": "Organization",
            "name": "SimplySetup",
            "url": "https://simplysetup.com"
          }
        }}
      />
      <Navbar />
      
      {/* Breadcrumb Navigation */}
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {locationData && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/virtual-office/${locationData.slug}`}>
                    {locationData.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>Virtual Office at {workspaceData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="container max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Header Section */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                Virtual Office at {workspaceData.name}
              </h1>

              {/* SimplyVerified Seal */}
              <div>
                <SimplyVerifiedSeal size="md" />
              </div>

              {locationData && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground text-sm md:text-base">
                    {workspaceData.address}, {locationData.name}
                  </span>
                </div>
              )}
            </div>

            {/* Enhanced Images gallery */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              {workspaceData.images && workspaceData.images.length > 0 ? (
                <div className="space-y-3">
                  {/* Main image with navigation */}
                  <div className="relative aspect-video overflow-hidden">
                    <WorkspaceImage
                      src={workspaceData.images[currentImageIndex]}
                      workspace={workspaceData}
                      location={locationData}
                      area={areaData}
                      imageIndex={currentImageIndex}
                      totalImages={workspaceData.images.length}
                      className="w-full h-full object-cover"
                      priority={currentImageIndex === 0}
                      loading={currentImageIndex === 0 ? "eager" : "lazy"}
                    />

                    {/* Navigation arrows for mobile swipe simulation */}
                    {workspaceData.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev > 0
                                ? prev - 1
                                : workspaceData.images!.length - 1,
                            )
                          }
                          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev < workspaceData.images!.length - 1
                                ? prev + 1
                                : 0,
                            )
                          }
                          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} /{" "}
                          {workspaceData.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail gallery - hidden on mobile, shown on desktop */}
                  {workspaceData.images.length > 1 && (
                    <div className="hidden md:block p-4">
                      <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
                        {workspaceData.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                              index === currentImageIndex
                                ? "border-primary shadow-md"
                                : "border-transparent hover:border-muted-foreground"
                            }`}
                          >
                            <WorkspaceImage
                              src={image}
                              workspace={workspaceData}
                              location={locationData}
                              area={areaData}
                              imageIndex={index}
                              totalImages={workspaceData.images.length}
                              imageDescription={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No images available</p>
                </div>
              )}
            </div>

            {/* Vendor Logo */}
            {vendorData && vendorData.logo && (
              <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
                <div
                  className="h-10 md:h-12 w-auto flex items-center"
                  style={{ color: vendorData.colorCode || "#000000" }}
                >
                  <img
                    src={vendorData.logo}
                    alt={`${vendorData.name} logo`}
                    className="h-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Sales Person Cards */}
            {(locationData || areaData) && (locationData?.id || areaData?.locationId) && (
              <SalesPersonCards locationId={locationData?.id || areaData?.locationId!} />
            )}

            {/* Fixed Pricing Section */}
            <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
                Available Plans
              </h2>
              <div className="space-y-3">
                {/* Business Address Plan */}
                <div className="border rounded-lg p-3 md:p-4 border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                        Business Address
                      </h4>
                    </div>
                    <span className="text-base md:text-lg font-bold text-green-600 self-start sm:self-center">
                      30% Off
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 leading-relaxed">
                    Professional business address for your company registration and correspondence
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Business Address
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Mail Handling
                    </Badge>
                  </div>
                </div>

                {/* GST Registration Plan */}
                <div className="border rounded-lg p-3 md:p-4 border-primary bg-primary/5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                        GST Registration
                      </h4>
                      <Badge variant="default" className="text-xs px-2 py-0.5">
                        Popular
                      </Badge>
                    </div>
                    <span className="text-base md:text-lg font-bold text-green-600 self-start sm:self-center">
                      Best Price
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 leading-relaxed">
                    Complete GST registration package with business address and tax compliance support
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      GST Registration
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Business Address
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Tax Compliance
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Government Liaison
                    </Badge>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Document Support
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
                About this space
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {workspaceData.description}
                </p>
              </div>
            </div>

            {/* Amenities - Collapsible on mobile */}
            {workspaceData.amenities && workspaceData.amenities.length > 0 && (
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <button
                  onClick={() => setAmenitiesExpanded(!amenitiesExpanded)}
                  className="w-full p-4 md:p-6 flex items-center justify-between bg-gray-50 md:bg-white md:cursor-default"
                >
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Amenities ({workspaceData.amenities.length})
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform md:hidden ${
                      amenitiesExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`p-4 md:p-6 pt-0 md:pt-0 ${amenitiesExpanded ? "block" : "hidden md:block"}`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {workspaceData.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <CheckSquare className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Additional features - Collapsible on mobile */}
            {workspaceData.features && workspaceData.features.length > 0 && (
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <button
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="w-full p-4 md:p-6 flex items-center justify-between bg-gray-50 md:bg-white md:cursor-default"
                >
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Features ({workspaceData.features.length})
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform md:hidden ${
                      featuresExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`p-4 md:p-6 pt-0 md:pt-0 ${featuresExpanded ? "block" : "hidden md:block"}`}
                >
                  <div className="flex flex-wrap gap-2">
                    {workspaceData.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1 text-sm"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar - Sticky on desktop */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-4 md:space-y-6">
              {/* Contact Card */}
              <Card className="border shadow-lg">
                <div className="p-5 md:p-6">
                  {workspaceData.contactPhone && (
                    <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          Call us directly
                        </p>
                        <a
                          href={`tel:${workspaceData.contactPhone}`}
                          className="text-sm font-medium hover:underline text-gray-900"
                        >
                          {workspaceData.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="w-full" data-contact-form>
                    <ContactForm />
                  </div>
                </div>
              </Card>

              {/* Location Card */}
              {locationData && (
                <Card className="border shadow-lg overflow-hidden">
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
                      Location
                    </h3>
                    <div className="flex items-start mb-4">
                      <MapPin className="w-4 h-4 mr-3 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {workspaceData.address}, {locationData.name}
                      </p>
                    </div>
                  </div>

                  {/* Google Maps preview */}
                  {workspaceData.mapCoordinates ? (
                    <div className="aspect-video overflow-hidden">
                      <iframe
                        title="Google Maps Location"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${workspaceData.mapCoordinates}`}
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted flex flex-col items-center justify-center mx-5 md:mx-6 mb-5 md:mb-6 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-3">
                        Map not available
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workspaceData.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center text-primary hover:underline font-medium"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open in Google Maps
                      </a>
                    </div>
                  )}
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Benefits of Virtual Office Section */}
      <section className="py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Benefits of Virtual Office in {workspaceData.name}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover why {workspaceData.name} is the perfect choice for your virtual office needs in {locationData?.name || 'this prime location'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prime Business Address</h3>
              <p className="text-sm text-gray-600">
                Establish your business presence at {workspaceData.name}, a prestigious address in {locationData?.name || 'prime location'} that enhances your company's credibility and professional image with clients and partners.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GST Registration Ready</h3>
              <p className="text-sm text-gray-600">
                Fully compliant address for GST registration and all government filings. Our {workspaceData.name} location is pre-approved by tax authorities, ensuring smooth business registration processes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Call Handling</h3>
              <p className="text-sm text-gray-600">
                Dedicated phone number with professional call answering and forwarding services. Never miss important business calls with our comprehensive communication solutions at {workspaceData.name}.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-100">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Meeting Room Access</h3>
              <p className="text-sm text-gray-600">
                Access to fully-equipped meeting rooms and conference facilities at {workspaceData.name} when you need to meet clients or conduct important business meetings in person.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-lg border border-red-100">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mail & Package Handling</h3>
              <p className="text-sm text-gray-600">
                Secure mail receiving, sorting, and forwarding services. All your business correspondence at {workspaceData.name} is handled professionally and delivered to you promptly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-100">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost-Effective Solution</h3>
              <p className="text-sm text-gray-600">
                Save 80-90% compared to traditional office rental costs while maintaining a professional business presence. Get all benefits of {workspaceData.name} without the overhead expenses.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Choose {workspaceData.name}?</h3>
              <p className="text-sm text-gray-600 max-w-3xl mx-auto">
                Located in the heart of {locationData?.name || 'prime business district'}, {workspaceData.name} offers unmatched connectivity, 
                prestigious address recognition, and access to a thriving business ecosystem. Our virtual office solutions provide 
                everything you need to establish and grow your business with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required Section */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Documents Required for Virtual Office in {workspaceData.name}
            </h2>
            <p className="text-muted-foreground">
              Simple documentation process to get your virtual office set up quickly at {workspaceData.name}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                Individual/Proprietorship Documents
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">PAN Card:</strong>
                    <span className="text-gray-600"> Copy of valid PAN card of the business owner</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Aadhaar Card:</strong>
                    <span className="text-gray-600"> Government-issued identity proof of authorized signatory</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Address Proof:</strong>
                    <span className="text-gray-600"> Residential address proof (utility bill/rent agreement)</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Passport Photo:</strong>
                    <span className="text-gray-600"> Recent passport-size photographs of the business owner</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                Company/LLP Documents
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Certificate of Incorporation:</strong>
                    <span className="text-gray-600"> Company registration certificate from MCA</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Memorandum & Articles:</strong>
                    <span className="text-gray-600"> MOA and AOA of the company</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Director Details:</strong>
                    <span className="text-gray-600"> PAN and Aadhaar of all directors/partners</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Board Resolution:</strong>
                    <span className="text-gray-600"> Resolution authorizing virtual office setup</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                Banking & Financial Documents
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Bank Statement:</strong>
                    <span className="text-gray-600"> Latest 3 months bank statement (business account preferred)</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Cancelled Cheque:</strong>
                    <span className="text-gray-600"> Cancelled cheque leaf for account verification</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">TAN/GST (if applicable):</strong>
                    <span className="text-gray-600"> Existing tax registration certificates</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                Additional Information
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Processing Time:</strong> 24-48 hours after document submission</span>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Document Format:</strong> Clear scanned copies or photographs accepted</span>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Verification:</strong> Our team verifies all documents for authenticity</span>
                </li>
                <li className="flex items-start">
                  <CheckSquare className="w-4 h-4 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Support:</strong> Dedicated assistance for document preparation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>💡 Pro Tip:</strong> Have all documents ready before applying to expedite your virtual office setup at {workspaceData.name}. 
                Our team will guide you through any document-related queries during the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      <NearbyAreasSection 
        workspaceName={workspaceData.name}
        cityName={locationData?.name}
        areaName={areaData?.name}
      />

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about {workspaceData.name}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="advantages" className="border-b">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    What are the Advantages of Virtual Office in {workspaceData.name}?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      Choosing a virtual office at {workspaceData.name} offers numerous advantages for your business:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Professional Business Address:</strong> Establish your business presence in {locationData?.name || 'a prime location'} without the overhead costs of physical office space.
                      </li>
                      <li>
                        <strong>GST Registration:</strong> Use this address for GST registration and all government compliances, ensuring your business is legally compliant.
                      </li>
                      <li>
                        <strong>Mail Handling:</strong> Professional mail receiving and forwarding services to keep your business communications organized.
                      </li>
                      <li>
                        <strong>Cost Effective:</strong> Significant savings compared to traditional office rentals while maintaining a professional image.
                      </li>
                      <li>
                        <strong>Flexibility:</strong> Scale your business without being tied to long-term lease commitments.
                      </li>
                      {workspaceData.amenities?.includes('Meeting Room') && (
                        <li>
                          <strong>Meeting Facilities:</strong> Access to professional meeting rooms when needed for client meetings or presentations.
                        </li>
                      )}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="documents" className="border-b">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    What documents are required for Virtual Office in {locationData?.name || 'this location'}?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>To set up your virtual office, you'll need the following documents:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">For Individual/Proprietorship:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>PAN Card copy</li>
                          <li>Aadhaar Card copy</li>
                          <li>Passport size photographs</li>
                          <li>Bank account details</li>
                          <li>Business registration documents (if any)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">For Companies/LLP:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Certificate of Incorporation</li>
                          <li>MOA & AOA</li>
                          <li>Directors' PAN & Aadhaar</li>
                          <li>Board Resolution</li>
                          <li>Authorized signatory details</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm">
                      <strong>Note:</strong> Additional documents may be required based on your specific business type and registration requirements.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="address" className="border-b">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    What will be my Virtual Office Address at {workspaceData.name}?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>Your virtual office address will be:</p>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">{workspaceData.name}</p>
                          <p className="text-sm">{workspaceData.address}</p>
                          {locationData && (
                            <p className="text-sm">{locationData.name}</p>
                          )}
                          {areaData?.zipCode && (
                            <p className="text-sm">PIN: {areaData.zipCode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <p>
                      This professional address can be used for all your business correspondence, 
                      government registrations, and official documentation. You'll receive a 
                      formal address proof document that you can use for various business purposes.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="registration" className="border-b">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    Can I register my company on this virtual office?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      <strong>Yes, absolutely!</strong> Our virtual office address is fully compliant 
                      for company registration and government filings.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">You can register:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Private Limited Company</li>
                          <li>Limited Liability Partnership (LLP)</li>
                          <li>One Person Company (OPC)</li>
                          <li>Partnership Firm</li>
                          <li>Proprietorship</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Government registrations:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>GST Registration</li>
                          <li>Import Export Code (IEC)</li>
                          <li>MSME Registration</li>
                          <li>Professional Tax</li>
                          <li>Trade License</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>💡 Pro Tip:</strong> We also provide end-to-end company registration services. 
                        Our experts can help you with the entire process, from document preparation to 
                        final registration, making it hassle-free for you.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pricing" className="border-b">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    How much does virtual office cost at {workspaceData.name}?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      Our virtual office plans at {workspaceData.name} are designed to be affordable and flexible for businesses of all sizes.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Basic Plan</h4>
                        <p className="text-xl font-bold text-primary mb-2">₹699/month</p>
                        <ul className="text-sm space-y-1">
                          <li>• Business address for registration</li>
                          <li>• Mail receiving service</li>
                          <li>• GST registration support</li>
                          <li>• Address proof documents</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Premium Plan</h4>
                        <p className="text-xl font-bold text-primary mb-2">₹1,299/month</p>
                        <ul className="text-sm space-y-1">
                          <li>• Everything in Basic Plan</li>
                          <li>• Call forwarding service</li>
                          <li>• Meeting room access (4 hours/month)</li>
                          <li>• Priority customer support</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm">
                      <strong>Setup fee:</strong> One-time ₹999 for documentation and registration. 
                      <strong>No hidden charges</strong> - transparent pricing with no annual contracts required.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="gst-benefits" className="border-b">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    What are the GST benefits of virtual office in {locationData?.name || 'this location'}?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      Using a virtual office for GST registration in {locationData?.name || 'this location'} provides significant tax and compliance advantages:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Direct GST Benefits:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Instant GST Registration:</strong> Immediate eligibility for GST number with valid commercial address</li>
                          <li><strong>Input Tax Credit (ITC):</strong> Claim ITC on business purchases and expenses</li>
                          <li><strong>Interstate Business:</strong> Conduct business across India with proper GST compliance</li>
                          <li><strong>Digital Invoicing:</strong> Issue GST-compliant invoices to clients nationwide</li>
                          <li><strong>Threshold Benefits:</strong> Access to composition scheme if turnover is under ₹1.5 crore</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">State-Specific Advantages in {locationData?.name || 'Maharashtra'}:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Access to state government incentives and subsidies</li>
                          <li>Simplified compliance under state GST regulations</li>
                          <li>Professional tax benefits for {locationData?.name || 'Maharashtra'} registered businesses</li>
                          <li>Eligibility for state startup schemes and grants</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>🎯 Expert Tip:</strong> Virtual office GST registration is 100% legal and accepted by the GST department. 
                        You can start claiming ITC immediately after registration and expand your business nationwide.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="vs-coworking" className="border-b">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    Virtual office vs coworking space - which is better for my business?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      The choice between virtual office and coworking space depends on your business needs and work style:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Choose Virtual Office If:</h4>
                        <ul className="text-sm space-y-1">
                          <li>• You work from home or remotely</li>
                          <li>• Need professional address for registration</li>
                          <li>• Want to minimize overhead costs</li>
                          <li>• Require mail handling services</li>
                          <li>• Business involves mostly digital operations</li>
                          <li>• Starting a new business with limited budget</li>
                          <li>• Need GST registration address only</li>
                        </ul>
                        <p className="text-xs mt-2 font-medium text-blue-700">Cost: ₹699-1,299/month</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Choose Coworking If:</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Need dedicated workspace daily</li>
                          <li>• Collaborate with team members</li>
                          <li>• Require high-speed internet and facilities</li>
                          <li>• Meet clients frequently in person</li>
                          <li>• Need networking opportunities</li>
                          <li>• Want professional office environment</li>
                          <li>• Business requires physical presence</li>
                        </ul>
                        <p className="text-xs mt-2 font-medium text-orange-700">Cost: ₹4,000-15,000/month</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>💡 Best of Both Worlds:</strong> Many businesses start with virtual office for registration 
                        and switch to coworking as they grow. At {workspaceData.name}, you can upgrade to coworking 
                        anytime while keeping the same business address.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="startup-benefits" className="border-b">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    Is virtual office good for startups and new businesses?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      Virtual offices are ideal for startups and new businesses, offering the perfect balance of professionalism and cost-effectiveness:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Why Startups Choose Virtual Offices:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Low Initial Investment:</strong> Start your business with just ₹699/month vs ₹50,000+ for physical office</li>
                          <li><strong>Instant Credibility:</strong> Professional {locationData?.name || 'business district'} address builds trust with clients and investors</li>
                          <li><strong>Regulatory Compliance:</strong> Meet all legal requirements for company registration and GST</li>
                          <li><strong>Scalability:</strong> Easy to upgrade services as your business grows</li>
                          <li><strong>Work from Anywhere:</strong> Run your business remotely while maintaining professional presence</li>
                          <li><strong>No Long-term Commitments:</strong> Monthly plans with flexibility to change or cancel</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Startup Success Stories:</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm">
                            "Over 80% of successful Indian startups began with virtual offices. Companies like Flipkart, 
                            Ola, and BYJU'S started with minimal physical infrastructure, focusing resources on 
                            product development and customer acquisition instead of expensive office rents."
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Government Support for Virtual Offices:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Startup India registration accepted with virtual office address</li>
                          <li>Eligible for government grants and funding programs</li>
                          <li>Access to MSME benefits and subsidies</li>
                          <li>Simplified compliance under new startup policies</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>🚀 Success Formula:</strong> Virtual Office + Digital Marketing + Quality Product = 
                        Lean Startup Success. Save on overhead, invest in growth.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="legal-compliance">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-medium">
                    Is virtual office address legally valid for all business purposes?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      Yes, virtual office addresses are <strong>100% legally valid</strong> and accepted by all government departments and regulatory bodies in India:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Government Acceptance:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Ministry of Corporate Affairs (MCA):</strong> Accepts virtual offices for company registration</li>
                          <li><strong>GST Department:</strong> Virtual office is valid for GST registration and compliance</li>
                          <li><strong>Income Tax Department:</strong> Recognizes virtual office for PAN and TAN applications</li>
                          <li><strong>RBI and Banking:</strong> Banks accept virtual office for current account opening</li>
                          <li><strong>State Governments:</strong> Valid for trade licenses and professional tax registration</li>
                          <li><strong>Import Export:</strong> Accepted for IEC (Import Export Code) registration</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Legal Framework Support:</h4>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <ul className="text-sm space-y-1">
                            <li>• <strong>Companies Act 2013:</strong> Section 12 allows registered office at shared premises</li>
                            <li>• <strong>GST Act 2017:</strong> Virtual offices accepted for GST registration under Place of Business rules</li>
                            <li>• <strong>FEMA Guidelines:</strong> Virtual offices valid for foreign investment and compliance</li>
                            <li>• <strong>SEBI Regulations:</strong> Accepted for startup and small business registrations</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Documentation Provided:</h4>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Address Proof Certificate (for all registrations)</li>
                          <li>No Objection Certificate (NOC) from property owner</li>
                          <li>Rent Agreement with proper stamp duty</li>
                          <li>Utility bills in company name (if required)</li>
                          <li>Municipal corporation clearance certificate</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm">
                        <strong>⚖️ Legal Assurance:</strong> Our virtual office service complies with all Indian laws and regulations. 
                        We provide complete legal documentation to support your business registrations and compliance requirements.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 lg:hidden">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <p className="text-lg font-bold text-primary">
                Starting from ₹699
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Virtual office plans available
              </p>
            </div>
            <div className="flex gap-2">
              {workspaceData.contactPhone && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-shrink-0"
                >
                  <a href={`tel:${workspaceData.contactPhone}`}>
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </a>
                </Button>
              )}
              <Button
                size="sm"
                className="flex-shrink-0 px-6"
                onClick={() => {
                  const contactForm = document.querySelector(
                    "[data-contact-form]",
                  );
                  if (contactForm) {
                    contactForm.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
              >
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {locationData && <MobileContactButton location={locationData} />}
      <div className="pb-20 lg:pb-0">
        <Footer location={locationData} />
      </div>
    </>
  );
}

function WorkspacePageSkeleton() {
  return (
    <>
      <Navbar />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content skeleton */}
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />

            {/* Image gallery skeleton */}
            <Skeleton className="aspect-video w-full rounded-lg mb-2" />
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="aspect-square rounded-md" />
              ))}
            </div>

            {/* Vendor logo skeleton */}
            <Skeleton className="h-10 w-32 mb-5" />

            {/* Description skeleton */}
            <Skeleton className="h-6 w-1/3 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-8" />

            {/* Amenities skeleton */}
            <Skeleton className="h-6 w-1/3 mb-3" />
            <div className="flex flex-wrap gap-2 mb-8">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div>
            <Card className="p-5 mb-5">
              <Skeleton className="h-6 w-1/3 mb-3" />
              <Skeleton className="h-8 w-1/2 mb-4" />

              <Separator className="my-4" />

              <Skeleton className="h-6 w-1/2 mb-3" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />

              <Skeleton className="h-10 w-full rounded-md" />
            </Card>

            <Card className="p-5">
              <Skeleton className="h-6 w-1/3 mb-3" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="aspect-video w-full rounded-lg" />
            </Card>
          </div>
        </div>
      </main>
      <Footer location={null} />
    </>
  );
}
