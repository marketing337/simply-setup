import { Location } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Search, Building, MapPin, ChevronDown, ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { useLocation } from "@/hooks/useLocation";
import { cn } from "@/lib/utils";
import DropdownPortal from "./DropdownPortal";
import HeroCitySelector from "./HeroCitySelector";
import useEmblaCarousel from 'embla-carousel-react';
import VernacularSalutation from "./VernacularSalutation";
import FirstSlideVernacular from "./FirstSlideVernacular";

interface HeroSectionProps {
  location: Location;
}

export default function HeroSection({ location }: HeroSectionProps) {
  const { navigateToLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [areasData, setAreasData] = useState<any[]>([]);
  const [areaSearchResults, setAreaSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchAreaRef = useRef<HTMLDivElement>(null);
  
  // Initialize Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, undefined);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Setup carousel slide change monitoring
  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setCurrentSlide(emblaApi.selectedScrollSnap());
      };
      
      emblaApi.on('select', onSelect);
      
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);
  
  // Navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Fetch areas for the current location
  useEffect(() => {
    if (location && location.id) {
      fetch(`/api/locations/${location.id}/areas`)
        .then(res => res.json())
        .then(data => {
          setAreasData(data);
        })
        .catch(error => {
          console.error("Error fetching areas:", error);
        });
    }
  }, [location]);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      
      // Filter areas based on search query
      const filteredAreas = areasData.filter(area => 
        area.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setAreaSearchResults(filteredAreas);
    } else {
      setIsSearching(false);
      setAreaSearchResults([]);
    }
  }, [searchQuery, areasData]);
  
  const handleViewAllWorkspaces = () => {
    // Redirect to SEO-friendly URL with city slug in path - new format
    window.location.href = `/virtual-office/${location.slug}`;
  };
  
  const handleGetStarted = () => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative min-h-[450px] sm:min-h-[500px] w-full overflow-hidden flex items-center bg-gray-50">
      {/* Embla Carousel */}
      <div className="w-full flex items-center justify-center embla" ref={emblaRef}>
        <div className="flex w-full">
          {/* Slide 1: Virtual Office */}
          <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center py-10 sm:py-12 md:py-16 lg:py-24 carousel-slide">
            <div className="w-full max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
              {/* Main Heading */}
              <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
                {/* Vernacular Salutation with Translation */}
                <FirstSlideVernacular location={location} />
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-5 leading-tight">
                  Get Virtual Office in {location.name}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                  {location.description}
                </p>
              </div>
              
              {/* Search and Location Box */}
              <div 
                className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-5 mb-3 border border-gray-200" 
                id="location-search-box"
                aria-labelledby="location-search-heading"
              >
                <h2 id="location-search-heading" className="sr-only">Search for virtual offices in {location.name}</h2>
                <div className="flex flex-col md:flex-row gap-3">
                  {/* City Selector Dropdown */}
                  <div className="md:w-1/4">
                    <HeroCitySelector location={location} />
                  </div>
                  
                  {/* Search Input */}
                  <div className="flex-1 relative location-area-search" ref={searchAreaRef}>
                    <div className="flex items-center hero-search-element focus-within:ring-1 focus-within:ring-purple-400 focus-within:border-purple-400">
                      <label htmlFor="location-area-search-input" className="sr-only">Search for areas in {location.name}</label>
                      <div className="px-3 text-gray-500 border-0">
                        <Search className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <input 
                        type="text" 
                        className="location-search-input flex-1 px-0 text-base outline-none border-0 w-full"
                        id="location-area-search-input"
                        placeholder={`Search for areas in ${location.name}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ border: 'none' }}
                        aria-expanded={isSearching && areaSearchResults.length > 0}
                        aria-controls="area-search-results"
                      />
                    </div>
                    
                    {/* Search Results Dropdown */}
                    <DropdownPortal isOpen={isSearching && areaSearchResults.length > 0} parent={searchAreaRef.current}>
                      <div 
                        id="area-search-results" 
                        className="w-full max-h-56 overflow-auto bg-white rounded-md shadow-lg border border-gray-200"
                        role="listbox"
                      >
                        <div className="p-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-700">Areas in {location.name}</p>
                        </div>
                        <div className="py-1 area-dropdown-items">
                          {areaSearchResults.map((area) => (
                            <a
                              key={area.id}
                              href={`/virtual-office/${location.slug}/${area.slug}`}
                              className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer w-full text-left"
                              role="option"
                              onClick={() => {
                                try {
                                  // Save the current location and selected area to localStorage
                                  localStorage.setItem("virtualoffice_location", JSON.stringify(location));
                                  localStorage.setItem("virtualoffice_area", JSON.stringify(area));
                                  console.log("Saved area to localStorage before navigation:", area.slug);
                                } catch (err) {
                                  console.error("Failed to save area to localStorage:", err);
                                }
                                // Navigation will happen naturally through the href
                              }}
                            >
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" aria-hidden="true" />
                              <span className="font-medium">{area.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </DropdownPortal>
                  </div>
                  
                  <Button 
                    className="bg-purple-700 hover:bg-purple-800 text-white font-medium text-sm sm:text-base px-4 sm:px-5 py-2.5 hero-search-element"
                    onClick={handleViewAllWorkspaces}
                  >
                    View Virtual Offices
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Slide 2: GST Registration */}
          <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center py-10 sm:py-12 md:py-16 lg:py-24 carousel-slide">
            <div className="w-full max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
              <div className="text-center max-w-3xl mx-auto">
                <div className="bg-black/10 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full inline-block mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Business Registration</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-5 leading-tight px-1">
                  Virtual Office for GST Registration in {location.name}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                  Register your business with a verified address in {location.name}. Get your GST registration completed quickly with our premium virtual office solutions.
                </p>
                
                <div className="flex justify-center mb-6 sm:mb-8">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 text-gray-800 text-xs sm:text-sm md:text-base text-left sm:text-center">
                    <li className="flex items-center justify-start sm:justify-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0" />
                      <span>Verified Business Address</span>
                    </li>
                    <li className="flex items-center justify-start sm:justify-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0" />
                      <span>Quick GST Registration</span>
                    </li>
                    <li className="flex items-center justify-start sm:justify-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0" />
                      <span>Mail Handling</span>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  className="bg-black hover:bg-gray-800 text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-md shadow-md flex items-center mx-auto"
                  onClick={handleGetStarted}
                >
                  Request a Callback
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Slide 3: Company Formation */}
          <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center py-10 sm:py-12 md:py-16 lg:py-24 carousel-slide">
            <div className="w-full max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
              <div className="text-center max-w-3xl mx-auto">
                <div className="bg-black/10 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full inline-block mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Company Formation</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-5 leading-tight px-1">
                  Virtual Office for Company Formation in {location.name}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                  Form your company with ease and establish a prestigious business address in {location.name}. Our virtual office packages include all essentials for new company registration.
                </p>
                
                <div className="flex justify-center mb-6 sm:mb-8">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 text-gray-800 text-xs sm:text-sm md:text-base text-left sm:text-center">
                    <li className="flex items-center justify-start sm:justify-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0" />
                      <span>Company Registration Support</span>
                    </li>
                    <li className="flex items-center justify-start sm:justify-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0" />
                      <span>Corporate Address</span>
                    </li>
                    <li className="flex items-center justify-start sm:justify-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0" />
                      <span>Document Reception</span>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  className="bg-black hover:bg-gray-800 text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-md shadow-md flex items-center mx-auto"
                  onClick={handleGetStarted}
                >
                  Request a Callback
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel navigation buttons - hidden on mobile */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all carousel-button focus:outline-none hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all carousel-button focus:outline-none hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
      
      {/* Carousel navigation dots */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            type="button"
            className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full mx-1 ${
              currentSlide === index ? 'bg-black' : 'bg-gray-300'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
}