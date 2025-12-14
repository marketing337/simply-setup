import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLocation } from "@/hooks/useLocation";

export default function AboutPage() {
  const { currentLocation } = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About Us | SimplySetup" 
        description="Learn about SimplySetup, India's leading provider of virtual office solutions for GST and business registration."
      />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About SimplySetup</h1>
          
          <div className="prose prose-lg mx-auto">
            <p className="lead text-xl text-gray-600 mb-8">
              SimplySetup is India's premier virtual office provider, helping businesses establish their presence with prestigious addresses across major cities without the overhead of traditional office space.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p>
              Our mission is to make business establishment simple and accessible for entrepreneurs across India. We provide cost-effective solutions that enable businesses to meet regulatory requirements and project professionalism without the burden of traditional office expenses.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Services</h2>
            <p>
              We specialize in providing virtual office addresses for GST registration, business registration, and other regulatory requirements across major Indian cities including Mumbai, Delhi, Bangalore, Pune, and more.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Virtual Office Addresses</h3>
                <p>Prestigious business addresses in prime locations of major Indian cities, perfect for GST registration and business correspondence.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Mail Handling</h3>
                <p>Professional mail receipt and forwarding services ensuring you never miss important business communications.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Business Registration Support</h3>
                <p>Expert assistance for GST registration, company incorporation, and other business registration processes.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Compliance Services</h3>
                <p>Ongoing support to ensure your business remains compliant with local regulations and requirements.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Team</h2>
            <p>
              Our team consists of experienced business registration specialists, legal experts, and customer support professionals dedicated to providing seamless service to our clients. With years of experience in navigating India's complex regulatory landscape, we're equipped to help businesses of all sizes establish their presence effectively.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Why Choose Us</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Premium addresses in major business hubs across India</li>
              <li>Dedicated support from business registration experts</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Quick setup with minimal documentation</li>
              <li>Flexible plans tailored to different business needs</li>
              <li>Proven track record with hundreds of satisfied clients</li>
            </ul>
            
            <div className="bg-gray-50 p-8 rounded-lg mt-12">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p>At SimplySetup, we're committed to providing reliable, professional, and compliant virtual office solutions that help businesses grow. We understand the challenges of establishing and scaling a business, and our services are designed to make that journey smoother.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}