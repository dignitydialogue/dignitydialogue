import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, Mail, Phone, FileText, AlertCircle } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-sage-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy and trust are our highest priorities
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
                    DignityDialogue ("we," "us," or "our") is committed to protecting your privacy and 
                    ensuring the security of your personal information. This Privacy Policy explains how we collect, 
                    use, share, and protect information when you use our telephone companionship service. By using our 
                    service, you agree to the collection and use of information in accordance with this policy.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    This policy applies to all information collected through our website, request forms, email communications, 
                    and telephone services. We are dedicated to maintaining the trust and confidence of our clients, 
                    their families, and the seniors we serve.
                  </p>
                </CardContent>
              </Card>

              {/* Information We Collect */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Eye className="h-6 w-6 text-primary" />
                    <span>Information We Collect</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information necessary to provide our telephone companionship service effectively and safely:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Requester Information:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number (optional)</li>
                        <li>Relationship to the senior</li>
                      </ul>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Senior Information:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Full name</li>
                        <li>Phone number</li>
                        <li>Age</li>
                        <li>Personality traits and interests</li>
                        <li>Preferred conversation topics</li>
                        <li>General preferences and needs</li>
                      </ul>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Service-Related Information:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Call schedules and frequency</li>
                        <li>Service feedback and satisfaction</li>
                        <li>Communication logs (for quality assurance)</li>
                        <li>Payment information (if applicable)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How We Use Your Information */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Phone className="h-6 w-6 text-primary" />
                    <span>How We Use Your Information</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect solely for the purpose of providing and improving our telephone companionship service:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">
                        <strong>To Provide Companionship Services:</strong> Matching seniors with compatible companions and scheduling calls.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">
                        <strong>Quality Assurance:</strong> Monitoring and improving service quality while maintaining privacy.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">
                        <strong>Communication:</strong> Contacting requesters about service updates, scheduling, and important notifications.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">
                        <strong>Safety and Compliance:</strong> Ensuring the safety and well-being of seniors and complying with legal requirements.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">
                        <strong>Service Improvement:</strong> Analyzing service usage to enhance and expand our offerings.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SMS/Text Message Disclosure */}
              <Card className="p-8 border-2 border-primary/20">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>SMS/Text Message Disclosure</span>
                  </h2>
                  <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong>Important Notice:</strong> Our service involves placing voice calls and may involve sending SMS messages 
                      to the provided phone number to initiate or schedule companionship calls. Message and data rates may apply. 
                      You can reply STOP to any SMS from us to opt-out of future texts, and HELP for assistance.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By providing your phone number and using our service, you consent to receive communications from us 
                      via voice calls and text messages related to your companionship service.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Twilio Compliance */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>Twilio Compliance</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We use Twilio as our telecommunications service provider to facilitate voice calls and SMS messaging. 
                    By using our service, you also agree to Twilio's Acceptable Use Policy.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      Twilio's services are subject to their own privacy policies and terms of service. We ensure that 
                      our use of Twilio's services complies with all applicable laws and regulations, including those 
                      governing telecommunications and consumer protection.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Data Sharing */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Lock className="h-6 w-6 text-primary" />
                    <span>Data Sharing</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We do NOT sell, rent, or share personal data with unauthorized third parties for marketing purposes. 
                    Your information is only shared in the following limited circumstances:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Service Providers:</p>
                        <p className="text-muted-foreground">
                          We share necessary information with our communications provider (Twilio) to deliver the service.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Legal Requirements:</p>
                        <p className="text-muted-foreground">
                          We may disclose information when required by law, court order, or to protect our rights and safety.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Business Transfers:</p>
                        <p className="text-muted-foreground">
                          In the event of a merger, acquisition, or sale of assets, user information may be transferred.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>Data Security</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We implement industry-standard security measures to protect your personal information:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Technical Security:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>SSL/TLS encryption for data transmission</li>
                        <li>Secure servers with firewalls</li>
                        <li>Regular security updates and patches</li>
                        <li>Secure authentication systems</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Organizational Security:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Employee background checks</li>
                        <li>Confidentiality agreements</li>
                        <li>Limited access to personal data</li>
                        <li>Regular security training</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Rights */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Eye className="h-6 w-6 text-primary" />
                    <span>Your Rights</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Access:</p>
                        <p className="text-muted-foreground">
                          Request a copy of the personal information we hold about you.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Correction:</p>
                        <p className="text-muted-foreground">
                          Request correction of inaccurate or incomplete information.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Deletion:</p>
                        <p className="text-muted-foreground">
                          Request deletion of your personal information, subject to legal obligations.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Opt-out:</p>
                        <p className="text-muted-foreground">
                          Opt-out of SMS communications by replying STOP to any message.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="p-8 border-2 border-primary/20">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>Contact Information</span>
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                  </p>
                  
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <span>
                          <strong>Email:</strong> privacy@dignitydialogue.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <span>
                          <strong>General Contact:</strong> contact@dignitydialogue.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>
                          <strong>Phone:</strong> (555) 123-4567
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>
                          <strong>Address:</strong> PO Box 12345, Anytown, USA 12345
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Policy Updates */}
              <Card className="p-8">
                <CardContent className="pt-0">
                  <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time to reflect changes in our practices, 
                    legal requirements, or service offerings. We will notify you of any material changes by 
                    posting the updated policy on our website and sending you an email notification.
                  </p>
                  <p className="text-muted-foreground mt-4">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}