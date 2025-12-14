export interface CityConfig {
  name: string;
  slug: string;
  state: string;
  description: string;
}

export const cities: Record<string, CityConfig> = {
  mumbai: {
    name: "Mumbai",
    slug: "mumbai",
    state: "Maharashtra",
    description: "Start your company with a professional virtual office address in Mumbai, India's financial capital. Get MCA-approved registration addresses in prime Mumbai locations."
  },
  delhi: {
    name: "Delhi",
    slug: "delhi",
    state: "Delhi",
    description: "Register your company with a prestigious virtual office address in Delhi, the nation's capital. Access MCA-compliant business addresses in central Delhi locations."
  },
  bangalore: {
    name: "Bangalore",
    slug: "bangalore",
    state: "Karnataka",
    description: "Launch your startup with a virtual office in Bangalore, India's Silicon Valley. Get premium business addresses in key Bangalore tech hubs for your company registration."
  },
  hyderabad: {
    name: "Hyderabad",
    slug: "hyderabad",
    state: "Telangana",
    description: "Establish your company with a virtual office in Hyderabad. Access professional business addresses in major Hyderabad commercial zones for seamless MCA registration."
  },
  ahmedabad: {
    name: "Ahmedabad",
    slug: "ahmedabad",
    state: "Gujarat",
    description: "Register your business with a virtual office in Ahmedabad, Gujarat's commercial hub. Get verified business addresses across prime Ahmedabad locations."
  },
  chennai: {
    name: "Chennai",
    slug: "chennai",
    state: "Tamil Nadu",
    description: "Start your company with a virtual office in Chennai, the gateway to South India. Access MCA-approved addresses in prominent Chennai business districts."
  },
  kolkata: {
    name: "Kolkata",
    slug: "kolkata",
    state: "West Bengal",
    description: "Register your company with a virtual office in Kolkata, Eastern India's business center. Get professional addresses in key Kolkata commercial areas."
  },
  pune: {
    name: "Pune",
    slug: "pune",
    state: "Maharashtra",
    description: "Launch your business with a virtual office in Pune, Maharashtra's IT and education hub. Access premium business addresses across major Pune localities."
  },
  jaipur: {
    name: "Jaipur",
    slug: "jaipur",
    state: "Rajasthan",
    description: "Establish your company with a virtual office in Jaipur, Rajasthan's Pink City. Get MCA-compliant business addresses in central Jaipur locations."
  },
  surat: {
    name: "Surat",
    slug: "surat",
    state: "Gujarat",
    description: "Register your business with a virtual office in Surat, India's diamond and textile hub. Access verified addresses across key Surat commercial zones."
  },
  nagpur: {
    name: "Nagpur",
    slug: "nagpur",
    state: "Maharashtra",
    description: "Start your company with a virtual office in Nagpur, the heart of India. Get professional business addresses in prime Nagpur locations for company registration."
  },
  indore: {
    name: "Indore",
    slug: "indore",
    state: "Madhya Pradesh",
    description: "Launch your business with a virtual office in Indore, Madhya Pradesh's commercial capital. Access MCA-approved addresses in major Indore business districts."
  }
};
