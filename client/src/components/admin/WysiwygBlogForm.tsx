import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost, Author } from "@shared/schema";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { X, Loader2, Save, FileText, Image, Link, Bold, Italic, List, Heading, Video } from "lucide-react";
import { YouTubeInput } from "@/components/YouTubeEmbed";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  featuredImage: z.string().url("Must be a valid URL").optional().nullable(),
  youtubeVideoId: z.string().optional().nullable(),
  published: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  authorId: z.number().min(1, "Please select an author"),
});

type FormData = z.infer<typeof formSchema>;

interface WysiwygBlogFormProps {
  onSubmit: (values: FormData) => Promise<void>;
  initialData?: BlogPost;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export default function WysiwygBlogForm({ 
  onSubmit, 
  initialData,
  isSubmitting = false,
  onCancel
}: WysiwygBlogFormProps) {
  const { toast } = useToast();
  const [newTag, setNewTag] = useState("");
  const [isQuickInsertOpen, setIsQuickInsertOpen] = useState(false);

  // Fetch authors for dropdown
  const { data: authors = [] } = useQuery<Author[]>({
    queryKey: ['/api/admin/authors'],
  });

  // Initialize form with default values
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      featuredImage: initialData?.featuredImage || "",
      youtubeVideoId: initialData?.youtubeVideoId || "",
      published: initialData?.published || false,
      tags: initialData?.tags || [],
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      authorId: initialData?.authorId || 0,
    },
  });

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    
    // Auto-generate slug if not editing existing post
    if (!initialData) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 60);
      form.setValue('slug', slug);
    }
  };

  // Add tag functionality
  const addTag = () => {
    if (newTag.trim() && !form.getValues('tags').includes(newTag.trim())) {
      const currentTags = form.getValues('tags');
      form.setValue('tags', [...currentTags, newTag.trim()]);
      setNewTag("");
    }
  };

  // Remove tag functionality
  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  // Rich text editor toolbar configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'blockquote', 'code-block',
    'link', 'image', 'align', 'color', 'background'
  ];

  // Quick insert templates
  const quickInsertTemplates = [
    {
      name: "Call to Action",
      content: `<div style="background: #f8f9ff; border-left: 4px solid #6366f1; padding: 20px; margin: 20px 0;">
        <h3 style="color: #1e293b; margin-bottom: 10px;">Ready to Get Started?</h3>
        <p style="margin-bottom: 15px;">Take the next step towards your business goals.</p>
        <a href="#" style="background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Get Started Now</a>
      </div>`
    },
    {
      name: "FAQ Section",
      content: `<h3>Frequently Asked Questions</h3>
      <div style="margin: 20px 0;">
        <h4 style="color: #1e293b;">Question 1: What is the process?</h4>
        <p>Answer: Detailed explanation of the process...</p>
        
        <h4 style="color: #1e293b;">Question 2: How long does it take?</h4>
        <p>Answer: Typical timeline and expectations...</p>
      </div>`
    },
    {
      name: "Benefits List",
      content: `<h3>Key Benefits</h3>
      <ul style="padding-left: 20px;">
        <li><strong>Cost Savings:</strong> Reduce expenses by up to 50%</li>
        <li><strong>Time Efficiency:</strong> Complete setup in 24-48 hours</li>
        <li><strong>Expert Support:</strong> Dedicated assistance throughout</li>
        <li><strong>Compliance:</strong> 100% legal and regulatory compliance</li>
      </ul>`
    },
    {
      name: "Process Steps",
      content: `<h3>Simple 4-Step Process</h3>
      <ol style="padding-left: 20px;">
        <li><strong>Step 1:</strong> Submit your requirements</li>
        <li><strong>Step 2:</strong> Document verification and processing</li>
        <li><strong>Step 3:</strong> Setup and configuration</li>
        <li><strong>Step 4:</strong> Go live and ongoing support</li>
      </ol>`
    }
  ];

  const insertTemplate = (template: typeof quickInsertTemplates[0]) => {
    const currentContent = form.getValues('content');
    form.setValue('content', currentContent + template.content);
    setIsQuickInsertOpen(false);
    toast({
      title: "Template Added",
      description: `${template.name} has been inserted into your content.`,
    });
  };

  const handleSubmit = async (values: FormData) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or check your input.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <p className="text-gray-600">Use the rich text editor to create engaging content</p>
        </div>
        
        <Dialog open={isQuickInsertOpen} onOpenChange={setIsQuickInsertOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Quick Insert
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Quick Insert Templates</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickInsertTemplates.map((template, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                     onClick={() => insertTemplate(template)}>
                  <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                  <div className="text-sm text-gray-600" 
                       dangerouslySetInnerHTML={{ __html: template.content.substring(0, 100) + '...' }} />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Title and Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter blog post title" 
                      {...field}
                      onChange={(e) => handleTitleChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="url-friendly-slug" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Excerpt */}
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description for search results and previews" 
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rich Text Content Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content *</FormLabel>
                <FormControl>
                  <div className="border rounded-md">
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your blog content here..."
                      style={{ minHeight: '300px' }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Featured Image and YouTube Video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtubeVideoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    YouTube Video
                  </FormLabel>
                  <FormControl>
                    <YouTubeInput
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder="Paste YouTube URL or Video ID"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <FormLabel>Tags</FormLabel>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.getValues('tags').map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="max-w-xs"
              />
              <Button type="button" onClick={addTag} variant="outline" size="sm">
                Add Tag
              </Button>
            </div>
          </div>

          {/* SEO Meta Fields */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="SEO optimized title (leave blank to use main title)" 
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="SEO description for search engines (leave blank to use excerpt)" 
                        className="min-h-[60px]"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Author Selection */}
          <FormField
            control={form.control}
            name="authorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {authors.map((author: Author) => (
                      <SelectItem key={author.id} value={author.id.toString()}>
                        {author.name} {author.qualification && `(${author.qualification})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Publish Status */}
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Publish Status</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Make this blog post visible to the public
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {initialData ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {initialData ? 'Update Post' : 'Create Post'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}