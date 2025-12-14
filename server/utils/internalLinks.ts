import OpenAI from "openai";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface InternalLink {
  anchor: string;
  url: string;
}

interface SiteMapEntry {
  url: string;
  title: string;
}

// Cache sitemap data for 1 hour to avoid repeated API calls
let siteMapCache: SiteMapEntry[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Clear cache function for testing
function clearCache() {
  siteMapCache = null;
  cacheTimestamp = 0;
}

async function getRemoteSiteMap(): Promise<SiteMapEntry[]> {
  try {
    const response = await fetch("https://simplysetup.com/sitemap.xml", { 
      headers: {
        'User-Agent': 'SimplySetup Internal Links Bot'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const xml = await response.text();
    const parsed = await parseStringPromise(xml);
    
    if (!parsed.urlset?.url) {
      console.log("No URLs found in sitemap");
      return [];
    }
    
    return parsed.urlset.url.map((u: any) => ({
      url: new URL(u.loc[0]).pathname.replace(/\/$/, "") || "/",
      title: (u["news:title"]?.[0] || extractTitleFromUrl(u.loc[0])).trim()
    }));
  } catch (error) {
    console.error("Error fetching remote sitemap:", error);
    return [];
  }
}

function extractTitleFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    return pathname
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, ' ')
      ?.replace(/\b\w/g, l => l.toUpperCase()) || "Home";
  } catch {
    return "Unknown Page";
  }
}

function getKnownInternalPages(): SiteMapEntry[] {
  // Only include pages that actually exist on the site
  return [
    // Main service page (verified to exist)
    { url: "/virtual-office", title: "Virtual Office Services" },
    
    // City pages that exist (from the locations database)
    { url: "/virtual-office/mumbai", title: "Virtual Office in Mumbai" },
    { url: "/virtual-office/delhi", title: "Virtual Office in Delhi" },
    { url: "/virtual-office/bangalore", title: "Virtual Office in Bangalore" },
    { url: "/virtual-office/pune", title: "Virtual Office in Pune" },
    { url: "/virtual-office/hyderabad", title: "Virtual Office in Hyderabad" },
    { url: "/virtual-office/chennai", title: "Virtual Office in Chennai" },
    { url: "/virtual-office/kolkata", title: "Virtual Office in Kolkata" },
    { url: "/virtual-office/ahmedabad", title: "Virtual Office in Ahmedabad" },
    { url: "/virtual-office/gurgaon", title: "Virtual Office in Gurgaon" },
    { url: "/virtual-office/noida", title: "Virtual Office in Noida" },
    { url: "/virtual-office/lucknow", title: "Virtual Office in Lucknow" },
    { url: "/virtual-office/jaipur", title: "Virtual Office in Jaipur" },
    { url: "/virtual-office/kochi", title: "Virtual Office in Kochi" },
    { url: "/virtual-office/indore", title: "Virtual Office in Indore" },
    { url: "/virtual-office/coimbatore", title: "Virtual Office in Coimbatore" }
  ];
}

async function getSiteMap(): Promise<SiteMapEntry[]> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (siteMapCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return siteMapCache;
  }
  
  // Only use known pages that actually exist - ignore remote sitemap to avoid non-existent pages
  const knownPages = getKnownInternalPages();
  
  siteMapCache = knownPages;
  cacheTimestamp = now;
  
  console.log(`Cached ${siteMapCache.length} verified internal pages`);
  return siteMapCache;
}

function isRelevantPage(url: string): boolean {
  // Only include pages that actually exist on the site
  return (
    // Main virtual office service page
    url === '/virtual-office' ||
    
    // Virtual office city pages only (exclude blog, admin, etc.)
    (url.startsWith('/virtual-office/') && 
     !url.includes('/blog') && 
     !url.includes('/admin') && 
     !url.includes('/api') &&
     url.split('/').length === 3) // Ensure it's exactly /virtual-office/cityname format
  );
}

export async function fetchInternalLinks(currentPath: string): Promise<InternalLink[]> {
  try {
    // Get only verified virtual office city pages
    const allCityPages = getKnownInternalPages();
    
    // Filter out current page
    const candidatePages = allCityPages
      .filter(page => 
        page.url !== currentPath && 
        !currentPath.endsWith(page.url)
      );
    
    if (candidatePages.length === 0) {
      console.log("No candidate pages found for internal links");
      return [];
    }
    
    // Extract current city from path
    const currentCity = currentPath.split('/')[2]; // /virtual-office/pune -> pune
    
    // Prioritize nearby or major cities, exclude current city
    const priorityCities = ['mumbai', 'delhi', 'bangalore', 'pune', 'hyderabad', 'chennai'];
    const otherCities = candidatePages.filter(page => !priorityCities.includes(page.url.split('/')[2]));
    
    const relevantPages = candidatePages
      .filter(page => {
        // Include main virtual office page and other city pages (excluding current city)
        if (page.url === '/virtual-office') return true;
        const pageCity = page.url.split('/')[2];
        return pageCity !== currentCity; // Exclude current city
      })
      .sort((a, b) => {
        // Prioritize main virtual office page first
        if (a.url === '/virtual-office') return -1;
        if (b.url === '/virtual-office') return 1;
        
        // Then prioritize major cities
        const aCityPriority = priorityCities.includes(a.url.split('/')[2]);
        const bCityPriority = priorityCities.includes(b.url.split('/')[2]);
        if (aCityPriority && !bCityPriority) return -1;
        if (!aCityPriority && bCityPriority) return 1;
        return 0;
      })
      .slice(0, 5);

    console.log(`Returning ${relevantPages.length} internal links for ${currentPath}`);
    return relevantPages.map(page => ({
      anchor: page.title,
      url: page.url
    }));
  } catch (error) {
    console.error("Error fetching internal links:", error);
    return [];
  }
}

export async function buildInternalLinks(slugPath: string): Promise<InternalLink[]> {
  if (!slugPath.startsWith('/virtual-office/')) {
    return [];
  }
  
  return await fetchInternalLinks(slugPath);
}