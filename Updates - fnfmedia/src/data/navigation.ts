/** Global header navigation: four items, then the call to action. */
export { startProjectHref } from '@/data/site'
import { contentSiteUrl } from '@/data/home'

export interface NavItem {
  label: string
  href: string
  /** Opens this dropdown as well as linking to `href`. */
  menu?: 'services' | 'blog'
}

export const navItems: NavItem[] = [
  { label: 'Our Portfolio', href: '/portfolio' },
  { label: 'Our Services', href: '/services', menu: 'services' },
  { label: 'Who We Work With', href: '/who-we-work-with' },
  { label: 'Blog', href: '/blog', menu: 'blog' },
]

export interface ServiceMenuItem {
  title: string
  summary: string
  href: string
  banner: string
  links: { label: string; href: string }[]
}

export const serviceMenu: ServiceMenuItem[] = [
  {
    title: 'Websites and software',
    summary: 'Custom-coded websites, stores and software, built to load fast and bring in business.',
    href: '/web-development',
    banner: '/menu/websites.webp',
    links: [
      { label: 'Custom-coded websites', href: '/web-development#custom-coded-websites' },
      { label: 'Custom-coded e-commerce', href: '/web-development#custom-coded-ecommerce' },
      { label: 'Custom software', href: '/web-development#custom-software-development' },
    ],
  },
  {
    title: 'Custom Shopify',
    summary: "Shopify's power, without looking like every other Shopify store.",
    href: '/custom-shopify-development',
    banner: '/menu/shopify.webp',
    links: [
      { label: 'What makes it custom', href: '/custom-shopify-development#what-you-get' },
      { label: 'How we build a store', href: '/custom-shopify-development#how-we-build' },
      { label: "Stores we've built", href: '/custom-shopify-development#stores' },
    ],
  },
  {
    title: 'Content',
    summary: 'You record. We build your authority with personal branding and organic content.',
    href: contentSiteUrl,
    banner: '/menu/content.webp',
    links: [
      { label: 'Personal branding', href: contentSiteUrl },
      { label: 'Organic content', href: contentSiteUrl },
      { label: 'Video editing and posting', href: contentSiteUrl },
    ],
  },
  {
    title: 'Marketing and search',
    summary: 'Meta Ads, creators, AI creative, SEO and AEO that turn attention into leads and sales.',
    href: '/marketing',
    banner: '/menu/marketing.webp',
    links: [
      { label: 'Meta Ads', href: '/marketing#performance-marketing' },
      { label: 'UGC and AI creative', href: '/marketing#ugc-creators' },
      { label: 'SEO and AEO', href: '/seo-aeo' },
    ],
  },
]
