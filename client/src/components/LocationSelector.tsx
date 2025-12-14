import { useState, useRef, useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import { MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import DropdownPortal from "./DropdownPortal";

export default function LocationSelector() {
  const { currentLocation, allLocations, navigateToLocation } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobileView = typeof window !== 'undefined' && 
                       window.matchMedia('(max-width: 768px)').matches;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLocationSelect = (slug: string) => {
    console.log("LocationSelector: Selecting location with slug:", slug);
    
    // Close the dropdown first
    setDropdownOpen(false);
    
    // Get location object to save in localStorage before navigation
    const location = allLocations.find(loc => loc.slug === slug);
    if (location) {
      try {
        // Save to localStorage manually
        localStorage.setItem("virtualoffice_location", JSON.stringify(location));
      } catch (err) {
        console.error("Failed to save location to localStorage:", err);
      }
    }
    
    // Force a direct location change - bypassing any React router issues
    console.log("LocationSelector: Redirecting directly to:", `/${slug}`);
    window.location.href = `/${slug}`;
  };

  return (
    <div className="relative w-full md:w-auto z-[9999999]" ref={dropdownRef}>
      <div 
        className="flex items-center justify-between border border-gray-200 rounded-full px-3 py-1.5 cursor-pointer w-full md:w-auto hover:bg-gray-50 transition-colors duration-200"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <MapPin className="text-primary mr-1.5 h-4 w-4" />
          <span className="font-medium text-gray-800 truncate text-sm">{currentLocation?.name || "Select Location"}</span>
        </div>
        <ChevronDown className={`ml-1.5 text-gray-500 h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      <DropdownPortal isOpen={dropdownOpen} parent={dropdownRef.current}>
        <div 
          className={cn(
            "bg-white rounded-lg shadow-lg py-1 overflow-y-auto border border-gray-200",
            "w-52",
            "max-h-[60vh]",
            // For mobile, make it fill more of the screen
            isMobileView && "w-[calc(100vw-3rem)] max-h-[40vh]"
          )}
        >
          <div className="sticky top-0 bg-white p-2 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-700">Select a city</h3>
          </div>
          <div className="py-1">
            {allLocations.map(location => (
              <a
                href={`/${location.slug}`}
                key={location.id}
                className={cn(
                  "flex w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors duration-150 cursor-pointer",
                  currentLocation?.id === location.id && "bg-blue-50 text-primary font-medium"
                )}
                onClick={() => {
                  try {
                    // Save to localStorage before navigating
                    localStorage.setItem("virtualoffice_location", JSON.stringify(location));
                    console.log("Saved location to localStorage before navigation:", location.slug);
                  } catch (err) {
                    console.error("Failed to save location to localStorage:", err);
                  }
                  // Navigation will happen naturally through the href
                }}
              >
                <MapPin className={cn(
                  "h-3 w-3 mr-1.5 flex-shrink-0", 
                  currentLocation?.id === location.id ? "text-primary" : "text-gray-400"
                )} />
                {location.name}
              </a>
            ))}
          </div>
        </div>
      </DropdownPortal>
    </div>
  );
}
