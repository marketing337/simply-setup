import {
  useEffect,
  useState,
  useMemo,
  lazy,
  Suspense,
  useCallback,
} from "react";
import { useLocation as useWouterLocation } from "wouter";
import { useLocation } from "@/hooks/useLocation";
import {
  Building,
  Mail,
  HandshakeIcon,
  Headphones,
  MapPin,
  Search,
  Building2,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Shield,
  Clock,
  TrendingUp,
  Zap,
  Target,
  Phone,
  Crown,
  Landmark,
  Mountain,
  Waves,
  TreePine,
  Castle,
  Sun,
  Flower,
  Fish,
  User,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Briefcase,
  ShoppingCart,
  Globe,
  MessageCircle,
  FileText as Receipt,
  Building as Factory,
  X,
  FileText,
  Cloud,
  Square,
  Home as HomeIcon,
  Tag,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import { topIndianCities } from "@/lib/indianCities";
import { fallbackImages, heroBgColors } from "@/lib/locationData";
import { cn } from "@/lib/utils";
import { getCityIcon } from "@/lib/cityIcons";
import type { Location } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import MobileContactButton from "@/components/MobileContactButton";
import { UpdatesAlertsSection } from "@/components/UpdatesAlertsSection";

import ContactForm from "@/components/ContactForm";

// Specialized Services Slider Component
const SpecializedServicesSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const services = [
    {
      id: "tech-startups",
      title: "Virtual Office for Tech Startups",
      description:
        "Launch your tech startup with professional presence. Business registration, investor meeting rooms, and regulatory compliance support.",
      icon: <Rocket className="w-6 h-6 text-blue-600" />,
      badge: "For Startups",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "24hr Quick Setup",
        "Investor Meeting Rooms",
        "GST Registration",
      ],
      link: "/usecase/virtual-office-for-tech-startups",
    },
    {
      id: "consultants",
      title: "Virtual Office for Consultants",
      description:
        "Establish your consulting practice with professional meeting rooms, business address, and compliance support for consultants.",
      icon: <Briefcase className="w-6 h-6 text-purple-600" />,
      badge: "For Consultants",
      badgeColor: "bg-purple-100 text-purple-800",
      features: [
        "Professional Meeting Rooms",
        "Multi-city Presence",
        "Client Communication Hub",
      ],
      link: "/usecase/virtual-office-for-consultants",
    },
    {
      id: "freelancers",
      title: "Virtual Office for Freelancers",
      description:
        "Transform your freelance work into a professional business with GST registration, client meetings, and business credibility.",
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      badge: "For Freelancer",
      badgeColor: "bg-emerald-100 text-emerald-800",
      features: [
        "GST Registration Address",
        "Client Trust & Credibility",
        "Work From Anywhere",
      ],
      link: "/usecase/virtual-office-for-freelancers",
    },
    {
      id: "ecommerce",
      title: "Virtual Office for E-commerce",
      description:
        "Professional business address for e-commerce sellers. Marketplace compliance, return address management, and GST registration.",
      icon: <ShoppingCart className="w-6 h-6 text-orange-600" />,
      badge: "For E-commerce",
      badgeColor: "bg-orange-100 text-orange-800",
      features: [
        "Return & Exchange Address",
        "Marketplace Compliance",
        "Multi-Channel Presence",
      ],
      link: "/usecase/virtual-office-for-ecommerce",
    },
    {
      id: "events",
      title: "Virtual Office for Events & Conferences",
      description:
        "Establish your event management company with professional infrastructure for conferences, corporate events, and celebrations.",
      icon: <Building className="w-6 h-6 text-pink-600" />,
      badge: "For Events",
      badgeColor: "bg-pink-100 text-pink-800",
      features: [
        "Event Coordination Hub",
        "Client Meeting Spaces",
        "Multi-City Presence",
      ],
      link: "/usecase/virtual-office-for-events",
    },
    {
      id: "renewable-energy",
      title: "Virtual Office for Renewable Energy",
      description:
        "Launch your renewable energy company with MNRE registration, project approvals, and complete infrastructure support.",
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      badge: "For Energy",
      badgeColor: "bg-yellow-100 text-yellow-800",
      features: [
        "MNRE Registration",
        "Project Approvals",
        "Multi-State Operations",
      ],
      link: "/usecase/virtual-office-for-renewable-energy",
    },
    {
      id: "healthcare",
      title: "Virtual Office for Healthcare",
      description:
        "Establish your healthcare company with CDSCO registration, drug licensing, and pharmaceutical compliance support.",
      icon: <Shield className="w-6 h-6 text-red-600" />,
      badge: "For Healthcare",
      badgeColor: "bg-red-100 text-red-800",
      features: [
        "CDSCO Registration",
        "Drug Licensing",
        "Regulatory Compliance",
      ],
      link: "/usecase/virtual-office-for-healthcare",
    },
    {
      id: "hospitality",
      title: "Virtual Office for Hospitality & Tourism",
      description:
        "Launch your tourism business with professional infrastructure, hotel licensing, and guest credibility support.",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      badge: "For Tourism",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "Tourism Licensing",
        "Multi-Property Management",
        "Guest Credibility",
      ],
      link: "/usecase/virtual-office-for-hospitality",
    },
    {
      id: "construction",
      title: "Virtual Office for Construction",
      description:
        "Build your construction company with PWD registration, project licensing, and government contract credibility.",
      icon: <Building className="w-6 h-6 text-gray-600" />,
      badge: "For Construction",
      badgeColor: "bg-gray-100 text-gray-800",
      features: [
        "PWD Registration",
        "Government Contracts",
        "Multi-Site Coordination",
      ],
      link: "/usecase/virtual-office-for-construction",
    },
    {
      id: "import-export",
      title: "Virtual Office for Import Export",
      description:
        "Launch your trading business with DGFT registration, IEC code support, and global trade infrastructure.",
      icon: <Globe className="w-6 h-6 text-indigo-600" />,
      badge: "For Trading",
      badgeColor: "bg-indigo-100 text-indigo-800",
      features: [
        "DGFT Registration",
        "IEC Code Support",
        "Global Trade Support",
      ],
      link: "/usecase/virtual-office-for-import-export",
    },
    {
      id: "food-beverage",
      title: "Virtual Office for Food & Beverage",
      description:
        "Establish your food business with FSSAI registration, restaurant licensing, and multi-outlet management support.",
      icon: <Building className="w-6 h-6 text-green-600" />,
      badge: "For Food",
      badgeColor: "bg-green-100 text-green-800",
      features: [
        "FSSAI Registration",
        "Restaurant Licensing",
        "Multi-Outlet Support",
      ],
      link: "/usecase/virtual-office-for-food-beverage",
    },
    {
      id: "manufacturing",
      title: "Virtual Office for Manufacturing",
      description:
        "Build your manufacturing company with industrial licensing, quality certifications, and supply chain coordination.",
      icon: <Building className="w-6 h-6 text-slate-600" />,
      badge: "For Manufacturing",
      badgeColor: "bg-slate-100 text-slate-800",
      features: [
        "Industrial Licensing",
        "Quality Certifications",
        "Supply Chain Support",
      ],
      link: "/usecase/virtual-office-for-manufacturing",
    },
    {
      id: "saas-founders",
      title: "Virtual Office for SaaS Founders",
      description:
        "Launch and scale your SaaS business with professional infrastructure. Get payment gateway approvals, enterprise credibility, and global compliance support.",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      badge: "For SaaS",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "Payment Gateway Ready",
        "Enterprise Credibility",
        "Global Compliance",
      ],
      link: "/usecase/virtual-office-for-saas-founders",
    },
    {
      id: "remote-creative-agency",
      title: "Virtual Office for Remote Creative Agency",
      description:
        "Build a credible creative agency with professional addresses in Mumbai's Bandra, Delhi's Hauz Khas, or Bangalore's Koramangala.",
      icon: <Building className="w-6 h-6 text-purple-600" />,
      badge: "For Creative",
      badgeColor: "bg-purple-100 text-purple-800",
      features: [
        "Creative Hub Locations",
        "Presentation Spaces",
        "Brand Registration",
      ],
      link: "/usecase/virtual-office-for-remote-creative-agency",
    },
    {
      id: "foreign-sme-entry",
      title: "Foreign SME India Entry Desk",
      description:
        "Establish your foreign SME in India with professional virtual office solutions. Complete FEMA compliance, RBI support, and local presence.",
      icon: <Globe className="w-6 h-6 text-green-600" />,
      badge: "Foreign SME",
      badgeColor: "bg-green-100 text-green-800",
      features: ["FEMA Compliance", "RBI Support", "Local Presence"],
      link: "/usecase/virtual-office-for-foreign-sme-entry-desk",
    },
    {
      id: "fintech-startup",
      title: "Virtual Office for FinTech Startup",
      description:
        "Launch your FinTech startup with professional addresses in Mumbai's BKC, Delhi's financial district. Get RBI compliance support and banking partnerships.",
      icon: <Building className="w-6 h-6 text-blue-600" />,
      badge: "For FinTech",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "RBI Compliance",
        "Banking Partnerships",
        "Financial District Presence",
      ],
      link: "/usecase/virtual-office-for-fintech-startup",
    },
    {
      id: "ngo-foundation",
      title: "Virtual Office for NGO & Foundation",
      description:
        "Register your NGO or Foundation with professional virtual office solutions. Get Section 8 registration, 80G tax exemption, and donor credibility.",
      icon: <Users className="w-6 h-6 text-red-600" />,
      badge: "For NGO",
      badgeColor: "bg-red-100 text-red-800",
      features: [
        "Section 8 Registration",
        "80G Tax Exemption",
        "Donor Credibility",
      ],
      link: "/usecase/virtual-office-for-ngo-foundation",
    },
    {
      id: "recruitment-outsourcer",
      title: "Virtual Office for Recruitment Process Outsourcer",
      description:
        "Launch your recruitment agency with professional virtual office solutions. Get staffing licenses, interview facilities, and enterprise credibility.",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      badge: "For RPO",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "Staffing Licenses",
        "Interview Facilities",
        "Enterprise Credibility",
      ],
      link: "/usecase/virtual-office-for-recruitment-process-outsourcer",
    },
    {
      id: "seasonal-event-management",
      title: "Virtual Office for Seasonal Event Management",
      description:
        "Launch your event management company with professional virtual office solutions. Perfect for wedding planners, corporate event organizers, and festival management companies.",
      icon: <Building className="w-6 h-6 text-purple-600" />,
      badge: "For Events",
      badgeColor: "bg-purple-100 text-purple-800",
      features: [
        "Event Licensing",
        "Client Meeting Spaces",
        "Year-Round Presence",
      ],
      link: "/usecase/virtual-office-for-seasonal-event-management",
    },
    {
      id: "company-registration",
      title: "Virtual Office for Company Registration",
      description:
        "Register your private limited company, OPC, or LLP with professional registered office address and complete ROC filing support.",
      icon: <Building className="w-6 h-6 text-blue-600" />,
      badge: "Registration",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "ROC Filing Support",
        "MCA Compliance",
        "Fast-track Registration",
      ],
      link: "/purpose/virtual-office-for-company-registration",
    },
    {
      id: "gst-registration",
      title: "Virtual Office for GST Registration",
      description:
        "Get your GSTIN certificate with professional business address and complete GST compliance support.",
      icon: <Receipt className="w-6 h-6 text-green-600" />,
      badge: "GST Filing",
      badgeColor: "bg-green-100 text-green-800",
      features: [
        "GSTIN Certificate",
        "Pre-verified Address",
        "Compliance Support",
      ],
      link: "/purpose/virtual-office-for-gst-registration",
    },
    {
      id: "bank-account",
      title: "Virtual Office for Bank Account Formation",
      description:
        "Open corporate bank accounts with professional business address and complete documentation support.",
      icon: <Landmark className="w-6 h-6 text-blue-600" />,
      badge: "Banking",
      badgeColor: "bg-blue-100 text-blue-800",
      features: [
        "Corporate Banking",
        "RBI Compliant Address",
        "Multi-bank Support",
      ],
      link: "/purpose/virtual-office-for-bank-account-formation",
    },
    {
      id: "msme-registration",
      title: "Virtual Office for MSME Registration",
      description:
        "Register your MSME with professional business address and access government schemes and benefits.",
      icon: <Factory className="w-6 h-6 text-orange-600" />,
      badge: "MSME",
      badgeColor: "bg-orange-100 text-orange-800",
      features: ["Udyam Registration", "Government Benefits", "Scheme Access"],
      link: "/purpose/virtual-office-for-msme-registration",
    },
    {
      id: "llp-registration",
      title: "Virtual Office for LLP Registration",
      description:
        "Register your Limited Liability Partnership with professional business address and complete legal documentation.",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      badge: "LLP",
      badgeColor: "bg-purple-100 text-purple-800",
      features: [
        "LLP Agreement",
        "Limited Liability",
        "Professional Structure",
      ],
      link: "/purpose/virtual-office-for-llp-registration",
    },
    {
      id: "google-my-business",
      title: "Virtual Office for Google My Business",
      description:
        "Setup and verify your Google My Business listing with professional business address for enhanced local SEO.",
      icon: <Search className="w-6 h-6 text-red-600" />,
      badge: "Local SEO",
      badgeColor: "bg-red-100 text-red-800",
      features: [
        "GMB Verification",
        "Local Search Rankings",
        "Business Visibility",
      ],
      link: "/purpose/virtual-office-for-google-my-business-registration",
    },
  ];

  return (
    <div className="relative">
      {/* Slider */}
      <div className="overflow-hidden mb-6" ref={emblaRef}>
        <div className="flex">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex-[0_0_90%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-3 md:pl-4"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 min-h-[340px] sm:min-h-[360px] flex flex-col">
                {/* Header */}
                <div className="p-3 sm:p-5">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                      {service.icon}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${service.badgeColor}`}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                </div>

                {/* Features - flex grow to fill available space */}
                <div className="px-3 sm:px-5 mb-3 flex-grow">
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-xs sm:text-sm text-gray-600"
                      >
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttons - fixed at bottom */}
                <div className="p-3 sm:p-5 pt-0 sm:pt-0 mt-auto">
                  <div className="flex gap-2">
                    <Link href={service.link} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm py-2 h-8 sm:h-9">
                        Learn More
                      </Button>
                    </Link>
                    <Dialog
                      open={openDialogId === service.id}
                      onOpenChange={(open) =>
                        setOpenDialogId(open ? service.id : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 text-xs sm:text-sm border-gray-300 hover:border-gray-400 py-2 h-8 sm:h-9"
                        >
                          Get Quote
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader className="sr-only">
                          <DialogTitle>Quote Form</DialogTitle>
                        </DialogHeader>
                        <ContactForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Moved below */}
      <div className="flex justify-center">
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-full border transition-all ${
              canScrollPrev
                ? "border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800"
                : "border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-full border transition-all ${
              canScrollNext
                ? "border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800"
                : "border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { currentLocation, isLoading, error, allLocations } = useLocation();
  const [, setLocation] = useWouterLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [showAllCities, setShowAllCities] = useState(false);

  // Memoize popular and other cities for performance
  const popularCities = useMemo(
    () =>
      allLocations.filter((location) =>
        topIndianCities.includes(location.name),
      ),
    [allLocations],
  );

  const otherCities = useMemo(
    () =>
      allLocations.filter(
        (location) => !topIndianCities.includes(location.name),
      ),
    [allLocations],
  );

  // Don't automatically redirect - let users stay on the city selector page

  // Memoize filtered locations for performance
  const filteredLocations = useMemo(
    () =>
      searchTerm
        ? allLocations.filter((location) =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : allLocations,
    [searchTerm, allLocations],
  );

  // Memoize filtered all cities for performance
  const filteredAllCities = useMemo(
    () =>
      citySearchTerm
        ? allLocations.filter((location) =>
            location.name.toLowerCase().includes(citySearchTerm.toLowerCase()),
          )
        : allLocations,
    [citySearchTerm, allLocations],
  );

  // Determine which cities to display (limit to 24 initially unless showing all or searching)
  const citiesToDisplay = useMemo(
    () =>
      citySearchTerm || showAllCities
        ? filteredAllCities
        : filteredAllCities.slice(0, 24),
    [citySearchTerm, showAllCities, filteredAllCities],
  );

  const hasMoreCities =
    !citySearchTerm && !showAllCities && filteredAllCities.length > 24;

  // Only show loading indicator if actively detecting location
  if (isLoading) {
    return (
      <div className="min-h-screen p-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Virtual Offices
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Detecting your location...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleCityClick = (location: Location) => {
    // Save to localStorage first
    try {
      localStorage.setItem("virtualoffice_location", JSON.stringify(location));
    } catch (err) {
      console.error("Failed to save location to localStorage:", err);
    }

    // Navigate directly
    window.location.href = `/${location.slug}`;
  };

  const scrollToHero = () => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Memoized city grid component for better performance
  const renderCityGrid = useMemo(
    () => (cities: Location[]) => {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cities.map((location: Location) => {
            const IconComponent = getCityIcon(location.name);
            return (
              <div
                key={location.id}
                onClick={() => handleCityClick(location)}
                className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-all text-center cursor-pointer"
              >
                <div className="mb-2 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm">{location.name}</span>
              </div>
            );
          })}
        </div>
      );
    },
    [],
  );

  const renderCitySearch = () => {
    return (
      <div className="w-full mt-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2"
          />
        </div>

        {searchTerm ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredLocations.map((location) => (
              <Button
                key={location.id}
                variant="outline"
                onClick={() => handleCityClick(location)}
                className="text-left justify-start py-3 px-4 h-auto hover:bg-gray-50 hover:border-primary"
              >
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>{location.name}</span>
              </Button>
            ))}
          </div>
        ) : null}

        {searchTerm && filteredLocations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No cities found matching "{searchTerm}"
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO isHomePage={true} />
      <Navbar />

      {/* Hero Section - Updated */}
      <section
        id="hero-section"
        className="py-4 md:py-6 bg-gradient-to-br from-blue-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-12">
            {/* Left Column - Text Content */}
            <div className="lg:w-2/3 text-center lg:text-left mb-6 lg:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
                #1 Virtual Office Provider in
                <span className="text-blue-600"> India</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 md:mb-6 leading-relaxed">
                From Business Address, GST, MCA and Bank. One Stop Platform for
                getting VO in India.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-4 md:mb-6">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    const citySection = document.getElementById(
                      "choose-city-section",
                    );
                    if (citySection) {
                      citySection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  data-testid="button-get-started"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-4 text-base sm:text-lg rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                  asChild
                  data-testid="button-call-phone"
                >
                  <a href="tel:+919270409255" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>+91 92704 09255</span>
                  </a>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm sm:text-base text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    Authorised GSTP: 27AAOCS1234A1Z5
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VO Strip Section - Inspired by Razorpay */}
      <section className="hidden md:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-700">
                  I'm here to
                </span>
              </div>

              <Link
                href="/delhi"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap font-medium px-3 py-1 border border-gray-300 rounded-full hover:border-blue-600"
              >
                Get VO in Delhi
              </Link>

              <Link
                href="/mumbai"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap font-medium px-3 py-1 border border-gray-300 rounded-full hover:border-blue-600"
              >
                Get VO in Mumbai
              </Link>

              <Link
                href="/bangalore"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap font-medium px-3 py-1 border border-gray-300 rounded-full hover:border-blue-600"
              >
                Get VO in Bangalore
              </Link>

              <Link
                href="/usecase/virtual-office-for-tech-startups"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap font-medium px-3 py-1 border border-gray-300 rounded-full hover:border-blue-600"
              >
                for Tech Startup
              </Link>

              <Link
                href="/usecase/virtual-office-for-ecommerce"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap font-medium px-3 py-1 border border-gray-300 rounded-full hover:border-blue-600"
              >
                for Ecommerce
              </Link>

              <div className="hidden lg:block text-sm text-gray-400 italic ml-8">
                //Find the best virtual office for your business
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="w-full bg-white py-8 border-t border-b border-gray-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-5">
            <h2 className="text-3xl text-gray-900 font-bold mb-1 leading-tight">
              Our Clients
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto my-3 rounded-sm"></div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We have successfully served over 10,000 businesses
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-linear"
              style={{
                animation: "scroll-logos 20s linear infinite",
                width: "calc(200% + 96px)", // Double width for seamless loop
              }}
            >
              {/* First set of logos */}
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/Airtel-logo.png?v=1744191898"
                  alt="AIRTEL"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/godrej-logo-191FB61A1F-seeklogo.com.png?v=1723541004"
                  alt="GODREJ"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/TATA_1mg_Logo.png?v=1749482060"
                  alt="TATA1MG"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/8.png?v=1723630722"
                  alt="ZUARI"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/MANKIND.NS_BIG-e2edbe6b.png?v=1740139347"
                  alt="MANKIND"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/haldirams-logo_1.png?v=1723630841"
                  alt="HALDIRAM"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://thegstco.com/cdn/shop/files/Milton_Logo_x38.png?v=1719050580"
                  alt="MILTON"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/5849356.png?v=1723011064"
                  alt="AVON CYCLES"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/1473406729waree-final.png?v=1728900708"
                  alt="WAAREE"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://thegstco.com/cdn/shop/files/mamaearth-logo_x38.png?v=1706364685"
                  alt="MAMAEARTH"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/cocoblu-logo.png?v=1723009856"
                  alt="COCOBLU"
                />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/Airtel-logo.png?v=1744191898"
                  alt="AIRTEL"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/godrej-logo-191FB61A1F-seeklogo.com.png?v=1723541004"
                  alt="GODREJ"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/TATA_1mg_Logo.png?v=1749482060"
                  alt="TATA1MG"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/8.png?v=1723630722"
                  alt="ZUARI"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/MANKIND.NS_BIG-e2edbe6b.png?v=1740139347"
                  alt="MANKIND"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/haldirams-logo_1.png?v=1723630841"
                  alt="HALDIRAM"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://thegstco.com/cdn/shop/files/Milton_Logo_x38.png?v=1719050580"
                  alt="MILTON"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/5849356.png?v=1723011064"
                  alt="AVON CYCLES"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/1473406729waree-final.png?v=1728900708"
                  alt="WAAREE"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://thegstco.com/cdn/shop/files/mamaearth-logo_x38.png?v=1706364685"
                  alt="MAMAEARTH"
                />
              </div>
              <div className="flex items-center justify-center min-w-[180px] h-15 mx-6">
                <img
                  className="max-w-full max-h-12 object-contain"
                  src="https://cdn.shopify.com/s/files/1/0704/3704/4519/files/cocoblu-logo.png?v=1723009856"
                  alt="COCOBLU"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <p className="text-sm text-gray-500">And many more leading MSMEs</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Why Choose Us
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of businesses across India for reliable
              virtual office solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Authorised GST Practitioners */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Authorised GST Practitioners
              </h3>
              <p className="text-sm text-gray-600">
                Certified professionals ensuring compliant GST registration and
                documentation
              </p>
            </div>

            {/* Reputed Space Partners */}
            <div className="hidden sm:block text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Owned & Operated Spaces
              </h3>
              <p className="text-sm text-gray-600">
                We do not work with any third party space providers.
              </p>
            </div>

            {/* Lowest Prices & Fast Approvals */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Lowest Prices & Fast Approvals
              </h3>
              <p className="text-sm text-gray-600">
                Competitive pricing with quick turnaround times for all services
              </p>
            </div>

            {/* End to End Local Support */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                End to End Local Support
              </h3>
              <p className="text-sm text-gray-600">
                Dedicated assistance from setup to ongoing business requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Transparent Pricing Plans and Deliverables <br />
              (No Extra Charges / No Add Ons / No Up Sells)
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Our Starting Prices are the Lowest Ever! Paired with 10 Minutes
              Delivery in Select Cities.
            </p>
          </div>

          {/* Mobile-first responsive pricing table */}
          <div className="hidden lg:block">
            {/* Desktop Table */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse">
                  <colgroup>
                    <col className="w-2/5 md:w-1/2" />
                    <col className="w-1/5" />
                    <col className="w-1/5" />
                    <col className="w-1/5" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-6 text-left">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            Compare Features
                          </h3>
                          <p className="text-sm text-gray-600 font-normal">
                            Select the plan that best fits your business needs
                          </p>
                        </div>
                      </th>
                      <th className="bg-gradient-to-br from-blue-50 to-blue-100 px-8 py-6 text-center border-l-2 border-white">
                        <div className="space-y-3">
                          <span className="inline-block text-xs font-bold text-blue-700 bg-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
                            Starts from
                          </span>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              Business Address
                            </h3>
                            <div className="mt-2">
                              <span className="text-3xl font-bold text-blue-600">
                                ₹4900
                              </span>
                              <span className="text-gray-600">/Year</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Good for Independent Consultants, Freelancers
                              operating from Home
                            </p>
                          </div>
                        </div>
                      </th>
                      <th className="bg-gradient-to-br from-green-50 to-green-100 px-8 py-6 text-center border-l-2 border-white">
                        <div className="space-y-3">
                          <span className="inline-block text-xs font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full uppercase tracking-wider">
                            Starts from
                          </span>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              VO for GST Registration
                            </h3>
                            <div className="mt-2">
                              <span className="text-3xl font-bold text-green-600">
                                ₹7900
                              </span>
                              <span className="text-gray-600">/Year</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Ideal for Existing Companies, Ecommerce Sellers,
                              Energy, Infra or Tourism Industry
                            </p>
                          </div>
                        </div>
                      </th>
                      <th className="bg-gradient-to-br from-orange-50 to-orange-100 px-8 py-6 text-center border-l-2 border-white">
                        <div className="space-y-3">
                          <span className="inline-block text-xs font-bold text-orange-700 bg-orange-200 px-3 py-1 rounded-full uppercase tracking-wider">
                            Starts from
                          </span>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              VO for Company
                            </h3>
                            <div className="mt-2">
                              <span className="text-3xl font-bold text-orange-600">
                                ₹8900
                              </span>
                              <span className="text-gray-600">/Year</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed break-words">
                              Ideal for Forming an Entity
                              <br />
                              <span className="text-xs">
                                (Proprietorship/Partnership/
                                <br />
                                Trust/LLP/OPC/Pvt Ltd)
                              </span>
                            </p>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <Building className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Address Usage Rights (Use Address on Letterhead,
                            Visiting Cards, Website)
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Rent Agreement as per State's Rent Control Act
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <Receipt className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Advance GST Application, SCN Filing & Approval (No
                            Extra Charges)
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <Briefcase className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Register an Entity
                            (Proprietorship/Partnership/Trust/LLP/OPC/Pvt Ltd)
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <Landmark className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Bank Account Formation and Bank Verification
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <Users className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>On Ground Support + Representative</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <Cloud className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Cloud Storage Plan - every registered taxable person
                            must maintain the accounts books and records Section
                            36 of the CGST Act, 2017
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <Square className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Permanent Basic Sign Board - Compliant with GST/RBI
                            and MCA Acts
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <X className="w-6 h-6 text-red-400 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <HomeIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Registered on Owned Properties - SingleSetup
                            Verified and Controlled
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 text-base text-gray-900 font-medium">
                        <div className="flex items-start">
                          <Tag className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            Exclusive Discounts on Meeting Rooms and Dedicated
                            Desks
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center bg-blue-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-green-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                      <td className="px-8 py-5 text-center bg-orange-50/30">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                      <td className="px-8 py-6 align-middle">
                        <div className="text-left">
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                            Total Features
                          </p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">
                            10 Benefits
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="space-y-3">
                          <div className="text-xs text-gray-600">
                            <span className="font-bold text-green-600">3</span>{" "}
                            Features Included
                          </div>
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                            data-testid="button-choose-business-address"
                            onClick={scrollToHero}
                          >
                            Choose Plan
                          </Button>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="space-y-3">
                          <div className="text-xs text-gray-600">
                            <span className="font-bold text-green-600">8</span>{" "}
                            Features Included
                          </div>
                          <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                            data-testid="button-choose-vo-gst"
                            onClick={scrollToHero}
                          >
                            Choose Plan
                          </Button>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="space-y-3">
                          <div className="text-xs text-gray-600">
                            <span className="font-bold text-green-600">10</span>{" "}
                            Features Included
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                            data-testid="button-choose-vo-company"
                            onClick={scrollToHero}
                          >
                            Choose Plan
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {/* Business Address Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 text-center">
                <span className="text-yellow-200 text-xs font-medium bg-blue-800 px-2 py-1 rounded-full mb-2 inline-block">
                  IDEAL FOR FREELANCERS
                </span>
                <h3 className="text-xl font-bold mb-1">Business Address</h3>
                <p className="text-blue-100 text-sm">
                  Starts from ₹3900 / 6 Months
                </p>
                <p className="text-xs text-blue-200 mt-2">
                  Perfect for individuals starting their journey
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    What's Included:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Address Usage Rights
                        </p>
                        <p className="text-xs text-gray-600">
                          Use address on letterhead, visiting cards, and website
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Owned Properties
                        </p>
                        <p className="text-xs text-gray-600">
                          SingleSetup verified and controlled locations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Meeting Room Discounts
                        </p>
                        <p className="text-xs text-gray-600">
                          Exclusive rates for meeting rooms and dedicated desks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Not Included:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Rent Agreement
                      </span>
                    </div>
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        GST Registration Support
                      </span>
                    </div>
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Entity Registration
                      </span>
                    </div>
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Bank Account Support
                      </span>
                    </div>
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        On Ground Support
                      </span>
                    </div>
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Cloud Storage Plan
                      </span>
                    </div>
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Permanent Basic Sign Board
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-choose-business-address-mobile"
                  onClick={scrollToHero}
                >
                  Choose Plan
                </Button>
              </div>
            </div>

            {/* VO for GST Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 text-center">
                <span className="text-yellow-200 text-xs font-medium bg-green-800 px-2 py-1 rounded-full mb-2 inline-block">
                  IDEAL FOR BUSINESSES
                </span>
                <h3 className="text-xl font-bold mb-1">VO for GST</h3>
                <p className="text-green-100 text-sm">Starts from ₹7900/Year</p>
                <p className="text-xs text-green-200 mt-2">
                  Complete GST compliance solution for businesses
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    What's Included:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Address Usage Rights
                        </p>
                        <p className="text-xs text-gray-600">
                          Use address on all business materials
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Rent Agreement
                        </p>
                        <p className="text-xs text-gray-600">
                          As per State's Rent Control Act
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          GST Application Support
                        </p>
                        <p className="text-xs text-gray-600">
                          Advance SCN filing & approval at no extra charges
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          On Ground Support
                        </p>
                        <p className="text-xs text-gray-600">
                          Representative available for assistance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Cloud Storage Plan
                        </p>
                        <p className="text-xs text-gray-600">
                          Compliant with Section 36 of CGST Act 2017
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Permanent Basic Sign Board
                        </p>
                        <p className="text-xs text-gray-600">
                          Permanent sign board compliant with GST/RBI/MCA Acts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Owned Properties
                        </p>
                        <p className="text-xs text-gray-600">
                          SingleSetup verified locations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Meeting Room Discounts
                        </p>
                        <p className="text-xs text-gray-600">
                          Exclusive rates for meeting spaces
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Not Included:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Entity Registration
                      </span>
                    </div>
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        Bank Account Support
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-choose-vo-gst-mobile"
                  onClick={scrollToHero}
                >
                  Choose Plan
                </Button>
              </div>
            </div>

            {/* VO for Company Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 text-center">
                <span className="text-yellow-200 text-xs font-medium bg-orange-800 px-2 py-1 rounded-full mb-2 inline-block">
                  IDEAL FOR COMPANIES
                </span>
                <h3 className="text-xl font-bold mb-1">VO for Company</h3>
                <p className="text-orange-100 text-sm">
                  Starts from ₹8900/Year
                </p>
                <p className="text-xs text-orange-200 mt-2">
                  Everything you need to establish and run your company
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-3 rounded-lg mb-4">
                  <p className="text-sm font-semibold text-orange-900">
                    ✨ All-Inclusive Package
                  </p>
                  <p className="text-xs text-orange-700 mt-1">
                    Complete business setup with all 10 features included
                  </p>
                </div>

                <div className="pb-3">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Everything Included:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Complete Business Registration
                        </p>
                        <p className="text-xs text-gray-600">
                          Register Proprietorship, Partnership, Trust, LLP, OPC,
                          or Pvt Ltd
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Bank Account Formation
                        </p>
                        <p className="text-xs text-gray-600">
                          Complete support with bank verification
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          GST Registration
                        </p>
                        <p className="text-xs text-gray-600">
                          Complete GST application, SCN filing & approval
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Legal Documentation
                        </p>
                        <p className="text-xs text-gray-600">
                          Rent agreement as per State's Rent Control Act
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          On-Ground Support
                        </p>
                        <p className="text-xs text-gray-600">
                          Dedicated representative for all your needs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Cloud Storage & Compliance
                        </p>
                        <p className="text-xs text-gray-600">
                          Maintain records as per Section 36 of CGST Act
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Permanent Basic Sign Board
                        </p>
                        <p className="text-xs text-gray-600">
                          GST/RBI/MCA compliant signage
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Premium Benefits
                        </p>
                        <p className="text-xs text-gray-600">
                          Meeting room discounts & dedicated desk access
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 mt-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-choose-vo-company-mobile"
                  onClick={scrollToHero}
                >
                  Choose Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-500 mr-2" />
                <span>No Hidden Charges</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-500 mr-2" />
                <span>Quick Setup</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                <span>MCA / GST Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Selection - Mobile Friendly */}
      <section id="choose-city-section" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Virtual Office for GST Registration in India
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4 max-w-2xl mx-auto">
              Select your business location from India's major cities
            </p>
          </div>

          {/* Popular Cities Grid - Mobile Optimized */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 md:mb-12 max-w-4xl mx-auto">
            {popularCities.map((location: Location) => (
              <Card
                key={location.id}
                onClick={() => handleCityClick(location)}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 p-4 sm:p-5 text-center border-0 shadow-sm hover:scale-105 bg-white w-24 sm:w-28 md:w-32"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
                  {(() => {
                    const IconComponent = getCityIcon(location.name);
                    return (
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    );
                  })()}
                </div>
                <div className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
                  {location.name}
                </div>
              </Card>
            ))}
          </div>

          {/* All Cities List - Enhanced Design with Search - HIDDEN */}
          {/* 
          <div className="mb-6 md:mb-8">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Virtual Office in All Major Cities
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                Click on any city to get started
              </p>
            </div>

            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6 md:mb-8">
                  <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search cities..."
                      value={citySearchTerm}
                      onChange={(e) => setCitySearchTerm(e.target.value)}
                      className="pl-12 py-4 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg"
                    />
                  </div>
                  {citySearchTerm && (
                    <div className="text-center mt-3">
                      <p className="text-sm text-gray-600 font-medium">
                        {filteredAllCities.length} cities found
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                  {citiesToDisplay.map((location) => (
                    <div
                      key={location.id}
                      onClick={() => handleCityClick(location)}
                      className="flex items-center justify-center p-3 md:p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all cursor-pointer bg-white hover:bg-blue-50 group text-center"
                    >
                      <span className="text-sm md:text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                        {location.name}
                      </span>
                    </div>
                  ))}
                </div>

                {!citySearchTerm && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllCities(!showAllCities)}
                      className="px-6 py-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                    >
                      {showAllCities ? (
                        <>Show Less Cities</>
                      ) : (
                        <>Show All {allLocations.length} Cities</>
                      )}
                    </Button>
                  </div>
                )}

                {filteredAllCities.length === 0 && citySearchTerm && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      No cities found
                    </h4>
                    <p className="text-xs text-gray-500">
                      Try searching with a different term
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500">
                    {citySearchTerm
                      ? `${filteredAllCities.length} of ${allLocations.length} cities shown`
                      : showAllCities
                        ? `All ${allLocations.length} cities available across India`
                        : `Showing 24 of ${allLocations.length} cities available across India`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          */}

          {/* Search - Mobile Optimized */}
          <div className="max-w-sm sm:max-w-md mx-auto px-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>

            {searchTerm && (
              <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredLocations.slice(0, 6).map((location) => (
                  <Button
                    key={location.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleCityClick(location)}
                    className="text-left justify-start text-xs sm:text-sm"
                  >
                    {location.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specialized Services Section - Slider */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Specialized Services for Every Business Type
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our tailored virtual office solutions designed
              specifically for different business models and industries.
            </p>
          </div>

          <SpecializedServicesSlider />
        </div>
      </section>

      {/* Zoho Consultation Form */}

      {/* Why Choose Us - Mobile Optimized */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-2 leading-tight">
              Everything You Need to Start Your Business
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Complete business support from registration to banking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Premium Address */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-blue-200 transition-colors">
                <Building className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <h3 className="font-bold mb-3 text-lg sm:text-xl text-gray-900">
                Premium Address
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Low cost business address in prime locations across major Indian
                cities
              </p>
            </div>

            {/* GST and MCA Support */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-green-200 transition-colors">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              </div>
              <h3 className="font-bold mb-3 text-lg sm:text-xl text-gray-900">
                GST and MCA Support
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                No extra compliance fees. Our in-house experts handle your
                application process
              </p>
            </div>

            {/* Bank Account Opening Support */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-all duration-300 group md:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-purple-200 transition-colors">
                <HandshakeIcon className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
              </div>
              <h3 className="font-bold mb-3 text-lg sm:text-xl text-gray-900">
                Bank Account Opening
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Complete assistance with business bank account setup and
                documentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Updates & Alerts Section */}
      <UpdatesAlertsSection />

      <Footer location={null} />
      <MobileContactButton />
    </div>
  );
}
