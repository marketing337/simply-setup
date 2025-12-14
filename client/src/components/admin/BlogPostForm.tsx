import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost, Author } from "@shared/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { X, Loader2, Code, Clipboard, FileText, Video } from "lucide-react";
import { YouTubeInput } from "@/components/YouTubeEmbed";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
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

interface BlogPostFormProps {
  onSubmit: (values: FormData) => Promise<void>;
  initialData?: BlogPost;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export default function BlogPostForm({ 
  onSubmit, 
  initialData,
  isSubmitting = false,
  onCancel
}: BlogPostFormProps) {
  const [currentTag, setCurrentTag] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isHtmlConverterOpen, setIsHtmlConverterOpen] = useState(false);
  const { toast } = useToast();

  // Fetch authors for dropdown
  const { data: authors = [] } = useQuery<Author[]>({
    queryKey: ['/api/admin/authors'],
  });

  // Check if content contains HTML tags
  const isHtmlContent = (text: string): boolean => {
    const htmlRegex = /<[^>]*>/;
    return htmlRegex.test(text);
  };
  
  // Extract meta tags and other data from HTML
  const extractMetaFromHtml = (html: string) => {
    try {
      console.log("extractMetaFromHtml: Starting extraction...");
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      console.log("extractMetaFromHtml: HTML parsed successfully");
      
      // Extract title from multiple sources
      const titleElement = tempDiv.querySelector('title') || 
                          tempDiv.querySelector('h1') || 
                          tempDiv.querySelector('h2');
      const extractedTitle = titleElement?.textContent?.trim() || '';
      
      // Extract meta description
      const metaDesc = tempDiv.querySelector('meta[name="description"]')?.getAttribute('content') || 
                      tempDiv.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
      
      // Extract meta title (could be different from h1)
      const metaTitle = tempDiv.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                       tempDiv.querySelector('meta[name="title"]')?.getAttribute('content') || '';
      
      // Extract featured image from multiple sources
      const featuredImage = tempDiv.querySelector('meta[property="og:image"]')?.getAttribute('content') || 
                           tempDiv.querySelector('meta[name="image"]')?.getAttribute('content') || 
                           tempDiv.querySelector('img')?.getAttribute('src') || '';
      
      // Extract keywords for tags
      const keywords = tempDiv.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
      const extractedTags = keywords ? keywords.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
      
      // Generate excerpt from first paragraph if no meta description
      let excerpt = metaDesc;
      if (!excerpt) {
        const firstParagraph = tempDiv.querySelector('p');
        if (firstParagraph) {
          excerpt = firstParagraph.textContent?.trim().substring(0, 150) + '...' || '';
        }
      }
      
      return {
        title: extractedTitle,
        metaTitle,
        metaDescription: metaDesc,
        excerpt,
        featuredImage,
        tags: extractedTags
      };
    } catch (error) {
      console.error('Meta extraction error:', error);
      return null;
    }
  };

  // Process HTML content into formatted text
  const processHtmlContent = (html: string): string => {
    try {
      console.log("processHtmlContent: Starting processing...");
      // Create a temporary DOM element to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Function to recursively process DOM nodes and format text
      const processNode = (node: Node): string => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim() || '';
          return text;
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const tagName = element.tagName.toLowerCase();
          
          // Skip style, script, meta, head tags completely
          if (['style', 'script', 'meta', 'head', 'title'].includes(tagName)) {
            return '';
          }
          
          let content = '';
          
          // Process child nodes
          for (const child of Array.from(element.childNodes)) {
            content += processNode(child);
          }
          
          // Format based on element type - output proper HTML instead of markdown
          switch (tagName) {
            case 'h1':
              return content ? `<h1>${content}</h1>` : '';
            case 'h2':
              return content ? `<h2>${content}</h2>` : '';
            case 'h3':
              return content ? `<h3>${content}</h3>` : '';
            case 'h4':
              return content ? `<h4>${content}</h4>` : '';
            case 'h5':
              return content ? `<h5>${content}</h5>` : '';
            case 'h6':
              return content ? `<h6>${content}</h6>` : '';
            case 'p':
              return content ? `<p>${content}</p>` : '';
            case 'br':
              return '<br>';
            case 'li':
              return content ? `<li>${content}</li>` : '';
            case 'ul':
              return content ? `<ul>${content}</ul>` : '';
            case 'ol':
              return content ? `<ol>${content}</ol>` : '';
            case 'blockquote':
              return content ? `<blockquote>${content}</blockquote>` : '';
            case 'strong':
            case 'b':
              return content ? `<strong>${content}</strong>` : '';
            case 'em':
            case 'i':
              return content ? `<em>${content}</em>` : '';
            case 'code':
              return content ? `<code>${content}</code>` : '';
            case 'pre':
              return content ? `<pre>${content}</pre>` : '';
            case 'a':
              const href = element.getAttribute('href');
              return href && content ? `<a href="${href}">${content}</a>` : content;
            case 'img':
              const src = element.getAttribute('src');
              const alt = element.getAttribute('alt') || 'Image';
              return src ? `<img src="${src}" alt="${alt}">` : '';
            case 'hr':
              return '<hr>';
            case 'table':
              return content ? `<table>${content}</table>` : '';
            case 'thead':
              return content ? `<thead>${content}</thead>` : '';
            case 'tbody':
              return content ? `<tbody>${content}</tbody>` : '';
            case 'tr':
              return content ? `<tr>${content}</tr>` : '';
            case 'td':
              return content ? `<td>${content}</td>` : '';
            case 'th':
              return content ? `<th>${content}</th>` : '';
            case 'div':
            case 'section':
            case 'article':
            case 'main':
            case 'body':
            case 'header':
            case 'footer':
              return content ? `${content}` : '';
            case 'span':
              return content;
            default:
              return content;
          }
        }
        
        return '';
      };
      
      // Process the HTML content
      let formattedText = processNode(tempDiv);
      
      // Clean up excessive whitespace and normalize HTML structure
      formattedText = formattedText
        .replace(/>\s+</g, '><')     // Remove whitespace between HTML tags
        .replace(/\s+/g, ' ')        // Replace multiple spaces with single space
        .replace(/>\s+/g, '>')       // Remove space after opening tags
        .replace(/\s+</g, '<')       // Remove space before closing tags
        .replace(/^\s+|\s+$/g, '')   // Trim start and end
        .replace(/(<\/[^>]+>)\s*(<[^\/][^>]*>)/g, '$1 $2'); // Add space between closing and opening tags
      
      return formattedText;
    } catch (error) {
      console.error('HTML processing error:', error);
      return html; // Return original if processing fails
    }
  };

  // Convert HTML to formatted plain text with meta extraction
  const convertHtmlToText = () => {
    console.log("convertHtmlToText called with content:", htmlContent);
    if (!htmlContent.trim()) {
      toast({
        title: "Missing Content",
        description: "Please paste HTML content to convert.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      console.log("Starting HTML processing...");
      // Extract metadata from HTML
      const extractedMeta = extractMetaFromHtml(htmlContent);
      console.log("Extracted meta:", extractedMeta);
      
      // Process HTML content to formatted text
      const formattedText = processHtmlContent(htmlContent);
      console.log("Formatted text length:", formattedText.length);
      
      // Auto-populate fields with extracted data
      const currentValues = form.getValues();
      console.log("Current form values:", currentValues);
      console.log("About to populate fields...");
      
      // Only populate empty fields to avoid overwriting user data
      if (extractedMeta) {
        console.log("ExtractedMeta exists, populating fields...");
        if (!currentValues.title && extractedMeta.title) {
          form.setValue('title', extractedMeta.title, { shouldValidate: true });
        }
        
        if (!currentValues.metaTitle && extractedMeta.metaTitle) {
          form.setValue('metaTitle', extractedMeta.metaTitle, { shouldValidate: true });
        }
        
        if (!currentValues.excerpt && extractedMeta.excerpt) {
          form.setValue('excerpt', extractedMeta.excerpt, { shouldValidate: true });
        }
        
        if (!currentValues.metaDescription && extractedMeta.metaDescription) {
          form.setValue('metaDescription', extractedMeta.metaDescription, { shouldValidate: true });
        }
        
        if (!currentValues.featuredImage && extractedMeta.featuredImage) {
          form.setValue('featuredImage', extractedMeta.featuredImage, { shouldValidate: true });
        }
        
        if (currentValues.tags.length === 0 && extractedMeta.tags.length > 0) {
          form.setValue('tags', extractedMeta.tags, { shouldValidate: true });
        }
        
        // Auto-generate slug if title was extracted and slug is empty
        if (!currentValues.slug && extractedMeta.title) {
          const slug = extractedMeta.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
          form.setValue('slug', slug, { shouldValidate: true });
        }
      }
      
      // Update the content field
      form.setValue('content', formattedText, { shouldValidate: true });
      
      // Close the dialog and show success message
      setIsHtmlConverterOpen(false);
      setHtmlContent("");
      
      const extractedFields = [];
      if (extractedMeta?.title) extractedFields.push('title');
      if (extractedMeta?.excerpt) extractedFields.push('excerpt');
      if (extractedMeta?.metaTitle) extractedFields.push('meta title');
      if (extractedMeta?.metaDescription) extractedFields.push('meta description');
      if (extractedMeta?.featuredImage) extractedFields.push('featured image');
      if (extractedMeta?.tags.length) extractedFields.push('tags');
      
      toast({
        title: "Conversion Successful",
        description: extractedFields.length > 0 
          ? `HTML converted and auto-populated: ${extractedFields.join(', ')}`
          : "HTML has been converted to formatted text with proper structure.",
        variant: "default",
      });
    } catch (error) {
      console.error('HTML conversion error:', error);
      console.error('Error details:', error.message, error.stack);
      toast({
        title: "Conversion Failed",
        description: `Error: ${error.message || 'Unknown error occurred'}`,
        variant: "destructive",
      });
    }
  };
  
  // Initialize form with default values
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      // Make sure tags is always an array
      tags: initialData.tags || [],
      youtubeVideoId: initialData.youtubeVideoId || "",
      authorId: initialData.authorId || (authors.length > 0 ? authors[0].id : 1)
    } : {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      youtubeVideoId: "",
      published: false,
      tags: [],
      metaTitle: "",
      metaDescription: "",
      authorId: authors.length > 0 ? authors[0].id : 1,
    }
  });

  // Generate slug from title
  const generateSlug = () => {
    const title = form.getValues('title');
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
      
      form.setValue('slug', slug, { shouldValidate: true });
    }
  };

  // Add a tag
  const addTag = () => {
    if (currentTag.trim() && !form.getValues('tags').includes(currentTag.trim())) {
      const updatedTags = [...form.getValues('tags'), currentTag.trim()];
      form.setValue('tags', updatedTags, { shouldValidate: true });
      setCurrentTag("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    const updatedTags = form.getValues('tags').filter(tag => tag !== tagToRemove);
    form.setValue('tags', updatedTags, { shouldValidate: true });
  };

  // Handle form submission
  const handleSubmit = async (values: FormData) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter post title" 
                      {...field} 
                      onBlur={() => {
                        field.onBlur();
                        // Auto-generate slug if field is empty
                        if (!form.getValues('slug')) {
                          generateSlug();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Slug (URL)</FormLabel>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={generateSlug}
                      className="text-xs"
                    >
                      Generate from title
                    </Button>
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="post-url-slug" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt (Summary)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of the post"
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Image */}
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
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                  {field.value && (
                    <div className="mt-2 relative aspect-video bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={field.value} 
                        alt="Featured" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
                        }}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* YouTube Video */}
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

            {/* Author Selection */}
            <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select 
                    value={field.value?.toString()} 
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
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

            {/* Tags */}
            <div className="space-y-3">
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add a tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={addTag}
                  disabled={!currentTag.trim()}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch('tags').map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Publish Switch */}
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Published Status
                    </FormLabel>
                    <div className="text-sm text-muted-foreground">
                      {field.value ? 'This post is public' : 'This post is a draft'}
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
          </div>

          <div className="space-y-6">
            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <FormLabel>Content</FormLabel>
                    <div className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsHtmlConverterOpen(true)}
                        className="text-xs"
                      >
                        <Code className="h-3 w-3 mr-2" /> WordPress HTML Import
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => form.setValue('content', form.getValues('content'), { shouldValidate: true })}
                        className="text-xs"
                      >
                        <FileText className="h-3 w-3 mr-2" /> Refresh Preview
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-md">
                    <Controller
                      name="content"
                      control={form.control}
                      render={({ field }) => (
                        <ReactQuill 
                          value={field.value} 
                          onChange={(content) => {
                            // Check if the content contains HTML tags (indicating HTML was pasted)
                            const isFullHtmlDoc = content.includes('<!DOCTYPE') || content.includes('<html') || content.includes('<body') || content.includes('<head');
                            const hasMetaTags = content.includes('<meta') || content.includes('<title');
                            const hasComplexHtml = content.includes('<div') || content.includes('<section') || content.includes('<article');
                            const hasStructuredContent = content.includes('<header>') || content.includes('<footer>') || content.includes('<main>');
                            const isLargeHtmlContent = isHtmlContent(content) && content.length > 500 && (content.match(/<[^>]+>/g) || []).length > 10;
                            
                            if (isHtmlContent(content) && (isFullHtmlDoc || hasMetaTags || hasComplexHtml || hasStructuredContent || isLargeHtmlContent)) {
                              // This looks like a full HTML document or complex HTML, auto-convert it
                              try {
                                // Extract metadata first
                                const extractedMeta = extractMetaFromHtml(content);
                                const convertedText = processHtmlContent(content);
                                
                                // Auto-populate fields with extracted data (only if they're empty)
                                const currentValues = form.getValues();
                                let populatedFields = [];
                                
                                if (extractedMeta) {
                                  if (!currentValues.title && extractedMeta.title) {
                                    form.setValue('title', extractedMeta.title, { shouldValidate: true });
                                    populatedFields.push('title');
                                  }
                                  
                                  if (!currentValues.excerpt && extractedMeta.excerpt) {
                                    form.setValue('excerpt', extractedMeta.excerpt, { shouldValidate: true });
                                    populatedFields.push('excerpt');
                                  }
                                  
                                  if (!currentValues.metaTitle && extractedMeta.metaTitle) {
                                    form.setValue('metaTitle', extractedMeta.metaTitle, { shouldValidate: true });
                                    populatedFields.push('meta title');
                                  }
                                  
                                  if (!currentValues.metaDescription && extractedMeta.metaDescription) {
                                    form.setValue('metaDescription', extractedMeta.metaDescription, { shouldValidate: true });
                                    populatedFields.push('meta description');
                                  }
                                  
                                  if (!currentValues.featuredImage && extractedMeta.featuredImage) {
                                    form.setValue('featuredImage', extractedMeta.featuredImage, { shouldValidate: true });
                                    populatedFields.push('featured image');
                                  }
                                  
                                  if (currentValues.tags.length === 0 && extractedMeta.tags.length > 0) {
                                    form.setValue('tags', extractedMeta.tags, { shouldValidate: true });
                                    populatedFields.push('tags');
                                  }
                                  
                                  // Auto-generate slug if title was extracted and slug is empty
                                  if (!currentValues.slug && extractedMeta.title) {
                                    const slug = extractedMeta.title
                                      .toLowerCase()
                                      .replace(/[^\w\s-]/g, '')
                                      .replace(/\s+/g, '-')
                                      .replace(/-+/g, '-');
                                    form.setValue('slug', slug, { shouldValidate: true });
                                    populatedFields.push('slug');
                                  }
                                }
                                
                                field.onChange(convertedText);
                                
                                toast({
                                  title: "HTML Auto-Converted",
                                  description: populatedFields.length > 0 
                                    ? `HTML converted and auto-populated: ${populatedFields.join(', ')}`
                                    : "Detected HTML content and automatically converted to formatted text.",
                                  variant: "default",
                                });
                              } catch (error) {
                                console.error('Auto-conversion error:', error);
                                field.onChange(content); // Fallback to original content
                                toast({
                                  title: "Auto-Conversion Failed",
                                  description: "Could not auto-convert HTML. Use the Convert HTML button for manual conversion.",
                                  variant: "destructive",
                                });
                              }
                            } else {
                              field.onChange(content);
                            }
                          }}
                          placeholder="Write your post content here..."
                          theme="snow"
                          modules={{
                            toolbar: [
                              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                              ['bold', 'italic', 'underline', 'strike'],
                              [{'list': 'ordered'}, {'list': 'bullet'}],
                              [{'indent': '-1'}, {'indent': '+1'}],
                              [{'align': []}],
                              ['link', 'image'],
                              ['clean']
                            ],
                          }}
                          className="h-[400px]"
                        />
                      )}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* HTML to Text Converter Dialog */}
            <Dialog open={isHtmlConverterOpen} onOpenChange={setIsHtmlConverterOpen}>
              <DialogContent className="sm:max-w-[825px]">
                <DialogHeader>
                  <DialogTitle>WordPress-Style HTML Converter</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <h4 className="font-medium text-blue-800 mb-2">Smart HTML Conversion</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• Automatically extracts titles, meta descriptions, and featured images</p>
                      <p>• Converts HTML tags to properly formatted text with headings</p>
                      <p>• Preserves hyperlinks and maintains text structure</p>
                      <p>• Extracts keywords and converts them to tags</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Paste your HTML content below:</label>
                    <Textarea
                      value={htmlContent}
                      onChange={(e) => {
                        console.log("HTML content changed, length:", e.target.value.length);
                        setHtmlContent(e.target.value);
                      }}
                      placeholder="Paste complete HTML content here (including <head>, <meta> tags, etc.)..."
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                    <strong>Supported elements:</strong> Headers (H1-H6), paragraphs, links, images, lists, 
                    bold/italic text, blockquotes, code blocks, tables, meta tags, and more.
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsHtmlConverterOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Button clicked, htmlContent:", htmlContent.trim().length);
                      convertHtmlToText();
                    }}
                    disabled={!htmlContent.trim()}
                    className={!htmlContent.trim() ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Clipboard className="h-4 w-4 mr-2" /> Convert & Auto-Fill
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="space-y-6 border-t pt-6 mt-6">
              <h3 className="text-lg font-medium">SEO Settings</h3>
              
              {/* Meta Title */}
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="SEO title (defaults to post title if empty)" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Meta Description */}
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="SEO description (defaults to excerpt if empty)"
                        className="resize-none h-20"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : initialData ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
}