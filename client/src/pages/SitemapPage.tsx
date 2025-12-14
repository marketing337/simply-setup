import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLocation } from "@/hooks/useLocation";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Location, Area, BlogPost } from "@shared/schema";
import { MapPin, FileText, Info, Phone, MessageSquare, Home, Building2, ExternalLink, Globe, Database } from "lucide-react";

interface SitemapStats {
  totalSitemapFiles: number;
  sitemapFiles: string[];
  lastGenerated: string;
  pageCounts: {
    locations: number;
    areas: number;
    blog: number;
    companies: number;
    static: number;
    total: number;
  };
}

export default function SitemapPage() {
  const { currentLocation } = useLocation();
  
  // Fetch locations, areas, and blog posts for the sitemap
  const { data: locations = [] } = useQuery<Location[]>({
    queryKey: ['/api/locations'],
  });
  
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  // Fetch comprehensive sitemap statistics
  const { data: sitemapStats } = useQuery<SitemapStats>({
    queryKey: ['/api/sitemap/stats'],
  });
  
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Comprehensive Sitemap | Simplysetup - 490,000+ Pages Indexed" 
        description="Navigate through all 490,000+ pages on Simplysetup including virtual office locations across 71 cities, 512 areas, company profiles, and business resources. Complete site navigation and search engine sitemap index."
      />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Comprehensive Website Sitemap</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Navigate through all pages and resources on Simplysetup. Our website contains over 490,000 pages 
              including virtual office locations, company profiles, and business resources.
            </p>
          </div>

          {/* Sitemap Statistics */}
          {sitemapStats && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-12 border border-green-200">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Database className="mr-2 h-6 w-6 text-green-600" />
                Sitemap Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{sitemapStats.pageCounts.total.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{sitemapStats.totalSitemapFiles}</div>
                  <div className="text-sm text-muted-foreground">Sitemap Files</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{sitemapStats.pageCounts.companies.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{sitemapStats.pageCounts.locations + sitemapStats.pageCounts.areas}</div>
                  <div className="text-sm text-muted-foreground">Locations & Areas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{(sitemapStats.pageCounts.workspaces || 1227).toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Virtual Offices</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Last updated: {new Date(sitemapStats.lastGenerated).toLocaleDateString()}</span>
                <a 
                  href="/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-green-600 hover:text-green-800 font-medium"
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  View XML Sitemap
                </a>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Pages */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Home className="mr-2 h-5 w-5 text-primary" />
                Main Pages
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                </li>
                <li>
                  <Link href="/blog" className="text-blue-600 hover:underline">Blog ({blogPosts.length} posts)</Link>
                </li>
                <li>
                  <Link href="/companies" className="text-blue-600 hover:underline">
                    Company Database ({sitemapStats?.pageCounts.companies.toLocaleString() || '480K+'} companies)
                  </Link>
                </li>
                <li>
                  <Link href="/partnership/awfis" className="text-blue-600 hover:underline">Partnership Pages</Link>
                </li>
              </ul>
            </div>

            {/* Virtual Office Locations */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Virtual Office Locations ({locations.length} cities)
              </h2>
              <div className="max-h-48 overflow-y-auto">
                <ul className="space-y-1">
                  {locations.slice(0, 10).map((location) => (
                    <li key={location.slug}>
                      <Link href={`/${location.slug}`} className="text-blue-600 hover:underline text-sm">
                        {location.name}
                      </Link>
                    </li>
                  ))}
                  {locations.length > 10 && (
                    <li className="text-sm text-muted-foreground pt-2 border-t">
                      ... and {locations.length - 10} more cities
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Virtual Office Areas */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-primary" />
                Virtual Office Areas
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                {sitemapStats?.pageCounts.areas || '513'} areas across all cities
              </p>
              <div className="space-y-1 text-sm">
                <div className="text-blue-600">• /mumbai/bandra</div>
                <div className="text-blue-600">• /mumbai/andheri</div>
                <div className="text-blue-600">• /bangalore/koramangala</div>
                <div className="text-blue-600">• /delhi/connaught-place</div>
                <div className="text-blue-600">• /pune/baner</div>
                <div className="text-muted-foreground pt-2">
                  ... and {(sitemapStats?.pageCounts.areas || 513) - 5} more areas
                </div>
              </div>
            </div>

            {/* Virtual Office Workspaces */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-blue-600" />
                Virtual Office Workspaces
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                {sitemapStats?.pageCounts.workspaces || '1,227'} individual workspace locations
              </p>
              <div className="space-y-1 text-sm">
                <div className="text-blue-600">• /virtual-office/awfis-fun-republic</div>
                <div className="text-blue-600">• /virtual-office/premisin-agrasen-chowk</div>
                <div className="text-blue-600">• /virtual-office/regus-mumbai-central</div>
                <div className="text-blue-600">• /virtual-office/smartworks-bangalore</div>
                <div className="text-blue-600">• /virtual-office/cowrks-koramangala</div>
                <div className="text-muted-foreground pt-2">
                  ... and {(sitemapStats?.pageCounts.workspaces || 1227) - 5} more workspaces
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Blog & Resources
              </h2>
              <div className="max-h-48 overflow-y-auto">
                <ul className="space-y-1">
                  {blogPosts.slice(0, 5).map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline text-sm">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                  {blogPosts.length > 5 && (
                    <li className="text-sm text-muted-foreground pt-2 border-t">
                      ... and {blogPosts.length - 5} more articles
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Company Profiles */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Company Profiles
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                {sitemapStats?.pageCounts.companies.toLocaleString() || '489,494'} Indian company profiles
              </p>
              <div className="space-y-1 text-sm">
                <div className="text-blue-600">• /companies/tata-consultancy-services</div>
                <div className="text-blue-600">• /companies/infosys-limited</div>
                <div className="text-blue-600">• /companies/reliance-industries</div>
                <div className="text-blue-600">• /companies/wipro-limited</div>
                <div className="text-blue-600">• /companies/bharti-airtel</div>
                <div className="text-muted-foreground pt-2">
                  ... and {(sitemapStats?.pageCounts.companies || 489494) - 5} more companies
                </div>
              </div>
            </div>

            {/* Legal & Policy Pages */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Info className="mr-2 h-5 w-5 text-primary" />
                Legal & Policy Pages
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-blue-600 hover:underline">Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Technical Sitemap Information */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Technical Sitemap Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Search Engine Optimization</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Our sitemap follows Google's best practices with multiple XML files due to the large number of pages.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Main sitemap.xml (Sitemap Index)</li>
                  <li>• {sitemapStats?.totalSitemapFiles || '14'} individual sitemap files</li>
                  <li>• 50,000 URL limit per file compliance</li>
                  <li>• Automatic daily updates</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sitemap Files</h3>
                <div className="text-sm space-y-1">
                  <div>• sitemap-static.xml (Main pages)</div>
                  <div>• sitemap-locations.xml (Cities)</div>
                  <div>• sitemap-areas.xml (Areas)</div>
                  <div>• sitemap-blog.xml (Blog posts)</div>
                  <div>• sitemap-companies-1.xml to sitemap-companies-10.xml</div>
                </div>
                <div className="mt-3">
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    <ExternalLink className="mr-1 h-4 w-4" />
                    View Complete XML Sitemap
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}