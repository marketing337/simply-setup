import { useState } from "react";
import { useAllBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost } from "@/lib/api";
import { BlogPost } from "@shared/schema";
import BlogPostForm from "./BlogPostForm";
import WysiwygBlogForm from "./WysiwygBlogForm";
import { AuthorManager } from "./AuthorManager";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, PlusCircle, Eye, Pencil, Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function BlogManager() {
  const { data: blogPosts, isLoading } = useAllBlogPosts();
  const createBlogPostMutation = useCreateBlogPost();
  const updateBlogPostMutation = useUpdateBlogPost();
  const deleteBlogPostMutation = useDeleteBlogPost();
  const { toast } = useToast();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [editorType, setEditorType] = useState<'wysiwyg' | 'html'>('wysiwyg');
  
  // Handle creating a new post
  const handleCreatePost = async (formData: any) => {
    try {
      await createBlogPostMutation.mutateAsync(formData);
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
      console.error("Error creating blog post:", error);
    }
  };
  
  // Handle updating a post
  const handleUpdatePost = async (formData: any) => {
    if (!editingPost) return;
    
    try {
      await updateBlogPostMutation.mutateAsync({ 
        id: editingPost.id, 
        data: formData 
      });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      setEditingPost(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
      console.error("Error updating blog post:", error);
    }
  };
  
  // Handle deleting a post
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    try {
      await deleteBlogPostMutation.mutateAsync(postToDelete.id);
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      setPostToDelete(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      console.error("Error deleting blog post:", error);
    }
  };
  
  // Filter blog posts by status (published/draft)
  const publishedPosts = blogPosts?.filter(post => post.published) || [];
  const draftPosts = blogPosts?.filter(post => !post.published) || [];
  
  // Format date for display
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-gray-600 mt-1">Create and manage blog content</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border p-1">
            <Button
              variant={editorType === 'wysiwyg' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setEditorType('wysiwyg')}
              className="text-xs"
            >
              WYSIWYG Editor
            </Button>
            <Button
              variant={editorType === 'html' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setEditorType('html')}
              className="text-xs"
            >
              HTML Import
            </Button>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Post
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All ({blogPosts?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="published">
              Published ({publishedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts ({draftPosts.length})
            </TabsTrigger>
            <TabsTrigger value="authors">
              Authors
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {renderBlogPostList(blogPosts || [])}
          </TabsContent>
          
          <TabsContent value="published" className="space-y-4">
            {renderBlogPostList(publishedPosts)}
          </TabsContent>
          
          <TabsContent value="drafts" className="space-y-4">
            {renderBlogPostList(draftPosts)}
          </TabsContent>
          
          <TabsContent value="authors" className="space-y-4">
            <AuthorManager />
          </TabsContent>
        </Tabs>
      )}
      
      {/* Add Post Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Create New Blog Post - {editorType === 'wysiwyg' ? 'WYSIWYG Editor' : 'HTML Import'}
            </DialogTitle>
          </DialogHeader>
          {editorType === 'wysiwyg' ? (
            <WysiwygBlogForm 
              onSubmit={handleCreatePost} 
              isSubmitting={createBlogPostMutation.isPending}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          ) : (
            <BlogPostForm 
              onSubmit={handleCreatePost} 
              isSubmitting={createBlogPostMutation.isPending}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Post Dialog */}
      <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit Blog Post - {editorType === 'wysiwyg' ? 'WYSIWYG Editor' : 'HTML Import'}
            </DialogTitle>
          </DialogHeader>
          {editingPost && (
            editorType === 'wysiwyg' ? (
              <WysiwygBlogForm 
                initialData={editingPost}
                onSubmit={handleUpdatePost} 
                isSubmitting={updateBlogPostMutation.isPending}
                onCancel={() => setEditingPost(null)}
              />
            ) : (
              <BlogPostForm 
                initialData={editingPost}
                onSubmit={handleUpdatePost} 
                isSubmitting={updateBlogPostMutation.isPending}
                onCancel={() => setEditingPost(null)}
              />
            )
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post "{postToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
  
  // Helper function to render blog post list
  function renderBlogPostList(posts: BlogPost[]) {
    if (posts.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No blog posts found
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            {post.featuredImage && (
              <div className="h-40 overflow-hidden">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
                  }}
                />
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge variant={post.published ? "default" : "outline"} className="mb-2">
                  {post.published ? 'Published' : 'Draft'}
                </Badge>
                {post.published && post.publishedAt && (
                  <div className="text-xs text-gray-500">
                    Published on {formatDate(post.publishedAt)}
                  </div>
                )}
              </div>
              <CardTitle className="line-clamp-1">{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span>/blog/{post.slug}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="text-xs text-gray-500">
                Created: {formatDate(post.createdAt)}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" asChild>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setEditingPost(post)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-destructive" 
                  onClick={() => setPostToDelete(post)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
}