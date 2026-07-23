import Link from "next/link";
import { format } from "date-fns";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    authorName: string | null;
    isSponsored: boolean;
    sponsorName: string | null;
    publishedAt: Date | null;
    views: number;
  };
  categoryName?: string;
  categorySlug?: string;
  variant?: "default" | "featured" | "compact";
}

export default function PostCard({
  post,
  categoryName,
  categorySlug,
  variant = "default",
}: PostCardProps) {
  const publishDate = post.publishedAt
    ? format(new Date(post.publishedAt), "MMM d, yyyy")
    : "";

  if (variant === "featured") {
    return (
      <article className="group relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl">
        <div className="aspect-[16/9] bg-gradient-to-br from-primary-600 to-accent-600 relative">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {post.isSponsored && (
              <span className="sponsored-badge inline-block text-xs font-bold text-white px-3 py-1 rounded-full mb-3">
                Sponsored
              </span>
            )}
            {categoryName && (
              <Link
                href={`/category/${categorySlug}`}
                className="inline-block text-xs font-semibold text-primary-300 uppercase tracking-wider mb-2 hover:text-primary-200"
              >
                {categoryName}
              </Link>
            )}
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 group-hover:text-primary-200 transition-colors leading-tight">
                {post.title}
              </h2>
            </Link>
            {post.excerpt && (
              <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-4">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{post.authorName || "Editorial Team"}</span>
              <span>·</span>
              <span>{publishDate}</span>
              <span>·</span>
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex gap-4 py-4 border-b border-gray-100 last:border-0">
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 flex-shrink-0 overflow-hidden">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {post.isSponsored && (
            <span className="sponsored-badge inline-block text-[10px] font-bold text-white px-2 py-0.5 rounded-full mb-1">
              Sponsored
            </span>
          )}
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mt-1">
            {publishDate} · {post.views.toLocaleString()} views
          </p>
        </div>
      </article>
    );
  }

  // Default card
  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300">
      <div className="aspect-[16/10] bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {!post.coverImage && (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
        {post.isSponsored && (
          <span className="sponsored-badge absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full shadow-md">
            Sponsored
          </span>
        )}
        {categoryName && (
          <Link
            href={`/category/${categorySlug}`}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-700 px-3 py-1 rounded-full hover:bg-white transition"
          >
            {categoryName}
          </Link>
        )}
      </div>
      <div className="p-5">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-accent-400" />
            <span className="font-medium">
              {post.authorName || "Editorial Team"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>{publishDate}</span>
            {post.sponsorName && (
              <span className="text-warm-600 font-medium">
                by {post.sponsorName}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
