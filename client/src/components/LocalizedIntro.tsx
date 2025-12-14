import { Location } from "@shared/schema";
import { Building, Clock, MapPin, CheckCircle, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface LocalizedIntroProps {
  location: Location;
}

export default function LocalizedIntro({ location }: LocalizedIntroProps) {
  const BenefitIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'address':
        return <MapPin className="h-5 w-5 text-primary" />;
      case 'gst':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'presence':
        return <Building className="h-5 w-5 text-primary" />;
      case 'legal':
        return <Shield className="h-5 w-5 text-primary" />;
      case 'mail':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'support':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      default:
        return <Building className="h-5 w-5 text-primary" />;
    }
  };

  const citySpecificBenefits = [
    {
      title: `Business Address & GST Registration`,
      description: `Establish credibility with a prestigious ${location.name} business address for your company registration and GST compliance without the high costs of a physical office. Our address is fully compliant for all business registrations.`,
      iconType: 'address',
      secondaryIconType: 'gst',
      features: [
        `Premium ${location.name} business address`,
        `Complete GST registration support`,
        `No physical office costs`
      ]
    },
    {
      title: `Legal Compliance & Market Presence`,
      description: `Expand into the ${location.name} market while ensuring all legal requirements are met. Our virtual office solutions help you establish a legitimate business presence without traditional overhead costs.`,
      iconType: 'presence',
      secondaryIconType: 'legal',
      features: [
        `Full legal compliance for registrations`,
        `${location.name} market entry solution`,
        `Business credibility without high rent`
      ]
    },
    {
      title: `Mail Handling & Professional Support`,
      description: `Comprehensive mail management and professional administrative support for your ${location.name} business operations. Our team handles all communication needs as per your requirements.`,
      iconType: 'mail',
      secondaryIconType: 'support',
      features: [
        `Mail receiving, scanning & forwarding`,
        `Professional call handling`,
        `Complete administrative support`
      ]
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="site-container">
        {/* Section heading only */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Choose a Virtual Office in {location.name}?
          </h2>
        </div>

        <section aria-labelledby="benefits-section" className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {citySpecificBenefits.map((benefit, index) => (
            <article 
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
            >
              <div className="flex justify-center items-center mb-4 gap-3">
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <BenefitIcon type={benefit.iconType} />
                </div>
                <div className="bg-primary/10 p-2.5 rounded-lg">
                  <BenefitIcon type={benefit.secondaryIconType} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center tracking-tight">{benefit.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed tracking-wide px-0.5 mb-4">{benefit.description}</p>
              <ul className="text-gray-700 text-sm space-y-2 mt-auto">
                {benefit.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-2 text-primary mt-0.5">•</div>
                    <span className="text-sm tracking-wide leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
        
        {/* Comparison Table: Virtual Office vs Traditional Office */}
        <section aria-labelledby="comparison-section" className="mb-10">
          <h2 id="comparison-section" className="text-2xl font-bold text-center text-gray-900 mb-4">
            Virtual Office vs Traditional Office
          </h2>
          <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100">
            <table className="min-w-full bg-white">
              <caption className="sr-only">Comparison between Virtual and Traditional Office Solutions</caption>
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="py-3.5 px-5 text-left text-base font-semibold text-gray-700">Features</th>
                  <th scope="col" className="py-3.5 px-5 text-left text-base font-semibold text-primary">Virtual Office</th>
                  <th scope="col" className="py-3.5 px-5 text-left text-base font-semibold text-gray-700">Traditional Office</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th scope="row" className="py-3 px-5 font-medium text-sm text-left">Monthly Cost</th>
                  <td className="py-3 px-5 text-primary font-medium text-sm text-left">500-1000</td>
                  <td className="py-3 px-5 text-sm text-left">₹30,000 - ₹2,00,000+</td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 px-5 font-medium text-sm text-left">Setup Time</th>
                  <td className="py-3 px-5 text-primary font-medium text-sm text-left">1-2 days</td>
                  <td className="py-3 px-5 text-sm text-left">Weeks to months</td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 px-5 font-medium text-sm text-left">Business Address</th>
                  <td className="py-3 px-5 text-primary font-medium text-sm text-left">Premium location</td>
                  <td className="py-3 px-5 text-sm text-left">Based on budget</td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 px-5 font-medium text-sm text-left">Commitment</th>
                  <td className="py-3 px-5 text-primary font-medium text-sm text-left">Flexible</td>
                  <td className="py-3 px-5 text-sm text-left">3-5 year lease</td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 px-5 font-medium text-sm text-left">Maintenance</th>
                  <td className="py-3 px-5 text-primary font-medium text-sm text-left">Included</td>
                  <td className="py-3 px-5 text-sm text-left">Extra cost</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-base px-6 py-2.5 h-auto font-medium"
            onClick={() => window.location.href = `/${location.slug}/virtual-office`}
          >
            Get Your Virtual Office in {location.name}
          </Button>
          <p className="mt-3 text-sm text-gray-700 max-w-md mx-auto">
            Premium business addresses with complete mail handling services
          </p>
        </div>
      </div>
    </div>
  );
}