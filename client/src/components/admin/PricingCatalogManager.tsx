import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, IndianRupee } from "lucide-react";

interface Location {
  id: number;
  name: string;
  slug: string;
}

interface PricingCatalog {
  id: number;
  locationId: number;
  serviceName: string;
  serviceDescription: string;
  price: string;
  currency: string;
  duration: string;
  features: string[];
  isActive: boolean;
}

interface PricingCatalogManagerProps {
  currentLocation: Location;
}

export default function PricingCatalogManager({ currentLocation }: PricingCatalogManagerProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState<PricingCatalog | null>(null);
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    price: "",
    currency: "INR",
    duration: "monthly",
    features: "",
    isActive: true,
  });
  const { toast } = useToast();

  // Fetch pricing catalog for current location
  const { data: pricingCatalog, isLoading } = useQuery({
    queryKey: [`/api/pricing-catalog/${currentLocation.id}`],
  });

  // Create pricing catalog mutation
  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/pricing-catalog", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/pricing-catalog/${currentLocation.id}`] });
      toast({ title: "Service package created successfully" });
      resetForm();
      setIsCreateModalOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create service package",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update pricing catalog mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `/api/admin/pricing-catalog/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/pricing-catalog/${currentLocation.id}`] });
      toast({ title: "Service package updated successfully" });
      resetForm();
      setEditingCatalog(null);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update service package",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete pricing catalog mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/pricing-catalog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/pricing-catalog/${currentLocation.id}`] });
      toast({ title: "Service package deleted successfully" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete service package",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      serviceName: "",
      serviceDescription: "",
      price: "",
      currency: "INR",
      duration: "monthly",
      features: "",
      isActive: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const featuresArray = formData.features
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const submitData = {
      locationId: currentLocation.id,
      serviceName: formData.serviceName,
      serviceDescription: formData.serviceDescription,
      price: formData.price,
      currency: formData.currency,
      duration: formData.duration,
      features: featuresArray,
      isActive: formData.isActive,
    };

    if (editingCatalog) {
      updateMutation.mutate({ id: editingCatalog.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (catalog: PricingCatalog) => {
    setEditingCatalog(catalog);
    setFormData({
      serviceName: catalog.serviceName,
      serviceDescription: catalog.serviceDescription,
      price: catalog.price,
      currency: catalog.currency,
      duration: catalog.duration,
      features: catalog.features.join('\n'),
      isActive: catalog.isActive,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this service package?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>Loading pricing catalog...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Service Packages for {currentLocation.name}</h3>
          <p className="text-sm text-gray-600">
            Manage virtual office service packages and pricing
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Service Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCatalog ? "Edit Service Package" : "Create New Service Package"}
              </DialogTitle>
              <DialogDescription>
                Add a new virtual office service package for {currentLocation.name}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    placeholder="e.g., Basic Virtual Office"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="2999"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="one-time">One-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceDescription">Description</Label>
                <Textarea
                  id="serviceDescription"
                  value={formData.serviceDescription}
                  onChange={(e) => setFormData({ ...formData, serviceDescription: e.target.value })}
                  placeholder="Brief description of the service package"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Business Address&#10;Mail Forwarding&#10;GST Registration Support"
                  rows={5}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setEditingCatalog(null);
                    setIsCreateModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingCatalog
                    ? "Update Package"
                    : "Create Package"
                  }
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {!pricingCatalog || (Array.isArray(pricingCatalog) && pricingCatalog.length === 0) ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No service packages created yet.</p>
            </CardContent>
          </Card>
        ) : (
          Array.isArray(pricingCatalog) && pricingCatalog.map((catalog: PricingCatalog) => (
            <Card key={catalog.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {catalog.serviceName}
                      {!catalog.isActive && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{catalog.serviceDescription}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary flex items-center">
                        <IndianRupee className="h-5 w-5" />
                        {parseFloat(catalog.price).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">per {catalog.duration}</div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          handleEdit(catalog);
                          setIsCreateModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(catalog.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              {catalog.features?.length > 0 && (
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">Included Features:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {catalog.features.map((feature, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}