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
  Ship, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Building, 
  Globe, 
  Zap, 
  TrendingUp, 
  Star,
  ArrowRight,
  Calculator,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  MessageCircle,
  Truck,
  Package
} from "lucide-react";
import heroImage from "@assets/image_1749296062229.png";

export default function VirtualOfficeForImportExportPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex Import-Export Documentation",
      solution: "Professional business address for DGFT, customs, and trade authority registrations"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "International Partner Credibility",
      solution: "Established business presence that builds trust with global suppliers and buyers"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Banking and Financial Institution Trust",
      solution: "Professional infrastructure for trade finance, LC processing, and international banking"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Multi-Country Trade Coordination",
      solution: "Centralized business operations for global trade and international partnerships"
    }
  ];

  const keyBenefits = [
    {
      icon: <Ship className="w-8 h-8 text-blue-600" />,
      title: "Import-Export Licensing",
      description: "Navigate international trade regulations with verified business address and compliance support",
      features: ["DGFT registration", "IEC code application", "Customs clearance", "Trade licenses"]
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "International Trade Operations",
      description: "Establish credible global trade operations with professional business infrastructure",
      features: ["Global supplier networks", "International buyer credibility", "Trade finance support", "Cross-border documentation"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Banking & Finance Support",
      description: "Build trust with banks and financial institutions for trade finance and international payments",
      features: ["Letter of credit processing", "Trade finance approvals", "FOREX documentation", "International payment systems"]
    },
    {
      icon: <Package className="w-8 h-8 text-orange-600" />,
      title: "Supply Chain Management",
      description: "Coordinate complex international supply chains with professional business coordination",
      features: ["Logistics coordination", "Inventory management", "Quality control", "Vendor relationship management"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Trade Business Registration",
      description: "Register import-export business with DGFT and obtain IEC code for international trade operations",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "International Compliance Setup",
      description: "Complete trade compliance requirements and establish banking relationships for international transactions",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Global Trade Operations",
      description: "Launch import-export operations with professional coordination and international partner management",
      icon: <Ship className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Scale International Business",
      description: "Expand to new markets and grow global trade portfolio with additional countries and products",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successStories = [
    {
      company: "Global Trade Solutions",
      founder: "Priya Sharma",
      specialization: "Electronics Import-Export",
      location: "Mumbai & Delhi",
      achievement: "Built ₹500Cr annual import-export business across 25 countries",
      timeline: "Within 48 months",
      testimonial: "Professional business setup in major ports helped us establish credibility with international suppliers and buyers. Global electronics trade requires extensive compliance and professional infrastructure for success with international partners.",
      metrics: ["₹500Cr annual trade", "25 countries", "200+ global partners"]
    },
    {
      company: "SpiceRoute Exports",
      founder: "Rajesh Gupta",
      specialization: "Agricultural Exports",
      location: "Chennai & Kochi",
      achievement: "Became top 10 spices exporter to 30+ countries",
      timeline: "Within 36 months",
      testimonial: "Having professional addresses near major ports enabled us to coordinate complex agricultural exports efficiently. International buyers trust exporters with proper business infrastructure and quality certifications.",
      metrics: ["Top 10 exporter", "30+ countries", "₹200Cr exports"]
    },
    {
      company: "Textile Trade Hub",
      founder: "Meera Patel",
      specialization: "Textile Import-Export",
      location: "Bangalore & Ahmedabad",
      achievement: "Established textile trading network across 15 countries",
      timeline: "Within 42 months",
      testimonial: "Professional business infrastructure was crucial for establishing credibility with international textile manufacturers and fashion brands. Complex textile trade requires extensive compliance and professional coordination.",
      metrics: ["15 country network", "₹300Cr portfolio", "50+ fashion brands"]
    }
  ];

  const faqs = [
    {
      question: "How does virtual office help with DGFT registration and IEC code application?",
      answer: "Our virtual office addresses are verified and accepted by DGFT, customs authorities, and trade regulatory bodies. We provide all necessary documentation for import-export business registration, IEC code applications, and international trade licensing."
    },
    {
      question: "Can I use the address for international trade documentation and customs clearance?",
      answer: "Yes, our virtual office addresses are accepted for all import-export documentation, customs clearance procedures, international shipping documents, and trade compliance requirements. Professional addresses are essential for international trade credibility."
    },
    {
      question: "How do you support international banking and trade finance operations?",
      answer: "Professional business addresses and meeting facilities help establish credibility with banks for trade finance, letter of credit processing, and international payment systems. Import-export businesses require extensive banking relationships and our infrastructure supports these requirements."
    },
    {
      question: "What support do you provide for international partner meetings and negotiations?",
      answer: "We provide premium meeting rooms equipped for international business meetings, video conferencing with global partners, and professional spaces for trade negotiations. International trade requires professional infrastructure for successful partnership building."
    },
    {
      question: "How does this help with supply chain coordination across multiple countries?",
      answer: "Professional business infrastructure enables effective coordination of complex international supply chains. We provide communication hubs for managing global vendor relationships, logistics coordination, and quality control across multiple time zones."
    },
    {
      question: "What compliance support do you provide for international trade regulations?",
      answer: "We help with trade compliance including customs documentation, international shipping requirements, trade license maintenance, quality certifications, and ongoing regulatory reporting for import-export operations across different countries."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="import-export"
        canonicalUrl="/usecase/virtual-office-for-import-export"
      />
      
      <Navbar />
      
      <main>
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Ship className="w-4 h-4 mr-1" />
                  For Import Export & Trading
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Import Export and Trading
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  DGFT registration, IEC code application, international trade compliance, and complete import-export business infrastructure. Build trust with global partners and financial institutions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Trading Business
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
                    <span>DGFT registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>IEC code support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Global trade support</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Import-export professionals using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-indigo-100 rounded-full opacity-60"></div>
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

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Common Import-Export Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on building global trade relationships while we handle the business infrastructure that establishes international credibility.
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

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Complete Import-Export Business Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch and scale international trading businesses - from single-product imports to multi-country export operations.
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

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How to Launch Your Import-Export Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to establish international trading infrastructure and start building global business relationships.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-blue-600">{step.step}</span>
                      </div>
                      <div className="flex justify-center mb-4">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Real Success Stories from Import-Export Companies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped trading companies build successful international businesses and global partnerships.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{story.company}</h3>
                        <Award className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Founded by {story.founder} • {story.specialization}
                      </div>
                      <div className="text-sm text-blue-600 mb-1">📍 {story.location}</div>
                      <div className="text-sm font-semibold text-green-600 mb-1">{story.achievement}</div>
                      <div className="text-sm text-orange-600">{story.timeline}</div>
                    </div>
                    <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                      "{story.testimonial}"
                    </blockquote>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Key Metrics:</h4>
                      {story.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about virtual office services for import-export and trading companies.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Import-Export Business?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join 900+ successful trading companies that chose our virtual office services. Get DGFT registration and start building global trade relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Trading Business Today
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
            <div className="text-sm text-blue-200">
              ✅ DGFT registration support  ✅ IEC code application  ✅ Global trade compliance
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}