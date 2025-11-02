import { Card, CardContent } from '@/components/ui/card';
import { FileText, Shield, Heart, AlertTriangle } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-sage-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <FileText className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Guidelines for using our compassionate companionship service
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none space-y-8">
              
              {/* Introduction */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <span>Introduction</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to DignityDialogue. These Terms of Service ("Terms") govern your use 
                    of our telephone companionship service. By using our service, you agree to comply with and be bound 
                    by these Terms.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Our service is designed to provide compassionate telephone companionship to seniors who may be 
                    experiencing isolation or loneliness. Please read these Terms carefully before using our service.
                  </p>
                </CardContent>
              </Card>

              {/* Service Description */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-primary" />
                    <span>Service Description</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    DignityDialogue provides:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Telephone companionship services for seniors</li>
                    <li>Regular scheduled calls based on individual needs</li>
                    <li>Emotional support and friendly conversation</li>
                    <li>Personalized interaction based on senior preferences</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    <strong>Important:</strong> Our service is not a substitute for medical care, emergency services, 
                    or professional mental health treatment.
                  </p>
                </CardContent>
              </Card>

              {/* User Responsibilities */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>User Responsibilities</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    As a user of our service, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide accurate and complete information when requesting services</li>
                    <li>Obtain consent from the senior before requesting companionship</li>
                    <li>Notify us of any changes in the senior's contact information or needs</li>
                    <li>Treat our companions with respect and courtesy</li>
                    <li>Not use our service for any inappropriate or illegal purposes</li>
                    <li>Pay any applicable service fees in a timely manner</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Prohibited Uses */}
              <Card className="p-8 border-2 border-red-200">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <span>Prohibited Uses</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    You may not use our service to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Harass, abuse, or threaten our companions or staff</li>
                    <li>Request inappropriate or sexual conversations</li>
                    <li>Solicit financial information or transactions</li>
                    <li>Provide medical, legal, or financial advice</li>
                    <li>Use the service for any illegal activities</li>
                    <li>Share confidential information about others without consent</li>
                  </ul>
                  <p className="text-muted-foreground mt-4 font-semibold">
                    Violation of these prohibitions may result in immediate termination of service.
                  </p>
                </CardContent>
              </Card>

              {/* Privacy and Data */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>Privacy and Data Protection</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Your privacy is important to us. Our use of personal information is governed by our 
                    Privacy Policy, which can be found at <a href="/privacy-policy" className="text-primary hover:underline">/privacy-policy</a>. 
                    By using our service, you consent to the collection and use of information as described in our Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              {/* Payment Terms */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
                  <p className="text-muted-foreground mb-4">
                    If applicable fees are charged for our services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Payment is due as specified in your service agreement</li>
                    <li>Refunds are provided according to our refund policy</li>
                    <li>Service may be suspended for non-payment</li>
                    <li>Prices are subject to change with notice</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground mb-4">
                    DignityDialogue provides companionship services on an "as is" basis. 
                    We are not liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Any indirect, incidental, or consequential damages</li>
                    <li>Outcomes resulting from conversations between companions and seniors</li>
                    <li>Technical issues or service interruptions</li>
                    <li>Actions of third parties (including our telecommunications providers)</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Our total liability is limited to the amount paid for the service in question.
                  </p>
                </CardContent>
              </Card>

              {/* Termination */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4">Service Termination</h2>
                  <p className="text-muted-foreground mb-4">
                    Either party may terminate the service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>With reasonable notice (typically 7 days)</li>
                    <li>Immediately for violation of these Terms</li>
                    <li>If the service is no longer appropriate or safe</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Upon termination, we will delete personal information in accordance with our Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              {/* Emergency Disclaimer */}
              <Card className="p-8 border-2 border-amber-200 bg-amber-50">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 text-amber-800">Emergency Services</h2>
                  <p className="text-amber-700 mb-4">
                    <strong>IMPORTANT:</strong> Our service is NOT an emergency service. If you or someone you know 
                    is experiencing a medical emergency, mental health crisis, or is in immediate danger, please:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-amber-700">
                    <li>Call 911 or your local emergency number</li>
                    <li>Contact a healthcare provider</li>
                    <li>Call adult protective services if needed</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Changes to Terms */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                    upon posting on our website. Continued use of our service constitutes acceptance of any changes.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      <strong>Email:</strong> contact@dignitydialogue.com<br />
                      <strong>Phone:</strong> (555) 123-4567<br />
                      <strong>Address:</strong> PO Box 12345, Anytown, USA 12345
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Last Updated */}
              <div className="text-center text-muted-foreground pt-8">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}