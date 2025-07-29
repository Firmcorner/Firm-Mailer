import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Mail,
  Shield,
  Zap,
  Users,
  Globe,
  FileText,
  Briefcase,
  GraduationCap,
  Building,
  Calendar,
  Headphones,
  TrendingUp,
  Star,
  CheckCircle,
} from "lucide-react"

export function SEOContent() {
  return (
    <div className="space-y-8">
      {/* Benefits Section */}
      <Card id="benefits">
        <CardHeader>
          <CardTitle>Why Choose Our Bulk Email Sender?</CardTitle>
          <CardDescription>The most powerful and user-friendly bulk email marketing tool available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Professional Email Templates</h3>
                <p className="text-sm text-gray-600">
                  Choose from 6+ professionally designed email templates for different use cases
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Unlimited Recipients</h3>
                <p className="text-sm text-gray-600">Send bulk emails to thousands of recipients without any limits</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Instant Email Delivery</h3>
                <p className="text-sm text-gray-600">
                  Fast and reliable email delivery with real-time progress tracking
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure & Private</h3>
                <p className="text-sm text-gray-600">
                  Your credentials and data are never stored or shared with third parties
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Globe className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Multiple Email Providers</h3>
                <p className="text-sm text-gray-600">Works with Gmail, Outlook, Yahoo, and custom SMTP servers</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Mail className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">PDF Attachment Support</h3>
                <p className="text-sm text-gray-600">
                  Attach PDF files to your bulk emails for professional communication
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases Section */}
      <Card id="use-cases">
        <CardHeader>
          <CardTitle>Perfect for Every Business Need</CardTitle>
          <CardDescription>Discover how professionals use our bulk email sender for various campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Marketing Campaigns</h3>
              </div>
              <p className="text-sm text-gray-600">
                Send product announcements, newsletters, and promotional emails to your customer base
              </p>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Job Applications</h3>
              </div>
              <p className="text-sm text-gray-600">
                Apply to multiple companies efficiently with personalized cover letters and resumes
              </p>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Business Outreach</h3>
              </div>
              <p className="text-sm text-gray-600">
                Connect with potential clients, partners, and stakeholders for business development
              </p>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold">Event Invitations</h3>
              </div>
              <p className="text-sm text-gray-600">
                Invite attendees to conferences, webinars, meetings, and special events
              </p>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Headphones className="h-5 w-5 text-red-600" />
                <h3 className="font-semibold">Customer Support</h3>
              </div>
              <p className="text-sm text-gray-600">
                Send updates, notifications, and support information to your customers
              </p>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-teal-600" />
                <h3 className="font-semibold">Lead Generation</h3>
              </div>
              <p className="text-sm text-gray-600">
                Reach out to potential leads and prospects for sales and business growth
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section with Accordions */}
      <Card id="faq">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Everything you need to know about our bulk email sender</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this bulk email sender completely free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, our bulk email sender is completely free to use with no hidden costs, subscription fees, or sending
                limits. You can send unlimited emails to as many recipients as you want without any charges.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Which email providers are supported for bulk sending?</AccordionTrigger>
              <AccordionContent>
                We support all major email providers including Gmail, Outlook/Hotmail, Yahoo Mail, and custom SMTP
                servers. You can use your existing email account from any provider to send bulk emails securely.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do I get an app password for Gmail or Outlook?</AccordionTrigger>
              <AccordionContent>
                For Gmail: Enable 2-factor authentication, go to Google Account Security, find "App passwords", and
                generate a new password for "Mail". For Outlook: Enable 2-step verification, go to Microsoft Account
                Security, and create an app password. We provide detailed step-by-step guides for each provider.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I attach files to my bulk emails?</AccordionTrigger>
              <AccordionContent>
                Yes, you can attach PDF files to your bulk emails. Simply upload your PDF file (up to 25MB), and it will
                be automatically attached to all emails in your campaign. This is perfect for sending resumes,
                brochures, catalogs, or other documents.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What are the sending limits for bulk emails?</AccordionTrigger>
              <AccordionContent>
                Sending limits depend on your email provider: Gmail allows 500 emails per day, Outlook allows 300 emails
                per day, and Yahoo allows 500 emails per day. For higher volumes, consider using multiple accounts or
                custom SMTP servers with higher limits.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Is my email data secure and private?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We prioritize your privacy and security. Your email credentials, recipient lists, and email
                content are processed locally and never stored on our servers. All data is encrypted during
                transmission, and we never share your information with third parties.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Can I preview how my emails will look before sending?</AccordionTrigger>
              <AccordionContent>
                Yes! Our email preview feature lets you see exactly how your emails will appear to recipients. You can
                preview both desktop and mobile views, see how attachments are displayed, and make adjustments before
                sending your bulk campaign.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>Are there pre-built email templates available?</AccordionTrigger>
              <AccordionContent>
                Yes, we provide 6+ professional email templates for different use cases including product marketing, job
                applications, business outreach, event invitations, customer support, and hiring. Each template is fully
                customizable and optimized for high engagement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>How can I ensure my bulk emails don't go to spam?</AccordionTrigger>
              <AccordionContent>
                To improve deliverability: use a professional subject line, personalize your content, avoid spam trigger
                words, include an unsubscribe option, send from a reputable email address, and don't send too many
                emails at once. Our templates are designed with deliverability best practices in mind.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>Can I track email opens and clicks?</AccordionTrigger>
              <AccordionContent>
                Currently, our tool focuses on reliable email delivery. Email tracking features like open rates and
                click tracking are planned for future updates. You can monitor delivery success and failed sends in
                real-time during your campaign.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Social Proof Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Thousands of Professionals</h2>
            <p className="text-gray-600">Join the growing community of users who trust our bulk email sender</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">50K+</div>
              <div className="text-sm text-gray-600">Daily Emails Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">10K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Delivery Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-3xl font-bold text-orange-600">4.9</span>
                <Star className="h-6 w-6 text-orange-400 fill-current" />
              </div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge variant="secondary" className="bg-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Free Forever
            </Badge>
            <Badge variant="secondary" className="bg-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              No Registration Required
            </Badge>
            <Badge variant="secondary" className="bg-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Instant Setup
            </Badge>
            <Badge variant="secondary" className="bg-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Professional Templates
            </Badge>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Sending Bulk Emails Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
