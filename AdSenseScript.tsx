"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-6993130926858430";

export function AdSenseScript() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // Enable page-level (auto) ads — Google places ads automatically
        window.adsbygoogle.push({
          google_ad_client: ADSENSE_CLIENT,
          enable_page_level_ads: true,
        });
      }
    } catch (e) {
      // Silently ignore — ad blocker or AdSense not yet approved
    }
  }, []);

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
