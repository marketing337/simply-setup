import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Globe, DollarSign, Clock, FileText } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import EnhancedServiceDialog from "./EnhancedServiceDialog";
import ServiceOrdersView from "./ServiceOrdersView";

export default function ServicesManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("services");

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/services");
      return response.json();
    },
  });

  const { data: serviceOrders = [] } = useQuery({
    queryKey: ["/api/service-orders"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/service-orders");
      return response.json();
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    },
  });

  const groupedServices = services.reduce((acc: any, service: any) => {
    if (!acc[service.country]) {
      acc[service.country] = [];
    }
    acc[service.country].push(service);
    return acc;
  }, {});

  const pendingOrders = serviceOrders.filter((order: any) => order.paymentStatus === 'pending');
  const paidOrders = serviceOrders.filter((order: any) => order.paymentStatus === 'paid');

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="pending-orders">
            Pending Orders ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="paid-orders">
            Paid Orders ({paidOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Services by Country</h2>
              <p className="text-sm text-muted-foreground">
                Manage country-specific services like GST Registration, Company Registration, etc.
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Service
            </Button>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedServices).map(([country, countryServices]: [string, any]) => (
              <Card key={country}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {country}
                    <Badge variant="secondary">{countryServices.length} services</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {countryServices.map((service: any) => (
                      <Card key={service.id} className="relative">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm leading-tight">{service.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {service.description}
                              </p>
                            </div>
                            <div className="flex gap-1 ml-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingService(service)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteServiceMutation.mutate(service.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                              <DollarSign className="h-3 w-3" />
                              <span className="font-medium">
                                {service.price} {service.currency}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{service.processingTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              <span>{service.category}</span>
                            </div>
                            {service.isPopular && (
                              <Badge variant="default" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {Object.keys(groupedServices).length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">No services created yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first service to get started
                  </p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending-orders">
          <ServiceOrdersView orders={pendingOrders} title="Pending Orders" type="pending" />
        </TabsContent>

        <TabsContent value="paid-orders">
          <ServiceOrdersView orders={paidOrders} title="Paid Orders" type="paid" />
        </TabsContent>
      </Tabs>

      <EnhancedServiceDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      />

      {editingService && (
        <EnhancedServiceDialog
          service={editingService}
          isOpen={!!editingService}
          onClose={() => setEditingService(null)}
        />
      )}
    </div>
  );
}