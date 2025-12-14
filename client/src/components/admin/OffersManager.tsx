import { useState } from "react";
import { useAllOffersAdmin, useCreateOffer, useUpdateOffer, useDeleteOffer } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOfferSchema } from "@shared/schema";
import { z } from "zod";
import { Trash2, Edit, Plus, Gift, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { Offer, InsertOffer } from "@shared/schema";

const offerFormSchema = insertOfferSchema.extend({
  sortOrder: z.number().int().min(0).optional().default(0),
});

type OfferFormData = z.infer<typeof offerFormSchema>;

export function OffersManager() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const { toast } = useToast();

  const { data: offers, isLoading } = useAllOffersAdmin();
  const createOffer = useCreateOffer();
  const updateOffer = useUpdateOffer();
  const deleteOffer = useDeleteOffer();

  const form = useForm<OfferFormData>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      hyperlink: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  const onSubmit = async (data: OfferFormData) => {
    try {
      if (editingOffer) {
        await updateOffer.mutateAsync({
          id: editingOffer.id,
          data,
        });
        toast({
          title: "Offer updated",
          description: "Offer has been updated successfully.",
        });
        setEditingOffer(null);
      } else {
        await createOffer.mutateAsync(data);
        toast({
          title: "Offer created",
          description: "New offer has been created successfully.",
        });
        setIsCreateDialogOpen(false);
      }
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    form.reset({
      title: offer.title,
      description: offer.description,
      image: offer.image || "",
      hyperlink: offer.hyperlink,
      isActive: offer.isActive,
      sortOrder: offer.sortOrder,
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      try {
        await deleteOffer.mutateAsync(id);
        toast({
          title: "Offer deleted",
          description: "Offer has been deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete offer. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDialogClose = () => {
    setIsCreateDialogOpen(false);
    setEditingOffer(null);
    form.reset();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading offers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Offers Management</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Offer
        </Button>
      </div>

      <Dialog open={isCreateDialogOpen || !!editingOffer} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingOffer ? "Edit Offer" : "Create New Offer"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter offer title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter offer description" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hyperlink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Order</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            value={field.value?.toString() || "0"}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-8">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Active</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" disabled={createOffer.isPending || updateOffer.isPending}>
                    {createOffer.isPending || updateOffer.isPending ? "Saving..." : "Save Offer"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers?.map((offer) => (
          <Card key={offer.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{offer.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={offer.isActive ? "default" : "secondary"}>
                      {offer.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-xs text-gray-500">Order: {offer.sortOrder}</span>
                  </div>
                </div>
                {offer.image && (
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-12 h-12 rounded object-cover ml-3"
                  />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{offer.description}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="w-3 h-3 text-gray-400" />
                <a 
                  href={offer.hyperlink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 truncate"
                >
                  {offer.hyperlink}
                </a>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(offer)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(offer.id)}
                  disabled={deleteOffer.isPending}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {offers?.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No offers yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first offer.</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add First Offer
          </Button>
        </div>
      )}
    </div>
  );
}