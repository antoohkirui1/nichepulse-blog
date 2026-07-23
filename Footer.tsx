import Link from "next/link";

const footerLinks = {
  content: [
    { href: "/blog", label: "Latest Posts" },
    { href: "/category/reviews", label: "Reviews" },
    { href: "/category/guides", label: "Guides" },
    { href: "/deals", label: "Deals & Coupons" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/advertise", label: "Advertise With Us" },
    { href: "/newsletter", label: "Newsletter" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/disclosure", label: "Affiliate Disclosure" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter banner */}
      <div className="newsletter-cta py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Get the Best Deals & Reviews in Your Inbox
          </h3>
          <p className="text-white/80 mb-5">
            Join 50,000+ smart readers. No spam, unsubscribe anytime.
          </p>
          <form
            action="/api/newsletter"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold">N</span>
            </div>
            <span className="text-lg font-bold text-white">NichePulse</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Expert reviews, in-depth guides, and curated deals to help you make
            smarter purchasing decisions.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Content</h4>
          <ul className="space-y-2">
            {footerLinks.content.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NichePulse. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            This site contains affiliate links. We may earn a commission for
            purchases made through these links at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
