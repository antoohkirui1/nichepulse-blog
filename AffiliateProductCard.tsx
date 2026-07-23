interface AffiliateProductCardProps {
  name: string;
  url: string;
  merchant?: string | null;
  description?: string | null;
  commission?: string | null;
}

export default function AffiliateProductCard({
  name,
  url,
  merchant,
  description,
  commission,
}: AffiliateProductCardProps) {
  return (
    <div className="bg-gradient-to-br from-warm-50 to-white border border-warm-200 rounded-xl p-5 my-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">{name}</h4>
          {merchant && (
            <span className="text-xs text-gray-500 font-medium">
              by {merchant}
            </span>
          )}
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
          {commission && (
            <span className="inline-block mt-2 text-xs text-accent-700 bg-accent-50 px-2 py-0.5 rounded-full">
              💰 {commission}
            </span>
          )}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-warm-400 to-warm-500 text-white font-semibold text-sm rounded-lg hover:from-warm-500 hover:to-warm-600 transition-all shadow-sm"
          data-affiliate="true"
        >
          View Deal →
        </a>
      </div>
      <p className="text-[11px] text-gray-400 mt-3">
        * Affiliate link — we may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
