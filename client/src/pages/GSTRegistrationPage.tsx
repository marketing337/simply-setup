import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Footer from "@/components/Footer";
import GetStartedZohoForm from "@/components/GetStartedZohoForm";
import {
  FileText,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Calculator,
  Users,
  Globe,
} from "lucide-react";
import { useState } from "react";

export default function GSTRegistrationPage() {
  const [isGSTDialogOpen, setIsGSTDialogOpen] = useState(false);
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);
  const benefits = [
    {
      icon: Shield,
      title: "Valid Business Address",
      description: "GST-compliant business address that meets all regulatory requirements and passes verification."
    },
    {
      icon: Clock,
      title: "Quick Registration Process",
      description: "Fast-track your GST registration with our streamlined process and expert documentation support."
    },
    {
      icon: FileText,
      title: "Complete Documentation",
      description: "We handle all paperwork, address verification, and compliance documentation for smooth approval."
    },
    {
      icon: Calculator,
      title: "Multi-State Registration",
      description: "Register for GST in multiple states with separate business addresses for optimal tax structure."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Dedicated GST experts guide you through the entire registration process and ongoing compliance."
    },
    {
      icon: Globe,
      title: "Nationwide Coverage",
      description: "Business addresses available in all major cities and states across India for GST registration."
    }
  ];

  const process = [
    {
      step: "1",
      title: "Choose Your Address",
      description: "Select from premium business addresses in your preferred city or state."
    },
    {
      step: "2",
      title: "Submit Documents",
      description: "Our experts help you prepare and submit all required documentation."
    },
    {
      step: "3",
      title: "Address Verification",
      description: "We handle the verification process with GST authorities on your behalf."
    },
    {
      step: "4",
      title: "Get GST Certificate",
      description: "Receive your GST registration certificate typically within 7-15 working days."
    }
  ];

  const documents = [
    "PAN Card of Business/Proprietor",
    "Aadhaar Card",
    "Business Registration Certificate",
    "Bank Account Details",
    "Address Proof (provided by us)",
    "Passport Size Photographs",
    "Business Activity Proof",
    "Digital Signature (if required)"
  ];

  const plans = [
    {
      name: "GST Starter",
      price: "₹1,999",
      period: "one-time",
      description: "Basic GST registration package",
      features: [
        "Business address for 1 year",
        "GST registration assistance",
        "Document preparation",
        "Address verification support",
        "Basic compliance guidance",
        "Email support"
      ],
      popular: false
    },
    {
      name: "GST Professional",
      price: "₹3,999",
      period: "one-time",
      description: "Complete GST setup solution",
      features: [
        "Everything in GST Starter",
        "Priority processing",
        "Multi-state registration option",
        "First year return filing",
        "Dedicated GST consultant",
        "Phone & email support",
        "Compliance calendar"
      ],
      popular: true
    },
    {
      name: "GST Enterprise",
      price: "₹7,999",
      period: "one-time",
      description: "Comprehensive GST solution",
      features: [
        "Everything in GST Professional",
        "Multiple state registrations",
        "Ongoing compliance support",
        "Monthly GST filing assistance",
        "Dedicated account manager",
        "24/7 support hotline",
        "Annual compliance review"
      ],
      popular: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>GST Registration with Business Address | SimplySetup</title>
        <meta name="description" content="Get GST registration with verified business address. Expert assistance, quick processing, and complete documentation support for GST registration across India." />
        <meta name="keywords" content="GST registration, business address for GST, GST registration online, GST consultant, business registration India" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
                <FileText className="h-4 w-4 mr-2" />
                GST Registration Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                GST Registration
                <span className="text-primary block">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Get your GST registration done quickly with a verified business address. 
                Our experts handle all documentation, verification, and compliance 
                requirements for a hassle-free registration process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog open={isGSTDialogOpen} onOpenChange={setIsGSTDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="px-8 py-3">
                      Start GST Registration
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Start GST Registration</DialogTitle>
                    </DialogHeader>
                    <GetStartedZohoForm />
                  </DialogContent>
                </Dialog>
                <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="lg" className="px-8 py-3">
                      Get Free Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Get Free Consultation</DialogTitle>
                    </DialogHeader>
                    <GetStartedZohoForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our GST Registration Service
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete end-to-end GST registration support with verified business addresses and expert guidance.
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

        {/* Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple 4-Step GST Registration Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our streamlined process makes GST registration quick and hassle-free.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <Card key={index} className="border-0 shadow-lg relative">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Required Documents for GST Registration
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We provide a complete checklist and help you prepare all necessary 
                  documents for smooth GST registration approval.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((document, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{document}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Need Help Getting Started?</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span>gst@simplysetup.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>+91 88888 88888</span>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Free Consultation:</strong> Our GST experts are available 
                      for a free consultation to discuss your specific requirements.
                    </p>
                  </div>
                  <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-6">
                        Schedule Free Consultation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader className="sr-only">
                        <DialogTitle>Schedule Free Consultation</DialogTitle>
                      </DialogHeader>
                      <GetStartedZohoForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                GST Registration Packages
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the package that best fits your business needs and budget.
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
                      <span className="text-gray-600 ml-1">{plan.period}</span>
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
                    <Dialog open={isGSTDialogOpen} onOpenChange={setIsGSTDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className={`w-full mt-8 ${plan.popular ? 'bg-primary' : ''}`}>
                          Choose Package
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader className="sr-only">
                          <DialogTitle>Choose GST Package</DialogTitle>
                        </DialogHeader>
                        <GetStartedZohoForm />
                      </DialogContent>
                    </Dialog>
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
              Ready to Get GST Registered?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses who have successfully registered for GST with our help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isGSTDialogOpen} onOpenChange={setIsGSTDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="lg" className="px-8 py-3">
                    Start Registration Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Start Registration Now</DialogTitle>
                  </DialogHeader>
                  <GetStartedZohoForm />
                </DialogContent>
              </Dialog>
              <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="px-8 py-3 text-white border-white hover:bg-white hover:text-primary">
                    Talk to GST Expert
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Talk to GST Expert</DialogTitle>
                  </DialogHeader>
                  <GetStartedZohoForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}