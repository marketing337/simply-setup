import { Helmet } from "react-helmet-async";
import { useAllOffers } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Gift, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OffersPage() {
  const { data: offers, isLoading } = useAllOffers();

  return (
    <>
      <Helmet>
        <title>Special Offers & Deals - SimplySetup Virtual Office</title>
        <meta
          name="description"
          content="Discover exclusive offers and deals on virtual office services. Save on business address, GST registration, and company registration packages across India."
        />
        <meta
          name="keywords"
          content="virtual office offers, business address deals, GST registration discount, company formation offers, workspace deals India"
        />

        {/* Open Graph tags */}
        <meta
          property="og:title"
          content="Special Offers & Deals - SimplySetup Virtual Office"
        />
        <meta
          property="og:description"
          content="Discover exclusive offers and deals on virtual office services. Save on business address, GST registration, and company registration packages across India."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/offers`} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Special Offers & Deals - SimplySetup Virtual Office"
        />
        <meta
          name="twitter:description"
          content="Discover exclusive offers and deals on virtual office services. Save on business address, GST registration, and company registration packages across India."
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Special Offers & Deals",
            description:
              "Exclusive offers and deals on virtual office services, business address, and company registration packages.",
            url: `${window.location.origin}/offers`,
            mainEntity: {
              "@type": "ItemList",
              name: "Virtual Office Offers",
              description:
                "Special deals and offers on virtual office services",
              numberOfItems: offers?.length || 0,
            },
            provider: {
              "@type": "Organization",
              name: "SimplySetup",
              url: window.location.origin,
            },
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 p-4 rounded-full">
                  <Gift className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Partner Offers & Deals
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Discover exclusive deals on virtual office services and save on
                your business setup costs
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Limited Time Offers
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Exclusive Discounts
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Best Value Packages
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading exclusive offers...</p>
                </div>
              </div>
            ) : offers && offers.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Current Offers
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Take advantage of these limited-time deals to save on your
                    virtual office and business setup needs
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                  {offers.map((offer, index) => (
                    <Card
                      key={offer.id}
                      className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                    >
                      {offer.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={offer.image}
                            alt={offer.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-red-500 text-white">
                              Deal #{index + 1}
                            </Badge>
                          </div>
                        </div>
                      )}

                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                          {offer.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <CardDescription className="text-gray-600 line-clamp-4">
                          {offer.description}
                        </CardDescription>

                        <div className="pt-4">
                          <Button
                            className="w-full group"
                            onClick={() =>
                              window.open(
                                offer.hyperlink,
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }
                          >
                            Claim This Offer
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Gift className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  No Active Offers
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We're currently updating our offers. Check back soon for
                  exciting deals on virtual office services!
                </p>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                >
                  Explore Our Services
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Business Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't miss out on these exclusive offers. Get your virtual office
              setup today and save on business registration costs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => (window.location.href = "/")}
              >
                Browse All Services
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Sales Team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
