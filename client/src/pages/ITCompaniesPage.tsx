import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import {
  Monitor,
  Code,
  Cloud,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Star,
  Users,
  Zap,
} from "lucide-react";

export default function ITCompaniesPage() {
  const benefits = [
    {
      icon: Building2,
      title: "Professional IT Company Image",
      description: "Establish credibility with clients using prestigious addresses in major tech hubs across India."
    },
    {
      icon: Shield,
      title: "Compliance & Registrations",
      description: "Complete support for IT company registrations, STPI approvals, and export-import documentation."
    },
    {
      icon: Users,
      title: "Client Meeting Facilities",
      description: "Access to professional meeting rooms equipped with latest technology for client presentations."
    },
    {
      icon: Globe,
      title: "Multi-Location Presence",
      description: "Establish offices in multiple IT hubs like Bangalore, Pune, Hyderabad, and Chennai simultaneously."
    },
    {
      icon: Mail,
      title: "Secure Document Handling",
      description: "Professional handling of confidential agreements, contracts, and legal documents."
    },
    {
      icon: Zap,
      title: "Quick Setup & Scaling",
      description: "Rapid setup for new projects and easy scaling as your IT company grows and expands."
    }
  ];

  const services = [
    "Software Development Companies",
    "IT Consulting Firms",
    "Digital Agencies",
    "SaaS Startups",
    "Mobile App Development",
    "AI/ML Companies",
    "Cybersecurity Firms",
    "Cloud Service Providers",
    "Web Development Studios",
    "Data Analytics Companies"
  ];

  const locations = [
    { city: "Bangalore", area: "Electronic City, Whitefield, Koramangala" },
    { city: "Pune", area: "Hinjewadi, Magarpatta, Aundh" },
    { city: "Hyderabad", area: "HITEC City, Gachibowli, Kondapur" },
    { city: "Chennai", area: "OMR, Thoraipakkam, Sholinganallur" },
    { city: "Mumbai", area: "BKC, Powai, Andheri" },
    { city: "Delhi NCR", area: "Gurgaon, Noida, Cyber City" }
  ];

  const plans = [
    {
      name: "IT Startup",
      price: "₹1,499",
      period: "/month",
      description: "Perfect for new IT companies",
      features: [
        "Business address in IT hub",
        "Company registration support",
        "Basic mail handling",
        "4 hours meeting room access",
        "Phone answering service",
        "STPI documentation help"
      ],
      popular: false
    },
    {
      name: "Growing Tech Firm",
      price: "₹2,999",
      period: "/month",
      description: "Ideal for expanding IT companies",
      features: [
        "Everything in IT Startup",
        "Multi-city presence (2 locations)",
        "Advanced meeting facilities",
        "Dedicated phone number",
        "Priority mail handling",
        "Export-import support",
        "Client presentation rooms"
      ],
      popular: true
    },
    {
      name: "Enterprise IT",
      price: "₹5,999",
      period: "/month",
      description: "For established IT enterprises",
      features: [
        "Everything in Growing Tech Firm",
        "Multiple IT hub locations",
        "Unlimited meeting rooms",
        "Dedicated account manager",
        "24/7 business support",
        "Custom compliance assistance",
        "Premium client facilities"
      ],
      popular: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Virtual Office for IT & Software Companies | SimplySetup</title>
        <meta name="description" content="Professional virtual office solutions for IT and software companies. Get business addresses in major tech hubs, meeting facilities, and compliance support." />
        <meta name="keywords" content="virtual office for IT companies, software company address, tech hub office space, IT company registration" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Monitor className="h-4 w-4 mr-2" />
                For IT & Software Companies
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Establish Your
                <span className="text-primary block">Tech Company Presence</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Build credibility in major IT hubs with professional business addresses, 
                meeting facilities, and compliance support designed specifically for 
                technology companies and software firms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3">
                  Setup IT Office Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  Explore Tech Hubs
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
                Why IT Companies Choose Our Virtual Offices
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Focus on innovation while we handle your business infrastructure in prime tech locations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
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

        {/* IT Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Perfect for All Types of IT Businesses
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you're developing software, providing IT services, or building the next big tech product.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                  <Code className="h-8 w-8 text-primary mx-auto mb-3" />
                  <span className="font-medium text-gray-900 text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Prime Locations in Major IT Hubs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Establish your presence in India's leading technology centers and innovation hubs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-primary" />
                      {location.city}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {location.area}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View Available Addresses
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                IT Company Focused Pricing
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Flexible plans designed for technology companies at every stage of growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : 'border-gray-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
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
                    <Button className={`w-full mt-8 ${plan.popular ? 'bg-primary' : ''}`}>
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
              Ready to Establish Your Tech Company?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join leading IT companies who trust SimplySetup for their business infrastructure needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8 py-3">
                Setup IT Office Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-white border-white hover:bg-white hover:text-primary">
                Schedule Tech Consultation
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}