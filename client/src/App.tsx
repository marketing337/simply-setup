import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { CookiesProvider } from 'react-cookie';
import { LocationProvider } from "@/hooks/useLocation";
import { AuthProvider } from "@/hooks/use-auth";
import { ComplyAuthProvider } from "@/hooks/useComplyAuth";
import { ProtectedRoute } from "@/lib/protected-route";
import OrganizationStructuredData from "@/components/OrganizationStructuredData";
import DesktopWhatsAppButton from "@/components/DesktopWhatsAppButton";
import { SkipNavigation } from "@/components/AccessibilityEnhancements";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import { CountryProvider } from "@/contexts/CountryContext";
import SimplySetupChat from "@/components/SimplySetupChat";

// Critical pages - loaded immediately with preloading optimization
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// High-priority pages - lazy loaded with preloading
const WorkspacesPage = lazy(() => import("@/pages/WorkspacesPage"));
const WorkspacePage = lazy(() => import("@/pages/WorkspacePage"));

// Non-critical pages - lazy loaded
const LocationPage = lazy(() => import("@/pages/LocationPage"));
const AwfisPartnership = lazy(() => import("@/pages/AwfisPartnership"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const ThankYouPage = lazy(() => import("@/pages/ThankYouPage"));
const PaymentSuccessPage = lazy(() => import("@/pages/PaymentSuccessPage"));
const Admin = lazy(() => import("@/pages/Admin"));
const DocuKitAdmin = lazy(() => import("@/pages/admin/DocuKitAdmin"));
const MenuAdmin = lazy(() => import("@/pages/admin/MenuAdmin"));
const SimplySetupLeadsAdmin = lazy(() => import("@/pages/admin/SimplySetupLeadsAdmin"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const BlogTagPage = lazy(() => import("@/pages/BlogTagPage"));
const AuthPage = lazy(() => import("@/pages/auth-page"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/pages/TermsOfServicePage"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));
const VirtualOfficeBenefitsPage = lazy(() => import("@/pages/VirtualOfficeBenefitsPage"));
const AffordablePlansPage = lazy(() => import("@/pages/AffordablePlansPage"));
const RemoteWorkSolutionsPage = lazy(() => import("@/pages/RemoteWorkSolutionsPage"));
const StartupsPage = lazy(() => import("@/pages/StartupsPage"));
const EnterpriseSolutionsPage = lazy(() => import("@/pages/EnterpriseSolutionsPage"));
const CalculatorsPage = lazy(() => import("@/pages/CalculatorsPage"));
const StartupCostCalculatorPage = lazy(() => import("@/pages/StartupCostCalculatorPage"));
const VirtualOfficeROICalculatorPage = lazy(() => import("@/pages/VirtualOfficeROICalculatorPage"));
const BusinessSavingsCalculatorPage = lazy(() => import("@/pages/BusinessSavingsCalculatorPage"));
const CompanySearchPage = lazy(() => import("@/pages/CompanySearch"));
const CompanyProfilePage = lazy(() => import("@/pages/CompanyProfile"));
const CompanyRegistrationLandingPage = lazy(() => import("@/pages/CompanyRegistrationLandingPage"));
const VirtualOfficeCompanyRegistrationPage = lazy(() => import("@/pages/VirtualOfficeCompanyRegistrationPage"));

// State-specific Virtual Office Company Registration Pages
const AllStatesPage = lazy(() => import("@/pages/state-virtual-office/AllStatesPage"));
const StateVirtualOfficePage = lazy(() => import("@/pages/state-virtual-office/StateVirtualOfficePage"));

// City-specific Virtual Office Company Registration Pages
const MumbaiVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/MumbaiPage"));
const DelhiVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/DelhiPage"));
const BangaloreVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/BangalorePage"));
const HyderabadVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/HyderabadPage"));
const AhmedabadVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/AhmedabadPage"));
const ChennaiVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/ChennaiPage"));
const KolkataVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/KolkataPage"));
const PuneVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/PunePage"));
const JaipurVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/JaipurPage"));
const SuratVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/SuratPage"));
const NagpurVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/NagpurPage"));
const IndoreVirtualOfficePage = lazy(() => import("@/pages/city-virtual-office/IndorePage"));

// SimplySetup/Comply Pages
const ComplyAuth = lazy(() => import("@/pages/ComplyAuth"));
const ComplyDashboard = lazy(() => import("@/pages/ComplyDashboard"));
const ComplyTest = lazy(() => import("@/pages/ComplyTest"));

// Customer Portal Pages
const CustomerAuth = lazy(() => import("@/pages/customer/CustomerAuth"));
const CustomerOnboarding = lazy(() => import("@/pages/customer/CustomerOnboarding"));
const CustomerDashboard = lazy(() => import("@/pages/customer/CustomerDashboard"));

// New Use Case Pages
const TechStartupsPage = lazy(() => import("@/pages/TechStartupsPage"));
const FreelancersPage = lazy(() => import("@/pages/FreelancersPage"));
const EcommercePage = lazy(() => import("@/pages/EcommercePage"));
const ITCompaniesPage = lazy(() => import("@/pages/ITCompaniesPage"));
const GSTRegistrationPage = lazy(() => import("@/pages/GSTRegistrationPage"));
const GSTNumberSearchPage = lazy(() => import("@/pages/GSTNumberSearchPage"));
const GSTContactThankYouPage = lazy(() => import("@/pages/GSTContactThankYouPage"));
const GSTReturnCheckerPage = lazy(() => import("@/pages/GSTReturnCheckerPage"));
const BusinessRegistrationPage = lazy(() => import("@/pages/BusinessRegistrationPage"));
const RefundPolicyPage = lazy(() => import("@/pages/RefundPolicyPage"));
const DocuKitPage = lazy(() => import("@/pages/DocuKitPage"));
const DocuKitCategoryPage = lazy(() => import("@/pages/DocuKitCategoryPage"));
const TemplateDetailPage = lazy(() => import("@/pages/TemplateDetailPage"));

// Services Module Pages
const ServicesPage = lazy(() => import("@/pages/Services"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetail"));

// India Service Registration Pages
const CompanyRegistrationPage = lazy(() => import("@/pages/services/CompanyRegistrationPage"));
const LLPRegistrationPage = lazy(() => import("@/pages/services/LLPRegistrationPage"));
const ProprietorshipRegistrationPage = lazy(() => import("@/pages/services/ProprietorshipRegistrationPage"));
const MSMERegistrationPage = lazy(() => import("@/pages/services/MSMERegistrationPage"));
const TrustRegistrationPage = lazy(() => import("@/pages/services/TrustRegistrationPage"));
const OPCRegistrationPage = lazy(() => import("@/pages/services/OPCRegistrationPage"));
const SocietyRegistrationPage = lazy(() => import("@/pages/services/SocietyRegistrationPage"));
const StartupIndiaRegistrationPage = lazy(() => import("@/pages/services/StartupIndiaRegistrationPage"));
const StartupRegistrationPage = lazy(() => import("@/pages/services/StartupRegistrationPage"));
const NidhiCompanyRegistrationPage = lazy(() => import("@/pages/services/NidhiCompanyRegistrationPage"));
const MicrofinanceCompanyRegistrationPage = lazy(() => import("@/pages/services/MicrofinanceCompanyRegistrationPage"));
const ProducerCompanyRegistrationPage = lazy(() => import("@/pages/services/ProducerCompanyRegistrationPage"));
const WordmarkRegistrationPage = lazy(() => import("@/pages/services/WordmarkRegistrationPage"));

// Singapore Pages
const SingaporeHome = lazy(() => import("@/pages/singapore/SingaporeHome"));
const SingaporeWorkspaces = lazy(() => import("@/pages/singapore/SingaporeWorkspaces"));
const SingaporeWorkspacePage = lazy(() => import("@/pages/singapore/SingaporeWorkspacePage"));
const VirtualOfficeForTechStartupsPage = lazy(() => import("@/pages/services/VirtualOfficeForTechStartupsPage"));
const VirtualOfficeForConsultantsPage = lazy(() => import("@/pages/services/VirtualOfficeForConsultantsPage"));
const VirtualOfficeForFreelancersPage = lazy(() => import("@/pages/services/VirtualOfficeForFreelancersPage"));
const VirtualOfficeForEcommercePage = lazy(() => import("@/pages/services/VirtualOfficeForEcommercePage"));
const VirtualOfficeForEventsPage = lazy(() => import("@/pages/services/VirtualOfficeForEventsPage"));
const VirtualOfficeForRenewableEnergyPage = lazy(() => import("@/pages/services/VirtualOfficeForRenewableEnergyPage"));
const VirtualOfficeForHealthcarePage = lazy(() => import("@/pages/services/VirtualOfficeForHealthcarePage"));
const VirtualOfficeForHospitalityPage = lazy(() => import("@/pages/services/VirtualOfficeForHospitalityPage"));
const VirtualOfficeForConstructionPage = lazy(() => import("@/pages/services/VirtualOfficeForConstructionPage"));
const VirtualOfficeForImportExportPage = lazy(() => import("@/pages/services/VirtualOfficeForImportExportPage"));
const VirtualOfficeForFoodBeveragePage = lazy(() => import("@/pages/services/VirtualOfficeForFoodBeveragePage"));
const VirtualOfficeForManufacturingPage = lazy(() => import("@/pages/services/VirtualOfficeForManufacturingPage"));
const VirtualOfficeForCompanyRegistrationPage = lazy(() => import("@/pages/services/VirtualOfficeForCompanyRegistrationPage"));
const VirtualOfficeForGSTRegistrationPage = lazy(() => import("@/pages/services/VirtualOfficeForGSTRegistrationPage"));
const VirtualOfficeForBankAccountFormationPage = lazy(() => import("@/pages/services/VirtualOfficeForBankAccountFormationPage"));
const VirtualOfficeForMSMERegistrationPage = lazy(() => import("@/pages/services/VirtualOfficeForMSMERegistrationPage"));
const VirtualOfficeForLLPRegistrationPage = lazy(() => import("@/pages/services/VirtualOfficeForLLPRegistrationPage"));
const VirtualOfficeForGoogleMyBusinessRegistrationPage = lazy(() => import("@/pages/services/VirtualOfficeForGoogleMyBusinessRegistrationPage"));
const VirtualOfficeForSaaSFoundersPage = lazy(() => import("@/pages/services/VirtualOfficeForSaaSFoundersPage"));
const VirtualOfficeForRemoteCreativeAgencyPage = lazy(() => import("@/pages/services/VirtualOfficeForRemoteCreativeAgencyPage"));
const VirtualOfficeForForeignSMEEntryDeskPage = lazy(() => import("@/pages/services/VirtualOfficeForForeignSMEEntryDeskPage"));
const VirtualOfficeForFinTechStartupPage = lazy(() => import("@/pages/services/VirtualOfficeForFinTechStartupPage"));
const VirtualOfficeForNGOFoundationPage = lazy(() => import("@/pages/services/VirtualOfficeForNGOFoundationPage"));
const VirtualOfficeForRecruitmentProcessOutsourcerPage = lazy(() => import("@/pages/services/VirtualOfficeForRecruitmentProcessOutsourcerPage"));
const VirtualOfficeForSeasonalEventManagementPage = lazy(() => import("@/pages/services/VirtualOfficeForSeasonalEventManagementPage"));
const ServicesIndexPage = lazy(() => import("@/pages/services/ServicesIndexPage"));

// Purpose Pages for Business Registration Types
const VirtualOfficeForTradeLicensePage = lazy(() => import("@/pages/services/VirtualOfficeForTradeLicensePage"));
const VirtualOfficeForPartnershipPage = lazy(() => import("@/pages/services/VirtualOfficeForPartnershipPage"));
const VirtualOfficeForOPCPage = lazy(() => import("@/pages/services/VirtualOfficeForOPCPage"));
const VirtualOfficeForLLPPage = lazy(() => import("@/pages/services/VirtualOfficeForLLPPage"));
const VirtualOfficeForPrivateLimitedPage = lazy(() => import("@/pages/services/VirtualOfficeForPrivateLimitedPage"));
const VirtualOfficeForSection8Page = lazy(() => import("@/pages/services/VirtualOfficeForSection8Page"));
const VirtualOfficeForTrustPage = lazy(() => import("@/pages/services/VirtualOfficeForTrustPage"));
const VirtualOfficeForPublicLimitedPage = lazy(() => import("@/pages/services/VirtualOfficeForPublicLimitedPage"));
const VirtualOfficeForProducerCompanyPage = lazy(() => import("@/pages/services/VirtualOfficeForProducerCompanyPage"));
const VirtualOfficeForIndianSubsidiaryPage = lazy(() => import("@/pages/services/VirtualOfficeForIndianSubsidiaryPage"));

const DynamicRouter = lazy(() => import("@/components/DynamicRouter"));
const TestPage = lazy(() => import("@/pages/TestPage"));
const OffersPage = lazy(() => import("@/pages/OffersPage"));

// Growth Pages
const AmazonAccountManagementPage = lazy(() => import("@/pages/growth/AmazonAccountManagementPage"));
const AmazonProductListingPage = lazy(() => import("@/pages/growth/amazon/ProductListingPage"));
const AmazonAPlusListingPage = lazy(() => import("@/pages/growth/amazon/APlusListingPage"));
const AmazonPPCAdsPage = lazy(() => import("@/pages/growth/amazon/PPCAdsPage"));
const AmazonFBAOnboardingPage = lazy(() => import("@/pages/growth/amazon/FBAOnboardingPage"));
const FlipkartAccountManagementPage = lazy(() => import("@/pages/growth/FlipkartAccountManagementPage"));
const FlipkartProductListingPage = lazy(() => import("@/pages/growth/flipkart/ProductListingPage"));
const FlipkartAdsPromotionsPage = lazy(() => import("@/pages/growth/flipkart/AdsPromotionsPage"));
const FlipkartFulfillmentPage = lazy(() => import("@/pages/growth/flipkart/FulfillmentPage"));
const FlipkartPerformanceAnalyticsPage = lazy(() => import("@/pages/growth/flipkart/PerformanceAnalyticsPage"));
const JiomartAccountManagementPage = lazy(() => import("@/pages/growth/JiomartAccountManagementPage"));
const JiomartProductListingPage = lazy(() => import("@/pages/growth/jiomart/ProductListingPage"));
const JiomartAdsPromotionsPage = lazy(() => import("@/pages/growth/jiomart/AdsPromotionsPage"));
const JiomartFulfillmentPage = lazy(() => import("@/pages/growth/jiomart/FulfillmentPage"));
const JiomartPerformanceAnalyticsPage = lazy(() => import("@/pages/growth/jiomart/PerformanceAnalyticsPage"));
const BlinkitAccountManagementPage = lazy(() => import("@/pages/growth/BlinkitAccountManagementPage"));
const BlinkitExpressListingPage = lazy(() => import("@/pages/growth/blinkit/ExpressListingPage"));
const BlinkitInventoryForecastingPage = lazy(() => import("@/pages/growth/blinkit/InventoryForecastingPage"));
const BlinkitHyperlocalPromotionsPage = lazy(() => import("@/pages/growth/blinkit/HyperlocalPromotionsPage"));
const BlinkitSLAMonitoringPage = lazy(() => import("@/pages/growth/blinkit/SLAMonitoringPage"));
const ZeptoAccountManagementPage = lazy(() => import("@/pages/growth/ZeptoAccountManagementPage"));
const ZeptoExpressListingPage = lazy(() => import("@/pages/growth/zepto/ExpressListingPage"));
const ZeptoInventoryForecastingPage = lazy(() => import("@/pages/growth/zepto/InventoryForecastingPage"));
const ZeptoHyperlocalPromotionsPage = lazy(() => import("@/pages/growth/zepto/HyperlocalPromotionsPage"));
const ZeptoSLAMonitoringPage = lazy(() => import("@/pages/growth/zepto/SLAMonitoringPage"));
const SwiggyInstamartAccountManagementPage = lazy(() => import("@/pages/growth/SwiggyInstamartAccountManagementPage"));
const SwiggyInstamartExpressListingPage = lazy(() => import("@/pages/growth/swiggy-instamart/ExpressListingPage"));
const SwiggyInstamartInventoryForecastingPage = lazy(() => import("@/pages/growth/swiggy-instamart/InventoryForecastingPage"));
const SwiggyInstamartHyperlocalPromotionsPage = lazy(() => import("@/pages/growth/swiggy-instamart/HyperlocalPromotionsPage"));
const SwiggyInstamartSLAMonitoringPage = lazy(() => import("@/pages/growth/swiggy-instamart/SLAMonitoringPage"));
const MeeshoAccountManagementPage = lazy(() => import("@/pages/growth/MeeshoAccountManagementPage"));
const MeeshoSellerLaunchPage = lazy(() => import("@/pages/growth/meesho/SellerLaunchPage"));
const MeeshoCatalogStrategyPage = lazy(() => import("@/pages/growth/meesho/CatalogStrategyPage"));
const MeeshoResellerGrowthPage = lazy(() => import("@/pages/growth/meesho/ResellerGrowthPage"));
const MeeshoLogisticsPage = lazy(() => import("@/pages/growth/meesho/LogisticsPage"));
const AmazonUSAAccountManagementPage = lazy(() => import("@/pages/growth/AmazonUSAAccountManagementPage"));
const AmazonJapanAccountManagementPage = lazy(() => import("@/pages/growth/AmazonJapanAccountManagementPage"));
const AmazonJapanMarketEntryPage = lazy(() => import("@/pages/growth/amazon-japan/MarketEntryPage"));
const AmazonJapanLocalizedContentPage = lazy(() => import("@/pages/growth/amazon-japan/LocalizedContentPage"));
const AmazonJapanCrossBorderLogisticsPage = lazy(() => import("@/pages/growth/amazon-japan/CrossBorderLogisticsPage"));
const AmazonJapanRegionalAdsPage = lazy(() => import("@/pages/growth/amazon-japan/RegionalAdsPage"));
const AmazonUAEAccountManagementPage = lazy(() => import("@/pages/growth/AmazonUAEAccountManagementPage"));
const AmazonUAEMarketEntryPage = lazy(() => import("@/pages/growth/amazon-uae/MarketEntryPage"));
const AmazonUAELocalizedContentPage = lazy(() => import("@/pages/growth/amazon-uae/LocalizedContentPage"));
const AmazonUAECrossBorderLogisticsPage = lazy(() => import("@/pages/growth/amazon-uae/CrossBorderLogisticsPage"));
const AmazonUAERegionalAdsPage = lazy(() => import("@/pages/growth/amazon-uae/RegionalAdsPage"));
const FirstcryAccountManagementPage = lazy(() => import("@/pages/growth/FirstcryAccountManagementPage"));
const FirstcryCompliancePage = lazy(() => import("@/pages/growth/firstcry/CompliancePage"));
const FirstcryCatalogPage = lazy(() => import("@/pages/growth/firstcry/CatalogPage"));
const FirstcryPromotionsPage = lazy(() => import("@/pages/growth/firstcry/PromotionsPage"));
const FirstcryInventoryPage = lazy(() => import("@/pages/growth/firstcry/InventoryPage"));
const MyntraAccountManagementPage = lazy(() => import("@/pages/growth/MyntraAccountManagementPage"));
const MyntraBrandOnboardingPage = lazy(() => import("@/pages/growth/myntra/BrandOnboardingPage"));
const MyntraVisualMerchandisingPage = lazy(() => import("@/pages/growth/myntra/VisualMerchandisingPage"));
const MyntraCampaignsPage = lazy(() => import("@/pages/growth/myntra/CampaignsPage"));
const MyntraReturnsManagementPage = lazy(() => import("@/pages/growth/myntra/ReturnsManagementPage"));
const AjioBrandOnboardingPage = lazy(() => import("@/pages/growth/ajio/BrandOnboardingPage"));
const AjioVisualMerchandisingPage = lazy(() => import("@/pages/growth/ajio/VisualMerchandisingPage"));
const AjioCampaignsPage = lazy(() => import("@/pages/growth/ajio/CampaignsPage"));
const AjioReturnsManagementPage = lazy(() => import("@/pages/growth/ajio/ReturnsManagementPage"));
const AjioAccountManagementPage = lazy(() => import("@/pages/growth/AjioAccountManagementPage"));
const BigBasketAccountManagementPage = lazy(() => import("@/pages/growth/BigBasketAccountManagementPage"));
const BigBasketExpressListingPage = lazy(() => import("@/pages/growth/bigbasket/ExpressListingPage"));
const BigBasketInventoryForecastingPage = lazy(() => import("@/pages/growth/bigbasket/InventoryForecastingPage"));
const BigBasketHyperlocalPromotionsPage = lazy(() => import("@/pages/growth/bigbasket/HyperlocalPromotionsPage"));
const BigBasketSLAMonitoringPage = lazy(() => import("@/pages/growth/bigbasket/SLAMonitoringPage"));
const EcommerceOnboardingPage = lazy(() => import("@/pages/growth/EcommerceOnboardingPage"));
const LocalSEOGMBPage = lazy(() => import("@/pages/growth/LocalSEOGMBPage"));
const GrowthPage = lazy(() => import("@/pages/growth/GrowthPage"));
const VirtualOfficeComparatorPage = lazy(() => import("@/pages/VirtualOfficeComparatorPage"));
const PurposesPage = lazy(() => import("@/pages/PurposesPage"));
const DynamicVirtualOfficePage = lazy(() => import("@/pages/DynamicVirtualOfficePage"));

// Optimized loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center above-fold">
    <div className="loading-skeleton rounded-full h-8 w-8"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CookiesProvider>
            <TooltipProvider>
              <SkipNavigation />
              <Toaster />
              <OrganizationStructuredData />
              <DesktopWhatsAppButton />
              <SimplySetupChat />
              <LocationProvider>
                <CountryProvider>
                  <Switch>
                    {/* Home Route */}
                    <Route path="/" component={Home} />
                    
                    {/* Singapore Routes */}
                    <Route path="/sg">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <SingaporeHome />
                        </Suspense>
                      )}
                    </Route>
                    <Route path="/sg/virtual-office">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <SingaporeWorkspaces />
                        </Suspense>
                      )}
                    </Route>
                    <Route path="/sg/virtual-office/:slug">
                      {(params) => (
                        <Suspense fallback={<PageLoader />}>
                          <SingaporeWorkspacePage />
                        </Suspense>
                      )}
                    </Route>
                    <Route path="/sg/services/:slug">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <ServiceDetailPage />
                        </Suspense>
                      )}
                    </Route>
                    <Route path="/sg/services">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <ServicesPage />
                        </Suspense>
                      )}
                    </Route>
                    
                    {/* Admin Routes */}
                    <Route path="/admin/auth">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <AuthPage />
                        </Suspense>
                      )}
                    </Route>
                    
                    {/* Comply Routes - Separate Authentication System */}
                    <Route path="/comply" nest>
                      <ComplyAuthProvider>
                        <Route path="/test">
                          {() => (
                            <Suspense fallback={<PageLoader />}>
                              <ComplyTest />
                            </Suspense>
                          )}
                        </Route>
                        <Route path="/dashboard">
                          {() => (
                            <Suspense fallback={<PageLoader />}>
                              <ComplyDashboard />
                            </Suspense>
                          )}
                        </Route>
                        <Route path="/auth">
                          {() => (
                            <Suspense fallback={<PageLoader />}>
                              <ComplyAuth />
                            </Suspense>
                          )}
                        </Route>
                        <Route path="/">
                          {() => (
                            <Suspense fallback={<PageLoader />}>
                              <ComplyAuth />
                            </Suspense>
                          )}
                        </Route>
                      </ComplyAuthProvider>
                    </Route>
                    
                    {/* Customer Portal Routes */}
                    <Route path="/customer" nest>
                      <ComplyAuthProvider>
                        <Route path="/auth">
                          {() => (
                            <Suspense fallback={<PageLoader />}>
                              <CustomerAuth />
                            </Suspense>
                          )}
                        </Route>
                        <Route path="/onboarding">
                          {() => (
                            <Suspense fallback={<PageLoader />}>
                              <CustomerOnboarding />
                            </Suspense>
                          )}
                        </Route>
                        <Route path="/dashboard">
                          {() => (
                            <Suspense fallback={<PageLoader />}>
                              <CustomerDashboard />
                            </Suspense>
                          )}
                        </Route>
                        <Route path="/">
                          {() => (
                            <Suspense fallback={<PageLoader />}>
                              <CustomerAuth />
                            </Suspense>
                          )}
                        </Route>
                      </ComplyAuthProvider>
                    </Route>
                    
                    <ProtectedRoute 
                      path="/admin" 
                      component={() => (
                        <Suspense fallback={<PageLoader />}>
                          <Admin />
                        </Suspense>
                      )}
                    />
                    <ProtectedRoute 
                      path="/admin/docukit" 
                      component={() => (
                        <Suspense fallback={<PageLoader />}>
                          <DocuKitAdmin />
                        </Suspense>
                      )}
                    />
                    <ProtectedRoute 
                      path="/admin/menu" 
                      component={() => (
                        <Suspense fallback={<PageLoader />}>
                          <MenuAdmin />
                        </Suspense>
                      )}
                    />
                    <ProtectedRoute 
                      path="/admin/simplysetup" 
                      component={() => (
                        <Suspense fallback={<PageLoader />}>
                          <SimplySetupLeadsAdmin />
                        </Suspense>
                      )}
                    />
                    
                    {/* Blog Routes - must come before the dynamic location routes */}
                    <Route path="/blog/tags/:tag">
                      {params => (
                        <Suspense fallback={<PageLoader />}>
                          <BlogTagPage />
                        </Suspense>
                      )}
                    </Route>
                    <Route path="/blog/:slug">
                      {params => (
                        <Suspense fallback={<PageLoader />}>
                          <BlogPostPage />
                        </Suspense>
                      )}
                    </Route>
                    <Route path="/blog">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <BlogPage />
                        </Suspense>
                      )}
                    </Route>
                    
                    {/* Services Module Routes */}
                    <Route path="/services/:slug">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <ServiceDetailPage />
                        </Suspense>
                      )}
                    </Route>
                    <Route path="/services">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <ServicesPage />
                        </Suspense>
                      )}
                    </Route>
                
                    {/* Virtual Office Routes - Base route */}
                    <Route path="/virtual-office">
                      {() => (
                        <Suspense fallback={<PageLoader />}>
                          <WorkspacesPage />
                        </Suspense>
                      )}
                    </Route>
                
                {/* City with area route - must come before general city route */}
                <Route path="/virtual-office/:city/:area">
                  {params => {
                    // Skip if this matches a predefined route to avoid conflicts
                    if (["blog", "admin", "workspaces", "about", "contact", "thank-you-1", "pages", "privacy-policy", "terms-of-service", "sitemap", "usecase"].includes(params.city)) {
                      return <NotFound />;
                    }
                    
                    console.log("Loading city with area:", params.city, params.area);
                    return (
                      <Suspense fallback={<PageLoader />}>
                        <WorkspacesPage citySlug={params.city} areaSlug={params.area} />
                      </Suspense>
                    );
                  }}
                </Route>

                {/* Individual workspaces with virtual-office prefix */}
                <Route path="/virtual-office/:slug">
                  {params => {
                    // Skip if this matches a predefined route to avoid conflicts
                    if (["blog", "admin", "workspaces", "about", "contact", "thank-you-1", "pages", "privacy-policy", "terms-of-service", "sitemap", "usecase", "sg"].includes(params.slug)) {
                      return <NotFound />;
                    }
                    
                    // Check if slug ends with known purposes (for dynamic pages)
                    // Dynamic pages have format: area-name-purpose (e.g., "bandra-gst-registration", "nariman-point-company-registration")
                    const dynamicPagePatterns = [
                      'gst-registration',
                      'company-registration'
                    ];
                    
                    const isDynamicPage = dynamicPagePatterns.some(pattern => params.slug.endsWith(pattern));
                    
                    if (isDynamicPage) {
                      console.log("Loading as dynamic page:", params.slug);
                      return (
                        <Suspense fallback={<PageLoader />}>
                          <DynamicVirtualOfficePage />
                        </Suspense>
                      );
                    }
                    
                    // Check for workspace slugs with hyphenated names like "awfis-fun-republic"
                    // If slug contains a hyphen, treat it as a workspace
                    if (params.slug.includes('-')) {
                      console.log("Attempting to load as workspace:", params.slug);
                      return (
                        <Suspense fallback={<PageLoader />}>
                          <WorkspacePage />
                        </Suspense>
                      );
                    }
                    
                    // Otherwise, treat it as a city
                    console.log("Loading as city:", params.slug);
                    return (
                      <Suspense fallback={<PageLoader />}>
                        <WorkspacesPage citySlug={params.slug} />
                      </Suspense>
                    );
                  }}
                </Route>
                
                {/* Individual workspaces with virtual-office-space prefix (for backward compatibility) */}
                <Route path="/virtual-office-space/:slug">
                  {params => (
                    <Suspense fallback={<PageLoader />}>
                      <WorkspacePage />
                    </Suspense>
                  )}
                </Route>
                
                {/* City-specific Virtual Office Routes - Legacy format (kept for backward compatibility) */}
                <Route path="/:city/virtual-office">
                  {(params) => {
                    // Skip if this is an admin or other predefined route to avoid conflicts
                    if (["blog", "admin", "workspaces", "virtual-office", "about", "contact", "thank-you-1", "pages", "privacy-policy", "terms-of-service", "sitemap", "usecase", "docukit", "sg"].includes(params.city)) {
                      return <NotFound />;
                    }
                    return (
                      <Suspense fallback={<PageLoader />}>
                        <WorkspacesPage citySlug={params.city} />
                      </Suspense>
                    );
                  }}
                </Route>
                
                {/* Workspace Routes - Legacy routes kept for backward compatibility and SEO preservation */}
                <Route path="/workspaces/:slug">
                  {params => (
                    <Suspense fallback={<PageLoader />}>
                      <WorkspacePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/workspaces">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <WorkspacesPage />
                    </Suspense>
                  )}
                </Route>
                
                {/* Public Routes */}
                <Route path="/about">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AboutPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/contact">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ContactPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/offers">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <OffersPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-comparison">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeComparatorPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/thank-you-1">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ThankYouPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/pages/thank-you-1">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ThankYouPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/payment-success">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <PaymentSuccessPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/test">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <TestPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/companies">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <CompanySearchPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/companies/:slug">
                  {(params) => (
                    <Suspense fallback={<PageLoader />}>
                      <CompanyProfilePage />
                    </Suspense>
                  )}
                </Route>
                {/* Legal Pages */}
                <Route path="/privacy-policy">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <PrivacyPolicyPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/terms-of-service">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <TermsOfServicePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/sitemap">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <SitemapPage />
                    </Suspense>
                  )}
                </Route>
                {/* Partnership page */}
                <Route path="/partnership/awfis">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AwfisPartnership />
                    </Suspense>
                  )}
                </Route>
                {/* Purposes Page */}
                <Route path="/purposes">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <PurposesPage />
                    </Suspense>
                  )}
                </Route>
                {/* Use Case Pages */}
                <Route path="/usecase">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ServicesIndexPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-tech-startups">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForTechStartupsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-consultants">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForConsultantsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-freelancers">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForFreelancersPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-ecommerce">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForEcommercePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-events">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForEventsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-renewable-energy">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForRenewableEnergyPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-healthcare">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForHealthcarePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-hospitality">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForHospitalityPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-construction">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForConstructionPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-import-export">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForImportExportPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-food-beverage">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForFoodBeveragePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-manufacturing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForManufacturingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-saas-founders">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForSaaSFoundersPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-remote-creative-agency">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForRemoteCreativeAgencyPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-foreign-sme-entry-desk">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForForeignSMEEntryDeskPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-fintech-startup">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForFinTechStartupPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-ngo-foundation">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForNGOFoundationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-recruitment-process-outsourcer">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForRecruitmentProcessOutsourcerPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/usecase/virtual-office-for-seasonal-event-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForSeasonalEventManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-company-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForCompanyRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-gst-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForGSTRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-bank-account-formation">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForBankAccountFormationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-msme-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForMSMERegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-llp-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForLLPRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-google-my-business-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForGoogleMyBusinessRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                
                {/* India Service Registration Pages - Direct service pages */}
                <Route path="/services/company-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <CompanyRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/llp-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <LLPRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/proprietorship-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ProprietorshipRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/msme-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MSMERegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/trust-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <TrustRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/opc-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <OPCRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/society-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <SocietyRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/startup-india-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <StartupIndiaRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/startup-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <StartupRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/nidhi-company-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <NidhiCompanyRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/microfinance-company-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MicrofinanceCompanyRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/producer-company-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ProducerCompanyRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/services/wordmark-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <WordmarkRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                
                {/* New Purpose Pages for Business Registration Types */}
                <Route path="/purpose/virtual-office-for-trade-license">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForTradeLicensePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-partnership">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForPartnershipPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-opc">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForOPCPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-llp">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForLLPPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-private-limited">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForPrivateLimitedPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-section-8">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForSection8Page />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-trust">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForTrustPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-public-limited">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForPublicLimitedPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-producer-company">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForProducerCompanyPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/purpose/virtual-office-for-indian-subsidiary">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeForIndianSubsidiaryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/benefits">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeBenefitsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/affordable-plans">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AffordablePlansPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/remote-work-solutions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <RemoteWorkSolutionsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/startups">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <StartupsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/enterprise-solutions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <EnterpriseSolutionsPage />
                    </Suspense>
                  )}
                </Route>
                
                {/* Calculator Routes */}
                <Route path="/calculators">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <CalculatorsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/calculators/startup-cost">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <StartupCostCalculatorPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/calculators/roi">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeROICalculatorPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/calculators/savings">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BusinessSavingsCalculatorPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/company-search">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <CompanySearchPage />
                    </Suspense>
                  )}
                </Route>

                {/* New Use Case Pages */}
                <Route path="/tech-startups">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <TechStartupsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/freelancers">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FreelancersPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/ecommerce">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <EcommercePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/it-companies">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ITCompaniesPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/gst-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <GSTRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/gst-number-search">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <GSTNumberSearchPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/gst-number-search/:slug">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <GSTNumberSearchPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/gst-contact-thank-you">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <GSTContactThankYouPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/gst-return-checker">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <GSTReturnCheckerPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/gst-return-checker/:slug">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <GSTReturnCheckerPage />
                    </Suspense>
                  )}
                </Route>
                
                {/* Growth Pages */}
                <Route path="/growth">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <GrowthPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/ecommerce-onboarding">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <EcommerceOnboardingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/local-seo-gmb">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <LocalSEOGMBPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-account-management/product-listing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonProductListingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-account-management/a-plus-listing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonAPlusListingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-account-management/ppc-ads">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonPPCAdsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-account-management/fba-onboarding">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonFBAOnboardingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/flipkart-account-management/product-listing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FlipkartProductListingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/flipkart-account-management/ads-promotions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FlipkartAdsPromotionsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/flipkart-account-management/fulfillment">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FlipkartFulfillmentPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/flipkart-account-management/performance-analytics">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FlipkartPerformanceAnalyticsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/flipkart-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FlipkartAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/jiomart-account-management/product-listing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <JiomartProductListingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/jiomart-account-management/ads-promotions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <JiomartAdsPromotionsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/jiomart-account-management/fulfillment">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <JiomartFulfillmentPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/jiomart-account-management/performance-analytics">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <JiomartPerformanceAnalyticsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/jiomart-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <JiomartAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/blinkit-account-management/express-listing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BlinkitExpressListingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/blinkit-account-management/inventory-forecasting">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BlinkitInventoryForecastingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/blinkit-account-management/hyperlocal-promotions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BlinkitHyperlocalPromotionsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/blinkit-account-management/sla-monitoring">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BlinkitSLAMonitoringPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/blinkit-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BlinkitAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/zepto-account-management/express-listing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ZeptoExpressListingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/zepto-account-management/inventory-forecasting">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ZeptoInventoryForecastingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/zepto-account-management/hyperlocal-promotions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ZeptoHyperlocalPromotionsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/zepto-account-management/sla-monitoring">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ZeptoSLAMonitoringPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/zepto-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ZeptoAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/swiggy-instamart-account-management/express-listing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <SwiggyInstamartExpressListingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/swiggy-instamart-account-management/inventory-forecasting">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <SwiggyInstamartInventoryForecastingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/swiggy-instamart-account-management/hyperlocal-promotions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <SwiggyInstamartHyperlocalPromotionsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/swiggy-instamart-account-management/sla-monitoring">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <SwiggyInstamartSLAMonitoringPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/swiggy-instamart-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <SwiggyInstamartAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/meesho-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MeeshoAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/meesho-account-management/seller-launch">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MeeshoSellerLaunchPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/meesho-account-management/catalog-strategy">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MeeshoCatalogStrategyPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/meesho-account-management/reseller-growth">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MeeshoResellerGrowthPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/meesho-account-management/logistics">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MeeshoLogisticsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-usa-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonUSAAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-japan-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonJapanAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-japan-account-management/market-entry">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonJapanMarketEntryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-japan-account-management/localized-content">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonJapanLocalizedContentPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-japan-account-management/cross-border-logistics">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonJapanCrossBorderLogisticsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-japan-account-management/regional-ads">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonJapanRegionalAdsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-uae-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonUAEAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-uae-account-management/market-entry">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonUAEMarketEntryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-uae-account-management/localized-content">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonUAELocalizedContentPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-uae-account-management/cross-border-logistics">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonUAECrossBorderLogisticsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/amazon-uae-account-management/regional-ads">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AmazonUAERegionalAdsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/firstcry-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FirstcryAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/firstcry-account-management/compliance">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FirstcryCompliancePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/firstcry-account-management/catalog">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FirstcryCatalogPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/firstcry-account-management/promotions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FirstcryPromotionsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/firstcry-account-management/inventory">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <FirstcryInventoryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/myntra-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MyntraAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/myntra-account-management/brand-onboarding">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MyntraBrandOnboardingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/myntra-account-management/visual-merchandising">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MyntraVisualMerchandisingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/myntra-account-management/campaigns">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MyntraCampaignsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/myntra-account-management/returns-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MyntraReturnsManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/ajio-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AjioAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/ajio-account-management/brand-onboarding">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AjioBrandOnboardingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/ajio-account-management/visual-merchandising">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AjioVisualMerchandisingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/ajio-account-management/campaigns">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AjioCampaignsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/ajio-account-management/returns-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AjioReturnsManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/bigbasket-account-management">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BigBasketAccountManagementPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/bigbasket-account-management/express-listing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BigBasketExpressListingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/bigbasket-account-management/inventory-forecasting">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BigBasketInventoryForecastingPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/bigbasket-account-management/hyperlocal-promotions">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BigBasketHyperlocalPromotionsPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/growth/bigbasket-account-management/sla-monitoring">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BigBasketSLAMonitoringPage />
                    </Suspense>
                  )}
                </Route>
                
                <Route path="/business-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BusinessRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/refund-policy">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <RefundPolicyPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/docukit">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <DocuKitPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/docukit/hr">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <DocuKitCategoryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/docukit/finance">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <DocuKitCategoryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/docukit/legal">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <DocuKitCategoryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/docukit/operations">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <DocuKitCategoryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/docukit/marketing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <DocuKitCategoryPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/docukit/:categorySlug/:templateSlug">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <TemplateDetailPage />
                    </Suspense>
                  )}
                </Route>
                
                {/* Company Registration Landing Page */}
                <Route path="/company-registration-landing">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <CompanyRegistrationLandingPage />
                    </Suspense>
                  )}
                </Route>
                
                {/* Virtual Office Company Registration Page */}
                <Route path="/virtual-office-company-registration">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <VirtualOfficeCompanyRegistrationPage />
                    </Suspense>
                  )}
                </Route>
                
                {/* State-specific Virtual Office Company Registration Pages */}
                <Route path="/virtual-office-company-registration-all-states">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AllStatesPage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration/:state">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <StateVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                
                {/* City-specific Virtual Office Company Registration Pages */}
                <Route path="/virtual-office-company-registration-mumbai">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <MumbaiVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-delhi">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <DelhiVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-bangalore">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <BangaloreVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-hyderabad">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <HyderabadVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-ahmedabad">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <AhmedabadVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-chennai">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <ChennaiVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-kolkata">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <KolkataVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-pune">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <PuneVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-jaipur">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <JaipurVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-surat">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <SuratVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-nagpur">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <NagpurVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                <Route path="/virtual-office-company-registration-indore">
                  {() => (
                    <Suspense fallback={<PageLoader />}>
                      <IndoreVirtualOfficePage />
                    </Suspense>
                  )}
                </Route>
                
                {/* Area pages route - New format: virtual-office/location/area */}
                <Route path="/virtual-office/:location/:area">
                  {params => {
                    // Skip if path starts with predefined routes to avoid conflict
                    if (["blog", "admin", "workspaces", "about", "contact", "thank-you-1", "pages", "privacy-policy", "terms-of-service", "sitemap", "usecase", "docukit"].includes(params.location)) return <NotFound />;
                    return (
                      <Suspense fallback={<PageLoader />}>
                        <LocationPage areaSlug={params.area} />
                      </Suspense>
                    );
                  }}
                </Route>
                
                {/* Area pages route - Legacy format (kept for backward compatibility) */}
                <Route path="/:location/:area">
                  {params => {
                    // Skip if path starts with predefined routes to avoid conflict
                    if (["blog", "admin", "workspaces", "virtual-office", "about", "contact", "thank-you-1", "pages", "privacy-policy", "terms-of-service", "sitemap", "usecase", "docukit"].includes(params.location)) return <NotFound />;
                    return (
                      <Suspense fallback={<PageLoader />}>
                        <LocationPage areaSlug={params.area} />
                      </Suspense>
                    );
                  }}
                </Route>
                {/* Workspace slug check before location routes */}
                <Route path="/:slug">
                  {params => {
                    // Skip if path starts with predefined routes to avoid conflict
                    if (["blog", "admin", "workspaces", "virtual-office", "about", "contact", "thank-you-1", "pages", "privacy-policy", "terms-of-service", "sitemap", "usecase", "docukit"].includes(params.slug)) return <NotFound />;
                    
                    // We need to check if this is a workspace slug or a location slug
                    return (
                      <Suspense fallback={<PageLoader />}>
                        <DynamicRouter slug={params.slug} />
                      </Suspense>
                    );
                  }}
                </Route>
                
                {/* Fallback */}
                <Route component={NotFound} />
              </Switch>
                </CountryProvider>
              </LocationProvider>
            </TooltipProvider>
          </CookiesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
