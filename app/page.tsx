"use client";
import type React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  Mail,
  Send,
  CheckCircle,
  XCircle,
  Info,
  Eye,
  Save,
  Key,
  X,
} from "lucide-react";
import { sendBulkEmails } from "./actions";
import { EmailTemplates } from "@/components/email-templates";
import { EmailPreview } from "@/components/email-preview";
import { SEOContent } from "@/components/seo-content";

// Type definitions
interface FormData {
  senderEmail: string;
  appPassword: string;
  platform: EmailPlatform;
  subject: string;
  emailBody: string;
  emailList: string;
}

interface SavedPassword {
  email: string;
  password: string;
}

interface EmailResults {
  success: number;
  failed: number;
  errors: string[];
}

interface PlatformConfig {
  host: string;
  port: number;
  name: string;
}

interface EmailTemplate {
  subject: string;
  body: string;
}

type EmailPlatform = "gmail" | "outlook" | "yahoo" | "custom";

interface PasswordSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDontSave: () => void;
  email?: string;
}

interface SavedPasswordSuggestionModalProps {
  isOpen: boolean;
  savedPassword: SavedPassword | null;
  onUse: (password: string) => void;
  onClose: () => void;
}

// Password Save Modal Component
const PasswordSaveModal: React.FC<PasswordSaveModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDontSave,
  email,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Key className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Save App Password?
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDontSave}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Would you like to save your app password for{" "}
            <strong>{email}</strong> for future email campaigns? This will make
            it easier to send emails next time.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Security Note:</p>
                <p>Your password is stored locally on this device only.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onSave}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              <Save className="h-4 w-4 mr-2" />
              Yes, Save Password
            </Button>
            <Button
              onClick={onDontSave}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold bg-transparent"
            >
              No, Don't Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Saved Password Suggestion Modal Component
const SavedPasswordSuggestionModal: React.FC<
  SavedPasswordSuggestionModalProps
> = ({ isOpen, savedPassword, onUse, onClose }) => {
  if (!isOpen || !savedPassword) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Key className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Saved Password Found
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We found a saved app password for{" "}
            <strong className="text-purple-700">{savedPassword.email}</strong>.
            Would you like to use it for this email campaign?
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-purple-800">
                <p className="font-medium mb-1">Quick Setup:</p>
                <p>
                  Using your saved password will automatically fill in the app
                  password field and speed up your email campaign setup.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => onUse(savedPassword.password)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            >
              <Key className="h-4 w-4 mr-2" />
              Use Saved Password
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold bg-transparent"
            >
              Enter Manually
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extend Window interface for the timeout
declare global {
  interface Window {
    passwordSaveTimeout?: NodeJS.Timeout;
  }
}

const FirmMailer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    senderEmail: "",
    appPassword: "",
    platform: "gmail",
    subject: "",
    emailBody: "",
    emailList: "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [sending, setSending] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [results, setResults] = useState<EmailResults>({
    success: 0,
    failed: 0,
    errors: [],
  });
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // New states for password management
  const [showPasswordSaveModal, setShowPasswordSaveModal] =
    useState<boolean>(false);
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);
  const [showSavedPasswordModal, setShowSavedPasswordModal] =
    useState<boolean>(false);
  const [currentSavedPassword, setCurrentSavedPassword] =
    useState<SavedPassword | null>(null);
  const [pendingPasswordSave, setPendingPasswordSave] =
    useState<SavedPassword | null>(null);

  const platformConfigs: Record<EmailPlatform, PlatformConfig> = {
    gmail: { host: "smtp.gmail.com", port: 465, name: "Gmail" },
    outlook: { host: "smtp-mail.outlook.com", port: 587, name: "Outlook" },
    yahoo: { host: "smtp.mail.yahoo.com", port: 587, name: "Yahoo" },
    custom: { host: "", port: 587, name: "Custom SMTP" },
  };

  // Load saved passwords on component mount
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("firmmailer_passwords") || "[]"
      );
      setSavedPasswords(saved);
    } catch (error) {
      console.error("Failed to load saved passwords from localStorage:", error);
      setSavedPasswords([]); // Reset if parsing fails
    }
  }, []);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Handle email list formatting for comma-separated emails
    if (field === "emailList") {
      const formattedValue = formatEmailList(value);
      if (formattedValue !== value) {
        setFormData((prev) => ({ ...prev, [field]: formattedValue }));
      }
    }

    // Check for saved passwords when email changes
    if (field === "senderEmail" && value) {
      const savedPassword = savedPasswords.find((p) => p.email === value);
      if (savedPassword) {
        setCurrentSavedPassword(savedPassword);
        setShowSavedPasswordModal(true);
      }
    } else if (field === "senderEmail" && !value) {
      setCurrentSavedPassword(null);
      setShowSavedPasswordModal(false);
    }
  };

  // Format email list to handle comma-separated emails
  const formatEmailList = (emailText: string): string => {
    // Check if the text contains commas (likely from Excel paste)
    if (emailText.includes(",") && !emailText.includes("\n")) {
      // Split by commas, trim whitespace, filter out empty strings, and join with newlines
      return emailText
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email.length > 0)
        .join("\n");
    }
    return emailText;
  };

  // Handle app password input with save prompt
  const handlePasswordChange = (password: string): void => {
    setFormData((prev) => ({ ...prev, appPassword: password }));

    // If password is entered and email exists, check if we should prompt to save
    if (
      password &&
      formData.senderEmail &&
      !savedPasswords.some((p) => p.email === formData.senderEmail)
    ) {
      // Debounce the save prompt to avoid showing it while typing
      if (window.passwordSaveTimeout) {
        clearTimeout(window.passwordSaveTimeout);
      }
      window.passwordSaveTimeout = setTimeout(() => {
        setPendingPasswordSave({ email: formData.senderEmail, password });
        setShowPasswordSaveModal(true);
      }, 1000);
    }
  };

  // Save password to storage
  const handleSavePassword = (): void => {
    if (pendingPasswordSave) {
      const newSavedPasswords = [...savedPasswords, pendingPasswordSave];
      setSavedPasswords(newSavedPasswords);
      localStorage.setItem(
        "firmmailer_passwords",
        JSON.stringify(newSavedPasswords)
      );
      setShowPasswordSaveModal(false);
      setPendingPasswordSave(null);
      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Don't save password
  const handleDontSavePassword = (): void => {
    setShowPasswordSaveModal(false);
    setPendingPasswordSave(null);
  };

  // Use saved password
  const handleUseSavedPassword = (password: string): void => {
    setFormData((prev) => ({ ...prev, appPassword: password }));
    setShowSavedPasswordModal(false);
    setCurrentSavedPassword(null);
  };

  // Close saved password modal
  const handleCloseSavedPasswordModal = (): void => {
    setShowSavedPasswordModal(false);
    setCurrentSavedPassword(null);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setAttachment(file);
    } else {
      alert("Please select a PDF file");
    }
  };

  const handleTemplateSelect = (template: EmailTemplate): void => {
    setFormData((prev) => ({
      ...prev,
      subject: template.subject,
      emailBody: template.body,
    }));
    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = (): boolean => {
    if (
      !formData.senderEmail ||
      !formData.appPassword ||
      !formData.subject ||
      !formData.emailBody ||
      !formData.emailList.trim()
    ) {
      alert("Please fill in all required fields");
      return false;
    }
    const emails = getEmailList();
    if (emails.length === 0) {
      alert("Please enter at least one email address");
      return false;
    }
    return true;
  };

  // Get email list with improved parsing
  const getEmailList = (): string[] => {
    return formData.emailList
      .split(/[,\n]/) // Split by both commas and newlines
      .map((email) => email.trim())
      .filter((email) => email.length > 0);
  };

  const handleSendEmails = async (): Promise<void> => {
    if (!validateForm()) return;
    setSending(true);
    setProgress(0);
    setShowResults(false);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("senderEmail", formData.senderEmail);
      formDataToSend.append("appPassword", formData.appPassword);
      formDataToSend.append("platform", formData.platform);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("emailBody", formData.emailBody);
      formDataToSend.append("emailList", formData.emailList);
      if (attachment) {
        formDataToSend.append("attachment", attachment);
      }
      const result = await sendBulkEmails(formDataToSend);
      setResults(result);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to send emails:", error);
      alert("Failed to send emails. Please try again.");
    } finally {
      setSending(false);
      setProgress(100);
    }
  };

  const emailCount = getEmailList().length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <CheckCircle className="h-5 w-5" />
          <span className="text-base font-medium">
            {pendingPasswordSave
              ? "Password saved successfully!"
              : "Template applied successfully!"}
          </span>
        </div>
      )}

      {/* Password Save Modal */}
      <PasswordSaveModal
        isOpen={showPasswordSaveModal}
        onClose={handleDontSavePassword}
        onSave={handleSavePassword}
        onDontSave={handleDontSavePassword}
        email={pendingPasswordSave?.email}
      />

      {/* Saved Password Suggestion Modal */}
      <SavedPasswordSuggestionModal
        isOpen={showSavedPasswordModal}
        savedPassword={currentSavedPassword}
        onUse={handleUseSavedPassword}
        onClose={handleCloseSavedPasswordModal}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* FirmCorner Branded Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-6 leading-tight tracking-tight">
            <span className="text-purple-600">Firm Mailer</span> - Professional
            Bulk Email Solution
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2 font-medium">
            FirmCorner's enterprise-grade email marketing tool for bulk
            campaigns with attachment support
          </p>
          <div className="flex justify-start sm:justify-center gap-1 sm:gap-3 mb-6 sm:mb-8 px-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <span className="bg-purple-100 text-purple-800 px-2 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-lg font-semibold whitespace-nowrap flex-shrink-0">
              FirmCorner Powered
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-lg font-semibold whitespace-nowrap flex-shrink-0">
              Multiple Email Providers
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-lg font-semibold whitespace-nowrap flex-shrink-0">
              Professional Templates
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-lg font-semibold whitespace-nowrap flex-shrink-0">
              Enterprise Features
            </span>
          </div>
        </div>

        <div className="w-full space-y-6 sm:space-y-8">
          {/* Email Configuration and Real-time Preview */}
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Email Configuration */}
            <div className="w-full">
              <Card
                id="email-sender"
                className="border-purple-200 shadow-lg w-full"
              >
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
                    <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
                    FirmCorner Email Configuration
                  </CardTitle>
                  <CardDescription className="text-purple-100 text-base sm:text-lg font-medium">
                    Configure your professional email settings for mass
                    campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="platform"
                        className="text-gray-700 font-semibold text-base sm:text-lg"
                      >
                        Email Platform
                      </Label>
                      <Select
                        value={formData.platform}
                        onValueChange={(value: EmailPlatform) =>
                          handleInputChange("platform", value)
                        }
                      >
                        <SelectTrigger className="border-purple-200 focus:border-purple-600 text-base sm:text-lg w-full h-12 sm:h-14">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(platformConfigs).map(
                            ([key, config]) => (
                              <SelectItem
                                key={key}
                                value={key}
                                className="text-base sm:text-lg py-3"
                              >
                                {config.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="senderEmail"
                        className="text-gray-700 font-semibold text-base sm:text-lg"
                      >
                        Your Email Address
                      </Label>
                      <Input
                        id="senderEmail"
                        type="email"
                        placeholder="your.email@company.com"
                        className="border-purple-200 focus:border-purple-600 text-base sm:text-lg w-full h-12 sm:h-14"
                        value={formData.senderEmail}
                        onChange={(e) =>
                          handleInputChange("senderEmail", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="appPassword"
                      className="text-gray-700 font-semibold text-base sm:text-lg"
                    >
                      App Password for Secure Sending
                    </Label>
                    <Input
                      id="appPassword"
                      type="password"
                      placeholder="Enter your app password"
                      className="border-purple-200 focus:border-purple-600 text-base sm:text-lg w-full h-12 sm:h-14"
                      value={formData.appPassword}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    <div className="flex items-center gap-3">
                      <Link
                        href="/app-password-guide"
                        className="text-base sm:text-lg text-purple-600 hover:text-purple-800 underline flex items-center gap-2 font-medium"
                      >
                        <Info className="h-4 w-4" />
                        How to get App Password?
                      </Link>
                    </div>
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                      Use app-specific passwords for secure bulk email sending
                      with FirmCorner.
                    </p>
                  </div>
                  {/* Email Content Fields in Configuration */}
                  <div className="space-y-6 pt-6 border-t border-purple-200">
                    <h3 className="font-bold text-purple-700 text-lg sm:text-xl">
                      Email Content
                    </h3>
                    <div className="space-y-3">
                      <Label
                        htmlFor="subject"
                        className="text-gray-700 font-semibold text-base sm:text-lg"
                      >
                        Email Subject Line
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Enter compelling email subject"
                        className="border-purple-200 focus:border-purple-600 text-base sm:text-lg w-full h-12 sm:h-14"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="emailBody"
                        className="text-gray-700 font-semibold text-base sm:text-lg"
                      >
                        Email Message Content
                      </Label>
                      <Textarea
                        id="emailBody"
                        placeholder="Enter your professional email message..."
                        className="min-h-[180px] sm:min-h-[220px] border-purple-200 focus:border-purple-600 text-base sm:text-lg w-full resize-y leading-relaxed"
                        value={formData.emailBody}
                        onChange={(e) =>
                          handleInputChange("emailBody", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Email Preview */}
            <div className="w-full">
              <Card className="border-purple-200 shadow-lg w-full">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
                    <Eye className="h-6 w-6 sm:h-7 sm:w-7" />
                    Real-time Email Preview
                  </CardTitle>
                  <CardDescription className="text-purple-100 text-base sm:text-lg font-medium">
                    See how your FirmCorner email will look to recipients
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="border border-purple-200 rounded-lg p-5 sm:p-6 bg-white min-h-[350px] sm:min-h-[450px] w-full overflow-hidden">
                    {formData.subject ||
                    formData.emailBody ||
                    formData.senderEmail ? (
                      <div className="space-y-5">
                        {/* Email Header */}
                        <div className="border-b border-purple-200 pb-4">
                          <div className="text-base sm:text-lg text-gray-500 mb-2 font-medium">
                            From:
                          </div>
                          <div className="font-semibold text-purple-700 text-base sm:text-lg break-all">
                            {formData.senderEmail || "your.email@company.com"}
                          </div>
                          <div className="text-base sm:text-lg text-gray-500 mt-3 mb-2 font-medium">
                            Subject:
                          </div>
                          <div className="font-bold text-xl sm:text-2xl text-gray-900 break-words leading-tight">
                            {formData.subject ||
                              "Your Professional Email Subject"}
                          </div>
                          {attachment && (
                            <div className="flex items-center gap-3 mt-3 text-base sm:text-lg text-purple-600 font-medium">
                              <Upload className="h-5 w-5 flex-shrink-0" />
                              <span className="break-all">
                                📎 {attachment.name}
                              </span>
                            </div>
                          )}
                        </div>
                        {/* Email Body */}
                        <div className="space-y-4">
                          {formData.emailBody ? (
                            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base sm:text-lg break-words">
                              {formData.emailBody}
                            </div>
                          ) : (
                            <div className="text-gray-400 italic text-base sm:text-lg">
                              Your professional email content will appear
                              here...
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <Eye className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-base sm:text-lg font-medium">
                            Start typing to see your email preview
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Full Preview Modal Button */}
                  {(formData.subject || formData.emailBody) && (
                    <div className="mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPreview(true)}
                        className="w-full flex items-center justify-center gap-3 border-purple-600 text-purple-600 hover:bg-purple-50 text-base sm:text-lg h-12 sm:h-14 font-semibold"
                      >
                        <Eye className="h-5 w-5" />
                        Open Full Preview Modal
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Email Preview Modal */}
          <EmailPreview
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            subject={formData.subject}
            body={formData.emailBody}
            senderEmail={formData.senderEmail}
            attachment={attachment}
          />

          {/* Email Templates */}
          <div className="w-full">
            <Card id="templates" className="border-purple-200 shadow-lg w-full">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  FirmCorner Professional Email Templates
                </CardTitle>
                <CardDescription className="text-purple-100 text-base sm:text-lg font-medium">
                  Choose from enterprise-grade email templates or create custom
                  content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6 sm:p-8">
                <EmailTemplates onTemplateSelect={handleTemplateSelect} />
              </CardContent>
            </Card>
          </div>

          {/* Attachment */}
          <div className="w-full">
            <Card className="border-purple-200 shadow-lg w-full">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
                  <Upload className="h-6 w-6 sm:h-7 sm:w-7" />
                  Professional Email Attachments
                </CardTitle>
                <CardDescription className="text-purple-100 text-base sm:text-lg font-medium">
                  Upload PDF documents to include with your FirmCorner campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-3">
                  <Label
                    htmlFor="attachment"
                    className="text-gray-700 font-semibold text-base sm:text-lg"
                  >
                    PDF Attachment (Optional)
                  </Label>
                  <Input
                    id="attachment"
                    type="file"
                    accept=".pdf"
                    className="border-purple-200 focus:border-purple-600 text-base sm:text-lg w-full h-12 sm:h-14"
                    onChange={handleFileUpload}
                  />
                  {attachment && (
                    <p className="text-base sm:text-lg text-purple-600 flex items-center gap-2 break-all font-medium">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      {attachment.name} selected (
                      {(attachment.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email List */}
          <div className="w-full">
            <Card className="border-purple-200 shadow-lg w-full">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  Professional Email Recipients
                </CardTitle>
                <CardDescription className="text-purple-100 text-base sm:text-lg font-medium">
                  Add multiple email addresses for your FirmCorner campaign.
                  Total: <span className="font-bold">{emailCount}</span> emails
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-3">
                  <Label
                    htmlFor="emailList"
                    className="text-gray-700 font-semibold text-base sm:text-lg"
                  >
                    Email Addresses for Bulk Campaign
                  </Label>
                  <Textarea
                    id="emailList"
                    placeholder={`recipient1@company.com\nrecipient2@business.com\ncontact@startup.com...`}
                    className="min-h-[150px] sm:min-h-[180px] font-mono text-base sm:text-lg border-purple-200 focus:border-purple-600 w-full resize-y leading-relaxed"
                    value={formData.emailList}
                    onChange={(e) =>
                      handleInputChange("emailList", e.target.value)
                    }
                  />
                  <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                    Add professional email addresses for your FirmCorner
                    campaign, one per line
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Send Button and Progress */}
          <div className="w-full">
            <Card className="border-purple-200 shadow-lg w-full">
              <CardContent className="pt-6 sm:pt-8 p-6 sm:p-8">
                <div className="space-y-6">
                  <Button
                    onClick={handleSendEmails}
                    disabled={sending || emailCount === 0}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg sm:text-xl py-6 sm:py-8 font-bold"
                    size="lg"
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Sending FirmCorner Campaign...
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6 mr-3" />
                        Launch Your Email Campaign ({emailCount} emails)
                      </>
                    )}
                  </Button>
                  {sending && (
                    <div className="space-y-3">
                      <Progress value={progress} className="w-full h-3" />
                      <p className="text-base sm:text-lg text-center text-gray-600 font-medium">
                        Sending professional emails via FirmCorner... Please
                        wait.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {showResults && (
            <div className="w-full">
              <Card className="border-purple-200 shadow-lg w-full">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle className="text-xl sm:text-2xl font-bold">
                    FirmCorner Campaign Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Alert className="border-purple-200 bg-purple-50">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                        <AlertDescription className="text-purple-800 text-base sm:text-lg font-semibold">
                          <strong>{results.success}</strong> emails sent
                          successfully via FirmCorner
                        </AlertDescription>
                      </Alert>
                      {results.failed > 0 && (
                        <Alert variant="destructive">
                          <XCircle className="h-5 w-5" />
                          <AlertDescription className="text-base sm:text-lg font-semibold">
                            <strong>{results.failed}</strong> emails failed to
                            send
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    {results.errors.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-bold text-red-600 text-base sm:text-lg">
                          Campaign Errors:
                        </h4>
                        <div className="bg-red-50 p-4 rounded-md border border-red-200">
                          {results.errors.map((error, index) => (
                            <p
                              key={index}
                              className="text-base text-red-700 break-words leading-relaxed"
                            >
                              {error}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Instructions */}
          <div className="w-full">
            <Card id="features" className="border-purple-200 shadow-lg w-full">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
                  <Info className="h-6 w-6 sm:h-7 sm:w-7" />
                  How to Use FirmCorner Firm Mailer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-purple-700 font-bold">
                      1. Email Platform:
                    </strong>{" "}
                    Select your preferred email provider (Gmail, Outlook, Yahoo,
                    or Custom SMTP)
                  </p>
                  <p>
                    <strong className="text-purple-700 font-bold">
                      2. App Password:
                    </strong>{" "}
                    Use app-specific passwords for secure bulk email sending
                  </p>
                  <p>
                    <strong className="text-purple-700 font-bold">
                      3. Real-time Preview:
                    </strong>{" "}
                    See your professional email preview update live as you type
                  </p>
                  <p>
                    <strong className="text-purple-700 font-bold">
                      4. Professional Templates:
                    </strong>{" "}
                    Choose from FirmCorner's enterprise templates to auto-fill
                    content
                  </p>
                  <p>
                    <strong className="text-purple-700 font-bold">
                      5. Full Preview:
                    </strong>{" "}
                    Use the modal for detailed email preview before sending
                  </p>
                  <p>
                    <strong className="text-purple-700 font-bold">
                      6. Attachments:
                    </strong>{" "}
                    Upload PDF documents to include with your professional
                    campaigns
                  </p>
                  <p>
                    <strong className="text-purple-700 font-bold">
                      7. Recipients:
                    </strong>{" "}
                    Add multiple email addresses for your FirmCorner mass
                    campaigns
                  </p>
                  <p>
                    <strong className="text-purple-700 font-bold">
                      8. Launch:
                    </strong>{" "}
                    Execute your professional email campaign and track detailed
                    results
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="w-full">
            <SEOContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmMailer;
