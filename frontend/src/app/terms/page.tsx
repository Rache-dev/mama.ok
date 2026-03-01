'use client';

import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                By accessing and using the Mama platform, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these terms, you should not use 
                this platform.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>2. Use of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Mama provides a pregnancy support platform that offers:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Month-by-month symptom checking and wellness recommendations</li>
                <li>Connection with verified healthcare consultants</li>
                <li>Hospital finder and selection services</li>
                <li>AI-powered health consultation</li>
                <li>Educational resources including books, movies, and podcasts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>3. Medical Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                The information provided on Mama is for educational and informational purposes only and 
                is not intended as a substitute for advice from your physician or other healthcare professional. 
                You should not use this information for diagnosing or treating a health problem or disease, 
                or prescribing any medication. Always consult with your healthcare provider before making 
                any healthcare decisions or for guidance about a specific medical condition.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>4. User Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide accurate, complete, and current 
                information. Failure to do so constitutes a breach of the Terms.
              </p>
              <p className="text-gray-600">
                You are responsible for safeguarding your password and for all activities that occur 
                under your account. You agree not to disclose your password to any third party.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>5. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We take your privacy seriously. All personal health information is encrypted and protected 
                with enterprise-grade security. We comply with applicable data protection laws and regulations. 
                Your data will never be sold to third parties. For more details, please refer to our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>6. Consultant Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Consultations provided through the platform are from verified healthcare professionals. 
                However:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Consultations do not establish a traditional doctor-patient relationship</li>
                <li>Consultants provide general guidance based on information you provide</li>
                <li>In case of emergency, always contact emergency services (911)</li>
                <li>Consultants are independent contractors and not employees of Mama</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>7. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We accept the following payment methods:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Credit Cards (Visa, Mastercard, American Express)</li>
                <li>Debit Cards</li>
                <li>PayPal</li>
                <li>Bank Transfers</li>
              </ul>
              <p className="text-gray-600 mt-4">
                All fees are clearly displayed before confirming any transaction. Refunds are subject 
                to our refund policy.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>8. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                The platform and its original content, features, and functionality are owned by Mama 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>9. Prohibited Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Use the platform for any illegal purpose</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the platform or servers</li>
                <li>Attempt to gain unauthorized access to any part of the platform</li>
                <li>Use automated systems to access the platform</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>10. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To the maximum extent permitted by law, Mama shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from your use of or 
                inability to use the service.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>11. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right to modify or replace these Terms at any time. We will provide notice 
                of any changes by posting the new Terms on this page and updating the "Last Updated" date. 
                Your continued use of the platform after any changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>12. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="text-gray-600 space-y-1">
                <li>Email: legal@mama.com</li>
                <li>Phone: +1-800-MAMA-CARE</li>
                <li>Address: 123 Healthcare Ave, Suite 100, San Francisco, CA 94102</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center text-gray-500 mt-8">
            <p>Last Updated: March 1, 2026</p>
          </div>
        </div>
      </main>
    </div>
  );
}
