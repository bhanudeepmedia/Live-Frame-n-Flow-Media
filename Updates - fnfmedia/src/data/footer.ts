/**
 * Footer navigation content — mirrors the site map in Handover §8
 * "Page/URL Structure". Service links deep-link to each offering's section.
 */

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export const footerWebDevelopment: FooterColumn = {
  title: 'Web Development',
  links: [
    { label: 'Custom-Coded Websites', href: '/web-development#custom-coded-websites' },
    { label: 'Custom-Coded E-Commerce', href: '/web-development#custom-coded-ecommerce' },
    { label: 'Custom Shopify Development', href: '/custom-shopify-development' },
    { label: 'Custom Software Development', href: '/web-development#custom-software-development' },
  ],
}

export const footerMarketing: FooterColumn = {
  title: 'Marketing',
  links: [
    { label: 'Personal Branding for Founders', href: '/marketing#personal-branding' },
    { label: 'UGC & Creator Collaborations', href: '/marketing#ugc-creators' },
    { label: 'AI Creative Production', href: '/marketing#ai-creative' },
    { label: 'Meta Ads', href: '/marketing#performance-marketing' },
  ],
}

export const footerSeo: FooterColumn = {
  title: 'SEO & AEO',
  links: [
    { label: 'SEO', href: '/seo-aeo#seo' },
    { label: 'AEO', href: '/seo-aeo#aeo' },
    { label: 'Common questions', href: '/seo-aeo#faq' },
  ],
}

export const footerIndustries: FooterColumn = {
  title: 'Who we work with',
  links: [
    { label: 'Jewelry & fashion', href: '/who-we-work-with#industries' },
    { label: 'E-commerce & FMCG', href: '/who-we-work-with#industries' },
    { label: 'Real estate', href: '/who-we-work-with#industries' },
    { label: 'Professional services & education', href: '/who-we-work-with#industries' },
    { label: 'India, the US, the UK, Europe and beyond', href: '/who-we-work-with#markets' },
  ],
}

export const footerCompany: FooterColumn = {
  title: 'Company',
  links: [
    { label: 'Start Your Project', href: '/contact' },
    { label: 'Our Portfolio', href: '/portfolio' },
    { label: 'Our Services', href: '/services' },
    { label: 'Who We Work With', href: '/who-we-work-with' },
    { label: 'Founder', href: '/founder-bhanudeep' },
    { label: 'Blog', href: '/blog' },
  ],
}


export const footerLegalLinks: FooterLink[] = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms of service', href: '/terms-of-service' },
]

export const footerSocialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/framenflowmedia/', icon: 'instagram' as const },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/frame-n-flow-media/?viewAsMember=true',
    icon: 'linkedin' as const,
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@framenflowmedia', icon: 'youtube' as const },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61585218869613',
    icon: 'facebook' as const,
  },
]
