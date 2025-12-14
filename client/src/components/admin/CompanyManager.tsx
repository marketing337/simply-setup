import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Upload, 
  FileText, 
  Database, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Building2,
  Download,
  RefreshCw,
  BarChart3
} from "lucide-react";

interface CompanyStats {
  totalCompanies: number;
  activeCompanies: number;
  recentlyAdded: number;
  processingStatus: string;
}

interface UploadProgress {
  stage: string;
  current: number;
  total: number;
  percentage: number;
  message: string;
  errors: string[];
}

export default function CompanyManager() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [validationResults, setValidationResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch company statistics
  const { data: stats, isLoading: statsLoading } = useQuery<CompanyStats>({
    queryKey: ["/api/admin/companies/stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/companies/stats");
      if (!response.ok) throw new Error("Failed to fetch company statistics");
      return response.json();
    },
  });

  // CSV upload with real-time progress tracking
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // First initiate the upload
      const response = await fetch('/api/admin/companies/bulk-upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      // Handle Server-Sent Events response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let finalResult = null;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataString = line.substring(6).trim();
              
              if (dataString === '[DONE]') {
                return finalResult || { success: true, message: 'Upload completed' };
              }
              
              try {
                const progressData = JSON.parse(dataString);
                
                // Update progress state
                setUploadProgress({
                  stage: progressData.stage || "Processing",
                  current: progressData.current || 0,
                  total: progressData.total || 0,
                  percentage: progressData.percentage || 0,
                  message: progressData.message || "Processing...",
                  errors: progressData.errors || []
                });
                
                // Store final result if it's the completion event
                if (progressData.success !== undefined) {
                  finalResult = progressData;
                }
                
              } catch (e) {
                console.log('Failed to parse progress data:', dataString);
              }
            }
          }
        }
      }

      return finalResult || { success: true, message: 'Upload completed' };
    },
    onSuccess: (data: any) => {
      setIsUploading(false);
      
      // Keep final progress state briefly before clearing
      setTimeout(() => {
        setUploadProgress(null);
      }, 3000);
      
      toast({
        title: "Upload Completed",
        description: data.finalStats 
          ? `Successfully created ${data.finalStats.created} companies. ${data.finalStats.skipped} duplicates skipped.`
          : "Upload completed successfully.",
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/admin/companies/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/companies/stats"] });
      
      // Reset form
      setFile(null);
      setValidationResults(null);
      setPreviewData([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: (error: Error) => {
      setIsUploading(false);
      setUploadProgress(null);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
    onMutate: () => {
      setIsUploading(true);
      setUploadProgress(null);
    },
  });

  // CSV validation mutation
  const validateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/admin/companies/validate-csv", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Validation failed");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setValidationResults(data);
      setPreviewData(data.preview || []);
      toast({
        title: "CSV Validated",
        description: `${data.validRows} valid rows found. ${data.errors?.length || 0} errors detected.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Validation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setValidationResults(null);
      setPreviewData([]);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleValidateCSV = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("csvFile", file);

    validateMutation.mutate(formData);
  };

  const handleUpload = async () => {
    console.log('Upload button clicked');
    console.log('File:', file);
    console.log('Validation results:', validationResults);
    
    if (!file || !validationResults || validationResults.validRows === 0) {
      console.log('Upload blocked - missing requirements');
      return;
    }

    console.log('Starting upload process...');
    setIsUploading(true);
    setUploadProgress({
      stage: "Initializing",
      current: 0,
      total: validationResults.validRows,
      percentage: 0,
      message: "Starting upload process...",
      errors: []
    });

    const formData = new FormData();
    formData.append("csvFile", file);

    console.log('Calling upload mutation...');
    uploadMutation.mutate(formData);
  };

  const downloadTemplate = () => {
    const headers = [
      "CIN",
      "CompanyName", 
      "CompanyROCcode",
      "CompanyCategory",
      "CompanySubCategory",
      "CompanyClass",
      "AuthorizedCapital",
      "PaidupCapital",
      "CompanyRegistrationdate_date",
      "Registered_Office_Address",
      "Listingstatus",
      "CompanyStatus",
      "CompanyStateCode",
      "CompanyIndian/Foreign Company",
      "nic_code",
      "CompanyIndustrialClassification"
    ];

    const csvContent = headers.join(",") + "\n" + 
      "L12345MH2020PLC123456,Example Company Ltd,Mumbai,Company,Non-govt company,Private,1000000.00,500000.00,2020-01-15,123 Business Park Mumbai Maharashtra 400001,Unlisted,Active,MAHARASHTRA,Indian Company,12345,Manufacturing";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? "..." : stats?.totalCompanies.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered companies in database
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? "..." : stats?.activeCompanies.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently operating businesses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Additions</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsLoading ? "..." : stats?.recentlyAdded.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Added in last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Bulk Company Upload</span>
          </CardTitle>
          <CardDescription>
            Upload CSV files to add multiple companies and automatically generate company pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Download */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Download CSV Template</h4>
              <p className="text-sm text-gray-600">
                Get the correct format for company data upload
              </p>
            </div>
            <Button variant="outline" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <Separator />

          {/* File Upload */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="csv-file">Select CSV File</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="mt-1"
              />
              {file && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={handleValidateCSV}
                disabled={!file || validateMutation.isPending}
                variant="outline"
              >
                {validateMutation.isPending ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Validate CSV
              </Button>

              <Button
                onClick={handleUpload}
                disabled={!file || !validationResults || isUploading || validationResults.validRows === 0}
                className="bg-primary hover:bg-primary/90"
              >
                {isUploading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Upload & Process
              </Button>
            </div>
          </div>

          {/* Validation Results */}
          {validationResults && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h4 className="font-medium mb-3">Validation Results</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {validationResults.totalRows}
                    </div>
                    <div className="text-sm text-gray-600">Total Rows</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {validationResults.validRows}
                    </div>
                    <div className="text-sm text-gray-600">Valid Rows</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {validationResults.errors?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Errors</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {validationResults.duplicates || 0}
                    </div>
                    <div className="text-sm text-gray-600">Duplicates</div>
                  </div>
                </div>

                {validationResults.errors && validationResults.errors.length > 0 && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Validation Errors Found:</strong>
                      <ul className="mt-2 list-disc list-inside">
                        {validationResults.errors.slice(0, 5).map((error: string, index: number) => (
                          <li key={index} className="text-sm">{error}</li>
                        ))}
                        {validationResults.errors.length > 5 && (
                          <li className="text-sm">... and {validationResults.errors.length - 5} more errors</li>
                        )}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {validationResults.isValid && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      CSV validation passed! Ready to upload {validationResults.validRows} companies.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploadProgress && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h4 className="font-medium mb-3">Upload Progress</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>{uploadProgress.stage}</span>
                    <span>{uploadProgress.current} / {uploadProgress.total}</span>
                  </div>
                  <Progress value={uploadProgress.percentage} className="h-2" />
                  <p className="text-sm text-gray-600">{uploadProgress.message}</p>
                  
                  {uploadProgress.errors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Processing Errors:</strong>
                        <ul className="mt-2 list-disc list-inside">
                          {uploadProgress.errors.slice(0, 3).map((error, index) => (
                            <li key={index} className="text-sm">{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Preview Data */}
          {previewData.length > 0 && (
            <div className="space-y-4">
              <Separator />
              <div>
                <h4 className="font-medium mb-3">Data Preview (First 5 rows)</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left border-b">CIN</th>
                        <th className="px-3 py-2 text-left border-b">Company Name</th>
                        <th className="px-3 py-2 text-left border-b">Status</th>
                        <th className="px-3 py-2 text-left border-b">State</th>
                        <th className="px-3 py-2 text-left border-b">Capital</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(0, 5).map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-3 py-2 font-mono text-xs">{row.CIN}</td>
                          <td className="px-3 py-2">{row.CompanyName}</td>
                          <td className="px-3 py-2">
                            <Badge variant={row.CompanyStatus === 'Active' ? 'default' : 'secondary'}>
                              {row.CompanyStatus}
                            </Badge>
                          </td>
                          <td className="px-3 py-2">{row.CompanyStateCode}</td>
                          <td className="px-3 py-2">₹{parseFloat(row.AuthorizedCapital || 0).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Upload Instructions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Required CSV Columns:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 list-disc list-inside space-y-1">
                <li><strong>CIN:</strong> Corporate Identification Number (Required)</li>
                <li><strong>CompanyName:</strong> Full company name (Required)</li>
                <li><strong>CompanyROCcode:</strong> Registrar of Companies code</li>
                <li><strong>CompanyCategory:</strong> Business category</li>
                <li><strong>CompanyClass:</strong> Private/Public classification</li>
                <li><strong>AuthorizedCapital:</strong> Authorized capital amount</li>
                <li><strong>PaidupCapital:</strong> Paid-up capital amount</li>
                <li><strong>CompanyStatus:</strong> Active/Dormant/Strike-off</li>
                <li><strong>CompanyStateCode:</strong> State of registration</li>
                <li><strong>Registered_Office_Address:</strong> Complete address</li>
                <li><strong>CompanyIndustrialClassification:</strong> Industry type</li>
                <li><strong>Listingstatus:</strong> Listed/Unlisted status</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Processing Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Automatic duplicate detection based on CIN numbers</li>
                <li>Data validation and error reporting</li>
                <li>Batch processing for large files (up to 100,000 records)</li>
                <li>Automatic SEO-friendly URL generation for each company</li>
                <li>Real-time progress tracking during upload</li>
                <li>Error recovery and partial processing support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}