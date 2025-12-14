import { useState, useEffect } from "react";
import { MapPin, Building2, ArrowRight, CheckSquare, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";
import { Workspace } from "@shared/schema";

interface NearbyAreasSectionProps {
  workspaceName: string;
  cityName?: string;
  areaName?: string;
}

export default function NearbyAreasSection({ 
  workspaceName, 
  cityName, 
  areaName 
}: NearbyAreasSectionProps) {
  const [nearbyWorkspaces, setNearbyWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNearbyWorkspaces = async () => {
      if (!cityName) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // First, get all locations to find the city ID
        const locationsResponse = await fetch('/api/locations');
        if (!locationsResponse.ok) {
          throw new Error('Failed to fetch locations');
        }
        
        const locations = await locationsResponse.json();
        const currentLocation = locations.find((loc: any) => loc.name === cityName);
        
        if (!currentLocation) {
          throw new Error('City not found');
        }

        // Then fetch workspaces for that city
        const workspacesResponse = await fetch('/api/workspaces');
        if (!workspacesResponse.ok) {
          throw new Error('Failed to fetch workspaces');
        }
        
        const allWorkspaces = await workspacesResponse.json();
        
        // Filter workspaces for the current city, excluding the current workspace
        const cityWorkspaces = allWorkspaces
          .filter((workspace: Workspace) => 
            workspace.locationId === currentLocation.id && 
            workspace.name !== workspaceName
          )
          .slice(0, 6); // Limit to 6 workspaces
        
        setNearbyWorkspaces(cityWorkspaces);
      } catch (err) {
        console.error('Error fetching nearby workspaces:', err);
        setError('Failed to load nearby workspaces');
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyWorkspaces();
  }, [workspaceName, cityName]);

  const handleWorkspaceNavigate = (workspace: Workspace) => {
    window.location.href = `/virtual-office/${workspace.slug}`;
  };

  if (!cityName) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Other Virtual Office Options in {cityName}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore other premium virtual office locations in {cityName} for your business needs
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Unable to load nearby workspaces at this time.</p>
          </div>
        ) : nearbyWorkspaces.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No other virtual offices available in {cityName} at this time.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyWorkspaces.map((workspace) => (
              <Card key={workspace.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div onClick={() => handleWorkspaceNavigate(workspace)}>
                  <div className="aspect-video relative overflow-hidden">
                    {workspace.images && workspace.images.length > 0 ? (
                      <OptimizedImage
                        src={workspace.images[0]}
                        alt={workspace.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <Building2 className="h-12 w-12 text-blue-400" />
                      </div>
                    )}
                    {workspace.isActive && (
                      <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
                        Available
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {workspace.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {workspace.description || 'Professional virtual office space with comprehensive business services.'}
                    </p>
                    
                    {workspace.amenities && workspace.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {workspace.amenities.slice(0, 2).map((amenity, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-500">
                            <CheckSquare className="h-3 w-3 mr-1 text-green-500" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                        {workspace.amenities.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{workspace.amenities.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        {cityName}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
                      >
                        View Details
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Multiple Locations, One City
            </h3>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Choose from multiple premium virtual office locations across {cityName}. Each workspace offers 
              unique advantages and amenities to suit different business needs and preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}