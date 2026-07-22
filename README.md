# 📝 NichePulse Blog

A full-stack blog website built with Next.js, PostgreSQL, and Tailwind CSS. Ready for monetization through AdSense, affiliate marketing, and sponsored posts.

## ✨ Features

- 📝 **32 High-Quality Blog Posts** across 5 categories
- 🔍 **SEO Optimized** with sitemap, meta tags, and structured data
- 💰 **Monetization Ready:**
  - Google AdSense integration
  - Affiliate marketing links
  - Sponsored post badges
  - Newsletter subscriptions
- 📱 **Responsive Design** - Works on all devices
- 🗄️ **PostgreSQL Database** with Drizzle ORM
- 🎨 **Modern UI** with Tailwind CSS
- 📧 **Contact Form** and newsletter signup
- 🔗 **Social Sharing** buttons

## 🚀 Quick Deploy

### Option 1: One-Click Script (Recommended)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deploy

See [DEPLOY.md](DEPLOY.md) for detailed instructions.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Database Hosting:** Neon (free tier)

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── db/              # Database schema and config
│   └── ...
├── public/              # Static assets
├── deploy.sh           # One-click deployment script
├── DEPLOY.md           # Deployment guide
└── README.md           # This file
```

## 📝 Content Categories

1. **Reviews** (10 posts) - Product reviews and comparisons
2. **Guides** (10 posts) - How-to guides and tutorials
3. **Tech** (8 posts) - Technology news and tools
4. **Finance** (4 posts) - Personal finance tips
5. **Deals** (5 posts) - Sales, discounts, and coupons

## 💰 Monetization

### Google AdSense
- Global script already integrated
- Ad slots configured for header, sidebar, in-article, footer
- `ads.txt` file automatically generated

### Affiliate Marketing
- 5 affiliate links seeded in database
- Product cards displayed in relevant posts
- Commission tracking built-in

### Sponsored Posts
- Mark posts as sponsored with badges
- Sponsor attribution with links
- Dedicated disclosure page

## 🗄️ Database Schema

- **categories** - Blog categories
- **posts** - Blog articles
- **tags** - Post tags
- **postTags** - Many-to-many junction
- **affiliateLinks** - Affiliate products
- **postAffiliateLinks** - Post-affiliate junction
- **adPlacements** - Ad configurations
- **newsletterSubscribers** - Email list
- **contactMessages** - Contact form submissions

## 🚀 Getting Started (Development)

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL

# Push database schema
npx drizzle-kit push

# Seed with sample data
npm run seed

# Run development server
npm run dev
```

## 📊 Traffic Requirements for AdSense

- **Minimum:** 1,000 monthly visitors
- **Recommended:** 5,000+ for approval
- **Content:** 30+ quality posts (✅ You have 32!)

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense publisher ID | ✅ Yes |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | Ad slot IDs | ❌ Optional |

## 📞 Support

- **Deployment Help:** See [DEPLOY.md](DEPLOY.md)
- **GitHub Issues:** Create an issue in your repo
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)

## 🎯 Next Steps After Deployment

1. ✅ Verify site loads correctly
2. ✅ Submit to Google Search Console
3. ✅ Set up Google Analytics
4. ⏳ Build traffic to 1,000+ visitors/month
5. 📝 Apply for Google AdSense
6. 💰 Start earning!

## 📄 License

This project is yours to use and modify.

---

**Built with ❤️ for NichePulse Blog**
