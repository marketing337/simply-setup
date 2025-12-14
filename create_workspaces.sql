-- Insert workspaces directly into the database
INSERT INTO workspaces (
  name, slug, description, address, "mapCoordinates", "locationId", 
  "contactPhone", "mainImage", status, "isActive", "monthlyPrice"
) VALUES
(
  'Etherea Cowork',
  'etherea-cowork',
  'In accordance with Section 2(85) of the CGST Act, 2017 and the Companies Act, 2013, this address qualifies as a principal place of business and registered office for GST registration. Strategically located on the Noida Greater Noida Expressway with seamless metro connectivity, offering state-of-the-art virtual office facilities and secure mail handling services.',
  '24th To 26th Floor Tower B Alphathum Sector 90 Noida, Noida, Uttar Pradesh 201305',
  '28.530899047851562, 77.4124984741211',
  56,
  '098187 38822',
  'https://www.etherea.in/',
  'available',
  true,
  '1499'
),
(
  'Webeside',
  'webeside',
  'Approved commercial premises under the Companies Act, 2013 and CGST Act, 2017, fully eligible for use as a GST principal place of business. Centrally positioned within the NIT industrial corridor with excellent road and Delhi Metro access, supported by professional mail forwarding and compliance management.',
  '3 NIT Road, Faridabad, Haryana 121001',
  '28.398441314697266, 77.29683685302734',
  2,
  '070110 74695',
  'https://webeside.in/',
  'available',
  true,
  '1499'
),
(
  'Instacoworking',
  'instacoworking',
  'Legally recognized corporate address under the Companies Act, 2013 and CGST Act, 2017 for virtual office and GST principal place of business purposes. Boasts direct access to the Noida Greater Noida Expressway, premium amenities.',
  'B916 Advant Navis Business Park Expressway, Sector 142, Noida, Uttar Pradesh, Uttar Pradesh 201305',
  '28.493810653686523, 77.4103775024414',
  56,
  '092500 92501',
  null,
  'available',
  true,
  '1499'
),
(
  'Global Campus',
  'global-campus',
  'Legally admissible business address per the Companies Act, 2013 and CGST Act, 2017 for obtaining and maintaining a GSTIN. Situated in a prime commercial zone with streamlined road links and professional services.',
  'Sector 9 Road, Faridabad, Haryana 121006',
  '28.38201141357422, 77.32728576660156',
  2,
  '011 4119 7111',
  'https://globalcampus.co.in/contact-us/',
  'available',
  true,
  '1499'
),
(
  'Innov8 Coworking Noida',
  'innov8-coworking-noida',
  'Registered commercial facility under the Companies Act, 2013 and CGST Act, 2017, eligible as a virtual office and principal place of business. Nestled within the Noida Film City enclave, featuring modern infrastructure, high-speed connectivity, and secure mail forwarding for official use.',
  '1/a, Slip Rd, Film City, Sector 16a, Noida, Uttar Pradesh, Uttar Pradesh 201301',
  '28.570558547973633, 77.31412506103516',
  56,
  '099994 66688',
  'https://www.innov8.work/',
  'available',
  true,
  '1499'
);