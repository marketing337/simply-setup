import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractGstinFromSlug(slug: string): string | null {
  if (!slug) return null;
  const upperSlug = slug.toUpperCase();
  const gstinMatch = upperSlug.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}/);
  return gstinMatch ? gstinMatch[0] : null;
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Building2,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  TrendingUp,
  BarChart3,
  FileCheck,
  FileClock,
  FileWarning,
  Shield,
  Info,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GSTReturnSummary, GSTReturnResponse, GSTReturnFiling } from "@shared/schema";

const STATE_CODES = [
  { code: "01", name: "Jammu & Kashmir" }, { code: "02", name: "Himachal Pradesh" },
  { code: "03", name: "Punjab" }, { code: "04", name: "Chandigarh" },
  { code: "05", name: "Uttarakhand" }, { code: "06", name: "Haryana" },
  { code: "07", name: "Delhi" }, { code: "08", name: "Rajasthan" },
  { code: "09", name: "Uttar Pradesh" }, { code: "10", name: "Bihar" },
  { code: "11", name: "Sikkim" }, { code: "12", name: "Arunachal Pradesh" },
  { code: "13", name: "Nagaland" }, { code: "14", name: "Manipur" },
  { code: "15", name: "Mizoram" }, { code: "16", name: "Tripura" },
  { code: "17", name: "Meghalaya" }, { code: "18", name: "Assam" },
  { code: "19", name: "West Bengal" }, { code: "20", name: "Jharkhand" },
  { code: "21", name: "Odisha" }, { code: "22", name: "Chhattisgarh" },
  { code: "23", name: "Madhya Pradesh" }, { code: "24", name: "Gujarat" },
  { code: "27", name: "Maharashtra" }, { code: "29", name: "Karnataka" },
  { code: "30", name: "Goa" }, { code: "32", name: "Kerala" },
  { code: "33", name: "Tamil Nadu" }, { code: "34", name: "Puducherry" },
  { code: "35", name: "Andaman & Nicobar" }, { code: "36", name: "Telangana" },
  { code: "37", name: "Andhra Pradesh" }
];

function getStateName(stateCode: string): string {
  const state = STATE_CODES.find(s => s.code === stateCode);
  return state?.name || "Unknown State";
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case "filed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "late filed":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "pending":
    case "not filed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "filed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
    case "late filed":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
    case "pending":
    case "not filed":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function ComplianceCard({ compliance }: { compliance: GSTReturnSummary['filingCompliance'] }) {
  const getComplianceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100";
    if (percentage >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="border" data-testid="card-compliance">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">Compliance Score</span>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <div className={`text-3xl font-bold ${getComplianceColor(compliance.compliancePercentage)}`}>
            {compliance.compliancePercentage}%
          </div>
          <div className="flex-1">
            <div className={`h-2 rounded-full ${getProgressBgColor(compliance.compliancePercentage)}`}>
              <div 
                className={`h-2 rounded-full ${getProgressBarColor(compliance.compliancePercentage)}`}
                style={{ width: `${compliance.compliancePercentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2 rounded bg-green-50">
            <div className="text-lg font-bold text-green-600">{compliance.filedOnTime}</div>
            <div className="text-[10px] text-muted-foreground">On Time</div>
          </div>
          <div className="p-2 rounded bg-yellow-50">
            <div className="text-lg font-bold text-yellow-600">{compliance.filedLate}</div>
            <div className="text-[10px] text-muted-foreground">Late</div>
          </div>
          <div className="p-2 rounded bg-red-50">
            <div className="text-lg font-bold text-red-600">{compliance.pending}</div>
            <div className="text-[10px] text-muted-foreground">Pending</div>
          </div>
          <div className="p-2 rounded bg-gray-50">
            <div className="text-lg font-bold text-gray-600">{compliance.totalReturns}</div>
            <div className="text-[10px] text-muted-foreground">Total</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FilingHistoryTable({ filings }: { filings: GSTReturnFiling[] }) {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredFilings = filter === "all" 
    ? filings 
    : filings.filter(f => f.returnType === filter);

  const returnTypes = Array.from(new Set(filings.map(f => f.returnType)));

  return (
    <Card className="border" data-testid="card-filing-history">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Filing History</span>
            <span className="text-xs text-muted-foreground">({filings.length} records)</span>
          </div>
          <div className="flex gap-1 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setFilter("all")}
              data-testid="btn-filter-all"
            >
              All
            </Button>
            {returnTypes.map(type => (
              <Button
                key={type}
                variant={filter === type ? "default" : "ghost"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setFilter(type)}
                data-testid={`btn-filter-${type.toLowerCase().replace('-', '')}`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto -mx-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-2 px-4 font-medium text-xs text-muted-foreground">Type</th>
                <th className="text-left py-2 px-4 font-medium text-xs text-muted-foreground">Period</th>
                <th className="text-left py-2 px-4 font-medium text-xs text-muted-foreground">Filed On</th>
                <th className="text-left py-2 px-4 font-medium text-xs text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFilings.slice(0, 12).map((filing, index) => (
                <tr key={index} className="border-b hover:bg-muted/30 transition-colors" data-testid={`row-filing-${index}`}>
                  <td className="py-2 px-4">
                    <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{filing.returnType}</span>
                  </td>
                  <td className="py-2 px-4 text-xs">{filing.taxPeriod}</td>
                  <td className="py-2 px-4 text-xs">{filing.dateOfFiling}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(filing.status)}
                      <span className={`text-xs font-medium ${
                        filing.status.toLowerCase() === 'filed' ? 'text-green-600' :
                        filing.status.toLowerCase() === 'late filed' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{filing.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredFilings.length === 0 && (
          <div className="text-center py-6 text-sm text-muted-foreground">
            No filings found for the selected filter.
          </div>
        )}
        
        {filteredFilings.length > 12 && (
          <div className="text-center mt-3 text-xs text-muted-foreground">
            Showing 12 of {filteredFilings.length} records
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GSTReturnResultCard({ data }: { data: GSTReturnSummary }) {
  const stateCode = data.gstin.substring(0, 2);
  const stateName = data.stateName || getStateName(stateCode);

  return (
    <div className="space-y-4">
      {/* Business Summary Card - Compact */}
      <Card className="border" data-testid="card-business-summary">
        <CardContent className="p-4">
          {/* Header with name and status */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-primary truncate">{data.legalName}</h2>
              {data.tradeName && data.tradeName !== data.legalName && (
                <p className="text-sm text-muted-foreground truncate">Trade: {data.tradeName}</p>
              )}
            </div>
            <Badge 
              className={`shrink-0 ${
                data.registrationStatus.toLowerCase() === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {data.registrationStatus}
            </Badge>
          </div>

          {/* GSTIN Display */}
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded mb-3">
            <span className="text-muted-foreground text-sm">#</span>
            <code className="font-mono font-semibold text-sm">{data.gstin}</code>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 ml-auto"
              onClick={() => navigator.clipboard.writeText(data.gstin)}
              data-testid="btn-copy-gstin"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>

          {/* Business Details Grid - Compact 2 columns */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxpayer Type</span>
              <span className="font-medium">{data.taxpayerType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Registration</span>
              <span className="font-medium">{data.registrationDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">State</span>
              <span className="font-medium">{stateName}</span>
            </div>
            {data.lastFiledReturn && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Filed</span>
                <span className="font-medium text-green-600">{data.lastFiledReturn.returnType} - {data.lastFiledReturn.taxPeriod}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Score - Compact */}
      <ComplianceCard compliance={data.filingCompliance} />

      {/* Filing History */}
      <FilingHistoryTable filings={data.filings} />
    </div>
  );
}

function SEOContentSection({ data }: { data: GSTReturnSummary }) {
  const stateCode = data.gstin.substring(0, 2);
  const stateName = data.stateName || getStateName(stateCode);
  const complianceLevel = data.filingCompliance.compliancePercentage >= 90 ? "excellent" : 
                          data.filingCompliance.compliancePercentage >= 70 ? "good" : "needs improvement";

  return (
    <div className="space-y-6 mt-8">
      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            About {data.legalName}'s GST Returns
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            {data.legalName} ({data.gstin}) is a registered GST taxpayer in {stateName}, India. 
            The business has a <strong>{complianceLevel}</strong> GST return filing track record 
            with a compliance score of <strong>{data.filingCompliance.compliancePercentage}%</strong>.
          </p>
          <p>
            Out of {data.filingCompliance.totalReturns} expected returns, {data.filingCompliance.filedOnTime} were 
            filed on time, {data.filingCompliance.filedLate} were filed late, and {data.filingCompliance.pending} are 
            currently pending. This compliance history is important for businesses considering transactions with this taxpayer.
          </p>
        </CardContent>
      </Card>

      {/* Compliance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Compliance Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Why Check GST Returns?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Verify supplier compliance before transactions</li>
                <li>• Ensure Input Tax Credit (ITC) eligibility</li>
                <li>• Assess business reliability and trustworthiness</li>
                <li>• Avoid dealing with non-compliant taxpayers</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Filing Deadlines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• GSTR-1: 11th of following month</li>
                <li>• GSTR-3B: 20th of following month</li>
                <li>• GSTR-9: 31st December annually</li>
                <li>• Late filing attracts penalties</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">What does a {data.filingCompliance.compliancePercentage}% compliance score mean?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {data.legalName} has filed {data.filingCompliance.filedOnTime + data.filingCompliance.filedLate} out 
                of {data.filingCompliance.totalReturns} expected GST returns. 
                {complianceLevel === "excellent" ? " This indicates a highly reliable taxpayer." : 
                 complianceLevel === "good" ? " This shows reasonable compliance with some delays." : 
                 " This suggests potential compliance issues."}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Can I claim ITC on invoices from {data.legalName}?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {data.registrationStatus.toLowerCase() === "active" && data.filingCompliance.compliancePercentage >= 70
                  ? `Yes, ${data.legalName}'s GSTIN is active with good compliance. You can claim ITC on valid tax invoices.`
                  : `Exercise caution. Verify the latest return filing status before claiming ITC to avoid mismatches.`}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">How often should I check supplier GST returns?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                It's recommended to check supplier GST return status quarterly or before major transactions to ensure 
                your ITC claims remain valid and avoid GSTR-2A/2B mismatches.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Links & CTAs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Related GST Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link href="/gst-number-search/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors" data-testid="link-gst-search">
              <Search className="h-4 w-4 text-primary" />
              <span className="text-sm">GST Number Search</span>
            </Link>
            <Link href={`/gst-number-search/${slugify(data.legalName)}-${data.gstin}/`} className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors" data-testid="link-company-details">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm">View Full Company Details</span>
            </Link>
            <Link href="/services/gst-registration/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors" data-testid="link-gst-registration">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm">GST Registration Service</span>
            </Link>
            <Link href="/virtual-office/" className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors" data-testid="link-virtual-office">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm">Virtual Office for GST</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SearchSkeleton() {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GSTReturnCheckerPage() {
  const [, navigate] = useLocation();
  const params = useParams();
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const [searchGstin, setSearchGstin] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      const extractedGstin = extractGstinFromSlug(params.slug as string);
      if (extractedGstin) {
        setSearchInput(extractedGstin);
        setSearchGstin(extractedGstin);
      }
    }
  }, [params.slug]);

  const { data: searchResult, isLoading, isFetching, error } = useQuery<GSTReturnResponse>({
    queryKey: ['/api/gst-returns', searchGstin],
    queryFn: async () => {
      const response = await fetch(`/api/gst-returns/${encodeURIComponent(searchGstin!)}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch GST return status");
      }
      return response.json();
    },
    enabled: !!searchGstin,
  });

  useEffect(() => {
    if (searchResult?.success && searchResult.data && searchGstin) {
      const slug = `${slugify(searchResult.data.legalName)}-${searchGstin}`;
      const newPath = `/gst-return-checker/${slug}/`;
      if (!params.slug || params.slug !== slug) {
        navigate(newPath, { replace: true });
      }
    }
  }, [searchResult, searchGstin, navigate, params.slug]);

  const validateGSTIN = (gstin: string): { valid: boolean; message?: string } => {
    const normalized = gstin.toUpperCase().trim();
    if (normalized.length !== 15) {
      return { valid: false, message: "GSTIN must be exactly 15 characters" };
    }
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (!gstinRegex.test(normalized)) {
      return { valid: false, message: "Invalid GSTIN format" };
    }
    return { valid: true };
  };

  const handleSearch = useCallback(() => {
    const validation = validateGSTIN(searchInput);
    if (!validation.valid) {
      toast({
        title: "Invalid GSTIN",
        description: validation.message,
        variant: "destructive"
      });
      return;
    }
    const normalized = searchInput.toUpperCase().trim();
    setSearchGstin(normalized);
  }, [searchInput, toast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const pageTitle = searchResult?.data 
    ? `${searchResult.data.legalName} - GST Return Filing Status | ${searchResult.data.gstin}`
    : "GST Return Checker | Check Filing Status Online | SimplySetup";
  
  const pageDescription = searchResult?.data
    ? `Check GST return filing status for ${searchResult.data.legalName}. GSTIN: ${searchResult.data.gstin}. Compliance Score: ${searchResult.data.filingCompliance.compliancePercentage}%. View complete filing history.`
    : "Free GST Return Checker tool to verify GST return filing status online. Check compliance score, filing history, and pending returns for any GSTIN instantly.";

  const canonicalUrl = searchResult?.data 
    ? `https://simplysetup.in/gst-return-checker/${slugify(searchResult.data.legalName)}-${searchResult.data.gstin}/`
    : "https://simplysetup.in/gst-return-checker/";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GST Return Checker Tool",
    "description": "Free online tool to check GST return filing status, compliance score, and filing history for any GSTIN.",
    "url": canonicalUrl,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "Organization",
      "name": "SimplySetup",
      "url": "https://simplysetup.in"
    }
  };

  const companyStructuredData = searchResult?.data ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": searchResult.data.legalName,
    "taxID": searchResult.data.gstin,
    "foundingDate": searchResult.data.registrationDate
  } : null;

  const faqStructuredData = searchResult?.data ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the GST compliance score of ${searchResult.data.legalName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${searchResult.data.legalName} has a GST compliance score of ${searchResult.data.filingCompliance.compliancePercentage}% based on their return filing history.`
        }
      },
      {
        "@type": "Question",
        "name": `Has ${searchResult.data.legalName} filed all GST returns?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${searchResult.data.legalName} has filed ${searchResult.data.filingCompliance.filedOnTime + searchResult.data.filingCompliance.filedLate} out of ${searchResult.data.filingCompliance.totalReturns} expected returns, with ${searchResult.data.filingCompliance.pending} returns pending.`
        }
      }
    ]
  } : {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a GST Return?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GST Returns are periodic filings that registered taxpayers must submit to report their sales, purchases, and tax liability to the government."
        }
      },
      {
        "@type": "Question",
        "name": "How to check GST return filing status?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter the 15-digit GSTIN in our checker tool to view the complete filing history, compliance score, and pending returns."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={searchResult?.data 
          ? `${searchResult.data.legalName}, ${searchResult.data.gstin}, GST return status, GST filing check, compliance score, GSTR-3B status`
          : "GST return checker, GST filing status, check GSTR-3B, GSTR-1 status, GST compliance, return filing verification"
        } />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="SimplySetup" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {companyStructuredData ? JSON.stringify(companyStructuredData) : "{}"}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                GST Return Checker
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Check GST return filing status, compliance score, and complete filing history 
                for any registered GSTIN instantly.
              </p>
            </div>

            <Card className="mb-8 shadow-lg border-2" data-testid="card-search">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Enter 15-digit GSTIN (e.g., 27AABCU9603R1ZM)"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                      onKeyDown={handleKeyDown}
                      maxLength={15}
                      className="h-12 text-lg font-mono tracking-wider uppercase pl-4"
                      data-testid="input-gstin"
                    />
                    {searchInput.length > 0 && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {searchInput.length}/15
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={isLoading || isFetching || searchInput.length !== 15}
                    className="h-12 px-8"
                    data-testid="btn-check-returns"
                  >
                    {isLoading || isFetching ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <FileCheck className="mr-2 h-4 w-4" />
                        Check Returns
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Data sourced from government GST portal. Privacy protected.
                </p>
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive" className="mb-6" data-testid="alert-error">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {(error as any)?.message || "Failed to fetch return details. Please try again."}
                </AlertDescription>
              </Alert>
            )}

            {(isLoading || isFetching) && <SearchSkeleton />}

            {searchResult && !isLoading && !isFetching && (
              searchResult.success && searchResult.data ? (
                <>
                  {(searchResult.isDemo || searchResult.source === "derived") && (
                    <Alert className="mb-6 border-yellow-200 bg-yellow-50" data-testid="alert-demo">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertTitle className="text-yellow-800">
                        {searchResult.isDemo ? "Demo Data" : "Estimated Data"}
                      </AlertTitle>
                      <AlertDescription className="text-yellow-700">
                        {searchResult.isDemo 
                          ? (searchResult.message || "Showing sample data for demonstration. Actual filing status may differ.")
                          : "Filing data is estimated based on available information. For accurate status, check the official GST portal."}
                      </AlertDescription>
                    </Alert>
                  )}
                  {searchResult.source === "live" && (
                    <Alert className="mb-6 border-green-200 bg-green-50" data-testid="alert-live">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Live Data</AlertTitle>
                      <AlertDescription className="text-green-700">
                        Filing status is fetched from official government sources.
                      </AlertDescription>
                    </Alert>
                  )}
                  <GSTReturnResultCard data={searchResult.data} />
                  <SEOContentSection data={searchResult.data} />
                </>
              ) : (
                <Alert variant="destructive" data-testid="alert-not-found">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>GSTIN Not Found</AlertTitle>
                  <AlertDescription>
                    {searchResult.error || "No business found with this GSTIN. Please verify the number."}
                  </AlertDescription>
                </Alert>
              )
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Understanding GST Return Filing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Types of Returns</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="space-y-1">
                    <li><strong>GSTR-1:</strong> Outward supplies</li>
                    <li><strong>GSTR-3B:</strong> Monthly summary</li>
                    <li><strong>GSTR-9:</strong> Annual return</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Filing Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="space-y-1">
                    <li><strong>GSTR-1:</strong> 11th of next month</li>
                    <li><strong>GSTR-3B:</strong> 20th of next month</li>
                    <li><strong>GSTR-9:</strong> 31st December</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Late Filing Penalties</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <ul className="space-y-1">
                    <li><strong>CGST:</strong> ₹50/day</li>
                    <li><strong>SGST:</strong> ₹50/day</li>
                    <li><strong>Max:</strong> ₹10,000 per return</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer location={null} />
    </>
  );
}
