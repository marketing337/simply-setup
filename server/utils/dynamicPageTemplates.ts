export interface DynamicPageTemplate {
  overview: string;
  benefits: string[];
  whyUs: string[];
}

export function generateDynamicPageContent(
  areaName: string,
  cityName: string,
  purpose: string
): DynamicPageTemplate {
  const purposeLower = purpose.toLowerCase();
  
  // Overview content with keyword replacement
  const overview = `Looking for a professional business address for your ${purpose} in ${areaName}, ${cityName}? Our virtual office solutions provide you with a prestigious business address without the overhead costs of a physical office. Whether you're a startup, freelancer, or established business, we offer the perfect solution to establish your professional presence in ${areaName}. Get started with ${purpose} using our verified business address and complete documentation support.`;

  // Benefits based on purpose
  let benefits: string[] = [];
  
  if (purposeLower.includes('gst')) {
    benefits = [
      `Get a GST-compliant business address in prime ${areaName} location`,
      `Complete documentation support for ${purpose} in ${cityName}`,
      `Expert assistance with GST filing and compliance`,
      `Professional mail handling and forwarding services`,
      `Access to meeting rooms and coworking spaces`,
      `Verified address accepted by GST department`,
      `Quick registration process - Get started in 24-48 hours`,
      `Cost-effective solution - Save up to 80% compared to physical office`,
    ];
  } else if (purposeLower.includes('company registration')) {
    benefits = [
      `MCA-approved registered office address in ${areaName}, ${cityName}`,
      `Complete ${purpose} assistance with documentation`,
      `Digital Signature Certificate (DSC) procurement support`,
      `Director Identification Number (DIN) filing assistance`,
      `MOA & AOA preparation by experts`,
      `ROC filing and compliance support`,
      `Professional business address that builds credibility`,
      `Fast-track registration - Get incorporated in 15-20 days`,
    ];
  } else {
    benefits = [
      `Premium business address in ${areaName}, ${cityName}`,
      `Complete support for ${purpose}`,
      `Professional mail and package handling`,
      `Access to meeting rooms when needed`,
      `Business registration assistance`,
      `Dedicated support team`,
      `Flexible plans to suit your business needs`,
      `Trusted by 5000+ businesses across India`,
    ];
  }

  // Why Us section
  const whyUs = [
    `Prime Location: ${areaName} is one of the most sought-after business districts in ${cityName}, providing excellent connectivity and prestigious address`,
    `Verified & Compliant: Our business addresses are verified and accepted by government authorities for ${purpose}`,
    `All-Inclusive Service: From mail handling to meeting room access, we provide everything you need to run your business professionally`,
    `Expert Support: Our team has helped 5000+ businesses with their ${purpose} and business setup requirements`,
    `Cost-Effective: Save up to 80% compared to traditional office rentals while maintaining a professional business presence`,
    `Quick Setup: Get your business address and start your ${purpose} process within 24-48 hours`,
    `Flexible Plans: Choose from multiple plans tailored for startups, SMEs, and enterprises`,
    `Pan-India Presence: Expand to multiple cities with our virtual office network across 50+ locations in India`,
  ];

  return {
    overview,
    benefits,
    whyUs,
  };
}

export function generateSlugForDynamicPage(areaName: string, purpose: string): string {
  // Convert to lowercase and replace spaces with hyphens
  const areaSlug = areaName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const purposeSlug = purpose.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  return `${areaSlug}-${purposeSlug}`;
}
