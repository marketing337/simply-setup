import { useState } from "react";
import { useAllAuthors, useCreateAuthor, useUpdateAuthor, useDeleteAuthor } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAuthorSchema } from "@shared/schema";
import { z } from "zod";
import { Trash2, Edit, Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Author, InsertAuthor } from "@shared/schema";

const authorFormSchema = insertAuthorSchema.pick({
  name: true,
  photo: true,
  qualification: true,
  yearsOfExperience: true,
});

type AuthorFormData = z.infer<typeof authorFormSchema>;

export function AuthorManager() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const { toast } = useToast();

  const { data: authors, isLoading } = useAllAuthors();
  const createAuthor = useCreateAuthor();
  const updateAuthor = useUpdateAuthor();
  const deleteAuthor = useDeleteAuthor();

  const form = useForm<AuthorFormData>({
    resolver: zodResolver(authorFormSchema),
    defaultValues: {
      name: "",
      photo: "",
      qualification: "",
      yearsOfExperience: 0,
    },
  });

  const onSubmit = async (data: AuthorFormData) => {
    try {
      if (editingAuthor) {
        await updateAuthor.mutateAsync({
          id: editingAuthor.id,
          data,
        });
        toast({
          title: "Author updated",
          description: "Author information has been updated successfully.",
        });
        setEditingAuthor(null);
      } else {
        await createAuthor.mutateAsync(data);
        toast({
          title: "Author created",
          description: "New author has been created successfully.",
        });
        setIsCreateDialogOpen(false);
      }
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save author. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    form.reset({
      name: author.name,
      photo: author.photo || "",
      qualification: author.qualification || "",
      yearsOfExperience: author.yearsOfExperience || 0,
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this author?")) {
      try {
        await deleteAuthor.mutateAsync(id);
        toast({
          title: "Author deleted",
          description: "Author has been deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete author. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setIsCreateDialogOpen(false);
      setEditingAuthor(null);
      form.reset();
    } else if (!editingAuthor) {
      setIsCreateDialogOpen(true);
    }
  };

  const handleCancel = () => {
    setIsCreateDialogOpen(false);
    setEditingAuthor(null);
    form.reset();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading authors...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Author Management</h2>
        <Dialog open={isCreateDialogOpen || !!editingAuthor} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Author
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAuthor ? "Edit Author" : "Create New Author"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter photo URL" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter qualification" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter years of experience" 
                          {...field}
                          value={field.value?.toString() || "0"}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 pt-4">
                  <Button type="submit" disabled={createAuthor.isPending || updateAuthor.isPending}>
                    {createAuthor.isPending || updateAuthor.isPending ? "Saving..." : "Save Author"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {authors?.map((author) => (
          <Card key={author.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                {author.photo ? (
                  <img
                    src={author.photo}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{author.name}</CardTitle>
                  {author.qualification && (
                    <p className="text-sm text-gray-600 truncate">{author.qualification}</p>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {author.yearsOfExperience && (
                <p className="text-sm text-gray-600 mb-3">
                  {author.yearsOfExperience} years of experience
                </p>
              )}
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(author)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(author.id)}
                  disabled={deleteAuthor.isPending}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {authors?.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No authors yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first author.</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add First Author
          </Button>
        </div>
      )}
    </div>
  );
}