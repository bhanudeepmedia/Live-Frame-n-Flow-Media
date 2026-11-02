/**
 * Site-wide constants — sourced from the client's Copywriting & SEO/AEO
 * Handover (FNF-Website-Redesign-Copywriting-SEO-AEO-Handover.md).
 *
 * §7 "A clear, single conversion path": every conversion CTA on the site
 * uses one of these two labels rather than mixing "Contact Us",
 * "Learn More" and "Get Started".
 */
export const siteName = 'Frame n Flow Media'
export const siteUrl = 'https://framenflowmedia.in'

export const ctaLabels = {
  primary: 'Start Your Project',
  proposal: 'Get a Proposal',
  work: 'See Our Work',
} as const

/** Single conversion destination (§7) — every "Start Your Project" CTA lands here. */
export const startProjectHref = '/contact'

export const trustLine = 'Trusted by 50+ masterminds globally'

/** Contact channels, the same ones the old site's contact page gave. */
export const contactChannels = {
  calendly: 'https://calendly.com/bhanudeep-workprofile/30min',
  whatsapp: 'https://wa.me/917995533838',
  whatsappNumber: '917995533838',
  whatsappDisplay: '+91 79955 33838',
  email: 'heyframenflowmedia@gmail.com',
} as const

/** Consistent business description (§6: same wording across site, GBP, LinkedIn, directories). */
export const businessDescription =
  'Frame n Flow Media is a boutique web development and marketing studio. We take on a limited number of projects at a time, build custom-coded and Shopify websites, and drive qualified traffic to them with Meta Ads, SEO and AEO. One team, one roadmap, end to end.'

/** Entity/trust signals stay Hyderabad-anchored; targeting signals do not (§6). */
export const registeredLocation = {
  locality: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
} as const

export const socialProfiles = [
  'https://www.instagram.com/framenflowmedia/',
  'https://www.linkedin.com/company/frame-n-flow-media/?viewAsMember=true',
  'https://www.youtube.com/@framenflowmedia',
  'https://www.facebook.com/profile.php?id=61585218869613',
]

/** Grafton Vault — the flagship proof point (§2, §4, §6, §7). */
export const flagshipProof = {
  client: 'The Grafton Vault',
  industry: 'Fine jewellery',
  location: 'Dublin, Ireland',
  stats: [
    { value: '1M+', label: 'Organic views' },
    { value: '300+', label: 'Consultations booked' },
    { value: 'Zero', label: 'Ad spend' },
  ],
  summary: 'Built from a standing start, with founder-led organic content and no paid advertising.',
} as const
