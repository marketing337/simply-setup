import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLocation } from "@/hooks/useLocation";

export default function TermsOfServicePage() {
  const { currentLocation } = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Terms of Service | Simplysetup Pvt Ltd" 
        description="Terms and conditions governing the use of Simplysetup's virtual office services, GST registration solutions, and business address services in India."
        ogType="article"
      />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
          <p className="text-gray-500 text-center mb-8">Last Updated: May 1, 2025</p>
          
          <div className="prose prose-lg mx-auto">
            <p className="lead text-xl text-gray-600 mb-8">
              Welcome to Simplysetup Pvt Ltd. Please read these Terms of Service ("Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using Simplysetup's website or services, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you should not access or use our services. We may modify these Terms at any time. Your continued use of our services following any changes indicates your acceptance of the modified Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">2. Services Description</h2>
            <p>
              Simplysetup Pvt Ltd provides virtual office services, including but not limited to virtual business addresses, mail handling, GST registration assistance, and business support services. The specific services available to you depend on the service plan you select and pay for.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">3. Account Registration</h2>
            <p>
              To access certain features of our services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">4. Service Fees and Payment</h2>
            <p>
              You agree to pay all fees applicable to your chosen service plan. All fees are in Indian Rupees and are non-refundable unless otherwise specified. We may change our fees at any time by posting the changes on our website or by notifying you directly. Your continued use of our services after the fee change becomes effective constitutes your agreement to pay the changed amount.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">5. Use of Services</h2>
            <p>
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To engage in any activity that is fraudulent, deceptive, or harmful</li>
              <li>To impersonate any person or entity or misrepresent your affiliation</li>
              <li>To send unsolicited marketing communications (spam)</li>
              <li>To attempt to interfere with or disrupt the service or servers connected to the service</li>
              <li>To circumvent, disable, or otherwise interfere with security-related features of the service</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">6. Intellectual Property Rights</h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive property of Simplysetup Pvt Ltd and its licensors. The service is protected by copyright, trademark, and other laws of India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">7. User Content</h2>
            <p>
              You are solely responsible for any content that you submit, post, or display on or through our services. By submitting, posting, or displaying content on or through our services, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">8. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">9. Limitation of Liability</h2>
            <p>
              In no event shall Simplysetup Pvt Ltd, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your access to or use of or inability to access or use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">10. Disclaimer</h2>
            <p>
              Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">11. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">12. Dispute Resolution</h2>
            <p>
              Any disputes arising out of or relating to these Terms or our services shall be resolved through binding arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996. The arbitration shall take place in Pune, Maharashtra, India, and the language of the arbitration shall be English.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">13. Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and Simplysetup Pvt Ltd regarding our services and supersede all prior and contemporaneous written or oral agreements between you and Simplysetup Pvt Ltd.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">14. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="font-semibold">Simplysetup Pvt Ltd</p>
              <p>Email: legal@simplysetup.com</p>
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