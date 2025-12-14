import { useState, useRef, useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import { MapPin, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Location } from "@shared/schema";

interface HeroCitySelectorProps {
  location: Location;
}

export default function HeroCitySelector({ location }: HeroCitySelectorProps) {
  const { allLocations, currentLocation } = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayLocation, setDisplayLocation] = useState<Location>(location);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Use the correct location based on the most accurate source
  useEffect(() => {
    // Priority 1: Use the prop location if valid
    if (location && location.id) {
      setDisplayLocation(location);
    } 
    // Priority 2: Use the context's currentLocation if available
    else if (currentLocation) {
      setDisplayLocation(currentLocation);
    }
  }, [location, currentLocation]);
  
  // Filter locations based on search term
  const filteredLocations = searchTerm.trim() === "" 
    ? allLocations 
    : allLocations.filter((loc: Location) => 
        loc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    // Reset search when opening
    if (!modalOpen) {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    // Focus the search input when modal opens
    if (modalOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [modalOpen]);

  useEffect(() => {
    // Add click outside listener
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false);
      }
    }

    // Only add the listener if the modal is open
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <>
      {/* City Selector Button */}
      <div 
        className="w-full hero-search-element flex items-center justify-between cursor-pointer bg-white"
        onClick={toggleModal}
      >
        <div className="flex items-center h-full px-3">
          <MapPin className="text-gray-500 h-4 w-4 mr-2" />
          <span className="text-base font-medium text-gray-900">{displayLocation.name}</span>
        </div>
        <div className="pr-3">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
      
      {/* City Selector Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 sm:p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-none sm:rounded-lg shadow-xl w-full max-w-xl max-h-[100vh] sm:max-h-[90vh] h-full sm:h-auto flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-2xl font-bold">Select a City</h3>
              <button 
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Search Box */}
            <div className="px-6 py-4">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="block w-full px-4 py-4 border border-gray-200 rounded-md text-lg text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Search for a city…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* City Grid */}
            <div className="overflow-y-auto px-6 py-4 flex-grow">
              {filteredLocations.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No cities match your search</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                  {filteredLocations.map((city: Location) => (
                    <a
                      key={city.id}
                      href={`/${city.slug}`}
                      className={cn(
                        "text-xl md:text-base hover:text-blue-600 py-2 sm:py-0",
                        displayLocation.slug === city.slug ? "text-blue-600 font-medium" : "text-gray-700"
                      )}
                      onClick={toggleModal}
                    >
                      {city.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}