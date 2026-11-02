/**
 * Per-page meta (§8): titles under 60 chars, descriptions 150-160 chars,
 * national phrases rather than any single city (§6). Lengths are enforced by
 * `pnpm run check:seo` (scripts/check-seo.mjs).
 */
export interface PageMeta {
  title: string
  description: string
  path: string
  /** noindex for internal/thank-you pages (§8 Robots). */
  noindex?: boolean
}

export const pageMeta = {
  home: {
    path: '/',
    title: 'Best Web & Marketing Studio in India | Frame n Flow Media',
    description:
      'Frame n Flow Media is a boutique web development and marketing studio. Custom-coded and Shopify websites, driven by Meta Ads, SEO and AEO. Start your project.',
  },
  webDevelopment: {
    path: '/web-development',
    title: 'Boutique Web Development Agency India | Frame n Flow Media',
    description:
      'Custom-coded websites, e-commerce stores, Shopify builds and business software from a boutique web development studio in India. Start your project today.',
  },
  marketing: {
    path: '/marketing',
    title: 'Best Marketing Studio in India | Frame n Flow Media',
    description:
      'Founder-led content, creator collaborations, AI creative and Meta Ads from a boutique marketing studio in India. Turn attention into leads. Start your project.',
  },
  customShopify: {
    path: '/custom-shopify-development',
    title: 'Custom Shopify Development Agency | Frame n Flow Media',
    description:
      'Custom Shopify stores built on hand-written Liquid, set up end to end with payments, shipping and WhatsApp. See the stores we have built and start your own.',
  },
  seoAeo: {
    path: '/seo-aeo',
    title: 'SEO & AEO Services in India | Frame n Flow Media',
    description:
      'SEO and AEO from a boutique studio in India. Get found on Google and recommended by ChatGPT, Perplexity and Gemini. Start your project with Frame n Flow Media.',
  },
  portfolio: {
    path: '/portfolio',
    title: 'Our Portfolio and Case Studies | Frame n Flow Media',
    description:
      'See the websites Frame n Flow Media has built, with client reviews and a case study: 1M+ organic views and 300+ consultations for a Dublin jewellery brand.',
  },
  services: {
    path: '/services',
    title: 'Our Services | Frame n Flow Media',
    description:
      'Websites and custom software, content, marketing, SEO and AEO from one team. See what each service includes and how Frame n Flow Media can help your business.',
  },
  whoWeWorkWith: {
    path: '/who-we-work-with',
    title: 'Who We Work With | Frame n Flow Media',
    description:
      'Frame n Flow Media is a boutique web development and marketing studio working with brands across India, the US, the UK, Europe and the rest of the world.',
  },
  contact: {
    path: '/contact',
    title: 'Start Your Project | Frame n Flow Media',
    description:
      "Tell us about your business and we'll tell you what it needs. Start your project with Frame n Flow Media, a boutique web development and marketing studio.",
  },
  /* Carried over from the previous site so existing rankings keep their URL. */
  founder: {
    path: '/founder-bhanudeep',
    title: 'Bhanu Deep - Founder | Frame n Flow Media',
    description:
      'Meet Bhanu Deep, founder of Frame n Flow Media, a boutique web development and marketing studio that builds fast, custom-coded websites for growing brands.',
  },
  blog: {
    path: '/blog',
    title: 'Blog | Frame n Flow Media - Insights & Strategies',
    description:
      'Articles from Frame n Flow Media on web development, SEO, AEO and marketing: how better websites earn search visibility, trust and revenue for growing brands.',
  },
  blogRevenueGrowth: {
    path: '/blog/revenue-growth-2026',
    title: 'How a Great Website Increases Business Revenue',
    description:
      'Discover why investing in a professional website drives business revenue growth. Learn proven strategies and tools to boost conversions, credibility and sales.',
  },
  blogOxygen: {
    path: '/blog/oxygen-digital-marketing-hyderabad',
    title: 'Oxygen: Digital Marketing in Hyderabad | Frame n Flow Media',
    description:
      'A look at Oxygen, a Hyderabad digital marketing company helping businesses improve online visibility and win quality leads through SEO, content and web design.',
  },
  blogChooseWebDevelopment: {
    path: '/blog/how-to-choose-web-development-company-india',
    title: 'How to Choose a Web Development Company in India',
    description:
      'Hiring a web development company in India? Use these 10 questions on code ownership, speed, SEO and support to compare your shortlist before you sign anything.',
  },
  blogCustomShopify: {
    path: '/blog/custom-shopify-development-vs-theme',
    title: 'Custom Shopify Development vs a Theme: Which to Choose',
    description:
      'When a ready-made Shopify theme is enough, when it holds your brand back, and what custom Shopify development in Liquid really includes. A plain brand guide.',
  },
  blogShopifyVsCustom: {
    path: '/blog/shopify-vs-custom-ecommerce-website',
    title: 'Shopify vs a Custom E-Commerce Website: How to Choose',
    description:
      'Shopify or a custom-coded online store? Compare ownership, monthly costs, payment gateways in India and day-to-day running, then pick the right fit today.',
  },
  blogAeo: {
    path: '/blog/what-is-answer-engine-optimization',
    title: 'What Is Answer Engine Optimization (AEO)? A Plain Guide',
    description:
      'What answer engine optimization means, how AEO differs from SEO, and practical steps that help ChatGPT, Perplexity and Google AI Overviews cite your business.',
  },
  blogFounderBranding: {
    path: '/blog/personal-branding-for-founders',
    title: 'Personal Branding for Founders: A Simple System',
    description:
      'A simple personal branding system for founders: what to talk about, how often to post, and how a Dublin jeweller reached 1M+ organic views with zero ad spend.',
  },
  websiteOffer: {
    path: '/offers/website-25k',
    title: 'Premium Business Website at ₹25,000 | Frame n Flow Media',
    description:
      'Standard, e-commerce or custom-coded website for ₹25,000, with Google Analytics, SEO foundations and 1 year of free domain and hosting. The premium India offer.',
  },
} satisfies Record<string, PageMeta>
