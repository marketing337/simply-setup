import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Vendor, insertVendorSchema } from "@shared/schema";

// Extend the schema to make validation more stringent for the form
const formSchema = insertVendorSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  colorCode: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color code (e.g. #FF5733)"),
})
.refine((data) => {
  // Both description and logo are optional, but if one is provided, the other should be too
  if (!data.description && !data.logo) return true; // Both empty is fine
  return !!data.description && !!data.logo; // Both should have values
}, {
  message: "Both description and logo URL should be provided together",
  path: ["description"], // Show error on the description field
});

type VendorFormValues = z.infer<typeof formSchema>;

interface VendorFormProps {
  onSubmit: (data: VendorFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  initialData?: Vendor;
  formatSlug: (text: string) => string;
}

export default function VendorForm({ 
  onSubmit, 
  isSubmitting, 
  onCancel, 
  initialData,
  formatSlug
}: VendorFormProps) {
  const form = useForm<VendorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      slug: initialData.slug,
      description: initialData.description || "",
      logo: initialData.logo || "",
      colorCode: initialData.colorCode || "#000000",
    } : {
      name: "",
      slug: "",
      description: "",
      logo: "",
      colorCode: "#000000",
    },
  });

  const watchName = form.watch("name");

  // Update slug when name changes, but only if we're creating a new vendor
  // and the user hasn't manually edited the slug field
  if (!initialData && watchName && !form.getValues("slug")) {
    const slug = formatSlug(watchName);
    form.setValue("slug", slug);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. WeWork" {...field} />
                </FormControl>
                <FormDescription>
                  The name of the workspace provider
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
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. wework" {...field} />
                </FormControl>
                <FormDescription>
                  URL-friendly identifier (auto-generated)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter vendor description here..." 
                  className="h-24"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Brief description of the workspace provider
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/logo.png" {...field} />
                </FormControl>
                <FormDescription>
                  URL for the vendor's logo image
                </FormDescription>
                <FormMessage />
                {field.value && (
                  <div className="mt-2">
                    <img 
                      src={field.value} 
                      alt="Logo preview" 
                      className="max-w-[100px] max-h-[50px] object-contain" 
                      onError={(e) => {
                        e.currentTarget.src = ""; 
                        e.currentTarget.alt = "Invalid image URL";
                      }}
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="colorCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Color</FormLabel>
                <div className="flex gap-2 items-center">
                  <FormControl>
                    <Input placeholder="#FF5733" {...field} />
                  </FormControl>
                  <div 
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: field.value }}
                  />
                </div>
                <FormDescription>
                  Brand color in hex format (#RRGGBB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : initialData ? "Update Vendor" : "Create Vendor"}
          </Button>
        </div>
      </form>
    </Form>
  );
}