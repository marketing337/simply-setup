import { useState } from "react";
import { EyeIcon, ImageIcon, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Location } from "@shared/schema";
import { useLocation } from "@/hooks/useLocation";
import { badgeColors } from "@/lib/locationData";
import LocationForm from "./LocationForm";
import { useUpdateLocation } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface LocationsManagerProps {
  locations: Location[];
}

export default function LocationsManager({ locations }: LocationsManagerProps) {
  const { navigateToLocation } = useLocation();
  const updateLocationMutation = useUpdateLocation();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);

  // Generate a color for city
  const getColorForCity = (cityName: string) => {
    // Convert cityName to lowercase for consistent mapping
    const name = cityName.toLowerCase();
    
    // Use predefined badge colors in a rotating fashion
    const colorKeys = Object.keys(badgeColors);
    const colorIndex = Math.abs(
      name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % colorKeys.length;
    
    return badgeColors[colorKeys[colorIndex] as keyof typeof badgeColors];
  };
  
  const handleEditHeroImage = (location: Location) => {
    setSelectedLocation(location);
    setIsHeroDialogOpen(true);
  };
  
  const handleUpdateLocation = async (values: any) => {
    if (!selectedLocation) return;
    
    try {
      console.log("LocationsManager updating location:", selectedLocation.id, "with values:", values);
      
      const result = await updateLocationMutation.mutateAsync({
        id: selectedLocation.id,
        data: values
      });
      
      console.log("Location update result:", result);
      
      // Only close the dialog if mutation succeeds
      setIsHeroDialogOpen(false);
      
      // Display success message
      toast({
        title: "Hero image updated",
        description: `The hero image for ${selectedLocation.name} has been updated.`,
      });
    } catch (error) {
      console.error("Error updating location in LocationsManager:", error);
      
      // Display error message
      toast({
        title: "Update failed",
        description: "There was an error updating the location. Please try again.",
        variant: "destructive",
      });
      
      // Dialog will remain open so user can try again
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Manage Location Pages</h3>
        <p className="text-gray-500">
          View all locations in the system. Click on a location to view and manage its areas.
        </p>
      </div>
      
      <Table>
        <TableCaption>
          List of available locations
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Areas</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {location.name}
                  <Badge className={getColorForCity(location.name)}>
                    {location.name}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{location.slug}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="px-2 h-auto py-1"
                >
                  View details
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => handleEditHeroImage(location)}
                  >
                    <ImageIcon className="h-4 w-4" />
                    Hero Image
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => navigateToLocation(location.slug)}
                  >
                    <EyeIcon className="h-4 w-4" />
                    View Site
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Hero Image Edit Dialog */}
      <Dialog open={isHeroDialogOpen} onOpenChange={setIsHeroDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Hero Image</DialogTitle>
            <DialogDescription>
              Update the hero image for this location's page. This image will appear at the top of the location page.
            </DialogDescription>
          </DialogHeader>
          
          {selectedLocation && (
            <LocationForm
              location={selectedLocation}
              onSubmit={handleUpdateLocation}
              isSubmitting={updateLocationMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}