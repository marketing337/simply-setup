import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import SEO from "@/components/SEO";
import { MapPin, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const { currentLocation } = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us | SimplySetup" 
        description="Get in touch with SimplySetup for virtual office solutions, GST registration, and business establishment services in India."
      />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Have questions about our virtual office solutions? We're here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Visit Us</h3>
                    <p className="mt-2 text-gray-600">S620, Manipal Center, MG Road, Bangalore</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Email Us</h3>
                    <p className="mt-2 text-gray-600">hello@simplysetup.co</p>
                  </div>
                </div>
                

              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Office Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                {/* New Zoho Contact Form */}
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}