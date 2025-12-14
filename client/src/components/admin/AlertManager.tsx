import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  AlertCircle, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar,
  Save,
  X,
  FileText,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: number;
  title: string;
  description: string;
  cardType: 'notice' | 'due_date';
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetUrl?: string;
  targetType?: 'service' | 'page' | 'external';
  isActive: boolean;
  publishedDate?: string;
  dueDate?: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface AlertFormData {
  title: string;
  description: string;
  cardType: 'notice' | 'due_date';
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetUrl: string;
  targetType: 'service' | 'page' | 'external';
  isActive: boolean;
  publishedDate: string;
  dueDate: string;
  startDate: string;
  endDate: string;
}

const initialFormData: AlertFormData = {
  title: '',
  description: '',
  cardType: 'notice',
  type: 'info',
  priority: 'medium',
  targetUrl: '',
  targetType: 'page',
  isActive: true,
  publishedDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: ''
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'warning': return '⚠️';
    case 'error': return '❌';
    case 'success': return '✅';
    default: return 'ℹ️';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'warning': return 'text-orange-600';
    case 'error': return 'text-red-600';
    case 'success': return 'text-green-600';
    default: return 'text-blue-600';
  }
};

const getPriorityBadge = (priority: string) => {
  const colors = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700'
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

export default function AlertManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [formData, setFormData] = useState<AlertFormData>(initialFormData);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all alerts
  const { data: alerts = [], isLoading } = useQuery<Alert[]>({
    queryKey: ["/api/admin/alerts"],
  });

  // Create alert mutation
  const createAlert = useMutation({
    mutationFn: async (data: Partial<AlertFormData>) => {
      return apiRequest("POST", "/api/admin/alerts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      setIsDialogOpen(false);
      setFormData(initialFormData);
      setEditingAlert(null);
      toast({
        title: "Success",
        description: "Alert created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create alert",
        variant: "destructive",
      });
    },
  });

  // Update alert mutation
  const updateAlert = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<AlertFormData> }) => {
      return apiRequest("PUT", `/api/admin/alerts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      setIsDialogOpen(false);
      setFormData(initialFormData);
      setEditingAlert(null);
      toast({
        title: "Success",
        description: "Alert updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update alert",
        variant: "destructive",
      });
    },
  });

  // Delete alert mutation
  const deleteAlert = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/alerts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/alerts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
      toast({
        title: "Success",
        description: "Alert deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete alert",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = { ...formData };
    
    // Convert date strings to proper format
    if (submitData.publishedDate) {
      submitData.publishedDate = new Date(submitData.publishedDate).toISOString();
    }
    if (submitData.dueDate) {
      submitData.dueDate = new Date(submitData.dueDate).toISOString();
    }
    if (submitData.startDate) {
      submitData.startDate = new Date(submitData.startDate).toISOString();
    }
    if (submitData.endDate) {
      submitData.endDate = new Date(submitData.endDate).toISOString();
    }

    if (editingAlert) {
      updateAlert.mutate({ id: editingAlert.id, data: submitData });
    } else {
      createAlert.mutate(submitData);
    }
  };

  const handleEdit = (alert: Alert) => {
    setEditingAlert(alert);
    setFormData({
      title: alert.title,
      description: alert.description,
      cardType: alert.cardType,
      type: alert.type,
      priority: alert.priority,
      targetUrl: alert.targetUrl || '',
      targetType: alert.targetType || 'page',
      isActive: alert.isActive,
      publishedDate: alert.publishedDate ? new Date(alert.publishedDate).toISOString().split('T')[0] : '',
      dueDate: alert.dueDate ? new Date(alert.dueDate).toISOString().split('T')[0] : '',
      startDate: new Date(alert.startDate).toISOString().split('T')[0],
      endDate: alert.endDate ? new Date(alert.endDate).toISOString().split('T')[0] : ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      deleteAlert.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingAlert(null);
  };

  const notices = alerts.filter(alert => alert.cardType === 'notice');
  const dueDates = alerts.filter(alert => alert.cardType === 'due_date');

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Updates & Alerts Management</h2>
          <p className="text-gray-600">Manage notices and due dates displayed on the homepage</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingAlert ? 'Edit Alert' : 'Create New Alert'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardType">Card Type</Label>
                  <Select
                    value={formData.cardType}
                    onValueChange={(value: 'notice' | 'due_date') =>
                      setFormData({ ...formData, cardType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notice">Notice</SelectItem>
                      <SelectItem value="due_date">Due Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: 'info' | 'warning' | 'success' | 'error') =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="targetType">Link Type</Label>
                  <Select
                    value={formData.targetType}
                    onValueChange={(value: 'service' | 'page' | 'external') =>
                      setFormData({ ...formData, targetType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Internal Page</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="external">External Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="targetUrl">Target URL (optional)</Label>
                <Input
                  id="targetUrl"
                  value={formData.targetUrl}
                  onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                  placeholder="/page-url or https://external-site.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {formData.cardType === 'notice' && (
                  <div>
                    <Label htmlFor="publishedDate">Published Date</Label>
                    <Input
                      id="publishedDate"
                      type="date"
                      value={formData.publishedDate}
                      onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                    />
                  </div>
                )}
                
                {formData.cardType === 'due_date' && (
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      required={formData.cardType === 'due_date'}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="endDate">End Date (optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createAlert.isPending || updateAlert.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingAlert ? 'Update' : 'Create'} Alert
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="notices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Notices ({notices.length})
          </TabsTrigger>
          <TabsTrigger value="due-dates" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Due Dates ({dueDates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notices" className="space-y-4">
          {notices.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No notices created yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {notices.map((alert) => (
                <Card key={alert.id} className={`${alert.isActive ? 'border-green-200' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={getTypeColor(alert.type)}>{getTypeIcon(alert.type)}</span>
                          <h3 className="font-medium text-sm">{alert.title}</h3>
                          <Badge className={getPriorityBadge(alert.priority)}>
                            {alert.priority}
                          </Badge>
                          {alert.isActive ? (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{alert.description}</p>
                        <div className="text-xs text-gray-500">
                          Published: {alert.publishedDate ? new Date(alert.publishedDate).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(alert)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(alert.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="due-dates" className="space-y-4">
          {dueDates.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No due dates created yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {dueDates.map((alert) => (
                <Card key={alert.id} className={`${alert.isActive ? 'border-green-200' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <h3 className="font-medium text-sm">{alert.title}</h3>
                          <Badge className={getPriorityBadge(alert.priority)}>
                            {alert.priority}
                          </Badge>
                          {alert.isActive ? (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Inactive</Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Due Date: {alert.dueDate ? new Date(alert.dueDate).toLocaleDateString() : 'Not specified'}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(alert)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(alert.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}