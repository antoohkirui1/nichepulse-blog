"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  position: "header" | "sidebar" | "in-article" | "footer";
  label?: string;
  /** Optional slot ID. If not provided, shows a placeholder. */
  slotId?: string;
}

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-6993130926858430";

const adStyles: Record<string, string> = {
  header: "min-h-[90px] max-h-[120px]",
  sidebar: "min-h-[250px] max-h-[600px]",
  "in-article": "min-h-[120px] max-h-[280px]",
  footer: "min-h-[90px] max-h-[120px]",
};

const slotEnvKeys: Record<string, string> = {
  header: "NEXT_PUBLIC_ADSENSE_SLOT_HEADER",
  sidebar: "NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR",
  "in-article": "NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE",
  footer: "NEXT_PUBLIC_ADSENSE_SLOT_FOOTER",
};

export default function AdBanner({ position, label, slotId }: AdBannerProps) {
  // Pull slot ID from env if not provided directly
  const resolvedSlot =
    slotId ||
    (typeof process !== "undefined" && process.env
      ? (process.env[slotEnvKeys[position]] as string | undefined)
      : undefined) ||
    "";

  useEffect(() => {
    if (resolvedSlot && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ad blocked or not loaded — ignore
      }
    }
  }, [resolvedSlot]);

  // If no slot ID configured, show a helpful placeholder
  if (!resolvedSlot) {
    return (
      <div
        className={`ad-container ${adStyles[position]} w-full my-4 relative`}
      >
        <div className="text-center px-4">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">
            Advertisement
          </span>
          <span className="text-xs text-gray-500">
            {label || `${position} ad space`}
          </span>
          <span className="text-[10px] text-gray-400 block mt-1">
            Publisher: {ADSENSE_CLIENT}
          </span>
          <span className="text-[10px] text-gray-400 block">
            ⚠️ Configure <code className="bg-gray-200 px-1 rounded">{slotEnvKeys[position]}</code> in .env to activate
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full my-4 relative`}>
      <div className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
