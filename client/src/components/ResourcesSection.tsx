import { Briefcase, Users, UserCircle, ClipboardList } from "lucide-react";

export default function ResourcesSection() {
  const documentRequirements = [
    {
      title: "Private Limited Company",
      description: "Required documents for registering a Pvt Ltd company with a virtual office address for GST.",
      icon: <Briefcase className="h-8 w-8 text-blue-500" />,
      category: "Document List",
      documents: [
        "Certificate of Incorporation",
        "PAN Card of the Company",
        "Address Proof of Directors",
        "Board Resolution for GST Registration"
      ]
    },
    {
      title: "Partnership Firm",
      description: "Essential paperwork needed for partnership firms using virtual office for GST registration.",
      icon: <Users className="h-8 w-8 text-blue-500" />,
      category: "Document List",
      documents: [
        "Partnership Deed",
        "Partnership Firm Registration Certificate",
        "Firm's PAN Card",
        "Address Proof of Partners",
        "ID Proof of Partners"
      ]
    },
    {
      title: "Individual/Proprietorship",
      description: "Documentation required for individuals and proprietorships to register with virtual office.",
      icon: <UserCircle className="h-8 w-8 text-blue-500" />,
      category: "Document List",
      documents: [
        "PAN Card",
        "Aadhaar Card",
        "Photograph of Proprietor"
      ]
    }
  ];

  return (
    <section className="py-10 bg-gray-50" id="resources">
      <div className="site-container">
        {/* Document Requirements Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3 tracking-tight">Required Documents for Virtual Office</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
              Documents needed for different business entities to register with a virtual office address for GST and other legal compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {documentRequirements.map((requirement, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all h-full flex flex-col"
              >
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-1.5 bg-blue-50 rounded-md">
                      {requirement.icon}
                    </div>
                    <span className="text-xs font-medium px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                      {requirement.category}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-2 tracking-tight">{requirement.title}</h3>
                  <p className="text-gray-600 text-xs mb-3 leading-relaxed tracking-wide">{requirement.description}</p>
                  
                  <div className="mt-3 border-t pt-3">
                    <h4 className="font-medium text-gray-900 mb-2.5 text-sm tracking-tight">Required Documents:</h4>
                    <ul className="space-y-2">
                      {requirement.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-start">
                          <ClipboardList className="h-3 w-3 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 text-xs leading-relaxed tracking-wide">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}