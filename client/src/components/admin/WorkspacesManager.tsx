import { useState, useEffect, useRef } from "react";
import {
  useAllWorkspaces,
  useCreateWorkspace,
  useUpdateWorkspace,
  useDeleteWorkspace,
  useBulkCreateWorkspaces
} from "@/lib/api";
import { useAllVendors } from "@/lib/api-vendors";
import { useLocation } from "@/hooks/useLocation";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { parse } from "csv-parse/browser/esm/sync";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  InsertWorkspace, 
  Location, 
  Workspace, 
  insertWorkspaceSchema 
} from "@shared/schema";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  PlusCircle,
  Building, 
  Loader2,
  Upload,
  FileUp,
  SparklesIcon
} from "lucide-react";
import { useAreasByLocationId, useCreateArea } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";

// Form schema using zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  mapCoordinates: z.string().optional(),
  locationId: z.number().int().positive("Please select a location"),
  areaId: z.number().int().positive("Please select an area").optional(),
  vendorId: z.number().int().positive("Please select a vendor").optional(),
  
  // Legacy pricing (for backward compatibility)
  monthlyPrice: z.string().optional(),
  
  // 3-Tier pricing system
  enableTieredPricing: z.boolean().default(false),
  tier1Name: z.string().optional(),
  tier1Price: z.string().optional(),
  tier1Description: z.string().optional(),
  tier1FeaturesStr: z.string().optional(),
  tier2Name: z.string().optional(),
  tier2Price: z.string().optional(),
  tier2Description: z.string().optional(),
  tier2FeaturesStr: z.string().optional(),
  tier3Name: z.string().optional(),
  tier3Price: z.string().optional(),
  tier3Description: z.string().optional(),
  tier3FeaturesStr: z.string().optional(),
  
  amenities: z.array(z.string()).default([]),
  amenitiesStr: z.string().optional(), // Keep for backward compatibility
  imagesStr: z.string().optional(),
  mainImage: z.string().optional(),
  contactPerson: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  isActive: z.boolean().default(true),
  status: z.enum(['available', 'occupied', 'maintenance', 'coming_soon']).default('available')
});

type FormValues = z.infer<typeof formSchema>;

export default function WorkspacesManager() {
  const { data: workspaces, isLoading: workspacesLoading } = useAllWorkspaces();
  const { allLocations: locations } = useLocation();
  const { data: vendors } = useAllVendors();
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const { data: areas } = useAreasByLocationId(selectedLocation || undefined);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);
  const [isProcessingCsv, setIsProcessingCsv] = useState(false);
  const [csvImportResults, setCsvImportResults] = useState<any>(null);
  const [editingWorkspace, setEditingWorkspace] = useState<Workspace | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<Workspace | null>(null);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isNewAreaDialogOpen, setIsNewAreaDialogOpen] = useState(false);
  const [newAreaName, setNewAreaName] = useState("");
  const [newAreaSlug, setNewAreaSlug] = useState("");
  const [isCreatingArea, setIsCreatingArea] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  
  // Function to format a string as a slug
  const formatSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const createWorkspace = useCreateWorkspace();
  const updateWorkspace = useUpdateWorkspace();
  const deleteWorkspace = useDeleteWorkspace();
  const bulkCreateWorkspaces = useBulkCreateWorkspaces();
  const createArea = useCreateArea();
  
  // Form default values
  const defaultValues: Partial<FormValues> = {
    name: "",
    slug: "",
    description: "",
    address: "",
    mapCoordinates: "",
    monthlyPrice: "0",
    enableTieredPricing: false,
    tier1Name: "Business Address",
    tier1Price: "",
    tier1Description: "",
    tier1FeaturesStr: "",
    tier2Name: "GST Registration",
    tier2Price: "",
    tier2Description: "",
    tier2FeaturesStr: "",
    tier3Name: "Company Registration",
    tier3Price: "",
    tier3Description: "",
    tier3FeaturesStr: "",
    isActive: true,
    amenities: [],
    amenitiesStr: "",
    imagesStr: "",
    status: "available",
  };
  
  // Create form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  // Reset form when opening create dialog or changing editing workspace
  useEffect(() => {
    if (isCreateOpen) {
      form.reset(defaultValues);
    } else if (editingWorkspace) {
      // Convert arrays to comma-separated strings for form display
      const amenitiesStr = editingWorkspace.amenities ? 
        (Array.isArray(editingWorkspace.amenities) ? 
          editingWorkspace.amenities.join(", ") : 
          editingWorkspace.amenities as string) : 
        "";
      
      const imagesStr = editingWorkspace.images ? 
        (Array.isArray(editingWorkspace.images) ? 
          editingWorkspace.images.join(", ") : 
          editingWorkspace.images as string) : 
        "";
      
      // Extract amenities as an array for the checkboxes
      const amenitiesArray = editingWorkspace.amenities 
        ? (Array.isArray(editingWorkspace.amenities) 
            ? editingWorkspace.amenities 
            : (editingWorkspace.amenities as string).split(',').map(item => item.trim()))
        : [];
        
      // Convert status to enum type for type safety
      const statusValue = (editingWorkspace.status === "available" || 
                          editingWorkspace.status === "occupied" || 
                          editingWorkspace.status === "maintenance" || 
                          editingWorkspace.status === "coming_soon") 
                          ? editingWorkspace.status as "available" | "occupied" | "maintenance" | "coming_soon"
                          : "available" as const;
      
      // Format workspace data for the form
      const formData = {
        name: editingWorkspace.name,
        slug: editingWorkspace.slug,
        description: editingWorkspace.description,
        address: editingWorkspace.address,
        mapCoordinates: editingWorkspace.mapCoordinates || "",
        locationId: editingWorkspace.locationId,
        areaId: editingWorkspace.areaId || undefined,
        vendorId: editingWorkspace.vendorId || undefined,
        monthlyPrice: editingWorkspace.monthlyPrice || undefined,
        
        // 3-Tier pricing data
        enableTieredPricing: editingWorkspace.enableTieredPricing || false,
        tier1Name: editingWorkspace.tier1Name || "Business Address",
        tier1Price: editingWorkspace.tier1Price || "",
        tier1Description: editingWorkspace.tier1Description || "",
        tier1FeaturesStr: editingWorkspace.tier1Features ? 
          (Array.isArray(editingWorkspace.tier1Features) ? 
            editingWorkspace.tier1Features.join(", ") : 
            editingWorkspace.tier1Features as string) : "",
        
        tier2Name: editingWorkspace.tier2Name || "GST Registration",
        tier2Price: editingWorkspace.tier2Price || "",
        tier2Description: editingWorkspace.tier2Description || "",
        tier2FeaturesStr: editingWorkspace.tier2Features ? 
          (Array.isArray(editingWorkspace.tier2Features) ? 
            editingWorkspace.tier2Features.join(", ") : 
            editingWorkspace.tier2Features as string) : "",
        
        tier3Name: editingWorkspace.tier3Name || "Company Registration",
        tier3Price: editingWorkspace.tier3Price || "",
        tier3Description: editingWorkspace.tier3Description || "",
        tier3FeaturesStr: editingWorkspace.tier3Features ? 
          (Array.isArray(editingWorkspace.tier3Features) ? 
            editingWorkspace.tier3Features.join(", ") : 
            editingWorkspace.tier3Features as string) : "",
        
        isActive: editingWorkspace.isActive,
        status: statusValue, // Use the safely converted status value
        mainImage: editingWorkspace.mainImage || undefined,
        contactPerson: editingWorkspace.contactPerson || undefined,
        contactEmail: editingWorkspace.contactEmail || undefined,
        contactPhone: editingWorkspace.contactPhone || undefined,
        amenities: amenitiesArray,
        amenitiesStr,
        imagesStr,
      };
      
      form.reset(formData);
      
      // Set the selected location for area dropdown
      if (editingWorkspace.locationId) {
        setSelectedLocation(editingWorkspace.locationId);
      }
    }
  }, [isCreateOpen, editingWorkspace, form]);
  
  // Handle location change to load areas
  const handleLocationChange = (locationId: string) => {
    const id = parseInt(locationId);
    setSelectedLocation(id);
    form.setValue("locationId", id);
    // Reset area selection when location changes
    form.setValue("areaId", undefined);
  };
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form data:", data);
      
      // Prepare the data, using our arrays and converting comma-separated strings as needed
      const formattedData: Partial<InsertWorkspace> = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        address: data.address,
        locationId: data.locationId,
        // Keep monthlyPrice as a string
        monthlyPrice: data.monthlyPrice,
        
        // 3-Tier pricing data
        enableTieredPricing: data.enableTieredPricing,
        tier1Name: data.tier1Name,
        tier1Price: data.tier1Price,
        tier1Description: data.tier1Description,
        tier1Features: data.tier1FeaturesStr ? data.tier1FeaturesStr.split(",").map(item => item.trim()) : [],
        
        tier2Name: data.tier2Name,
        tier2Price: data.tier2Price,
        tier2Description: data.tier2Description,
        tier2Features: data.tier2FeaturesStr ? data.tier2FeaturesStr.split(",").map(item => item.trim()) : [],
        
        tier3Name: data.tier3Name,
        tier3Price: data.tier3Price,
        tier3Description: data.tier3Description,
        tier3Features: data.tier3FeaturesStr ? data.tier3FeaturesStr.split(",").map(item => item.trim()) : [],
        
        isActive: data.isActive,
        status: data.status,
        // Prefer the amenities array from checkboxes, but fall back to string parsing for backward compatibility
        amenities: data.amenities && data.amenities.length > 0 
          ? data.amenities 
          : (data.amenitiesStr ? data.amenitiesStr.split(",").map(item => item.trim()) : []),
        images: data.imagesStr ? data.imagesStr.split(",").map(item => item.trim()) : [],
      };
      
      // Add optional fields only if they exist
      if (data.areaId) formattedData.areaId = data.areaId;
      if (data.vendorId) formattedData.vendorId = data.vendorId;
      if (data.mapCoordinates) formattedData.mapCoordinates = data.mapCoordinates;
      if (data.mainImage) formattedData.mainImage = data.mainImage;
      if (data.contactPerson) formattedData.contactPerson = data.contactPerson;
      if (data.contactEmail) formattedData.contactEmail = data.contactEmail;
      if (data.contactPhone) formattedData.contactPhone = data.contactPhone;
      
      if (editingWorkspace) {
        // Update existing workspace
        await updateWorkspace.mutateAsync({
          id: editingWorkspace.id,
          data: formattedData,
        });
        
        toast({
          title: "Workspace updated",
          description: "The workspace has been successfully updated.",
        });
        
        setEditingWorkspace(null);
      } else {
        // Create new workspace
        await createWorkspace.mutateAsync(formattedData);
        
        toast({
          title: "Workspace created",
          description: "The new workspace has been successfully created.",
        });
        
        setIsCreateOpen(false);
      }
      
      form.reset(defaultValues);
    } catch (error) {
      console.error("Error saving workspace:", error);
      toast({
        title: "Error",
        description: "There was an error saving the workspace. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle workspace deletion
  const handleDelete = async () => {
    if (!workspaceToDelete) return;
    
    try {
      await deleteWorkspace.mutateAsync(workspaceToDelete.id);
      
      toast({
        title: "Workspace deleted",
        description: "The workspace has been successfully deleted.",
      });
      
      setWorkspaceToDelete(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting workspace:", error);
      toast({
        title: "Error",
        description: "There was an error deleting the workspace. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle CSV import
  const handleCsvImport = async () => {
    if (!fileInputRef.current?.files?.length) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsProcessingCsv(true);
      const file = fileInputRef.current.files[0];
      
      // Enhanced file reading with encoding detection
      let content: string;
      try {
        // First try UTF-8
        content = await file.text();
      } catch (error) {
        // If UTF-8 fails, try reading as binary and converting
        const arrayBuffer = await file.arrayBuffer();
        const decoder = new TextDecoder('utf-8', { fatal: false });
        content = decoder.decode(arrayBuffer);
        
        // If still has issues, try Windows-1252 encoding
        if (!content || content.includes('�')) {
          const decoder2 = new TextDecoder('windows-1252');
          content = decoder2.decode(arrayBuffer);
        }
      }
      
      if (!content || content.trim().length === 0) {
        throw new Error("The CSV file appears to be empty or corrupted.");
      }
      
      // Parse CSV with more flexible options
      const records = parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relaxColumnCount: true,
        delimiter: ',',
        quote: '"'
      });
      
      if (!records || records.length === 0) {
        throw new Error("No valid data found in the CSV file.");
      }
      
      // Process the records with better error handling
      const workspaces = records.map((record: any, index: number) => {
        try {
          // Process arrays stored as strings
          const processStringToArray = (value: string | undefined) => {
            if (!value || value.trim() === '') return [];
            return value.split(',').map((item: string) => item.trim()).filter(Boolean);
          };

          // Handle different CSV column formats
          const getName = () => record.name?.trim() || record['Workspace name']?.trim() || record['workspace_name']?.trim();
          const getAddress = () => record.address?.trim() || record['Address']?.trim() || record['workspace_address']?.trim();
          const getSlug = () => record.slug?.trim() || record['Slug']?.trim() || formatSlug(getName() || `workspace-${index}`);
          const getDescription = () => record.description?.trim() || record['Description']?.trim() || record['desc']?.trim() || "";
          const getLocationId = () => {
            const locId = record.locationId || record['Location id'] || record['location_id'] || record['Location ID'];
            return locId ? parseInt(locId.toString()) : undefined;
          };
          const getPrice = () => {
            const price = record.monthlyPrice || record['Monthly Price'] || record['price'] || record['Price'];
            return price ? parseFloat(price.toString()) : undefined;
          };
          const getMapCoordinates = () => {
            // Extract coordinates from address link if available
            const addressLink = record['address  link'] || record['address_link'] || record['map_link'];
            if (addressLink) {
              const coordMatch = addressLink.match(/cp=([0-9.-]+)%7E([0-9.-]+)/);
              if (coordMatch) {
                return `${coordMatch[1]}, ${coordMatch[2]}`;
              }
            }
            return record.mapCoordinates?.trim() || record['Map Coordinates']?.trim() || record['coordinates']?.trim() || "";
          };

          // Convert to proper data types with validation
          const workspace: any = {
            name: getName(),
            slug: getSlug(),
            description: getDescription(),
            locationId: getLocationId(),
            address: getAddress(),
            monthlyPrice: getPrice(),
            mapCoordinates: getMapCoordinates()
          };
          
          // Validate required fields
          if (!workspace.name) {
            throw new Error(`Row ${index + 2}: Missing required field 'name'`);
          }
          if (!workspace.locationId || isNaN(workspace.locationId)) {
            throw new Error(`Row ${index + 2}: Missing or invalid 'locationId'`);
          }
          if (!workspace.address) {
            throw new Error(`Row ${index + 2}: Missing required field 'address'`);
          }
          
          // Add optional fields if they exist
          if (record.areaId) {
            const areaId = parseInt(record.areaId.toString());
            if (!isNaN(areaId)) workspace.areaId = areaId;
          }
          if (record.vendorId) {
            const vendorId = parseInt(record.vendorId.toString());
            if (!isNaN(vendorId)) workspace.vendorId = vendorId;
          }
          
          // Handle status - default to available if not specified or invalid
          const statusValue = record.status || record['Status'] || 'Available';
          if (statusValue && ["available", "occupied", "maintenance", "coming_soon", "Available", "Occupied", "Maintenance", "Coming Soon"].includes(statusValue.trim())) {
            workspace.status = statusValue.toLowerCase().replace(' ', '_') as "available" | "occupied" | "maintenance" | "coming_soon";
          } else {
            workspace.status = "available"; // default status
          }
          
          // Handle contact information
          const contactPhone = record.contactPhone || record['Contact number'] || record['contact_number'] || record['phone'];
          if (contactPhone?.trim()) workspace.contactPhone = contactPhone.trim();
          
          const website = record.website || record['Website'] || record['url'];
          if (website?.trim()) workspace.mainImage = website.trim(); // Store website in mainImage field for now
          
          if (record.contactPerson?.trim()) workspace.contactPerson = record.contactPerson.trim();
          if (record.contactEmail?.trim()) workspace.contactEmail = record.contactEmail.trim();
          
          // Handle arrays
          if (record.amenities) workspace.amenities = processStringToArray(record.amenities);
          if (record.features) workspace.features = processStringToArray(record.features);
          if (record.images) workspace.images = processStringToArray(record.images);
          
          // Handle boolean values
          if (record.isActive !== undefined) {
            workspace.isActive = record.isActive.toString().toLowerCase() === 'true';
          }
          
          return workspace;
        } catch (error) {
          throw new Error(`${error instanceof Error ? error.message : `Row ${index + 2}: Invalid data`}`);
        }
      });
      
      console.log('Sending workspaces to server:', workspaces);
      
      // Send to server using our mutation
      const result = await bulkCreateWorkspaces.mutateAsync(workspaces);
      
      console.log('Received result from server:', result);
      
      // Update UI with results
      setCsvImportResults(result);
      
      // Show toast
      const { success, errors } = result.results;
      toast({
        title: `Import completed`,
        description: `${success.length} workspaces imported successfully, ${errors.length} failed.`,
        variant: errors.length > 0 ? "destructive" : "default",
      });
    } catch (error) {
      console.error('Error importing CSV:', error);
      
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Please check your CSV format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingCsv(false);
    }
  };
  
  // Function to get location name by ID
  const getLocationName = (locationId?: number | null) => {
    if (!locationId || !locations) return "Unknown";
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.name : "Unknown";
  };
  
  // Function to get area name by ID
  const getAreaName = (areaId?: number | null) => {
    if (!areaId || !areas) return "";
    const area = areas.find(a => a.id === areaId);
    return area ? area.name : "";
  };
  
  // Function to get vendor name by ID
  const getVendorName = (vendorId?: number | null) => {
    if (!vendorId || !vendors) return "";
    const vendor = vendors.find(v => v.id === vendorId);
    return vendor ? vendor.name : "";
  };
  
  // Handle creating a new area
  const handleCreateArea = async () => {
    if (!selectedLocation) {
      toast({
        title: "Error",
        description: "Please select a location first.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newAreaName || !newAreaSlug) {
      toast({
        title: "Error",
        description: "Name and slug are required for the new area.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsCreatingArea(true);
      
      const locationName = getLocationName(selectedLocation);
      
      const areaData = {
        name: newAreaName,
        slug: newAreaSlug,
        locationId: selectedLocation,
        description: `${newAreaName} is a popular area in ${locationName} featuring various workspace options.`,
        address: `${newAreaName}, ${locationName}`, // Required field
        features: [], // Default empty array
        isPopular: false,
        heroImage: "", // Optional but including for completeness
        zipCode: "", // Optional
        mapCoordinates: "" // Optional
      };
      
      const newArea = await createArea.mutateAsync(areaData);
      
      toast({
        title: "Area created",
        description: `The area "${newAreaName}" has been created successfully.`
      });
      
      // Refresh areas for the selected location
      await queryClient.invalidateQueries({ queryKey: ['/api/locations', selectedLocation, 'areas'] });
      
      // Set the newly created area as the selected area after a brief delay to allow for data refresh
      if (newArea && newArea.id) {
        setTimeout(() => {
          form.setValue("areaId", newArea.id);
        }, 300);
      }
      
      // Close the dialog and reset fields
      setNewAreaName("");
      setNewAreaSlug("");
      setIsNewAreaDialogOpen(false);
    } catch (error) {
      console.error("Error creating area:", error);
      toast({
        title: "Error creating area",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingArea(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Workspace Management</h2>
        
        <div className="flex gap-2">
          {/* CSV Import Dialog */}
          <Dialog open={isCsvImportOpen} onOpenChange={(open) => {
            setIsCsvImportOpen(open);
            if (!open) {
              // Reset state when closing dialog
              setCsvImportResults(null);
              setSelectedFileName(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FileUp size={16} />
                Import CSV
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Bulk Import Workspaces</DialogTitle>
                <DialogDescription>
                  Upload a CSV file to bulk import workspaces.
                </DialogDescription>
              </DialogHeader>
              
              <div className="my-6 space-y-6">
                {/* CSV Upload Form */}
                <div className="space-y-4">
                  {!csvImportResults && (
                    <>
                      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-4">
                          {selectedFileName 
                            ? `Selected: ${selectedFileName}` 
                            : "Drag and drop a CSV file, or click to browse"}
                        </p>
                        <input
                          type="file"
                          accept=".csv"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={(e) => {
                            if (e.target.files?.length) {
                              setSelectedFileName(e.target.files[0].name);
                            } else {
                              setSelectedFileName(null);
                            }
                          }}
                        />
                        <Button
                          variant="secondary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Select CSV File
                        </Button>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-md">
                        <h4 className="font-medium mb-2">CSV Format Requirements</h4>
                        <p className="text-sm text-muted-foreground">
                          Your CSV file should include the following columns:
                        </p>
                        <ul className="text-sm text-muted-foreground list-disc pl-4 mt-2 space-y-1">
                          <li><strong>Workspace name</strong> - Name of the workspace</li>
                          <li><strong>Address</strong> - Physical address</li>
                          <li><strong>Location id</strong> - Location ID number</li>
                          <li><strong>slug</strong> - URL-friendly name (optional, auto-generated if missing)</li>
                          <li><strong>address  link</strong> - Map link with coordinates (optional)</li>
                          <li><strong>Price</strong> - Monthly price (optional)</li>
                          <li><strong>Website</strong> - Workspace website URL (optional)</li>
                          <li><strong>Contact number</strong> - Contact phone number (optional)</li>
                          <li><strong>Description</strong> - Detailed description (optional)</li>
                        </ul>
                        <p className="text-xs text-muted-foreground mt-2">
                          <strong>Note:</strong> Map coordinates will be automatically extracted from the address link if provided.
                        </p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-xs mt-2"
                          onClick={() => {
                            // Download sample CSV
                            const sampleCsv = `name,slug,description,locationId,address,monthlyPrice,vendorId,status,amenities,features,images,isActive
WeWork Futura,wework-futura,A premium workspace with modern amenities,7,123 Tech Park,5000,1,available,"WiFi, AC, Meeting Room","Prime Location, 24/7 Access",https://example.com/image.jpg,true
`;
                            const blob = new Blob([sampleCsv], { type: 'text/csv' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'workspace_import_template.csv';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }}
                        >
                          Download sample template
                        </Button>
                      </div>
                    </>
                  )}
                  
                  {csvImportResults && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Import Results</h4>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-sm font-medium">Successfully Imported</p>
                            <p className="text-2xl font-bold text-green-600">
                              {csvImportResults.results.success.length}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Failed</p>
                            <p className="text-2xl font-bold text-red-600">
                              {csvImportResults.results.errors.length}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {csvImportResults.results.errors.length > 0 && (
                        <div className="bg-red-50 p-4 rounded-md border border-red-200">
                          <h4 className="font-medium text-red-800 mb-2">Error Details</h4>
                          <div className="max-h-40 overflow-y-auto">
                            {csvImportResults.results.errors.map((error: any, index: number) => (
                              <div key={index} className="text-sm text-red-600 mb-2">
                                <p><strong>Row {index + 1}:</strong> {error.error}</p>
                                <pre className="text-xs bg-red-100 p-1 mt-1 rounded overflow-x-auto">
                                  {JSON.stringify(error.data, null, 2)}
                                </pre>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {csvImportResults.results.success.length > 0 && (
                        <div className="bg-green-50 p-4 rounded-md border border-green-200">
                          <h4 className="font-medium text-green-800 mb-2">Successfully Created Workspaces</h4>
                          <div className="max-h-40 overflow-y-auto">
                            <ul className="list-disc pl-5 text-sm">
                              {csvImportResults.results.success.map((workspace: any) => (
                                <li key={workspace.id} className="text-green-700">
                                  {workspace.name} (/{workspace.slug})
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">
                    {csvImportResults ? "Close" : "Cancel"}
                  </Button>
                </DialogClose>
                
                {!csvImportResults && (
                  <Button 
                    disabled={!selectedFileName || isProcessingCsv}
                    onClick={handleCsvImport}
                  >
                    {isProcessingCsv && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Import Workspaces
                  </Button>
                )}
                
                {csvImportResults && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCsvImportResults(null);
                      setSelectedFileName(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    Import Another File
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Add Workspace Dialog */}
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Add Workspace
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Workspace</DialogTitle>
                <DialogDescription>
                  Add a new workspace to list on the platform.
                </DialogDescription>
              </DialogHeader>
              
              <WorkspaceForm 
                form={form} 
                onSubmit={onSubmit} 
                locations={locations || []}
                areas={areas || []}
                vendors={vendors || []}
                onLocationChange={handleLocationChange}
                isSubmitting={createWorkspace.isPending}
                isGeneratingDescription={isGeneratingDescription}
                setIsGeneratingDescription={setIsGeneratingDescription}
                openNewAreaDialog={() => setIsNewAreaDialogOpen(true)}
                formatSlug={formatSlug}
              />
              
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={createWorkspace.isPending || isGeneratingDescription}
                >
                  {createWorkspace.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Workspace
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Edit workspace dialog */}
      <Dialog open={!!editingWorkspace} onOpenChange={(open) => !open && setEditingWorkspace(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Workspace</DialogTitle>
            <DialogDescription>
              Update the workspace details.
            </DialogDescription>
          </DialogHeader>
          
          <WorkspaceForm 
            form={form} 
            onSubmit={onSubmit} 
            locations={locations || []}
            areas={areas || []}
            vendors={vendors || []}
            onLocationChange={handleLocationChange}
            isSubmitting={updateWorkspace.isPending}
            isGeneratingDescription={isGeneratingDescription}
            setIsGeneratingDescription={setIsGeneratingDescription}
            openNewAreaDialog={() => setIsNewAreaDialogOpen(true)}
            formatSlug={formatSlug}
          />
          
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={updateWorkspace.isPending || isGeneratingDescription}
            >
              {updateWorkspace.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create New Area dialog */}
      <Dialog open={isNewAreaDialogOpen} onOpenChange={setIsNewAreaDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Area</DialogTitle>
            <DialogDescription>
              Add a new area to the selected city.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-sm font-medium leading-none">City</h3>
                <Input 
                  id="city" 
                  value={getLocationName(selectedLocation)} 
                  disabled 
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-sm font-medium leading-none">Area Name</h3>
                <Input 
                  id="areaName" 
                  value={newAreaName} 
                  onChange={(e) => {
                    const name = e.target.value;
                    setNewAreaName(name);
                    // Auto-generate the slug if the slug is empty or was derived from the previous name
                    if (formatSlug && (!newAreaSlug || newAreaSlug === formatSlug(newAreaName))) {
                      setNewAreaSlug(formatSlug(name));
                    }
                  }}
                  placeholder="Koregaon Park" 
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-sm font-medium leading-none">Area Slug</h3>
                <Input 
                  id="areaSlug" 
                  value={newAreaSlug} 
                  onChange={(e) => setNewAreaSlug(e.target.value)} 
                  placeholder="koregaon-park" 
                />
                <p className="text-xs text-muted-foreground">
                  Used in URLs, e.g., /pune/koregaon-park
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAreaDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateArea} 
              disabled={isCreatingArea || !newAreaName || !newAreaSlug}
            >
              {isCreatingArea ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Area"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              workspace from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {deleteWorkspace.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Workspaces list */}
      <Card>
        <CardHeader>
          <CardTitle>Workspaces</CardTitle>
          <CardDescription>
            Manage all workspace listings on the platform.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {workspacesLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : workspaces && workspaces.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workspaces.map((workspace) => (
                    <TableRow key={workspace.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{workspace.name}</span>
                          <span className="text-xs text-gray-500">/{workspace.slug}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getLocationName(workspace.locationId)}</TableCell>
                      <TableCell>{workspace.areaId ? getAreaName(workspace.areaId) : "-"}</TableCell>
                      <TableCell>
                        {workspace.vendorId ? getVendorName(workspace.vendorId) : "-"}
                      </TableCell>
                      <TableCell>
                        ₹{workspace.monthlyPrice}/mo
                      </TableCell>
                      <TableCell>
                        {workspace.status ? (
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            workspace.status === "available" ? "bg-green-100 text-green-800" :
                            workspace.status === "occupied" ? "bg-blue-100 text-blue-800" : 
                            workspace.status === "maintenance" ? "bg-orange-100 text-orange-800" :
                            workspace.status === "coming_soon" ? "bg-purple-100 text-purple-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {workspace.status.charAt(0).toUpperCase() + workspace.status.slice(1).replace("_", " ")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Available
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {workspace.isActive ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingWorkspace(workspace)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setWorkspaceToDelete(workspace);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No workspaces found</h3>
              <p className="text-sm text-gray-500 mt-2">
                Get started by adding your first workspace.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Workspace Form component
interface WorkspaceFormProps {
  form: any;
  onSubmit: (data: FormValues) => void;
  locations: Location[];
  areas: any[];
  vendors?: any[];
  onLocationChange: (locationId: string) => void;
  isSubmitting: boolean;
  isGeneratingDescription: boolean;
  setIsGeneratingDescription: (generating: boolean) => void;
  openNewAreaDialog?: () => void;
  formatSlug?: (text: string) => string;
}

function WorkspaceForm({ 
  form, 
  onSubmit, 
  locations,
  areas,
  vendors = [],
  onLocationChange,
  isSubmitting,
  isGeneratingDescription,
  setIsGeneratingDescription,
  openNewAreaDialog,
  formatSlug
}: WorkspaceFormProps) {
  const { toast } = useToast();
  
  // Function to generate workspace description using AI
  const generateDescription = async () => {
    const workspaceName = form.getValues("name");
    const locationId = form.getValues("locationId");
    const areaId = form.getValues("areaId");
    
    if (!workspaceName) {
      toast({
        title: "Missing information",
        description: "Please enter a workspace name first.",
        variant: "destructive"
      });
      return;
    }
    
    if (!locationId) {
      toast({
        title: "Missing location",
        description: "Please select a location first.",
        variant: "destructive"
      });
      return;
    }
    
    // Find the location and area names
    const location = locations.find(loc => loc.id === locationId);
    if (!location) {
      toast({
        title: "Error",
        description: "Selected location not found.",
        variant: "destructive"
      });
      return;
    }
    
    let areaName = "";
    if (areaId) {
      const area = areas.find(a => a.id === areaId);
      if (area) {
        areaName = area.name;
      }
    }
    
    if (!areaName) {
      toast({
        title: "Missing area",
        description: "Please select an area first.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsGeneratingDescription(true);
      
      const response = await axios.post("/api/ai/generate-workspace-description", {
        workspaceName,
        cityName: location.name,
        areaName
      });
      
      if (response.data && response.data.description) {
        // Update the form with the generated description
        form.setValue("description", response.data.description);
        
        toast({
          title: "Description generated",
          description: "AI-generated description has been added to the form.",
        });
      } else {
        throw new Error("No description was returned from the API");
      }
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingDescription(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Workspace Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="WeWork Futura" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      // Auto-generate the slug if the slug is empty or was derived from the previous name
                      const currentSlug = form.getValues("slug");
                      const currentName = form.getValues("name");
                      // Only try to format if the formatSlug function is provided
                      if (formatSlug) {
                        const formattedCurrentName = formatSlug(currentName);
                        if (!currentSlug || currentSlug === formattedCurrentName) {
                          form.setValue("slug", formatSlug(e.target.value));
                        }
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Workspace Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="wework-futura" {...field} />
                </FormControl>
                <FormDescription>
                  Used in the URL, e.g., /workspaces/wework-futura
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Location */}
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (City)</FormLabel>
              <Select
                onValueChange={(value) => onLocationChange(value)}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id.toString()}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Area */}
        <FormField
          control={form.control}
          name="areaId"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Area</FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs flex items-center gap-1"
                  onClick={openNewAreaDialog}
                  disabled={!form.getValues('locationId')}
                >
                  <PlusCircle className="h-3 w-3" />
                  Create New
                </Button>
              </div>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
                disabled={!areas || areas.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an area" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {areas?.map((area) => (
                    <SelectItem key={area.id} value={area.id.toString()}>
                      {area.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the specific area within the city
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Description</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs flex items-center gap-1"
                  onClick={generateDescription}
                  disabled={isGeneratingDescription}
                >
                  {isGeneratingDescription ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-3 w-3" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder="A modern workspace located in the heart of the city..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Click "Generate with AI" to automatically create a description based on workspace name, city, and area.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="123 Business Street, Tech Park, City..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Map Coordinates */}
        <FormField
          control={form.control}
          name="mapCoordinates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Map Coordinates</FormLabel>
              <FormControl>
                <Input
                  placeholder="18.5589,73.9259"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter latitude,longitude format (e.g., 18.5589,73.9259)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Vendor */}
        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vendor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id.toString()}>
                      <div className="flex items-center gap-2">
                        {vendor.logo && (
                          <img 
                            src={vendor.logo} 
                            alt={vendor.name} 
                            className="w-4 h-4 object-contain"
                          />
                        )}
                        {vendor.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the provider of this workspace (e.g., WeWork, Awfis)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Pricing Section */}
        <div className="space-y-4 border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pricing Configuration</h3>
            <FormField
              control={form.control}
              name="enableTieredPricing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Enable 3-Tier Pricing
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          
          {!form.watch("enableTieredPricing") ? (
            /* Legacy Single Pricing */
            <FormField
              control={form.control}
              name="monthlyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Price (₹)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="5000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Standard monthly pricing for the virtual office
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            /* 3-Tier Pricing System */
            <div className="space-y-6">
              {/* Tier 1 - Business Address */}
              <div className="space-y-3 border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-blue-900">Tier 1 - Business Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tier1Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Business Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tier1Price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹/month)</FormLabel>
                        <FormControl>
                          <Input placeholder="2000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="tier1Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Basic business address for your company..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tier1FeaturesStr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Business Address, Mail Handling, Reception Services" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of features
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tier 2 - GST Registration */}
              <div className="space-y-3 border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-green-900">Tier 2 - GST Registration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tier2Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <Input placeholder="GST Registration" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tier2Price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹/month)</FormLabel>
                        <FormControl>
                          <Input placeholder="5000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="tier2Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Complete GST registration assistance with business address..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tier2FeaturesStr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="GST Registration, Business Address, Tax Consulting, Compliance Support" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of features
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tier 3 - Company Registration */}
              <div className="space-y-3 border-l-4 border-purple-500 pl-4">
                <h4 className="font-medium text-purple-900">Tier 3 - Company Registration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tier3Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Registration" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tier3Price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹/month)</FormLabel>
                        <FormControl>
                          <Input placeholder="8000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="tier3Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Complete company registration with GST and premium services..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tier3FeaturesStr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Company Registration, GST Registration, Legal Support, Premium Address, Meeting Rooms" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of features
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Amenities (as checkboxes) */}
        <div className="space-y-4">
          <div>
            <FormLabel className="text-base">Amenities</FormLabel>
            <FormDescription>
              Select all amenities available at this workspace
            </FormDescription>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-1">
            {['WiFi', 'Meeting Rooms', 'Open Area', 'Coffee Station', 'Conference Room', 'Managed Offices', 'Virtual Office Facility'].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox 
                  id={`amenity-${amenity.toLowerCase().replace(/\s+/g, '-')}`}
                  checked={form.getValues("amenities")?.includes(amenity) || false}
                  onCheckedChange={(checked) => {
                    const currentAmenities = form.getValues("amenities") || [];
                    const newAmenities = checked 
                      ? [...currentAmenities, amenity]
                      : currentAmenities.filter((a: string) => a !== amenity);
                    form.setValue("amenities", newAmenities, { shouldValidate: true });
                  }}
                />
                <label 
                  htmlFor={`amenity-${amenity.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
          <FormMessage />
        </div>
        
        {/* Images (as comma-separated URLs) */}
        <FormField
          control={form.control}
          name="imagesStr"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter image URLs as a comma-separated list
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="available">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="occupied">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500 hover:bg-blue-600">Occupied</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="maintenance">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">Maintenance</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="coming_soon">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500 hover:bg-purple-600">Coming Soon</Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Current status of the workspace. Shown with color-coded indicators.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Is Active */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
                <FormDescription>
                  Enable this workspace to be visible on the platform
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}