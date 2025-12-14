import { Location } from "@shared/schema";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingSectionProps {
  location: Location;
}

export default function PricingSection({ location }: PricingSectionProps) {
  const plans = [
    {
      name: "Starter",
      price: "999",
      period: "per month",
      description: "Perfect for entrepreneurs and startups",
      features: [
        `Professional business address in ${location.name}`,
        "Mail handling & forwarding",
        "Use address for business registration",
        "Call answering service (10 calls/month)",
        "Access to meeting rooms (2 hours/month)"
      ],
      popular: false,
      color: "bg-white"
    },
    {
      name: "Business",
      price: "2,499",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        `Premium business address in ${location.name}`,
        "Priority mail handling & forwarding",
        "Use address for business registration & GST",
        "Dedicated phone number",
        "Call answering service (50 calls/month)",
        "Access to meeting rooms (10 hours/month)",
        "Access to coworking space (5 days/month)"
      ],
      popular: true,
      color: "bg-primary text-white"
    },
    {
      name: "Enterprise",
      price: "4,999",
      period: "per month",
      description: "For established businesses with multiple needs",
      features: [
        `Premium business address in ${location.name}`,
        "Priority mail handling with scanning",
        "Use address for multiple business registrations",
        "Dedicated phone number with custom greeting",
        "Unlimited call answering service",
        "Unlimited access to meeting rooms",
        "Access to coworking space (15 days/month)",
        "Dedicated account manager"
      ],
      popular: false,
      color: "bg-white"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Affordable Virtual Office Plans in {location.name}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`animate-fade-in-up ${index === 1 ? "lg:-mt-4 lg:-mb-4" : ""}`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card className={`h-full ${plan.popular ? 'ring-2 ring-primary shadow-lg relative' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold py-1 px-4 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className={`${plan.popular ? plan.color : ''} rounded-t-lg`}>
                  <CardTitle className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </CardTitle>
                  <CardDescription className={`${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-500 ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className={`h-5 w-5 mt-0.5 ${plan.popular ? 'text-primary' : 'text-green-500'}`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    size="lg" 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white hover:bg-gray-50 text-primary border border-primary'}`}
                  >
                    {plan.popular ? 'Get Started Now' : 'Choose Plan'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h3>
          <p className="text-gray-600 mb-6">
            Contact our team for customized virtual office packages tailored to your specific business requirements.
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            Contact Sales Team
          </Button>
        </div>
      </div>
    </div>
  );
}