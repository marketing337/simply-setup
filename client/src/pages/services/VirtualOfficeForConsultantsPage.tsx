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
  Briefcase, 
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
  Presentation
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 05_01_09 PM_1749296048615.png";

export default function VirtualOfficeForConsultantsPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Pain points that consultants face
  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Lack of Professional Meeting Spaces",
      solution: "Premium boardrooms and meeting rooms in business districts"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Complex Multi-State Operations",
      solution: "Virtual offices in multiple cities with unified management"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Client Trust and Credibility Issues",
      solution: "Prestigious business addresses in prime commercial locations"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Administrative Overhead",
      solution: "Complete mail handling, call management, and reception services"
    }
  ];

  // Key benefits for consultants
  const keyBenefits = [
    {
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      title: "Professional Client Experience",
      description: "Impress clients with premium meeting spaces and professional business infrastructure",
      features: ["Executive boardrooms", "Presentation equipment", "Professional reception", "Catering services"]
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "Multi-City Presence",
      description: "Establish consulting practice across multiple cities without physical offices",
      features: ["Offices in 15+ cities", "Consistent branding", "Local phone numbers", "Regional market access"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Business Compliance",
      description: "Handle all regulatory requirements for consulting business operations",
      features: ["GST registration", "Professional tax filing", "Service tax compliance", "Legal documentation"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Scalable Operations",
      description: "Grow your consulting practice efficiently with flexible business infrastructure",
      features: ["Pay-per-use meeting rooms", "Flexible contracts", "Team expansion support", "Client management tools"]
    }
  ];

  // How it works process for consultants
  const processSteps = [
    {
      step: "1",
      title: "Select Business Locations",
      description: "Choose from premium business addresses in major commercial hubs where your clients are located",
      icon: <MapPin className="w-6 h-6 text-purple-600" />
    },
    {
      step: "2", 
      title: "Set Up Professional Profile",
      description: "Complete business registration and establish your consulting practice with proper documentation",
      icon: <FileText className="w-6 h-6 text-purple-600" />
    },
    {
      step: "3",
      title: "Start Client Operations",
      description: "Begin meeting clients in professional spaces and managing business through our platform",
      icon: <Presentation className="w-6 h-6 text-purple-600" />
    },
    {
      step: "4",
      title: "Scale Your Practice",
      description: "Expand to new markets and grow your client base with additional virtual office locations",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />
    }
  ];

  // Success stories with measurable outcomes
  const successStories = [
    {
      consultant: "Rajesh Khanna",
      specialization: "Management Consulting",
      location: "Delhi & Mumbai",
      achievement: "Scaled to ₹2.5 Cr annual revenue",
      timeline: "Within 18 months",
      testimonial: "Having professional meeting spaces in both Delhi and Mumbai allowed me to serve Fortune 500 clients effectively. The virtual offices paid for themselves within 3 months.",
      metrics: ["₹2.5Cr annual revenue", "15 Fortune 500 clients", "200% growth in 18 months"]
    },
    {
      consultant: "Dr. Meera Patel",
      specialization: "Healthcare Consulting",
      location: "Bangalore & Chennai",
      achievement: "Secured 3 government contracts",
      timeline: "Within 12 months",
      testimonial: "The credibility that comes with having offices in medical districts helped me win major healthcare consulting contracts. Professional meeting rooms were essential for client presentations.",
      metrics: ["3 government contracts", "50+ hospital clients", "₹1.8Cr project value"]
    },
    {
      consultant: "Amit Sharma",
      specialization: "IT Consulting",
      location: "Pune & Hyderabad",
      achievement: "Built team of 25 consultants",
      timeline: "Within 24 months",
      testimonial: "Started as a solo consultant, now manage a team of 25. The virtual offices allowed me to establish presence in multiple tech hubs without huge overhead costs.",
      metrics: ["25 team members", "40+ tech clients", "₹5Cr annual turnover"]
    }
  ];

  // FAQ section for consultants
  const faqs = [
    {
      question: "Can I book meeting rooms on short notice for client meetings?",
      answer: "Yes, our meeting rooms can be booked with as little as 2 hours notice through our online platform. We offer hourly, half-day, and full-day booking options with professional setup and catering services available."
    },
    {
      question: "Do you provide support for multi-city consulting operations?",
      answer: "Absolutely. We offer unified virtual office services across 15+ major cities. You get consistent branding, centralized billing, and seamless client experience across all locations."
    },
    {
      question: "How do you handle confidential client communications?",
      answer: "We maintain strict confidentiality protocols. All mail is handled securely, calls are professionally managed with your specific instructions, and meeting rooms offer complete privacy for sensitive discussions."
    },
    {
      question: "Can I use the address for professional certifications and licenses?",
      answer: "Yes, our virtual office addresses are accepted for most professional certifications, consulting licenses, and regulatory registrations. We provide all necessary documentation for verification purposes."
    },
    {
      question: "What presentation and meeting facilities do you provide?",
      answer: "Our premium meeting rooms include projectors, whiteboards, high-speed internet, video conferencing setup, and professional furniture. We also offer catering services and technical support during important client presentations."
    },
    {
      question: "How do you support consulting firms with multiple partners?",
      answer: "We offer shared virtual office packages for consulting partnerships. Multiple partners can share the same prestigious address while maintaining separate mail handling and meeting room access. We also provide team management tools."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="consultants"
        canonicalUrl="/usecase/virtual-office-for-consultants"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <Briefcase className="w-4 h-4 mr-1" />
                  For Consultants
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Consultants
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Premium business addresses, professional meeting rooms, and complete business support for independent consultants and consulting firms across India. Impress clients and scale your practice efficiently.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Practice
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
                    <span>Premium meeting rooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-city presence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Professional support</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Professional consultants using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-100 rounded-full opacity-60"></div>
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

        {/* Problem/Solution Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Common Consulting Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on delivering value to your clients while we handle the business infrastructure that makes you look professional and credible.
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
                Complete Consulting Infrastructure Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to run a professional consulting practice - from solo consultants to large consulting firms.
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
                How to Establish Your Consulting Practice
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to set up professional consulting infrastructure and start serving clients immediately.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-purple-600">{step.step}</span>
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
                Real Success Stories from Consultants
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped consultants grow their practices and win major clients.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{story.consultant}</h3>
                        <Award className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{story.specialization}</div>
                      <div className="text-sm text-purple-600 mb-1">📍 {story.location}</div>
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
                Get answers to common questions about virtual office services for consultants.
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
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Establish Your Consulting Practice?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join 300+ successful consultants who chose our virtual office services. Get professional infrastructure and start serving clients in premium business locations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Practice Today
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
            <div className="text-sm text-purple-200">
              ✅ Premium meeting rooms  ✅ Multi-city presence  ✅ Professional support
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}