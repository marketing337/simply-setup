import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useComplyAuth } from "@/hooks/useComplyAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { GSPFilingHistory } from "@/components/comply/GSPFilingHistory";
import { 
  FileText, 
  Upload, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  LogOut,
  User,
  Settings,
  Files
} from "lucide-react";

// Upload Section Component
interface UploadSectionProps {
  title: string;
  description: string;
  uploadType: string;
  icon: React.ReactNode;
}

function UploadSection({ title, description, uploadType, icon }: UploadSectionProps) {
  const { toast } = useToast();
  const { token } = useComplyAuth();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (files: FileList | File[]) => {
    if (!files.length) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      
      if (uploadType === 'multiple') {
        Array.from(files).forEach(file => {
          formData.append('documents', file);
        });
      } else {
        const fieldName = uploadType === 'certificate' ? 'certificate' : 'document';
        formData.append(fieldName, files[0]);
      }

      const response = await fetch(`/api/comply/upload/${uploadType}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Upload Successful",
          description: result.message,
        });
        
        // Invalidate and refetch queries to show new uploads
        queryClient.invalidateQueries({ queryKey: ['/api/comply/dashboard'] });
        queryClient.invalidateQueries({ queryKey: ['/api/comply/gst-certificates'] });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files);
    }
  };

  return (
    <Card className={`cursor-pointer transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}>
      <CardContent 
        className="p-6 text-center"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          {icon}
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <input
              type="file"
              id={`upload-${uploadType}`}
              className="hidden"
              multiple={uploadType === 'multiple'}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            <label
              htmlFor={`upload-${uploadType}`}
              className="cursor-pointer"
            >
              <Button 
                variant="outline" 
                size="sm" 
                disabled={isUploading}
                asChild
              >
                <span>
                  {isUploading ? 'Uploading...' : 'Choose File'}
                </span>
              </Button>
            </label>
            <p className="text-xs text-gray-400">
              or drag and drop files here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardData {
  summary: {
    totalCertificates: number;
    verifiedCertificates: number;
  };
  recentCertificates: any[];
}

interface GstCertificate {
  id: number;
  gstin: string;
  legalName: string;
  tradeName?: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  verifiedAt?: string;
}



export default function ComplyDashboard() {
  const { user, logout, isAuthenticated, isLoading, token } = useComplyAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [, setLocation] = useLocation();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("Not authenticated, redirecting to auth");
      setLocation("/comply/auth");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Custom query function that includes JWT token
  const complyQueryFn = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
    const url = queryKey[0] as string;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery<DashboardData>({
    queryKey: ["/api/comply/dashboard"],
    queryFn: complyQueryFn,
    enabled: !!user && !!token,
  });

  // Fetch certificates
  const { data: certificates, isLoading: certificatesLoading } = useQuery<GstCertificate[]>({
    queryKey: ["/api/comply/gst-certificates"],
    queryFn: complyQueryFn,
    enabled: !!user && !!token,
  });



  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
      case 'filed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
      case 'not_filed':
        return <Badge variant="secondary">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'late_filed':
        return <Badge variant="outline" className="border-orange-500 text-orange-600">Late Filed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Show loading while checking authentication or loading dashboard
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated (useEffect will handle redirect)
  if (!isAuthenticated) {
    console.log("Not authenticated, returning null");
    return null;
  }

  console.log("Rendering dashboard for authenticated user:", user?.email);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                SimplySetup <span className="text-blue-600">Comply</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="filing-history">Filing History</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.summary.totalCertificates || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.summary.verifiedCertificates || 0} verified
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents Uploaded</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{certificates?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Total uploads
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {(certificates?.filter(cert => cert.status === 'pending').length) || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verified Certificates</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {(certificates?.filter(cert => cert.status === 'verified').length) || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Successfully verified</p>
                </CardContent>
              </Card>
            </div>



            {/* Quick Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Document Upload</span>
                </CardTitle>
                <CardDescription>Upload GST certificates and compliance documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <UploadSection
                    title="GST Certificate"
                    description="Upload your GST registration certificate"
                    uploadType="certificate"
                    icon={<FileText className="h-8 w-8 text-blue-500" />}
                  />

                  <UploadSection
                    title="Multiple Files"
                    description="Upload multiple documents at once"
                    uploadType="multiple"
                    icon={<Files className="h-8 w-8 text-purple-500" />}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Certificates</CardTitle>
                  <CardDescription>Your latest GST certificate uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardData?.recentCertificates?.length ? (
                    <div className="space-y-4">
                      {dashboardData.recentCertificates.map((cert: any) => (
                        <div key={cert.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{cert.gstin}</p>
                            <p className="text-sm text-gray-600">{cert.legalName}</p>
                          </div>
                          {getStatusBadge(cert.status)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No certificates uploaded yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Your latest document uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardData?.recentCertificates?.length ? (
                    <div className="space-y-4">
                      {dashboardData.recentCertificates.slice(0, 3).map((cert: any) => (
                        <div key={cert.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Document #{cert.id}</p>
                            <p className="text-sm text-gray-600">Uploaded: {formatDate(cert.uploadedAt)}</p>
                          </div>
                          {getStatusBadge(cert.status)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No documents uploaded yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Filing History Tab */}
          <TabsContent value="filing-history" className="space-y-6">
            {certificates?.some(cert => cert.gstin && cert.gstin !== 'PENDING') ? (
              <GSPFilingHistory gstin={certificates.find(cert => cert.gstin && cert.gstin !== 'PENDING')?.gstin || ''} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    GST Filing History
                  </CardTitle>
                  <CardDescription>
                    Upload a GST certificate with a valid GSTIN to view filing history and upcoming due dates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No GSTIN Found</h3>
                    <p className="text-gray-600 mb-6">
                      Upload a GST registration certificate to automatically extract your GSTIN and view comprehensive filing history.
                    </p>
                    <Button 
                      onClick={() => setActiveTab('certificates')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload GST Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">GST Certificates</h2>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Certificate
              </Button>
            </div>

            {certificatesLoading ? (
              <div className="text-center py-8">Loading certificates...</div>
            ) : certificates?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{cert.gstin}</CardTitle>
                      <CardDescription>{cert.legalName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {cert.tradeName && (
                          <p className="text-sm"><strong>Trade Name:</strong> {cert.tradeName}</p>
                        )}
                        <div className="flex justify-between items-center">
                          <span>Status:</span>
                          {getStatusBadge(cert.status)}
                        </div>
                        <p className="text-sm text-gray-600">
                          Uploaded: {formatDate(cert.uploadedAt)}
                        </p>
                        {cert.verifiedAt && (
                          <p className="text-sm text-green-600">
                            Verified: {formatDate(cert.verifiedAt)}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No certificates uploaded</h3>
                  <p className="text-gray-600 mb-4">Upload your first GST certificate to get started</p>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Certificate
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details and business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <p className="mt-1 font-medium">{user?.firstName}</p>
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <p className="mt-1 font-medium">{user?.lastName}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="mt-1 font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="mt-1 font-medium">{user?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label>Company Name</Label>
                    <p className="mt-1 font-medium">{user?.companyName || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label>GSTIN</Label>
                    <p className="mt-1 font-medium">{user?.gstin || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label>PAN Number</Label>
                    <p className="mt-1 font-medium">{user?.panNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label>Account Status</Label>
                    <div className="mt-1">
                      {user?.isVerified ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending Verification
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-gray-700">{children}</label>;
}