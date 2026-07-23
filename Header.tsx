"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/category/reviews", label: "Reviews" },
  { href: "/category/guides", label: "Guides" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-gray-400">
            Trusted by 50,000+ readers worldwide
          </span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-primary-400 transition">
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary-400 transition"
            >
              Contact
            </Link>
            <Link
              href="/advertise"
              className="hover:text-primary-400 transition"
            >
              Advertise
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-extrabold text-lg">N</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-primary-600">Niche</span>
            <span className="text-gray-900">Pulse</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Search */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/newsletter"
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:opacity-90 transition"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/newsletter"
            className="block mt-3 text-center px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Subscribe to Newsletter
          </Link>
        </div>
      )}
    </header>
  );
}
