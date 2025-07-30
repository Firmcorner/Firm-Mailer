import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import Analytics from "../components/Analytics"; // Add Analytics component

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "Best Bulk Email Sender - Send Mass Emails Instantly | Free Email Marketing Tool",
  description:
    "Professional bulk email sender for mass email campaigns. Send personalized emails with attachments to multiple recipients. Best email marketing tool for businesses, job applications, and newsletters.",
  keywords:
    "bulk email sender, mass email tool, email marketing, send bulk emails, email campaign tool, best email sender, free bulk email, email automation, newsletter sender, cold email tool",
  authors: [{ name: "Bulk Email Pro" }],
  creator: "Bulk Email Pro",
  publisher: "Bulk Email Pro",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bulkemailsender.com",
    siteName: "Best Bulk Email Sender",
    title: "Best Bulk Email Sender - Send Mass Emails Instantly",
    description:
      "Professional bulk email sender for mass email campaigns. Send personalized emails with attachments to multiple recipients instantly.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best Bulk Email Sender - Mass Email Marketing Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Bulk Email Sender - Send Mass Emails Instantly",
    description:
      "Professional bulk email sender for mass email campaigns. Send personalized emails with attachments to multiple recipients.",
    images: ["/twitter-image.jpg"],
    creator: "@bulkemailpro",
  },
  alternates: {
    canonical: "https://bulkemailsender.com",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
  },
  generator: "v0.dev",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Best Bulk Email Sender",
  description:
    "Professional bulk email sender for mass email campaigns with attachment support",
  url: "https://bulkemailsender.com",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Bulk Email Sending",
    "Email Templates",
    "Attachment Support",
    "Multiple Email Providers",
    "Email Preview",
    "Campaign Analytics",
  ],
  author: {
    "@type": "Organization",
    name: "Bulk Email Pro",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1250",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://bulkemailsender.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Analytics - Using Next.js Script component */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E14ZVE9YD4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E14ZVE9YD4');
          `}
        </Script>

        <header className="sr-only">
          <h1>
            Best Bulk Email Sender - Professional Mass Email Marketing Tool
          </h1>
          <nav aria-label="Main navigation">
            <ul>
              <li>
                <a href="#email-sender">Email Sender</a>
              </li>
              <li>
                <a href="#templates">Email Templates</a>
              </li>
              <li>
                <a href="#preview">Email Preview</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
            </ul>
          </nav>
        </header>

        <Navbar />

        <main role="main">{children}</main>

        <footer className="sr-only">
          <p>
            © 2024 Best Bulk Email Sender. Professional email marketing tool for
            businesses.
          </p>
        </footer>

        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
