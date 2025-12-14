import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { 
  Download, 
  Star, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  Users, 
  FileText,
  Shield,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TemplateDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  categoryId: number;
  downloadUrl: string;
  previewUrl?: string;
  formats: string[];
  features: string[];
  downloadCount: number;
  rating: string;
  ratingCount: number;
  isPopular: boolean;
  isActive: boolean;
  categoryName: string;
  categorySlug: string;
}

export default function TemplateDetailPage() {
  const { categorySlug, templateSlug } = useParams<{ categorySlug: string; templateSlug: string }>();
  const [hasDownloaded, setHasDownloaded] = useState(false);

  // Fetch template details
  const { data: template, isLoading, error } = useQuery<TemplateDetail>({
    queryKey: [`/api/docukit/templates/${categorySlug}/${templateSlug}`],
  });

  // Fetch related templates
  const { data: relatedTemplates = [] } = useQuery<TemplateDetail[]>({
    queryKey: [`/api/docukit/templates?categoryId=${template?.categoryId}&limit=3&exclude=${template?.id}`],
    enabled: !!template,
  });

  const handleDownload = async () => {
    if (!template) return;
    
    try {
      // Track download
      await fetch(`/api/docukit/templates/${template.id}/download`, {
        method: "POST",
      });
      
      setHasDownloaded(true);
      
      // Open download URL
      window.open(template.downloadUrl, "_blank");
    } catch (error) {
      console.error("Download tracking failed:", error);
      // Still allow download even if tracking fails
      window.open(template.downloadUrl, "_blank");
    }
  };

  const handlePreview = () => {
    if (template?.previewUrl) {
      window.open(template.previewUrl, "_blank");
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-12 bg-gray-200 rounded w-2/3 mb-6" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-64 bg-gray-200 rounded" />
                </div>
                <div className="h-96 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer location={null} />
      </>
    );
  }

  if (error || !template) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Template Not Found</h1>
            <p className="text-gray-600 mb-8">The template you're looking for doesn't exist or has been removed.</p>
            <Link href="/docukit">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to DocuKit
              </Button>
            </Link>
          </div>
        </div>
        <Footer location={null} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{template.title} | DocuKit by SimplySetup</title>
        <meta name="description" content={template.description} />
        <meta name="keywords" content={`${template.title}, ${template.categoryName}, template, free download, business documents`} />
        <meta property="og:title" content={`${template.title} | DocuKit`} />
        <meta property="og:description" content={template.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={template.title} />
        <meta name="twitter:description" content={template.description} />
        <link rel="canonical" href={`https://simplysetup.co/docukit/${template.categorySlug}/${template.slug}`} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "name": template.title,
            "description": template.description,
            "url": `https://simplysetup.co/docukit/${template.categorySlug}/${template.slug}`,
            "fileFormat": template.formats.join(", "),
            "downloadUrl": template.downloadUrl,
            "category": template.categoryName,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": template.rating,
              "ratingCount": template.ratingCount,
              "bestRating": "5",
              "worstRating": "1"
            },
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/DownloadAction",
              "userInteractionCount": template.downloadCount
            },
            "publisher": {
              "@type": "Organization",
              "name": "SimplySetup",
              "logo": {
                "@type": "ImageObject",
                "url": "https://simplysetup.co/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/docukit" className="text-gray-600 hover:text-primary">
                DocuKit
              </Link>
              <span className="text-gray-400">/</span>
              <Link href={`/docukit/${template.categorySlug}`} className="text-gray-600 hover:text-primary">
                {template.categoryName}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{template.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link href={`/docukit/${template.categorySlug}`} className="inline-flex items-center text-primary hover:text-primary-dark mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to {template.categoryName}
                </Link>
                
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">{template.categoryName}</Badge>
                  {template.isPopular && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {template.title}
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {template.description}
                </p>

                {/* Format Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.formats.map((format, index) => (
                    <Badge key={index} variant="outline" className="text-sm font-medium">
                      {format}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    <span>{template.downloadCount.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>Rating: {template.rating}/5</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{template.ratingCount} reviews</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              {template.features && template.features.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Why Use This Template?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
                      <p className="text-sm text-gray-600">Ready-to-use template saves hours of formatting work</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
                      <p className="text-sm text-gray-600">Designed by experts for professional use</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Trusted</h3>
                      <p className="text-sm text-gray-600">Used by thousands of businesses worldwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Download Template</CardTitle>
                  <CardDescription>Free download in multiple formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleDownload}
                    size="lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {hasDownloaded ? "Download Again" : "Download Free"}
                  </Button>
                  
                  {template.previewUrl && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handlePreview}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Preview Template
                    </Button>
                  )}

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{template.categoryName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Formats:</span>
                      <span className="font-medium">{template.formats.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Downloads:</span>
                      <span className="font-medium">{template.downloadCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{template.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Templates */}
              {relatedTemplates.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedTemplates.map((relatedTemplate) => (
                      <Link 
                        key={relatedTemplate.id} 
                        href={`/docukit/${relatedTemplate.categorySlug}/${relatedTemplate.slug}`}
                        className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">
                          {relatedTemplate.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {relatedTemplate.description}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Download className="h-3 w-3 mr-1" />
                          {relatedTemplate.downloadCount.toLocaleString()}
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer location={null} />
    </>
  );
}