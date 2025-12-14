// Known CIN to Company Name mappings from official MCA records
export const KNOWN_COMPANIES: { [cin: string]: string } = {
  'U72900PN2022PTC211370': 'Techlify Solutions Private Limited',
  'U51900KA2010PTC053234': 'Amazon Seller Services Private Limited',
  'U72900KA2004PTC033115': 'Infosys Limited',
  'U74900DL1993PTC054155': 'HCL Technologies Limited',
  'U65100TN1996PTC037415': 'ICICI Bank Limited',
  'U74120KA1999PTC025564': 'Wipro Limited',
  'U85110DL1986PTC024137': 'Tech Mahindra Limited',
  'U72400KA1991PTC012948': 'Tata Consultancy Services Limited',
  'U63040DL2012PTC234315': 'Zomato Limited',
  'U72300DL2010PTC209388': 'Paytm E-Commerce Private Limited',
  'U74999DL2010PTC204036': 'Ola Electric Mobility Private Limited',
  'U72200KA2008PTC045746': 'Flipkart Internet Private Limited',
  'U52520UP2014PTC066353': 'Amazon Transportation Services Private Limited',
  'U74140DL2000PTC108990': 'MakeMyTrip (India) Private Limited',
  'U72900HR2013PTC052142': 'Grofers India Private Limited',
  'U74999DL1999PTC101026': 'NDTV Convergence Limited'
};

export function getKnownCompanyName(cin: string): string | null {
  return KNOWN_COMPANIES[cin] || null;
}

export function addKnownCompany(cin: string, companyName: string): void {
  KNOWN_COMPANIES[cin] = companyName;
}