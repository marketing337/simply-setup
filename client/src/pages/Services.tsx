import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, DollarSign, ExternalLink, Clock, CheckCircle, Star, Users, TrendingUp, Shield, Phone, Mail } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Service } from "@shared/schema";

export default function ServicesPage() {
  const { countryName } = useCountry();

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services', { country: countryName }],
    queryFn: () => fetch(`/api/services?country=${countryName}`).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-lg font-medium text-gray-700">Loading professional services...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                  <Shield className="h-8 w-8" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Trusted by 50,000+ Businesses
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Professional Business
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Registration Services
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Start your business journey with complete legal compliance and expert guidance in {countryName}
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">50K+</div>
                  <div className="text-sm text-blue-200">Businesses Registered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">99%</div>
                  <div className="text-sm text-blue-200">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">7 Days</div>
                  <div className="text-sm text-blue-200">Average Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">24/7</div>
                  <div className="text-sm text-blue-200">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-16 px-4">
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services
              .filter(service => service.isActive)
              .map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden" data-testid={`card-service-${service.id}`}>
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${
                    service.name.includes('GST') ? 'from-blue-600 to-purple-600' :
                    service.name.includes('Company') ? 'from-green-600 to-teal-600' :
                    service.name.includes('LLP') ? 'from-purple-600 to-indigo-600' :
                    service.name.includes('Partnership') ? 'from-pink-600 to-purple-600' :
                    'from-orange-600 to-red-600'
                  } p-4 text-center`}>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                      {service.name}
                    </h3>
                    {service.isPopular && (
                      <Badge className="mt-2 bg-orange-500 text-white text-xs">
                        MOST POPULAR
                      </Badge>
                    )}
                  </div>
                  
                  {/* Professional Image */}
                  <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <CheckCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-tight">
                      {service.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                    
                    {/* ADD Button */}
                    <Link href={`/services/${service.slug}`}>
                      <button 
                        className="w-full py-2 px-4 bg-white border-2 border-green-500 text-green-600 font-semibold text-xs rounded hover:bg-green-50 transition-colors"
                        data-testid={`button-add-${service.id}`}
                      >
                        ADD
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          {services.filter(service => service.isActive).length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                <div className="bg-gray-100 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-gray-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Services Coming Soon</h3>
                <p className="text-lg text-gray-600 mb-6">
                  We're working hard to bring you comprehensive business services for {countryName}.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Notify Me When Available
                </Button>
              </div>
            </div>
          )}

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-12 text-white mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose SimplySetup?</h2>
              <p className="text-xl text-indigo-100">Experience the difference of working with India's leading business registration experts</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast Processing</h3>
                <p className="text-indigo-100">Get your business registered in record time with our streamlined processes and expert team.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">100% Legal Compliance</h3>
                <p className="text-indigo-100">Stay worry-free with complete adherence to all government regulations and requirements.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Support</h3>
                <p className="text-indigo-100">Get personalized guidance from our experienced business consultants at every step.</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Start Your Business Journey?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of entrepreneurs who chose SimplySetup for their business registration needs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Schedule Free Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Get Expert Advice
                </Button>
              </div>
              
              <div className="flex items-center justify-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Free consultation • No hidden fees • 100% money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer location={null} />
    </>
  );
}