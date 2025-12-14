import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Globe, Users, Laptop, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { Separator } from '@/components/ui/separator';

export default function RemoteWorkSolutionsPage() {
  const { currentLocation } = useCurrentLocation();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Remote Work Solutions | SimplySetup"
        description="Empower your remote workforce with our virtual office solutions. Professional business address, communication services, and flexible meeting spaces for remote teams." 
      />
      <Navbar />

      <main className="pt-8 pb-16">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Remote Work Solutions
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Empower your distributed team with professional virtual office services that maintain your business credibility while supporting flexible, remote work arrangements.
            </p>
          </div>

          {/* Remote Work Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Benefits for Remote Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <Globe className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Professional Business Presence</h3>
                    <p className="text-sm text-gray-600">
                      Maintain a professional company image with prestigious business addresses in prime locations.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Prestigious address for marketing materials and business registration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Local phone numbers with professional call handling</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail and package handling services</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <Users className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Team Collaboration Spaces</h3>
                    <p className="text-sm text-gray-600">
                      Access to on-demand meeting rooms and collaborative workspaces when your team needs to come together.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Flexible booking of meeting rooms for team gatherings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Professional spaces for client meetings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Day offices for focused work sessions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <Laptop className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Remote Work Infrastructure</h3>
                    <p className="text-sm text-gray-600">
                      Essential services that enable seamless remote operations and team management.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Virtual receptionist services for call management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Digital mail scanning and management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business administration support for remote teams</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-amber-100 p-2 rounded-lg mr-4">
                    <Home className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Work-Life Balance</h3>
                    <p className="text-sm text-gray-600">
                      Support your team's well-being while maintaining professional operations.
                    </p>
                  </div>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Eliminate commute time while maintaining professional image</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Separation of personal and business communications</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Flexible access to professional environments when needed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator className="my-10" />

          {/* Remote Work Solutions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Our Remote Work Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Virtual Team Headquarters</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Establish a professional headquarters for your distributed team with dedicated business address and communication services.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Premium business address in a major city</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Professional call answering and forwarding</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Mail management and digital scanning</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">10 hours/month of meeting room access</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Multi-City Team Support</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Support teams distributed across multiple cities with local virtual offices and unified services.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Virtual offices in multiple Indian cities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Local phone numbers with unified call handling</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Meeting rooms available in all locations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Centralized mail forwarding to any location</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Remote Collaboration Package</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Enhanced meeting and collaboration facilities for distributed teams that need occasional in-person interaction.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">20 hours/month of meeting room access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Advanced video conferencing equipment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Business lounge access for team members</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Catering and refreshment services</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 transition-all hover:shadow-md p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Remote Admin Support</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Administrative and operational support services tailored for remote and virtual teams.
                </p>
                <CardContent className="p-0 space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated virtual assistant (10 hours/week)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Document processing and management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Calendar and scheduling management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Basic customer service and client coordination</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button className="w-full">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Remote Work Stats */}
          <div className="mb-12 bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Remote Work Trends in India</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">73%</div>
                <p className="text-sm text-gray-600">of Indian companies now offer remote work options to employees</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">62%</div>
                <p className="text-sm text-gray-600">of remote workers cite better work-life balance as the top benefit</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">48%</div>
                <p className="text-sm text-gray-600">of businesses report cost savings from reduced office space</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">65%</div>
                <p className="text-sm text-gray-600">of job seekers prioritize remote work options when job hunting</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Remote Teams Using Our Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="italic text-gray-700 mb-4">
                  "Our team of 15 developers works remotely across India. SimplySetup's virtual office gives us a prestigious Bangalore address and meeting rooms for our monthly team gatherings. The professional call answering service means we never miss important client calls."
                </p>
                <div className="font-semibold">Vikram Desai</div>
                <div className="text-sm text-gray-600">CTO, CodeStack Technologies</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="italic text-gray-700 mb-4">
                  "As a digital marketing agency with team members in multiple cities, SimplySetup's multi-city solution has been perfect. We have virtual offices in Mumbai, Delhi, and Bangalore, allowing us to serve clients nationwide while our team works from anywhere."
                </p>
                <div className="font-semibold">Priya Sharma</div>
                <div className="text-sm text-gray-600">Founder, DigiReach Marketing</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to Empower Your Remote Team?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Get in touch to discuss how our virtual office solutions can support your remote work strategy. We'll create a custom package tailored to your team's specific needs.
            </p>
            <Button 
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-md flex items-center mx-auto"
              onClick={() => window.location.href = '/contact#contact'}
            >
              Contact Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      <Footer location={currentLocation} />
    </>
  );
}