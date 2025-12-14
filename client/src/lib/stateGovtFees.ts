export interface StateGovtFees {
  state: string;
  slug: string;
  govtFees: number;
  dscCharges: number;
  description: string;
  capital: string;
  businessHub: string;
}

export const DSC_CHARGES = 3000;
export const DSC_DIRECTORS_COUNT = 2;
export const DSC_DESCRIPTION = "for 2 directors";

export const stateGovtFeesData: StateGovtFees[] = [
  {
    state: "Andhra Pradesh",
    slug: "andhra-pradesh",
    govtFees: 2963,
    dscCharges: DSC_CHARGES,
    description: "Register your company in Andhra Pradesh with a professional virtual office address. Get MCA-compliant registration with transparent government fees and expert support.",
    capital: "Amaravati",
    businessHub: "Visakhapatnam, Vijayawada"
  },
  {
    state: "Arunachal Pradesh",
    slug: "arunachal-pradesh",
    govtFees: 2153,
    dscCharges: DSC_CHARGES,
    description: "Start your business in Arunachal Pradesh with virtual office for company registration. Lowest government fees and complete ROC filing support.",
    capital: "Itanagar",
    businessHub: "Itanagar, Naharlagun"
  },
  {
    state: "Bihar",
    slug: "bihar",
    govtFees: 2963,
    dscCharges: DSC_CHARGES,
    description: "Incorporate your company in Bihar with compliant virtual office address. Professional registration services with transparent pricing.",
    capital: "Patna",
    businessHub: "Patna, Gaya, Muzaffarpur"
  },
  {
    state: "Chhattisgarh",
    slug: "chhattisgarh",
    govtFees: 2946,
    dscCharges: DSC_CHARGES,
    description: "Register your business in Chhattisgarh with virtual office services. Complete company registration support with competitive government fees.",
    capital: "Raipur",
    businessHub: "Raipur, Bhilai, Bilaspur"
  },
  {
    state: "Goa",
    slug: "goa",
    govtFees: 2643,
    dscCharges: DSC_CHARGES,
    description: "Set up your company in Goa with premium virtual office address. Ideal for tourism, hospitality, and IT businesses with transparent registration fees.",
    capital: "Panaji",
    businessHub: "Panaji, Margao, Vasco da Gama"
  },
  {
    state: "Gujarat",
    slug: "gujarat",
    govtFees: 2063,
    dscCharges: DSC_CHARGES,
    description: "Start your business in Gujarat, India's industrial powerhouse. Low government fees and premium virtual office addresses in Ahmedabad, Surat, and Vadodara.",
    capital: "Gandhinagar",
    businessHub: "Ahmedabad, Surat, Vadodara, Rajkot"
  },
  {
    state: "Haryana",
    slug: "haryana",
    govtFees: 1578,
    dscCharges: DSC_CHARGES,
    description: "Register your company in Haryana with one of the lowest government fees in India. Virtual office addresses in Gurgaon, Faridabad, and other business hubs.",
    capital: "Chandigarh",
    businessHub: "Gurgaon, Faridabad, Ambala, Panipat"
  },
  {
    state: "Himachal Pradesh",
    slug: "himachal-pradesh",
    govtFees: 1566,
    dscCharges: DSC_CHARGES,
    description: "Incorporate your business in Himachal Pradesh with the lowest registration fees. Perfect for eco-tourism, pharma, and manufacturing businesses.",
    capital: "Shimla",
    businessHub: "Shimla, Dharamshala, Solan"
  },
  {
    state: "Jharkhand",
    slug: "jharkhand",
    govtFees: 1616,
    dscCharges: DSC_CHARGES,
    description: "Start your company in Jharkhand with affordable government fees. Virtual office services in Ranchi and other industrial centers.",
    capital: "Ranchi",
    businessHub: "Ranchi, Jamshedpur, Dhanbad"
  },
  {
    state: "Karnataka",
    slug: "karnataka",
    govtFees: 11463,
    dscCharges: DSC_CHARGES,
    description: "Register your startup in Karnataka, India's technology capital. Premium virtual office addresses in Bangalore's tech corridors with complete MCA compliance.",
    capital: "Bangalore",
    businessHub: "Bangalore, Mysore, Hubli, Mangalore"
  },
  {
    state: "Kerala",
    slug: "kerala",
    govtFees: 4468,
    dscCharges: DSC_CHARGES,
    description: "Incorporate your business in Kerala with professional virtual office services. Ideal for IT, tourism, and export-oriented businesses.",
    capital: "Thiruvananthapuram",
    businessHub: "Kochi, Thiruvananthapuram, Kozhikode"
  },
  {
    state: "Madhya Pradesh",
    slug: "madhya-pradesh",
    govtFees: 8993,
    dscCharges: DSC_CHARGES,
    description: "Start your company in Madhya Pradesh with comprehensive registration support. Virtual office addresses in Bhopal, Indore, and other business centers.",
    capital: "Bhopal",
    businessHub: "Bhopal, Indore, Gwalior, Jabalpur"
  },
  {
    state: "Manipur",
    slug: "manipur",
    govtFees: 1703,
    dscCharges: DSC_CHARGES,
    description: "Register your business in Manipur with affordable government fees. Virtual office services for Northeast India expansion.",
    capital: "Imphal",
    businessHub: "Imphal"
  },
  {
    state: "Meghalaya",
    slug: "meghalaya",
    govtFees: 1853,
    dscCharges: DSC_CHARGES,
    description: "Incorporate your company in Meghalaya with competitive registration fees. Perfect for eco-tourism and agri-business ventures.",
    capital: "Shillong",
    businessHub: "Shillong"
  },
  {
    state: "Mizoram",
    slug: "mizoram",
    govtFees: 1703,
    dscCharges: DSC_CHARGES,
    description: "Start your business in Mizoram with low government fees. Virtual office solutions for companies expanding to Northeast India.",
    capital: "Aizawl",
    businessHub: "Aizawl"
  },
  {
    state: "Nagaland",
    slug: "nagaland",
    govtFees: 1703,
    dscCharges: DSC_CHARGES,
    description: "Register your company in Nagaland with affordable registration fees. Ideal for businesses targeting the Northeast market.",
    capital: "Kohima",
    businessHub: "Kohima, Dimapur"
  },
  {
    state: "Odisha",
    slug: "odisha",
    govtFees: 2053,
    dscCharges: DSC_CHARGES,
    description: "Incorporate your business in Odisha with competitive government fees. Virtual office addresses in Bhubaneswar and other industrial hubs.",
    capital: "Bhubaneswar",
    businessHub: "Bhubaneswar, Cuttack, Rourkela"
  },
  {
    state: "Punjab",
    slug: "punjab",
    govtFees: 11468,
    dscCharges: DSC_CHARGES,
    description: "Start your company in Punjab with professional registration support. Virtual office services in Chandigarh, Ludhiana, and other business centers.",
    capital: "Chandigarh",
    businessHub: "Ludhiana, Amritsar, Jalandhar, Mohali"
  },
  {
    state: "Rajasthan",
    slug: "rajasthan",
    govtFees: 6953,
    dscCharges: DSC_CHARGES,
    description: "Register your business in Rajasthan with transparent pricing. Virtual office addresses in Jaipur, Udaipur, and other growing business centers.",
    capital: "Jaipur",
    businessHub: "Jaipur, Udaipur, Jodhpur, Kota"
  },
  {
    state: "Sikkim",
    slug: "sikkim",
    govtFees: 1443,
    dscCharges: DSC_CHARGES,
    description: "Incorporate your company in Sikkim with the lowest government fees in India. Tax incentives and virtual office services for eligible businesses.",
    capital: "Gangtok",
    businessHub: "Gangtok"
  },
  {
    state: "Tamil Nadu",
    slug: "tamil-nadu",
    govtFees: 2163,
    dscCharges: DSC_CHARGES,
    description: "Start your business in Tamil Nadu, India's manufacturing hub. Low government fees and premium virtual office addresses in Chennai and Coimbatore.",
    capital: "Chennai",
    businessHub: "Chennai, Coimbatore, Madurai, Tiruchirappalli"
  },
  {
    state: "Telangana",
    slug: "telangana",
    govtFees: 2963,
    dscCharges: DSC_CHARGES,
    description: "Register your startup in Telangana, home to Hyderabad's IT corridor. Complete company registration with virtual office and MCA compliance support.",
    capital: "Hyderabad",
    businessHub: "Hyderabad, Warangal, Karimnagar"
  },
  {
    state: "Tripura",
    slug: "tripura",
    govtFees: 1703,
    dscCharges: DSC_CHARGES,
    description: "Incorporate your business in Tripura with affordable registration fees. Virtual office services for Northeast India operations.",
    capital: "Agartala",
    businessHub: "Agartala"
  },
  {
    state: "Uttar Pradesh",
    slug: "uttar-pradesh",
    govtFees: 2453,
    dscCharges: DSC_CHARGES,
    description: "Start your company in Uttar Pradesh, India's most populous market. Virtual office addresses in Noida, Greater Noida, Lucknow, and more.",
    capital: "Lucknow",
    businessHub: "Noida, Greater Noida, Lucknow, Kanpur, Varanasi"
  },
  {
    state: "Uttarakhand",
    slug: "uttarakhand",
    govtFees: 2453,
    dscCharges: DSC_CHARGES,
    description: "Register your business in Uttarakhand with competitive fees. Ideal for pharma, IT, and eco-tourism businesses with tax benefits.",
    capital: "Dehradun",
    businessHub: "Dehradun, Haridwar, Rishikesh"
  },
  {
    state: "West Bengal",
    slug: "west-bengal",
    govtFees: 1813,
    dscCharges: DSC_CHARGES,
    description: "Incorporate your company in West Bengal with affordable government fees. Virtual office addresses in Kolkata and other business centers.",
    capital: "Kolkata",
    businessHub: "Kolkata, Howrah, Siliguri, Durgapur"
  },
  {
    state: "Delhi",
    slug: "delhi",
    govtFees: 1803,
    dscCharges: DSC_CHARGES,
    description: "Start your company in Delhi, India's capital and business hub. Low government fees and premium virtual office addresses across Delhi NCR.",
    capital: "New Delhi",
    businessHub: "Connaught Place, Nehru Place, Okhla, Dwarka"
  },
  {
    state: "Assam",
    slug: "assam",
    govtFees: 2153,
    dscCharges: DSC_CHARGES,
    description: "Register your company in Assam, the gateway to Northeast India. Virtual office services with competitive government fees in Guwahati and other business centers.",
    capital: "Dispur",
    businessHub: "Guwahati, Silchar, Dibrugarh"
  },
  {
    state: "Maharashtra",
    slug: "maharashtra",
    govtFees: 4963,
    dscCharges: DSC_CHARGES,
    description: "Register your company in Maharashtra, India's economic capital. Premium virtual office addresses in Mumbai, Pune, and Navi Mumbai with complete MCA compliance.",
    capital: "Mumbai",
    businessHub: "Mumbai, Pune, Navi Mumbai, Thane, Nagpur"
  }
];

export function getStateBySlug(slug: string): StateGovtFees | undefined {
  return stateGovtFeesData.find(state => state.slug === slug);
}

export function getAllStateSlugs(): string[] {
  return stateGovtFeesData.map(state => state.slug);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
