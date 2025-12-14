import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useLocation } from "@/hooks/useLocation";
import { useLocationBySlug, useAreaBySlug } from "@/lib/api";
import Navbar from "@/components/Navbar";
import MiniNavbar from "@/components/MiniNavbar";
import HeroSection from "@/components/HeroSection";
import LocalizedIntro from "@/components/LocalizedIntro";
import LocalTestimonials from "@/components/LocalTestimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWorksSection";
import ResourcesSection from "@/components/ResourcesSection";
import FaqSection from "@/components/FaqSection";
import WorkspaceCards from "@/components/WorkspaceCards";
import MobileContactButton from "@/components/MobileContactButton";
import SmartRecommendationSection from "@/components/SmartRecommendationSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Area } from "@shared/schema";
import { AlertCircle } from "lucide-react";
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import SEO from "@/components/SEO";
import VirtualOfficeStructuredData from "@/components/VirtualOfficeStructuredData";

// Helper function to get a deterministic area image from Unsplash
function getAreaImage(areaName: string, cityName: string): string {
  // List of high-quality area/district/neighborhood images from Unsplash
  const areaImages = [
    "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
    "https://images.unsplash.com/photo-1520520731457-9283dd14aa66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1519687170479-c48e2be85313?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];
  
  // Use the combined length of area and city name to pick an image
  // This ensures consistency for the same area/city combination
  const combinedLength = (areaName.length + cityName.length) % areaImages.length;
  return areaImages[combinedLength];
}

interface LocationPageProps {
  areaSlug?: string;
}

export default function LocationPage({ areaSlug }: LocationPageProps) {
  console.log("LocationPage rendering with areaSlug:", areaSlug);
  
  // SEO will be handled by the SEO component
  
  // This component can be rendered in different contexts:
  // 1. As a direct component via Route with params (/:location)
  // 2. As a child component with props passed (/:location/:area)
  // So we need to handle both cases
  
  // Get location slug from wouter params or from the URL directly
  const [, params] = useRoute<{ location: string; area?: string }>('/:location/:area?');
  console.log("Route params:", params);
  
  const locationSlug = params?.location || window.location.pathname.split('/')[1];
  console.log("Resolved locationSlug:", locationSlug);
  
  const { currentLocation, setLocation, allLocations } = useLocation();
  const { data: locationData, isLoading: locationLoading } = useLocationBySlug(locationSlug);
  console.log("locationData:", locationData);
  
  // For area pages, use either the passed prop or the URL param
  const actualAreaSlug = areaSlug || params?.area;
  console.log("Resolved actualAreaSlug:", actualAreaSlug);
  
  const { data: areaData, isLoading: areaLoading } = useAreaBySlug(
    locationSlug, 
    actualAreaSlug
  );
  console.log("areaData:", areaData, "isLoading:", areaLoading);
  
  const [isAreaMode, setIsAreaMode] = useState(Boolean(actualAreaSlug && actualAreaSlug.length > 0));
  
  // If the URL location doesn't match the current context location, update it
  useEffect(() => {
    // Update location context if needed
    if (locationSlug && allLocations.length > 0) {
      const matchedLocation = allLocations.find(loc => loc.slug === locationSlug);
      if (matchedLocation && (!currentLocation || currentLocation.slug !== locationSlug)) {
        setLocation(matchedLocation);
      }
    }
    
    // Set area mode based on whether area slug exists
    setIsAreaMode(Boolean(actualAreaSlug && actualAreaSlug.length > 0));
  }, [locationSlug, actualAreaSlug, allLocations, currentLocation, setLocation]);
  
  // SEO is now handled by SEO component

  // If we're loading or don't have location data yet, show a loading skeleton
  const isLoading = locationLoading || (isAreaMode && areaLoading);
  const missingData = !locationData || (isAreaMode && !areaData);
  
  if (isLoading || missingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="h-96 bg-gray-100 relative">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }
  
  // Handle area not found case
  if (isAreaMode && !areaData && !areaLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Area Not Found</AlertTitle>
            <AlertDescription>
              The area "{actualAreaSlug}" could not be found in {locationData.name}. 
              Please check the URL and try again.
            </AlertDescription>
          </Alert>
          
          <div className="text-center">
            <button 
              onClick={() => window.location.href = `/${locationData.slug}`}
              className="text-blue-600 hover:underline"
            >
              Back to {locationData.name} main page
            </button>
          </div>
        </div>
        <Footer location={locationData} />
      </div>
    );
  }

  // Determine which content to show (area specific or general location)
  const title = isAreaMode 
    ? `${areaData?.name} - ${locationData.name}` 
    : locationData.name;
  
  // Render the appropriate page based on whether we're in area mode
  if (isAreaMode && areaData) {
    return (
      <div className="min-h-screen bg-background">
        <SEO location={locationData} area={areaData} />
        <VirtualOfficeStructuredData location={locationData} />
        <Navbar />
        
        {/* Area Hero - Improved readability */}
        <header className="relative bg-slate-900 text-white">
          <div className="absolute inset-0 z-0 opacity-30 bg-center bg-cover" 
               style={{ 
                 backgroundImage: `url(${areaData.heroImage || 
                 getAreaImage(areaData.name, locationData.name)})` 
               }} 
               aria-hidden="true" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col items-start max-w-3xl">
              <div className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded mb-4">
                {locationData.name}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {areaData.name}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed max-w-2xl">
                {areaData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="bg-white text-blue-900 hover:bg-blue-50 px-7 py-3.5 rounded-md font-semibold text-center text-base"
                >
                  Contact Us
                </a>
                <a 
                  href="#how-it-works" 
                  className="bg-blue-700 hover:bg-blue-800 text-white px-7 py-3.5 rounded-md font-semibold text-center text-base"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mini Navbar */}
        <MiniNavbar locationSlug={locationData.slug} />
        
        {/* Area Content */}
        <section id="benefits" className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 leading-tight">About {areaData.name}</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6 leading-relaxed tracking-wide">{areaData.description}</p>
              
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Location Details</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Address:</strong> {areaData.address}
                </p>
                {areaData.zipCode && (
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <strong>Zip Code:</strong> {areaData.zipCode}
                  </p>
                )}
              </div>
              
              <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-lg text-blue-900 mb-2">Why Choose a Virtual Office in {areaData.name}?</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {areaData.name} offers strategic advantages for businesses looking to establish a presence in {locationData.name}, 
                  including excellent connectivity, professional environment, and proximity to key business districts.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-5 text-gray-900">Quick Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2.5 px-3 py-1 rounded">
                    Area
                  </span>
                  <span className="text-gray-700 font-medium">{areaData.name}</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 text-sm font-medium mr-2.5 px-3 py-1 rounded">
                    City
                  </span>
                  <span className="text-gray-700 font-medium">{locationData.name}</span>
                </li>
                {areaData.isPopular && (
                  <li className="flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2.5 px-3 py-1 rounded">
                      Popular
                    </span>
                    <span className="text-gray-700 font-medium">High demand location</span>
                  </li>
                )}
              </ul>
              
              <div className="mt-6 pt-5 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Area Benefits</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="text-primary mr-2">•</div>
                    <span>Premium business district</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary mr-2">•</div>
                    <span>Well-connected location</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary mr-2">•</div>
                    <span>Professional business environment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Reuse regular location components with improved semantic structure */}
        <main>
          <section id="how-it-works" aria-labelledby="how-it-works-area-heading">
            <span id="how-it-works-area-heading" className="sr-only">How Virtual Office Works in {areaData.name}</span>
            <HowItWorksSection />
          </section>
          
          <section id="testimonials" aria-labelledby="testimonials-area-heading">
            <span id="testimonials-area-heading" className="sr-only">Client Testimonials from {areaData.name}</span>
            <LocalTestimonials location={locationData} />
          </section>
          
          <section id="documents" aria-labelledby="documents-area-heading">
            <span id="documents-area-heading" className="sr-only">Required Documents for Virtual Office in {areaData.name}</span>
            <ResourcesSection />
          </section>
          
          <section id="workspaces" aria-labelledby="workspaces-area-heading">
            <span id="workspaces-area-heading" className="sr-only">Featured Workspaces in {areaData.name}</span>
            <WorkspaceCards location={locationData} />
          </section>
          
          <section id="faq" aria-labelledby="faq-area-heading">
            <span id="faq-area-heading" className="sr-only">Frequently Asked Questions about Virtual Offices in {areaData.name}</span>
            <FaqSection location={locationData} />
          </section>
          
          <section id="contact" aria-labelledby="contact-area-heading">
            <span id="contact-area-heading" className="sr-only">Contact Us for Virtual Office in {areaData.name}</span>
            <ContactSection location={locationData} />
          </section>
        </main>
        <Footer location={locationData} />
        <MobileContactButton location={locationData} />
      </div>
    );
  }

  // Default location page
  return (
    <div className="min-h-screen bg-background">
      <SEO location={locationData} />
      <VirtualOfficeStructuredData location={locationData} />
      <Navbar />
      <HeroSection location={locationData} />
      <MiniNavbar locationSlug={locationData.slug} />
      <main>
        <section id="workspaces" aria-labelledby="workspaces-heading">
          <span id="workspaces-heading" className="sr-only">Featured Workspaces</span>
          <WorkspaceCards location={locationData} />
        </section>
        <section id="benefits" aria-labelledby="benefits-heading">
          <span id="benefits-heading" className="sr-only">Key Benefits</span>
          <LocalizedIntro location={locationData} />
        </section>
        <section id="how-it-works" aria-labelledby="how-it-works-heading">
          <span id="how-it-works-heading" className="sr-only">How It Works</span>
          <HowItWorksSection />
        </section>
        <section id="testimonials" aria-labelledby="testimonials-heading">
          <span id="testimonials-heading" className="sr-only">Client Testimonials</span>
          <LocalTestimonials location={locationData} />
        </section>
        <section id="documents" aria-labelledby="documents-heading">
          <span id="documents-heading" className="sr-only">Resources & Documents</span>
          <ResourcesSection />
        </section>
        <section id="faq" aria-labelledby="faq-heading">
          <span id="faq-heading" className="sr-only">Frequently Asked Questions</span>
          <FaqSection location={locationData} />
        </section>
        <section id="contact" aria-labelledby="contact-heading">
          <span id="contact-heading" className="sr-only">Contact Us</span>
          <ContactSection location={locationData} />
        </section>
      </main>
      <Footer location={locationData} />
      <MobileContactButton location={locationData} />
    </div>
  );
}