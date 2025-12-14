import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Rocket, TrendingUp, CoinsIcon, GanttChartSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { Separator } from '@/components/ui/separator';

export default function StartupsPage() {
  const { currentLocation } = useCurrentLocation();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Virtual Office for Startups | SimplySetup"
        description="Specialized virtual office solutions for startups and early-stage businesses. Professional presence, cost-effective services, and flexible growth options." 
      />
      <Navbar />

      <main className="pt-8 pb-16">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Virtual Office Solutions for Startups
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Launch and grow your startup with a professional business presence without the overhead costs of traditional office space. Our virtual office solutions are specifically designed for early-stage companies and entrepreneurs.
            </p>
          </div>

          {/* Startup Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Why Startups Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <CoinsIcon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Cost Efficiency</h3>
                    <p className="text-sm text-gray-600">
                      Preserve your startup capital for growth, not rent. Save up to 80% compared to traditional office leasing.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">No security deposits or long-term commitments</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">No infrastructure or maintenance costs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Pay only for the services you need</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <Rocket className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Instant Credibility</h3>
                    <p className="text-sm text-gray-600">
                      Establish a professional image from day one with a prestigious business address and professional services.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Premium address in a business district</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Professional call handling services</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Impressive meeting spaces for client meetings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <TrendingUp className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Scalable Growth</h3>
                    <p className="text-sm text-gray-600">
                      Flex and scale your office services as your startup grows without disruption or relocation.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Flexible plans that grow with your business</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Add services as needed without changing address</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Easy expansion to multiple city locations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4">
                    <GanttChartSquare className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Business Operations Support</h3>
                    <p className="text-sm text-gray-600">
                      Focus on building your product while we handle essential business functions.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail handling and professional correspondence</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Administrative support services</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business registration and GST support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-10" />

          {/* Startup Packages */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Startup Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Startup Essentials</h3>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold">₹1,199</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Perfect for bootstrapped startups and solo founders looking to establish a professional presence.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business address for registration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail receipt and notification</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">2 hours meeting room access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">GST registration assistance</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = '/contact#contact'}
                    >
                      Select Essentials
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500 transition-all hover:shadow-lg relative p-6">
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs py-1 px-3 rounded-bl-lg font-medium">
                  POPULAR
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Startup Growth</h3>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold">₹2,499</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Designed for funded startups and growing teams that need comprehensive virtual office support.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Premium business address</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail handling and forwarding</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated business phone number</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Call answering service (50 calls/month)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">8 hours meeting room access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business lounge access (2 days/month)</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800"
                      onClick={() => window.location.href = '/contact#contact'}
                    >
                      Select Growth
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Startup Scale</h3>
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold">₹3,999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  For established startups ready to scale with robust business infrastructure and premium services.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Elite business district address</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Comprehensive mail management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">VIP business phone with personal receptionist</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unlimited call handling</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">15 hours meeting room access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business lounge access (unlimited)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Administrative support (5 hours/month)</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button 
                      className="w-full"
                      onClick={() => window.location.href = '/contact#contact'}
                    >
                      Select Scale
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Startup Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Additional Startup Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Business Registration Support</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Streamlined assistance for startup incorporation, registration, and compliance.
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Private Limited Company Registration - ₹6,999</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">LLP Registration - ₹4,999</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">GST Registration - ₹999</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Trademark Registration - ₹5,999</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/contact#contact'}
                >
                  Learn More
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Startup Networking Events</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Exclusive opportunities to connect with investors, mentors, and fellow founders.
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly Founder Meetups</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Quarterly Pitch Days</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Industry-Specific Workshops</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Investor Introduction Program</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/contact#contact'}
                >
                  View Calendar
                </Button>
              </Card>
            </div>
          </div>

          {/* Startup Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Startups Using Our Virtual Offices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="italic text-gray-700 mb-4">
                  "As a bootstrapped fintech startup, SimplySetup's virtual office gave us the prestigious Bangalore address we needed for credibility, while keeping our overhead costs minimal. Their GST registration assistance was invaluable for our early-stage compliance."
                </p>
                <div className="font-semibold">Arjun Mehta</div>
                <div className="text-sm text-gray-600">Founder, FinEdge Solutions</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="italic text-gray-700 mb-4">
                  "When we raised our seed round, we upgraded to SimplySetup's Growth package. The dedicated phone service and premium meeting rooms have been essential for impressing clients and investors. As we've grown from 2 to 15 team members, our virtual office has scaled with us."
                </p>
                <div className="font-semibold">Nisha Patel</div>
                <div className="text-sm text-gray-600">CEO, HealthTech Innovations</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to Launch Your Startup?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Get started with a virtual office solution that fits your startup's needs and budget. Our team understands the unique challenges of early-stage businesses and can create a custom solution for your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-md flex items-center mx-auto"
                onClick={() => window.location.href = '/contact#contact'}
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-2.5 rounded-md flex items-center mx-auto"
                onClick={() => {
                  const element = document.getElementsByTagName('h2')[1];
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Startup Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer location={currentLocation} />
    </>
  );
}