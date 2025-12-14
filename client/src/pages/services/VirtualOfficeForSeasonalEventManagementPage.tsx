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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  PartyPopper,
  Music,
  Camera
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 01_48_00 PM_1749296051817.png";

export default function VirtualOfficeForSeasonalEventManagementPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Seasonal Business Credibility",
      solution: "Year-round professional presence even during off-season periods to maintain client relationships"
    },
    {
      icon: <Calendar className="w-6 h-6 text-red-500" />,
      problem: "Peak Season Coordination",
      solution: "Professional meeting spaces and coordination hubs for managing multiple events simultaneously"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Vendor & License Management",
      solution: "Registered address for event licenses, vendor contracts, and regulatory compliance"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Client Meeting Infrastructure",
      solution: "Professional venues for client presentations, planning meetings, and event showcases"
    }
  ];

  const keyBenefits = [
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Seasonal Event Coordination",
      description: "Professional infrastructure for managing weddings, festivals, corporate events, and seasonal celebrations",
      features: ["Event planning meeting rooms", "Client presentation spaces", "Vendor coordination facilities"]
    },
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "Multi-City Event Presence",
      description: "Establish operations across major cities for destination events and regional celebrations",
      features: ["Delhi NCR for corporate events", "Mumbai for Bollywood events", "Goa for destination weddings"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Licensing & Compliance Support",
      description: "Professional address for event licenses, vendor registrations, and regulatory requirements",
      features: ["Event licensing support", "Vendor empanelment", "Government permissions assistance"]
    },
    {
      icon: <PartyPopper className="w-8 h-8 text-orange-600" />,
      title: "Year-Round Business Continuity",
      description: "Maintain professional presence during off-seasons to secure advance bookings",
      features: ["Off-season client meetings", "Advance booking coordination", "Continuous business operations"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Business Registration",
      description: "Register your event management company with professional address and complete licensing requirements",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Infrastructure Access",
      description: "Get access to meeting rooms, event planning spaces, and client presentation facilities",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Client Acquisition",
      description: "Use professional setup to win corporate events, weddings, and seasonal celebration contracts",
      icon: <Calendar className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Seasonal Scaling",
      description: "Scale operations during peak seasons while maintaining year-round professional presence",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successStories = [
    {
      company: "Royal Weddings Co.",
      founder: "Anjali Sharma",
      sector: "Luxury Wedding Management",
      location: "Delhi - Connaught Place",
      achievement: "₹25Cr revenue in peak wedding season",
      timeline: "Grew from 10 to 150 weddings annually",
      testimonial: "The Delhi address was crucial for attracting high-end clients. Professional meeting spaces helped showcase our premium wedding packages to affluent families.",
      metrics: ["₹25Cr seasonal revenue", "150 luxury weddings", "50+ vendor partnerships"]
    },
    {
      company: "Corporate Events Plus",
      founder: "Rajesh Patel",
      sector: "Corporate Event Management",
      location: "Mumbai - BKC", 
      achievement: "Partnership with 25 Fortune 500 companies",
      timeline: "Built corporate network in 18 months",
      testimonial: "Mumbai BKC presence gave us credibility with multinational corporations. The professional setup helped us secure large corporate event contracts.",
      metrics: ["25 Fortune 500 clients", "₹15Cr annual contracts", "200+ corporate events"]
    },
    {
      company: "Festival Celebrations Ltd.",
      founder: "Priya Gupta",
      sector: "Cultural & Festival Events",
      location: "Bangalore - UB City",
      achievement: "Managed 50+ cultural festivals",
      timeline: "Became leading cultural event organizer in 2 years",
      testimonial: "The professional infrastructure helped coordinate complex cultural events. Government relations and vendor management became much easier.",
      metrics: ["50+ festivals organized", "₹8Cr revenue", "1M+ attendees managed"]
    }
  ];

  const faqs = [
    {
      question: "Can you help with event licensing and government permissions?",
      answer: "We provide registered business address for event licensing applications and can connect you with specialized consultants for complex government permissions and NOCs."
    },
    {
      question: "Do you have spaces suitable for client meetings and event planning?",
      answer: "Yes, our meeting rooms are equipped for event planning sessions, client presentations, and vendor meetings. We also provide presentation equipment for showcasing event concepts."
    },
    {
      question: "How do you support seasonal business operations?",
      answer: "We provide year-round business address and flexible meeting room access. During peak seasons, you get priority access to larger spaces for coordination meetings."
    },
    {
      question: "Can I use the address for vendor empanelment and contracts?",
      answer: "Absolutely. Our professional addresses are accepted for vendor registrations, hotel partnerships, and corporate empanelment processes across India."
    },
    {
      question: "Do you assist with multi-city event coordination?",
      answer: "Yes, we can establish your presence in multiple cities, perfect for destination events, corporate tours, and regional festival management."
    },
    {
      question: "What support do you provide for wedding season management?",
      answer: "We offer dedicated coordination spaces during wedding seasons, client meeting facilities, and vendor coordination support to help manage multiple simultaneous events."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office for Seasonal Event Management | Wedding Events | Corporate Event Planning"
        description="Launch your event management company with professional virtual office. Get event licenses, client meeting spaces, and seasonal coordination for weddings, festivals, corporate events."
        keywords="virtual office for event management, wedding event planning, seasonal event business, corporate event coordination, event licensing, professional event address"
        pageType="usecase"
        industry="event-management"
        canonicalUrl="/usecase/virtual-office-for-seasonal-event-management"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-purple-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <Calendar className="w-4 h-4 mr-1" />
                  For Event Management
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Virtual Office for Seasonal Event Management
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Launch your event management company with professional virtual office solutions. Perfect for wedding planners, corporate event organizers, and festival management companies. Get year-round credibility and seasonal coordination support.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Launch Your Event Business
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
                    <span>Event licensing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Client meeting spaces</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Year-round presence</span>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Event management team planning seasonal events with professional virtual office"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-pink-100 rounded-full opacity-60"></div>
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
                Event Management Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Build a credible event management business with professional infrastructure that works year-round, not just during peak seasons.
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
                Complete Event Management Infrastructure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything your event management company needs to coordinate successful events and maintain professional credibility.
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

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your Event Business Launch Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Establish your event management company with professional infrastructure in 4 steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Event Management Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Successful event management companies that built thriving businesses with our virtual office support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{story.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h3>
                    <p className="text-gray-600 mb-2">by {story.founder}</p>
                    <Badge className="mb-4 bg-purple-100 text-purple-800">{story.sector}</Badge>
                    
                    <div className="mb-6">
                      <div className="text-lg font-bold text-purple-600 mb-1">{story.achievement}</div>
                      <div className="text-sm text-gray-500">{story.timeline}</div>
                    </div>

                    <blockquote className="text-gray-700 mb-6 italic">
                      "{story.testimonial}"
                    </blockquote>

                    <div className="space-y-2">
                      {story.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">{metric}</span>
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
                Everything you need to know about virtual offices for event management companies.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Launch Your Event Management Business?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join successful event management companies that built thriving seasonal businesses with our professional infrastructure.
            </p>
            
            <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start Your Event Business Today
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
      
      <Footer />
    </div>
  );
}