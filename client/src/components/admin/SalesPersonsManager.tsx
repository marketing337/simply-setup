import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus, User, Phone, Mail, MapPin } from "lucide-react";
import SalesPersonForm from "./SalesPersonForm";
import { apiRequest } from "@/lib/queryClient";
import type { SalesPerson, Location } from "@shared/schema";

export default function SalesPersonsManager() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSalesPerson, setEditingSalesPerson] = useState<SalesPerson | null>(null);
  const [deletingSalesPerson, setDeletingSalesPerson] = useState<SalesPerson | null>(null);
  
  const queryClient = useQueryClient();

  // Fetch all sales persons
  const { data: salesPersons = [], isLoading } = useQuery<SalesPerson[]>({
    queryKey: ["/api/admin/salesPersons"],
  });

  // Fetch all locations for display
  const { data: locations = [] } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/admin/salesPersons", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/salesPersons"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Sales person created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create sales person",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest("PATCH", `/api/admin/salesPersons/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/salesPersons"] });
      setEditingSalesPerson(null);
      toast({
        title: "Success",
        description: "Sales person updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update sales person",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/salesPersons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/salesPersons"] });
      setDeletingSalesPerson(null);
      toast({
        title: "Success",
        description: "Sales person deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete sales person",
        variant: "destructive",
      });
    },
  });

  const getLocationName = (locationId: number | null) => {
    if (!locationId) return "All Locations";
    const location = locations.find(l => l.id === locationId);
    return location?.name || "Unknown Location";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Sales Persons</h2>
          <p className="text-muted-foreground">Manage sales team members</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Sales Person
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Sales Team ({salesPersons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading sales persons...</div>
          ) : salesPersons.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sales persons found. Create your first one!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesPersons.map((salesPerson) => (
                  <TableRow key={salesPerson.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {salesPerson.avatar ? (
                          <img 
                            src={salesPerson.avatar} 
                            alt={salesPerson.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{salesPerson.name}</div>
                          {salesPerson.bio && (
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {salesPerson.bio}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1" />
                          {salesPerson.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {salesPerson.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{salesPerson.designation}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {getLocationName(salesPerson.locationId)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={salesPerson.isActive ? "default" : "secondary"}>
                        {salesPerson.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSalesPerson(salesPerson)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeletingSalesPerson(salesPerson)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Sales Person</DialogTitle>
            <DialogDescription>
              Create a new sales team member
            </DialogDescription>
          </DialogHeader>
          <SalesPersonForm
            onSubmit={(data) => createMutation.mutate(data)}
            onCancel={() => setIsCreateDialogOpen(false)}
            isSubmitting={createMutation.isPending}
            locations={locations}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingSalesPerson} onOpenChange={() => setEditingSalesPerson(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Sales Person</DialogTitle>
            <DialogDescription>
              Update sales person information
            </DialogDescription>
          </DialogHeader>
          {editingSalesPerson && (
            <SalesPersonForm
              initialData={editingSalesPerson}
              onSubmit={(data) => updateMutation.mutate({ 
                id: editingSalesPerson.id, 
                data 
              })}
              onCancel={() => setEditingSalesPerson(null)}
              isSubmitting={updateMutation.isPending}
              locations={locations}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingSalesPerson} onOpenChange={() => setDeletingSalesPerson(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sales Person</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deletingSalesPerson?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingSalesPerson && deleteMutation.mutate(deletingSalesPerson.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}