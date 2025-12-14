import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Building, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Globe, 
  Zap, 
  TrendingUp, 
  Star,
  ArrowRight,
  Calculator,
  FileText,
  Clock,
  Award,
  Target,
  CheckSquare,
  MessageCircle,
  Briefcase,
  Calendar,
  Banknote,
  Scale,
  Home,
  Crown
} from "lucide-react";
import businessConsultantImage from "@assets/generated_images/Business_consultant_portrait_dfdbbef6.png";
import { useEffect } from "react";

export default function CompanyRegistrationLandingPage() {
  useEffect(() => {
    // Zoho form initialization script
    const loadZohoForm = () => {
      try {
        // Function to create and setup iframe
        const createIframe = (containerId: string) => {
          var f = document.createElement("iframe");
          
          var ifrmSrc = 'https://forms.zohopublic.in/accounts50/form/RegisteraBusiness/formperma/gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0?zf_rszfm=1';
          
          try {
            if (typeof (window as any).ZFAdvLead != "undefined" && typeof (window as any).zfutm_zfAdvLead != "undefined") {
              for (var prmIdx = 0; prmIdx < (window as any).ZFAdvLead.utmPNameArr.length; prmIdx++) {
                var utmPm = (window as any).ZFAdvLead.utmPNameArr[prmIdx];
                utmPm = ((window as any).ZFAdvLead.isSameDomian && ((window as any).ZFAdvLead.utmcustPNameArr.indexOf(utmPm) == -1)) ? "zf_" + utmPm : utmPm;
                var utmVal = (window as any).zfutm_zfAdvLead.zfautm_gC_enc((window as any).ZFAdvLead.utmPNameArr[prmIdx]);
                if (typeof utmVal !== "undefined") {
                  if (utmVal != "") {
                    if (ifrmSrc.indexOf('?') > 0) {
                      ifrmSrc = ifrmSrc + '&' + utmPm + '=' + utmVal;
                    } else {
                      ifrmSrc = ifrmSrc + '?' + utmPm + '=' + utmVal;
                    }
                  }
                }
              }
            }
            if (typeof (window as any).ZFLead !== "undefined" && typeof (window as any).zfutm_zfLead !== "undefined") {
              for (var prmIdx = 0; prmIdx < (window as any).ZFLead.utmPNameArr.length; prmIdx++) {
                var utmPm = (window as any).ZFLead.utmPNameArr[prmIdx];
                var utmVal = (window as any).zfutm_zfLead.zfutm_gC_enc((window as any).ZFLead.utmPNameArr[prmIdx]);
                if (typeof utmVal !== "undefined") {
                  if (utmVal != "") {
                    if (ifrmSrc.indexOf('?') > 0) {
                      ifrmSrc = ifrmSrc + '&' + utmPm + '=' + utmVal;
                    } else {
                      ifrmSrc = ifrmSrc + '?' + utmPm + '=' + utmVal;
                    }
                  }
                }
              }
            }
          } catch (e) {}
          
          f.src = ifrmSrc;
          f.style.border = "none";
          f.style.height = "614px";
          f.style.width = "100%";
          f.style.transition = "all 0.5s ease";
          f.setAttribute("aria-label", 'Register a Business');
          
          var d = document.getElementById(containerId);
          if (d) {
            // Clear any existing content
            d.innerHTML = '';
            d.appendChild(f);
          }
        };

        // Check which container is visible and create iframe accordingly
        const mobileContainer = document.getElementById("zf_div_mobile_gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0");
        const desktopContainer = document.getElementById("zf_div_gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0");

        // Check screen size to determine which container to use
        const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
        
        if (isLargeScreen && desktopContainer) {
          createIframe("zf_div_gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0");
        } else if (!isLargeScreen && mobileContainer) {
          createIframe("zf_div_mobile_gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0");
        }
        
        // Message listener for iframe height adjustment
        const messageListener = (event: MessageEvent) => {
          var evntData = event.data;
          if (evntData && evntData.constructor == String) {
            var zf_ifrm_data = evntData.split("|");
            if (zf_ifrm_data.length == 2 || zf_ifrm_data.length == 3) {
              var zf_perma = zf_ifrm_data[0];
              var zf_ifrm_ht_nw = (parseInt(zf_ifrm_data[1], 10) + 15) + "px";
              
              // Check both containers for the iframe
              var iframe = document.getElementById("zf_div_gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0")?.getElementsByTagName("iframe")[0];
              if (!iframe) {
                iframe = document.getElementById("zf_div_mobile_gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0")?.getElementsByTagName("iframe")[0];
              }
              
              if (iframe && iframe.src && iframe.src.indexOf('formperma') > 0 && iframe.src.indexOf(zf_perma) > 0) {
                var prevIframeHeight = iframe.style.height;
                var zf_tout = false;
                if (zf_ifrm_data.length == 3) {
                  iframe.scrollIntoView();
                  zf_tout = true;
                }

                if (prevIframeHeight != zf_ifrm_ht_nw) {
                  if (zf_tout && iframe) {
                    setTimeout(function () {
                      if (iframe) {
                        iframe.style.height = zf_ifrm_ht_nw;
                      }
                    }, 500);
                  } else if (iframe) {
                    iframe.style.height = zf_ifrm_ht_nw;
                  }
                }
              }
            }
          }
        };
        
        window.addEventListener('message', messageListener, false);
        
        // Store the listener for cleanup
        (window as any).zohoFormMessageListener = messageListener;
        
      } catch (e) {
        console.error('Error loading Zoho form:', e);
      }
    };

    // Load the form
    loadZohoForm();

    // Handle screen resize to switch containers
    const handleResize = () => {
      loadZohoForm();
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if ((window as any).zohoFormMessageListener) {
        window.removeEventListener('message', (window as any).zohoFormMessageListener, false);
        delete (window as any).zohoFormMessageListener;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const benefits = [
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "Virtual Office Address",
      description: "Get a prestigious business address without physical office space",
      features: ["Prime business location", "Mail handling service", "Business address proof", "Google My Business listing"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Complete Registration Support", 
      description: "End-to-end company registration with ROC filing and documentation",
      features: ["MCA registration", "Digital signature", "Name approval", "Certificate issuance"]
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: "Documentation & Compliance",
      description: "All required documents prepared and ongoing compliance support",
      features: ["MOA & AOA drafting", "Board resolutions", "Annual filing support", "Statutory compliance"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Business Growth Ready",
      description: "Set up your business for funding, partnerships, and scaling",
      features: ["Investment ready", "Bank account opening", "Business loans eligibility", "Professional credibility"]
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Submit Requirements",
      description: "Provide your business details and required documents through our secure platform",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      step: "2", 
      title: "Virtual Office Setup",
      description: "Get assigned a premium virtual office address in your preferred business location",
      icon: <MapPin className="w-6 h-6 text-blue-600" />
    },
    {
      step: "3",
      title: "Company Registration",
      description: "Complete MCA filing, digital signature, and name approval process",
      icon: <Building className="w-6 h-6 text-blue-600" />
    },
    {
      step: "4",
      title: "Business Ready",
      description: "Receive incorporation certificate and start operating with full compliance",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const packages = [
    {
      name: "Basic Registration",
      price: "₹8,999",
      timeline: "7-10 days",
      features: [
        "Virtual office address",
        "Company name approval",
        "MCA registration", 
        "Digital signature (1 director)",
        "Incorporation certificate",
        "Basic compliance support"
      ],
      popular: false
    },
    {
      name: "Premium Registration", 
      price: "₹14,999",
      timeline: "5-7 days",
      features: [
        "Premium virtual office address",
        "Priority name approval",
        "Fast-track MCA registration",
        "Digital signature (2 directors)", 
        "Bank account opening support",
        "GST registration included",
        "1 year compliance support",
        "Dedicated relationship manager"
      ],
      popular: true
    },
    {
      name: "Enterprise Registration",
      price: "₹24,999", 
      timeline: "3-5 days",
      features: [
        "Prestigious business address",
        "Express processing",
        "Multiple director support",
        "Priority customer support",
        "Complete banking setup",
        "Trademark search & filing",
        "2 years compliance support",
        "Legal consultation included"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Company Registration with Virtual Office | SimplySetup"
        description="Register your company with premium virtual office address. Complete MCA registration, ROC filing, and business setup with professional virtual office services."
        canonicalUrl="/company-registration-landing"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Form - Shows first on mobile only */}
            <div className="lg:hidden mb-8">
              <div id="zf_div_mobile_gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0">
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Content */}
              <div className="order-1 lg:order-1">
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Company Registration with Virtual Office
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 mb-6">
                    Launch your business with a prestigious virtual office address and complete company registration support. Get ROC compliance, professional credibility, and business growth readiness.
                  </p>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">7-10 Days Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">50K+ Companies Registered</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative max-w-md">
                  <img 
                    src={businessConsultantImage}
                    alt="Professional business consultant for company registration"
                    className="w-full h-auto rounded-lg shadow-lg"
                    data-testid="img-business-consultant"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-lg shadow-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">Expert</div>
                      <div className="text-xs text-gray-600">Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form (Desktop only) */}
              <div className="hidden lg:block lg:order-2">
                <div id="zf_div_gKY3dOfzY-ICyoT6mRG6QYmjCYQfIJrAvnQaezUSyd0">
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Company Registration with Virtual Office
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Launch your business with a prestigious virtual office address and complete company registration support. 
                Get ROC compliance, professional credibility, and business growth readiness.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Address</h3>
                  <p className="text-gray-600">Get a prestigious business address in prime commercial locations</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Registration</h3>
                  <p className="text-gray-600">End-to-end MCA filing and ROC registration with expert support</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Growth Ready</h3>
                  <p className="text-gray-600">Business setup ready for funding, partnerships, and scaling</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Virtual Office for Company Registration
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Combine the benefits of professional business presence with complete company registration services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                        <div className="space-y-2">
                          {benefit.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Simple 4-Step Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your company registered with virtual office address in just 4 simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="bg-blue-600 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Package
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the perfect registration package for your business needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card key={index} className={`p-8 border-2 ${pkg.popular ? 'border-green-500 shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-xl transition-shadow relative`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-0">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-green-600 mb-2">{pkg.price}</div>
                      <p className="text-gray-600 text-sm">Timeline: {pkg.timeline}</p>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className={`w-full ${pkg.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer location={null} />
    </div>
  );
}