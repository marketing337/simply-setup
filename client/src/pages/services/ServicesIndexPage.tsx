import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import ContactForm from "@/components/ContactForm";
import WhatsAppQuoteForm from "@/components/WhatsAppQuoteForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { 
  CheckCircle, 
  Rocket, 
  Briefcase, 
  User, 
  ShoppingCart,
  Building,
  Shield,
  Globe,
  ArrowRight,
  Clock,
  Building2,
  Headphones,
  Zap,
  Users
} from "lucide-react";

import heroImage from "@assets/Untitled design_1749286746063.png";

export default function ServicesIndexPage() {
  const { currentLocation } = useLocation();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isWhatsAppFormOpen, setIsWhatsAppFormOpen] = useState(false);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);

  const services = [
    {
      id: "tech-startups",
      title: "Virtual Office for Tech Startups",
      description: "Launch your tech startup with professional presence. Business registration, investor meeting rooms, and regulatory compliance support.",
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      badge: "For Startups",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["24hr Quick Setup", "Investor Meeting Rooms", "GST Registration", "Startup India Support"],
      link: "/usecase/virtual-office-for-tech-startups",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      id: "consultants",
      title: "Virtual Office for Consultants", 
      description: "Establish your consulting practice with professional meeting rooms, business address, and compliance support for consultants.",
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      badge: "For Consultants",
      badgeColor: "bg-purple-100 text-purple-800",
      features: ["Professional Meeting Rooms", "Multi-city Presence", "Client Communication Hub", "GST Compliance"],
      link: "/usecase/virtual-office-for-consultants",
      gradient: "from-purple-600 to-indigo-600"
    },
    {
      id: "freelancers",
      title: "Virtual Office for Freelancers",
      description: "Transform your freelance work into a professional business with GST registration, client meetings, and business credibility.",
      icon: <User className="w-8 h-8 text-emerald-600" />,
      badge: "For Freelancers", 
      badgeColor: "bg-emerald-100 text-emerald-800",
      features: ["GST Registration Address", "Client Trust & Credibility", "Work From Anywhere", "Legal Compliance"],
      link: "/usecase/virtual-office-for-freelancers",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      id: "ecommerce",
      title: "Virtual Office for E-commerce",
      description: "Professional business address for e-commerce sellers. Marketplace compliance, return address management, and GST registration.",
      icon: <ShoppingCart className="w-8 h-8 text-orange-600" />,
      badge: "For E-commerce",
      badgeColor: "bg-orange-100 text-orange-800",
      features: ["Return & Exchange Address", "Marketplace Compliance", "Multi-Channel Presence", "Logistics Support"],
      link: "/usecase/virtual-office-for-ecommerce",
      gradient: "from-orange-600 to-red-600"
    },
    {
      id: "events",
      title: "Virtual Office for Events & Conferences",
      description: "Establish your event management company with professional infrastructure for conferences, corporate events, and celebrations.",
      icon: <Building className="w-8 h-8 text-pink-600" />,
      badge: "For Events",
      badgeColor: "bg-pink-100 text-pink-800",
      features: ["Event Coordination Hub", "Client Meeting Spaces", "Multi-City Presence", "Professional Support"],
      link: "/usecase/virtual-office-for-events",
      gradient: "from-pink-600 to-purple-600"
    },
    {
      id: "renewable-energy",
      title: "Virtual Office for Renewable Energy",
      description: "Launch your renewable energy company with MNRE registration, project approvals, and complete infrastructure support.",
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      badge: "For Energy",
      badgeColor: "bg-yellow-100 text-yellow-800",
      features: ["MNRE Registration", "Project Approvals", "Multi-State Operations", "Investment Support"],
      link: "/usecase/virtual-office-for-renewable-energy",
      gradient: "from-yellow-600 to-orange-600"
    },
    {
      id: "healthcare",
      title: "Virtual Office for Healthcare",
      description: "Establish your healthcare company with CDSCO registration, drug licensing, and pharmaceutical compliance support.",
      icon: <Shield className="w-8 h-8 text-red-600" />,
      badge: "For Healthcare",
      badgeColor: "bg-red-100 text-red-800",
      features: ["CDSCO Registration", "Drug Licensing", "Regulatory Compliance", "Medical Institution Trust"],
      link: "/usecase/virtual-office-for-healthcare",
      gradient: "from-red-600 to-pink-600"
    },
    {
      id: "hospitality",
      title: "Virtual Office for Hospitality & Tourism",
      description: "Launch your tourism business with professional infrastructure, hotel licensing, and guest credibility support.",
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      badge: "For Tourism",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["Tourism Licensing", "Multi-Property Management", "Guest Credibility", "Seasonal Support"],
      link: "/usecase/virtual-office-for-hospitality",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      id: "construction",
      title: "Virtual Office for Construction",
      description: "Build your construction company with PWD registration, project licensing, and government contract credibility.",
      icon: <Building className="w-8 h-8 text-gray-600" />,
      badge: "For Construction",
      badgeColor: "bg-gray-100 text-gray-800",
      features: ["PWD Registration", "Government Contracts", "Multi-Site Coordination", "Project Management"],
      link: "/usecase/virtual-office-for-construction",
      gradient: "from-gray-600 to-slate-600"
    },
    {
      id: "import-export",
      title: "Virtual Office for Import Export",
      description: "Launch your trading business with DGFT registration, IEC code support, and global trade infrastructure.",
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      badge: "For Trading",
      badgeColor: "bg-indigo-100 text-indigo-800",
      features: ["DGFT Registration", "IEC Code Support", "Global Trade Support", "Banking Credibility"],
      link: "/usecase/virtual-office-for-import-export",
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      id: "food-beverage",
      title: "Virtual Office for Food & Beverage",
      description: "Establish your food business with FSSAI registration, restaurant licensing, and multi-outlet management support.",
      icon: <Building className="w-8 h-8 text-green-600" />,
      badge: "For Food",
      badgeColor: "bg-green-100 text-green-800",
      features: ["FSSAI Registration", "Restaurant Licensing", "Multi-Outlet Support", "Supply Chain Management"],
      link: "/usecase/virtual-office-for-food-beverage",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: "manufacturing",
      title: "Virtual Office for Manufacturing",
      description: "Build your manufacturing company with industrial licensing, quality certifications, and supply chain coordination.",
      icon: <Building className="w-8 h-8 text-slate-600" />,
      badge: "For Manufacturing",
      badgeColor: "bg-slate-100 text-slate-800",
      features: ["Industrial Licensing", "Quality Certifications", "Supply Chain Support", "Export Manufacturing"],
      link: "/usecase/virtual-office-for-manufacturing",
      gradient: "from-slate-600 to-gray-600"
    },
    {
      id: "saas-founders",
      title: "Virtual Office for SaaS Founders",
      description: "Launch and scale your SaaS business with professional infrastructure. Get payment gateway approvals, enterprise credibility, and global compliance support.",
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      badge: "For SaaS",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["Payment Gateway Ready", "Enterprise Credibility", "Global Compliance", "Investor Meetings"],
      link: "/usecase/virtual-office-for-saas-founders",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      id: "remote-creative-agency",
      title: "Virtual Office for Remote Creative Agency",
      description: "Build a credible creative agency with professional addresses in Mumbai's Bandra, Delhi's Hauz Khas, or Bangalore's Koramangala.",
      icon: <Building className="w-8 h-8 text-purple-600" />,
      badge: "For Creative",
      badgeColor: "bg-purple-100 text-purple-800",
      features: ["Creative Hub Locations", "Presentation Spaces", "Brand Registration", "Client Meetings"],
      link: "/usecase/virtual-office-for-remote-creative-agency",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: "foreign-sme-entry",
      title: "Foreign SME India Entry Desk",
      description: "Establish your foreign SME in India with professional virtual office solutions. Complete FEMA compliance, RBI support, and local presence.",
      icon: <Globe className="w-8 h-8 text-green-600" />,
      badge: "Foreign SME",
      badgeColor: "bg-green-100 text-green-800",
      features: ["FEMA Compliance", "RBI Support", "Local Presence", "Government Relations"],
      link: "/usecase/virtual-office-for-foreign-sme-entry-desk",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: "fintech-startup",
      title: "Virtual Office for FinTech Startup",
      description: "Launch your FinTech startup with professional addresses in Mumbai's BKC, Delhi's financial district. Get RBI compliance support and banking partnerships.",
      icon: <Building className="w-8 h-8 text-blue-600" />,
      badge: "For FinTech",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["RBI Compliance", "Banking Partnerships", "Financial District Presence", "Payment Gateway Support"],
      link: "/usecase/virtual-office-for-fintech-startup",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: "ngo-foundation",
      title: "Virtual Office for NGO & Foundation",
      description: "Register your NGO or Foundation with professional virtual office solutions. Get Section 8 registration, 80G tax exemption, and donor credibility.",
      icon: <Users className="w-8 h-8 text-red-600" />,
      badge: "For NGO",
      badgeColor: "bg-red-100 text-red-800",
      features: ["Section 8 Registration", "80G Tax Exemption", "Donor Credibility", "Board Meetings"],
      link: "/usecase/virtual-office-for-ngo-foundation",
      gradient: "from-red-600 to-pink-600"
    },
    {
      id: "recruitment-outsourcer",
      title: "Virtual Office for Recruitment Process Outsourcer",
      description: "Launch your recruitment agency with professional virtual office solutions. Get staffing licenses, interview facilities, and enterprise credibility.",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      badge: "For RPO",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["Staffing Licenses", "Interview Facilities", "Enterprise Credibility", "Vendor Registration"],
      link: "/usecase/virtual-office-for-recruitment-process-outsourcer",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      id: "seasonal-event-management",
      title: "Virtual Office for Seasonal Event Management",
      description: "Launch your event management company with professional virtual office solutions. Perfect for wedding planners, corporate event organizers, and festival management companies.",
      icon: <Building className="w-8 h-8 text-purple-600" />,
      badge: "For Events",
      badgeColor: "bg-purple-100 text-purple-800",
      features: ["Event Licensing", "Client Meeting Spaces", "Year-Round Presence", "Vendor Coordination"],
      link: "/usecase/virtual-office-for-seasonal-event-management",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Authorised GST Practitioners",
      description: "Certified professionals ensuring compliant GST registration and documentation",
      bgColor: "bg-blue-600"
    },
    {
      icon: <Building2 className="h-8 w-8 text-white" />,
      title: "Reputed Space Partners",
      description: "Premium business addresses in prestigious commercial locations",
      bgColor: "bg-green-600"
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Lowest Prices & Fast Approvals",
      description: "Competitive pricing with quick turnaround times for all services",
      bgColor: "bg-orange-600"
    },
    {
      icon: <Headphones className="h-8 w-8 text-white" />,
      title: "End to End Local Support",
      description: "Comprehensive local assistance from setup to ongoing business support",
      bgColor: "bg-purple-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Businesses Served", icon: "🏢" },
    { number: "15+", label: "Cities Available", icon: "🌍" },
    { number: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
    { number: "24x7", label: "Customer Support", icon: "🛟" }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    // Scroll to contact form section
    const contactSection = document.querySelector('[data-section="contact"]');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Virtual Office Services | Professional Business Solutions for All Industries"
        description="Comprehensive virtual office services for startups, consultants, freelancers, and e-commerce businesses. Professional address, compliance support, and business infrastructure."
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section - Updated with image on right, content on left */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content on Left */}
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                  Professional Virtual Office Services for
                  <span className="text-blue-600"> Every Business</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Whether you're a tech startup, consultant, freelancer, or e-commerce business, we have specialized virtual office solutions designed for your specific needs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={() => setIsConsultationDialogOpen(true)}
                  >
                    <Globe className="mr-2 h-5 w-5" />
                    Get Quote on WhatsApp
                  </Button>
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={() => {
                      const servicesSection = document.querySelector('[data-section="services"]');
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">
                    Authorised GSTP: 27AAOCS1234A1Z5
                  </span>
                </div>
              </div>

              {/* Image on Right */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src={heroImage} 
                      alt="Professional business team working together with virtual office solutions"
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



        {/* Why Choose Us Section - Matching homepage */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Why Choose Our Services
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Trusted by thousands of businesses across India for reliable virtual office solutions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-all duration-200">
                  <div className={`w-16 h-16 mx-auto mb-4 ${benefit.bgColor} rounded-full flex items-center justify-center shadow-lg`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section - Minimal Grid */}
        <section className="py-12 md:py-16 bg-gray-50" data-section="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Specialized Services for Every Business Type
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our tailored virtual office solutions designed specifically for different business models and industries.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden" data-testid={`card-service-${service.id}`}>
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${service.gradient} p-4 text-center`}>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                      {service.title.replace('Virtual Office for ', '')}
                    </h3>
                  </div>
                  
                  {/* Service Icon */}
                  <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
                    <div className="w-20 h-20 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center">
                      <div className="scale-150">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">
                      {service.title.replace('Virtual Office for ', '')}
                    </h4>
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                    
                    {/* ADD Button */}
                    <Link 
                      href={service.link}
                      className="block w-full py-2 px-4 bg-white border-2 border-green-500 text-green-600 font-semibold text-xs rounded hover:bg-green-50 transition-colors text-center"
                      data-testid={`button-add-${service.id}`}
                    >
                      ADD
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Consultation Section */}
        <section className="py-12 md:py-16 bg-blue-50">
          <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Expert Consultation
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                  Connect with our virtual office specialists on WhatsApp for personalized guidance. Get instant responses and expert advice tailored to your business needs.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        Instant Response
                      </h3>
                      <p className="text-sm text-gray-600">
                        Get your consultation within 30 minutes on WhatsApp
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        Secure & Private
                      </h3>
                      <p className="text-sm text-gray-600">
                        Your information is completely safe with us
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Headphones className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        Expert Support
                      </h3>
                      <p className="text-sm text-gray-600">
                        Direct connection with our virtual office specialists
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer location={currentLocation} />
      
      {/* WhatsApp Quote Form */}
      <WhatsAppQuoteForm 
        isOpen={isWhatsAppFormOpen} 
        onClose={() => setIsWhatsAppFormOpen(false)} 
      />

      {/* WhatsApp Consultation Dialog */}
      <Dialog
        open={isConsultationDialogOpen}
        onOpenChange={setIsConsultationDialogOpen}
      >
        <DialogContent className="w-[95vw] max-w-md mx-auto p-0 border-0 whatsapp-dialog-content">
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Form</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}