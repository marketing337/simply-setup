import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  Location, 
  Area, 
  InsertArea,
  insertAreaSchema
} from "@shared/schema";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import AreaForm from "@/components/admin/AreaForm";
import { useLocation } from "@/hooks/useLocation";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useAreasByLocationId } from "@/lib/api";

interface AreasManagerProps {
  currentLocation: Location;
}

export default function AreasManager({ currentLocation }: AreasManagerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // Use currentLocation.id as the locationId

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the existing API endpoint to fetch areas from the specified location
  const { data: areas = [], isLoading } = useAreasByLocationId(currentLocation.id);

  const handleAddArea = async (values: InsertArea) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/admin/areas", values);
      
      toast({
        title: "Area added",
        description: `${values.name} has been added successfully.`,
      });
      
      queryClient.invalidateQueries({
        queryKey: [`/api/locations/${currentLocation.id}/areas`],
      });
      
      setIsAddDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error adding area",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditArea = async (values: Partial<InsertArea>) => {
    if (!selectedArea) return;
    
    setIsSubmitting(true);
    try {
      await apiRequest("PATCH", `/api/admin/areas/${selectedArea.id}`, values);
      
      toast({
        title: "Area updated",
        description: `${values.name || selectedArea.name} has been updated successfully.`,
      });
      
      queryClient.invalidateQueries({
        queryKey: [`/api/locations/${currentLocation.id}/areas`],
      });
      
      setIsEditDialogOpen(false);
      setSelectedArea(null);
    } catch (error: any) {
      toast({
        title: "Error updating area",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteArea = async () => {
    if (!selectedArea) return;
    
    setIsSubmitting(true);
    try {
      await apiRequest("DELETE", `/api/admin/areas/${selectedArea.id}`);
      
      toast({
        title: "Area deleted",
        description: `${selectedArea.name} has been deleted successfully.`,
      });
      
      queryClient.invalidateQueries({
        queryKey: [`/api/locations/${currentLocation.id}/areas`],
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedArea(null);
    } catch (error: any) {
      toast({
        title: "Error deleting area",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading areas...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Areas in {currentLocation.name}</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Area
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Add New Area</DialogTitle>
              <DialogDescription>
                Create a new area page within {currentLocation.name}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              <AreaForm 
                onSubmit={handleAddArea} 
                location={currentLocation}
                isSubmitting={isSubmitting}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {areas.length > 0 ? (
        <Table>
          <TableCaption>
            List of areas in {currentLocation.name}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map((area: Area) => (
              <TableRow key={area.id}>
                <TableCell className="font-medium">{area.name}</TableCell>
                <TableCell>{area.slug}</TableCell>
                <TableCell>{area.address}</TableCell>
                <TableCell>{area.isPopular ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedArea(area);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setSelectedArea(area);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-gray-500">No areas found for {currentLocation.name}.</p>
          <p className="text-gray-500 mt-2">Create your first area to get started.</p>
        </div>
      )}

      {/* Edit Dialog */}
      {selectedArea && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Edit Area: {selectedArea.name}</DialogTitle>
              <DialogDescription>
                Update the details for this area in {currentLocation.name}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              <AreaForm 
                onSubmit={handleEditArea} 
                location={currentLocation}
                initialData={selectedArea}
                isSubmitting={isSubmitting}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedArea(null);
                }}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the area "{selectedArea?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedArea(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteArea}
              disabled={isSubmitting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Required import for TanStack Query
import { useQuery } from "@tanstack/react-query";