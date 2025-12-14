import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ExternalLink {
  anchor: string;
  url: string;
}

function getFallbackLinks(city: string, area?: string): ExternalLink[] {
  const cityLower = city.toLowerCase();
  
  // City-specific fallback links based on known government portals
  const fallbackMap: Record<string, ExternalLink[]> = {
    pune: [
      { anchor: "Pune Municipal Corporation", url: "https://www.punecorporation.org/" },
      { anchor: "Maharashtra GST Portal", url: "https://gst.mahakosh.gov.in/" },
      { anchor: "Pune Police Station Locator", url: "https://punepolice.gov.in/" },
      { anchor: "Maharashtra Registration Portal", url: "https://igrmaharashtra.gov.in/" },
      { anchor: "Pune PIN Code Directory", url: "https://www.indiapost.gov.in/vas/Pages/FindPinCode.aspx" }
    ],
    mumbai: [
      { anchor: "Brihanmumbai Municipal Corporation", url: "https://portal.mcgm.gov.in/" },
      { anchor: "Maharashtra GST Portal", url: "https://gst.mahakosh.gov.in/" },
      { anchor: "Mumbai Police", url: "https://mumbaipolice.gov.in/" },
      { anchor: "Maharashtra Registration Portal", url: "https://igrmaharashtra.gov.in/" },
      { anchor: "Mumbai PIN Code Directory", url: "https://www.indiapost.gov.in/vas/Pages/FindPinCode.aspx" }
    ],
    bangalore: [
      { anchor: "Bruhat Bengaluru Mahanagara Palike", url: "https://bbmp.gov.in/" },
      { anchor: "Karnataka GST Portal", url: "https://karnatakagstn.in/" },
      { anchor: "Karnataka Sub Registrar", url: "https://www.kaveri.kar.nic.in/" },
      { anchor: "Bangalore Police", url: "https://www.ksp.gov.in/" },
      { anchor: "Karnataka PIN Code Directory", url: "https://www.indiapost.gov.in/vas/Pages/FindPinCode.aspx" }
    ],
    delhi: [
      { anchor: "Delhi Government Portal", url: "https://delhi.gov.in/" },
      { anchor: "Delhi GST Portal", url: "https://trade.delhi.gov.in/" },
      { anchor: "Delhi Police", url: "https://www.delhipolice.nic.in/" },
      { anchor: "Delhi Registration Portal", url: "https://registrar.delhi.gov.in/" },
      { anchor: "Delhi PIN Code Directory", url: "https://www.indiapost.gov.in/vas/Pages/FindPinCode.aspx" }
    ]
  };
  
  return fallbackMap[cityLower] || [
    { anchor: `${city} Municipal Corporation`, url: `https://${cityLower}.gov.in/` },
    { anchor: "State GST Portal", url: "https://gst.gov.in/" },
    { anchor: "India Post PIN Code Lookup", url: "https://www.indiapost.gov.in/vas/Pages/FindPinCode.aspx" },
    { anchor: "Local Police Station Directory", url: "https://www.indiapolice.nic.in/" },
    { anchor: "State Registration Portal", url: "https://registration.gov.in/" }
  ];
}

export async function fetchLocalLinks(city: string, area?: string): Promise<ExternalLink[]> {
  try {
    const locationText = area ? `${area}, ${city}` : city;
    const prompt = `Generate a JSON object with 5 authoritative external URLs that help businesses verify compliance, local regulations, or logistics for setting up a virtual office in ${locationText}, India.

Focus on official government sites (.gov.in), municipal corporations, property tax portals, registrar offices, India Post pin lookup, state GST helpdesk, metro maps, and other reputable (.org.in) sites.

Return a JSON object in this exact format:
{
  "links": [
    { "anchor": "descriptive link text", "url": "https://example.com" },
    { "anchor": "descriptive link text", "url": "https://example.com" },
    { "anchor": "descriptive link text", "url": "https://example.com" },
    { "anchor": "descriptive link text", "url": "https://example.com" },
    { "anchor": "descriptive link text", "url": "https://example.com" }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    console.log(`OpenAI response for ${locationText}:`, content);
    
    if (!content) {
      console.log("No content received from OpenAI, using fallback");
      return getFallbackLinks(city, area);
    }

    // Parse the JSON response
    let links: ExternalLink[];
    try {
      const parsed = JSON.parse(content);
      console.log("OpenAI response parsed:", JSON.stringify(parsed, null, 2));
      links = parsed.links || [];
      
      if (!Array.isArray(links) || links.length === 0) {
        console.log("No valid links in OpenAI response, using fallback");
        return getFallbackLinks(city, area);
      }
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError, "Content:", content);
      return getFallbackLinks(city, area);
    }

    // Validate and sanitize the links
    const validLinks = links
      .filter((link): link is ExternalLink => 
        typeof link === 'object' && 
        link !== null && 
        typeof link.anchor === 'string' && 
        typeof link.url === 'string' &&
        link.anchor.trim() !== '' &&
        link.url.trim() !== ''
      )
      .slice(0, 5); // safety cap

    return validLinks.length > 0 ? validLinks : getFallbackLinks(city, area);
  } catch (error) {
    console.error("Error fetching local links from OpenAI:", error);
    return getFallbackLinks(city, area);
  }
}

export async function buildLocalLinks(slugPath: string): Promise<ExternalLink[]> {
  const parts = slugPath.split("/").filter(Boolean); // ["virtual-office", "pune", "narhe"]
  const city = parts[1];
  const area = parts.length === 3 ? parts[2] : undefined;

  if (!city) {
    return [];
  }

  return await fetchLocalLinks(city, area);
}