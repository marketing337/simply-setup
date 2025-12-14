import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  FileText,
  Download,
  CheckCircle,
  ArrowRight,
  Users,
  Scale,
  Shield,
  Clock,
  Star,
  Search,
  ArrowLeft,
  Building2,
  TrendingUp,
  Briefcase,
  Filter,
  Calendar,
  Award,
  Eye,
  BookOpen,
  Target,
  Zap,
  Globe,
  ChevronRight
} from "lucide-react";
import type { DocukitCategory, DocukitTemplate } from "@shared/schema";

const categoryConfig = {
  legal: {
    icon: Scale,
    color: "purple",
    bgClass: "from-purple-50 to-indigo-100",
    title: "Legal & Compliance Templates",
    description: "Professional legal documents and compliance templates for businesses. All templates are drafted by legal experts and comply with Indian regulations.",
    metaTitle: "Legal Templates & Compliance Documents for Indian Businesses | DocuKit",
    metaDescription: "Download professional legal templates for Indian businesses. NDAs, contracts, compliance documents, and legal agreements. All templates are lawyer-reviewed and India-compliant.",
    keywords: "legal templates india, compliance documents, NDA template, contract templates, business legal documents, indian law templates, legal agreements, company legal forms",
    breadcrumbSchema: true,
    faqSchema: [
      {
        question: "Are these legal templates valid in India?",
        answer: "Yes, all our legal templates are drafted by qualified Indian lawyers and comply with current Indian business laws and regulations."
      },
      {
        question: "Can I customize these legal templates?",
        answer: "Absolutely! All templates are fully editable and can be customized to suit your specific business requirements while maintaining legal compliance."
      },
      {
        question: "Do these templates include GST compliance?",
        answer: "Yes, our business legal templates include GST compliance provisions and are updated to reflect current Indian tax regulations."
      }
    ],
    benefits: [
      {
        icon: Clock,
        title: "Save Legal Costs",
        description: "Pre-drafted templates save thousands in legal fees"
      },
      {
        icon: Shield,
        title: "Legal Compliance", 
        description: "All templates comply with Indian business laws"
      },
      {
        icon: Star,
        title: "Expert Drafted",
        description: "Created by experienced legal professionals"
      },
      {
        icon: Users,
        title: "Trusted by 500+ Businesses",
        description: "Used by startups and enterprises across India"
      }
    ]
  },
  operations: {
    icon: Briefcase,
    color: "blue",
    bgClass: "from-blue-50 to-indigo-100",
    title: "Business Operations Templates",
    description: "Streamline your business operations with professional templates for SOPs, processes, and operational documents.",
    metaTitle: "Business Operations Templates & SOP Documents | DocuKit India",
    metaDescription: "Download professional business operations templates, SOPs, process documents, and operational forms for Indian businesses. Streamline your workflows with expert-designed templates.",
    keywords: "business operations templates, SOP templates india, standard operating procedures, process documentation, operational templates, business workflow templates, company procedures",
    breadcrumbSchema: true,
    faqSchema: [
      {
        question: "What types of operational templates are included?",
        answer: "Our operations category includes SOPs, process documentation, workflow templates, checklists, operational procedures, and business process mapping templates."
      },
      {
        question: "Are these templates suitable for Indian businesses?",
        answer: "Yes, all templates are designed specifically for Indian business environments and comply with local operational standards and regulations."
      },
      {
        question: "Can I modify these operational templates?",
        answer: "Absolutely! All operational templates are fully customizable and can be adapted to match your specific business processes and requirements."
      }
    ],
    benefits: [
      {
        icon: Clock,
        title: "Streamline Operations",
        description: "Ready-to-use templates for efficient processes"
      },
      {
        icon: Shield,
        title: "Industry Standards",
        description: "Templates follow best practices and standards"
      },
      {
        icon: Star,
        title: "Process Optimization",
        description: "Designed to improve operational efficiency"
      },
      {
        icon: Users,
        title: "Scalable Solutions",
        description: "Templates that grow with your business"
      }
    ]
  },
  marketing: {
    icon: TrendingUp,
    color: "green",
    bgClass: "from-green-50 to-emerald-100", 
    title: "Marketing & Sales Templates",
    description: "Professional marketing and sales templates to boost your business growth and customer engagement.",
    metaTitle: "Marketing & Sales Templates for Indian Businesses | DocuKit",
    metaDescription: "Download professional marketing templates, sales documents, promotional materials, and customer engagement forms for Indian businesses. Boost your marketing ROI with proven templates.",
    keywords: "marketing templates india, sales templates, promotional materials, marketing documents, sales proposals, customer engagement, marketing campaigns, business marketing forms",
    breadcrumbSchema: true,
    faqSchema: [
      {
        question: "What marketing templates are available?",
        answer: "Our marketing category includes sales proposals, marketing plans, customer surveys, promotional materials, social media templates, and campaign tracking documents."
      },
      {
        question: "Are these templates suitable for digital marketing?",
        answer: "Yes, our templates cover both digital and traditional marketing channels, including social media, email marketing, content marketing, and offline campaigns."
      },
      {
        question: "Do these templates help with conversion optimization?",
        answer: "Absolutely! All our marketing templates are designed with conversion optimization in mind, following proven marketing principles and best practices."
      }
    ],
    benefits: [
      {
        icon: Clock,
        title: "Launch Faster",
        description: "Ready-to-use marketing materials and campaigns"
      },
      {
        icon: Shield,
        title: "Professional Quality",
        description: "Designed by marketing experts and agencies"
      },
      {
        icon: Star,
        title: "Conversion Optimized",
        description: "Templates designed to maximize conversions"
      },
      {
        icon: Users,
        title: "Multi-Channel Ready",
        description: "Works across digital and traditional channels"
      }
    ]
  },
  hr: {
    icon: Users,
    color: "emerald",
    bgClass: "from-emerald-50 to-green-100",
    title: "HR & Employee Management Templates",
    description: "Comprehensive HR templates for employee management, policies, procedures, and workforce optimization.",
    metaTitle: "HR Templates & Employee Management Documents | DocuKit India",
    metaDescription: "Download professional HR templates for Indian businesses. Employee handbooks, offer letters, performance reviews, HR policies, and employment contracts. All India-compliant.",
    keywords: "hr templates india, employee handbook template, offer letter template, hr policies, employment contracts, performance review templates, hr documents india, employee management",
    breadcrumbSchema: true,
    faqSchema: [
      {
        question: "Are these HR templates compliant with Indian labor laws?",
        answer: "Yes, all HR templates are designed to comply with Indian labor laws, employment regulations, and statutory requirements including EPF, ESI, and other applicable laws."
      },
      {
        question: "What HR documents are included in this category?",
        answer: "Our HR category includes employee handbooks, offer letters, employment contracts, performance review forms, HR policies, grievance procedures, and onboarding documents."
      },
      {
        question: "Can I customize these HR templates for my company?",
        answer: "Absolutely! All HR templates are fully editable and can be customized with your company branding, specific policies, and requirements while maintaining legal compliance."
      }
    ],
    benefits: [
      {
        icon: Clock,
        title: "Save HR Time",
        description: "Ready-to-use templates for all HR processes"
      },
      {
        icon: Shield,
        title: "Legal Compliance",
        description: "All templates comply with Indian labor laws"
      },
      {
        icon: Star,
        title: "Professional Standards",
        description: "Industry-standard HR practices and formats"
      },
      {
        icon: Users,
        title: "Employee-Friendly",
        description: "Clear, professional documents for better employee relations"
      }
    ]
  },
  finance: {
    icon: TrendingUp,
    color: "amber",
    bgClass: "from-amber-50 to-yellow-100",
    title: "Finance & Accounting Templates",
    description: "Professional financial templates for accounting, budgeting, invoicing, and financial management for Indian businesses.",
    metaTitle: "Finance & Accounting Templates for Indian Businesses | DocuKit",
    metaDescription: "Download professional finance templates including GST invoices, accounting sheets, budget planners, and financial reports. All templates are GST-compliant and India-specific.",
    keywords: "finance templates india, accounting templates, GST invoice template, budget planner, financial reports, accounting documents, invoice templates india, financial planning",
    breadcrumbSchema: true,
    faqSchema: [
      {
        question: "Are these finance templates GST compliant?",
        answer: "Yes, all our financial templates are GST compliant and follow current Indian taxation and accounting standards including TDS, GST, and other regulatory requirements."
      },
      {
        question: "What financial documents are available?",
        answer: "Our finance category includes GST invoices, budget planners, expense trackers, profit & loss statements, cash flow templates, and accounting worksheets."
      },
      {
        question: "Can these templates help with tax compliance?",
        answer: "Absolutely! Our templates are designed to help with Indian tax compliance including GST filing, TDS calculations, and maintaining proper financial records as per Indian accounting standards."
      }
    ],
    benefits: [
      {
        icon: Clock,
        title: "Save Accounting Time",
        description: "Automated calculations and professional formats"
      },
      {
        icon: Shield,
        title: "Tax Compliance",
        description: "GST compliant and follows Indian accounting standards"
      },
      {
        icon: Star,
        title: "Professional Reports",
        description: "Generate professional financial reports and statements"
      },
      {
        icon: Users,
        title: "Business-Ready",
        description: "Suitable for startups to large enterprises"
      }
    ]
  }
};

export default function DocuKitCategoryPage() {
  const [match, params] = useRoute("/docukit/:categorySlug");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [formatFilter, setFormatFilter] = useState("all");
  
  const categorySlug = params?.categorySlug;

  // Fetch category details
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<DocukitCategory[]>({
    queryKey: ["/api/docukit/categories"],
  });

  // Fetch templates for this category
  const { data: templates = [], isLoading: templatesLoading } = useQuery<DocukitTemplate[]>({
    queryKey: ["/api/docukit/templates", categorySlug],
    queryFn: async () => {
      const category = categories.find(cat => cat.slug === categorySlug);
      if (!category) return [];
      
      const response = await fetch(`/api/docukit/templates?categoryId=${category.id}`);
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    },
    enabled: !!categorySlug && categories.length > 0,
  });

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    let filtered = templates.filter(template => 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (formatFilter !== "all") {
      filtered = filtered.filter(template => 
        template.formats.some(format => format.toLowerCase() === formatFilter.toLowerCase())
      );
    }

    // Sort templates
    switch (sortBy) {
      case "popular":
        return filtered.sort((a, b) => b.downloadCount - a.downloadCount);
      case "rating":
        return filtered.sort((a, b) => parseFloat(b.rating.toString()) - parseFloat(a.rating.toString()));
      case "newest":
        return filtered.sort((a, b) => b.id - a.id);
      case "alphabetical":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [templates, searchTerm, sortBy, formatFilter]);

  const handleDownload = async (template: DocukitTemplate) => {
    try {
      // Track download
      await fetch(`/api/docukit/templates/${template.id}/download`, {
        method: "POST",
      });
      
      // Open download URL
      window.open(template.downloadUrl, "_blank");
    } catch (error) {
      console.error("Download tracking failed:", error);
      // Still allow download even if tracking fails
      window.open(template.downloadUrl, "_blank");
    }
  };

  const category = categories.find(cat => cat.slug === categorySlug);
  const config = categoryConfig[categorySlug as keyof typeof categoryConfig];
  
  if (categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-skeleton rounded-full h-8 w-8"></div>
      </div>
    );
  }

  if (!category || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link href="/docukit">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to DocuKit
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = config.icon;

  // Generate dynamic structured data
  const generateStructuredData = () => {
    const baseUrl = "https://simplysetup.co";
    const currentUrl = `${baseUrl}/docukit/${categorySlug}`;
    
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "DocuKit",
          "item": `${baseUrl}/docukit`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category?.name || config.title,
          "item": currentUrl
        }
      ]
    };

    const faqPage = config.faqSchema && config.faqSchema.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": config.faqSchema.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    } : null;

    const collectionPage = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": config.title,
      "description": config.metaDescription || config.description,
      "url": currentUrl,
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "name": "SimplySetup",
        "url": baseUrl
      },
      "about": {
        "@type": "Thing",
        "name": category?.name || config.title,
        "description": config.description
      },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": filteredTemplates.length,
        "itemListElement": filteredTemplates.slice(0, 10).map((template, index) => ({
          "@type": "CreativeWork",
          "position": index + 1,
          "name": template.title,
          "description": template.description,
          "url": `${baseUrl}/docukit/${categorySlug}/${template.slug}`,
          "downloadUrl": template.downloadUrl,
          "fileFormat": template.formats,
          "aggregateRating": template.rating && parseFloat(template.rating.toString()) > 0 ? {
            "@type": "AggregateRating",
            "ratingValue": parseFloat(template.rating.toString()),
            "ratingCount": template.ratingCount || 1
          } : undefined,
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/DownloadAction",
            "userInteractionCount": template.downloadCount
          }
        }))
      }
    };

    return { breadcrumbList, faqPage, collectionPage };
  };

  const { breadcrumbList, faqPage, collectionPage } = generateStructuredData();

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{config.metaTitle || `${config.title} | DocuKit by SimplySetup`}</title>
        <meta name="title" content={config.metaTitle || `${config.title} | DocuKit by SimplySetup`} />
        <meta name="description" content={config.metaDescription || config.description} />
        <meta name="keywords" content={config.keywords || `${category?.name.toLowerCase()}, templates, documents, business, ${categorySlug}, download`} />
        <meta name="author" content="SimplySetup" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://simplysetup.co/docukit/${categorySlug}`} />
        
        {/* Alternate Language Tags */}
        <link rel="alternate" hrefLang="en-IN" href={`https://simplysetup.co/docukit/${categorySlug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://simplysetup.co/docukit/${categorySlug}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://simplysetup.co/docukit/${categorySlug}`} />
        <meta property="og:title" content={config.metaTitle || `${config.title} | DocuKit by SimplySetup`} />
        <meta property="og:description" content={config.metaDescription || config.description} />
        <meta property="og:image" content={`https://simplysetup.co/api/og/docukit/${categorySlug}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${config.title} - Professional business templates`} />
        <meta property="og:site_name" content="SimplySetup" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://simplysetup.co/docukit/${categorySlug}`} />
        <meta name="twitter:title" content={config.metaTitle || config.title} />
        <meta name="twitter:description" content={config.metaDescription || config.description} />
        <meta name="twitter:image" content={`https://simplysetup.co/api/og/docukit/${categorySlug}`} />
        <meta name="twitter:image:alt" content={`${config.title} - Professional business templates`} />
        <meta name="twitter:creator" content="@SimplySetupCo" />
        <meta name="twitter:site" content="@SimplySetupCo" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DocuKit" />
        <meta name="application-name" content="DocuKit" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preload Critical Resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for External Domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Structured Data - Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbList)}
        </script>

        {/* Structured Data - FAQ */}
        {faqPage && (
          <script type="application/ld+json">
            {JSON.stringify(faqPage)}
          </script>
        )}

        {/* Structured Data - Collection Page */}
        <script type="application/ld+json">
          {JSON.stringify(collectionPage)}
        </script>

        {/* WebSite Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SimplySetup DocuKit",
            "url": "https://simplysetup.co/docukit",
            "description": "Professional business document templates for Indian entrepreneurs and businesses",
            "inLanguage": "en-IN",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://simplysetup.co/docukit?search={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SimplySetup",
              "url": "https://simplysetup.co",
              "logo": {
                "@type": "ImageObject",
                "url": "https://simplysetup.co/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <div className={`min-h-screen bg-gradient-to-br ${config.bgClass}`}>
        {/* Breadcrumb with Rich Snippets */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/" className="text-gray-600 hover:text-primary" itemProp="item">
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <span className="text-gray-400" aria-hidden="true">/</span>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/docukit" className="text-gray-600 hover:text-primary" itemProp="item">
                    <span itemProp="name">DocuKit</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <span className="text-gray-400" aria-hidden="true">/</span>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span className="text-gray-900 font-medium" itemProp="name">{category.name}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <header className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Link href="/docukit" className="inline-flex items-center text-primary hover:text-primary-dark mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to DocuKit
              </Link>
              <Badge className={`mb-4 bg-${config.color}-100 text-${config.color}-800 hover:bg-${config.color}-200`}>
                <IconComponent className="h-4 w-4 mr-2" />
                {category.name}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {config.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {config.metaDescription || config.description}
              </p>
              
              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{filteredTemplates.length}+</div>
                  <div className="text-sm text-gray-600">Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredTemplates.reduce((sum, t) => sum + t.downloadCount, 0).toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredTemplates.length > 0 ? 
                      (filteredTemplates.reduce((sum, t) => sum + parseFloat(t.rating.toString() || '0'), 0) / filteredTemplates.length).toFixed(1) 
                      : '4.8'
                    }
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">India Ready</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3">
                  <Download className="mr-2 h-5 w-5" />
                  Download All Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Templates
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Benefits Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {config.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 bg-${config.color}-100 rounded-lg`}>
                        <Icon className={`h-6 w-6 text-${config.color}-600`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <main className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {filteredTemplates.length} {category.name} Templates Available
              </h2>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="alphabetical">A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
            
            {templatesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-6 bg-gray-200 rounded animate-pulse" />
                      <div className="h-12 bg-gray-200 rounded animate-pulse" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="h-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-8 bg-gray-200 rounded animate-pulse" />
                    </CardContent>
                    <CardFooter>
                      <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? `No templates match "${searchTerm}"` : "No templates available in this category"}
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                    className="mb-4"
                  >
                    Clear Search
                  </Button>
                )}
                <Link href="/docukit">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Browse Other Categories
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {template.isPopular && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                              Popular
                            </Badge>
                          )}
                          {template.formats.map((format, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {template.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-3">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Template Features */}
                      {template.features && template.features.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {template.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="flex items-center text-xs text-gray-600">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                                {feature}
                              </div>
                            ))}
                            {template.features.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{template.features.length - 3} more features
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Template Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            <span>{template.downloadCount.toLocaleString()}</span>
                          </div>
                          {template.rating && parseFloat(template.rating.toString()) > 0 && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{parseFloat(template.rating.toString()).toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <div className="flex gap-2 w-full">
                        <Link href={`/docukit/${category.slug}/${template.slug}`} className="flex-1">
                          <Button className="w-full">
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        {template.downloadUrl && (
                          <Button
                            variant="outline"
                            onClick={() => handleDownload(template)}
                            className="px-3"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* FAQ Section */}
        {config.faqSchema && config.faqSchema.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Everything you need to know about {category?.name.toLowerCase()} templates
                </p>
              </div>
              
              <div className="space-y-8">
                {config.faqSchema.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                        {index + 1}
                      </span>
                      {faq.question}
                    </h3>
                    <div className="ml-12">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categories Cross-promotion */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore Other Template Categories
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive business templates for every aspect of your company
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(categoryConfig)
                .filter(([slug]) => slug !== categorySlug)
                .slice(0, 4)
                .map(([slug, otherConfig]) => {
                  const OtherIcon = otherConfig.icon;
                  return (
                    <Link key={slug} href={`/docukit/${slug}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white h-full">
                        <CardHeader className="text-center pb-2">
                          <div className="flex justify-center mb-3">
                            <div className={`p-3 bg-${otherConfig.color}-100 rounded-lg group-hover:scale-110 transition-transform`}>
                              <OtherIcon className={`h-6 w-6 text-${otherConfig.color}-600`} />
                            </div>
                          </div>
                          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {otherConfig.title.replace(' Templates', '')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 text-center">
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {otherConfig.description}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0 justify-center">
                          <div className="flex items-center text-sm text-primary font-medium group-hover:underline">
                            Browse Templates
                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Streamline Your Business?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Download professional {category?.name.toLowerCase()} templates and save hours of work
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                <Download className="mr-2 h-5 w-5" />
                Download All {category?.name} Templates
              </Button>
              <Link href="/docukit">
                <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore All Categories
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}