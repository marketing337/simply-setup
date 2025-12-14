import { Location } from '@shared/schema';
import { useLocation } from './useLocation';

export function useCurrentLocation() {
  const context = useLocation();
  
  return {
    currentLocation: context.currentLocation as Location | null,
    setCurrentLocation: context.setLocation,
    navigateToLocation: context.navigateToLocation,
    allLocations: context.allLocations,
  };
}