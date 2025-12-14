import { useState, useRef, useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import { MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CitySelector() {
  const { currentLocation, allLocations } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <div className="relative w-full md:w-auto z-[9999999]" id="city-selector" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <div 
        className="city-selector-trigger flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 cursor-pointer w-full md:w-auto hover:border-primary transition-colors duration-200"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <MapPin className="text-primary mr-2 h-5 w-5" />
          <span className="font-medium text-gray-800 truncate">{currentLocation?.name || "Select City"}</span>
        </div>
        <ChevronDown className={`ml-2 text-gray-500 h-4 w-4 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-64 max-h-[60vh] overflow-y-auto z-50">
          <div className="sticky top-0 bg-white pb-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Select a city</h3>
          </div>
          
          <div className="grid grid-cols-1 mt-2 gap-1">
            {allLocations.map(city => (
              <a
                href={`/${city.slug}`}
                key={city.id}
                className={cn(
                  "city-item px-3 py-2 rounded hover:bg-gray-50 transition-colors flex items-center",
                  currentLocation?.id === city.id ? "bg-blue-50 text-blue-600" : "text-gray-600"
                )}
              >
                <MapPin className={cn(
                  "h-4 w-4 mr-2", 
                  currentLocation?.id === city.id ? "text-blue-600" : "text-gray-400"
                )} />
                <span className={currentLocation?.id === city.id ? "font-medium" : ""}>
                  {city.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}