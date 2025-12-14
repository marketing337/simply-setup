import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  FileText,
  Download,
  CheckCircle,
  ArrowRight,
  Users,
  Building2,
  Scale,
  Clock,
  Shield,
  Star,
  Briefcase,
  UserCheck,
  FileCheck,
  Search,
  Zap
} from "lucide-react";

export default function DocuKitPage() {
  const scrollToDocuments = () => {
    const element = document.getElementById('complete-document-collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const documentCategories = [
    {
      icon: Building2,
      title: "Company Formation",
      slug: "operations",
      count: "15+ Templates",
      description: "Articles of Incorporation, Bylaws, Shareholder Agreements, Board Resolutions",
      documents: ["Articles of Incorporation", "Company Bylaws", "Shareholder Agreement", "Board Resolution Templates", "Director Appointment Letters"]
    },
    {
      icon: Users,
      title: "HR & Employment",
      slug: "hr",
      count: "25+ Templates",
      description: "Offer Letters, Employment Contracts, NDAs, Performance Reviews",
      documents: ["Offer Letter Templates", "Employment Contracts", "Non-Disclosure Agreements", "Performance Review Forms", "Employee Handbook Template"]
    },
    {
      icon: Scale,
      title: "Legal & Compliance",
      slug: "legal",
      count: "20+ Templates",
      description: "Terms of Service, Privacy Policy, Vendor Agreements, Compliance Checklists",
      documents: ["Terms of Service", "Privacy Policy", "Vendor Agreements", "Service Level Agreements", "Compliance Checklists"]
    },
    {
      icon: Briefcase,
      title: "Business Operations",
      slug: "operations",
      count: "18+ Templates",
      description: "Business Plans, Financial Projections, Invoice Templates, SOPs",
      documents: ["Business Plan Template", "Financial Projection Models", "Invoice Templates", "Standard Operating Procedures", "Client Onboarding Checklist"]
    },
    {
      icon: UserCheck,
      title: "Sales & Marketing",
      slug: "marketing",
      count: "12+ Templates",
      description: "Sales Proposals, Marketing Plans, Client Contracts, Lead Generation",
      documents: ["Sales Proposal Templates", "Marketing Plan Framework", "Client Service Agreements", "Lead Generation Toolkit", "Customer Survey Templates"]
    },
    {
      icon: FileCheck,
      title: "Financial Management",
      slug: "finance",
      count: "10+ Templates",
      description: "Budget Templates, Cash Flow Models, Tax Preparation, Expense Reports",
      documents: ["Budget Planning Templates", "Cash Flow Models", "Expense Report Forms", "Tax Preparation Checklists", "Financial Dashboard Templates"]
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Pre-drafted professional templates ready to use immediately"
    },
    {
      icon: Shield,
      title: "Legal Compliance",
      description: "Documents reviewed by legal experts for Indian business requirements"
    },
    {
      icon: Star,
      title: "Professional Quality",
      description: "Industry-standard formats used by successful startups"
    },
    {
      icon: Zap,
      title: "Easy Customization",
      description: "Simple to edit and adapt for your specific business needs"
    }
  ];

  const features = [
    "100+ professionally crafted templates",
    "Covers all aspects of startup operations",
    "Indian legal compliance included",
    "Editable Word and PDF formats",
    "Regular updates with new templates",
    "Free lifetime access"
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      company: "TechFlow Solutions",
      text: "DocuKit saved us weeks of work. The legal templates are comprehensive and professionally written.",
      rating: 5
    },
    {
      name: "Priya Patel",
      company: "EcoGreen Startup",
      text: "Amazing collection of documents. Everything we needed to get our startup legally compliant was included.",
      rating: 5
    },
    {
      name: "Amit Kumar",
      company: "FinTech Innovations",
      text: "The HR templates alone are worth it. Our entire employee onboarding process is now streamlined.",
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>DocuKit by SimplySetup | 100+ Free Startup Templates & Documents</title>
        <meta name="description" content="Get 100+ professional business templates and legal documents for free. Includes offer letters, agreements, compliance forms, and startup essentials - all tailored for Indian businesses." />
        <meta name="keywords" content="startup templates, business documents, offer letter template, employment agreement, legal documents, startup toolkit, business forms, Indian startup documents" />
        <meta property="og:title" content="DocuKit by SimplySetup | 100+ Free Startup Templates" />
        <meta property="og:description" content="Professional business templates and legal documents for startups. Free access to 100+ essential documents including offer letters, agreements, and compliance forms." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DocuKit by SimplySetup | 100+ Free Startup Templates" />
        <meta name="twitter:description" content="Get professional business templates and legal documents for free. Essential startup toolkit with 100+ documents." />
        <link rel="canonical" href="https://simplysetup.co/docukit" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "DocuKit by SimplySetup",
            "description": "Free collection of 100+ professional business templates and legal documents for startups",
            "url": "https://simplysetup.co/docukit",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "DocuKit",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
              },
              "featureList": [
                "100+ Business Templates",
                "Legal Document Templates",
                "HR Document Templates", 
                "Financial Planning Templates",
                "Compliance Checklists"
              ]
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                <FileText className="h-4 w-4 mr-2" />
                Free for All Startups
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-emerald-600">DocuKit</span> by SimplySetup
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Access 100+ professionally crafted business templates and legal documents 
                absolutely free. Everything your startup needs from day one - offer letters, 
                agreements, compliance forms, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700"
                  onClick={scrollToDocuments}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Get Free Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No signup required • Instant download • 100% Free
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Startups Love DocuKit
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional documents that would cost thousands to create from scratch, 
                now available for free.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-emerald-100 rounded-lg">
                          <Icon className="h-6 w-6 text-emerald-600" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Document Categories Section */}
        <section id="complete-document-collection" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Complete Document Collection
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive templates covering every aspect of your startup journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {documentCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-100 rounded-lg">
                          <Icon className="h-6 w-6 text-emerald-600" />
                        </div>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.documents.map((doc, docIndex) => (
                          <Link key={docIndex} href={`/docukit/${category.slug}`} className="block">
                            <div className="flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                              <span className="hover:underline">{doc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link href={`/docukit/${category.slug}`}>
                        <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
                          View Templates
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Everything Your Startup Needs
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  From incorporation documents to employee contracts, we've compiled 
                  the most essential templates used by successful startups across India.
                </p>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700">
                  <Download className="mr-2 h-5 w-5" />
                  Download All Templates
                </Button>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Most Popular Templates</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium">Offer Letter Template</span>
                    <Badge className="bg-emerald-100 text-emerald-800">⭐ Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium">Employment Agreement</span>
                    <Badge className="bg-emerald-100 text-emerald-800">⭐ Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium">Non-Disclosure Agreement</span>
                    <Badge className="bg-emerald-100 text-emerald-800">⭐ Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium">Business Plan Template</span>
                    <Badge className="bg-emerald-100 text-emerald-800">⭐ Popular</Badge>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View All Popular Templates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by 10,000+ Startups
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what founders are saying about DocuKit
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-gray-700 italic">
                      "{testimonial.text}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Building Your Startup Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of entrepreneurs who've accelerated their startup journey with DocuKit. 
              Get instant access to all 100+ templates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8 py-3">
                <Download className="mr-2 h-5 w-5" />
                Download DocuKit Free
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-white border-white hover:bg-white hover:text-emerald-600">
                <FileText className="mr-2 h-5 w-5" />
                Browse All Templates
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              100% Free • No Registration Required • Instant Access
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Are these templates really free?
                </h3>
                <p className="text-gray-600">
                  Yes, absolutely! All 100+ templates in DocuKit are completely free with no hidden costs, 
                  registration requirements, or subscription fees.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Are the documents legally compliant for Indian businesses?
                </h3>
                <p className="text-gray-600">
                  All our templates are crafted specifically for Indian businesses and reviewed by legal experts 
                  to ensure compliance with Indian laws and regulations.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Can I customize these templates for my business?
                </h3>
                <p className="text-gray-600">
                  Absolutely! All templates are provided in editable formats (Word, PDF) and are designed 
                  to be easily customized for your specific business needs.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Do you add new templates regularly?
                </h3>
                <p className="text-gray-600">
                  Yes, we continuously update DocuKit with new templates based on startup needs and 
                  regulatory changes. Once you download, you'll have access to all future updates.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}