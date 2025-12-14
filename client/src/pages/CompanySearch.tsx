import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, Building2, MapPin, Calendar, Globe, Phone, Mail, FileText, TrendingUp, Users, IndianRupee, ExternalLink, Database, BarChart3, Shield, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation as useCurrentLocation } from "@/hooks/useLocation";

interface Company {
  id: number;
  cin: string;
  companyName: string;
  slug: string;
  companyROCcode: string;
  companyCategory: string;
  companySubCategory: string;
  companyClass: string;
  authorizedCapital: string;
  paidupCapital: string;
  registrationDate: string;
  registeredOfficeAddress: string;
  listingStatus: string;
  companyStatus: string;
  companyStateCode: string;
  companyType: string;
  nicCode: string;
  companyIndustrialClassification: string;
  createdAt: string;
  updatedAt: string;
}

interface CompanyStats {
  totalCompanies: number;
}

export default function CompanySearch() {
  const { currentLocation } = useCurrentLocation();
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch company statistics
  const { data: stats } = useQuery<CompanyStats>({
    queryKey: ["/api/companies/stats"],
    queryFn: async () => {
      const response = await fetch("/api/companies/stats");
      if (!response.ok) throw new Error("Failed to fetch statistics");
      return response.json();
    },
  });

  // Search companies
  const { data: companies, isLoading, error } = useQuery<Company[]>({
    queryKey: ["/api/companies/search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];
      
      const response = await fetch(`/api/companies/search?q=${encodeURIComponent(debouncedQuery)}&limit=50`);
      if (!response.ok) throw new Error("Failed to search companies");
      return response.json();
    },
    enabled: !!debouncedQuery.trim(),
  });

  const formatCurrency = (amount: string | null) => {
    if (!amount || amount === "0" || amount === "0.00") return "Not specified";
    const value = parseFloat(amount);
    if (isNaN(value)) return amount;
    
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    } else {
      return `₹${value.toLocaleString('en-IN')}`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'strike off':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'dormant':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClassColor = (companyClass: string) => {
    switch (companyClass?.toLowerCase()) {
      case 'private':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'public':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'one person company':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Company Search Engine - 112,000+ Indian Companies Database | SimplySetup</title>
        <meta name="title" content="Company Search Engine - 112,000+ Indian Companies Database | SimplySetup" />
        <meta name="description" content="Search through 112,000+ registered Indian companies with CIN numbers, financial data, registration details, and business classifications. Find company information, authorized capital, paid-up capital, ROC details, and more." />
        <meta name="keywords" content="company search, CIN lookup, indian companies database, company information, business search, corporate database, ROC search, company registration details, authorized capital, paid-up capital, company status, business directory, corporate information, MCA database, ministry of corporate affairs, company finder, business lookup, corporate search engine, indian business directory, company profiles, business information, corporate data, company verification, business details, enterprise search, corporate registry, company database india, business intelligence, company research, due diligence, corporate compliance, business analytics" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="SimplySetup" />
        <meta name="copyright" content="SimplySetup" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://simplysetup.com/companies" />
        <meta property="og:title" content="Company Search Engine - 112,000+ Indian Companies Database | SimplySetup" />
        <meta property="og:description" content="Search through 112,000+ registered Indian companies with CIN numbers, financial data, registration details, and business classifications. Find company information, authorized capital, paid-up capital, ROC details, and more." />
        <meta property="og:image" content="https://simplysetup.com/api/og-image?title=Company%20Search%20Engine&subtitle=112,000+%20Indian%20Companies%20Database" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="SimplySetup" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://simplysetup.com/companies" />
        <meta property="twitter:title" content="Company Search Engine - 112,000+ Indian Companies Database" />
        <meta property="twitter:description" content="Search through 112,000+ registered Indian companies with CIN numbers, financial data, and business classifications." />
        <meta property="twitter:image" content="https://simplysetup.com/api/og-image?title=Company%20Search%20Engine&subtitle=112,000+%20Indian%20Companies%20Database" />
        <meta property="twitter:creator" content="@SimplySetup" />

        {/* Additional Meta Tags for AI/SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="India" />
        <meta name="distribution" content="global" />
        <meta name="target" content="business owners, entrepreneurs, researchers, compliance officers, investors, analysts" />
        <meta name="audience" content="business professionals, entrepreneurs, investors, compliance officers, legal professionals, researchers, analysts, consultants" />
        <meta name="subject" content="Indian company database, business search, corporate information, company registration details" />
        <meta name="classification" content="Business Directory, Corporate Database, Company Search Engine" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://simplysetup.com/companies" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://simplysetup.com/#website",
                "url": "https://simplysetup.com",
                "name": "SimplySetup",
                "description": "Virtual Office and Business Setup Services in India",
                "potentialAction": [
                  {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://simplysetup.com/companies?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                ],
                "inLanguage": "en-IN",
                "copyrightYear": "2025",
                "copyrightHolder": {
                  "@type": "Organization",
                  "name": "SimplySetup"
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://simplysetup.com/companies#webpage",
                "url": "https://simplysetup.com/companies",
                "name": "Company Search Engine - 112,000+ Indian Companies Database",
                "isPartOf": {
                  "@id": "https://simplysetup.com/#website"
                },
                "about": {
                  "@type": "Thing",
                  "name": "Indian Companies Database",
                  "description": "Comprehensive database of registered Indian companies with financial and registration details"
                },
                "datePublished": "2025-06-28",
                "dateModified": "2025-06-28",
                "description": "Search through 112,000+ registered Indian companies with CIN numbers, financial data, registration details, and business classifications.",
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://simplysetup.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Company Search",
                      "item": "https://simplysetup.com/companies"
                    }
                  ]
                },
                "mainEntity": {
                  "@type": "Dataset",
                  "name": "Indian Companies Database",
                  "description": "Comprehensive database of 112,000+ registered Indian companies with financial and registration information",
                  "keywords": ["indian companies", "CIN database", "corporate information", "business directory"],
                  "temporalCoverage": "1882/2025",
                  "spatialCoverage": {
                    "@type": "Country",
                    "name": "India"
                  },
                  "distribution": [
                    {
                      "@type": "DataDownload",
                      "encodingFormat": "application/json",
                      "contentUrl": "https://simplysetup.com/api/companies"
                    }
                  ],
                  "creator": {
                    "@type": "Organization",
                    "name": "SimplySetup",
                    "url": "https://simplysetup.com"
                  }
                },
                "inLanguage": "en-IN"
              },
              {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://simplysetup.com/companies?q={company_name}"
                },
                "query-input": "required name=company_name",
                "object": {
                  "@type": "Thing",
                  "name": "Indian Company Search",
                  "description": "Search for registered Indian companies by name, CIN, or other criteria"
                }
              },
              {
                "@type": "Organization",
                "name": "SimplySetup",
                "url": "https://simplysetup.com",
                "logo": "https://simplysetup.com/logo.png",
                "description": "Leading provider of virtual office and business setup services in India",
                "foundingDate": "2020",
                "areaServed": {
                  "@type": "Country",
                  "name": "India"
                },
                "serviceType": ["Virtual Office Services", "Business Registration", "Company Search"],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Business Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Company Database Search",
                        "description": "Access to comprehensive Indian companies database"
                      }
                    }
                  ]
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        
        <main className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">Company Search Engine</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 truncate sm:block">
                Search through {stats?.totalCompanies?.toLocaleString('en-IN') || '794'} registered companies
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Search Section */}
        <div className="mb-6 sm:mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <span>Search Companies</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Search by company name, CIN, state, industry classification, or address
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  type="text"
                  placeholder="Enter company name, CIN, or search term..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:pl-10 text-base sm:text-lg py-4 sm:py-6 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
              
              {stats && (
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{stats.totalCompanies.toLocaleString('en-IN')} companies available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Real-time data</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {debouncedQuery && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Search Results for "{debouncedQuery}"
              </h2>
              {companies && !isLoading && (
                <Badge variant="outline" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                  {companies.length} results found
                </Badge>
              )}
            </div>

            {isLoading && (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex space-x-2">
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {error && (
              <Card className="shadow-sm border-red-200">
                <CardContent className="p-6 text-center">
                  <div className="text-red-600 font-medium">
                    Failed to search companies. Please try again.
                  </div>
                </CardContent>
              </Card>
            )}

            {companies && !isLoading && companies.length === 0 && (
              <Card className="shadow-sm">
                <CardContent className="p-8 text-center">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or use different keywords.
                  </p>
                </CardContent>
              </Card>
            )}

            {companies && !isLoading && companies.length > 0 && (
              <div className="space-y-6">
                {companies.map((company) => (
                  <Card 
                    key={company.id} 
                    className="shadow-lg hover:shadow-xl transition-shadow border-0 bg-white cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/companies/${company.slug}`;
                    }}
                  >
                    <CardContent className="p-4 sm:p-6">
                      {/* Company Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3 sm:mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors leading-tight flex-1">
                              {company.companyName}
                            </h3>
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                          </div>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(company.companyStatus)} font-medium text-xs sm:text-sm`}
                            >
                              {company.companyStatus || 'Unknown'}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`${getClassColor(company.companyClass)} font-medium text-xs sm:text-sm`}
                            >
                              {company.companyClass || 'Unknown'}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs sm:text-sm">
                              {company.companyType || 'Unknown'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="lg:text-right mt-3 lg:mt-0">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">CIN</div>
                          <div className="font-mono text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 rounded border break-all">
                            {company.cin}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-3 sm:my-4" />

                      {/* Company Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {/* Left Column */}
                        <div className="space-y-3 sm:space-y-4">
                          {/* Financial Information */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                              <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-600" />
                              Financial Information
                            </h4>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className="text-gray-600">Authorized Capital:</span>
                                <span className="font-medium">{formatCurrency(company.authorizedCapital)}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className="text-gray-600">Paid-up Capital:</span>
                                <span className="font-medium">{formatCurrency(company.paidupCapital)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Registration Information */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-600" />
                              Registration Details
                            </h4>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className="text-gray-600">Registration Date:</span>
                                <span className="font-medium">
                                  {company.registrationDate ? new Date(company.registrationDate).toLocaleDateString('en-IN') : 'Not available'}
                                </span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className="text-gray-600">ROC:</span>
                                <span className="font-medium">{company.companyROCcode || 'Not available'}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className="text-gray-600">Category:</span>
                                <span className="font-medium">{company.companyCategory || 'Not available'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-3 sm:space-y-4">
                          {/* Location Information */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-red-600" />
                              Location
                            </h4>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                              <div>
                                <span className="text-gray-600">State:</span>
                                <span className="font-medium ml-2 capitalize">
                                  {company.companyStateCode?.replace(/_/g, ' ') || 'Not available'}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Address:</span>
                                <p className="text-gray-900 mt-1 leading-relaxed">
                                  {company.registeredOfficeAddress || 'Address not available'}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Industry Information */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-purple-600" />
                              Industry Classification
                            </h4>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className="text-gray-600">NIC Code:</span>
                                <span className="font-medium">{company.nicCode || 'Not available'}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Classification:</span>
                                <p className="text-gray-900 mt-1">
                                  {company.companyIndustrialClassification || 'Not available'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Welcome Message and Comprehensive Information */}
        {!debouncedQuery && (
          <>
            {/* Hero Section */}
            <div className="text-center py-12">
              <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Database className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    India's Most Comprehensive Company Database
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
                    Access detailed information on {stats?.totalCompanies?.toLocaleString('en-IN') || '112,000+'} registered Indian companies. 
                    Search by company name, CIN number, industry classification, state, or business category. Get complete 
                    financial data, registration details, authorized capital, paid-up capital, and business classifications 
                    from the Ministry of Corporate Affairs (MCA) database.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                    <div className="flex flex-col items-center space-y-2 text-gray-600">
                      <Search className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">Advanced Search</span>
                      <span className="text-xs text-center">Multi-criteria filtering</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-gray-600">
                      <FileText className="h-6 w-6 text-green-600" />
                      <span className="font-medium">Complete Data</span>
                      <span className="text-xs text-center">Financial & registration details</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-gray-600">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                      <span className="font-medium">Real-time Updates</span>
                      <span className="text-xs text-center">Latest MCA records</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-gray-600">
                      <Shield className="h-6 w-6 text-red-600" />
                      <span className="font-medium">Verified Data</span>
                      <span className="text-xs text-center">Official government sources</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Database Statistics */}
            <div className="mb-12">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    <span>Database Statistics & Coverage</span>
                  </CardTitle>
                  <CardDescription>
                    Comprehensive coverage of Indian corporate landscape from 1882 to 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stats?.totalCompanies?.toLocaleString('en-IN') || '112,000+'}</div>
                      <div className="text-sm text-gray-600 mt-1">Total Companies</div>
                      <div className="text-xs text-gray-500 mt-1">Registered entities</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">68,000+</div>
                      <div className="text-sm text-gray-600 mt-1">Active Companies</div>
                      <div className="text-xs text-gray-500 mt-1">Currently operating</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">143</div>
                      <div className="text-sm text-gray-600 mt-1">Years Coverage</div>
                      <div className="text-xs text-gray-500 mt-1">1882 to 2025</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">28+</div>
                      <div className="text-sm text-gray-600 mt-1">States & UTs</div>
                      <div className="text-xs text-gray-500 mt-1">Pan-India coverage</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Features */}
            <div className="mb-12">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-6 w-6 text-blue-600" />
                    <span>Search Capabilities & Features</span>
                  </CardTitle>
                  <CardDescription>
                    Multiple search options to find exactly what you're looking for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Search By:</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span><strong>Company Name:</strong> Full or partial company names</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span><strong>CIN Number:</strong> Corporate Identification Numbers</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span><strong>State/Location:</strong> Registered office state</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          <span><strong>Industry:</strong> Business classification & NIC codes</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          <span><strong>Address:</strong> Registered office address details</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                          <span><strong>ROC Code:</strong> Registrar of Companies codes</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Data Available:</h4>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center space-x-3">
                          <IndianRupee className="h-4 w-4 text-green-600" />
                          <span><strong>Financial Data:</strong> Authorized & paid-up capital</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span><strong>Registration:</strong> Date, ROC, category details</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-red-600" />
                          <span><strong>Location:</strong> State, address information</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                          <span><strong>Classification:</strong> Industry & business type</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Building2 className="h-4 w-4 text-gray-600" />
                          <span><strong>Status:</strong> Active, dormant, or strike-off</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <Globe className="h-4 w-4 text-blue-600" />
                          <span><strong>Company Type:</strong> Private, public, OPC, foreign</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Use Cases */}
            <div className="mb-12">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span>Who Uses Our Company Database?</span>
                  </CardTitle>
                  <CardDescription>
                    Trusted by professionals across various industries for business intelligence and compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <Award className="h-8 w-8 text-blue-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Business Analysts</h4>
                      <p className="text-sm text-gray-600">Market research, competitor analysis, industry studies, and business intelligence gathering.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <Shield className="h-8 w-8 text-green-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Compliance Officers</h4>
                      <p className="text-sm text-gray-600">Due diligence, KYC verification, regulatory compliance, and corporate governance checks.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Investors</h4>
                      <p className="text-sm text-gray-600">Investment research, financial analysis, portfolio management, and risk assessment.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <FileText className="h-8 w-8 text-red-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Legal Professionals</h4>
                      <p className="text-sm text-gray-600">Corporate law research, merger & acquisition due diligence, and legal compliance verification.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <Building2 className="h-8 w-8 text-orange-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Entrepreneurs</h4>
                      <p className="text-sm text-gray-600">Business name availability, competitor research, industry benchmarking, and market validation.</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <Database className="h-8 w-8 text-teal-600 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">Researchers</h4>
                      <p className="text-sm text-gray-600">Academic research, industry studies, economic analysis, and corporate sector research.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <span>Frequently Asked Questions</span>
                  </CardTitle>
                  <CardDescription>
                    Common questions about our company database and search functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div itemScope itemType="https://schema.org/Question">
                      <h4 className="font-semibold text-gray-900 mb-2" itemProp="name">
                        What information is available for each company?
                      </h4>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p className="text-gray-600 text-sm leading-relaxed" itemProp="text">
                          Each company profile includes comprehensive details: CIN number, company name, authorized capital, 
                          paid-up capital, registration date, registered office address, company status (active/dormant), 
                          company class (private/public), ROC code, industry classification (NIC codes), state information, 
                          and listing status. All data is sourced from official MCA (Ministry of Corporate Affairs) records.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div itemScope itemType="https://schema.org/Question">
                      <h4 className="font-semibold text-gray-900 mb-2" itemProp="name">
                        How often is the company database updated?
                      </h4>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p className="text-gray-600 text-sm leading-relaxed" itemProp="text">
                          Our database is regularly updated with the latest information from official government sources. 
                          We maintain real-time synchronization with MCA records to ensure you have access to the most 
                          current company information, including recent registrations, status changes, and financial updates.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div itemScope itemType="https://schema.org/Question">
                      <h4 className="font-semibold text-gray-900 mb-2" itemProp="name">
                        Can I search for companies by industry or business type?
                      </h4>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p className="text-gray-600 text-sm leading-relaxed" itemProp="text">
                          Yes, you can search companies by industry classification using NIC (National Industrial Classification) 
                          codes, business categories, and company sub-categories. Our search engine supports filtering by 
                          industry sectors, business activities, and company classifications to help you find relevant businesses.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div itemScope itemType="https://schema.org/Question">
                      <h4 className="font-semibold text-gray-900 mb-2" itemProp="name">
                        Is this database useful for compliance and due diligence?
                      </h4>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p className="text-gray-600 text-sm leading-relaxed" itemProp="text">
                          Absolutely. Our comprehensive company database is extensively used by compliance officers, legal 
                          professionals, and analysts for KYC verification, due diligence processes, regulatory compliance 
                          checks, and risk assessment. All information is sourced from official government records, ensuring 
                          reliability and authenticity for professional use.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
        </div>
        </main>
        
        <Footer location={currentLocation} />
      </div>
    </>
  );
}