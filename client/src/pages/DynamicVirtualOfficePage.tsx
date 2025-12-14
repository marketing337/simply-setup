import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle, Loader2, MapPin, Building2, Phone, Mail, X } from "lucide-react";
import type { DynamicPage } from "@shared/schema";

export default function DynamicVirtualOfficePage() {
  const [match, params] = useRoute<{ slug: string }>("/virtual-office/:slug");
  const slug = params?.slug || "";
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const { data: page, isLoading, error } = useQuery<DynamicPage>({
    queryKey: ["/api/dynamic-pages/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/dynamic-pages/slug/${slug}`);
      if (!response.ok) {
        throw new Error("Page not found");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading page...</p>
        </div>
        <Footer location={null} />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => window.location.href = "/"}>
            Go to Homepage
          </Button>
        </div>
        <Footer location={null} />
      </div>
    );
  }

  const benefits = page.benefitsContent.split('|||');
  const whyUs = page.whyUsContent.split('|||');

  // Pricing plans with feature comparison
  const pricingPlans = [
    {
      name: "Business Address",
      badge: "STARTS FROM",
      price: "4900",
      period: "/Year",
      description: "Good for Independent Consultants, Freelancers operating from Home",
      color: "blue",
      featuresCount: "5 Features Included",
    },
    {
      name: "VO for GST Registration",
      badge: "STARTS FROM",
      price: "7900",
      period: "/Year",
      description: "Ideal for Existing Companies, Ecommerce Sellers, Energy, Infra or Tourism Industry",
      color: "green",
      featuresCount: "8 Features Included",
      popular: true,
    },
    {
      name: "VO for Company Registration",
      badge: "STARTS FROM",
      price: "8900",
      period: "/Year",
      description: "Ideal for Forming an Entity (Proprietorship/Partnership/ Trust/LLP/OPC/Pvt Ltd)",
      color: "orange",
      featuresCount: "10 Features Included",
    },
  ];

  const comparisonFeatures = [
    {
      name: "Address Usage Rights (Use Address on Letterhead, Visiting Cards, Website)",
      icon: "building",
      included: [true, true, true]
    },
    {
      name: "Rent Agreement as per State's Rent Control Act",
      icon: "file",
      included: [false, true, true]
    },
    {
      name: "Advance GST Application, SCN Filing & Approval (No Extra Charges)",
      icon: "file",
      included: [false, true, true]
    },
    {
      name: "Register an Entity (Proprietorship/Partnership/Trust/LLP/OPC/Pvt Ltd)",
      icon: "building",
      included: [false, false, true]
    },
    {
      name: "Bank Account Formation and Bank Verification",
      icon: "building",
      included: [false, false, true]
    },
    {
      name: "On Ground Support + Representative",
      icon: "users",
      included: [false, true, true]
    },
    {
      name: "Cloud Storage Plan - every registered taxable person must maintain the accounts books and records Section 36 of the CGST Act, 2017",
      icon: "cloud",
      included: [false, true, true]
    },
    {
      name: "Permanent Basic Sign Board - Compliant with GST/RBI and MCA Acts",
      icon: "tag",
      included: [false, true, true]
    },
    {
      name: "Registered on Owned Properties - SingleSetup Verified and Controlled",
      icon: "home",
      included: [true, true, true]
    },
    {
      name: "Exclusive Discounts on Meeting Rooms and Dedicated Desks",
      icon: "tag",
      included: [true, true, true]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`Virtual Office in ${page.areaName} for ${page.purpose} | ${page.cityName}`}</title>
        <meta
          name="description"
          content={page.overviewContent.substring(0, 160)}
        />
        <meta
          name="keywords"
          content={`virtual office ${page.areaName}, ${page.purpose} ${page.cityName}, business address ${page.areaName}, virtual office for ${page.purpose}`}
        />
        <link rel="canonical" href={`https://yourdomain.com/virtual-office/${page.slug}`} />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {page.cityName} • {page.areaName}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Virtual Office in {page.areaName}
                <br />
                <span className="text-blue-600">for {page.purpose}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Professional business address in {page.areaName}, {page.cityName} with complete support for {page.purpose}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8" 
                  data-testid="button-get-started"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  Get Started Today
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8" 
                  data-testid="button-view-pricing"
                  onClick={() => {
                    const pricingSection = document.querySelector('[data-testid="section-pricing"]');
                    pricingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white" data-testid="section-overview">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Virtual Office in {page.areaName} for {page.purpose}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{page.overviewContent}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500" data-testid={`benefit-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-16 bg-white" data-testid="section-why-us">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Why Choose Us for {page.purpose} in {page.areaName}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {whyUs.map((reason, index) => {
                const [title, ...descParts] = reason.split(':');
                const description = descParts.join(':');
                return (
                  <div key={index} className="flex items-start space-x-4" data-testid={`why-us-${index}`}>
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                      {description && <p className="text-gray-600">{description}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Comparison Section */}
        <section className="py-16 bg-gray-50" data-testid="section-pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Transparent Pricing Plans and Deliverables
              </h2>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                (No Extra Charges / No Add Ons / No Up Sells)
              </p>
              <p className="text-gray-600">
                Our Starting Prices are the Lowest Ever! Paired with 10 Minutes Delivery in Select Cities.
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white">
                      <th className="text-left p-6 border-r">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Compare Features</h3>
                          <p className="text-sm text-gray-600">Select the plan that best fits your business needs</p>
                        </div>
                      </th>
                      {pricingPlans.map((plan, index) => (
                        <th key={index} className="p-6 border-r last:border-r-0">
                          <div className={`rounded-lg p-6 ${
                            plan.color === 'blue' ? 'bg-blue-50' : 
                            plan.color === 'green' ? 'bg-green-50' : 
                            'bg-orange-50'
                          }`}>
                            <div className={`text-xs font-semibold mb-2 ${
                              plan.color === 'blue' ? 'text-blue-600' : 
                              plan.color === 'green' ? 'text-green-600' : 
                              'text-orange-600'
                            }`}>
                              {plan.badge}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                            <div className="mb-3">
                              <span className={`text-3xl font-bold ${
                                plan.color === 'blue' ? 'text-blue-600' : 
                                plan.color === 'green' ? 'text-green-600' : 
                                'text-orange-600'
                              }`}>
                                ₹{plan.price}
                              </span>
                              <span className="text-gray-600">{plan.period}</span>
                            </div>
                            <p className="text-xs text-gray-600">{plan.description}</p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="p-4 border-r">
                          <div className="flex items-start">
                            <span className="text-sm text-gray-700">{feature.name}</span>
                          </div>
                        </td>
                        {feature.included.map((included, planIndex) => (
                          <td key={planIndex} className="p-4 text-center border-r last:border-r-0">
                            {included ? (
                              <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-6 h-6 text-red-500 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-white border-t-2">
                      <td className="p-6 border-r">
                        <div className="font-bold text-gray-900">TOTAL FEATURES</div>
                        <div className="text-2xl font-bold text-gray-900 mt-2">10 Benefits</div>
                      </td>
                      {pricingPlans.map((plan, index) => (
                        <td key={index} className="p-6 text-center border-r last:border-r-0">
                          <div className="text-sm text-gray-600 mb-3">{plan.featuresCount}</div>
                          <Button
                            className={`w-full ${
                              plan.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 
                              plan.color === 'green' ? 'bg-green-600 hover:bg-green-700' : 
                              'bg-orange-600 hover:bg-orange-700'
                            } text-white`}
                            onClick={() => setIsContactFormOpen(true)}
                            data-testid={`button-choose-plan-${index}`}
                          >
                            Choose Plan
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Establish Your Business in {page.areaName}?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get started with your {page.purpose} today and establish your professional presence in {page.cityName}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8" 
                data-testid="button-cta-primary"
                onClick={() => setIsContactFormOpen(true)}
              >
                <Phone className="mr-2 h-5 w-5" />
                Get Quote Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                data-testid="button-cta-secondary"
                onClick={() => setIsContactFormOpen(true)}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Dialog open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <div className="sticky top-0 z-10 bg-white p-4 border-b flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">Get Free Expert Advisory</DialogTitle>
            <DialogDescription className="sr-only">
              Fill out the form below to get free expert advisory for your virtual office needs
            </DialogDescription>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsContactFormOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-6">
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>

      <Footer location={null} />
    </div>
  );
}
