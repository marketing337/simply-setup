import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import {
  ShoppingCart,
  Package,
  Truck,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Star,
  FileText,
  CreditCard,
} from "lucide-react";

export default function EcommercePage() {
  const benefits = [
    {
      icon: Package,
      title: "Return Address Management",
      description:
        "Professional return address for customer returns and exchanges, building trust and credibility.",
    },
    {
      icon: Shield,
      title: "GST & Legal Compliance",
      description:
        "Complete support for GST registration, FSSAI licensing, and other e-commerce compliance requirements.",
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description:
        "Business address for courier pickups and vendor communications across multiple cities.",
    },
    {
      icon: Globe,
      title: "Multi-State Operations",
      description:
        "Establish presence in multiple states for better market reach and tax optimization.",
    },
    {
      icon: Mail,
      title: "Business Communication",
      description:
        "Professional mail handling for vendor agreements, legal notices, and business correspondence.",
    },
    {
      icon: CreditCard,
      title: "Payment Gateway Setup",
      description:
        "Business address verification for payment gateway approvals and merchant accounts.",
    },
  ];

  const features = [
    "FSSAI license support for food businesses",
    "Marketplace seller verification",
    "Professional customer service address",
    "Multi-city inventory management",
    "Return and refund processing",
    "Vendor meeting facilities",
  ];

  const marketplaces = [
    "Amazon Seller Central",
    "Flipkart Marketplace",
    "Myntra Partner",
    "Meesho Supplier",
    "Snapdeal Seller",
    "JioMart Partner",
    "BigBasket Vendor",
    "Nykaa Seller",
  ];

  const plans = [
    {
      name: "Starter Store",
      price: "₹1,299",
      period: "/month",
      description: "Perfect for new e-commerce businesses",
      features: [
        "Professional business address",
        "Return address management",
        "Basic mail forwarding",
        "GST registration support",
        "Marketplace verification help",
        "Email & phone support",
      ],
      popular: false,
    },
    {
      name: "Growing Business",
      price: "₹2,499",
      period: "/month",
      description: "Ideal for scaling e-commerce stores",
      features: [
        "Everything in Starter Store",
        "Multi-city presence (2 cities)",
        "Priority mail handling",
        "FSSAI license support",
        "Vendor meeting room access",
        "Dedicated phone number",
        "Priority customer support",
      ],
      popular: true,
    },
    {
      name: "Enterprise Seller",
      price: "₹4,999",
      period: "/month",
      description: "For established e-commerce brands",
      features: [
        "Everything in Growing Business",
        "Multi-city presence (5+ cities)",
        "Dedicated account manager",
        "Custom return processes",
        "Unlimited meeting rooms",
        "Legal document handling",
        "24/7 support hotline",
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Neha Gupta",
      business: "Fashion E-commerce Store",
      content:
        "The return address service has been a game-changer for our customer trust. Professional handling of all returns.",
      rating: 5,
    },
    {
      name: "Amit Verma",
      business: "Electronics Seller",
      content:
        "Multi-city presence helped us optimize our GST structure and expand to new markets efficiently.",
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Virtual Office for E-commerce Businesses | SimplySetup</title>
        <meta
          name="description"
          content="Professional virtual office solutions for e-commerce businesses. Get business addresses, return management, GST support, and marketplace verification."
        />
        <meta
          name="keywords"
          content="virtual office for ecommerce, business address for online store, GST registration for ecommerce, marketplace seller verification"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                <ShoppingCart className="h-4 w-4 mr-2" />
                For E-commerce Businesses
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Scale Your
                <span className="text-primary block">E-commerce Business</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Establish trust with customers using professional business
                addresses, return management services, and compliance support
                for all major e-commerce platforms and marketplaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3">
                  Start Selling Professionally
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  View Success Stories
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why E-commerce Businesses Choose Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Build customer trust and streamline operations with professional
                business infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Marketplace Support Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Verified on All Major Marketplaces
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our business addresses are accepted and verified across all
                major e-commerce platforms.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {marketplaces.map((marketplace, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <span className="font-medium text-gray-900">
                    {marketplace}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Complete E-commerce Support
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  From marketplace verification to customer returns, we handle
                  all the business infrastructure needs so you can focus on
                  growing your sales.
                </p>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Ready to Scale?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span>hello@simplysetup.co</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>+91 88888 88888</span>
                  </div>
                  <Button className="w-full mt-6">Get E-commerce Setup</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Success Stories from E-commerce Entrepreneurs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <CardDescription className="text-gray-700 italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.business}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                E-commerce Focused Pricing
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Plans designed specifically for e-commerce businesses at every
                stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative ${plan.popular ? "border-primary shadow-xl scale-105" : "border-gray-200"}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-8 ${plan.popular ? "bg-primary" : ""}`}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Customer Trust?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join successful e-commerce businesses using professional addresses
              and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8 py-3">
                Start Your Store Setup
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-white border-white hover:bg-white hover:text-primary"
              >
                Talk to E-commerce Expert
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}
