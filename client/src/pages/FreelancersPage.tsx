import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import {
  Users,
  Briefcase,
  Clock,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Star,
  FileText,
} from "lucide-react";

export default function FreelancersPage() {
  const benefits = [
    {
      icon: Briefcase,
      title: "Professional Business Identity",
      description: "Establish credibility with clients using a prestigious business address and professional services."
    },
    {
      icon: Shield,
      title: "Business Registration Support",
      description: "Complete assistance with business registration, GST setup, and compliance requirements."
    },
    {
      icon: Clock,
      title: "Flexible Meeting Spaces",
      description: "Access to professional meeting rooms when you need to meet clients face-to-face."
    },
    {
      icon: Globe,
      title: "Multi-City Presence",
      description: "Establish your presence in multiple cities without the cost of physical offices."
    },
    {
      icon: Mail,
      title: "Professional Mail Handling",
      description: "Never miss important documents with our reliable mail forwarding service."
    },
    {
      icon: Phone,
      title: "Dedicated Phone Services",
      description: "Professional call answering and forwarding to maintain your business image."
    }
  ];

  const industries = [
    "IT Consultants & Developers",
    "Digital Marketing Experts",
    "Graphic Designers & Creatives",
    "Business Consultants",
    "Financial Advisors",
    "Legal Consultants",
    "Content Writers & Copywriters",
    "Architects & Engineers"
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Digital Marketing Consultant",
      content: "SimplySetup's virtual office gave me the professional edge I needed. Clients trust me more with a proper business address.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "IT Consultant",
      content: "The meeting room access is fantastic. I can meet clients professionally without the overhead of maintaining an office.",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Business Consultant",
      content: "Their mail handling service is excellent. All my important documents reach me on time, and I never miss anything.",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Solo Professional",
      price: "₹899",
      period: "/month",
      description: "Perfect for individual freelancers",
      features: [
        "Professional business address",
        "Basic mail forwarding",
        "GST registration support",
        "Phone answering service",
        "2 hours meeting room/month"
      ],
      popular: false
    },
    {
      name: "Business Builder",
      price: "₹1,599",
      period: "/month",
      description: "Ideal for growing consultants",
      features: [
        "Everything in Solo Professional",
        "Dedicated phone number",
        "Advanced call handling",
        "6 hours meeting room/month",
        "Business registration support",
        "Priority mail handling"
      ],
      popular: true
    },
    {
      name: "Professional Plus",
      price: "₹2,999",
      period: "/month",
      description: "For established consultants",
      features: [
        "Everything in Business Builder",
        "Multiple city addresses",
        "Unlimited meeting rooms",
        "Coworking space access",
        "Dedicated account manager",
        "Custom call scripts"
      ],
      popular: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Virtual Office for Freelancers & Consultants | SimplySetup</title>
        <meta name="description" content="Professional virtual office solutions for freelancers and consultants. Get a business address, meeting rooms, and professional services to boost your credibility." />
        <meta name="keywords" content="virtual office for freelancers, consultant office space, professional business address, meeting rooms for freelancers" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
                <Users className="h-4 w-4 mr-2" />
                For Freelancers & Consultants
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Elevate Your
                <span className="text-primary block">Freelance Business</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform your freelance career with a professional business presence. 
                Get a prestigious address, meeting spaces, and business services that 
                make you stand out from the competition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3">
                  Start Your Professional Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  See Success Stories
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
                Why Freelancers Love Our Virtual Office
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Focus on your expertise while we handle your business infrastructure needs.
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

        {/* Industries Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Perfect for All Types of Professionals
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you're a consultant, designer, developer, or any other professional, 
                our virtual office solutions adapt to your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="font-medium text-gray-900">{industry}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Success Stories from Fellow Professionals
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how other freelancers and consultants have transformed their businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-gray-700 italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
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
                Affordable Plans for Every Professional
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the plan that matches your current needs and upgrade as you grow.
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
              Ready to Transform Your Professional Image?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful freelancers and consultants who trust SimplySetup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8 py-3">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-white border-white hover:bg-white hover:text-primary">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}