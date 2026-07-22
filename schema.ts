import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Categories ──────────────────────────────────────────────────────────────
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description"),
  color: varchar("color", { length: 7 }).default("#3b82f6"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Tags ────────────────────────────────────────────────────────────────────
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 60 }).notNull(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
});

// ── Posts ───────────────────────────────────────────────────────────────────
export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 280 }).notNull().unique(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    coverImage: text("cover_image"),
    authorName: varchar("author_name", { length: 100 }).default("Editorial Team"),
    authorAvatar: text("author_avatar"),
    categoryId: integer("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    status: varchar("status", { length: 20 }).default("draft").notNull(), // draft | published
    isFeatured: boolean("is_featured").default(false).notNull(),
    isSponsored: boolean("is_sponsored").default(false).notNull(),
    sponsorName: varchar("sponsor_name", { length: 150 }),
    sponsorUrl: text("sponsor_url"),
    sponsorLogo: text("sponsor_logo"),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    views: integer("views").default(0).notNull(),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("posts_status_idx").on(table.status),
    index("posts_category_idx").on(table.categoryId),
    index("posts_featured_idx").on(table.isFeatured),
    index("posts_published_at_idx").on(table.publishedAt),
  ]
);

// ── Post ↔ Tag junction ─────────────────────────────────────────────────────
export const postTags = pgTable(
  "post_tags",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("post_tag_unique").on(table.postId, table.tagId)]
);

// ── Affiliate Links ─────────────────────────────────────────────────────────
export const affiliateLinks = pgTable("affiliate_links", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  url: text("url").notNull(),
  merchant: varchar("merchant", { length: 150 }),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  commission: varchar("commission", { length: 60 }),
  clicks: integer("clicks").default(0).notNull(),
  conversions: integer("conversions").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Post ↔ Affiliate Link junction ──────────────────────────────────────────
export const postAffiliateLinks = pgTable(
  "post_affiliate_links",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    affiliateLinkId: integer("affiliate_link_id")
      .notNull()
      .references(() => affiliateLinks.id, { onDelete: "cascade" }),
    anchorText: varchar("anchor_text", { length: 200 }),
  },
  (table) => [
    uniqueIndex("post_affiliate_unique").on(table.postId, table.affiliateLinkId),
  ]
);

// ── Ad Placements ───────────────────────────────────────────────────────────
export const adPlacements = pgTable("ad_placements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  position: varchar("position", { length: 50 }).notNull(), // header, sidebar, in-article, footer
  adCode: text("ad_code").notNull(), // HTML/JS ad snippet
  isActive: boolean("is_active").default(true).notNull(),
  impressions: integer("impressions").default(0).notNull(),
  clicks: integer("clicks").default(0).notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Newsletter Subscribers ──────────────────────────────────────────────────
export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    name: varchar("name", { length: 100 }),
    isActive: boolean("is_active").default(true).notNull(),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("newsletter_email_unique").on(table.email)]
);

// ── Contact Messages ────────────────────────────────────────────────────────
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Page Views (analytics) ──────────────────────────────────────────────────
export const pageViews = pgTable(
  "page_views",
  {
    id: serial("id").primaryKey(),
    path: text("path").notNull(),
    postId: integer("post_id").references(() => posts.id, { onDelete: "set null" }),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    ipHash: varchar("ip_hash", { length: 64 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("page_views_path_idx").on(table.path)]
);

// ── Relations ───────────────────────────────────────────────────────────────
export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  postTags: many(postTags),
  postAffiliateLinks: many(postAffiliateLinks),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, { fields: [postTags.postId], references: [posts.id] }),
  tag: one(tags, { fields: [postTags.tagId], references: [tags.id] }),
}));

export const affiliateLinksRelations = relations(affiliateLinks, ({ many }) => ({
  postAffiliateLinks: many(postAffiliateLinks),
}));

export const postAffiliateLinksRelations = relations(postAffiliateLinks, ({ one }) => ({
  post: one(posts, { fields: [postAffiliateLinks.postId], references: [posts.id] }),
  affiliateLink: one(affiliateLinks, {
    fields: [postAffiliateLinks.affiliateLinkId],
    references: [affiliateLinks.id],
  }),
}));
