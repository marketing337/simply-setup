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
  Target,
  Rocket,
  Shield,
  Globe,
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

export default function TechStartupsPage() {
  const benefits = [
    {
      icon: Target,
      title: "Professional Business Address",
      description:
        "Establish credibility with a prestigious business address in prime locations without the overhead costs.",
    },
    {
      icon: Shield,
      title: "GST Registration Support",
      description:
        "Complete assistance with GST registration using your virtual office address for compliance.",
    },
    {
      icon: Globe,
      title: "Mail Handling Services",
      description:
        "Professional mail forwarding and handling services to keep your business communications organized.",
    },
    {
      icon: Users,
      title: "Meeting Room Access",
      description:
        "Access to professional meeting rooms and conference facilities when you need to meet clients.",
    },
    {
      icon: Building2,
      title: "Coworking Space Access",
      description:
        "Flexible access to modern coworking spaces across multiple cities for your growing team.",
    },
    {
      icon: Phone,
      title: "Call Answering Services",
      description:
        "Professional call answering and forwarding services to maintain your business image.",
    },
  ];

  const features = [
    "No long-term lease commitments",
    "Instant business address verification",
    "Professional receptionist services",
    "24/7 mail and package handling",
    "Multiple city presence options",
    "Scalable as your startup grows",
  ];

  const plans = [
    {
      name: "Startup Basic",
      price: "₹999",
      period: "/month",
      description: "Perfect for early-stage tech startups",
      features: [
        "Professional business address",
        "Mail forwarding service",
        "GST registration support",
        "Basic call answering",
        "2 hours meeting room access",
      ],
      popular: false,
    },
    {
      name: "Growth Plan",
      price: "₹1,999",
      period: "/month",
      description: "Ideal for scaling tech companies",
      features: [
        "Everything in Startup Basic",
        "Dedicated phone number",
        "Advanced call handling",
        "8 hours meeting room access",
        "Coworking space access",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹3,999",
      period: "/month",
      description: "For established tech companies",
      features: [
        "Everything in Growth Plan",
        "Multiple location addresses",
        "Unlimited meeting room access",
        "Dedicated account manager",
        "Custom mail handling",
        "Priority coworking access",
      ],
      popular: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Virtual Office for Tech Startups | SimplySetup</title>
        <meta
          name="description"
          content="Professional virtual office solutions designed specifically for tech startups. Get a prestigious business address, GST registration support, and flexible workspace access."
        />
        <meta
          name="keywords"
          content="virtual office for startups, tech startup office, business address for startups, GST registration, startup office space"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Rocket className="h-4 w-4 mr-2" />
                For Tech Startups
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Virtual Office for
                <span className="text-primary block">Tech Startups</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Establish your tech startup with a professional business
                presence. Get a prestigious address, GST registration support,
                and flexible workspace access without the overhead costs of
                traditional office space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  View Pricing
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
                Why Tech Startups Choose Our Virtual Office
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Focus on building your product while we handle your business
                infrastructure needs.
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

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Everything Your Startup Needs to Succeed
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our virtual office solutions are specifically designed for the
                  unique needs of tech startups, providing flexibility,
                  professionalism, and scalability.
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
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Ready to Get Started?
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
                  <Button className="w-full mt-6">
                    Schedule a Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Startup-Friendly Pricing
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the plan that fits your startup's current stage and scale
                as you grow.
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
              Join 1000+ Tech Startups Already Using SimplySetup
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start building your business with confidence. Get your virtual
              office setup in just 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="px-8 py-3">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-white border-white hover:bg-white hover:text-primary"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer location={null} />
    </>
  );
}
