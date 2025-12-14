import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Plus, X, FileText, Settings, Target, CheckCircle, AlertCircle, DollarSign, Award, Scale, Shield, FileCheck } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertServiceSchema, type InsertService } from "@shared/schema";

interface EnhancedServiceDialogProps {
  service?: any;
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  { code: "IN", name: "India", currency: "INR" },
  { code: "SG", name: "Singapore", currency: "SGD" },
  { code: "US", name: "United States", currency: "USD" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
];

export default function EnhancedServiceDialog({ service, isOpen, onClose }: EnhancedServiceDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("basic");

  // Enhanced form with all the new fields
  const form = useForm<InsertService>({
    resolver: zodResolver(insertServiceSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      longDescription: "",
      country: "India",
      countryCode: "IN",
      price: "0",
      currency: "INR",
      processingTime: "",
      features: [],
      requirements: [],
      category: "",
      isActive: true,
      isPopular: false,
      heroImage: "",
      // Enhanced content fields
      overviewTitle: "",
      overviewContent: "",
      overviewHighlights: [],
      typesTitle: "",
      typesContent: "",
      serviceTypes: [],
      eligibilityTitle: "",
      eligibilityContent: "",
      eligibilityCriteria: [],
      documentsTitle: "",
      documentsContent: "",
      requiredDocuments: [],
      processTitle: "",
      processContent: "",
      processSteps: [],
      feesTitle: "",
      feesContent: "",
      feeStructure: [],
      benefitsTitle: "",
      benefitsContent: "",
      benefits: [],
      comparisonTitle: "",
      comparisonContent: "",
      comparisonTable: "",
      complianceTitle: "",
      complianceContent: "",
      complianceRequirements: [],
      certificateTitle: "",
      certificateContent: "",
      certificateDetails: [],
      metaTitle: "",
      metaDescription: "",
      keywords: [],
    },
  });

  // Populate form with existing service data
  useEffect(() => {
    if (service) {
      form.reset({
        ...service,
        price: service.price?.toString() || "0",
        features: service.features || [],
        requirements: service.requirements || [],
        overviewHighlights: service.overviewHighlights || [],
        serviceTypes: service.serviceTypes || [],
        eligibilityCriteria: service.eligibilityCriteria || [],
        requiredDocuments: service.requiredDocuments || [],
        processSteps: service.processSteps || [],
        feeStructure: service.feeStructure || [],
        benefits: service.benefits || [],
        complianceRequirements: service.complianceRequirements || [],
        certificateDetails: service.certificateDetails || [],
        keywords: service.keywords || [],
      });
    }
  }, [service, form]);

  // Auto-generate slug from name
  const watchName = form.watch("name");
  useEffect(() => {
    if (watchName && !service) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      form.setValue("slug", slug);
    }
  }, [watchName, service, form]);

  // Helper function to manage array fields
  const addArrayItem = (fieldName: keyof InsertService, value: string) => {
    if (!value.trim()) return;
    const currentValue = form.getValues(fieldName) as string[];
    form.setValue(fieldName, [...currentValue, value.trim()] as any);
  };

  const removeArrayItem = (fieldName: keyof InsertService, index: number) => {
    const currentValue = form.getValues(fieldName) as string[];
    form.setValue(fieldName, currentValue.filter((_, i) => i !== index) as any);
  };

  // Array field component
  const ArrayFieldComponent = ({ 
    label, 
    fieldName, 
    placeholder, 
    description 
  }: { 
    label: string; 
    fieldName: keyof InsertService; 
    placeholder: string; 
    description?: string; 
  }) => {
    const [inputValue, setInputValue] = useState("");
    const currentValue = form.watch(fieldName) as string[] || [];

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItem(fieldName, inputValue);
                setInputValue("");
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              addArrayItem(fieldName, inputValue);
              setInputValue("");
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {currentValue.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {currentValue.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2"
                  onClick={() => removeArrayItem(fieldName, index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  };

  const createServiceMutation = useMutation({
    mutationFn: async (data: InsertService) => {
      const response = await apiRequest("POST", "/api/services", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Success", description: "Service created successfully" });
      onClose();
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create service",
        variant: "destructive",
      });
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: async (data: InsertService) => {
      const response = await apiRequest("PUT", `/api/services/${service.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Success", description: "Service updated successfully" });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update service",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertService) => {
    if (service) {
      updateServiceMutation.mutate(data);
    } else {
      createServiceMutation.mutate(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-screen overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Service" : "Create New Service"}
          </DialogTitle>
          <DialogDescription>
            Create comprehensive service pages with all required sections including overview, types, eligibility, documents, process, fees, benefits, comparison, compliance, and certificate information.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Basic
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="structure" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Structure
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Compliance
                </TabsTrigger>
                <TabsTrigger value="seo" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  SEO
                </TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Configure the fundamental service details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Service Name</Label>
                        <Input {...form.register("name")} placeholder="e.g., GST Registration" />
                      </div>
                      <div>
                        <Label>URL Slug</Label>
                        <Input {...form.register("slug")} placeholder="gst-registration" />
                      </div>
                    </div>

                    <div>
                      <Label>Short Description</Label>
                      <Textarea 
                        {...form.register("description")} 
                        placeholder="Brief description of the service"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Long Description</Label>
                      <Textarea 
                        {...form.register("longDescription")} 
                        placeholder="Detailed description of the service"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Country</Label>
                        <select 
                          {...form.register("country")} 
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Price ({form.watch("currency")})</Label>
                        <Input 
                          {...form.register("price")} 
                          type="number" 
                          placeholder="0" 
                        />
                      </div>
                      <div>
                        <Label>Processing Time</Label>
                        <Input 
                          {...form.register("processingTime")} 
                          placeholder="7-10 business days" 
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Category</Label>
                      <Input 
                        {...form.register("category")} 
                        placeholder="e.g., Registration, Compliance, Tax" 
                      />
                    </div>

                    <div>
                      <Label>Hero Image URL</Label>
                      <Input 
                        {...form.register("heroImage")} 
                        placeholder="https://example.com/image.jpg" 
                      />
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...form.register("isActive")}
                          className="rounded"
                        />
                        <span>Active</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...form.register("isPopular")}
                          className="rounded"
                        />
                        <span>Popular</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <ArrayFieldComponent
                        label="Features"
                        fieldName="features"
                        placeholder="Add a feature"
                        description="Key features of this service"
                      />
                      <ArrayFieldComponent
                        label="Requirements"
                        fieldName="requirements"
                        placeholder="Add a requirement"
                        description="Basic requirements for this service"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Sections Tab */}
              <TabsContent value="content" className="space-y-6">
                {/* Overview Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Overview Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Overview Title</Label>
                      <Input 
                        {...form.register("overviewTitle")} 
                        placeholder="Service Overview" 
                      />
                    </div>
                    <div>
                      <Label>Overview Content</Label>
                      <Textarea 
                        {...form.register("overviewContent")} 
                        placeholder="Detailed overview content..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Overview Highlights"
                      fieldName="overviewHighlights"
                      placeholder="Add a highlight"
                      description="Key highlights to showcase"
                    />
                  </CardContent>
                </Card>

                {/* Types Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Types Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Types Title</Label>
                      <Input 
                        {...form.register("typesTitle")} 
                        placeholder="Types of Service" 
                      />
                    </div>
                    <div>
                      <Label>Types Content</Label>
                      <Textarea 
                        {...form.register("typesContent")} 
                        placeholder="Describe different types available..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Service Types"
                      fieldName="serviceTypes"
                      placeholder="Add a service type"
                      description="Different types of this service"
                    />
                  </CardContent>
                </Card>

                {/* Benefits Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Benefits Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Benefits Title</Label>
                      <Input 
                        {...form.register("benefitsTitle")} 
                        placeholder="Benefits" 
                      />
                    </div>
                    <div>
                      <Label>Benefits Content</Label>
                      <Textarea 
                        {...form.register("benefitsContent")} 
                        placeholder="Describe the benefits..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Benefits List"
                      fieldName="benefits"
                      placeholder="Add a benefit"
                      description="Specific benefits of this service"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Structure Tab */}
              <TabsContent value="structure" className="space-y-6">
                {/* Eligibility Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Eligibility Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Eligibility Title</Label>
                      <Input 
                        {...form.register("eligibilityTitle")} 
                        placeholder="Eligibility Criteria" 
                      />
                    </div>
                    <div>
                      <Label>Eligibility Content</Label>
                      <Textarea 
                        {...form.register("eligibilityContent")} 
                        placeholder="Describe eligibility requirements..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Eligibility Criteria"
                      fieldName="eligibilityCriteria"
                      placeholder="Add eligibility criterion"
                      description="Specific eligibility requirements"
                    />
                  </CardContent>
                </Card>

                {/* Documents Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documents Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Documents Title</Label>
                      <Input 
                        {...form.register("documentsTitle")} 
                        placeholder="Required Documents" 
                      />
                    </div>
                    <div>
                      <Label>Documents Content</Label>
                      <Textarea 
                        {...form.register("documentsContent")} 
                        placeholder="Describe document requirements..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Required Documents"
                      fieldName="requiredDocuments"
                      placeholder="Add a document"
                      description="Documents needed for this service"
                    />
                  </CardContent>
                </Card>

                {/* Process Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Process Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Process Title</Label>
                      <Input 
                        {...form.register("processTitle")} 
                        placeholder="Process" 
                      />
                    </div>
                    <div>
                      <Label>Process Content</Label>
                      <Textarea 
                        {...form.register("processContent")} 
                        placeholder="Describe the process..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Process Steps"
                      fieldName="processSteps"
                      placeholder="Add a process step"
                      description="Step-by-step process description"
                    />
                  </CardContent>
                </Card>

                {/* Fees Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Fees Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Fees Title</Label>
                      <Input 
                        {...form.register("feesTitle")} 
                        placeholder="Fees" 
                      />
                    </div>
                    <div>
                      <Label>Fees Content</Label>
                      <Textarea 
                        {...form.register("feesContent")} 
                        placeholder="Describe the fee structure..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Fee Structure"
                      fieldName="feeStructure"
                      placeholder="Add fee item"
                      description="Detailed fee breakdown"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compliance Tab */}
              <TabsContent value="compliance" className="space-y-6">
                {/* Comparison Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      Comparison Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Comparison Title</Label>
                      <Input 
                        {...form.register("comparisonTitle")} 
                        placeholder="Comparison" 
                      />
                    </div>
                    <div>
                      <Label>Comparison Content</Label>
                      <Textarea 
                        {...form.register("comparisonContent")} 
                        placeholder="Describe comparison information..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label>Comparison Table (JSON)</Label>
                      <Textarea 
                        {...form.register("comparisonTable")} 
                        placeholder='{"headers": ["Feature", "Basic", "Premium"], "rows": [["Feature 1", "Yes", "Yes"]]}'
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Compliance Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Compliance Title</Label>
                      <Input 
                        {...form.register("complianceTitle")} 
                        placeholder="Compliance" 
                      />
                    </div>
                    <div>
                      <Label>Compliance Content</Label>
                      <Textarea 
                        {...form.register("complianceContent")} 
                        placeholder="Describe compliance requirements..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Compliance Requirements"
                      fieldName="complianceRequirements"
                      placeholder="Add compliance requirement"
                      description="Regulatory compliance requirements"
                    />
                  </CardContent>
                </Card>

                {/* Certificate Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Certificate Section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Certificate Title</Label>
                      <Input 
                        {...form.register("certificateTitle")} 
                        placeholder="Certificate" 
                      />
                    </div>
                    <div>
                      <Label>Certificate Content</Label>
                      <Textarea 
                        {...form.register("certificateContent")} 
                        placeholder="Describe certificate details..."
                        rows={4}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Certificate Details"
                      fieldName="certificateDetails"
                      placeholder="Add certificate detail"
                      description="Details about certificates provided"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      SEO Configuration
                    </CardTitle>
                    <CardDescription>
                      Optimize your service page for search engines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Meta Title</Label>
                      <Input 
                        {...form.register("metaTitle")} 
                        placeholder="SEO optimized title" 
                      />
                    </div>
                    <div>
                      <Label>Meta Description</Label>
                      <Textarea 
                        {...form.register("metaDescription")} 
                        placeholder="SEO optimized description..."
                        rows={3}
                      />
                    </div>
                    <ArrayFieldComponent
                      label="Keywords"
                      fieldName="keywords"
                      placeholder="Add a keyword"
                      description="SEO keywords for this service"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Separator />
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createServiceMutation.isPending || updateServiceMutation.isPending}
              >
                {createServiceMutation.isPending || updateServiceMutation.isPending 
                  ? "Saving..." 
                  : service ? "Update Service" : "Create Service"
                }
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}