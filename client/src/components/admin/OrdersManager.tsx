import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface Order {
  id: number;
  orderId: string;
  status: 'created' | 'paid' | 'failed' | 'cancelled';
  locationId: number;
  pricingCatalogId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  amount: string;
  currency: string;
  paymentId?: string;
  razorpaySignature?: string;
  createdAt: string;
  updatedAt: string;
}

interface PricingCatalog {
  id: number;
  serviceName: string;
  price: string;
  duration: string;
}

interface Location {
  id: number;
  name: string;
}

const statusIcons = {
  created: <Clock className="w-4 h-4" />,
  paid: <CheckCircle className="w-4 h-4" />,
  failed: <XCircle className="w-4 h-4" />,
  cancelled: <AlertCircle className="w-4 h-4" />
};

const statusColors = {
  created: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800'
};

function OrderDetailsModal({ order, service, location }: { 
  order: Order; 
  service?: PricingCatalog; 
  location?: Location;
}) {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Order Details - {order.orderId}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Order Status */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <Badge className={`${statusColors[order.status]} flex items-center gap-1`}>
            {statusIcons[order.status]}
            {order.status.toUpperCase()}
          </Badge>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">Name:</span> {order.customerName}</div>
              <div><span className="font-medium">Email:</span> {order.customerEmail}</div>
              <div><span className="font-medium">Phone:</span> {order.customerPhone}</div>
              {order.companyName && (
                <div><span className="font-medium">Company:</span> {order.companyName}</div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Order Information</h3>
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">Service:</span> {service?.serviceName || 'Unknown'}</div>
              <div><span className="font-medium">Location:</span> {location?.name || 'Unknown'}</div>
              <div><span className="font-medium">Duration:</span> {service?.duration || 'N/A'}</div>
              <div><span className="font-medium">Amount:</span> {order.currency} {order.amount}</div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        {order.status === 'paid' && (
          <div>
            <h3 className="font-semibold mb-2">Payment Information</h3>
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">Payment ID:</span> {order.paymentId}</div>
              <div><span className="font-medium">Order Date:</span> {format(new Date(order.createdAt), 'PPP pp')}</div>
              <div><span className="font-medium">Payment Date:</span> {format(new Date(order.updatedAt), 'PPP pp')}</div>
            </div>
          </div>
        )}

        {/* Timestamps */}
        <div>
          <h3 className="font-semibold mb-2">Timeline</h3>
          <div className="space-y-1 text-sm">
            <div><span className="font-medium">Created:</span> {format(new Date(order.createdAt), 'PPP pp')}</div>
            <div><span className="font-medium">Last Updated:</span> {format(new Date(order.updatedAt), 'PPP pp')}</div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default function OrdersManager() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['/api/orders'],
  });

  const { data: pricingCatalog = [], isLoading: catalogLoading } = useQuery({
    queryKey: ['/api/pricing-catalog'],
  });

  const { data: locations = [], isLoading: locationsLoading } = useQuery({
    queryKey: ['/api/locations'],
  });

  if (ordersLoading || catalogLoading || locationsLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter((order: Order) => order.status === selectedStatus);

  const orderStats = {
    total: orders.length,
    paid: orders.filter((order: Order) => order.status === 'paid').length,
    pending: orders.filter((order: Order) => order.status === 'created').length,
    failed: orders.filter((order: Order) => order.status === 'failed').length,
  };

  const totalRevenue = orders
    .filter((order: Order) => order.status === 'paid')
    .reduce((sum: number, order: Order) => sum + parseFloat(order.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Orders
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orderStats.total}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid Orders</p>
                <p className="text-2xl font-bold">{orderStats.paid}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold">{orderStats.pending}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="created">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedStatus} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order: Order) => {
                        const service = pricingCatalog.find((s: PricingCatalog) => s.id === order.pricingCatalogId);
                        const location = locations.find((l: Location) => l.id === order.locationId);
                        
                        return (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono text-sm">{order.orderId}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{order.customerName}</div>
                                <div className="text-sm text-gray-500">{order.customerEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>{service?.serviceName || 'Unknown'}</TableCell>
                            <TableCell>{location?.name || 'Unknown'}</TableCell>
                            <TableCell className="font-medium">₹{order.amount}</TableCell>
                            <TableCell>
                              <Badge className={`${statusColors[order.status]} flex items-center gap-1 w-fit`}>
                                {statusIcons[order.status]}
                                {order.status.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <OrderDetailsModal order={order} service={service} location={location} />
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}