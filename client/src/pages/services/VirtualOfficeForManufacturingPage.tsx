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
  Settings, 
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
  Factory
} from "lucide-react";
import heroImage from "@assets/image (1)_1749296156045.png";

export default function VirtualOfficeForManufacturingPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Industrial Licensing and Manufacturing Approvals",
      solution: "Professional business address for industrial licensing, pollution clearances, and manufacturing permits"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Multi-State Manufacturing Operations",
      solution: "Coordinated business presence for manufacturing units across different industrial zones"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Supplier and Buyer Credibility",
      solution: "Established business infrastructure that builds trust with raw material suppliers and product buyers"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Complex Quality and Export Certifications",
      solution: "Professional setup for ISO certifications, quality standards, and export documentation"
    }
  ];

  const keyBenefits = [
    {
      icon: <Factory className="w-8 h-8 text-gray-600" />,
      title: "Manufacturing Licensing & Approvals",
      description: "Navigate industrial regulations with verified business address and manufacturing compliance support",
      features: ["Industrial licenses", "Pollution clearances", "Factory registrations", "Manufacturing permits"]
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-600" />,
      title: "Quality Certifications",
      description: "Establish credible manufacturing operations with proper quality management and certifications",
      features: ["ISO certifications", "Quality standards", "Product certifications", "Export approvals"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Supply Chain Coordination",
      description: "Build trusted relationships with suppliers, distributors, and manufacturing partners",
      features: ["Supplier verification", "Distributor networks", "Vendor management", "Logistics coordination"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Export Manufacturing",
      description: "Support international manufacturing and export operations with proper documentation",
      features: ["Export documentation", "International standards", "Global certifications", "Trade compliance"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Manufacturing Business Setup",
      description: "Register manufacturing company with industrial authorities and obtain necessary licenses",
      icon: <Building className="w-6 h-6 text-gray-600" />
    },
    {
      step: "2", 
      title: "Industrial Licensing & Permits",
      description: "Secure manufacturing licenses, environmental clearances, and industrial permits",
      icon: <FileText className="w-6 h-6 text-gray-600" />
    },
    {
      step: "3",
      title: "Manufacturing Operations",
      description: "Launch manufacturing operations with professional supply chain and quality management",
      icon: <Settings className="w-6 h-6 text-gray-600" />
    },
    {
      step: "4",
      title: "Scale Manufacturing Portfolio",
      description: "Expand manufacturing capacity and enter new markets with additional certifications",
      icon: <TrendingUp className="w-6 h-6 text-gray-600" />
    }
  ];

  const successStories = [
    {
      company: "Precision Parts Manufacturing",
      founder: "Rajesh Kumar",
      specialization: "Automotive Components",
      location: "Chennai & Pune",
      achievement: "Built ₹800Cr automotive parts manufacturing business",
      timeline: "Within 72 months",
      testimonial: "Professional business setup in automotive hubs helped us establish credibility with major car manufacturers. Automotive parts manufacturing requires extensive quality certifications and our professional infrastructure enabled partnerships with global OEMs.",
      metrics: ["₹800Cr annual revenue", "15 global OEMs", "ISO/TS 16949 certified"]
    },
    {
      company: "GreenTech Electronics",
      founder: "Priya Sharma",
      specialization: "Electronic Components",
      location: "Bangalore & Hyderabad",
      achievement: "Became top 5 electronic components manufacturer with international exports",
      timeline: "Within 60 months",
      testimonial: "Having professional addresses in electronics manufacturing clusters enabled us to coordinate complex supply chains and build trust with global electronics brands. Manufacturing business requires extensive compliance and professional setup.",
      metrics: ["Top 5 manufacturer", "₹500Cr exports", "20 countries served"]
    },
    {
      company: "Pharma Manufacturing Solutions",
      founder: "Dr. Anil Patel",
      specialization: "Pharmaceutical Manufacturing",
      location: "Hyderabad & Ahmedabad",
      achievement: "Built WHO-GMP certified pharmaceutical manufacturing facility",
      timeline: "Within 84 months",
      testimonial: "Professional business infrastructure was essential for securing pharmaceutical manufacturing licenses and establishing credibility with global pharma companies. Drug manufacturing requires extensive regulatory compliance and professional setup.",
      metrics: ["WHO-GMP certified", "₹600Cr facility", "25 drug approvals"]
    }
  ];

  const faqs = [
    {
      question: "How does virtual office help with industrial licensing and manufacturing permits?",
      answer: "Our virtual office addresses are verified and accepted by industrial authorities, pollution control boards, and manufacturing regulatory bodies. We provide all necessary documentation for industrial licenses, factory registrations, and manufacturing permits."
    },
    {
      question: "Can I use the address for ISO certifications and quality management systems?",
      answer: "Yes, our virtual office addresses are accepted for ISO certification applications, quality management system documentation, and all manufacturing compliance requirements. Professional addresses are essential for quality certification credibility."
    },
    {
      question: "How do you support multi-state manufacturing operations and industrial zones?",
      answer: "We provide virtual office services across 15+ major cities including industrial hubs and manufacturing zones. You can coordinate manufacturing operations across multiple states while maintaining consistent business presence and regulatory compliance."
    },
    {
      question: "What support do you provide for export manufacturing and international compliance?",
      answer: "We help with export documentation, international quality standards compliance, global certification support, and professional infrastructure for building relationships with international buyers and manufacturing partners."
    },
    {
      question: "How does this help with manufacturing supply chain and vendor management?",
      answer: "Professional business addresses and meeting facilities help establish credibility with raw material suppliers, component vendors, and manufacturing partners. Manufacturing requires extensive supply chain coordination and professional infrastructure builds trust."
    },
    {
      question: "What compliance support do you provide for manufacturing businesses?",
      answer: "We help with regulatory compliance including industrial licensing, environmental clearances, quality certifications, safety compliance, labor law compliance, and ongoing regulatory reporting for manufacturing operations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="manufacturing"
        canonicalUrl="/usecase/virtual-office-for-manufacturing"
      />
      
      <Navbar />
      
      <main>
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-slate-100 text-slate-800 hover:bg-slate-200">
                  <Factory className="w-4 h-4 mr-1" />
                  For Manufacturing
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Manufacturing
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Industrial licensing, factory registration, quality certifications, and complete manufacturing business infrastructure. Build credibility with suppliers, buyers, and regulatory authorities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Manufacturing Company
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
                    <span>Industrial licensing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Quality certifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Supply chain support</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Manufacturing professionals using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-slate-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gray-100 rounded-full opacity-60"></div>
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
                Common Manufacturing Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on building quality products while we handle the business infrastructure that establishes manufacturing credibility and regulatory compliance.
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
                Complete Manufacturing Business Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch and scale manufacturing businesses - from small-scale production to large industrial operations and export manufacturing.
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
                How to Launch Your Manufacturing Company
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to establish manufacturing business infrastructure and start production operations with proper compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-gray-600">{step.step}</span>
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
                Real Success Stories from Manufacturing Companies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped manufacturing companies build successful production operations and global partnerships.
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
                      <div className="text-sm text-gray-600 mb-1">📍 {story.location}</div>
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
                Get answers to common questions about virtual office services for manufacturing companies.
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

        <section className="py-20 bg-gradient-to-r from-gray-600 to-slate-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Manufacturing Company?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Join 1500+ successful manufacturing companies that chose our virtual office services. Get industrial licensing and start building quality products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-gray-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Manufacturing Company Today
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
            <div className="text-sm text-gray-200">
              ✅ Industrial licensing support  ✅ Quality certifications  ✅ Supply chain coordination
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}