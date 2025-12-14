import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import { 
  ArrowRight, 
  Rocket, 
  ShoppingCart, 
  Globe, 
  Zap,
  MapPin,
  Store,
  TrendingUp,
  Package,
  Clock,
  Users,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const entrepreneurServices = [
  {
    title: "Ecommerce Onboarding",
    description: "Launch your online selling journey on 15+ marketplaces with complete setup and training",
    href: "/growth/ecommerce-onboarding",
    icon: Rocket,
    color: "bg-indigo-100 text-indigo-600",
    badge: "New Sellers"
  },
  {
    title: "Local SEO & GMB Setup",
    description: "Dominate local search and attract nearby customers with Google Business Profile optimization",
    href: "/growth/local-seo-gmb",
    icon: MapPin,
    color: "bg-emerald-100 text-emerald-600",
    badge: "Local Business"
  }
];

const indianMarketplaces = [
  {
    title: "Amazon India",
    description: "India's largest marketplace with 300M+ customers",
    href: "/growth/amazon-account-management",
    color: "bg-orange-500",
    textColor: "text-white"
  },
  {
    title: "Flipkart",
    description: "Reach 400M+ registered users across India",
    href: "/growth/flipkart-account-management",
    color: "bg-blue-600",
    textColor: "text-white"
  },
  {
    title: "Meesho",
    description: "Zero commission marketplace for social sellers",
    href: "/growth/meesho-account-management",
    color: "bg-pink-500",
    textColor: "text-white"
  },
  {
    title: "Myntra",
    description: "India's leading fashion & lifestyle destination",
    href: "/growth/myntra-account-management",
    color: "bg-pink-600",
    textColor: "text-white"
  },
  {
    title: "Ajio",
    description: "Reliance's premium fashion marketplace",
    href: "/growth/ajio-account-management",
    color: "bg-teal-600",
    textColor: "text-white"
  },
  {
    title: "Firstcry",
    description: "Asia's largest baby & kids products platform",
    href: "/growth/firstcry-account-management",
    color: "bg-rose-500",
    textColor: "text-white"
  },
  {
    title: "BigBasket",
    description: "India's largest online grocery store",
    href: "/growth/bigbasket-account-management",
    color: "bg-green-600",
    textColor: "text-white"
  }
];

const quickCommerce = [
  {
    title: "Blinkit",
    description: "10-minute delivery in 25+ cities",
    href: "/growth/blinkit-account-management",
    color: "bg-yellow-400",
    textColor: "text-gray-900"
  },
  {
    title: "Zepto",
    description: "Fastest growing quick commerce platform",
    href: "/growth/zepto-account-management",
    color: "bg-purple-600",
    textColor: "text-white"
  },
  {
    title: "Swiggy Instamart",
    description: "Instant grocery delivery across metros",
    href: "/growth/swiggy-instamart-account-management",
    color: "bg-orange-600",
    textColor: "text-white"
  },
  {
    title: "JioMart",
    description: "Reliance's hyperlocal grocery platform",
    href: "/growth/jiomart-account-management",
    color: "bg-green-500",
    textColor: "text-white"
  }
];

const internationalMarketplaces = [
  {
    title: "Amazon USA",
    description: "World's largest ecommerce market with $500B+ GMV",
    href: "/growth/amazon-usa-account-management",
    flag: "🇺🇸",
    color: "bg-orange-500"
  },
  {
    title: "Amazon Japan",
    description: "Asia's premium market with high-value customers",
    href: "/growth/amazon-japan-account-management",
    flag: "🇯🇵",
    color: "bg-orange-500"
  },
  {
    title: "Amazon UAE",
    description: "Gateway to Middle East with tax-free selling",
    href: "/growth/amazon-uae-account-management",
    flag: "🇦🇪",
    color: "bg-orange-500"
  }
];

const stats = [
  { value: "500+", label: "Brands Managed", icon: Store },
  { value: "15+", label: "Marketplaces", icon: ShoppingCart },
  { value: "₹50Cr+", label: "GMV Generated", icon: TrendingUp },
  { value: "98%", label: "Client Retention", icon: Users }
];

export default function GrowthPage() {
  const { currentLocation } = useLocation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Growth Services - Marketplace Account Management",
    "description": "Complete marketplace account management and growth services for ecommerce sellers",
    "itemListElement": [
      ...indianMarketplaces.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "url": `https://simplysetup.in${item.href}`
      })),
      ...quickCommerce.map((item, index) => ({
        "@type": "ListItem",
        "position": indianMarketplaces.length + index + 1,
        "name": item.title,
        "url": `https://simplysetup.in${item.href}`
      }))
    ]
  };

  return (
    <>
      <Helmet>
        <title>Growth Services | Marketplace Account Management | Simply Setup</title>
        <meta name="description" content="Expert marketplace account management services for Amazon, Flipkart, Meesho, Myntra & 15+ platforms. Grow your ecommerce business with dedicated account managers." />
        <link rel="canonical" href="https://simplysetup.in/growth" />
        <meta property="og:title" content="Growth Services | Marketplace Account Management" />
        <meta property="og:description" content="Expert marketplace account management for 15+ platforms. Grow your ecommerce business with Simply Setup." />
        <meta property="og:url" content="https://simplysetup.in/growth" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 mb-6 px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trusted by 500+ Brands
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Grow Your <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Ecommerce Business</span> With Expert Support
              </h1>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                From launching your first store to scaling across 15+ marketplaces, we handle everything so you can focus on your products.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link href="/growth/ecommerce-onboarding">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white" data-testid="button-get-started">
                    Start Selling Online
                    <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-300 bg-white text-black hover:bg-gray-100" 
                  data-testid="button-explore-marketplaces"
                  onClick={() => document.getElementById('marketplaces')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Marketplaces
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 mb-3">
                      <stat.icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Entrepreneur Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-indigo-100 text-indigo-700 mb-4">For New Entrepreneurs</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Just Starting Out? We've Got You Covered
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete setup and training packages designed specifically for new business owners entering the digital world.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {entrepreneurServices.map((service, index) => (
                <Link key={index} href={service.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-indigo-200" data-testid={`card-entrepreneur-service-${index}`}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-xl ${service.color}`}>
                          <service.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2">{service.badge}</Badge>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          <span className="inline-flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform">
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Indian Marketplaces */}
        <section id="marketplaces" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-orange-100 text-orange-700 mb-4">Indian Marketplaces</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sell on India's Top Ecommerce Platforms
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Expert account management for all major Indian marketplaces. From registration to daily operations, we handle it all.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {indianMarketplaces.map((marketplace, index) => (
                <Link key={index} href={marketplace.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden" data-testid={`card-marketplace-${index}`}>
                    <div className={`h-2 ${marketplace.color}`}></div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {marketplace.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{marketplace.description}</p>
                      <span className="inline-flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                        Manage Account <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Commerce */}
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-100 text-yellow-700 mb-4">
                <Zap className="w-4 h-4 mr-1 inline" />
                Quick Commerce
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tap Into the Quick Commerce Revolution
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                10-minute delivery platforms are transforming retail. Get your products in front of millions of urban customers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {quickCommerce.map((platform, index) => (
                <Link key={index} href={platform.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden" data-testid={`card-quick-commerce-${index}`}>
                    <div className={`${platform.color} p-6 text-center`}>
                      <Clock className={`w-8 h-8 mx-auto ${platform.textColor}`} />
                      <h3 className={`text-xl font-bold mt-2 ${platform.textColor}`}>
                        {platform.title}
                      </h3>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">{platform.description}</p>
                      <span className="inline-flex items-center text-orange-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                        Get Started <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* International Expansion */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-blue-100 text-blue-700 mb-4">
                <Globe className="w-4 h-4 mr-1 inline" />
                Go Global
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Expand Your Business Internationally
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to sell beyond India? We help you enter international markets with complete setup and compliance support.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {internationalMarketplaces.map((market, index) => (
                <Link key={index} href={market.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-orange-200" data-testid={`card-international-${index}`}>
                    <CardContent className="p-8 text-center">
                      <div className="text-5xl mb-4">{market.flag}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {market.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{market.description}</p>
                      <span className="inline-flex items-center text-orange-600 font-medium group-hover:translate-x-2 transition-transform">
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why 500+ Brands Trust Simply Setup
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We're not just service providers – we're your growth partners invested in your success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Users, title: "Dedicated Account Managers", desc: "One point of contact for all your marketplace needs" },
                { icon: TrendingUp, title: "Data-Driven Growth", desc: "Analytics and insights to optimize your sales" },
                { icon: Package, title: "End-to-End Support", desc: "From registration to scaling, we handle everything" },
                { icon: CheckCircle, title: "Proven Results", desc: "98% client retention with measurable ROI" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 mb-4">
                    <item.icon className="w-7 h-7 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Grow Your Ecommerce Business?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Book a free consultation with our marketplace experts and discover how we can help you scale.
            </p>
            <Link href="/growth/ecommerce-onboarding">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50" data-testid="button-cta-consultation">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer location={currentLocation} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
