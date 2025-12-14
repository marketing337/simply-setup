import { Link } from "wouter";
import { Location } from "@shared/schema";
import { useLocation as useLocContext } from "@/hooks/useLocation";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Building2,
  Users,
  Calculator,
  FileText,
  Globe,
  Briefcase,
  Target,
  Star,
  ArrowRight,
  ExternalLink,
  User,
  Building,
  Heart,
  Shield,
  TrendingUp,
  Wheat,
} from "lucide-react";

// Function to scroll to top of page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

interface FooterProps {
  location: Location | null;
}

export default function Footer({ location }: FooterProps) {
  const { allLocations } = useLocContext();
  const currentYear = new Date().getFullYear();

  // SEO-optimized location grouping with comprehensive coverage
  const regions = {
    "Major Metros": [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Pune",
    ],
    "North India": [
      "Gurgaon",
      "Noida",
      "Chandigarh",
      "Jaipur",
      "Lucknow",
      "Dehradun",
    ],
    "South India": [
      "Coimbatore",
      "Kochi",
      "Mysore",
      "Vijayawada",
      "Visakhapatnam",
      "Trivandrum",
    ],
    "West India": ["Ahmedabad", "Nagpur", "Surat", "Indore", "Vadodara", "Goa"],
  };

  // Use cases for virtual office services - SEO targeting
  const useCases = [
    {
      name: "Tech & IT Startups",
      href: "/usecase/virtual-office-for-tech-startups",
      icon: Target,
    },
    {
      name: "SaaS Founders",
      href: "/usecase/virtual-office-for-saas-founders",
      icon: Globe,
    },
    {
      name: "CA & Consultants",
      href: "/usecase/virtual-office-for-consultants",
      icon: Users,
    },
    {
      name: "Creative Agencies",
      href: "/usecase/virtual-office-for-remote-creative-agency",
      icon: Building2,
    },
    {
      name: "E-commerce Businesses",
      href: "/usecase/virtual-office-for-ecommerce",
      icon: Globe,
    },
    {
      name: "FinTech Startups",
      href: "/usecase/virtual-office-for-fintech-startup",
      icon: Target,
    },
    {
      name: "Foreign SME Entry",
      href: "/usecase/virtual-office-for-foreign-sme-entry-desk",
      icon: Building2,
    },
    {
      name: "NGO & Foundations",
      href: "/usecase/virtual-office-for-ngo-foundation",
      icon: Users,
    },
    {
      name: "Recruitment Agencies",
      href: "/usecase/virtual-office-for-recruitment-process-outsourcer",
      icon: Briefcase,
    },
    {
      name: "Event Management",
      href: "/usecase/virtual-office-for-seasonal-event-management",
      icon: FileText,
    },
    {
      name: "Freelancers",
      href: "/usecase/virtual-office-for-freelancers",
      icon: Building2,
    },
    {
      name: "Tourism and Travel",
      href: "/usecase/virtual-office-for-hospitality",
      icon: FileText,
    },
  ];

  // Business purposes - comprehensive SEO coverage
  const purposes = [
    {
      name: "GST Registration",
      href: "/purpose/virtual-office-for-gst-registration",
      icon: Mail,
    },
    {
      name: "Company Registration",
      href: "/purpose/virtual-office-for-company-registration",
      icon: MapPin,
    },
    {
      name: "Bank Account Formation",
      href: "/purpose/virtual-office-for-bank-account-formation",
      icon: Phone,
    },
    {
      name: "Google Maps Registration",
      href: "/purpose/virtual-office-for-google-my-business-registration",
      icon: Building2,
    },
    {
      name: "MSME Registration",
      href: "/purpose/virtual-office-for-msme-registration",
      icon: FileText,
    },
    {
      name: "Trade License",
      href: "/purpose/virtual-office-for-trade-license",
      icon: Building2,
    },
    {
      name: "Partnership Firm",
      href: "/purpose/virtual-office-for-partnership",
      icon: Users,
    },
    {
      name: "One Person Company",
      href: "/purpose/virtual-office-for-opc",
      icon: User,
    },
    {
      name: "Limited Liability Partnership",
      href: "/purpose/virtual-office-for-llp",
      icon: Briefcase,
    },
    {
      name: "Private Limited Company",
      href: "/purpose/virtual-office-for-private-limited",
      icon: Building,
    },
    {
      name: "Section 8 Company",
      href: "/purpose/virtual-office-for-section-8",
      icon: Heart,
    },
    {
      name: "Trust Registration",
      href: "/purpose/virtual-office-for-trust",
      icon: Shield,
    },
    {
      name: "Public Limited Company",
      href: "/purpose/virtual-office-for-public-limited",
      icon: TrendingUp,
    },
    {
      name: "Producer Company",
      href: "/purpose/virtual-office-for-producer-company",
      icon: Wheat,
    },
    {
      name: "Indian Subsidiary",
      href: "/purpose/virtual-office-for-indian-subsidiary",
      icon: Globe,
    },
  ];

  const getLocationsByRegion = (region: string[]) => {
    return allLocations.filter((loc) => region.includes(loc.name));
  };

  return (
    <footer
      className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* DocuKit Promotional Strip */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">
                Get 100+ Free Templates for Business
              </span>
              <Link
                href="/docukit"
                className="inline-flex items-center bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                Access DocuKit Now
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          {/* First Row - Main Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 mb-12">
            {/* Company Brand & Contact */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  SimplySetup
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  India's leading virtual office provider, empowering
                  entrepreneurs with premium business addresses and
                  comprehensive business solutions.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <a
                  href="mailto:hello@simplysetup.co"
                  className="flex items-center text-gray-700 hover:text-primary transition-colors text-sm group"
                >
                  <Mail className="h-4 w-4 mr-3 text-primary group-hover:scale-110 transition-transform" />
                  hello@simplysetup.co
                </a>

                <div className="flex items-start text-gray-700 text-sm">
                  <MapPin className="h-4 w-4 mr-3 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    S-620, Manipal Center, Ashok Nagar, Bengaluru, Karnataka,
                    560025
                  </span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61577590176482"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                </a>
                <a
                  href="https://x.com/simply__setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-4 w-4 text-gray-600 group-hover:text-blue-400" />
                </a>
                <a
                  href="https://www.linkedin.com/company/simplysetup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-gray-600 group-hover:text-blue-700" />
                </a>
                <a
                  href="https://www.instagram.com/simply_setup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-4 w-4 text-gray-600 group-hover:text-pink-600" />
                </a>
              </div>
            </div>

            {/* By Use Case Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                By Use Case
              </h3>
              <ul className="space-y-2.5">
                {useCases.map((useCase, index) => {
                  const Icon = useCase.icon;
                  return (
                    <li key={index}>
                      <Link href={useCase.href}>
                        <div className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group cursor-pointer">
                          <Icon className="h-3.5 w-3.5 mr-2.5 text-primary opacity-70 group-hover:opacity-100" />
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {useCase.name}
                          </span>
                          <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* By Purpose Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-primary" />
                By Purpose
              </h3>
              <ul className="space-y-2.5">
                {purposes.map((purpose, index) => {
                  const Icon = purpose.icon;
                  return (
                    <li key={index}>
                      <Link href={purpose.href}>
                        <div className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group cursor-pointer">
                          <Icon className="h-3.5 w-3.5 mr-2.5 text-primary opacity-70 group-hover:opacity-100" />
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {purpose.name}
                          </span>
                          <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Second Row - Popular Locations */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-primary" />
              Popular Locations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(regions).map(([regionName, cities]) => (
                <div key={regionName}>
                  <h4 className="text-sm font-medium text-primary mb-3">
                    {regionName}
                  </h4>
                  <ul className="space-y-2">
                    {getLocationsByRegion(cities)
                      .slice(0, 4)
                      .map((loc) => (
                        <li key={loc.id}>
                          <Link href={`/${loc.slug}`}>
                            <span className="text-sm text-gray-600 hover:text-primary transition-colors cursor-pointer hover:underline">
                              Virtual Office {loc.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO-Rich Content Section */}
        <div className="border-t border-gray-200 py-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Premium Virtual Office Solutions Across India
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
              <div>
                <p className="mb-3">
                  <strong className="text-gray-800">SimplySetup</strong> is
                  India's most trusted
                  <strong> virtual office provider</strong>, offering
                  comprehensive business solutions including prestigious
                  business addresses, GST registration support, professional
                  mail handling, and dedicated call answering services across
                  50+ prime locations.
                </p>
                <p>
                  Perfect for{" "}
                  <strong>startups, entrepreneurs, freelancers</strong>, and
                  established businesses seeking to establish a professional
                  presence without the overhead costs of traditional office
                  spaces.
                </p>
              </div>
              <div>
                <p className="mb-3">
                  Our <strong>virtual office services</strong> include meeting
                  room access, coworking space facilities, company registration
                  assistance, and compliance support. Whether you need a{" "}
                  <strong>virtual office in Mumbai, Delhi, Bangalore</strong>,
                  or any major Indian city, we provide flexible plans tailored
                  to your business needs.
                </p>
                <p>
                  Join thousands of successful businesses who trust SimplySetup
                  for their virtual office requirements and business growth
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t border-gray-200 py-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Company Information
              </h4>
              <dl className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <dt className="font-medium">Legal Name:</dt>
                  <dd>Simplysetup Pvt Ltd</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">GST Number:</dt>
                  <dd>27AAKCG1115D1Z2</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Registered Address:</dt>
                  <dd>Office No 1, Samarth Sankul, Narhe, Pune, 411041</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-4 md:mb-0">
              &copy; {currentYear} Simplysetup Pvt Ltd. All rights reserved.
              Trusted by 10,000+ businesses across India.
            </p>
            <nav className="flex flex-wrap gap-6 text-xs">
              <a
                href="/privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  window.location.href = "/privacy-policy";
                }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  window.location.href = "/terms-of-service";
                }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  window.location.href = "/sitemap";
                }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Sitemap
              </a>
              <a
                href="/refund-policy"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  window.location.href = "/refund-policy";
                }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Refund Policy
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  window.location.href = "/contact";
                }}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
