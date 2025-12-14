import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Building2, MapPin, Calendar, Globe, FileText, TrendingUp, IndianRupee, Copy, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
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

export default function CompanyProfile() {
  const { currentLocation } = useCurrentLocation();
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const { data: company, isLoading, error } = useQuery<Company>({
    queryKey: ["/api/companies/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/companies/slug/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Company not found");
        }
        throw new Error("Failed to fetch company");
      }
      return response.json();
    },
    enabled: !!slug,
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <main className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer location={currentLocation} />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <main className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => window.location.href = '/companies'}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Company Search
            </Button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-sm border-red-200">
            <CardContent className="p-8 text-center">
              <Building2 className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Company Not Found</h3>
              <p className="text-gray-600 mb-4">
                The company you're looking for doesn't exist or may have been removed.
              </p>
              <Button onClick={() => window.location.href = '/companies'}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </CardContent>
          </Card>
        </div>
        </main>
        
        <Footer location={currentLocation} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{company.companyName} - CIN {company.cin} | Complete Company Profile & Registration Details | SimplySetup</title>
        <meta name="description" content={`Complete profile of ${company.companyName} (CIN: ${company.cin}). Access detailed registration information, financial data, business classification, authorized capital ₹${company.authorizedCapital}, paid-up capital ₹${company.paidupCapital}. Registered in ${company.companyStateCode} as ${company.companyClass} company. Get comprehensive business insights and corporate data.`} />
        <meta name="keywords" content={`${company.companyName}, CIN ${company.cin}, ${company.companyStateCode} companies, ${company.companyClass}, ${company.companyCategory}, ${company.companySubCategory}, ${company.nicCode}, business registration, corporate information, company search, MCA data, ROC ${company.companyROCcode}, ${company.companyType}, Indian companies, business verification, company profile, corporate database, authorized capital, paid up capital, registration date, company status ${company.companyStatus}, listing status ${company.listingStatus}`} />
        <link rel="canonical" href={`https://simplysetup.com/companies/${company.slug}`} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="SimplySetup - Indian Business Registration Platform" />
        <meta name="publisher" content="SimplySetup" />
        <meta name="copyright" content="SimplySetup" />
        <meta name="language" content="en-IN" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content={company.companyStateCode} />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Mobile and Responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Business/Organization Schema indicators */}
        <meta name="business.name" content={company.companyName} />
        <meta name="business.type" content={company.companyClass} />
        <meta name="business.category" content={company.companyCategory} />
        <meta name="business.subcategory" content={company.companySubCategory} />
        <meta name="business.registration" content={company.cin} />
        <meta name="business.state" content={company.companyStateCode} />
        <meta name="business.roc" content={company.companyROCcode} />
        <meta name="business.status" content={company.companyStatus} />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={`${company.companyName} - CIN ${company.cin} | Complete Company Profile & Business Data`} />
        <meta property="og:description" content={`Complete business profile of ${company.companyName} (CIN: ${company.cin}). Authorized Capital: ₹${company.authorizedCapital}, Paid-up Capital: ₹${company.paidupCapital}. Registered in ${company.companyStateCode} as ${company.companyClass}. Access registration details, financial information, and business classification data on SimplySetup.`} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={`https://simplysetup.com/companies/${company.slug}`} />
        <meta property="og:site_name" content="SimplySetup" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content="https://simplysetup.com/og-company-profile.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${company.companyName} company profile and business information`} />
        
        {/* Business-specific Open Graph tags */}
        <meta property="business:contact_data:street_address" content={company.registeredOfficeAddress} />
        <meta property="business:contact_data:locality" content={company.companyStateCode} />
        <meta property="business:contact_data:country_name" content="India" />
        <meta property="business:contact_data:region" content={company.companyStateCode} />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SimplySetupIn" />
        <meta name="twitter:creator" content="@SimplySetupIn" />
        <meta name="twitter:title" content={`${company.companyName} - CIN ${company.cin} | Company Profile`} />
        <meta name="twitter:description" content={`Complete business profile: ${company.companyName} (CIN: ${company.cin}). Capital: ₹${company.authorizedCapital} authorized, ₹${company.paidupCapital} paid-up. ${company.companyClass} registered in ${company.companyStateCode}.`} />
        <meta name="twitter:image" content="https://simplysetup.com/twitter-company-profile.jpg" />
        <meta name="twitter:image:alt" content={`${company.companyName} company profile and registration details`} />
        
        {/* LinkedIn meta tags */}
        <meta property="linkedin:owner" content="SimplySetup" />
        
        {/* Additional social meta tags */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta name="pinterest" content="nopin" />
        
        {/* Comprehensive JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "Corporation", "LocalBusiness"],
            "@id": `https://simplysetup.com/companies/${company.slug}`,
            "name": company.companyName,
            "legalName": company.companyName,
            "identifier": [
              {
                "@type": "PropertyValue",
                "name": "Corporate Identification Number (CIN)",
                "value": company.cin
              },
              {
                "@type": "PropertyValue", 
                "name": "Registration Number",
                "value": company.cin
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": company.registeredOfficeAddress,
              "addressRegion": company.companyStateCode,
              "addressCountry": "IN",
              "addressLocality": company.companyStateCode
            },
            "url": `https://simplysetup.com/companies/${company.slug}`,
            "sameAs": [
              `https://simplysetup.com/companies/${company.slug}`,
              `https://www.mca.gov.in/content/mca/global/en/mca/master-data/MDS.html`
            ],
            "foundingDate": company.registrationDate,
            "foundingLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": company.companyStateCode,
                "addressCountry": "IN"
              }
            },
            "organizationType": company.companyClass,
            "category": company.companyCategory,
            "subOrganization": company.companySubCategory,
            "vatID": company.cin,
            "taxID": company.cin,
            "duns": company.cin,
            "knowsAbout": [
              company.companyCategory,
              company.companySubCategory,
              "Business Registration",
              "Corporate Compliance",
              company.companyIndustrialClassification
            ],
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Company Status",
                "value": company.companyStatus
              },
              {
                "@type": "PropertyValue",
                "name": "Company Class", 
                "value": company.companyClass
              },
              {
                "@type": "PropertyValue",
                "name": "Company Category",
                "value": company.companyCategory
              },
              {
                "@type": "PropertyValue",
                "name": "Company Sub Category",
                "value": company.companySubCategory
              },
              {
                "@type": "PropertyValue",
                "name": "Authorized Capital",
                "value": `₹${company.authorizedCapital}`,
                "unitCode": "INR"
              },
              {
                "@type": "PropertyValue",
                "name": "Paid-up Capital", 
                "value": `₹${company.paidupCapital}`,
                "unitCode": "INR"
              },
              {
                "@type": "PropertyValue",
                "name": "ROC Code",
                "value": company.companyROCcode
              },
              {
                "@type": "PropertyValue",
                "name": "Company Type",
                "value": company.companyType
              },
              {
                "@type": "PropertyValue",
                "name": "NIC Code",
                "value": company.nicCode
              },
              {
                "@type": "PropertyValue",
                "name": "Industrial Classification",
                "value": company.companyIndustrialClassification
              },
              {
                "@type": "PropertyValue",
                "name": "Listing Status",
                "value": company.listingStatus
              },
              {
                "@type": "PropertyValue",
                "name": "State Code",
                "value": company.companyStateCode
              }
            ],
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Business Registration Certificate",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Ministry of Corporate Affairs, Government of India",
                "url": "https://www.mca.gov.in/"
              }
            },
            "memberOf": {
              "@type": "Organization", 
              "name": `Companies registered under ROC ${company.companyROCcode}`,
              "description": `Registry of Companies under ${company.companyStateCode} jurisdiction`
            },
            "isPartOf": {
              "@type": "Dataset",
              "name": "Indian Corporate Database",
              "description": "Comprehensive database of Indian companies registered under Companies Act",
              "publisher": {
                "@type": "Organization",
                "name": "SimplySetup",
                "url": "https://simplysetup.com"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://simplysetup.com/companies/${company.slug}`,
              "name": `${company.companyName} - Company Profile`,
              "description": `Complete business profile and registration details for ${company.companyName}`,
              "inLanguage": "en-IN",
              "isPartOf": {
                "@type": "WebSite",
                "name": "SimplySetup",
                "url": "https://simplysetup.com"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        
        <main className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* SEO-Optimized Header with Semantic Structure */}
        <header className="bg-white shadow-sm border-b" role="banner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <nav aria-label="Breadcrumb navigation">
              <Button 
                variant="ghost" 
                className="mb-3 sm:mb-4 text-sm sm:text-base"
                onClick={() => window.location.href = '/companies'}
                aria-label="Return to company search results"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Back to Company Search
              </Button>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-lg self-start sm:self-center">
                  <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight break-words" itemProp="name">
                    {company.companyName}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed" itemProp="description">
                    Complete business profile and registration details for {company.companyName}, a {company.companyClass} registered under CIN {company.cin} in {company.companyStateCode}, India.
                  </p>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
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
              </div>
              
              <div className="lg:text-right lg:flex-shrink-0">
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Corporate Identification Number</div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="font-mono text-sm sm:text-lg bg-gray-100 px-2 sm:px-4 py-1 sm:py-2 rounded border font-medium break-all">
                    {company.cin}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(company.cin)}
                    className="h-8 sm:h-10 self-start sm:self-center"
                  >
                    {copied ? <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8" role="main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* MCA Official Website Box */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl text-green-900 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    Ministry of Corporate Affairs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-green-800">
                      Visit the official Ministry of Corporate Affairs website for authentic company information, 
                      regulatory updates, and corporate compliance services.
                    </p>
                    <div className="space-y-2 text-xs text-green-700">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Official company records & documents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Corporate compliance guidelines</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>E-filing services & forms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Latest regulatory notifications</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                      onClick={() => window.open('https://www.mca.gov.in/content/mca/global/en/home.html', '_blank')}
                      data-testid="button-mca-website"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit MCA Official Website
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Information */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    <span>Financial Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                        <div className="text-xs sm:text-sm font-medium text-green-800 mb-1">Authorized Capital</div>
                        <div className="text-lg sm:text-2xl font-bold text-green-900">
                          {formatCurrency(company.authorizedCapital)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                        <div className="text-xs sm:text-sm font-medium text-blue-800 mb-1">Paid-up Capital</div>
                        <div className="text-lg sm:text-2xl font-bold text-blue-900">
                          {formatCurrency(company.paidupCapital)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Registration Details */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    <span>Registration Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Registration Date</div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                          <span className="font-medium text-sm sm:text-base">
                            {company.registrationDate ? new Date(company.registrationDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 'Not available'}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">ROC Code</div>
                        <div className="font-medium text-sm sm:text-base">{company.companyROCcode || 'Not available'}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Category</div>
                        <div className="font-medium text-sm sm:text-base">{company.companyCategory || 'Not available'}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Sub Category</div>
                        <div className="font-medium text-sm sm:text-base">{company.companySubCategory || 'Not available'}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Classification */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    <span>Business Classification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 mb-2">NIC Code</div>
                      <div className="font-mono bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded border inline-block text-sm sm:text-base">
                        {company.nicCode || 'Not available'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Industrial Classification</div>
                      <div className="text-gray-900 leading-relaxed text-sm sm:text-base">
                        {company.companyIndustrialClassification || 'Not available'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Location Information */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                    <span>Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">State</div>
                      <div className="font-medium capitalize text-sm sm:text-base">
                        {company.companyStateCode?.replace(/_/g, ' ') || 'Not available'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Registered Office Address</div>
                      <div className="text-gray-900 leading-relaxed text-xs sm:text-sm">
                        {company.registeredOfficeAddress || 'Address not available'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 sm:space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm sm:text-base"
                      onClick={() => copyToClipboard(company.cin)}
                    >
                      {copied ? <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />}
                      Copy CIN
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm sm:text-base"
                      onClick={() => copyToClipboard(window.location.href)}
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Share Profile
                    </Button>
                    
                    <Link to="/companies">
                      <Button variant="outline" className="w-full justify-start text-sm sm:text-base">
                        <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Search More Companies
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-gray-600">Listing Status:</span>
                      <span className="font-medium">{company.listingStatus || 'Not specified'}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">
                        {new Date(company.updatedAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-gray-600">Data Source:</span>
                      <span className="font-medium">MCA Database</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Virtual Office Promotional Box */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl text-blue-900 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Need Virtual Office?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-blue-800">
                      Establish your business presence with a professional virtual office address. 
                      Perfect for GST registration, company registration, and business compliance.
                    </p>
                    <div className="space-y-2 text-xs text-blue-700">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>Professional business address</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>GST registration support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>Mail handling & forwarding</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>Meeting room access</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                      onClick={() => window.open('https://simplysetup.com', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Us Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Location Information */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                    <span>Registered Office</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {company.registeredOfficeAddress || 'Address not available'}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      State: <span className="font-medium text-gray-700">{company.companyStateCode}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        {/* SEO-Enhanced Footer Section */}
        <footer className="bg-gray-50 border-t mt-12" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <section className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {company.companyName} Company Profile</h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Company Registration Details</h3>
                  <p>
                    {company.companyName} is a {company.companyClass} company registered under the Companies Act with Corporate Identification Number (CIN) {company.cin}. 
                    The company was incorporated on {new Date(company.registrationDate).toLocaleDateString('en-IN')} and is registered under Registry of Companies (ROC) {company.companyROCcode} in {company.companyStateCode}.
                  </p>
                  <p className="mt-2">
                    As a {company.companyCategory} in the {company.companySubCategory} sector, the company operates with an authorized capital of ₹{company.authorizedCapital} and a paid-up capital of ₹{company.paidupCapital}.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Business Classification & Compliance</h3>
                  <p>
                    The company is classified under NIC Code {company.nicCode} for {company.companyIndustrialClassification}. 
                    Current company status is "{company.companyStatus}" with listing status as "{company.listingStatus}".
                  </p>
                  <p className="mt-2">
                    This information is sourced from official Ministry of Corporate Affairs (MCA) records and is updated regularly to ensure accuracy for business verification, compliance checks, and corporate research purposes.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Related Searches & Resources</h3>
                <div className="text-sm text-gray-600">
                  <p>
                    Find more companies: <span className="font-medium">{company.companyStateCode} companies</span>, 
                    <span className="font-medium"> {company.companyClass} companies</span>, 
                    <span className="font-medium"> {company.companyCategory} sector</span>, 
                    <span className="font-medium"> ROC {company.companyROCcode} registrations</span>
                  </p>
                  <p className="mt-1">
                    Business services: Company verification, corporate compliance, business registration assistance, 
                    virtual office solutions, and professional services for Indian businesses.
                  </p>
                </div>
              </div>

              {/* AI-Friendly FAQ Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Frequently Asked Questions about {company.companyName}</h3>
                <div className="space-y-4 text-sm">
                  <div itemScope itemType="https://schema.org/Question">
                    <h4 className="font-medium text-gray-800" itemProp="name">What is the CIN of {company.companyName}?</h4>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="text-gray-600 mt-1" itemProp="text">
                        The Corporate Identification Number (CIN) of {company.companyName} is {company.cin}. This unique identifier is assigned by the Ministry of Corporate Affairs (MCA) for all companies registered in India.
                      </p>
                    </div>
                  </div>

                  <div itemScope itemType="https://schema.org/Question">
                    <h4 className="font-medium text-gray-800" itemProp="name">When was {company.companyName} incorporated?</h4>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="text-gray-600 mt-1" itemProp="text">
                        {company.companyName} was incorporated on {new Date(company.registrationDate).toLocaleDateString('en-IN', { 
                          year: 'numeric', month: 'long', day: 'numeric' 
                        })} under the {company.companyROCcode} Registry of Companies.
                      </p>
                    </div>
                  </div>

                  <div itemScope itemType="https://schema.org/Question">
                    <h4 className="font-medium text-gray-800" itemProp="name">What is the authorized and paid-up capital of {company.companyName}?</h4>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="text-gray-600 mt-1" itemProp="text">
                        {company.companyName} has an authorized capital of ₹{company.authorizedCapital} and a paid-up capital of ₹{company.paidupCapital}. 
                        These figures represent the maximum capital the company is authorized to raise and the actual amount invested by shareholders respectively.
                      </p>
                    </div>
                  </div>

                  <div itemScope itemType="https://schema.org/Question">
                    <h4 className="font-medium text-gray-800" itemProp="name">What type of company is {company.companyName}?</h4>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="text-gray-600 mt-1" itemProp="text">
                        {company.companyName} is classified as a {company.companyClass} company under the {company.companyCategory} category, 
                        specifically in the {company.companySubCategory} sector. The company type is {company.companyType}.
                      </p>
                    </div>
                  </div>

                  <div itemScope itemType="https://schema.org/Question">
                    <h4 className="font-medium text-gray-800" itemProp="name">What is the current status of {company.companyName}?</h4>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="text-gray-600 mt-1" itemProp="text">
                        The current company status of {company.companyName} is "{company.companyStatus}" with a listing status of "{company.listingStatus}". 
                        This information is sourced from official MCA records and indicates the company's operational standing.
                      </p>
                    </div>
                  </div>

                  <div itemScope itemType="https://schema.org/Question">
                    <h4 className="font-medium text-gray-800" itemProp="name">Under which NIC code does {company.companyName} operate?</h4>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="text-gray-600 mt-1" itemProp="text">
                        {company.companyName} operates under NIC Code {company.nicCode}, which classifies it under "{company.companyIndustrialClassification}". 
                        This National Industrial Classification helps identify the primary business activity of the company.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keywords and Tags for AI Discovery */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Business Information Tags</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{company.companyName}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">CIN: {company.cin}</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">{company.companyStateCode}</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">{company.companyClass}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded">{company.companyCategory}</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded">ROC {company.companyROCcode}</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">NIC {company.nicCode}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">{company.companyStatus}</span>
                  <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded">Indian Company</span>
                  <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded">MCA Registered</span>
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded">Business Verification</span>
                  <span className="px-2 py-1 bg-lime-100 text-lime-800 rounded">Corporate Database</span>
                </div>
              </div>
            </section>
          </div>
        </footer>
        </main>
        
        <Footer location={currentLocation} />
      </div>
    </>
  );
}