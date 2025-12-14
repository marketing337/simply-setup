import { Helmet } from 'react-helmet-async';
import ContactForm from '@/components/ContactForm';

const TestPage = () => {
  return (
    <>
      <Helmet>
        <title>Test Page - Contact Form</title>
        <meta name="description" content="Test page with contact form" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Test Page
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              This is a test page featuring our contact form for Virtual Office services.
            </p>
          </div>

          {/* Form Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Get In Touch
              </h2>
              
              <ContactForm />
            </div>
          </div>

          {/* Additional Information */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">About This Form</h3>
              <p className="text-blue-100">
                This contact form helps us understand your virtual office requirements. 
                Our team will review your submission and get back to you with personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;