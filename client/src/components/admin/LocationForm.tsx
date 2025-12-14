import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location, insertLocationSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Create a schema for the form
const formSchema = insertLocationSchema.extend({
  heroImage: z.string().optional(),
}).pick({
  description: true,
  heroImage: true,
  mainAddress: true,
  phoneNumber: true,
  email: true,
});

type LocationFormData = z.infer<typeof formSchema>;

interface LocationFormProps {
  location: Location;
  onSubmit: (values: Partial<LocationFormData>) => Promise<void>;
  isSubmitting?: boolean;
}

export default function LocationForm({ location, onSubmit, isSubmitting = false }: LocationFormProps) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(location.heroImage || null);

  // Initialize form with location data
  const form = useForm<LocationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: location.description,
      heroImage: location.heroImage || "",
      mainAddress: location.mainAddress,
      phoneNumber: location.phoneNumber,
      email: location.email,
    },
  });

  const handleSubmit = async (values: LocationFormData) => {
    try {
      console.log("LocationForm submitting values:", values);
      await onSubmit(values);
      toast({
        title: "Location updated",
        description: "The location has been successfully updated",
      });
    } catch (error) {
      console.error("Error updating location in LocationForm:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating the location. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    form.setValue("heroImage", url);
    setImagePreview(url);
  };

  const clearImagePreview = () => {
    form.setValue("heroImage", "");
    setImagePreview(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Edit {location.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Hero Image Field */}
            <div className="space-y-2">
              <FormLabel>Hero Image</FormLabel>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter image URL"
                    value={form.watch("heroImage")}
                    onChange={handleImageInputChange}
                    disabled={isSubmitting}
                  />
                  {form.watch("heroImage") && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={clearImagePreview}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <FormDescription>
                  Enter a URL for the hero image (e.g., from Unsplash)
                </FormDescription>
              </div>

              {/* Image Preview */}
              {imagePreview ? (
                <div className="relative mt-2 border rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Hero image preview"
                    className="w-full h-48 object-cover"
                    onError={() => {
                      toast({
                        title: "Image Error",
                        description: "Could not load the image preview",
                        variant: "destructive",
                      });
                      setImagePreview(null);
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={clearImagePreview}
                      disabled={isSubmitting}
                    >
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center border border-dashed rounded-md h-48 bg-muted/20">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Image className="h-8 w-8 mb-2 opacity-50" />
                    <p>No hero image set</p>
                    <p className="text-xs">Enter a URL to preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter location description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Info Group */}
            <div className="space-y-4">
              <h3 className="font-medium">Contact Information</h3>
              
              <FormField
                control={form.control}
                name="mainAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <CardFooter className="px-0 flex justify-end space-x-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}