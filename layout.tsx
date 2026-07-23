import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdSenseScript } from "@/components/AdSenseScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "NichePulse – Expert Reviews, Guides & Deals",
  description:
    "Your trusted source for in-depth product reviews, how-to guides, and exclusive deals. We help you make smarter buying decisions.",
  keywords: ["reviews", "guides", "deals", "affiliate", "product comparison"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NichePulse",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-6993130926858430"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased font-[Inter,sans-serif]">
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
