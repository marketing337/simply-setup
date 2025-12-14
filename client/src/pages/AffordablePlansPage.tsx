import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Crown, Zap, Building, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { Separator } from '@/components/ui/separator';

export default function AffordablePlansPage() {
  const { currentLocation } = useCurrentLocation();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Affordable Virtual Office Plans | SimplySetup"
        description="Explore our range of cost-effective virtual office plans starting from ₹1,499/month. Get a prestigious business address, mail handling, and professional services." 
      />
      <Navbar />

      <main className="pt-8 pb-16">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get 30% Discount on Virtual Office Plans
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Flexible and cost-effective virtual office solutions tailored to your business needs. Professional presence without the premium costs.
            </p>
          </div>

          {/* Price Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Lowest Prices Guaranteed</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Plan */}
              <Card className="border border-gray-200 transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Zap className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center">Basic Plan</CardTitle>
                  <CardDescription className="text-center">For startups and small businesses</CardDescription>
                  <div className="text-center mt-3">
                    <span className="text-3xl font-bold">₹1,499</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business address in commercial area</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail handling and notification</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Use address for GST registration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">2 hours meeting room access/month</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Select Basic</Button>
                </CardFooter>
              </Card>

              {/* Professional Plan */}
              <Card className="border-2 border-blue-500 transition-all hover:shadow-lg relative">
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs py-1 px-3 rounded-bl-lg font-medium">
                  POPULAR
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Star className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center">Professional</CardTitle>
                  <CardDescription className="text-center">For growing businesses</CardDescription>
                  <div className="text-center mt-3">
                    <span className="text-3xl font-bold">₹2,999</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Premium address in prime location</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail handling and weekly forwarding</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated phone number with call handling</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">5 hours meeting room access/month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business lounge access (2 days/month)</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">Select Professional</Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="border border-gray-200 transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Crown className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center">Premium</CardTitle>
                  <CardDescription className="text-center">For established businesses</CardDescription>
                  <div className="text-center mt-3">
                    <span className="text-3xl font-bold">₹4,999</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Elite address in premium business district</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail handling and daily forwarding</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated business line with personal assistant</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">10 hours meeting room access/month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business lounge access (unlimited)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Conference room (5 hours/month)</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Select Premium</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Separator className="my-10" />

          {/* Add-on Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add-on Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Communication Services</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated business phone number</span>
                    </div>
                    <span className="text-sm font-semibold">₹999/month</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Call answering service (100 calls)</span>
                    </div>
                    <span className="text-sm font-semibold">₹1,499/month</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Virtual receptionist</span>
                    </div>
                    <span className="text-sm font-semibold">₹2,499/month</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/contact#contact'}
                >
                  Add Communication Services
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Meeting Space</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Additional meeting room hours</span>
                    </div>
                    <span className="text-sm font-semibold">₹399/hour</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Conference room (up to 10 people)</span>
                    </div>
                    <span className="text-sm font-semibold">₹799/hour</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Day office (private office for a day)</span>
                    </div>
                    <span className="text-sm font-semibold">₹1,999/day</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/contact#contact'}
                >
                  Add Meeting Space
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Business Support</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business registration assistance</span>
                    </div>
                    <span className="text-sm font-semibold">₹4,999</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">GST registration assistance</span>
                    </div>
                    <span className="text-sm font-semibold">₹2,999</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Administrative support (10 hours)</span>
                    </div>
                    <span className="text-sm font-semibold">₹2,499</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/contact#contact'}
                >
                  Add Business Support
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Mail Services</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail scanning service</span>
                    </div>
                    <span className="text-sm font-semibold">₹999/month</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Additional mail forwarding</span>
                    </div>
                    <span className="text-sm font-semibold">₹499/month</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Package handling (large items)</span>
                    </div>
                    <span className="text-sm font-semibold">₹599/month</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/contact#contact'}
                >
                  Add Mail Services
                </Button>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">What is included in all virtual office plans?</h3>
                <p className="text-sm text-gray-600">
                  All our virtual office plans include a business address, mail handling, and the ability to use the address for business registration and GST registration. The differences between plans are in the quality of address location, additional services, and how much access you get to meeting facilities.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan later?</h3>
                <p className="text-sm text-gray-600">
                  Yes, you can easily upgrade or downgrade your virtual office plan at any time. Upgrades take effect immediately, while downgrades will be applied at the start of your next billing cycle.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Is there a setup fee or security deposit?</h3>
                <p className="text-sm text-gray-600">
                  There is a one-time setup fee of ₹2,000 for all new accounts. Some premium locations may require a refundable security deposit of ₹5,000 which is returned when you close your account, assuming all dues are cleared.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">How does the mail handling service work?</h3>
                <p className="text-sm text-gray-600">
                  When mail arrives at your virtual address, we notify you via email. Depending on your plan, we can forward the mail to your preferred address (at the frequency specified in your plan), scan and email the contents to you, or hold it for your collection.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Choose a plan that works for your business needs and start establishing your professional presence today. Not sure which plan is right for you? Contact us for a personalized recommendation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-md flex items-center mx-auto"
                onClick={() => window.location.href = '/contact#contact'}
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-50 px-6 py-2.5 rounded-md flex items-center mx-auto"
                onClick={() => {
                  const element = document.getElementsByTagName('h2')[0];
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Plans
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