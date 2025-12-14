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
  Rocket, 
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
  MessageCircle
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForTechStartupsPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that tech startups face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "High Office Setup Costs",
      solution: "Professional business address at fraction of traditional office costs"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Compliance Requirements",
      solution: "Complete GST registration and MCA filing support included"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Investor Credibility Concerns",
      solution: "Premium business addresses in major tech hubs across India"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Time-Consuming Administrative Tasks",
      solution: "Mail handling, call answering, and reception services managed for you"
    }
  ];

  // Key benefits for tech startups
  const keyBenefits = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "Rapid Market Entry",
      description: "Get your startup operational within 24-48 hours with complete business infrastructure",
      features: ["Instant business address activation", "Same-day GST registration initiation", "Immediate mail handling setup"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Regulatory Compliance",
      description: "Stay compliant with all Indian business regulations from day one",
      features: ["MCA filing assistance", "GST registration support", "Statutory compliance tracking"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Professional Credibility",
      description: "Build trust with investors, clients, and partners using premium business addresses",
      features: ["Addresses in IT parks", "Professional meeting rooms", "Dedicated phone lines"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Scalable Infrastructure",
      description: "Scale your operations across multiple cities without physical expansion",
      features: ["Multi-city presence", "Flexible meeting room access", "Virtual team management"]
    }
  ];

  // How it works process
  const processSteps = [
    {
      step: "1",
      title: "Choose Your Location",
      description: "Select from premium business addresses in Bangalore, Delhi, Mumbai, Pune, and other major tech hubs",
      icon: <MapPin className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Complete Documentation",
      description: "Submit required documents online - we handle all paperwork and regulatory filings",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Get Activated",
      description: "Receive your business address confirmation and start using all virtual office services immediately",
      icon: <CheckSquare className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Scale & Grow",
      description: "Focus on building your product while we manage your business infrastructure and compliance",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  // Success stories with measurable outcomes
  const successStories = [
    {
      company: "InnovateTech AI",
      founder: "Priya Sharma",
      sector: "Artificial Intelligence",
      location: "Bangalore",
      achievement: "Raised ₹8 Cr in Series A funding",
      timeline: "Within 6 months of setup",
      testimonial: "The professional business address and meeting rooms were crucial for investor meetings. Having compliance handled allowed us to focus entirely on product development.",
      metrics: ["₹8Cr funding raised", "15 team members", "3 major clients acquired"]
    },
    {
      company: "HealthTech Solutions",
      founder: "Dr. Anita Gupta",
      sector: "Healthcare Technology",
      location: "Delhi",
      achievement: "Selected for Google for Startups",
      timeline: "Within 3 months of launch",
      testimonial: "The regulatory compliance support was invaluable for healthcare tech. We cleared all regulatory hurdles quickly and got selected for top accelerator programs.",
      metrics: ["Google Startup selection", "HIPAA compliance achieved", "5000+ users onboarded"]
    },
    {
      company: "FinTech Innovators",
      founder: "Rahul Krishnan",
      sector: "Financial Technology",
      location: "Mumbai",
      achievement: "RBI approval for digital payments",
      timeline: "Within 4 months of setup",
      testimonial: "Having a registered address in Mumbai's financial district was essential for RBI approvals. The professional setup gave us credibility with banking partners.",
      metrics: ["RBI approval received", "₹2Cr revenue in Year 1", "50,000+ transactions processed"]
    }
  ];

  // FAQ section for tech startups
  const faqs = [
    {
      question: "Can I use the virtual office address for Startup India registration?",
      answer: "Yes, our virtual office addresses are fully compliant for Startup India registration, DPIIT recognition, and all government startup schemes. We provide the necessary documentation and support for the registration process."
    },
    {
      question: "Do you provide support for international client meetings?",
      answer: "Absolutely. Our premium meeting rooms are equipped with international calling facilities, high-speed internet, and professional presentation equipment. We can also arrange video conferencing setups for global client meetings."
    },
    {
      question: "How quickly can I get GST registration completed?",
      answer: "GST registration typically takes 3-7 working days once you submit all required documents. We handle the entire process including application filing, follow-ups with authorities, and document verification."
    },
    {
      question: "Can I register multiple startups under the same virtual office?",
      answer: "Yes, you can register multiple business entities under the same virtual office address. Each entity will have separate documentation and compliance tracking. Additional charges may apply for multiple registrations."
    },
    {
      question: "What support do you provide for investor pitches and meetings?",
      answer: "We offer premium boardrooms, presentation equipment, catering services, and professional reception for investor meetings. Our locations in business districts add credibility to your startup presentations."
    },
    {
      question: "Do you assist with international business registrations?",
      answer: "While we specialize in Indian business registrations, we can provide documentation and address verification services that may be required for international expansion. We also partner with global service providers for overseas registrations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="tech-startups"
        canonicalUrl="/usecase/virtual-office-for-tech-startups"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Rocket className="w-4 h-4 mr-1" />
                  For Tech Startups
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Tech Startups
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Get your startup registered, compliant, and investor-ready within 24 hours. Professional business address, meeting rooms, and complete regulatory support for tech entrepreneurs across India.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Startup Journey
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
                    <span>24-hour setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>500+ startups served</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Full compliance support</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Tech startup team working with virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-100 rounded-full opacity-60"></div>
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
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Common Startup Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't let administrative hurdles slow down your innovation. We handle the business infrastructure so you can focus on building great products.
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
                Complete Startup Infrastructure in One Package
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything your tech startup needs to establish professional presence, ensure compliance, and scale rapidly across India.
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

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How to Get Your Startup Ready in 24 Hours
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to get your tech startup fully operational with professional business infrastructure.
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

        {/* Success Stories Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Real Success Stories from Tech Startups
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped these startups raise funding, achieve compliance, and scale rapidly.
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
                        Founded by {story.founder} • {story.sector}
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

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about virtual office services for tech startups.
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

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Tech Startup?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join 500+ successful startups that chose our virtual office services. Get your startup infrastructure ready in 24 hours and focus on building your product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Startup Today
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
              ✅ 24-hour setup guarantee  ✅ Full compliance support  ✅ Premium business addresses
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}