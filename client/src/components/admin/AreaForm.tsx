import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Location, Area, insertAreaSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import { Loader2, SparklesIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// This type represents the form data
type AreaFormData = z.infer<typeof formSchema>;

interface AreaFormProps {
  onSubmit: (values: AreaFormData) => void;
  location: Location;
  initialData?: Area;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

// Extend the insert schema with additional validation
// Create a schema that handles both null and undefined for optional fields
const formSchema = insertAreaSchema.extend({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  heroImage: z.string().nullable().optional().transform(val => val || ""),
  features: z.array(z.string()).nullable().optional(),
  zipCode: z.string().nullable().optional(),
  mapCoordinates: z.string().nullable().optional(),
  isPopular: z.boolean().nullable().optional().default(false),
});

export default function AreaForm({ 
  onSubmit, 
  location, 
  initialData, 
  isSubmitting = false, 
  onCancel 
}: AreaFormProps) {
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  
  // Fetch all locations for the dropdown
  const { data: locations = [] } = useQuery<Location[]>({ 
    queryKey: ['/api/locations'],
    select: (data) => data || []
  });
  
  // Create form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      slug: initialData.slug,
      description: initialData.description,
      address: initialData.address,
      heroImage: initialData.heroImage || "",
      locationId: initialData.locationId,
      features: initialData.features || [],
      zipCode: initialData.zipCode || "",
      mapCoordinates: initialData.mapCoordinates || "",
      isPopular: initialData.isPopular || false,
    } : {
      name: "",
      slug: "",
      description: "",
      address: "",
      heroImage: "",
      locationId: location.id,
      features: [],
      zipCode: "",
      mapCoordinates: "", 
      isPopular: false,
    },
  });
  
  // Function to generate area description using AI
  const generateAreaDescription = async () => {
    const areaName = form.getValues("name");
    
    if (!areaName) {
      alert("Please enter an area name first");
      return;
    }
    
    setIsGeneratingDescription(true);
    
    try {
      // Ensure we have the correct selected location
      const selectedLocationId = form.getValues("locationId");
      // Find the location object that matches this ID
      const selectedLocation = locations.find(loc => loc.id === selectedLocationId);
      // Use the location name from the found object or fall back to the provided location
      const cityName = selectedLocation ? selectedLocation.name : location.name;
      
      console.log("Generating description for:", { areaName, cityName });
      
      // Make the API request with the area and city names
      const response = await axios.post("/api/ai/generate-area-description", {
        areaName,
        cityName
      });
      
      console.log("API response:", response.data);
      
      // Check if the response contains the expected data
      if (response.data && response.data.description) {
        // Set the description in the form
        form.setValue("description", response.data.description, { 
          shouldValidate: true,
          shouldDirty: true 
        });
      } else {
        // If no description in response, throw an error
        console.error("Unexpected API response:", response.data);
        throw new Error("No description returned from API");
      }
    } catch (error) {
      console.error("Error generating description:", error);
      // Show a more detailed error message
      if (axios.isAxiosError(error) && error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else {
        alert("Failed to generate description. Please try again.");
      }
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  // Generate slug from name if slug is empty
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const currentSlug = form.getValues("slug");
    
    if (!currentSlug || currentSlug === "") {
      // Convert name to slug format (lowercase, replace spaces with hyphens, remove special chars)
      const slug = name.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      form.setValue("slug", slug, { shouldValidate: true });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Nariman Point" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleNameChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                The name of this area within {location.name}.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., nariman-point" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                The URL path for this area (/{location.slug}/{field.value})
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Description</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAreaDescription}
                  disabled={isGeneratingDescription}
                  className="h-8 gap-1 text-xs"
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
                  placeholder="Enter a detailed description of this area..." 
                  className="h-24"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                A detailed description of this area and its features. Click "Generate with AI" to create a description automatically.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., 23 Business Avenue, Nariman Point" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                The physical address of this area.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heroImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/image.jpg" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                URL to an image representing this area (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPopular"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Popular Area
                </FormLabel>
                <FormDescription>
                  Mark this as a popular area to highlight it on the main page.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value === true}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id.toString()}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The city where this area is located.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Area" : "Create Area"}
          </Button>
        </div>
      </form>
    </Form>
  );
}