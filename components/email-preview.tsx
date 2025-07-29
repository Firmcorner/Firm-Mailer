"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Monitor,
  Smartphone,
  Star,
  Reply,
  Forward,
  Archive,
  MoreHorizontal,
  Paperclip,
  Download,
  X,
} from "lucide-react";

interface EmailPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  body: string;
  senderEmail: string;
  attachment?: File | null;
}

export function EmailPreview({
  isOpen,
  onClose,
  subject,
  body,
  senderEmail,
  attachment,
}: EmailPreviewProps) {
  const [activeTab, setActiveTab] = useState("desktop");
  const [isMobile, setIsMobile] = useState(false);

  // Detect if user is on mobile device
  useEffect(() => {
    const detectMobileDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
      ];
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isMobileUserAgent = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );

      // Only consider it mobile if it's actually a mobile device (not just small screen)
      return isMobileUserAgent || (isTouchDevice && window.innerWidth <= 768);
    };

    const isMobileDevice = detectMobileDevice();
    setIsMobile(isMobileDevice);

    // Set default tab based on device type only on initial load
    if (isMobileDevice) {
      setActiveTab("mobile");
    } else {
      setActiveTab("desktop");
    }

    // Listen for window resize for actual mobile devices only
    const handleResize = () => {
      const newIsMobile = detectMobileDevice();
      setIsMobile(newIsMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Remove activeTab dependency to prevent infinite loops

  const formatEmailBody = (text: string) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className={line.trim() === "" ? "mb-4" : "mb-2"}>
        {line || "\u00A0"}
      </p>
    ));
  };

  const DesktopEmailView = () => (
    <div className="bg-white border rounded-lg shadow-sm max-w-4xl mx-auto">
      {/* Email Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {senderEmail.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{senderEmail}</div>
              <div className="text-sm text-gray-500">
                to recipient@example.com
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <Button variant="ghost" size="sm">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Reply className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Forward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          {subject || "No Subject"}
        </h1>

        {attachment && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
            <Paperclip className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{attachment.name}</span>
            <Badge variant="secondary" className="text-xs">
              {(attachment.size / 1024 / 1024).toFixed(2)} MB
            </Badge>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Download className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Email Body */}
      <div className="p-6">
        <div className="prose max-w-none text-gray-800 leading-relaxed">
          {body ? (
            formatEmailBody(body)
          ) : (
            <p className="text-gray-500 italic">No email content</p>
          )}
        </div>
      </div>

      {/* Email Footer */}
      <div className="border-t p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
            <Button variant="outline" size="sm">
              <Forward className="h-3 w-3 mr-1" />
              Forward
            </Button>
          </div>
          <div className="text-xs text-gray-500">
            Sent via Bulk Email Sender
          </div>
        </div>
      </div>
    </div>
  );

  const MobileEmailView = () => (
    <div className="bg-white border rounded-lg shadow-sm max-w-sm mx-auto">
      {/* Mobile Email Header */}
      <div className="border-b p-3">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {senderEmail.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-gray-900 truncate">
              {senderEmail}
            </div>
            <div className="text-xs text-gray-500">to me</div>
          </div>
          <div className="text-xs text-gray-500">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <h2 className="font-semibold text-gray-900 text-sm mb-2">
          {subject || "No Subject"}
        </h2>

        {attachment && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs">
            <Paperclip className="h-3 w-3 text-gray-500" />
            <span className="text-gray-700 truncate flex-1">
              {attachment.name}
            </span>
            <Badge variant="secondary" className="text-xs">
              {(attachment.size / 1024 / 1024).toFixed(1)}MB
            </Badge>
          </div>
        )}
      </div>

      {/* Mobile Email Body */}
      <div className="p-3">
        <div className="text-sm text-gray-800 leading-relaxed">
          {body ? (
            formatEmailBody(body)
          ) : (
            <p className="text-gray-500 italic">No email content</p>
          )}
        </div>
      </div>

      {/* Mobile Email Actions */}
      <div className="border-t p-3 bg-gray-50">
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Reply className="h-3 w-3 mr-1" />
            Reply
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Forward className="h-3 w-3 mr-1" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Email Preview
            <Badge variant="outline">Live Preview</Badge>
            {isMobile && (
              <Badge variant="secondary" className="text-xs">
                Mobile Optimized
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Show tabs only on desktop/larger screens */}
        {!isMobile ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="desktop" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Desktop View
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="desktop" className="mt-6">
              <div className="bg-gray-100 p-6 rounded-lg">
                <DesktopEmailView />
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="mt-6">
              <div className="bg-gray-100 p-6 rounded-lg flex justify-center">
                <MobileEmailView />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          // Mobile users only see mobile view without tabs
          <div className="w-full mt-6">
            <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
              <MobileEmailView />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            {isMobile
              ? "Mobile-optimized preview for the best viewing experience"
              : "Preview shows how your email will appear to recipients"}
          </div>
          <Button onClick={onClose}>Close Preview</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
