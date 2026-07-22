import { db } from "@/db";
import { posts, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nichepulse.com";

  const [allPosts, allCategories] = await Promise.all([
    db
      .select({ slug: posts.slug, updatedAt: posts.updatedAt })
      .from(posts)
      .where(eq(posts.status, "published")),
    db.select({ slug: categories.slug }).from(categories),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/disclosure`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  const postPages: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = allCategories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}
