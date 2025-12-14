import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  MapPin, 
  Clock, 
  DollarSign, 
  FileText, 
  Target, 
  AlertCircle, 
  Settings, 
  Award, 
  Scale, 
  Shield, 
  FileCheck,
  Phone,
  Mail,
  Globe,
  Star
} from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedZohoForm from "@/components/GetStartedZohoForm";
import { Helmet } from "react-helmet-async";
import type { Service } from "@shared/schema";
import { useEffect, useState } from "react";

export default function EnhancedServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState('overview');
  const [isGSTDialogOpen, setIsGSTDialogOpen] = useState(false);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: ['/api/services/slug', slug],
    queryFn: async () => {
      const response = await fetch(`/api/services/slug/${slug}`);
      if (!response.ok) {
        throw new Error('Service not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'process', 'documents', 'benefits', 'compliance'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600">The service you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  const handleGetQuote = () => {
    console.log('Get quote for service:', service.id);
    setIsConsultationDialogOpen(true);
  };

  // Helper function to render comparison table
  const renderComparisonTable = (comparisonData: any) => {
    if (!comparisonData || !Array.isArray(comparisonData)) return null;
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {comparisonData.length > 0 && Object.keys(comparisonData[0]).map((header) => (
                <th key={header} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                {Object.values(row).map((cell: any, cellIndex: number) => (
                  <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };



  return (
    <>
      <Navbar />
      <SEO
        title={service.metaTitle || `${service.name} - Complete Guide & Professional Service | SimplySetup`}
        description={service.metaDescription || `${service.description} Professional ${service.name} service with expert guidance, 100% compliance, and fast processing. Get started today with India's leading business setup platform.`}
        pageType="service"
        service={service.name}
      />
      
      {/* Enhanced Structured Data for AI SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.name,
            "description": service.description,
            "provider": {
              "@type": "Organization",
              "name": "SimplySetup",
              "url": "https://simplysetup.com"
            },
            "category": service.category,
            "offers": {
              "@type": "Offer",
              "price": service.price,
              "priceCurrency": service.currency,
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
        
        {/* AI-Optimized Meta Tags */}
        <meta name="keywords" content={`${service.name}, ${service.category}, business registration, ${service.country === 'IN' ? 'India' : 'Singapore'}, compliance, professional service, expert assistance, government registration, business setup, legal documentation, ${service.currency} ${service.price}, ${service.processingTime}, SimplySetup`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="ai-content-type" content="business-service-guide" />
        <meta name="ai-service-name" content={service.name} />
        <meta name="ai-service-price" content={`${service.currency} ${service.price}`} />
        <meta name="ai-processing-time" content={service.processingTime} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white" role="banner">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {service.category}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white">
                  <MapPin className="h-3 w-3 mr-1" />
                  {service.country}
                </Badge>
                {service.isPopular && (
                  <Badge className="bg-yellow-500 text-black">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.name}</h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {service.currency} {service.price}
                  </div>
                  <p className="text-blue-100 text-sm">Starting from</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-blue-400"></div>
                <div className="text-center">
                  <div className="flex items-center text-white">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{service.processingTime}</span>
                  </div>
                  <p className="text-blue-100 text-sm">Processing time</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
                    >
                      Get Free Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Get Free Consultation</DialogTitle>
                    </DialogHeader>
                    <GetStartedZohoForm />
                  </DialogContent>
                </Dialog>
                <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Expert
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Call Expert</DialogTitle>
                    </DialogHeader>
                    <GetStartedZohoForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </header>

        {/* Trust Indicators */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">7-10 Day Turnaround</span>
              </div>
              <div className="flex items-center text-green-600">
                <Shield className="h-5 w-5 mr-2" />
                <span className="font-medium">100% Compliance</span>
              </div>
              <div className="flex items-center text-green-600">
                <FileCheck className="h-5 w-5 mr-2" />
                <span className="font-medium">Expert Support</span>
              </div>
              <div className="flex items-center text-green-600">
                <Award className="h-5 w-5 mr-2" />
                <span className="font-medium">20,000+ Happy Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12" role="main">
          <div className="max-w-6xl mx-auto">
            {/* AI-Optimized Service Introduction */}
            <section className="mb-12 text-center" itemScope itemType="https://schema.org/Service">
              <h2 className="text-3xl font-bold text-gray-900 mb-4" itemProp="name">
                Complete {service.name} Guide & Professional Service
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto" itemProp="description">
                {service.description} Our expert team provides end-to-end {service.name} services 
                with guaranteed 100% compliance, transparent pricing starting from {service.currency} {service.price}, 
                and professional support throughout the {service.processingTime} process.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  ✓ {service.currency} {service.price} All-Inclusive Price
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  ✓ {service.processingTime} Processing Time
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                  ✓ 100% Government Compliance
                </span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                  ✓ Expert Assistance Included
                </span>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sticky Navigation */}
              <aside className="lg:col-span-1">
                <div className="sticky top-8">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Navigation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <nav className="space-y-1">
                        {[
                          { id: 'overview', label: 'Overview', icon: FileText },
                          { id: 'process', label: 'Process', icon: Settings },
                          { id: 'documents', label: 'Documents', icon: FileCheck },
                          { id: 'benefits', label: 'Benefits', icon: Award },
                          { id: 'compliance', label: 'Compliance', icon: Shield }
                        ].map(({ id, label, icon: Icon }) => (
                          <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-blue-50 ${
                              activeSection === id
                                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600'
                            }`}
                          >
                            <Icon className="h-4 w-4 mr-3" />
                            {label}
                          </button>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>

                  {/* Quick Action Card */}
                  <Card className="mt-6 shadow-lg">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          {service.currency} {service.price}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">All-inclusive pricing</p>
                        <Dialog open={isGSTDialogOpen} onOpenChange={setIsGSTDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                              Get Started Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader className="sr-only">
                              <DialogTitle>Get Started Now</DialogTitle>
                            </DialogHeader>
                            <GetStartedZohoForm />
                          </DialogContent>
                        </Dialog>
                        <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Expert
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader className="sr-only">
                              <DialogTitle>Call Expert</DialogTitle>
                            </DialogHeader>
                            <GetStartedZohoForm />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </aside>

              {/* Main Content Area */}
              <article className="lg:col-span-2 space-y-12">
                
                {/* Overview Section */}
                <section id="overview" className="space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <FileText className="h-6 w-6 text-blue-600" />
                        Complete {service.name} Service Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {service.overviewContent || service.description}
                        </p>
                        
                        {service.overviewHighlights && service.overviewHighlights.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.overviewHighlights.map((highlight, index) => (
                              <div key={index} className="flex items-start bg-green-50 p-4 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-800 font-medium">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Service Types */}
                        {service.serviceTypes && service.serviceTypes.length > 0 && (
                          <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <Target className="h-5 w-5 text-blue-600 mr-2" />
                              Service Types Available
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {service.serviceTypes.map((type, index) => (
                                <div key={index} className="border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-blue-50">
                                  <h4 className="font-semibold text-gray-900">{type}</h4>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Eligibility Criteria */}
                        {service.eligibilityCriteria && service.eligibilityCriteria.length > 0 && (
                          <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                              Eligibility Requirements
                            </h3>
                            <div className="bg-orange-50 rounded-lg p-6">
                              <ul className="space-y-3">
                                {service.eligibilityCriteria.map((criteria, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{criteria}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Process Section */}
                <section id="process" className="space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Settings className="h-6 w-6 text-blue-600" />
                        Step-by-Step Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {service.processContent && (
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {service.processContent}
                          </p>
                        )}
                        
                        {service.processSteps && service.processSteps.length > 0 && (
                          <div className="space-y-4">
                            {service.processSteps.map((step, index) => (
                              <div key={index} className="flex items-start bg-blue-50 rounded-lg p-6">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="text-gray-800 font-medium text-lg">{step}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Documents Section */}
                <section id="documents" className="space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <FileCheck className="h-6 w-6 text-blue-600" />
                        Required Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {service.documentsContent && (
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {service.documentsContent}
                          </p>
                        )}
                        
                        {service.requiredDocuments && service.requiredDocuments.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.requiredDocuments.map((document, index) => (
                              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                <FileText className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                                <span className="text-gray-800 font-medium">{document}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Award className="h-6 w-6 text-blue-600" />
                        Key Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {service.benefitsContent && (
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {service.benefitsContent}
                          </p>
                        )}
                        
                        {service.benefits && service.benefits.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {service.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-start bg-green-50 p-6 rounded-lg border border-green-200">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-gray-800 font-medium text-lg">{benefit}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Compliance Section */}
                <section id="compliance" className="space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Shield className="h-6 w-6 text-blue-600" />
                        Compliance & Legal Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {service.complianceContent && (
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {service.complianceContent}
                          </p>
                        )}
                        
                        {service.complianceRequirements && service.complianceRequirements.length > 0 && (
                          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                              Compliance Checklist
                            </h3>
                            <ul className="space-y-3">
                              {service.complianceRequirements.map((requirement, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Comparison Table */}
                        {service.comparisonTable && (
                          <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <Scale className="h-5 w-5 text-blue-600 mr-2" />
                              Comparison Overview
                            </h3>
                            {renderComparisonTable(service.comparisonTable)}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </article>
            </div>
          </div>
        </main>
      </div>
      <Footer location={null} />
    </>
  );
}
