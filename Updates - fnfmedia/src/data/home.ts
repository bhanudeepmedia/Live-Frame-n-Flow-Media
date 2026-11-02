/**
 * Homepage copy and options that have no other home in the data folder. Ireland
 * and the UK are nudged apart so their flag pins do not cover each other, and the
 * US pin sits on the east coast so it shares the globe's opening view with India.
 */

export const contentSiteUrl = 'https://framenflowmediacom.netlify.app/'

export const clientCountries = [
  { code: 'in', name: 'India', lat: 20.59, lng: 78.96 },
  { code: 'ie', name: 'Ireland', lat: 52.5, lng: -10 },
  { code: 'gb', name: 'United Kingdom', lat: 55, lng: 0 },
  { code: 'us', name: 'United States', lat: 40.7, lng: -74 },
  { code: 'ae', name: 'UAE', lat: 24.2, lng: 54.37 },
  { code: 'cy', name: 'Cyprus', lat: 35.13, lng: 33.43 },
]

export interface ServiceOption {
  label: string
  href: string
  /** The platform it runs on, if it has one: a logo known to `ServiceIcon`. */
  brand?: string
  /** One line on what this is, for the Our Services page. */
  blurb: string
}

export interface ServiceBlock {
  id: string
  title: string
  /** Its name on the row of tabs on a phone. */
  short: string
  summary: string
  tone: 'blue' | 'red' | 'cream'
  href: string
  image: string
  options: ServiceOption[]
}

export const serviceBlocks: ServiceBlock[] = [
  {
    id: 'websites',
    title: 'Websites and custom software',
    short: 'Websites',
    summary: 'Custom-coded websites, stores and software, built to load fast and bring in business.',
    tone: 'blue',
    href: '/web-development',
    image: '/pages/services-websites.webp',
    options: [
      { label: 'Custom-coded websites', href: '/web-development#custom-coded-websites', blurb: 'Hand-coded business sites and landing pages, with an admin panel you control.' },
      { label: 'Custom-coded e-commerce', href: '/web-development#custom-coded-ecommerce', blurb: 'A store you fully own, with no recurring monthly platform fee.' },
      { label: 'Custom Shopify development', href: '/custom-shopify-development', brand: 'shopify', blurb: 'Custom Liquid themes, set up end to end and ready to sell.' },
      { label: 'Custom software development', href: '/web-development#custom-software-development', blurb: 'CRMs and internal tools, built to spec for how you run the business.' },
    ],
  },
  {
    id: 'content',
    title: 'Personal branding and organic content',
    short: 'Content',
    summary: 'You record. We build your authority. Done-for-you content for coaches, consultants and founders.',
    tone: 'red',
    href: contentSiteUrl,
    image: '/services/content.webp',
    options: [
      { label: 'Personal branding', href: contentSiteUrl, blurb: 'You record. We turn it into authority for you and your business.' },
      { label: 'Organic content', href: contentSiteUrl, blurb: 'Regular content that earns trust and enquiries without ad spend.' },
      { label: 'Content planning', href: contentSiteUrl, blurb: 'Topics and scripts worked out before anyone hits record.' },
      { label: 'Video editing', href: contentSiteUrl, blurb: 'Your raw footage, edited into finished videos.' },
      { label: 'Posting and distribution', href: contentSiteUrl, blurb: 'We publish it for you, so you only need to hit record.' },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    short: 'Marketing',
    summary: 'Organic content, creators, AI creative, Meta Ads and search that turn attention into leads and sales.',
    tone: 'cream',
    href: '/marketing',
    image: '/services/marketing.webp',
    options: [
      { label: 'Meta Ads', href: '/marketing#performance-marketing', brand: 'meta', blurb: 'One platform, run well, for qualified leads and sales.' },
      { label: 'SEO and AEO', href: '/seo-aeo', brand: 'google', blurb: 'Get found on Google and recommended by AI assistants.' },
      { label: 'UGC and creator collaborations', href: '/marketing#ugc-creators', blurb: 'Real creators who make your product look worth buying.' },
      { label: 'AI creative production', href: '/marketing#ai-creative', blurb: 'Studio-quality product visuals and ads, without the studio.' },
      { label: 'Personal branding for founders', href: '/marketing#personal-branding', blurb: 'We handle scripting, editing and posting. You hit record.' },
    ],
  },
]

/** White cut-outs of the clients' real logos, tinted in CSS. `ratio` is width over height. */
export const brandLogos = [
  { name: 'The Grafton Vault', src: '/logos/the-grafton-vault.webp', ratio: 18.392 },
  { name: 'theRehva', src: '/logos/therehva.webp', ratio: 3.092 },
  { name: 'Zhai Farms', src: '/logos/zhai-farms.webp', ratio: 8.308 },
  { name: 'Archstoreys', src: '/logos/archstoreys.webp', ratio: 12.092 },
  { name: 'Al Mulla Carpentry', src: '/logos/al-mulla-carpentry.webp', ratio: 11.042 },
  { name: 'Jobridge', src: '/logos/jobridge.webp', ratio: 2.125 },
  { name: 'IMBS', src: '/logos/imbs.webp', ratio: 3.758 },
  { name: 'MyALThomes', src: '/logos/myalthomes.webp', ratio: 4.892 },
  { name: 'Tarz & Taana', src: '/logos/tarz-taana.webp', ratio: 3.958 },
]

export const founderPrinciples = [
  {
    title: 'Logic over luck',
    body: "We don't guess. We audit, research and build from data. Growth isn't an accident; it's an engineering problem.",
  },
  {
    title: 'Precision targeting',
    body: 'A message to everyone is a message to no one. We define exactly who your website is for before we design a single page.',
  },
  {
    title: 'Revenue first',
    body: "If it doesn't add to the bottom line, we don't build it. Every design and development decision maps back to leads and sales.",
  },
]

export const clientVideo = {
  id: 'L_DryjVTpCY',
  quote: "I'm looking forward to working with Bhanu and his team for the next 20 years.",
  author: 'Ian Conway',
  role: 'Managing Director, Dublin, Ireland',
}
