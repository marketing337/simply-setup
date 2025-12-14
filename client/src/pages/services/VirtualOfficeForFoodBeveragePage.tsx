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
  Utensils, 
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
  Coffee
} from "lucide-react";
import heroImage from "@assets/image (1)_1749296156045.png";

export default function VirtualOfficeForFoodBeveragePage() {
  const { currentLocation } = useLocation();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const painPoints = [
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      problem: "FSSAI and Food Safety Compliance",
      solution: "Professional business address for FSSAI registration and food safety authority approvals"
    },
    {
      icon: <FileText className="w-6 h-6 text-red-500" />,
      problem: "Multi-Location Restaurant and Outlet Management",
      solution: "Centralized business operations for food chain and franchise management"
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      problem: "Supplier and Distributor Credibility",
      solution: "Established business presence that builds trust with food suppliers and distribution networks"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      problem: "Seasonal Food Business Operations",
      solution: "Flexible infrastructure for catering, seasonal products, and event-based food services"
    }
  ];

  const keyBenefits = [
    {
      icon: <Utensils className="w-8 h-8 text-green-600" />,
      title: "Food Business Licensing",
      description: "Navigate food industry regulations with verified business address and FSSAI compliance support",
      features: ["FSSAI registration", "Food safety licenses", "Restaurant permits", "Catering approvals"]
    },
    {
      icon: <Building className="w-8 h-8 text-orange-600" />,
      title: "Multi-Outlet Operations",
      description: "Manage restaurant chains, food franchises, and multiple outlet operations efficiently",
      features: ["Chain management", "Franchise coordination", "Outlet licensing", "Brand consistency"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Supply Chain Management",
      description: "Build credible relationships with food suppliers, distributors, and logistics partners",
      features: ["Supplier verification", "Distribution networks", "Quality compliance", "Inventory management"]
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Food Export Operations",
      description: "Support international food exports with proper documentation and compliance infrastructure",
      features: ["Export documentation", "International certifications", "Quality standards", "Global partnerships"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Food Business Registration",
      description: "Register food business with FSSAI and obtain necessary food safety licenses and permits",
      icon: <Building className="w-6 h-6 text-green-600" />
    },
    {
      step: "2", 
      title: "Food Safety Compliance",
      description: "Complete food safety certifications and establish quality control systems",
      icon: <Shield className="w-6 h-6 text-green-600" />
    },
    {
      step: "3",
      title: "Food Operations Launch",
      description: "Start food business operations with professional supplier and distributor coordination",
      icon: <Utensils className="w-6 h-6 text-green-600" />
    },
    {
      step: "4",
      title: "Scale Food Business",
      description: "Expand to new locations and grow food business with additional outlets and markets",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />
    }
  ];

  const successStories = [
    {
      company: "TasteBuds Restaurant Chain",
      founder: "Chef Priya Malhotra",
      specialization: "Multi-Cuisine Restaurant Chain",
      location: "Mumbai, Delhi & Bangalore",
      achievement: "Built 50-outlet restaurant chain with ₹300Cr annual revenue",
      timeline: "Within 60 months",
      testimonial: "Professional business setup in food hubs helped us establish credibility with food suppliers and franchise partners. Restaurant chain business requires extensive FSSAI compliance and professional infrastructure for successful scaling across multiple cities.",
      metrics: ["50 restaurant outlets", "₹300Cr annual revenue", "15 cities covered"]
    },
    {
      company: "Organic Foods India",
      founder: "Rajesh Kumar",
      specialization: "Organic Food Products",
      location: "Pune & Chennai",
      achievement: "Became top 5 organic food brand with international exports",
      timeline: "Within 48 months",
      testimonial: "Having professional addresses helped us build trust with organic suppliers and health-conscious consumers. Organic food business requires extensive certifications and our professional setup enabled partnerships with premium retail chains.",
      metrics: ["Top 5 organic brand", "₹150Cr exports", "500+ retail outlets"]
    },
    {
      company: "Spice Masters",
      founder: "Meera Sharma",
      specialization: "Spice Manufacturing & Export",
      location: "Kerala & Karnataka",
      achievement: "Built spice export business to 25+ countries",
      timeline: "Within 42 months",
      testimonial: "Professional business infrastructure was crucial for establishing credibility with international spice buyers and food manufacturers. Spice export requires extensive quality certifications and our setup enabled global partnerships.",
      metrics: ["25+ countries", "₹200Cr exports", "100+ global clients"]
    }
  ];

  const faqs = [
    {
      question: "How does virtual office help with FSSAI registration and food safety compliance?",
      answer: "Our virtual office addresses are verified and accepted by FSSAI, state food authorities, and municipal corporations for food business registration. We provide all necessary documentation for food safety licenses, restaurant permits, and catering approvals."
    },
    {
      question: "Can I use the address for restaurant licensing and food outlet permits?",
      answer: "Yes, our virtual office addresses are accepted for restaurant licensing, food outlet permits, catering business registration, and all food industry regulatory approvals. Professional addresses are essential for food business credibility."
    },
    {
      question: "How do you support multi-location restaurant and food chain operations?",
      answer: "We provide virtual office services across 15+ major cities including food business hubs. You can coordinate restaurant chains and food outlets across multiple locations while maintaining consistent business presence and regulatory compliance."
    },
    {
      question: "What support do you provide for food export business and international trade?",
      answer: "We help with export documentation, international food safety certifications, quality compliance for global markets, and professional infrastructure for building relationships with international food buyers and distributors."
    },
    {
      question: "How does this help with food supplier and distributor relationships?",
      answer: "Professional business addresses and meeting facilities help establish credibility with food suppliers, distributors, and logistics partners. Food business requires extensive supply chain coordination and professional infrastructure builds trust with partners."
    },
    {
      question: "What compliance support do you provide for food and beverage businesses?",
      answer: "We help with regulatory compliance including FSSAI registration, food safety certifications, quality control documentation, supply chain compliance, and ongoing regulatory reporting for food and beverage operations."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        pageType="usecase"
        industry="food-beverage"
        canonicalUrl="/usecase/virtual-office-for-food-beverage"
      />
      
      <Navbar />
      
      <main>
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                  <Utensils className="w-4 h-4 mr-1" />
                  For Food & Beverage
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Get Virtual Office for Food and Beverage
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  FSSAI registration, restaurant licensing, food safety compliance, and complete food business infrastructure. Build trust with suppliers, distributors, and customers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                        Start Your Food Business
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
                    <span>FSSAI registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Restaurant licensing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Multi-outlet support</span>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Food and beverage professionals using virtual office solutions"
                      className="w-full h-auto max-w-lg object-cover"
                      loading="eager"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-100 rounded-full opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-100 rounded-full opacity-60"></div>
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
                Common Food Business Challenges We Solve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Focus on creating delicious food experiences while we handle the business infrastructure that builds regulatory and supplier trust.
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
                Complete Food Business Solution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to launch and scale food businesses - from single restaurants to multi-outlet chains and food manufacturing operations.
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
                How to Launch Your Food Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple 4-step process to establish food business infrastructure and start serving customers with proper regulatory compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-green-600">{step.step}</span>
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
                Real Success Stories from Food Businesses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our virtual office services helped food companies build successful restaurant chains and export businesses.
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
                      <div className="text-sm text-green-600 mb-1">📍 {story.location}</div>
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
                Get answers to common questions about virtual office services for food and beverage companies.
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

        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Launch Your Food Business?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join 1200+ successful food businesses that chose our virtual office services. Get FSSAI registration and start building your culinary empire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                    Start Your Food Business Today
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
            <div className="text-sm text-green-200">
              ✅ FSSAI registration support  ✅ Restaurant licensing  ✅ Multi-outlet management
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}