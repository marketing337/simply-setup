import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ZohoForm from "@/components/ZohoForm";
import { useLocation } from "@/hooks/useLocation";
import { stateGovtFeesData, formatCurrency, DSC_CHARGES } from "@/lib/stateGovtFees";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  MapPin,
  ArrowRight,
  Search,
  IndianRupee,
  Building,
  TrendingUp,
  TrendingDown,
  CheckCircle
} from "lucide-react";

export default function AllStatesPage() {
  const { currentLocation } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "fees-low" | "fees-high">("name");

  const filteredAndSortedStates = useMemo(() => {
    let filtered = stateGovtFeesData.filter(state =>
      state.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.businessHub.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === "name") return a.state.localeCompare(b.state);
      if (sortBy === "fees-low") return a.govtFees - b.govtFees;
      if (sortBy === "fees-high") return b.govtFees - a.govtFees;
      return 0;
    });
  }, [searchTerm, sortBy]);

  const lowestFeeState = stateGovtFeesData.reduce((min, state) => 
    state.govtFees < min.govtFees ? state : min
  );

  const highestFeeState = stateGovtFeesData.reduce((max, state) => 
    state.govtFees > max.govtFees ? state : max
  );

  const averageFees = Math.round(
    stateGovtFeesData.reduce((sum, state) => sum + state.govtFees, 0) / stateGovtFeesData.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Virtual Office for Company Registration - All States Government Fees | India"
        description="Compare government fees for company registration across all Indian states. Transparent pricing with Govt fees and DSC charges. Register your Pvt Ltd, OPC, or LLP with virtual office address."
        pageType="purpose"
        service="company-registration"
        canonicalUrl="/virtual-office-company-registration-all-states"
      />

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200" data-testid="badge-all-states">
                  <MapPin className="w-4 h-4 mr-1" />
                  All Indian States
                </Badge>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight" data-testid="heading-main">
                  Virtual Office for Company Registration - All States
                </h1>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed" data-testid="text-description">
                  Compare government fees for company registration across all {stateGovtFeesData.length} Indian states and union territories. Choose the best state for your business with our transparent fee structure.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 bg-green-50 border-green-200" data-testid="card-lowest-fees">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">Lowest Fees</p>
                        <p className="text-lg font-bold text-green-700">{formatCurrency(lowestFeeState.govtFees)}</p>
                        <p className="text-xs text-green-600">{lowestFeeState.state}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-blue-50 border-blue-200" data-testid="card-average-fees">
                    <div className="flex items-center space-x-2">
                      <IndianRupee className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Average Fees</p>
                        <p className="text-lg font-bold text-blue-700">{formatCurrency(averageFees)}</p>
                        <p className="text-xs text-blue-600">All States</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-orange-50 border-orange-200" data-testid="card-dsc-charges">
                    <div className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-xs text-orange-600 font-medium">DSC Charges</p>
                        <p className="text-lg font-bold text-orange-700">{formatCurrency(DSC_CHARGES)}</p>
                        <p className="text-xs text-orange-600">For 2 Directors</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{stateGovtFeesData.length} States Covered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Transparent Pricing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>MCA Compliant</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Zoho Form */}
              <div className="lg:sticky lg:top-4">
                <Card className="shadow-xl border-0" data-testid="card-form">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl font-bold text-center">
                      Get Free Consultation
                    </CardTitle>
                    <p className="text-blue-100 text-center text-sm">
                      Start your company registration today
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ZohoForm height="500px" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* States List Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" data-testid="heading-states-list">
                Government Fees for Company Registration by State
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Click on any state to view detailed registration information, process, and FAQs.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by state, capital, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "name" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("name")}
                  data-testid="button-sort-name"
                >
                  A-Z
                </Button>
                <Button
                  variant={sortBy === "fees-low" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("fees-low")}
                  data-testid="button-sort-low"
                >
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Low to High
                </Button>
                <Button
                  variant={sortBy === "fees-high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("fees-high")}
                  data-testid="button-sort-high"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  High to Low
                </Button>
              </div>
            </div>

            {/* States Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAndSortedStates.map((state, index) => (
                <Link key={index} href={`/virtual-office-company-registration/${state.slug}`}>
                  <Card className="p-4 hover:shadow-lg transition-all hover:border-blue-400 cursor-pointer h-full group" data-testid={`card-state-${state.slug}`}>
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {state.state}
                          </h3>
                          <p className="text-xs text-gray-500">{state.capital}</p>
                        </div>
                        {state.govtFees === lowestFeeState.govtFees && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Lowest</Badge>
                        )}
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="text-sm text-gray-600">Govt Fees</span>
                          <span className="text-xl font-bold text-blue-600">{formatCurrency(state.govtFees)}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-sm">
                          <span className="text-gray-500">+ DSC</span>
                          <span className="text-gray-600">{formatCurrency(DSC_CHARGES)}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-2 mt-2 border-t">
                          <span className="font-medium text-gray-900">Total</span>
                          <span className="font-bold text-green-600">{formatCurrency(state.govtFees + DSC_CHARGES)}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredAndSortedStates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No states found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6" data-testid="heading-about-fees">
                  Understanding Company Registration Fees in India
                </h2>
                <div className="prose prose-lg">
                  <p className="text-gray-600 mb-4">
                    Company registration fees in India vary by state due to different stamp duty rates and ROC filing charges. The government fees shown above include all statutory charges payable to the Registrar of Companies (ROC) for incorporating a Private Limited Company.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">What's Included in Government Fees?</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>ROC Filing Fees for SPICe+ form</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>Stamp Duty on MOA and AOA</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>Name Reservation Fee</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>Certificate of Incorporation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose States with Lower Fees?</h3>
                <Card className="p-6 mb-4 bg-green-50 border-green-200">
                  <p className="text-gray-700">
                    States like <strong>Sikkim ({formatCurrency(lowestFeeState.govtFees)})</strong> offer the lowest registration fees in India. 
                    However, your choice of state should also consider:
                  </p>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    <li>• Business hub proximity and market access</li>
                    <li>• State-specific tax incentives and benefits</li>
                    <li>• Industry ecosystem and infrastructure</li>
                    <li>• Talent availability and operational costs</li>
                  </ul>
                </Card>

                <Card className="p-6 bg-blue-50 border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Digital Signature Certificate (DSC)</h4>
                  <p className="text-gray-600">
                    DSC charges of <strong>{formatCurrency(DSC_CHARGES)}</strong> for 2 directors are included in all company registrations. 
                    This is a Class 3 DSC valid for 2 years, required to digitally sign all MCA documents.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-testid="heading-cta">
              Ready to Register Your Company?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Get expert guidance on choosing the right state for your business. We handle all paperwork and compliance.
            </p>
            <div className="flex justify-center">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg" data-testid="button-get-started">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer location={currentLocation} />
    </div>
  );
}
