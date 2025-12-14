// Script to create workspaces directly in the admin interface
const workspaces = [
  {
    name: "Etherea Cowork",
    slug: "etherea-cowork",
    description: "In accordance with Section 2(85) of the CGST Act, 2017 and the Companies Act, 2013, this address qualifies as a principal place of business and registered office for GST registration. Strategically located on the Noida Greater Noida Expressway with seamless metro connectivity, offering state-of-the-art virtual office facilities and secure mail handling services.",
    address: "24th To 26th Floor Tower B Alphathum Sector 90 Noida, Noida, Uttar Pradesh 201305",
    mapCoordinates: "28.530899047851562, 77.4124984741211",
    locationId: 56, // Noida
    contactPhone: "098187 38822",
    mainImage: "https://www.etherea.in/",
    status: "available",
    isActive: true,
    monthlyPrice: "1499"
  },
  {
    name: "Webeside",
    slug: "webeside",
    description: "Approved commercial premises under the Companies Act, 2013 and CGST Act, 2017, fully eligible for use as a GST principal place of business. Centrally positioned within the NIT industrial corridor with excellent road and Delhi Metro access, supported by professional mail forwarding and compliance management.",
    address: "3 NIT Road, Faridabad, Haryana 121001",
    mapCoordinates: "28.398441314697266, 77.29683685302734",
    locationId: 2, // Delhi (for Faridabad)
    contactPhone: "070110 74695",
    mainImage: "https://webeside.in/",
    status: "available",
    isActive: true,
    monthlyPrice: "1499"
  },
  {
    name: "Instacoworking",
    slug: "instacoworking",
    description: "Legally recognized corporate address under the Companies Act, 2013 and CGST Act, 2017 for virtual office and GST principal place of business purposes. Boasts direct access to the Noida Greater Noida Expressway, premium amenities.",
    address: "B916 Advant Navis Business Park Expressway, Sector 142, Noida, Uttar Pradesh, Uttar Pradesh 201305",
    mapCoordinates: "28.493810653686523, 77.4103775024414",
    locationId: 56, // Noida
    contactPhone: "092500 92501",
    status: "available",
    isActive: true,
    monthlyPrice: "1499"
  },
  {
    name: "Global Campus",
    slug: "global-campus",
    description: "Legally admissible business address per the Companies Act, 2013 and CGST Act, 2017 for obtaining and maintaining a GSTIN. Situated in a prime commercial zone with streamlined road links and professional services.",
    address: "Sector 9 Road, Faridabad, Haryana 121006",
    mapCoordinates: "28.38201141357422, 77.32728576660156",
    locationId: 2, // Delhi (for Faridabad)
    contactPhone: "011 4119 7111",
    mainImage: "https://globalcampus.co.in/contact-us/",
    status: "available",
    isActive: true,
    monthlyPrice: "1499"
  },
  {
    name: "Innov8 Coworking Noida",
    slug: "innov8-coworking-noida",
    description: "Registered commercial facility under the Companies Act, 2013 and CGST Act, 2017, eligible as a virtual office and principal place of business. Nestled within the Noida Film City enclave, featuring modern infrastructure, high-speed connectivity, and secure mail forwarding for official use.",
    address: "1/a, Slip Rd, Film City, Sector 16a, Noida, Uttar Pradesh, Uttar Pradesh 201301",
    mapCoordinates: "28.570558547973633, 77.31412506103516",
    locationId: 56, // Noida
    contactPhone: "099994 66688",
    mainImage: "https://www.innov8.work/",
    status: "available",
    isActive: true,
    monthlyPrice: "1499"
  }
];

// Function to create workspaces via the storage layer
async function createWorkspaces() {
  const { storage } = require('./server/storage');
  
  console.log('Creating workspaces...');
  
  for (const workspace of workspaces) {
    try {
      const result = await storage.createWorkspace(workspace);
      console.log(`✓ Created: ${workspace.name} (ID: ${result.id})`);
    } catch (error) {
      console.error(`✗ Failed to create ${workspace.name}:`, error.message);
    }
  }
  
  console.log('Workspace creation completed.');
  process.exit(0);
}

createWorkspaces();