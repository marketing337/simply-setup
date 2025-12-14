import { Location } from "@shared/schema";
import { MapPin, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface ContactSectionProps {
  location: Location;
}

export default function ContactSection({ location }: ContactSectionProps) {
  return (
    <section id="contact" className="py-10 md:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="lg:flex items-start justify-between">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Your Virtual Office in {location.name}</h2>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              Interested in our virtual office solutions for GST registration in {location.name}? Fill out the form and one of our experts will help you set up your virtual office address quickly.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-100 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-semibold">Visit Us</h3>
                  <p className="mt-1 text-sm text-gray-600">S620, Manipal Center, MG Road, Bangalore</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-100 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-semibold">Email Us</h3>
                  <p className="mt-1 text-sm text-gray-600">hello@simplysetup.co</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-light p-5 rounded-lg shadow-sm">
            {/* New Zoho Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}