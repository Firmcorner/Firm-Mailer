import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, X, Wand2, Copy, Check } from "lucide-react";

interface AIEmailGeneratorProps {
  onEmailGenerated: (email: string) => void;
}

interface EmailTemplate {
  value: string;
  label: string;
  prompt: string;
}

const emailTemplates: EmailTemplate[] = [
  {
    value: "job_application",
    label: "Job Application",
    prompt:
      "Write a professional job application email for the position of [JOB_TITLE] at [COMPANY_NAME]. Highlight my skills in [YOUR_SKILLS] and express enthusiasm for the role.",
  },
  {
    value: "product_launch",
    label: "Product Launch",
    prompt:
      "Create an exciting product launch email for [PRODUCT_NAME]. Highlight key features: [FEATURE_1], [FEATURE_2], [FEATURE_3]. Include a clear call-to-action and launch date: [DATE].",
  },
  {
    value: "newsletter",
    label: "Newsletter",
    prompt:
      "Write an engaging newsletter email for [COMPANY_NAME]. Include updates about: [UPDATE_1], [UPDATE_2], [UPDATE_3]. Keep the tone friendly and informative.",
  },
  {
    value: "follow_up",
    label: "Follow-up",
    prompt:
      "Create a polite follow-up email regarding [TOPIC/MEETING]. Reference our previous conversation on [DATE] and request next steps or feedback.",
  },
  {
    value: "welcome",
    label: "Welcome Email",
    prompt:
      "Write a warm welcome email for new customers/users of [PRODUCT/SERVICE]. Include getting started tips and highlight key features they should try first.",
  },
  {
    value: "meeting_request",
    label: "Meeting Request",
    prompt:
      "Compose a professional meeting request email to discuss [TOPIC]. Suggest available times: [TIME_SLOTS] and explain the meeting agenda briefly.",
  },
  {
    value: "thank_you",
    label: "Thank You",
    prompt:
      "Write a sincere thank you email for [REASON - e.g., attending event, partnership, purchase]. Express genuine appreciation and mention next steps if applicable.",
  },
  {
    value: "custom",
    label: "Custom Prompt",
    prompt: "",
  },
];

export const AIEmailGenerator: React.FC<AIEmailGeneratorProps> = ({
  onEmailGenerated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("custom");
  const [prompt, setPrompt] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [editableEmail, setEditableEmail] = useState("");
  const [copied, setCopied] = useState(false);

  // Update prompt when template changes
  useEffect(() => {
    const template = emailTemplates.find((t) => t.value === selectedTemplate);
    if (template && template.value !== "custom") {
      setPrompt(template.prompt);
    } else if (template?.value === "custom") {
      setPrompt("");
    }
  }, [selectedTemplate]);

  const generateEmail = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt for email generation");
      return;
    }

    setIsGenerating(true);
    setGeneratedEmail("");
    setEditableEmail("");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional email writer. Create clear, concise, and professional emails based on the user's requirements. Only return the email content without any additional commentary or explanations.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate email");
      }

      const data = await response.json();
      const emailContent = data.choices[0].message.content.trim();

      // Typewriter effect
      let currentText = "";
      const words = emailContent.split(" ");

      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? " " : "") + words[i];
        setGeneratedEmail(currentText);
        setEditableEmail(currentText);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    } catch (error) {
      console.error("Error generating email:", error);
      alert(
        "Failed to generate email. Please check your API key and try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseEmail = () => {
    onEmailGenerated(editableEmail);
    setIsOpen(false);
    setGeneratedEmail("");
    setEditableEmail("");
    setPrompt("");
    setSelectedTemplate("custom");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(editableEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setGeneratedEmail("");
    setEditableEmail("");
    setPrompt("");
    setSelectedTemplate("custom");
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-base sm:text-lg h-12 sm:h-14 font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        <Sparkles className="h-5 w-5" />
        Generate Email with AI
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Wand2 className="h-7 w-7" />
                <div>
                  <h2 className="text-2xl font-bold">AI Email Generator</h2>
                  <p className="text-purple-100 text-sm mt-1">
                    Create professional emails instantly with AI
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-10 w-10 p-0 hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Template Selection */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-semibold text-lg">
                  Email Type
                </Label>
                <Select
                  value={selectedTemplate}
                  onValueChange={setSelectedTemplate}
                >
                  <SelectTrigger className="border-purple-200 focus:border-purple-600 text-base h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem
                        key={template.value}
                        value={template.value}
                        className="text-base py-3"
                      >
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Prompt Input */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-semibold text-lg">
                  Email Prompt
                </Label>
                <Textarea
                  placeholder="Describe what kind of email you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] border-purple-200 focus:border-purple-600 text-base resize-y"
                />
                <p className="text-sm text-gray-500">
                  {selectedTemplate !== "custom"
                    ? "Replace the placeholders [LIKE_THIS] with your specific details"
                    : "Describe the email you want to create in detail"}
                </p>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateEmail}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg py-6 font-bold disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Generating Email...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-3" />
                    Generate Email
                  </>
                )}
              </Button>

              {/* Generated Email */}
              {generatedEmail && (
                <div className="space-y-4 border-t border-purple-200 pt-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700 font-semibold text-lg">
                      Generated Email (Editable)
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyEmail}
                      className="flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-6">
                    <Textarea
                      value={editableEmail}
                      onChange={(e) => setEditableEmail(e.target.value)}
                      className="min-h-[300px] border-purple-200 focus:border-purple-600 text-base bg-white resize-y leading-relaxed"
                    />
                  </div>

                  {/* Use Email Button */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleUseEmail}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg py-6 font-bold"
                    >
                      <Check className="h-5 w-5 mr-3" />
                      Use This Email
                    </Button>
                    <Button
                      onClick={generateEmail}
                      variant="outline"
                      className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50 text-lg py-6 font-bold"
                    >
                      <Sparkles className="h-5 w-5 mr-3" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
