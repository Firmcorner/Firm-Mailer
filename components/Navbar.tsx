"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Mail, FileText, Star, Eye, Rocket } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="bg-white shadow-lg border-b-2 border-purple-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-purple-600 leading-tight">
                    Firm Mailer
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 leading-none">
                    By FirmCorner
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/#email-sender"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                Email Sender
              </Link>
              <Link
                href="/#templates"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                Templates
              </Link>
              <Link
                href="/#features"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                Features
              </Link>
              <Link
                href="/#preview"
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                Preview
              </Link>
              <Link
                href="/#email-sender"
                className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="text-gray-700 hover:text-purple-600 p-2 rounded-md transition-colors duration-200 relative z-60"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-16 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 transform transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="py-6 px-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link
              href="/#email-sender"
              className="block px-4 py-4 text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium rounded-lg border-b border-gray-100 last:border-b-0"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-purple-600" />
                <span className="ml-3">Email Sender</span>
              </div>
            </Link>

            <Link
              href="/#templates"
              className="block px-4 py-4 text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium rounded-lg border-b border-gray-100 last:border-b-0"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-purple-600" />
                <span className="ml-3">Templates</span>
              </div>
            </Link>

            <Link
              href="/#features"
              className="block px-4 py-4 text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium rounded-lg border-b border-gray-100 last:border-b-0"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center">
                <Star className="h-5 w-5 text-purple-600" />
                <span className="ml-3">Features</span>
              </div>
            </Link>

            <Link
              href="/#preview"
              className="block px-4 py-4 text-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium rounded-lg border-b border-gray-100 last:border-b-0"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-purple-600" />
                <span className="ml-3">Preview</span>
              </div>
            </Link>

            <div className="pt-4">
              <Link
                href="/#email-sender"
                className="block w-full text-center bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center justify-center">
                  <Rocket className="h-5 w-5 mr-2" />
                  Get Started
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
