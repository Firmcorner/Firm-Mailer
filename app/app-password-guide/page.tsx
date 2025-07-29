import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Mail, Shield, Key, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AppPasswordGuide() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">How to Get App Password for Bulk Email Sending</h1>
          <p className="text-lg text-gray-600 mb-4">
            Step-by-step guide to generate app passwords for secure email sending
          </p>
          <Badge variant="outline" className="mb-6">
            <Shield className="h-3 w-3 mr-1" />
            Secure Authentication Required
          </Badge>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Important Security Notice</h3>
                <p className="text-amber-700 text-sm">
                  App passwords are more secure than using your regular email password. They provide limited access and
                  can be revoked anytime without changing your main password. Never share your app passwords.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8">
          {/* Gmail App Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Mail className="h-6 w-6 text-red-600" />
                </div>
                Gmail App Password Setup
              </CardTitle>
              <CardDescription>
                Generate an app password for your Gmail account to send bulk emails securely
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Enable 2-Factor Authentication</p>
                    <p className="text-sm text-gray-600">
                      You must have 2FA enabled on your Google account before creating app passwords.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Go to Google Account Settings</p>
                    <p className="text-sm text-gray-600 mb-2">Navigate to your Google Account security settings.</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open Google Security Settings
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Find "App passwords" Section</p>
                    <p className="text-sm text-gray-600">
                      Look for "App passwords" under the "Signing in to Google" section.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Generate New App Password</p>
                    <p className="text-sm text-gray-600">
                      Click "App passwords", select "Mail" as the app, and "Other" as the device. Name it "Bulk Email
                      Sender" or similar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Copy the Generated Password</p>
                    <p className="text-sm text-gray-600">
                      Google will show a 16-character password. Copy this and use it in the bulk email sender.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Quick Access Links:</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="https://support.google.com/accounts/answer/185833"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Official Google Guide
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Direct App Passwords Link
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Outlook App Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                Outlook/Hotmail App Password Setup
              </CardTitle>
              <CardDescription>Create an app password for your Microsoft Outlook or Hotmail account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Enable 2-Step Verification</p>
                    <p className="text-sm text-gray-600">
                      Two-step verification must be enabled on your Microsoft account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Go to Microsoft Account Security</p>
                    <p className="text-sm text-gray-600 mb-2">Access your Microsoft account security settings.</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://account.microsoft.com/security" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open Microsoft Security Settings
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Navigate to App Passwords</p>
                    <p className="text-sm text-gray-600">
                      Under "Advanced security options", find and click "App passwords".
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Create New App Password</p>
                    <p className="text-sm text-gray-600">
                      Click "Create a new app password" and give it a descriptive name like "Bulk Email Tool".
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Save the Generated Password</p>
                    <p className="text-sm text-gray-600">
                      Microsoft will display the app password. Copy and save it securely.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Quick Access Links:</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="https://support.microsoft.com/en-us/account-billing/using-app-passwords-with-apps-that-don-t-support-two-step-verification-5896ed9b-4263-e681-128a-a6f2979a7944"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Official Microsoft Guide
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="https://account.microsoft.com/security/app-passwords"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Direct App Passwords Link
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yahoo App Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                Yahoo Mail App Password Setup
              </CardTitle>
              <CardDescription>Generate an app password for your Yahoo Mail account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Enable Two-Step Verification</p>
                    <p className="text-sm text-gray-600">
                      Yahoo requires 2-step verification to be enabled for app passwords.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Go to Yahoo Account Security</p>
                    <p className="text-sm text-gray-600 mb-2">Access your Yahoo account security settings.</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://login.yahoo.com/account/security" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open Yahoo Security Settings
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Find App Passwords Section</p>
                    <p className="text-sm text-gray-600">
                      Look for "App passwords" or "Generate app password" in the security settings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Generate App Password</p>
                    <p className="text-sm text-gray-600">
                      Select "Other app" and enter "Bulk Email Sender" as the app name.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Use the Generated Password</p>
                    <p className="text-sm text-gray-600">
                      Yahoo will provide a 16-character password. Use this in the bulk email sender.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Quick Access Links:</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="https://help.yahoo.com/kb/generate-third-party-passwords-sln15241.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Official Yahoo Guide
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="https://login.yahoo.com/account/security?.scrumb=0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Yahoo Account Security
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom SMTP */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Key className="h-6 w-6 text-gray-600" />
                </div>
                Custom SMTP Configuration
              </CardTitle>
              <CardDescription>Using custom SMTP servers with your own email provider</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-3">
                  For custom SMTP servers, you typically use your regular email password or a specific SMTP password
                  provided by your email hosting service.
                </p>

                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Common SMTP Settings:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>
                      • <strong>Port 587:</strong> TLS encryption (recommended)
                    </li>
                    <li>
                      • <strong>Port 465:</strong> SSL encryption
                    </li>
                    <li>
                      • <strong>Port 25:</strong> No encryption (not recommended)
                    </li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    Contact your email hosting provider for specific SMTP settings and authentication requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                Troubleshooting Common Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-200 pl-4">
                  <h4 className="font-medium text-red-800">Authentication Failed</h4>
                  <p className="text-sm text-red-700">
                    Make sure 2FA is enabled and you're using the app password, not your regular password.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-200 pl-4">
                  <h4 className="font-medium text-yellow-800">App Password Option Missing</h4>
                  <p className="text-sm text-yellow-700">
                    Enable two-factor authentication first. App passwords are only available with 2FA enabled.
                  </p>
                </div>

                <div className="border-l-4 border-blue-200 pl-4">
                  <h4 className="font-medium text-blue-800">Connection Timeout</h4>
                  <p className="text-sm text-blue-700">
                    Check your internet connection and firewall settings. Some networks block SMTP ports.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Main App */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-blue-900 mb-2">Ready to Send Bulk Emails?</h3>
                <p className="text-blue-700 text-sm mb-4">
                  Now that you have your app password, go back to the bulk email sender and start your campaign.
                </p>
                <Button asChild>
                  <Link href="/">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Back to Bulk Email Sender
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
