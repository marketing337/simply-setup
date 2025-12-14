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
  Calendar, 
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
  Megaphone,
  Camera
} from "lucide-react";
import heroImage from "@assets/image_1749296062229.png";

export default function VirtualOfficeForEventsPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that event companies face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Lack of Professional Event Coordination Hub",
      solution: "Centralized business address and communication hub for event management"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Multiple Vendor and Client Coordination",
      solution: "Professional mail handling and call management for seamless operations"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Client Trust and Event Portfolio Credibility",
      solution: "Prestigious business address that builds confidence for high-value events"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Seasonal Business Operations",
      solution: "Flexible virtual office solutions that adapt to peak and off-seasons"
    }
  ];

  // Key benefits for event companies
  const keyBenefits = [
    {
      icon: <Calendar className="w-8 h-8 text-pink-600" />,
      title: "Professional Event Coordination",
      description: "Establish credible event management operations with premium business infrastructure",
      features: ["Professional business address", "Client meeting spaces", "Vendor coordination hub", "Event planning facilities"]
    },
    {
      icon: <Megaphone className="w-8 h-8 text-purple-600" />,
      title: "Multi-City Event Operations",
      description: "Manage events across multiple cities with virtual offices in key metropolitan areas",
      features: ["Pan-India presence", "Local coordination support", "Regional vendor networks", "Multi-city event management"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Business Registration & Compliance",
      description: "Complete event management business setup with proper licensing and compliance",
      features: ["Event management license", "GST registration", "Vendor agreements", "Insurance documentation"]
    },
    {
      icon: <Building className="w-8 h-8 text-orange-600" />,
      title: "Client Presentation Facilities",
      description: "Impress clients with professional meeting rooms for event planning and presentations",
      features: ["Premium meeting rooms", "AV presentation setup", "Client hospitality", "Event showcase spaces"]
    }
  ];

  // How it works process for events
  const processSteps = [
    {
      step: "1",
      title: "Event Business Setup",
      description: "Register your event management company with professional address and complete documentation",
      icon: <Building className="w-6 h-6 text-pink-600" />
    },
    {
      step: "2", 
      title: "Client & Vendor Network",
      description: "Establish professional communication channels for seamless event coordination",
      icon: <Users className="w-6 h-6 text-pink-600" />
    },
    {
      step: "3",
      title: "Event Operations Management",
      description: "Coordinate events using professional infrastructure and meeting facilities",
      icon: <Calendar className="w-6 h-6 text-pink-600" />
    },
    {
      step: "4",
      title: "Scale Event Portfolio",
      description: "Expand to multiple cities and grow your event management business nationwide",
      icon: <TrendingUp className="w-6 h-6 text-pink-600" />
    }
  ];

  // Success stories with measurable outcomes
  const successStories = [
    {
      company: "Dreamscape Events",
      founder: "Riya Malhotra",
      specialization: "Corporate Events & Conferences",
      location: "Mumbai & Delhi",
      achievement: "Managed 200+ corporate events worth ₹5Cr+",
      timeline: "Within 24 months",
      testimonial: "Professional meeting spaces in Mumbai and Delhi helped us win Fortune 500 corporate accounts. Clients trust event companies with proper business infrastructure more than home-based operations.",
      metrics: ["200+ events managed", "₹5Cr+ event value", "25 corporate clients"]
    },
    {
      company: "Royal Wedding Planners",
      founder: "Vikram Singh",
      specialization: "Luxury Weddings",
      location: "Jaipur & Udaipur",
      achievement: "Planned 150+ destination weddings",
      timeline: "Within 18 months",
      testimonial: "Having prestigious business addresses in wedding destinations like Jaipur and Udaipur gave us credibility with high-net-worth families. Professional infrastructure is essential for luxury event planning.",
      metrics: ["150+ weddings", "₹8Cr total value", "95% client satisfaction"]
    },
    {
      company: "TechCon India",
      founder: "Arjun Patel",
      specialization: "Technology Conferences",
      location: "Bangalore & Pune",
      achievement: "Organized 50+ tech conferences with 10,000+ attendees",
      timeline: "Within 20 months",
      testimonial: "Virtual offices in tech hubs helped us establish credibility with technology companies. Professional meeting rooms were crucial for sponsor meetings and event planning sessions.",
      metrics: ["50+ conferences", "10,000+ attendees", "₹3Cr revenue"]
    }
  ];

  // FAQ section for events
  const faqs = [
    {
      question: "How does virtual office help with event vendor coordination?",
      answer: "Our virtual office provides a central communication hub for vendor coordination. You get professional phone handling, mail management for vendor contracts, and meeting rooms for planning sessions. This creates a professional image that vendors and clients trust."
    },
    {
      question: "Can I use the address for event management business registration?",
      answer: "Yes, our virtual office addresses are accepted for event management business registration, event planning licenses, and vendor network agreements. We provide all necessary documentation for business verification and compliance."
    },
    {
      question: "Do you provide meeting spaces for client presentations?",
      answer: "Absolutely. We offer premium meeting rooms equipped with presentation facilities, AV equipment, and professional ambiance perfect for client meetings, event planning sessions, and vendor negotiations."
    },
    {
      question: "How do you support multi-city event operations?",
      answer: "We provide virtual office services across 15+ major cities. You can coordinate events in multiple locations while maintaining consistent business presence and professional communication across all cities."
    },
    {
      question: "What support do you provide for seasonal event businesses?",
      answer: "Our flexible virtual office plans adapt to your seasonal needs. You can scale services up during peak event seasons and scale down during off-seasons, making it cost-effective for seasonal event management businesses."
    },
    {
      question: "How does this help with high-value event client acquisition?",
      answer: "Premium business addresses and professional infrastructure significantly boost credibility with high-value clients. Corporate clients and luxury event customers prefer working with established event companies that have proper business setup."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="events"
        canonicalUrl="/usecase/virtual-office-for-events"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-pink-100 text-pink-800 hover:bg-pink-200">
                  <Calendar className="w-4 h-4 mr-1" />
                  For Events & Conferences
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Events and Conferences
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Premium business addresses, client meeting rooms, and complete event management infrastructure. Build credibility with corporate clients and manage multi-city events professionally.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Event Company
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
                    <span>Client meeting spaces</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-city presence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Event coordination hub</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Event management team using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-pink-100 rounded-full opacity-60"></div>
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Common Event Management Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on creating memorable events while we handle the business infrastructure that makes you look professional and trustworthy.
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
                Complete Event Management Infrastructure Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to run a professional event management company - from small celebrations to large corporate conferences.
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
                How to Launch Your Event Management Company
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to establish professional event management infrastructure and start winning high-value clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-pink-600">{step.step}</span>
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
                Real Success Stories from Event Companies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped event management companies win major clients and scale operations.
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
                      <div className="text-sm text-pink-600 mb-1">📍 {story.location}</div>
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
                Get answers to common questions about virtual office services for event management companies.
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
        <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Event Management Company?
            </h2>
            <p className="text-xl mb-8 text-pink-100">
              Join 500+ successful event companies that chose our virtual office services. Get professional infrastructure and start winning high-value corporate clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Event Company Today
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
            <div className="text-sm text-pink-200">
              ✅ Professional meeting spaces  ✅ Multi-city presence  ✅ Event coordination hub
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}