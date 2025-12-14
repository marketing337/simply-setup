import {
  Building2,
  Crown,
  Landmark,
  Mountain,
  Waves,
  TreePine,
  Castle,
  Sun,
  Flower,
  Fish,
} from "lucide-react";

// Lazy-loaded city icon mapping to improve performance
export const getCityIcon = (cityName: string) => {
  // Optimized icon mapping with reduced set for better performance
  const iconMap: { [key: string]: any } = {
    // Major metro cities
    Mumbai: Crown,
    Delhi: Landmark,
    Bangalore: TreePine,
    Hyderabad: Castle,
    Chennai: Waves,
    Kolkata: Fish,
    Pune: Mountain,
    Ahmedabad: Sun,
    
    // Other popular cities
    Jaipur: Crown,
    Lucknow: Flower,
    Kanpur: Building2,
    Nagpur: TreePine,
    Indore: Sun,
    Gurgaon: Building2,
    Noida: Building2,
    "New Delhi": Landmark,
    "Navi Mumbai": Building2,
    Chandigarh: Building2,
    Kochi: Waves,
    Mysore: TreePine,
    
    // Fallback for other cities based on region
    default: Building2,
  };

  return iconMap[cityName] || iconMap.default;
};

// Preload frequently used icons for major cities
export const preloadCityIcons = () => {
  const majorCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", 
    "Chennai", "Kolkata", "Pune", "Ahmedabad"
  ];
  
  return majorCities.map(city => ({
    city,
    icon: getCityIcon(city)
  }));
};