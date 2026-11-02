/**
 * Service copy — Handover §3 (Web Development & Custom Software), §4
 * (Marketing) and §5 (SEO & AEO). Quoted lines are the client's final-draft
 * language; supporting bullets restate the handover's notes for each offering.
 */
export interface Offering {
  id: string
  title: string
  /** The client's quoted one-line pitch — a short, liftable direct answer (§6). */
  pitch: string
  points: string[]
  keyPhrases?: string[]
  image: string
}

export const developmentIntro = {
  headline: 'Built to Convert. Built to Last.',
  intro:
    "We don't do templates. Every site we build is designed around your business, coded by hand, and backed by an admin panel you can actually use.",
}

export const developmentOfferings: Offering[] = [
  {
    id: 'custom-coded-websites',
    image: '/pages/web-custom-websites.webp',
    title: 'Custom-Coded Websites',
    pitch:
      'For portfolios, business sites and startup landing pages that need to make a strong first impression and convert visitors into leads.',
    points: [
      'Built on modern stacks (JavaScript, MERN).',
      "Bespoke visuals, conversion-focused copywriting, and a professional finish you won't get from a drag-and-drop theme.",
      'Every build ships with a custom backend admin panel, so you can update content, images and pages without calling a developer.',
    ],
    keyPhrases: ['Hand-coded, not templated', 'Built for conversion, not just for looks', 'You own and control the backend'],
  },
  {
    id: 'custom-coded-ecommerce',
    image: '/pages/web-ecommerce.webp',
    title: 'Custom-Coded E-Commerce Websites',
    pitch:
      'For growing e-commerce brands that want a fully owned online store, without a recurring monthly platform fee.',
    points: [
      'The alternative to Shopify for smaller e-commerce projects.',
      'Same conversion-focused design and custom backend, but no ongoing subscription cost.',
      'A good fit for founders who want to own their stack outright.',
    ],
  },
  {
    id: 'custom-shopify-development',
    image: '/pages/web-shopify.webp',
    title: 'Custom Shopify Development',
    pitch: "For e-commerce brands who want Shopify's power without looking like every other Shopify store.",
    points: [
      'Custom Liquid code and fully tailored theme design. No generic templates, no third-party theme purchases required.',
      'We handle full setup end to end, including payment gateways, shipping gateways and WhatsApp integration.',
      "You get a store that's live, connected and ready to sell, not just a design file.",
    ],
  },
  {
    id: 'custom-software-development',
    image: '/pages/web-custom-software.webp',
    title: 'Custom Software Development',
    pitch: 'For businesses that have outgrown off-the-shelf tools.',
    points: [
      'Tailored software built to spec, including custom CRMs and internal business management tools.',
      "The natural next step when you've grown past your website and need systems to run the business itself.",
      'We build the same kind of systems for our own operations.',
    ],
  },
]

/** Handover §3 "Custom Shopify Development": the same claims, laid out step by step. */
export const shopifyIntro = {
  headline: 'Custom Shopify stores, built around your brand',
  intro:
    "For e-commerce brands who want Shopify's power without looking like every other Shopify store. Hand-written Liquid, a theme designed for you, and a store that's live and ready to sell.",
}

export const shopifyPoints = [
  { title: 'Custom Liquid code', body: 'Your theme is written for your store, not adapted from a template.' },
  { title: 'Fully tailored design', body: "Every page is designed around your brand. There's no third-party theme to buy." },
  { title: 'Full setup, end to end', body: 'Payment gateways, shipping gateways and WhatsApp integration included.' },
  { title: 'Ready to sell', body: "You get a store that's live and connected, not just a design file." },
]

export const shopifySteps = [
  {
    title: 'We plan the store',
    body: 'We work out how your products should be organised and how a customer should move from your home page to checkout.',
  },
  {
    title: 'We design and code your theme',
    body: 'Your design is built in custom Liquid, section by section, so your store looks like your brand and you can still run it from the Shopify admin.',
  },
  {
    title: 'We connect everything',
    body: 'Payment gateways, shipping gateways and WhatsApp are set up and tested, so orders flow through from day one.',
  },
  {
    title: 'You go live',
    body: "The store launches connected and ready to sell, and we stay on hand while you get comfortable running it.",
  },
]

export const shopifyFaq = [
  {
    question: 'What is custom Shopify development?',
    answer:
      'It means building your Shopify store on a theme written for you in Liquid, Shopify\'s template language, rather than buying a ready-made theme and changing its colours. You keep Shopify\'s checkout, admin and app ecosystem, and your store looks and works the way your brand needs.',
  },
  {
    question: 'Do I need to buy a Shopify theme?',
    answer: 'No. We write the theme for your store, so no third-party theme purchase is required.',
  },
  {
    question: 'What do you set up besides the design?',
    answer:
      'We handle the full setup end to end, including payment gateways, shipping gateways and WhatsApp integration. You get a store that is live, connected and ready to sell, not just a design file.',
  },
  {
    question: 'Should I choose Shopify or a custom-coded store?',
    answer:
      'Shopify suits brands that want its platform and are comfortable with a monthly fee. A custom-coded store suits smaller e-commerce projects where you want to own the stack outright with no recurring platform fee. We build both and can recommend one for your business.',
  },
]

export const marketingIntro = {
  headline: 'Content and Campaigns That Actually Move the Needle.',
  intro:
    'Two branches, one goal: get the right people to notice your business, and turn that attention into revenue.',
}

export const organicOfferings: Offering[] = [
  {
    id: 'personal-branding',
    image: '/pages/marketing-personal-branding.webp',
    title: 'Personal Branding for Founders',
    pitch: 'Your face sells your business better than any ad. We handle everything, scripting, editing, posting, so you only need to hit record.',
    points: [
      'You record raw footage. We do everything from pre-production scripting through full video editing and posting.',
      'Proven from zero: 1M+ organic views, 300+ consultations booked, zero ad spend.',
    ],
  },
  {
    id: 'ugc-creators',
    image: '/pages/marketing-ugc-creators.webp',
    title: 'UGC & Creator Collaborations',
    pitch:
      'Real people, real content, real trust. We connect your brand with creators who make your product look like something worth buying, because someone like them already believes it is.',
    points: ["The authenticity layer that scripted brand content can't replicate."],
  },
  {
    id: 'ai-creative',
    image: '/pages/marketing-ai-creative.webp',
    title: 'AI Creative Production',
    pitch: 'Studio-quality product visuals and ad creative, without the studio.',
    points: [
      'AI-generated videos, ads and product imagery for e-commerce brands.',
      'Removes the cost and lead time of professional photo shoots while still delivering premium-looking output.',
    ],
  },
]

export const performanceIntro = 'We run one platform, Meta, and we run it well. No spreading thin across five ad networks.'

export const performanceOfferings: Offering[] = [
  {
    id: 'lead-generation',
    image: '/pages/marketing-lead-generation.webp',
    title: 'Lead Generation for Service Businesses',
    pitch: 'For real estate firms, consultancies and professional services that need a steady, qualified pipeline, not just clicks.',
    points: [],
  },
  {
    id: 'ecommerce-advertising',
    image: '/pages/marketing-ecommerce-ads.webp',
    title: 'Performance Advertising for E-Commerce',
    pitch: 'For online brands that need Meta Ads built to drive sales, not just impressions.',
    points: [],
  },
]

export const seoIntro = {
  headline: 'Found on Google. Recommended by AI.',
  intro:
    'Search has split in two: people still type into Google, and now they also ask ChatGPT, Perplexity and Gemini. We optimize for both, so your business shows up wherever the question gets asked.',
  closing: 'SEO gets you found. AEO gets you recommended. We build for both from day one, not as an afterthought.',
  whyNow: 'More buyers are starting their research in an AI assistant before they ever open a search engine.',
}

export const seoBlock = {
  id: 'seo',
  title: 'SEO (Search Engine Optimization)',
  body: "Traditional SEO isn't dead, it's table stakes. We handle technical SEO (site speed, structure, mobile performance), on-page optimization (keywords, metadata, internal linking) and local/regional SEO for the markets that matter to your business, so you rank for the searches that actually lead to revenue, not just traffic.",
  lead: "Traditional SEO isn't dead, it's table stakes. We work so you rank for the searches that actually lead to revenue, not just traffic.",
  parts: [
    { title: 'Technical SEO', body: 'Site speed, structure and mobile performance.' },
    { title: 'On-page optimization', body: 'Keywords, metadata and internal linking.' },
    { title: 'Local and regional SEO', body: 'For the markets that matter to your business.' },
  ],
}

export const aeoBlock = {
  id: 'aeo',
  title: 'AEO (Answer Engine Optimization)',
  body: 'AI tools are becoming the first stop for research and recommendations. AEO means structuring your site\'s content so AI models can understand it, trust it, and cite it, so when someone asks an AI assistant for a recommendation in your industry, your business is part of the answer.',
  includes: [
    'Clear, structured content: FAQs and direct answers to common questions.',
    'Schema markup, so AI and search engines can parse the page correctly.',
    'Consistent, authoritative information about the business across the web (reviews, directories, citations) that AI models draw on when forming an answer.',
  ],
}

/**
 * FAQ block (Handover §8: "recommend adding a short FAQ block to the SEO &
 * AEO section"). Every answer restates claims already in §5 — no new
 * timelines, guarantees or statistics.
 */
export const seoFaq = [
  {
    question: 'What is AEO (Answer Engine Optimization)?',
    answer:
      "AEO means structuring your site's content so AI models can understand it, trust it and cite it. When someone asks an AI assistant for a recommendation in your industry, your business is part of the answer.",
  },
  {
    question: 'What is the difference between SEO and AEO?',
    answer:
      'SEO gets you found on search engines like Google. AEO gets you recommended by AI assistants like ChatGPT, Perplexity and Gemini. We build for both from day one.',
  },
  {
    question: 'What does AEO include?',
    answer:
      "Clear, structured content (FAQs and direct answers to common questions), schema markup so AI and search engines can parse each page correctly, and consistent, authoritative information about your business across the web, such as reviews, directories and citations.",
  },
  {
    question: 'What does your SEO work cover?',
    answer:
      'Technical SEO (site speed, structure, mobile performance), on-page optimization (keywords, metadata, internal linking) and local or regional SEO for the markets that matter to your business.',
  },
  {
    question: 'Does Frame n Flow Media do SEO for businesses outside India?',
    answer:
      'Yes. We work with brands across India, the US and the UK/Europe, and we tailor regional SEO to the markets that matter to each business.',
  },
]

/** Homepage process strip (§2): Discover → Build → Launch & Optimize → Grow. One line each, no jargon. */
export const processSteps = [
  { step: 'Discover', line: 'We learn your business, your customers and your goals before we design anything.' },
  { step: 'Build', line: 'Your website or software, designed around your business and coded by hand.' },
  { step: 'Launch & Optimize', line: 'We go live, then keep improving speed, search visibility and conversion.' },
  { step: 'Grow', line: 'Meta Ads, content, SEO and AEO bring qualified traffic to what we built.' },
]

/**
 * Web development project phases (Handover §7: "discovery, build, revisions,
 * launch, support window"). Deliberately no durations or support terms —
 * none are specified in the handover and pricing/scope is per project.
 */
export const projectPhases = [
  { phase: 'Discovery', line: 'We learn your business, your customers and what the site has to achieve.' },
  { phase: 'Build', line: 'Designed around your business and coded by hand, with your admin panel built in.' },
  { phase: 'Revisions', line: 'You review the work and we refine it with you until it is right.' },
  { phase: 'Launch', line: 'We take it live, connected and ready to convert visitors into leads or sales.' },
  { phase: 'Support window', line: 'After launch, we stay on hand while you get comfortable running it.' },
]
