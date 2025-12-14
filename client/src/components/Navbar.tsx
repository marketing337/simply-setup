import { useState, useEffect, useRef } from "react";
import { Link, useLocation as useWouterLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
  Rocket,
  Briefcase,
  User,
  ShoppingCart,
  Building,
  FileText,
  Landmark,
  Users,
  Search,
  Globe,
  Copyright,
  Factory,
  Sprout,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Location } from "@shared/schema";
import { useLocation as useCurrentLocation } from "@/hooks/useLocation";
import { useCountry } from "@/contexts/CountryContext";
import CitySelector from "@/components/CitySelector";
import ContactForm from "@/components/ContactForm";
// Using direct SVG URLs for better quality logos
const mobileLogoUrl =
  "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/t_6_3fb247ca-e5df-4fb1-832a-1fbfdd3a3eea.svg?v=1748523564";
const desktopLogoUrl =
  "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/t_3_163fe7fe-96f9-4e72-94e9-3a2ee64e77a2.svg?v=1748517470";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [pathLocation] = useWouterLocation();
  const { currentLocation } = useCurrentLocation();
  const { country, countryName, basePath } = useCountry();
  const [isCityPage, setIsCityPage] = useState(false);
  const [officesMenuOpen, setOfficesMenuOpen] = useState(false);
  const [useCaseMenuOpen, setUseCaseMenuOpen] = useState(false);
  const [purposeMenuOpen, setPurposeMenuOpen] = useState(false);
  const [virtualOfficeMenuOpen, setVirtualOfficeMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const officesMenuRef = useRef<HTMLDivElement>(null);
  const useCaseMenuRef = useRef<HTMLDivElement>(null);
  const purposeMenuRef = useRef<HTMLDivElement>(null);
  const virtualOfficeMenuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const countryMenuRef = useRef<HTMLDivElement>(null);

  // Fetch all locations for the megamenu (India only)
  const { data: locations = [] } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
    enabled: country === "IN",
  });

  // Fetch all services for the services megamenu
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
  });

  // Singapore locations (static for now)
  const singaporeLocations = [
    { name: "Raffles Place", slug: "raffles-place" },
    { name: "Orchard Road", slug: "orchard-road" },
    { name: "Marina Bay", slug: "marina-bay" },
    { name: "Tanjong Pagar", slug: "tanjong-pagar" },
    { name: "Jurong East", slug: "jurong-east" },
    { name: "Bugis", slug: "bugis" },
  ];

  // Check if current page is a city page
  useEffect(() => {
    // City pages follow the pattern /:location without deeper nesting
    // e.g., /mumbai, /delhi, /bangalore, etc.
    // We need to exclude specific paths that aren't city pages
    const locationRegex = /^\/[a-z\-]+$/;
    const isExcludedPath = [
      "/blog",
      "/admin",
      "/login",
      "/workspaces",
      "/contact",
      "/about",
      "/usecase",
    ].includes(pathLocation);

    // It's a city page if it matches the pattern and is not in the excluded list
    setIsCityPage(locationRegex.test(pathLocation) && !isExcludedPath);
  }, [pathLocation]);

  // Close the menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        officesMenuRef.current &&
        !officesMenuRef.current.contains(event.target as Node)
      ) {
        setOfficesMenuOpen(false);
      }
      if (
        useCaseMenuRef.current &&
        !useCaseMenuRef.current.contains(event.target as Node)
      ) {
        setUseCaseMenuOpen(false);
      }
      if (
        purposeMenuRef.current &&
        !purposeMenuRef.current.contains(event.target as Node)
      ) {
        setPurposeMenuOpen(false);
      }
      if (
        virtualOfficeMenuRef.current &&
        !virtualOfficeMenuRef.current.contains(event.target as Node)
      ) {
        setVirtualOfficeMenuOpen(false);
      }
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node)
      ) {
        setServicesMenuOpen(false);
      }
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
      if (
        countryMenuRef.current &&
        !countryMenuRef.current.contains(event.target as Node)
      ) {
        setCountryMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Disable body scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scrolling is restored
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Use case data for the megamenu
  const useCases = [
    {
      id: "tech-startups",
      title: "Tech Startups",
      description: "Launch your startup with professional presence",
      icon: <Rocket className="h-5 w-5 text-blue-600" />,
      href: "/usecase/virtual-office-for-tech-startups",
    },
    {
      id: "consultants",
      title: "Consultants",
      description: "Establish your consulting practice",
      icon: <Briefcase className="h-5 w-5 text-purple-600" />,
      href: "/usecase/virtual-office-for-consultants",
    },
    {
      id: "freelancers",
      title: "Freelancers",
      description: "Transform your freelance work into a business",
      icon: <User className="h-5 w-5 text-emerald-600" />,
      href: "/usecase/virtual-office-for-freelancers",
    },
    {
      id: "ecommerce",
      title: "E-commerce",
      description: "Professional address for online sellers",
      icon: <ShoppingCart className="h-5 w-5 text-orange-600" />,
      href: "/usecase/virtual-office-for-ecommerce",
    },
  ];

  // Registration-focused services for the "By Purpose" dropdown
  const purposeServices = [
    {
      id: "company-registration",
      title: "Company Registration",
      description:
        "Register your private limited company, OPC, or LLP with complete ROC filing support",
      icon: <Building className="h-5 w-5 text-blue-600" />,
      href: "/purpose/virtual-office-for-company-registration",
    },
    {
      id: "gst-registration",
      title: "GST Registration",
      description:
        "Get your GSTIN certificate with professional business address",
      icon: <FileText className="h-5 w-5 text-green-600" />,
      href: "/purpose/virtual-office-for-gst-registration",
    },
    {
      id: "bank-account",
      title: "Bank Account Opening",
      description:
        "Open corporate bank accounts with complete documentation support",
      icon: <Landmark className="h-5 w-5 text-blue-600" />,
      href: "/purpose/virtual-office-for-bank-account-formation",
    },
    {
      id: "msme-registration",
      title: "MSME Registration",
      description:
        "Register your MSME and access government schemes and benefits",
      icon: <Building className="h-5 w-5 text-orange-600" />,
      href: "/purpose/virtual-office-for-msme-registration",
    },
    {
      id: "llp-registration",
      title: "LLP Registration",
      description:
        "Register your Limited Liability Partnership with complete legal documentation",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      href: "/purpose/virtual-office-for-llp-registration",
    },
    {
      id: "google-my-business",
      title: "Google My Business Setup",
      description: "Setup and verify your GMB listing for enhanced local SEO",
      icon: <Search className="h-5 w-5 text-red-600" />,
      href: "/purpose/virtual-office-for-google-my-business-registration",
    },
  ];

  // Growth services for the megamenu
  const growthServices = {
    entrepreneur: [
      { title: "Ecommerce Onboarding", description: "Start selling on 15+ marketplaces", href: "/growth/ecommerce-onboarding", icon: <Rocket className="h-5 w-5 text-indigo-600" /> },
      { title: "Local SEO & GMB Setup", description: "Get found by local customers", href: "/growth/local-seo-gmb", icon: <MapPin className="h-5 w-5 text-emerald-600" /> },
    ],
    marketplaces: [
      { title: "Amazon India", href: "/growth/amazon-account-management", color: "bg-orange-500" },
      { title: "Flipkart", href: "/growth/flipkart-account-management", color: "bg-blue-600" },
      { title: "Meesho", href: "/growth/meesho-account-management", color: "bg-pink-500" },
      { title: "Myntra", href: "/growth/myntra-account-management", color: "bg-pink-600" },
      { title: "Ajio", href: "/growth/ajio-account-management", color: "bg-teal-600" },
      { title: "Firstcry", href: "/growth/firstcry-account-management", color: "bg-rose-500" },
      { title: "BigBasket", href: "/growth/bigbasket-account-management", color: "bg-green-600" },
    ],
    quickCommerce: [
      { title: "Blinkit", href: "/growth/blinkit-account-management", color: "bg-yellow-400" },
      { title: "Zepto", href: "/growth/zepto-account-management", color: "bg-purple-600" },
      { title: "Swiggy Instamart", href: "/growth/swiggy-instamart-account-management", color: "bg-orange-600" },
      { title: "JioMart", href: "/growth/jiomart-account-management", color: "bg-green-500" },
    ],
    international: [
      { title: "Amazon USA", href: "/growth/amazon-usa-account-management", flag: "🇺🇸" },
      { title: "Amazon Japan", href: "/growth/amazon-japan-account-management", flag: "🇯🇵" },
      { title: "Amazon UAE", href: "/growth/amazon-uae-account-management", flag: "🇦🇪" },
    ],
  };

  return (
    <nav
      id="navigation"
      className={cn("bg-white shadow-sm z-40", !isCityPage && "sticky top-0")}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Layout: Hamburger - Logo - Call */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Left: Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1"
              aria-label={
                mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Center: Logo */}
            <div className="flex-1 flex justify-center">
              <Link href={basePath || "/"} aria-label="Go to homepage">
                <picture>
                  <img
                    src={mobileLogoUrl}
                    alt={`Logo ${countryName}`}
                    className="w-[120px] h-auto cursor-pointer"
                  />
                </picture>
                {country === "SG" && (
                  <span className="text-xs font-medium text-blue-600 block text-center mt-1">
                    Singapore
                  </span>
                )}
              </Link>
            </div>

            {/* Right: Call Icon */}
            <button
              onClick={() => setContactFormOpen(true)}
              className="text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1"
              aria-label="Contact us"
            >
              <Phone className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:flex items-center flex-1">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href={basePath || "/"}
                aria-label="Go to homepage"
                className="flex items-center space-x-2"
              >
                <picture>
                  <img
                    src={desktopLogoUrl}
                    alt={`Logo ${countryName}`}
                    className="w-[160px] lg:w-[170px] h-auto cursor-pointer"
                  />
                </picture>
                {country === "SG" && (
                  <span className="text-sm font-medium text-blue-600 hidden sm:block">
                    Singapore
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* India-specific navigation */}
            {country === "IN" && (
              <>
                {/* Virtual Office Mega Menu */}
                <div className="relative" ref={virtualOfficeMenuRef}>
                  <button
                    className="flex items-center space-x-1 text-dark hover:text-primary font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
                    onClick={() =>
                      setVirtualOfficeMenuOpen(!virtualOfficeMenuOpen)
                    }
                    aria-expanded={virtualOfficeMenuOpen}
                    aria-haspopup="true"
                    aria-controls="virtual-office-menu"
                    aria-label="Virtual Office menu"
                  >
                    <span>Virtual Office</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        virtualOfficeMenuOpen ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  {/* Virtual Office Mega Menu */}
                  {virtualOfficeMenuOpen && (
                    <div
                      id="virtual-office-menu"
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[900px] bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-100"
                      role="menu"
                      aria-labelledby="virtual-office-menu-button"
                    >
                      <div className="grid grid-cols-3 gap-8 p-6">
                        {/* By Use Case Column */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            By Use Case
                          </h3>
                          <div className="max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <div className="space-y-3">
                              {useCases.map((useCase) => (
                                <Link
                                  key={useCase.id}
                                  href={useCase.href}
                                  className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
                                  onClick={() =>
                                    setVirtualOfficeMenuOpen(false)
                                  }
                                >
                                  <div className="flex-shrink-0 mt-0.5">
                                    {useCase.icon}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                                      {useCase.title}
                                    </h4>
                                    <p className="text-xs text-gray-600">
                                      {useCase.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="pt-3 mt-3 border-t border-gray-100">
                            <Link
                              href="/usecase"
                              className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center"
                              onClick={() => setVirtualOfficeMenuOpen(false)}
                            >
                              View all use cases
                            </Link>
                          </div>
                        </div>

                        {/* By Purpose Column */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            By Purpose
                          </h3>
                          <div className="max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <div className="space-y-3">
                              {purposeServices.map((service) => (
                                <Link
                                  key={service.id}
                                  href={service.href}
                                  className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
                                  onClick={() =>
                                    setVirtualOfficeMenuOpen(false)
                                  }
                                >
                                  <div className="flex-shrink-0 mt-0.5">
                                    {service.icon}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                                      {service.title}
                                    </h4>
                                    <p className="text-xs text-gray-600">
                                      {service.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="pt-3 mt-3 border-t border-gray-100">
                            <Link
                              href="/purposes"
                              className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center"
                              onClick={() => setVirtualOfficeMenuOpen(false)}
                            >
                              View all purposes
                            </Link>
                          </div>
                        </div>

                        {/* By City Column */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            By City
                          </h3>
                          <div className="max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            <div className="space-y-2">
                              {locations.map((location) => (
                                <Link
                                  key={location.id}
                                  href={`/virtual-office/${location.slug}`}
                                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                                  onClick={() =>
                                    setVirtualOfficeMenuOpen(false)
                                  }
                                >
                                  <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                  <span className="font-medium text-gray-900 text-sm">
                                    {location.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="pt-3 mt-3 border-t border-gray-100">
                            <Link
                              href="/virtual-office"
                              className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center"
                              onClick={() => setVirtualOfficeMenuOpen(false)}
                            >
                              View all cities
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Services Mega Menu */}
                <div className="relative" ref={servicesMenuRef}>
                  <button
                    className="flex items-center space-x-1 text-dark hover:text-primary font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
                    onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                    aria-expanded={servicesMenuOpen}
                    aria-haspopup="true"
                    aria-controls="services-menu"
                    aria-label="Services menu"
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        servicesMenuOpen ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  {/* Services Mega Menu */}
                  {servicesMenuOpen && (
                    <div
                      id="services-menu"
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-[750px] max-w-[95vw] max-h-[80vh] bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-100"
                      role="menu"
                      aria-labelledby="services-menu-button"
                    >
                      <div className="p-4 overflow-y-auto max-h-full">
                        <div className="grid grid-cols-4 gap-4">
                          {/* Registration Services Column */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                              Registration
                            </h4>
                            <div className="space-y-1">
                              {services
                                .filter(service => service.isActive && (service.category === 'Registration' || ['GST Registration', 'Company Registration', 'LLP Registration', 'MSME Registration', 'Proprietorship Registration', 'Producer Company Registration', 'Nidhi Company Registration', 'Microfinance Company Registration'].includes(service.name)))
                                .map((service) => {
                                  const getServiceIcon = (serviceName: string) => {
                                    if (serviceName.includes('GST')) return <FileText className="h-4 w-4 text-blue-600" />;
                                    if (serviceName.includes('Company')) return <Building className="h-4 w-4 text-green-600" />;
                                    if (serviceName.includes('LLP')) return <Users className="h-4 w-4 text-purple-600" />;
                                    if (serviceName.includes('Producer')) return <Sprout className="h-4 w-4 text-green-700" />;
                                    if (serviceName.includes('Nidhi')) return <CreditCard className="h-4 w-4 text-blue-700" />;
                                    if (serviceName.includes('Microfinance')) return <Landmark className="h-4 w-4 text-indigo-600" />;
                                    if (serviceName.includes('MSME')) return <Factory className="h-4 w-4 text-orange-600" />;
                                    if (serviceName.includes('Proprietorship')) return <User className="h-4 w-4 text-gray-600" />;
                                    return <Building className="h-4 w-4 text-gray-600" />;
                                  };

                                  return (
                                    <Link
                                      key={service.id}
                                      href={`/services/${service.slug}`}
                                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                                      onClick={() => setServicesMenuOpen(false)}
                                    >
                                      <div className="flex-shrink-0">
                                        {getServiceIcon(service.name)}
                                      </div>
                                      <span className="font-medium text-gray-900 text-sm truncate">
                                        {service.name.replace(' Registration', '')}
                                      </span>
                                    </Link>
                                  );
                                })}
                            </div>
                          </div>

                          {/* For Entrepreneurs Column */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">For Entrepreneurs</h4>
                            <div className="space-y-2">
                              {growthServices.entrepreneur.map((service, idx) => (
                                <Link
                                  key={idx}
                                  href={service.href}
                                  className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                                  onClick={() => setServicesMenuOpen(false)}
                                >
                                  <div className="flex-shrink-0 mt-0.5">{service.icon}</div>
                                  <div>
                                    <h5 className="font-medium text-gray-900 text-sm">{service.title}</h5>
                                    <p className="text-xs text-gray-500">{service.description}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-4">International</h4>
                            <div className="space-y-1">
                              {growthServices.international.map((market, idx) => (
                                <Link
                                  key={idx}
                                  href={market.href}
                                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors text-sm"
                                  onClick={() => setServicesMenuOpen(false)}
                                >
                                  <span>{market.flag}</span>
                                  <span className="text-gray-700">{market.title}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Indian Marketplaces Column */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Indian Marketplaces</h4>
                            <div className="space-y-1">
                              {growthServices.marketplaces.map((mp, idx) => (
                                <Link
                                  key={idx}
                                  href={mp.href}
                                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors text-sm"
                                  onClick={() => setServicesMenuOpen(false)}
                                >
                                  <div className={`w-2 h-2 rounded-full ${mp.color}`}></div>
                                  <span className="text-gray-700">{mp.title}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Quick Commerce Column */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Commerce</h4>
                            <div className="space-y-1">
                              {growthServices.quickCommerce.map((qc, idx) => (
                                <Link
                                  key={idx}
                                  href={qc.href}
                                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md transition-colors text-sm"
                                  onClick={() => setServicesMenuOpen(false)}
                                >
                                  <div className={`w-2 h-2 rounded-full ${qc.color}`}></div>
                                  <span className="text-gray-700">{qc.title}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Footer Links */}
                        <div className="pt-3 mt-4 border-t border-gray-100 flex justify-between">
                          <Link
                            href="/services"
                            className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center"
                            onClick={() => setServicesMenuOpen(false)}
                          >
                            View all services →
                          </Link>
                          <Link
                            href="/growth"
                            className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center"
                            onClick={() => setServicesMenuOpen(false)}
                          >
                            View all growth services →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* More Dropdown */}
                <div className="relative" ref={moreMenuRef}>
                  <button
                    className="flex items-center space-x-1 text-dark hover:text-primary font-medium transition-colors duration-200"
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    aria-expanded={moreMenuOpen}
                  >
                    <span>More</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        moreMenuOpen ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  {/* Megamenu for More */}
                  {moreMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-[300px] bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-100">
                      <div className="p-4">
                        <div className="space-y-2">
                          <Link
                            href="/about"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-dark hover:text-primary"
                            onClick={() => setMoreMenuOpen(false)}
                          >
                            <span>About Us</span>
                          </Link>
                          <Link
                            href="/contact"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-dark hover:text-primary"
                            onClick={() => setMoreMenuOpen(false)}
                          >
                            <span>Contact</span>
                          </Link>
                          <Link
                            href="/blog"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-dark hover:text-primary"
                            onClick={() => setMoreMenuOpen(false)}
                          >
                            <span>Blog</span>
                          </Link>
                          <div className="border-t border-gray-100 my-2"></div>
                          <Link
                            href="/calculators"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-dark hover:text-primary"
                            onClick={() => setMoreMenuOpen(false)}
                          >
                            <span>Tools (Calculators)</span>
                          </Link>
                          <Link
                            href="/companies"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-dark hover:text-primary"
                            onClick={() => setMoreMenuOpen(false)}
                          >
                            <Search className="h-4 w-4 mr-2" />
                            <span>Company Search</span>
                          </Link>
                          <Link
                            href="/gst-number-search"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-dark hover:text-primary"
                            onClick={() => setMoreMenuOpen(false)}
                          >
                            <Search className="h-4 w-4 mr-2" />
                            <span>GST Number Search</span>
                          </Link>
                          <Link
                            href="/gst-return-checker"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-dark hover:text-primary"
                            onClick={() => setMoreMenuOpen(false)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            <span>GST Return Checker</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Singapore-specific navigation */}
            {country === "SG" && (
              <>
                {/* Services Dropdown */}
                <div className="relative" ref={useCaseMenuRef}>
                  <button
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setUseCaseMenuOpen(!useCaseMenuOpen)}
                    aria-expanded={useCaseMenuOpen}
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        useCaseMenuOpen ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  {/* Singapore Services Menu */}
                  {useCaseMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-[300px] bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-100">
                      <div className="p-4">
                        <div className="space-y-2">
                          <Link
                            href="/sg/virtual-office"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-700 hover:text-blue-600"
                            onClick={() => setUseCaseMenuOpen(false)}
                          >
                            <Building className="h-4 w-4 mr-2" />
                            <span>Virtual Office</span>
                          </Link>
                          <Link
                            href="/sg/company-registration"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-700 hover:text-blue-600"
                            onClick={() => setUseCaseMenuOpen(false)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Company Registration</span>
                          </Link>
                          <Link
                            href="/sg/business-address"
                            className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-700 hover:text-blue-600"
                            onClick={() => setUseCaseMenuOpen(false)}
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>Business Address</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Country Selector */}
                <div className="relative" ref={countryMenuRef}>
                  <button
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setCountryMenuOpen(!countryMenuOpen)}
                    aria-expanded={countryMenuOpen}
                  >
                    <Globe className="h-4 w-4" />
                    <span>Singapore</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        countryMenuOpen ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  {/* Country Menu */}
                  {countryMenuOpen && (
                    <div className="absolute top-full left-0 mt-1 w-[200px] bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-100">
                      <div className="p-2">
                        <Link
                          href="/"
                          className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-700 hover:text-blue-600"
                          onClick={() => setCountryMenuOpen(false)}
                        >
                          <span>🇮🇳 India</span>
                        </Link>
                        <Link
                          href="/sg"
                          className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-blue-600 bg-blue-50"
                          onClick={() => setCountryMenuOpen(false)}
                        >
                          <span>🇸🇬 Singapore</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Country Selector for India */}
            {country === "IN" && (
              <div className="relative" ref={countryMenuRef}>
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setCountryMenuOpen(!countryMenuOpen)}
                  aria-expanded={countryMenuOpen}
                >
                  <Globe className="h-4 w-4" />
                  <span>India</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      countryMenuOpen ? "rotate-180" : "",
                    )}
                  />
                </button>

                {/* Country Menu */}
                {countryMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[200px] bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-100">
                    <div className="p-2">
                      <Link
                        href="/"
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-blue-600 bg-blue-50"
                        onClick={() => setCountryMenuOpen(false)}
                      >
                        <span>🇮🇳 India</span>
                      </Link>
                      <Link
                        href="/sg"
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-700 hover:text-blue-600"
                        onClick={() => setCountryMenuOpen(false)}
                      >
                        <span>🇸🇬 Singapore</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Common navigation items for both countries - Contact removed */}
          </div>

          {/* Desktop location selector and CTA */}
          <div className="hidden md:flex items-center ml-8">
            {/* Only show city selector for India */}
            {country === "IN" && <CitySelector />}
            <Button
              onClick={() => setContactFormOpen(true)}
              className={cn(
                "bg-primary hover:bg-blue-700 text-white font-medium transition duration-300 px-8",
                country === "IN" ? "ml-6" : "",
              )}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-white z-50 overflow-y-auto shadow-xl"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="h-full">
            {/* Main navigation link - Removed */}

            {/* Virtual Office by City section - India */}
            {country === "IN" && (
              <div className="px-4 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                  Virtual Office by City
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {locations
                    .filter((city: Location) =>
                      [
                        "Bangalore",
                        "Delhi",
                        "Gurgaon",
                        "Pune",
                        "Mumbai",
                        "Hyderabad",
                        "Chennai",
                      ].includes(city.name),
                    )
                    .map((city: Location) => (
                      <Link
                        key={city.id}
                        href={`/virtual-office/${city.slug}`}
                        className="flex items-center space-x-2 px-3 py-3 hover:bg-white rounded-xl transition-all duration-200 text-base font-medium border border-transparent hover:border-purple-200 hover:shadow-md active:scale-95"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-gray-800">{city.name}</span>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/* Virtual Office by Location section - Singapore */}
            {country === "SG" && (
              <div className="px-4 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  Virtual Office by Location
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {singaporeLocations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/sg/virtual-office/${location.slug}`}
                      className="flex items-center space-x-2 px-3 py-3 hover:bg-white rounded-xl transition-all duration-200 text-base font-medium border border-transparent hover:border-blue-200 hover:shadow-md active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-800">{location.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Virtual Office by Use Case section - India only */}
            {country === "IN" && (
              <div className="px-4 py-5 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                  <Rocket className="h-5 w-5 text-blue-600 mr-3" />
                  Virtual Office by Use Case
                </h3>
                <div className="space-y-2">
                  {useCases.map((useCase) => (
                    <Link
                      key={useCase.id}
                      href={useCase.href}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-900 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-md active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex-shrink-0">{useCase.icon}</div>
                      <span className="text-base font-medium">
                        {useCase.title}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/usecase"
                    className="flex items-center justify-center px-4 py-3 text-primary hover:bg-blue-50 rounded-xl transition-all duration-200 font-semibold mt-3 border border-blue-300 hover:border-blue-400 text-base active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>View All Use Cases</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Services section - Singapore only */}
            {country === "SG" && (
              <div className="px-4 py-5 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                  <Building className="h-5 w-5 text-blue-600 mr-3" />
                  Our Services
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/sg/virtual-office"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-900 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-md active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Building className="h-5 w-5 text-blue-600" />
                    <span className="text-base font-medium">
                      Virtual Office
                    </span>
                  </Link>
                  <Link
                    href="/sg/company-registration"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-900 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-md active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-base font-medium">
                      Company Registration
                    </span>
                  </Link>
                  <Link
                    href="/sg/business-address"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-900 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-md active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-base font-medium">
                      Business Address
                    </span>
                  </Link>
                </div>
              </div>
            )}

            {/* Virtual Office by Purpose section - India only */}
            {country === "IN" && (
              <div className="px-4 py-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center">
                  <Building className="h-5 w-5 text-green-600 mr-3" />
                  Virtual Office by Purpose
                </h3>
                <div className="space-y-2">
                  {purposeServices.map((service) => (
                    <Link
                      key={service.id}
                      href={service.href}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-900 hover:bg-white rounded-xl transition-all duration-200 border border-transparent hover:border-green-200 hover:shadow-md active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex-shrink-0">{service.icon}</div>
                      <span className="text-base font-medium">
                        {service.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick location selector - India only */}
            {country === "IN" && (
              <div className="px-4 py-5 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                  Quick Location Select
                </h3>
                <div className="flex justify-center">
                  <CitySelector />
                </div>
              </div>
            )}

            {/* Country Switcher */}
            <div className="px-4 py-5 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                Country
              </h3>
              <div className="flex justify-center space-x-2">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center px-4 py-2 rounded-lg font-medium transition-colors",
                    country === "IN"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🇮🇳 India
                </Link>
                <Link
                  href="/sg"
                  className={cn(
                    "flex items-center px-4 py-2 rounded-lg font-medium transition-colors",
                    country === "SG"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🇸🇬 Singapore
                </Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className="px-4 py-5">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl active:scale-95">
                  Get Started Today
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Dialog */}
      <Dialog open={contactFormOpen} onOpenChange={setContactFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Form</DialogTitle>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </nav>
  );
}
