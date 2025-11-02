import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Database, Clock, Mail, Phone } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8 text-center">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Dignity Dialogue ("we", "our", or "us") is committed to protecting your privacy and the privacy of the
            elderly individuals for whom companion messages are requested. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our service.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Requester name and contact information</li>
              <li>Elder's name, phone number, age, and personality information</li>
              <li>Message preferences and type</li>
              <li>Consent acknowledgments</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>IP address (for consent audit logs)</li>
              <li>User agent and browser information</li>
              <li>Timestamp of submissions</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Processors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We use the following third-party services to process and store your data:
          </p>
          <div>
            <h3 className="font-semibold mb-2">Supabase</h3>
            <p className="text-muted-foreground mb-2">
              Supabase is used as our database and authentication provider. All data is stored securely in Supabase's
              infrastructure. Supabase processes data in compliance with GDPR and other applicable privacy regulations.
            </p>
            <p className="text-muted-foreground">
              For more information about Supabase's data practices, visit:{' '}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                https://supabase.com/privacy
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Twilio</h3>
            <p className="text-muted-foreground mb-2">
              Twilio is used to send SMS messages to the elderly individuals. Phone numbers and message content are
              transmitted to Twilio for message delivery. Twilio is compliant with applicable telecommunications
              regulations.
            </p>
            <p className="text-muted-foreground">
              For more information about Twilio's privacy practices, visit:{' '}
              <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                https://www.twilio.com/legal/privacy
              </a>
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Important:</strong> All messages sent through Twilio will include an opt-out mechanism. Recipients
              can reply "STOP" to opt out of receiving future messages.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Data Retention
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We retain your information for the following periods:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Intake Records:</strong> Retained for 2 years from the date of submission, unless required
              longer for legal or regulatory purposes.
            </li>
            <li>
              <strong>Consent Logs:</strong> Retained for 2 years to maintain an audit trail of consent
              acknowledgments.
            </li>
            <li>
              <strong>Message Logs:</strong> Retained for 2 years for record-keeping and quality assurance purposes.
            </li>
          </ul>
          <p className="text-muted-foreground">
            After the retention period, data is automatically deleted or anonymized. You may request earlier deletion
            by contacting us (subject to legal requirements).
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Consent and Impersonation Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="font-semibold mb-2">We Will NOT Impersonate Relatives</p>
            <p className="text-muted-foreground">
              Dignity Dialogue will never impersonate family members, relatives, or friends. All messages sent through
              our service will clearly identify Dignity Dialogue as the sender. We maintain proof of consent for all
              messages sent, including IP addresses and timestamps of consent acknowledgments.
            </p>
          </div>
          <p>
            When you submit an intake form, you must provide explicit confirmation that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>The elderly individual has consented to receive companion messages from Dignity Dialogue</li>
            <li>You understand that Dignity Dialogue will not impersonate relatives or family members</li>
          </ul>
          <p className="text-muted-foreground">
            All consent acknowledgments are logged with IP address, timestamp, and user agent information for audit
            purposes.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Opt-In and Opt-Out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Opt-In</h3>
            <p className="text-muted-foreground">
              All intake requests require explicit consent from the requester confirming that the elder has consented.
              We maintain detailed logs of all consent acknowledgments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Opt-Out</h3>
            <p className="text-muted-foreground">
              Recipients of messages can opt out at any time by:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-2">
              <li>Replying "STOP" to any message sent via Twilio</li>
              <li>Contacting us directly at the contact information provided below</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              Once an opt-out request is received, we will immediately stop sending messages and mark the intake
              record accordingly.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Process and fulfill companion message requests</li>
            <li>Send messages through Twilio to the designated recipients</li>
            <li>Maintain consent audit logs for compliance and legal purposes</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Improve our services and ensure message quality</li>
            <li>Comply with legal obligations and prevent fraud</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Data Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We implement appropriate technical and organizational measures to protect your information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Encryption of data in transit and at rest</li>
            <li>Access controls and authentication for administrative functions</li>
            <li>Regular security audits and updates</li>
            <li>Secure storage in Supabase's infrastructure</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal requirements)</li>
            <li>Opt out of receiving messages</li>
            <li>Withdraw consent at any time</li>
            <li>File a complaint with relevant data protection authorities</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong>Email:</strong> privacy@dignitydialogue.com
            </p>
            <p>
              <strong>Address:</strong> Dignity Dialogue, [Your Address]
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Changes to This Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

