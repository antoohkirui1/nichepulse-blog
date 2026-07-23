interface SponsoredBadgeProps {
  sponsorName?: string | null;
  sponsorUrl?: string | null;
  sponsorLogo?: string | null;
}

export default function SponsoredBadge({
  sponsorName,
  sponsorUrl,
  sponsorLogo,
}: SponsoredBadgeProps) {
  return (
    <div className="bg-gradient-to-r from-warm-50 to-warm-100 border border-warm-200 rounded-xl p-4 my-6">
      <div className="flex items-center gap-3">
        <div className="sponsored-badge text-white text-xs font-bold px-3 py-1 rounded-full flex-shrink-0">
          Sponsored
        </div>
        <div className="flex items-center gap-2 text-sm">
          {sponsorLogo && (
            <img
              src={sponsorLogo}
              alt={sponsorName || "Sponsor"}
              className="w-6 h-6 rounded"
            />
          )}
          <span className="text-gray-700">
            This post is sponsored by{" "}
            {sponsorUrl ? (
              <a
                href={sponsorUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="font-semibold text-warm-700 hover:text-warm-800 underline"
              >
                {sponsorName || "our partner"}
              </a>
            ) : (
              <span className="font-semibold text-warm-700">
                {sponsorName || "our partner"}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
