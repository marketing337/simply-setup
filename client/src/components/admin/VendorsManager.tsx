import { useState } from "react";
import { 
  Vendor, 
  InsertVendor, 
  insertVendorSchema 
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
import { useQueryClient } from "@tanstack/react-query";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { 
  useAdminVendors, 
  useCreateVendor, 
  useUpdateVendor, 
  useDeleteVendor, 
  useWorkspacesByVendorId 
} from "@/lib/api-vendors";
import VendorForm from "@/components/admin/VendorForm";

export default function VendorsManager() {
  const { data: vendors, isLoading } = useAdminVendors();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const createVendorMutation = useCreateVendor();
  const updateVendorMutation = useUpdateVendor();
  const deleteVendorMutation = useDeleteVendor();
  
  const handleCreateVendor = async (data: Partial<InsertVendor>) => {
    setIsSubmitting(true);
    try {
      await createVendorMutation.mutateAsync(data);
      
      toast({
        title: "Vendor created",
        description: "The vendor has been created successfully.",
      });
      
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error creating vendor",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleUpdateVendor = async (data: Partial<InsertVendor>) => {
    if (!selectedVendor) return;
    
    setIsSubmitting(true);
    try {
      await updateVendorMutation.mutateAsync({
        id: selectedVendor.id,
        data,
      });
      
      toast({
        title: "Vendor updated",
        description: "The vendor has been updated successfully.",
      });
      
      setIsEditDialogOpen(false);
      setSelectedVendor(null);
    } catch (error: any) {
      toast({
        title: "Error updating vendor",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteVendor = async () => {
    if (!selectedVendor) return;
    
    setIsSubmitting(true);
    try {
      await deleteVendorMutation.mutateAsync(selectedVendor.id);
      
      toast({
        title: "Vendor deleted",
        description: `${selectedVendor.name} has been deleted successfully.`,
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedVendor(null);
    } catch (error: any) {
      toast({
        title: "Error deleting vendor",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Function to format a string as a slug
  const formatSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };
  
  if (isLoading) {
    return <div>Loading vendors...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Vendor Management</h2>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon size={16} />
              Add Vendor
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Vendor</DialogTitle>
              <DialogDescription>
                Add a new workspace provider to the platform.
              </DialogDescription>
            </DialogHeader>
            
            <VendorForm 
              onSubmit={handleCreateVendor} 
              isSubmitting={isSubmitting}
              onCancel={() => setIsCreateDialogOpen(false)}
              formatSlug={formatSlug}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableCaption>List of all workspace vendors</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Logo URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors && vendors.length > 0 ? (
              vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.slug}</TableCell>
                  <TableCell>
                    <div 
                      className="w-6 h-6 rounded-full border" 
                      style={{ backgroundColor: vendor.colorCode || '#cccccc' }}
                    />
                  </TableCell>
                  <TableCell>
                    {vendor.logo ? (
                      <div className="w-8 h-8">
                        <img 
                          src={vendor.logo} 
                          alt={`${vendor.name} logo`} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <PencilIcon size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2Icon size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No vendors found. Create your first vendor.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
            <DialogDescription>
              Update vendor information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendor && (
            <VendorForm 
              onSubmit={handleUpdateVendor} 
              isSubmitting={isSubmitting}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedVendor(null);
              }}
              initialData={selectedVendor}
              formatSlug={formatSlug}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the vendor "{selectedVendor?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedVendor(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteVendor}
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