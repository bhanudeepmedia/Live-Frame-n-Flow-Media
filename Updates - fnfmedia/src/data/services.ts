/**
 * Service pillar teasers — Handover §2. Development leads (top nav position,
 * first services block, §1 "51/49"); marketing and SEO & AEO follow with equal
 * visual weight. Client logo rosters draw from the real portfolio
 * (LEGACY_CONTENT.md §9A); SEO & AEO carries none because no client
 * engagement is documented for it.
 */
export type ServiceTheme = 'transform' | 'build' | 'growth'

export interface ServiceTab {
  id: string
  tabLabel: string
  productLabel: string
  title: string
  description: string
  includedServices: string[]
  ctaHref: string
  theme: ServiceTheme
  clientLogos: string[]
}

export const serviceThemeBackground: Record<ServiceTheme, string> = {
  transform: 'radial-gradient(120% 140% at 100% 0%, #17654c 0%, #0d372e 55%, #081f1a 100%)',
  build: 'linear-gradient(115deg, #040f23 0%, #0c346b 45%, #1860d3 78%, #6da5f2 100%)',
  growth: 'radial-gradient(120% 120% at 100% 0%, #6123c5 0%, #2e0b66 55%, #14062e 100%)',
}

export const serviceTabs: ServiceTab[] = [
  {
    id: 'web-development',
    tabLabel: 'Web Development & Custom Software',
    productLabel: 'web development & custom software',
    title: 'Web Development & Custom Software',
    description: 'Custom-coded sites, Shopify stores and business software, built to convert, not just to look good.',
    includedServices: [
      'Custom-Coded Websites',
      'Custom-Coded E-Commerce',
      'Custom Shopify Development',
      'Custom Software Development',
    ],
    ctaHref: '/web-development',
    theme: 'build',
    clientLogos: ['The Grafton Vault', 'IMBS', 'Connvel', 'Jacobo Hernandez Tennis'],
  },
  {
    id: 'marketing',
    tabLabel: 'Marketing',
    productLabel: 'marketing',
    title: 'Marketing',
    description: 'Organic content, creator collaborations, AI creative and Meta Ads that turn attention into leads and sales.',
    includedServices: [
      'Personal Branding for Founders',
      'UGC & Creator Collaborations',
      'AI Creative Production',
      'Meta Ads',
    ],
    ctaHref: '/marketing',
    theme: 'transform',
    clientLogos: ["Jugji's", 'Sakura Studio', 'Real Grow Realtors', 'Dosa Xpress'],
  },
  {
    id: 'seo-aeo',
    tabLabel: 'SEO & AEO',
    productLabel: 'seo & aeo',
    title: 'SEO & AEO',
    description: 'Ranked on Google. Recommended by AI. Built to be found wherever your customers are searching.',
    includedServices: ['Technical SEO', 'On-Page Optimization', 'Regional SEO', 'Answer Engine Optimization'],
    ctaHref: '/seo-aeo',
    theme: 'growth',
    clientLogos: [],
  },
]
