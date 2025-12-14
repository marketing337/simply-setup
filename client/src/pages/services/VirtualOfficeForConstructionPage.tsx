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
  HardHat, 
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
  Wrench
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForConstructionPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Complex Government Approvals and Licenses",
      solution: "Professional business address for PWD, municipal, and construction authority registrations"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Multi-Site Project Coordination",
      solution: "Centralized business operations for construction projects across multiple locations"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Client and Contractor Credibility",
      solution: "Established business address that builds trust with property developers and government contracts"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Project-Based Business Operations",
      solution: "Flexible business infrastructure that adapts to long-term construction project cycles"
    }
  ];

  const keyBenefits = [
    {
      icon: <HardHat className="w-8 h-8 text-orange-600" />,
      title: "Construction Licensing & Approvals",
      description: "Navigate construction industry regulations with verified business address and compliance support",
      features: ["PWD registration", "Municipal licenses", "Environmental clearances", "Safety certifications"]
    },
    {
      icon: <Building className="w-8 h-8 text-gray-600" />,
      title: "Infrastructure Project Management",
      description: "Coordinate large-scale infrastructure and construction projects with professional business setup",
      features: ["Project documentation", "Contractor coordination", "Government liaison", "Progress monitoring"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Government Contract Credibility",
      description: "Build credibility for government tenders and large infrastructure contracts",
      features: ["Tender documentation", "Financial compliance", "Performance guarantees", "Contract management"]
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Multi-State Operations",
      description: "Manage construction projects across multiple states with unified business infrastructure",
      features: ["Interstate coordination", "Local compliance", "Vendor management", "Project logistics"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Construction Business Setup",
      description: "Register construction company with PWD and obtain necessary industry licenses and certifications",
      icon: <Building className="w-6 h-6 text-orange-600" />
    },
    {
      step: "2", 
      title: "Project Licensing & Approvals",
      description: "Secure construction permits, environmental clearances, and project-specific approvals",
      icon: <FileText className="w-6 h-6 text-orange-600" />
    },
    {
      step: "3",
      title: "Project Execution",
      description: "Execute construction projects with professional coordination and regulatory compliance",
      icon: <HardHat className="w-6 h-6 text-orange-600" />
    },
    {
      step: "4",
      title: "Scale Construction Portfolio",
      description: "Expand to larger projects and new markets with additional licenses and certifications",
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const successStories = [
    {
      company: "Metro Infrastructure Ltd",
      founder: "Rajesh Kumar",
      specialization: "Urban Infrastructure Projects",
      location: "Delhi & Mumbai",
      achievement: "Completed ₹1,500Cr metro and highway projects",
      timeline: "Within 60 months",
      testimonial: "Professional business setup helped us secure major government infrastructure contracts. PWD registration and established business presence were crucial for winning metro construction and highway development tenders worth thousands of crores.",
      metrics: ["₹1,500Cr projects", "50km metro lines", "15 government contracts"]
    },
    {
      company: "GreenBuild Constructions",
      founder: "Meera Patel",
      specialization: "Sustainable Construction",
      location: "Pune & Hyderabad",
      achievement: "Built 100+ green buildings with LEED certification",
      timeline: "Within 48 months",
      testimonial: "Having professional addresses in construction hubs enabled us to establish credibility with eco-conscious developers. Sustainable construction requires extensive certifications and professional infrastructure to build trust with green building clients.",
      metrics: ["100+ green buildings", "LEED Gold certified", "₹800Cr portfolio"]
    },
    {
      company: "Skyline Developers",
      founder: "Amit Sharma",
      specialization: "High-Rise Construction",
      location: "Bangalore & Chennai",
      achievement: "Constructed 25 high-rise residential complexes",
      timeline: "Within 72 months",
      testimonial: "Professional business infrastructure was essential for securing high-rise construction permits and establishing credibility with real estate developers. Complex construction projects require extensive regulatory compliance and professional setup.",
      metrics: ["25 high-rise projects", "₹2,000Cr value", "10,000+ apartments"]
    }
  ];

  const faqs = [
    {
      question: "How does virtual office help with PWD registration and construction licenses?",
      answer: "Our virtual office addresses are verified and accepted by PWD, municipal corporations, and construction regulatory authorities. We provide all necessary documentation for construction business registration, contractor licenses, and project-specific permits."
    },
    {
      question: "Can I use the address for government tender applications and construction contracts?",
      answer: "Yes, our virtual office addresses are accepted for government tender documentation, construction contract applications, infrastructure project bids, and all construction industry regulatory requirements. Professional addresses enhance credibility for large contracts."
    },
    {
      question: "How do you support multi-site construction project coordination?",
      answer: "We provide virtual office services across 15+ major cities including construction hubs. You can coordinate construction projects across multiple locations while maintaining consistent business presence and regulatory compliance in each state."
    },
    {
      question: "What support do you provide for environmental clearances and construction permits?",
      answer: "We help with documentation for environmental impact assessments, construction permits, safety clearances, and all regulatory approvals required for construction and infrastructure projects. Professional business setup is crucial for regulatory compliance."
    },
    {
      question: "How does this help with construction industry partnerships and vendor management?",
      answer: "Professional business addresses and meeting facilities help establish credibility with material suppliers, equipment vendors, and subcontractors. Construction industry requires extensive vendor coordination and professional infrastructure builds trust with partners."
    },
    {
      question: "What compliance support do you provide for construction businesses?",
      answer: "We help with regulatory compliance including labor compliance, safety regulations, environmental clearances, project documentation, and ongoing reporting requirements for construction and infrastructure development projects."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="construction"
        canonicalUrl="/usecase/virtual-office-for-construction"
      />
      
      <Navbar />
      
      <main>
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
                  <HardHat className="w-4 h-4 mr-1" />
                  For Construction & Infrastructure
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Construction and Infrastructure
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  PWD registration, construction licensing, government approvals, and complete infrastructure business setup. Win major construction contracts and government tenders.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Construction Company
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
                    <span>PWD registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Government contracts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-site coordination</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Construction professionals using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-100 rounded-full opacity-60"></div>
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
                Common Construction Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on building infrastructure and developing projects while we handle the business setup that wins government contracts.
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
                Complete Construction Business Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch and scale construction businesses - from residential projects to major infrastructure development.
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
                How to Launch Your Construction Company
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to establish construction business infrastructure and start bidding for major infrastructure projects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-orange-600">{step.step}</span>
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
                Real Success Stories from Construction Companies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped construction companies win major contracts and build successful infrastructure businesses.
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
                      <div className="text-sm text-orange-600 mb-1">📍 {story.location}</div>
                      <div className="text-sm font-semibold text-green-600 mb-1">{story.achievement}</div>
                      <div className="text-sm text-blue-600">{story.timeline}</div>
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
                Get answers to common questions about virtual office services for construction and infrastructure companies.
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

        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Construction Company?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join 750+ successful construction companies that chose our virtual office services. Get PWD registration and start bidding for major infrastructure projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Construction Company Today
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
            <div className="text-sm text-orange-200">
              ✅ PWD registration support  ✅ Government contracts  ✅ Multi-site coordination
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}