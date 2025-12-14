import React from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "@/hooks/useLocation";
import { MapPin, Check, Clock, Star, Users, Briefcase, Building2, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function AwfisPartnership() {
  const { currentLocation } = useLocation();
  
  // Custom styles for red theme
  const redGradient = "from-red-900 via-red-800 to-red-900";
  const redAccent = "bg-red-700";
  const redText = "text-red-700";
  const redButtonHover = "hover:bg-red-800";
  const redBorder = "border-red-300";
  
  const features = [
    {
      title: "Premium Addresses",
      description: "Access to premium Awfis addresses in prime business districts across India.",
      icon: <MapPin className="h-6 w-6 text-red-700" />
    },
    {
      title: "Meeting Rooms",
      description: "Book professional meeting rooms at any Awfis location on demand.",
      icon: <Users className="h-6 w-6 text-red-700" />
    },
    {
      title: "Flexible Workspace",
      description: "Drop in to work at any Awfis location when you need a dedicated workspace.",
      icon: <Building2 className="h-6 w-6 text-red-700" />
    },
    {
      title: "Business Support",
      description: "Comprehensive business services including mail handling and call management.",
      icon: <Briefcase className="h-6 w-6 text-red-700" />
    },
    {
      title: "Networking Events",
      description: "Access to exclusive Awfis community events and professional networking.",
      icon: <Star className="h-6 w-6 text-red-700" />
    },
    {
      title: "24/7 Access",
      description: "Round-the-clock access to select Awfis centers for ultimate flexibility.",
      icon: <Clock className="h-6 w-6 text-red-700" />
    }
  ];
  
  const plans = [
    {
      name: "Basic",
      price: "₹1,499",
      period: "per month",
      description: "Essential virtual office solution with Awfis business address",
      features: [
        "Premium business address",
        "Mail handling & notifications",
        "GST registration eligible",
        "Digital mail forwarding",
        "2 hours of meeting room credits"
      ]
    },
    {
      name: "Professional",
      price: "₹2,999",
      period: "per month",
      description: "Complete virtual office solution with enhanced Awfis benefits",
      features: [
        "Everything in Basic plan",
        "5 days of Awfis workspace access",
        "8 hours of meeting room credits",
        "Call answering service",
        "Business lounge access",
        "Networking events access"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "₹4,999",
      period: "per month",
      description: "Premium virtual office solution with full Awfis integration",
      features: [
        "Everything in Professional plan",
        "10 days of Awfis workspace access",
        "20 hours of meeting room credits",
        "Dedicated phone number",
        "Premium business address options",
        "Discounted event space booking"
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Custom Navbar with red accents */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center flex-1 md:flex-auto">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <span className={`${redText} font-bold text-2xl cursor-pointer`}>SimplySetup</span>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-dark hover:text-red-600 font-medium">Features</a>
              <a href="#plans" className="text-dark hover:text-red-600 font-medium">Plans</a>
              <a href="#locations" className="text-dark hover:text-red-600 font-medium">Locations</a>
              <a href="#contact" className="text-dark hover:text-red-600 font-medium">Contact</a>
            </div>
            
            <div className="hidden md:flex items-center">
              <a href="#contact">
                <Button className={`ml-6 ${redAccent} ${redButtonHover} text-white font-medium transition duration-300`}>
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-b ${redGradient} text-white`}>
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
          <Badge className="bg-white text-red-900 text-xs uppercase tracking-wider py-1 px-4 mb-4 inline-block font-semibold">
            Exclusive Partnership
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            SimplySetup <span className="text-white">X</span> Awfis
          </h1>
          
          <p className="text-xl opacity-90 mb-10 leading-relaxed mx-auto max-w-3xl">
            Experience the best of both worlds: SimplySetup's virtual office solutions powered by Awfis's premium workspaces across India. Perfect for GST registration, business address, and flexible workspace needs.
          </p>
          
          <div className="flex justify-center">
            <a href="#contact">
              <Button size="lg" className="bg-white text-red-800 hover:bg-gray-100 font-medium px-8">
                Get Virtual Office
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${redText}`}>
              Exclusive Partnership Benefits
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Enjoy these premium features with our SimplySetup X Awfis partnership
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-md border border-red-100 text-gray-800"
              >
                <div className="bg-red-50 p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Premium Solutions Section */}
      <section className={`py-20 bg-gradient-to-b ${redGradient} text-white`} id="plans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Limited Time Offers
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Get enterprise-quality workspace solutions at remarkably affordable rates
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Star className="h-7 w-7 mr-3 text-yellow-300" />
                  Cost-Effective Benefits
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Up to 70% less expensive than traditional office space</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>No long-term leases or security deposits required</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Flexible monthly subscriptions that grow with your business</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Eliminate overhead costs like utilities, maintenance, and office staff</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Bundled services for maximum value with no hidden fees</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Building2 className="h-7 w-7 mr-3 text-yellow-300" />
                  Premium Enterprise Features
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Premium business addresses in high-value commercial districts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Professional reception and call answering services</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Access to modern, well-equipped meeting rooms and workspaces</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Complete business support including mail handling and GST registration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span>Networking opportunities with other business professionals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <a href="#contact">
              <Button size="lg" className="bg-white text-red-800 hover:bg-gray-100 font-medium">
                Contact Us for Pricing Details
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Awfis Locations Map */}
      <section className="py-20 bg-white" id="locations">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${redText}`}>
              Awfis Premium Locations
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Access 150+ premium Awfis workspaces across 14 cities in India
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')" }}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Modern Workspaces</h3>
                <p className="text-gray-700 mb-4">
                  State-of-the-art facilities designed to boost productivity and make a lasting impression. Fully-equipped workspaces that reflect your business's professional identity.
                </p>
                <a href="#contact">
                  <Button className={`${redAccent} ${redButtonHover} text-white w-full sm:w-auto`}>
                    Book a Tour
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 flex flex-col justify-center">
              <div className={`w-16 h-16 ${redAccent} rounded-full flex items-center justify-center mb-4`}>
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Nationwide Presence</h3>
              <p className="text-gray-700 mb-6">
                SimplySetup X Awfis gives you access to premium business addresses in Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, Kolkata, and more.
              </p>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start">
                  <Check className={`h-5 w-5 ${redText} mr-2 flex-shrink-0 mt-0.5`} />
                  <span>14+ major Indian cities covered</span>
                </li>
                <li className="flex items-start">
                  <Check className={`h-5 w-5 ${redText} mr-2 flex-shrink-0 mt-0.5`} />
                  <span>150+ premium business locations</span>
                </li>
                <li className="flex items-start">
                  <Check className={`h-5 w-5 ${redText} mr-2 flex-shrink-0 mt-0.5`} />
                  <span>Prime commercial district addresses</span>
                </li>
              </ul>
              <a href="#contact">
                <Button className={`${redAccent} ${redButtonHover} text-white w-full sm:w-auto`}>
                  Find An Awfis Location
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className={`py-16 md:py-24 bg-gradient-to-b ${redGradient} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-start justify-between">
            <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your Virtual Office with Awfis Partnership</h2>
              <p className="text-xl text-white/90 mb-8">
                Interested in our exclusive SimplySetup X Awfis partnership? Fill out the form and one of our experts will help you set up your virtual office address quickly.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-white/10 text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Visit Us</h3>
                    <p className="mt-2 text-white/80">Awfis Space Solutions, Mumbai, Maharashtra</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-white/10 text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Call Us</h3>
                    <p className="mt-2 text-white/80">+91 22 4123 5678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-white/10 text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Email Us</h3>
                    <p className="mt-2 text-white/80">partnership@simplysetup.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-white rounded-lg shadow-lg py-8 px-4 sm:px-6">
              {/* New Zoho Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer with Red Theme */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className={`text-2xl ${redText} font-bold mb-4`}>SimplySetup X Awfis</div>
              <p className="text-gray-400">
                Premium virtual office solutions powered by Awfis's nationwide workspace network.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#plans" className="text-gray-400 hover:text-white">Plans</a></li>
                <li><a href="#locations" className="text-gray-400 hover:text-white">Locations</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} SimplySetup. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}