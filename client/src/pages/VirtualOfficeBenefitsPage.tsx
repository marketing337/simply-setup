import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, MapPin, Mail, Phone, Clock, Shield, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { Separator } from '@/components/ui/separator';

export default function VirtualOfficeBenefitsPage() {
  const { currentLocation } = useCurrentLocation();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Benefits of a Virtual Office | SimplySetup"
        description="Discover the advantages of using a virtual office: prestigious business address, mail handling, receptionist services, low operational costs, and more." 
      />
      <Navbar />

      <main className="pt-8 pb-16">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Benefits of a Virtual Office
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Establish a professional business presence without the overhead costs of traditional office space. Our virtual office solutions come with a range of benefits for businesses of all sizes.
            </p>
          </div>

          {/* Top Benefits Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Prestigious Business Address</h3>
                    <p className="text-sm text-gray-600">
                      Gain credibility with a premium business address in a prime location without the premium rent.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Use on business cards, website, and marketing materials</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Register your business with a commercial address</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">GST registration eligible address</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Mail Handling Services</h3>
                    <p className="text-sm text-gray-600">
                      Professional mail and package handling with flexible forwarding options.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Secure mail reception and storage</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail forwarding to your preferred address</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Package notification and handling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Receptionist Services</h3>
                    <p className="text-sm text-gray-600">
                      Professional call answering and client handling by trained staff.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated business phone number</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Professional call handling and message taking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Call screening and forwarding</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Flexible Meeting Spaces</h3>
                    <p className="text-sm text-gray-600">
                      On-demand access to professional meeting rooms and facilities.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Pay-as-you-use meeting rooms</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Professional spaces for client meetings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Fully equipped conference facilities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-10" />

          {/* Business Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Business Advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <div className="mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Cost Efficiency</h3>
                <p className="text-gray-600 text-sm">
                  Save up to 60-80% on operational costs compared to traditional office leasing. No need for furniture, utilities, or maintenance costs.
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="mx-auto bg-indigo-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Enhanced Credibility</h3>
                <p className="text-gray-600 text-sm">
                  Establish professional credibility with clients and partners through a prestigious business address and professional communication services.
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="mx-auto bg-emerald-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <ArrowRight className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-lg mb-3">Business Flexibility</h3>
                <p className="text-gray-600 text-sm">
                  Scale your business operations without relocating. Expand into new markets with minimal risk and investment in physical infrastructure.
                </p>
              </Card>
            </div>
          </div>
          
          {/* Comparison Table */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Virtual Office vs. Traditional Office</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border">Feature</th>
                    <th className="text-left p-3 border">Virtual Office</th>
                    <th className="text-left p-3 border">Traditional Office</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border font-medium">Setup Cost</td>
                    <td className="p-3 border text-green-700">Low (₹5,000 - ₹15,000)</td>
                    <td className="p-3 border text-red-700">High (₹2-10 Lakhs+)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Monthly Cost</td>
                    <td className="p-3 border text-green-700">₹499 - ₹1499</td>
                    <td className="p-3 border text-red-700">₹30,000 - ₹2,00,000+</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Commitment</td>
                    <td className="p-3 border text-green-700">Flexible (Monthly/Quarterly/Annual)</td>
                    <td className="p-3 border text-red-700">Typically 3-5 year lease</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Address Quality</td>
                    <td className="p-3 border text-green-700">Premium locations available</td>
                    <td className="p-3 border text-amber-700">Depends on budget</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Maintenance</td>
                    <td className="p-3 border text-green-700">Included</td>
                    <td className="p-3 border text-red-700">Additional cost</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Utilities</td>
                    <td className="p-3 border text-green-700">Included</td>
                    <td className="p-3 border text-red-700">Additional cost</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Staff</td>
                    <td className="p-3 border text-green-700">Shared reception/admin included</td>
                    <td className="p-3 border text-red-700">Must hire separately</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="italic text-gray-700 mb-4">
                  "SimplySetup's virtual office has been a game-changer for my consultancy. I have a prestigious address in the heart of Bangalore's business district at a fraction of what it would cost to rent there. Client meetings in their conference rooms are always impressive."
                </p>
                <div className="font-semibold">Priya Sharma</div>
                <div className="text-sm text-gray-600">Independent Financial Consultant</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="italic text-gray-700 mb-4">
                  "As a tech startup, we needed to maintain a professional image while keeping costs low. SimplySetup's virtual office gave us exactly that - a prime Mumbai address, professional call handling, and meeting rooms when we need them. It's been essential to our growth."
                </p>
                <div className="font-semibold">Rajiv Mehta</div>
                <div className="text-sm text-gray-600">Founder, TechNova Solutions</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to Enjoy the Benefits?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Set up your virtual office today and start experiencing all these benefits for your business. Our plans are flexible and can be tailored to your specific needs.
            </p>
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-md flex items-center mx-auto"
              onClick={() => window.location.href = '/contact#contact'}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      <Footer location={currentLocation} />
    </>
  );
}