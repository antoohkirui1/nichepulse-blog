import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — NichePulse",
  description: "NichePulse terms of service and usage conditions.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            Terms of Service
          </h1>
          <div className="prose max-w-none">
            <p>
              <strong>Last updated:</strong> January 2025
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using NichePulse, you agree to these Terms of
              Service. If you do not agree, please do not use our website.
            </p>

            <h2>Content</h2>
            <p>
              All content on NichePulse is for informational purposes only. While
              we strive for accuracy, we make no warranties about the
              completeness, reliability, or accuracy of this information.
            </p>

            <h2>Affiliate Links</h2>
            <p>
              Our site contains affiliate links. We are not responsible for the
              products, services, or content offered by third-party websites.
              Please review their terms and policies independently.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on NichePulse, including text, images, and logos, is
              our property or used with permission. You may not reproduce,
              distribute, or create derivative works without our consent.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              NichePulse shall not be liable for any indirect, incidental, or
              consequential damages arising from your use of our site or reliance
              on our content.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the site
              after changes constitutes acceptance of the new terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
              <a href="mailto:hello@nichepulse.com">hello@nichepulse.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
