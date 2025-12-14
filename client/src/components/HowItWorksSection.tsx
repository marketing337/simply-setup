import { ArrowRight, Building2, BadgeCheck, Headphones, FileText } from "lucide-react";

export default function HowItWorksSection() {
  const StepIcon = ({ index }: { index: number }) => {
    switch(index) {
      case 0:
        return <Building2 className="h-6 w-6 text-blue-500" />;
      case 1:
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 2:
        return <BadgeCheck className="h-6 w-6 text-blue-500" />;
      case 3:
        return <Headphones className="h-6 w-6 text-blue-500" />;
      default:
        return <Building2 className="h-6 w-6 text-blue-500" />;
    }
  };

  const steps = [
    {
      title: "Choose Your Virtual Office Location",
      description: "Select from our premium virtual office locations across major Indian cities for your GST registration.",
    },
    {
      title: "Complete GST Registration Documents",
      description: "We'll prepare all necessary documentation for using our address for GST registration.",
    },
    {
      title: "Receive Address Verification",
      description: "Get your virtual office address verified with all documentation needed for GST filing.",
    },
    {
      title: "Ongoing GST Compliance Support",
      description: "Enjoy continuous support for your GST notices and all virtual office mail handling.",
    }
  ];

  return (
    <section className="py-8 bg-white" id="how-it-works">
      <div className="site-container">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">How to Setup Virtual Office for GST Registration</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Setting up your virtual office for GST registration is a simple four-step process. 
            We've streamlined everything to get your business GST-ready quickly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 p-2.5 rounded-lg relative z-10 h-full flex flex-col"
            >
              <div className="mb-2 flex justify-center">
                <StepIcon index={index} />
                <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-1.5 text-center tracking-tight">{step.title}</h3>
              <p className="text-gray-600 text-xs text-center flex-grow leading-relaxed tracking-wide">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-0">
                  <ArrowRight className="h-3 w-3 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="#contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium text-sm tracking-wide"
          >
            Get Virtual Office for GST
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}