import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import SalesPersonCards from "@/components/SalesPersonCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CheckCircle, 
  Search, 
  Shield, 
  MapPin, 
  Building, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  Star,
  Phone,
  Mail,
  Camera,
  Users
} from "lucide-react";

export default function VirtualOfficeForGoogleMyBusinessRegistrationPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "No Physical Business Address",
      solution: "Professional business address for Google My Business verification and local SEO ranking"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Address Verification Delays",
      solution: "Pre-verified business addresses with instant postcard delivery and verification support"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Low Local Search Visibility",
      solution: "Prime business district addresses for better local search rankings and customer trust"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      problem: "Limited Business Credibility",
      solution: "Professional reception and phone answering services for enhanced business credibility"
    }
  ];

  const keyBenefits = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Enhanced Local Search Visibility",
      description: "Boost your local SEO rankings with prime business addresses in commercial districts",
      features: ["Premium location addresses", "Local search optimization", "Google Maps visibility", "Improved search rankings"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Complete GMB Setup & Verification", 
      description: "End-to-end Google My Business profile creation, verification, and optimization services",
      features: ["Profile creation", "Address verification", "Postcard handling", "Account optimization"]
    },
    {
      icon: <Building className="w-8 h-8 text-purple-600" />,
      title: "Professional Business Presence",
      description: "Establish credible online presence with verified business address and professional services",
      features: ["Verified business address", "Professional phone number", "Mail handling", "Customer reception"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Customer Engagement Support",
      description: "Manage customer interactions and reviews with professional business infrastructure",
      features: ["Review management", "Customer queries handling", "Business hour management", "Photo and content updates"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Profile Creation",
      description: "Create comprehensive Google My Business profile with accurate business information and category selection",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Address Verification Setup",
      description: "Submit professional business address for Google verification and arrange postcard delivery handling",
      icon: <MapPin className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Verification & Activation",
      description: "Handle Google verification postcard, complete verification process, and activate your GMB listing",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Profile Optimization",
      description: "Optimize listing with photos, business hours, services, and ongoing management for maximum visibility",
      icon: <Star className="w-6 h-6 text-blue-600" />
    }
  ];

  const gmbFeatures = [
    {
      category: "Local SEO Benefits",
      features: [
        "Improved local search rankings",
        "Google Maps visibility",
        "Knowledge panel appearance",
        "Local pack inclusion",
        "Voice search optimization"
      ]
    },
    {
      category: "Customer Engagement",
      features: [
        "Customer reviews management",
        "Q&A section handling",
        "Business messaging",
        "Photo and video uploads",
        "Posts and announcements"
      ]
    },
    {
      category: "Business Information",
      features: [
        "Accurate business hours",
        "Contact information display",
        "Service categories",
        "Website integration",
        "Booking and appointment links"
      ]
    },
    {
      category: "Analytics & Insights",
      features: [
        "Search performance tracking",
        "Customer action insights",
        "Photo view statistics",
        "Direction requests data",
        "Call and website click tracking"
      ]
    }
  ];

  const businessTypes = [
    {
      type: "Service-Based Businesses",
      examples: ["Consultancies", "Legal services", "Accounting firms", "Digital agencies", "Coaching services"],
      benefits: ["Local client discovery", "Service area coverage", "Professional credibility", "Online appointment booking"]
    },
    {
      type: "E-commerce & Online Retailers",
      examples: ["Online stores", "Drop-shippers", "Digital product sellers", "Marketplace vendors", "Subscription services"],
      benefits: ["Local market penetration", "Pickup location display", "Customer trust building", "Return address visibility"]
    },
    {
      type: "Professional Practices",
      examples: ["Medical clinics", "Dental practices", "Therapy centers", "Fitness studios", "Beauty salons"],
      benefits: ["Patient/client discovery", "Appointment bookings", "Reviews and ratings", "Emergency contact information"]
    }
  ];

  const faqs = [
    {
      question: "Can I use virtual office address for Google My Business verification?",
      answer: "Yes, Google accepts virtual office addresses for GMB verification, especially for service-based businesses. Our prime business addresses are verified and come with postcard handling services for smooth verification process."
    },
    {
      question: "How long does Google My Business verification take?",
      answer: "Verification typically takes 1-2 weeks. Google sends a verification postcard to your business address, which we receive and process immediately. Some businesses may qualify for instant verification or phone verification."
    },
    {
      question: "What information do I need to provide for GMB setup?",
      answer: "Required information includes business name, category, phone number, website, business hours, and accurate description. We help optimize all fields for maximum local search visibility and customer engagement."
    },
    {
      question: "How does virtual office address affect local SEO rankings?",
      answer: "Virtual offices in prime business districts can improve local SEO rankings by providing credible business addresses in commercial areas. This enhances trust signals and local search relevance for your target market."
    },
    {
      question: "Do you provide ongoing GMB management and optimization?",
      answer: "Yes, we offer ongoing GMB management including profile updates, photo uploads, review monitoring, Q&A management, posts creation, and performance tracking to maintain optimal local search visibility."
    },
    {
      question: "Can I change my GMB address later if I get a physical office?",
      answer: "Yes, you can update your GMB address anytime. However, it may require re-verification and could temporarily affect your local rankings. We provide guidance on smooth address transitions to minimize impact."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="purpose"
        service="google-my-business-registration"
        canonicalUrl="/purpose/virtual-office-for-google-my-business-registration"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-red-100 text-red-800 hover:bg-red-200">
                  <Search className="w-4 h-4 mr-1" />
                  Google My Business
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Google My Business Registration
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Setup and verify your Google My Business listing with professional business address. Complete GMB optimization, local SEO enhancement, and ongoing profile management for maximum visibility.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Setup GMB Listing
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader className="sr-only">

                        <DialogTitle>Contact Form</DialogTitle>

                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>1-2 week verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Prime location address</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Local SEO optimization</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-red-100 to-orange-100 p-12">
                    <Search className="w-48 h-48 text-red-600 mx-auto" />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-red-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-100 rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Person Card */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentLocation && (
              <SalesPersonCards locationId={currentLocation.id} />
            )}
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                GMB Registration Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Overcome common Google My Business setup hurdles with professional address verification and local SEO optimization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <Card key={index} className="p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{point.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-600 mb-2">{point.problem}</h3>
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <p className="font-medium">{point.solution}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Complete GMB Setup & Optimization Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for professional Google My Business presence and enhanced local search visibility.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-6">{benefit.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                    <div className="space-y-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* GMB Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Google My Business Features & Benefits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Unlock powerful features to enhance your online presence and connect with local customers effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gmbFeatures.map((category, index) => (
                <Card key={index} className="p-6 border-t-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg font-bold text-gray-900">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-2">
                      {category.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Business Types Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Businesses That Benefit from GMB
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Google My Business is essential for all types of businesses looking to improve local search visibility and customer engagement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {businessTypes.map((business, index) => (
                <Card key={index} className="p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{business.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
                    <div className="space-y-1 mb-4">
                      {business.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="text-sm text-gray-700">• {example}</div>
                      ))}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                    <div className="space-y-2">
                      {business.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How GMB Setup Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your Google My Business listing verified and optimized within 1-2 weeks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="bg-red-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about Google My Business setup and verification process.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Boost Your Local Search Visibility?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Get your Google My Business listing verified and optimized with professional business address. Start attracting local customers today.
            </p>
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Setup GMB Listing Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader className="sr-only">

                  <DialogTitle>Contact Form</DialogTitle>

                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}