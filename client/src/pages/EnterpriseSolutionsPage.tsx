import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Building, Globe, BarChart3, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { Separator } from '@/components/ui/separator';

export default function EnterpriseSolutionsPage() {
  const { currentLocation } = useCurrentLocation();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Enterprise Virtual Solutions | SimplySetup"
        description="Comprehensive virtual office solutions for enterprise businesses. Multi-location presence, dedicated services, and custom corporate packages." 
      />
      <Navbar />

      <main className="pt-8 pb-16">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Enterprise Virtual Solutions
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Comprehensive virtual office solutions designed for large organizations. Establish and manage a multi-location presence with premium services tailored to enterprise requirements.
            </p>
          </div>

          {/* Enterprise Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Enterprise-Grade Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <Globe className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Multi-Location Management</h3>
                    <p className="text-sm text-gray-600">
                      Establish a nationwide presence with virtual offices in multiple prime locations.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unified management of multiple virtual locations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Consistent service quality across all locations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Centralized administrative dashboard</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <Building className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Premium Business Presence</h3>
                    <p className="text-sm text-gray-600">
                      Maintain prestigious addresses in prime business districts without the overhead.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Elite addresses in commercial districts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated receptionists and administrative staff</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Corporate-grade meeting facilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <BarChart3 className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Cost-Effective Expansion</h3>
                    <p className="text-sm text-gray-600">
                      Expand your corporate footprint without the capital expenditure of physical offices.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Significant reduction in real estate costs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">No maintenance or utility expenses</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Flexible scaling as business needs change</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Enterprise Security & Compliance</h3>
                    <p className="text-sm text-gray-600">
                      Maintain regulatory compliance and data security across all virtual locations.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Secure mail handling and document processing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Compliance with local business regulations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Confidentiality agreements with all staff</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-10" />

          {/* Enterprise Solutions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Enterprise Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Multi-Location Virtual Office Package</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Establish a unified corporate presence across multiple Indian cities with coordinated virtual office services.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Premium addresses in 5+ major cities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Centralized mail handling and forwarding</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Consistent branding at all locations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Administrative support in each city</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">Request Quote</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Enterprise Communication Suite</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive call handling and client communication services across your virtual office network.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Local phone numbers in all locations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated receptionists trained on your business</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Call routing to appropriate departments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Advanced call reporting and analytics</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">Request Quote</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Corporate Meeting Facilities</h3>
                <p className="text-sm text-gray-600 mb-4">
                  On-demand access to premium meeting spaces and conference rooms in all virtual office locations.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Boardrooms and meeting spaces as needed</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Advanced A/V and presentation equipment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Catering and event support services</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Centralized reservation system</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">Request Quote</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Compliance & Administrative Services</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Dedicated support for regulatory compliance and administrative needs across multiple jurisdictions.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Multi-state GST compliance assistance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Corporate document management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Secure document storage and retrieval</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Quarterly compliance reviews</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">Request Quote</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enterprise Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Enterprise Success Stories</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="italic text-gray-700 mb-4">
                "SimplySetup's enterprise solution allowed us to establish a pan-India presence across 7 major cities without the overhead of traditional office spaces. Their centralized management system makes it incredibly easy to coordinate services across all locations."
              </p>
              <div className="font-semibold">Rajesh Khanna</div>
              <div className="text-sm text-gray-600">COO, TechGlobal Solutions</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="italic text-gray-700 mb-4">
                "As we expanded our financial services business across India, SimplySetup provided a consistent, professional experience for our clients in every city. Their enterprise-grade security protocols gave us complete confidence in handling sensitive client documents."
              </p>
              <div className="font-semibold">Sanjay Mehta</div>
              <div className="text-sm text-gray-600">Regional Director, Pinnacle Financial Group</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Request a Custom Enterprise Solution</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our enterprise solutions are tailored to your specific business requirements. Contact our corporate services team for a personalized consultation.
            </p>
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-md flex items-center mx-auto"
              onClick={() => window.location.href = '/contact#contact'}
            >
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      <Footer location={currentLocation} />
    </>
  );
}