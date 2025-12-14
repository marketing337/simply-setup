import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLocation } from "@/hooks/useLocation";

export default function PrivacyPolicyPage() {
  const { currentLocation } = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy | Simplysetup Pvt Ltd" 
        description="Our privacy policy explains how we collect, use, and protect your personal information when you use Simplysetup's virtual office services for GST registration and business address solutions."
        ogType="article"
      />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
          <p className="text-gray-500 text-center mb-8">Last Updated: May 1, 2025</p>
          
          <div className="prose prose-lg mx-auto">
            <p className="lead text-xl text-gray-600 mb-8">
              At Simplysetup Pvt Ltd, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our virtual office services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Register for our services</li>
              <li>Fill out forms on our website</li>
              <li>Subscribe to our newsletter</li>
              <li>Request customer support</li>
              <li>Communicate with us via email, phone, or other channels</li>
            </ul>
            
            <p className="mt-4">
              The types of information we may collect include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identifiers (name, email address, phone number)</li>
              <li>Business information (company name, business address)</li>
              <li>Billing information</li>
              <li>Communication preferences</li>
              <li>Device and usage information when you access our website</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative notifications, such as confirmations, updates, or security alerts</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Understand usage patterns and preferences to enhance our services</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Protect against, identify, and prevent fraud and other unlawful activity</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Information Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors, such as lawyers, auditors, and insurers</li>
              <li>Regulatory authorities, government agencies, or other third parties when required by law</li>
              <li>Other parties in connection with a business transaction, such as a merger or acquisition</li>
            </ul>
            
            <p className="mt-4">
              We will not sell, rent, or lease your personal information to third parties for their marketing purposes without your explicit consent.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, alteration, disclosure, or destruction. While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, which may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
              <li>Objection to processing of your personal information</li>
            </ul>
            
            <p className="mt-4">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and to hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will take steps to delete that information as soon as possible.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated "Last Updated" date, and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="font-semibold">Simplysetup Pvt Ltd</p>
              <p>Email: privacy@simplysetup.com</p>
              <p>Phone: +91 20 4123 5678</p>
              <p>Address: Office No 1 S No 50/15/1 Samarth Sankul, Narhe, Pune, Maharashtra 411041, India</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer location={currentLocation} />
    </div>
  );
}