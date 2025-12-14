import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Eye, 
  MoreVertical, 
  Calendar, 
  DollarSign, 
  User, 
  Phone, 
  Mail, 
  Building, 
  FileText,
  Clock,
  CheckCircle
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ServiceOrdersViewProps {
  orders: any[];
  title: string;
  type: "pending" | "paid";
}

export default function ServiceOrdersView({ orders, title, type }: ServiceOrdersViewProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderNotes, setOrderNotes] = useState("");

  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, updates }: { orderId: string; updates: any }) => {
      const response = await apiRequest("PUT", `/api/service-orders/${orderId}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/service-orders"] });
      toast({
        title: "Success",
        description: "Order updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order",
        variant: "destructive",
      });
    },
  });

  const markOrderAsPaid = (orderId: string) => {
    updateOrderMutation.mutate({
      orderId,
      updates: { paymentStatus: "paid", orderStatus: "processing" }
    });
  };

  const markOrderAsCompleted = (orderId: string) => {
    updateOrderMutation.mutate({
      orderId,
      updates: { orderStatus: "completed" }
    });
  };

  const updateOrderNotes = (orderId: string) => {
    updateOrderMutation.mutate({
      orderId,
      updates: { notes: orderNotes }
    });
    setOrderNotes("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-2">No {type} orders</h3>
          <p className="text-muted-foreground">
            {type === "pending" ? "All orders have been processed" : "No paid orders yet"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            Manage service orders and customer inquiries
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {orders.length} orders
        </Badge>
      </div>

      <div className="grid gap-4">
        {orders.map((order: any) => (
          <Card key={order.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {order.service?.name || "Unknown Service"}
                    <Badge className={getStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                    <Badge variant="outline">
                      {order.orderStatus}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Order #{order.orderId}
                  </p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem 
                          onSelect={(e) => e.preventDefault()}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                      </DialogTrigger>
                    </Dialog>
                    
                    {type === "pending" && (
                      <DropdownMenuItem onClick={() => markOrderAsPaid(order.orderId)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Paid
                      </DropdownMenuItem>
                    )}
                    
                    {type === "paid" && order.orderStatus !== "completed" && (
                      <DropdownMenuItem onClick={() => markOrderAsCompleted(order.orderId)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Completed
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{order.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {order.amount} {order.currency}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(order.createdAt), "MMM dd, yyyy")}</span>
                </div>
              </div>
              
              {order.customerCompany && (
                <div className="flex items-center gap-2 text-sm mt-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customerCompany}</span>
                </div>
              )}
              
              {order.notes && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm"><strong>Notes:</strong> {order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - #{selectedOrder.orderId}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Service Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Service Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{selectedOrder.service?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">{selectedOrder.service?.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">
                      {selectedOrder.amount} {selectedOrder.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium capitalize">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedOrder.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedOrder.customerPhone}</p>
                  </div>
                  {selectedOrder.customerCompany && (
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{selectedOrder.customerCompany}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Data */}
              {selectedOrder.formData && (
                <div className="space-y-3">
                  <h3 className="font-medium text-lg">Form Data</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="text-sm whitespace-pre-wrap">
                      {JSON.stringify(JSON.parse(selectedOrder.formData), null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Order Status */}
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Order Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Status</p>
                    <Badge className={getStatusColor(selectedOrder.paymentStatus)}>
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Status</p>
                    <Badge variant="outline">
                      {selectedOrder.orderStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">
                      {format(new Date(selectedOrder.createdAt), "PPpp")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Updated</p>
                    <p className="font-medium">
                      {format(new Date(selectedOrder.updatedAt), "PPpp")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment IDs */}
              {(selectedOrder.paymentId || selectedOrder.razorpayOrderId) && (
                <div className="space-y-3">
                  <h3 className="font-medium text-lg">Payment Information</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {selectedOrder.paymentId && (
                      <div>
                        <span className="text-muted-foreground">Payment ID:</span> {selectedOrder.paymentId}
                      </div>
                    )}
                    {selectedOrder.razorpayOrderId && (
                      <div>
                        <span className="text-muted-foreground">Razorpay Order ID:</span> {selectedOrder.razorpayOrderId}
                      </div>
                    )}
                    {selectedOrder.razorpayPaymentId && (
                      <div>
                        <span className="text-muted-foreground">Razorpay Payment ID:</span> {selectedOrder.razorpayPaymentId}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes Section */}
              <div className="space-y-3">
                <h3 className="font-medium text-lg">Notes</h3>
                {selectedOrder.notes && (
                  <div className="bg-gray-50 p-3 rounded-md mb-3">
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add notes about this order..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  />
                  <Button 
                    onClick={() => updateOrderNotes(selectedOrder.orderId)}
                    disabled={!orderNotes.trim() || updateOrderMutation.isPending}
                  >
                    Add Note
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}