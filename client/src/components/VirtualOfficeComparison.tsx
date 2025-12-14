import {
  Check,
  X,
  Star,
  Shield,
  Building,
  Phone,
  Mail,
  FileText,
  Award,
  Zap,
} from "lucide-react";

const competitorOptions = [
  { value: "instaspaces", name: "InstaSpaces" },
  { value: "aaddress", name: "Aaddress" },
  { value: "myhq", name: "MyHQ" },
  { value: "teamco", name: "TeamCO Work" },
  { value: "wework", name: "WeWork" },
  { value: "qdesq", name: "qDesq" },
  { value: "direct", name: "Direct Coworking Space" },
];

const competitorData = {
  instaspaces: {
    name: "InstaSpaces",
    pricing: "From ₹1,200/month",
    timeline: "7-10 days",
    support: "Business hours only",
    gstHandling: "Additional charges apply",
    representative: "Shared representative",
    address: "Standard address",
    documents: "Available",
    propertyTax: "Available",
    gmb: "Basic setup only",
    gst: "Extra Charges",
    mca: "Basic assistance",
    msme: "₹1,500 extra",
  },
  aaddress: {
    name: "Aaddress",
    pricing: "From ₹1,500/month",
    timeline: "5-7 days",
    support: "Limited support",
    gstHandling: "Not included",
    representative: "No dedicated support",
    address: "Shared address",
    documents: "Available",
    propertyTax: "Available",
    gmb: "DIY instructions",
    gst: "Extra Charges",
    mca: "Extra charges",
    msme: "₹2,000 extra",
  },
  myhq: {
    name: "MyHQ",
    pricing: "From ₹2,000/month",
    timeline: "3-5 days",
    support: "Email support only",
    gstHandling: "Customer responsibility",
    representative: "Generic support",
    address: "Basic PO Box",
    documents: "Available",
    propertyTax: "Available",
    gmb: "Not included",
    gst: "Extra Charges",
    mca: "Not available",
    msme: "Not offered",
  },
  teamco: {
    name: "TeamCO Work",
    pricing: "From ₹1,800/month",
    timeline: "5-8 days",
    support: "Business hours only",
    gstHandling: "Additional charges apply",
    representative: "Shared representative",
    address: "Standard address",
    documents: "Available",
    propertyTax: "Available",
    gmb: "Basic setup only",
    gst: "Extra Charges",
    mca: "Basic assistance",
    msme: "₹1,800 extra",
  },
  wework: {
    name: "WeWork",
    pricing: "From ₹3,500/month",
    timeline: "3-4 days",
    support: "Premium support",
    gstHandling: "Included",
    representative: "Dedicated support",
    address: "Premium address",
    documents: "Available",
    propertyTax: "Available",
    gmb: "Complete setup",
    gst: "Extra Charges",
    mca: "Complete support",
    msme: "₹2,500 extra",
  },
  qdesq: {
    name: "qDesq",
    pricing: "From ₹1,600/month",
    timeline: "4-6 days",
    support: "Limited support",
    gstHandling: "Additional charges",
    representative: "No dedicated support",
    address: "Shared address",
    documents: "Available",
    propertyTax: "Available",
    gmb: "DIY instructions",
    gst: "Extra Charges",
    mca: "Extra charges",
    msme: "₹1,800 extra",
  },
  direct: {
    name: "Direct Coworking Space",
    pricing: "From ₹1,400/month",
    timeline: "7-14 days",
    support: "Business hours only",
    gstHandling: "Not included",
    representative: "Generic support",
    address: "Standard address",
    documents: "Available",
    propertyTax: "Available",
    gmb: "Not included",
    gst: "Extra Charges",
    mca: "Basic assistance",
    msme: "Not offered",
  },
};

const getFeatureData = () => [
  {
    feature: "Lowest Market Rate",
    simplySetup: "Lowest Market Rate (No Extra Charge Policy)",
    icon: <Star className="w-5 h-5" />,
    key: "pricing",
  },
  {
    feature: "Timeline for Completion",
    simplySetup: "48 Hours after KYC",
    icon: <Award className="w-5 h-5" />,
    key: "timeline",
  },
  {
    feature: "On Ground Support",
    simplySetup: "No Need to Travel, In House Team in Each City",
    icon: <Shield className="w-5 h-5" />,
    key: "support",
  },
  {
    feature: "GST Officer Visit Handling",
    simplySetup: "Dedicated handling by our in house lawyers",
    icon: <Building className="w-5 h-5" />,
    key: "gstHandling",
  },
  {
    feature: "Dedicated Representative",
    simplySetup: "Personal account manager",
    icon: <Phone className="w-5 h-5" />,
    key: "representative",
  },
  {
    feature: "Mailing Address",
    simplySetup: "Premium business address",
    icon: <Mail className="w-5 h-5" />,
    key: "address",
  },
  {
    feature: "Rent Agreement / NOC / Utility Bill",
    simplySetup: "All documents provided",
    icon: <FileText className="w-5 h-5" />,
    key: "documents",
  },
  {
    feature: "Property Tax Receipt",
    simplySetup: "Included in package",
    icon: <FileText className="w-5 h-5" />,
    key: "propertyTax",
  },
  {
    feature: "Google My Business Registration",
    simplySetup: "GMB Compliant Address",
    icon: <Award className="w-5 h-5" />,
    key: "gmb",
  },
  {
    feature: "GST Registration",
    simplySetup: "100% Support in Registration & Approval",
    icon: <FileText className="w-5 h-5" />,
    key: "gst",
  },
  {
    feature: "MCA Registration",
    simplySetup: "MCA Compliant Address",
    icon: <Building className="w-5 h-5" />,
    key: "mca",
  },
  {
    feature: "MSME Registration",
    simplySetup: "MSME Compliant Address",
    icon: <Zap className="w-5 h-5" />,
    key: "msme",
  },
];

export default function VirtualOfficeComparison() {
  const selectedCompetitors = ["instaspaces", "aaddress"];
  const featureData = getFeatureData();

  const getCompetitorValue = (competitorKey: string, featureKey: string) => {
    return competitorData[competitorKey]?.[featureKey] || "N/A";
  };

  const isPositiveFeature = (value: string) => {
    return (
      value.includes("From ₹") ||
      value.includes("Included") ||
      value.includes("Premium") ||
      value.includes("Complete") ||
      value.includes("Full") ||
      value.includes("Dedicated") ||
      value.includes("24/7") ||
      value.includes("End-to-end") ||
      value.includes("Available")
    );
  };

  const isOrangeFeature = (value: string) => {
    return value.includes("Extra Charges");
  };

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why Choose SimplySetup Over Competitors?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
            Compare our virtual office services with other virtual office providers & direct coworking spaces
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full min-w-[700px]">
            <thead className="sm:static sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-blue-600 to-indigo-700">
                <th className="py-3 px-2 sm:py-6 sm:px-4 text-left text-white font-semibold text-base sm:text-base min-w-[160px] sm:min-w-[200px] sticky left-0 z-20 bg-blue-600">
                  Features
                </th>
                <th className="py-3 px-2 sm:py-6 sm:px-4 text-left font-semibold text-yellow-300 bg-blue-700 min-w-[130px] sm:min-w-[150px]">
                  <div className="text-base sm:text-base">SimplySetup</div>
                  <div className="text-sm sm:text-sm text-yellow-200 mt-1">
                    ⭐ Recommended
                  </div>
                </th>
                <th className="py-3 px-2 sm:py-6 sm:px-4 text-left font-semibold text-white text-base sm:text-base min-w-[130px] sm:min-w-[150px]">
                  <div className="hidden sm:block">Other Virtual Office Providers</div>
                  <div className="block sm:hidden">Other Providers</div>
                </th>
                <th className="py-3 px-2 sm:py-6 sm:px-4 text-left font-semibold text-white text-base sm:text-base min-w-[130px] sm:min-w-[150px]">
                  <div className="hidden sm:block">Direct Coworking Spaces</div>
                  <div className="block sm:hidden">Coworking Spaces</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {featureData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className={`py-3 px-2 sm:py-6 sm:px-4 sticky left-0 z-10 border-r border-gray-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="text-blue-600 flex-shrink-0">{row.icon}</div>
                      <span className="font-medium text-gray-900 text-base sm:text-base leading-tight">
                        {row.feature}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:py-6 sm:px-4 text-left">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-green-700 font-medium text-sm sm:text-sm leading-tight">
                        {row.simplySetup}
                      </span>
                    </div>
                  </td>
                  {selectedCompetitors.map((competitorKey) => {
                    const value = getCompetitorValue(
                      competitorKey,
                      row.key,
                    );
                    const isPositive = isPositiveFeature(value);
                    const isOrange = isOrangeFeature(value);
                    return (
                      <td
                        key={competitorKey}
                        className="py-3 px-2 sm:py-6 sm:px-4 text-left"
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          {isOrange ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          ) : isPositive ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm sm:text-sm leading-tight ${
                            isOrange ? 'text-orange-700' : 
                            isPositive ? 'text-green-700' : 'text-gray-600'
                          }`}>{value}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile scroll hint */}
        <div className="block sm:hidden mt-4 text-center">
          <p className="text-xs text-gray-500">
            👆 Scroll horizontally to see full comparison
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-700 mb-1">₹499/month</div>
            <div className="text-xs sm:text-sm text-green-600">Starting from - Lowest in market</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-700 mb-1">48 Hours</div>
            <div className="text-xs sm:text-sm text-blue-600">Fastest setup time</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-700 mb-1">24/7</div>
            <div className="text-xs sm:text-sm text-purple-600">Dedicated support</div>
          </div>
        </div>
      </div>
    </section>
  );
}