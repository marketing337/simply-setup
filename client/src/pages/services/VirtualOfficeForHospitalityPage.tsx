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
  Plane, 
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
  Camera,
  Utensils
} from "lucide-react";
import heroImage from "@assets/ChatGPT Image Jun 7, 2025, 05_01_12 PM_1749296049965.png";

export default function VirtualOfficeForHospitalityPage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "Tourism License and Regulatory Compliance",
      solution: "Professional business address for tourism ministry and state tourism board registrations"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Multi-Location Hotel and Resort Operations",
      solution: "Centralized business management for hospitality chains and resort portfolios"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Guest Trust and Booking Credibility",
      solution: "Verified business addresses that build confidence with travelers and booking platforms"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Seasonal Business Management",
      solution: "Flexible business infrastructure that adapts to tourism peak and off-seasons"
    }
  ];

  const keyBenefits = [
    {
      icon: <Plane className="w-8 h-8 text-blue-600" />,
      title: "Tourism Business Registration",
      description: "Establish tourism and hospitality operations with proper licensing and regulatory compliance",
      features: ["Tourism ministry registration", "Hotel licensing", "Travel agent permits", "Tour operator approvals"]
    },
    {
      icon: <Building className="w-8 h-8 text-green-600" />,
      title: "Multi-Property Management",
      description: "Coordinate hotel chains, resorts, and hospitality properties across multiple destinations",
      features: ["Property management hub", "Booking coordination", "Staff management", "Guest services coordination"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Guest Trust & Safety",
      description: "Build credibility with guests through professional business infrastructure and verified operations",
      features: ["Online booking credibility", "Guest safety compliance", "Insurance documentation", "Quality certifications"]
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "International Tourism Operations",
      description: "Support international tourist operations, visa processing, and global hospitality partnerships",
      features: ["Visa processing support", "International partnerships", "Foreign exchange services", "Global marketing operations"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Hospitality Business Setup",
      description: "Register tourism/hospitality business with proper licensing and regulatory compliance",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Tourism Licensing & Approvals",
      description: "Obtain necessary tourism licenses, hotel permits, and hospitality industry certifications",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Guest Operations Management",
      description: "Launch hospitality services with professional guest management and booking coordination",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Expand Tourism Portfolio",
      description: "Scale to new destinations and grow hospitality business across tourist destinations",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />
    }
  ];

  const successStories = [
    {
      company: "Heritage Hospitality Group",
      founder: "Vikram Singh",
      specialization: "Luxury Heritage Hotels",
      location: "Rajasthan & Goa",
      achievement: "Built portfolio of 25 heritage properties with 95% occupancy",
      timeline: "Within 48 months",
      testimonial: "Professional business infrastructure in tourist destinations helped us establish credibility with international guests and booking platforms. Heritage hotel business requires extensive regulatory compliance and professional setup for success with luxury travelers.",
      metrics: ["25 heritage properties", "95% average occupancy", "₹300Cr portfolio value"]
    },
    {
      company: "Adventure Tours India",
      founder: "Priya Malhotra",
      specialization: "Adventure & Eco-Tourism",
      location: "Himachal & Uttarakhand",
      achievement: "Organized 5,000+ adventure tours with international clientele",
      timeline: "Within 36 months",
      testimonial: "Having professional addresses in adventure tourism hubs enabled partnerships with international tour operators. Adventure tourism requires extensive safety compliance and professional infrastructure to build trust with foreign tourists.",
      metrics: ["5,000+ tours organized", "60% international guests", "₹50Cr annual revenue"]
    },
    {
      company: "Coastal Resorts & Spas",
      founder: "Arjun Nair",
      specialization: "Beach Resorts & Wellness",
      location: "Kerala & Karnataka",
      achievement: "Developed 10 luxury beach resorts with wellness spas",
      timeline: "Within 54 months",
      testimonial: "Professional business setup helped us secure coastal development permits and establish credibility with wellness tourism market. Resort development requires extensive regulatory approvals and professional infrastructure.",
      metrics: ["10 beach resorts", "₹500Cr investment", "4.8* guest rating"]
    }
  ];

  const faqs = [
    {
      question: "How does virtual office help with tourism ministry and licensing approvals?",
      answer: "Our virtual office addresses are verified and accepted by tourism ministry, state tourism boards, and hospitality regulatory authorities. We provide all necessary documentation for tourism business registration, hotel licensing, and travel operator permits."
    },
    {
      question: "Can I use the address for hotel licensing and hospitality business registration?",
      answer: "Yes, our virtual office addresses are accepted for hotel licensing, resort development approvals, restaurant permits, and all hospitality business registrations. We provide complete documentation support for tourism industry compliance."
    },
    {
      question: "How do you support multi-location hospitality operations?",
      answer: "We provide virtual office services across 15+ major tourist destinations. You can coordinate hotels, resorts, and tourism operations in multiple locations while maintaining consistent business presence and guest service standards."
    },
    {
      question: "What support do you provide for international tourism operations?",
      answer: "We help with documentation for international tourist services, visa processing support, foreign exchange compliance, and global partnership facilitation. Professional infrastructure is crucial for international tourism credibility."
    },
    {
      question: "How does this help with online booking platforms and guest trust?",
      answer: "Professional business addresses and verified operations significantly boost credibility on booking platforms like Booking.com, Expedia, and MakeMyTrip. Guests trust hospitality businesses with proper professional setup and verified business information."
    },
    {
      question: "What seasonal business support do you provide for tourism companies?",
      answer: "Our flexible virtual office plans adapt to seasonal tourism patterns. You can scale services up during peak tourist seasons and scale down during off-seasons, making it cost-effective for seasonal hospitality businesses."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="hospitality"
        canonicalUrl="/usecase/virtual-office-for-hospitality"
      />
      
      <Navbar />
      
      <main>
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Plane className="w-4 h-4 mr-1" />
                  For Hospitality & Tourism
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Hospitality and Tourism
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Tourism licensing, hotel registration, resort development approvals, and complete hospitality business infrastructure. Build trust with guests and tourism authorities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Tourism Business
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
                    <span>Tourism licensing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-property management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Guest credibility</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Hospitality professionals using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-cyan-100 rounded-full opacity-60"></div>
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
                Common Hospitality Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on creating memorable guest experiences while we handle the business infrastructure that builds tourism authority trust.
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
                Complete Hospitality Business Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch and scale hospitality businesses - from boutique hotels to luxury resorts and adventure tourism operations.
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
                How to Launch Your Hospitality Company
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to establish hospitality business infrastructure and start serving guests in tourist destinations.
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
                Real Success Stories from Hospitality Companies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped hospitality companies build successful tourism businesses and achieve high guest satisfaction.
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
                Get answers to common questions about virtual office services for hospitality and tourism companies.
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

        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Hospitality Company?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join 600+ successful hospitality companies that chose our virtual office services. Get tourism licensing and start creating memorable guest experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Tourism Business Today
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
              ✅ Tourism licensing support  ✅ Multi-property management  ✅ Guest credibility
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}