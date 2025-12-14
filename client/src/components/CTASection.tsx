import { Location } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  location: Location;
}

export default function CTASection({ location }: CTASectionProps) {
  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to elevate your business presence in {location.name}?
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
          Get a prestigious address, professional services, and flexible workspace solutions without the overhead costs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            className="bg-white hover:bg-gray-100 text-primary font-medium px-8 py-3 rounded-md transition duration-300"
            onClick={() => {
              const pricingSection = document.getElementById('pricing');
              pricingSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Plans
          </Button>
          <Button
            variant="outline"
            className="bg-transparent hover:bg-blue-600 text-white border-2 border-white font-medium px-8 py-3 rounded-md transition duration-300"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
