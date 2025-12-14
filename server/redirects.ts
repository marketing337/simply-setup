/**
 * URL Redirect Management for Dormant/Legacy URLs
 * Handles redirects from old site structure to maintain SEO value
 */

// Extract path from full URLs for dormant URL redirects
const dormantUrls = [
  '/products/virtual-office-in-gurgaon',
  '/products/virtual-office-in-kengeri',
  '/products/professional-tax-registration',
  '/products/virtual-office-in-baner',
  '/products/virtual-office-in-hadapsar',
  '/products/virtual-office-in-whitefield',
  '/products/virtual-office-in-akurdi',
  '/products/virtual-office-in-kalyani-nagar',
  '/products/virtual-office-in-devanahalli',
  '/products/virtual-office-in-aundh',
  '/collections/bharat-startup-kit.atom',
  '/products/virtual-office-in-malleshwaram',
  '/products/virtual-office-in-pune',
  '/products/virtual-office-in-bellandur',
  '/products/virtual-office-in-wakad',
  '/products/virtual-office-in-kondhwa',
  '/products/office-for-medical-business',
  '/products/virtual-office-in-dhankawadi',
  '/products/virtual-office-in-pimpri',
  '/products/llp-company-formation',
  '/products/virtual-office-in-balewadi',
  '/products/virtual-office-in-nigdi',
  '/products/ondc-seller-registration',
  '/products/virtual-office-in-bavdhan',
  '/products/virtual-office-in-btm-layout',
  '/products/unsecured-loan-financing',
  '/products/startup-debt-financing',
  '/collections/all/products/virtual-office-in-yerawada',
  '/collections/all/products/virtual-office-in-whitefield',
  '/collections/all/products/virtual-office-in-yelahanka',
  '/collections/virtual-office-by-industry/products/virtual-office-for-fintech-companies',
  '/products/virtual-office-for-freelancers',
  '/collections/virtual-office-by-industry/products/virtual-office-for-e-commerce-sellers',
  '/collections/virtual-office-by-city/products/virtual-office-in-ahmedabad',
  '/collections/virtual-office-by-industry/products/virtual-office-for-ai-companies',
  '/collections/virtual-office-by-industry/products/virtual-office-for-freelancers',
  '/collections/virtual-office-by-industry/products/virtual-office-for-blockchain-companies',
  '/products/virtual-office-for-fintech-companies',
  '/products/virtual-office-for-e-commerce-sellers',
  '/collections/virtual-office-by-industry/products/virtual-office-for-travel-agency',
  '/collections/virtual-office-by-industry.atom',
  '/collections/virtual-office-by-city/products/virtual-office-in-pune',
  '/collections/virtual-office-by-city/products/virtual-office-in-chennai',
  '/products/virtual-office-in-peenya',
  '/products/virtual-office-for-travel-agency',
  '/products/working-capital-financing',
  '/products/virtual-office-in-kanakapura-road',
  '/products/virtual-office-in-gift-city',
  '/collections/virtual-office/products/virtual-office-for-blockchain-companies',
  '/collections/virtual-office/products/virtual-office-in-gurgaon',
  '/collections/virtual-office/products/virtual-office-for-freelancers',
  '/collections/all?page=7',
  '/collections/virtual-office/products/virtual-office-for-travel-agency',
  '/collections/virtual-office/products/virtual-office-in-kolkata',
  '/collections/all/products/virtual-office-in-hinjewadi',
  '/collections/all/products/virtual-office-in-kengeri',
  '/collections/all/products/virtual-office-in-wagholi',
  '/collections/all/products/virtual-office-in-hyderabad',
  '/collections/all/products/virtual-office-for-import-export-business',
  '/collections/all/products/virtual-office-in-kanakapura-road',
  '/collections/all/products/virtual-office-in-koregaon-park',
  '/collections/all/products/startup-debt-financing',
  '/collections/all/products/virtual-office-in-magarpatta-city',
  '/collections/all/products/virtual-office-in-jayanagar',
  '/collections/all/products/virtual-office-in-dhankawadi',
  '/collections/all/products/amazon-seller-registration',
  '/collections/all/products/virtual-office-in-vadgaon',
  '/collections/all/products/virtual-office-in-shivaji-nagar',
  '/collections/all/products/virtual-office-for-blockchain-companies',
  '/collections/all/products/virtual-office-in-viman-nagar',
  '/collections/all/products/unsecured-loan-financing',
  '/collections/all/products/virtual-office-for-travel-agency',
  '/collections/all/products/virtual-office-in-rajajinagar',
  '/collections/all/products/virtual-office-for-fintech-companies',
  '/collections/all/products/virtual-office-in-mysore-road',
  '/collections/all/products/virtual-office-in-akurdi',
  '/collections/all/products/ondc-seller-registration',
  '/collections/all/products/virtual-office-in-vijaynagar',
  '/collections/all/products/virtual-office-in-pune',
  '/collections/all/products/virtual-office-in-balewadi',
  '/collections/all/products/virtual-office-in-pune-camp',
  '/collections/all/products/virtual-office-for-e-commerce-sellers',
  '/collections/all/products/virtual-office-in-hadapsar',
  '/collections/all/products/virtual-office-in-aundh',
  '/collections/all/products/virtual-office-in-dhanori',
  '/collections/all/products/virtual-office-in-devanahalli',
  '/collections/all/products/virtual-office-in-erandwane',
  '/collections/all/products/virtual-office-in-sarjapur-road',
  '/products/amazon-ads-consultation-drive-sales-and-maximize-roi',
  '/collections/all/products/virtual-office-in-swargate',
  '/collections/all/products/virtual-office-in-jp-nagar',
  '/collections/all.atom',
  '/collections/all/products/virtual-office-in-bavdhan',
  '/collections/all?page=4',
  '/collections/all/products/virtual-office-in-delhi',
  '/collections/all/products/virtual-office-in-bannerghatta-road',
  '/collections/all/products/virtual-office-in-kolkata',
  '/collections/all/products/virtual-office-in-old-madras-road',
  '/collections/all/products/virtual-office-in-hennur-road',
  '/collections/all/products/virtual-office-in-pimpri',
  '/collections/all/products/meeting-rooms-in-bangalore',
  '/collections/all/products/virtual-office-in-chennai',
  '/collections/all/products/virtual-office-in-basavanagudi',
  '/collections/all/products/virtual-office-in-outer-ring-road',
  '/collections/all/products/virtual-office-in-kondhwa',
  '/collections/all/products/gst-registration',
  '/collections/all/products/virtual-office-in-kothrud',
  '/collections/all/products/virtual-office-in-wakad',
  '/collections/all/products/virtual-office-in-electronic-city',
  '/collections/all/products/virtual-office-in-deccan',
  '/collections/all/products/virtual-office-in-malleshwaram',
  '/collections/all/products/virtual-office-in-koramangala',
  '/collections/all/products/private-limited-company-formation',
  '/collections/all/products/virtual-office-in-hoskote',
  '/collections/all/products/virtual-office-in-commercial-street',
  '/collections/all/products/virtual-office-in-bangalore',
];

/**
 * Middleware to handle dormant URL redirects
 * Redirects old URLs to homepage with 301 status for SEO preservation
 */
export function handleDormantRedirects(req: any, res: any, next: any) {
  const requestPath = req.path;
  
  // Check if the current path matches any dormant URL
  if (dormantUrls.includes(requestPath)) {
    console.log(`Redirecting dormant URL: ${requestPath} -> /`);
    return res.redirect(301, '/');
  }
  
  // Continue to next middleware if no redirect needed
  next();
}

/**
 * Get all dormant URLs for debugging/monitoring purposes
 */
export function getDormantUrls(): string[] {
  return [...dormantUrls];
}

/**
 * Check if a URL is in the dormant list
 */
export function isDormantUrl(path: string): boolean {
  return dormantUrls.includes(path);
}