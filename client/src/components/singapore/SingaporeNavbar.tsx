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
  Building,
  User,
  Globe,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ContactForm";

// Using direct SVG URLs for better quality logos
const mobileLogoUrl =
  "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/t_6_3fb247ca-e5df-4fb1-832a-1fbfdd3a3eea.svg?v=1748523564";
const desktopLogoUrl =
  "https://cdn.shopify.com/s/files/1/0704/3704/4519/files/t_3_163fe7fe-96f9-4e72-94e9-3a2ee64e77a2.svg?v=1748517470";

export default function SingaporeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [pathLocation] = useWouterLocation();
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const countryMenuRef = useRef<HTMLDivElement>(null);

  // Singapore-specific locations
  const singaporeLocations = [
    { name: "Raffles Place", slug: "raffles-place" },
    { name: "Orchard Road", slug: "orchard-road" },
    { name: "Marina Bay", slug: "marina-bay" },
    { name: "Tanjong Pagar", slug: "tanjong-pagar" },
    { name: "Jurong East", slug: "jurong-east" },
    { name: "Bugis", slug: "bugis" }
  ];

  // Close the menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node)
      ) {
        setServicesMenuOpen(false);
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/sg" className="flex items-center space-x-2">
            <picture>
              <source media="(max-width: 768px)" srcSet={mobileLogoUrl} />
              <img
                src={desktopLogoUrl}
                alt="SimplySetup Singapore"
                className="h-8 w-auto"
              />
            </picture>
            <span className="text-sm font-medium text-blue-600 hidden sm:block">
              Singapore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/sg/virtual-office"
              className={cn(
                "text-gray-700 hover:text-blue-600 font-medium transition-colors",
                pathLocation.startsWith("/sg/virtual-office") && "text-blue-600"
              )}
            >
              Virtual Office
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesMenuRef}>
              <button
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span>Services</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {servicesMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 space-y-2">
                    <Link
                      href="/sg/company-registration"
                      className="block p-2 hover:bg-gray-50 rounded-md"
                    >
                      <div className="font-medium">Company Registration</div>
                      <div className="text-sm text-gray-500">ACRA registration services</div>
                    </Link>
                    <Link
                      href="/sg/gst-registration"
                      className="block p-2 hover:bg-gray-50 rounded-md"
                    >
                      <div className="font-medium">GST Registration</div>
                      <div className="text-sm text-gray-500">GST setup and compliance</div>
                    </Link>
                    <Link
                      href="/sg/business-setup"
                      className="block p-2 hover:bg-gray-50 rounded-md"
                    >
                      <div className="font-medium">Business Setup</div>
                      <div className="text-sm text-gray-500">Complete business solutions</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div className="relative" ref={countryMenuRef}>
              <button
                onClick={() => setCountryMenuOpen(!countryMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span>Locations</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {countryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-900 mb-3">
                      Singapore Locations
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {singaporeLocations.map((location) => (
                        <Link
                          key={location.slug}
                          href={`/sg/virtual-office/${location.slug}`}
                          className="block p-2 hover:bg-gray-50 rounded-md text-sm"
                        >
                          {location.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Country Switcher */}
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4 text-gray-500" />
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                India
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-blue-600 font-medium">Singapore</span>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setContactFormOpen(true)}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact
            </Button>
            <Link href="/sg/virtual-office">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="p-4 space-y-4">
            <Link
              href="/sg/virtual-office"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Virtual Office
            </Link>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Services</div>
              <div className="pl-4 space-y-2">
                <Link
                  href="/sg/company-registration"
                  className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Company Registration
                </Link>
                <Link
                  href="/sg/gst-registration"
                  className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  GST Registration
                </Link>
                <Link
                  href="/sg/business-setup"
                  className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Business Setup
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">Locations</div>
              <div className="pl-4 space-y-2">
                {singaporeLocations.slice(0, 4).map((location) => (
                  <Link
                    key={location.slug}
                    href={`/sg/virtual-office/${location.slug}`}
                    className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {location.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm mb-3">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Country:</span>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  India
                </Link>
                <span className="text-blue-600 font-medium">Singapore</span>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setContactFormOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
              <Link href="/sg/virtual-office">
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Dialog */}
      <Dialog open={contactFormOpen} onOpenChange={setContactFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Us - Singapore</DialogTitle>
            <DialogDescription>
              Get in touch with our Singapore team for virtual office services.
            </DialogDescription>
          </DialogHeader>
          <ContactForm 
            onClose={() => setContactFormOpen(false)}
            country="Singapore"
          />
        </DialogContent>
      </Dialog>
    </nav>
  );
}