import { PlusIcon, MinusIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Location } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PAAQuestion {
  question: string;
  answer: string;
}

interface PAAResponse {
  questions: PAAQuestion[];
  cityName: string;
}

interface FaqSectionProps {
  location?: Location;
}

export default function FaqSection({ location }: FaqSectionProps) {
  // Fetch PAA questions if location is provided
  const { data: paaData } = useQuery<PAAResponse>({
    queryKey: ['/api/paa', location?.name],
    queryFn: async () => {
      if (!location?.name) return { questions: [], cityName: '' };
      const response = await fetch(`/api/paa/${encodeURIComponent(location.name)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch PAA data');
      }
      return response.json();
    },
    enabled: !!location?.name,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Enhanced FAQs with stronger focus on Virtual Office keyword
  const faqs = [
    {
      question: "What is a virtual office and how does it work?",
      answer: "A virtual office provides businesses with a prestigious physical address and professional office services without the overhead costs of a traditional office. Our virtual office solutions allow you to work from anywhere while maintaining a professional business presence. You receive a premium business address, mail handling services, and optional phone answering - all the benefits of a physical office without the high costs and long-term commitment."
    },
    {
      question: "What are the benefits of using a virtual office for my business?",
      answer: "Virtual offices offer numerous benefits including: 1) Cost savings - pay only for the services you need without expensive rent and utilities, 2) Professional image - gain credibility with a prestigious business address, 3) Flexibility - work from anywhere while maintaining a professional presence, 4) Mail management - have your mail professionally handled and forwarded, 5) Business registration - use your virtual address for GST and company registration, 6) Scalability - easily expand to multiple cities without physical relocation, and 7) Work-life balance - eliminate commuting while maintaining a professional business front."
    },
    {
      question: "How much does a virtual office cost?",
      answer: "Our virtual office plans are significantly more affordable than traditional office space. Monthly plans typically range from ₹1,500 to ₹5,000 depending on the location and included services. We offer flexible plans tailored to your specific business needs with transparent pricing and no hidden costs. This is a fraction of what you would pay for a physical office space in the same prestigious locations."
    },
    {
      question: "Can I use a virtual office address for GST registration?",
      answer: "Yes, our virtual office addresses are fully compliant for GST registration purposes. We provide legitimate business addresses that satisfy all GST requirements, making them suitable for GST registration, company incorporation, and other government documentation. Our addresses are verified and accepted by GST authorities across India. We provide all necessary documentation to ensure your registration process is smooth and compliant."
    },
    {
      question: "What services are included in your virtual office packages?",
      answer: "Our comprehensive virtual office packages include: 1) Premium business address in a prestigious location, 2) Professional mail and package handling, 3) Mail notification, scanning, forwarding, or holding options, 4) Dedicated phone answering services (premium plans), 5) Business address proof for registrations, 6) Access to meeting rooms and day offices (on-demand), 7) Receptionist services for visitors and calls, 8) Business support services, and 9) Virtual office agreement and documentation for government registrations."
    },
    {
      question: "How does mail handling work with a virtual office?",
      answer: "Our professional mail handling service ensures all your business correspondence is managed efficiently. When mail arrives at your virtual office address, we notify you immediately. You can choose to have your mail: 1) Scanned and emailed to you for immediate viewing, 2) Forwarded to your preferred physical address anywhere in the world, 3) Held securely at our office for collection at your convenience, or 4) Specific handling for confidential or important documents. This service is particularly valuable for businesses with remote teams or multiple locations."
    },
    {
      question: "How quickly can I get a virtual office set up?",
      answer: "Setting up your virtual office is remarkably quick compared to leasing traditional office space. We can typically have your virtual office fully operational within 24-48 hours of completing your registration and verification. Our streamlined process ensures you can start using your new business address almost immediately, allowing you to focus on growing your business rather than managing office logistics. We also offer expedited setup options for urgent business needs."
    },
    {
      question: "Can I use a virtual office if I'm based internationally?",
      answer: "Absolutely! Our virtual office solutions are perfect for international businesses looking to establish a presence in India without the complexities of setting up a physical office. Many of our clients are international companies and entrepreneurs who use our virtual offices to establish a local presence, test new markets, or meet legal requirements for business registration. We handle all your mail and provide local contact points, allowing you to operate seamlessly from anywhere in the world."
    }
  ];

  // Add location-specific FAQ entries
  const locationFaqs = location ? [
    {
      question: `Why choose a virtual office in ${location.name}?`,
      answer: `${location.name} is a prime business hub that offers excellent connectivity, prestigious address recognition, and access to a thriving business ecosystem. A virtual office in ${location.name} gives your business instant credibility and a professional image without the substantial costs of traditional office space in this premium location. Our ${location.name} virtual offices are situated in the most prestigious business districts, enhancing your company's reputation.`
    },
    {
      question: `What are the most popular areas for virtual offices in ${location.name}?`,
      answer: `In ${location.name}, the most sought-after virtual office locations include the central business district, major commercial hubs, and prestigious business parks. These areas offer excellent connectivity, recognized business addresses, and proximity to major business centers. Our virtual offices in ${location.name} are strategically located in premium buildings with excellent infrastructure and business amenities.`
    },
    {
      question: `Are your virtual office addresses in ${location.name} accepted for GST registration?`,
      answer: `Yes, all our ${location.name} virtual office addresses are fully accepted for GST registration. Our locations in ${location.name} are in compliance with GST requirements and are recognized business addresses that can be used for all official registrations and correspondence.`
    }
  ] : [];

  // Combine all FAQs: PAA questions first (most relevant to search), then location-specific, then general
  const paaQuestions = paaData?.questions || [];
  const combinedFaqs = location 
    ? [...paaQuestions, ...locationFaqs, ...faqs] 
    : faqs;

  return (
    <section className="py-14 bg-white" id="faq">
      <div className="site-container">
        <div className="text-center mb-8">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider">FAQ & People Also Ask</span>
          <h2 className="text-2xl font-bold mb-3 mt-2 tracking-tight">
            {location ? 
              `Virtual Office in ${location.name} - FAQ` : 
              `Virtual Office Solutions - FAQ Guide`
            }
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed tracking-wide">
            Common questions and answers about virtual office solutions{location ? ` in ${location.name}` : ''}, including popular searches and business inquiries.
          </p>
        </div>

        <div>
          <Accordion type="single" collapsible className="w-full">
            {combinedFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-base py-4 tracking-wide">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm md:text-base leading-relaxed tracking-wide py-1.5 px-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-sm md:text-base mb-4 tracking-wide">Still have questions? We're here to help.</p>
          <a 
            href="#contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium text-sm tracking-wide"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}