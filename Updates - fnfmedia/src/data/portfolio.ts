/**
 * Portfolio mockups in the user's priority order. The homepage shows the first
 * ten; the projects page shows all of them. Every card opens `url`, the live site.
 */
export interface PortfolioItem {
  slug: string
  name: string
  image: string
  url: string
  /** What the business does and how it was built, shown under its tile. */
  kind: string
}

export const portfolio: PortfolioItem[] = [
  { slug: 'the-grafton-vault', name: 'The Grafton Vault', image: '/portfolio/01-the-grafton-vault.webp', url: 'https://thegraftonvault.com/', kind: 'Fine jewellery, Dublin' },
  { slug: 'therehva', name: 'theRehva', image: '/portfolio/02-therehva.webp', url: 'https://therehva.com/', kind: 'Streetwear, custom Shopify' },
  { slug: 'zhai-farms', name: 'Zhai Farms', image: '/portfolio/03-zhai-farms.webp', url: 'https://zhaifarms.vercel.app/', kind: 'Custom-coded e-commerce' },
  { slug: 'archstoreys', name: 'Archstoreys', image: '/portfolio/04-archstoreys.webp', url: 'https://archstoreys.in/', kind: 'Architecture studio, custom-coded' },
  { slug: 'al-mulla-carpentry', name: 'Al Mulla Carpentry', image: '/portfolio/05-al-mulla-carpentry.webp', url: 'https://almullacarpentry.com/', kind: 'Carpentry and interiors, UAE' },
  { slug: 'jobridge', name: 'Jobridge', image: '/portfolio/06-jobridge.webp', url: 'https://jobridge.co.in/', kind: 'Recruitment platform, custom-coded' },
  { slug: 'imbs', name: 'IMBS', image: '/portfolio/07-imbs.webp', url: 'https://imbs.org.in/', kind: 'Online education' },
  { slug: 'myalthomes', name: 'MyALThomes', image: '/portfolio/08-myalthomes-workation-hubs.webp', url: 'https://workationhubs.com/', kind: 'Workation stays, custom-coded' },
  { slug: 'tarz-taana', name: 'Tarz & Taana', image: '/portfolio/09-tarz-taana.webp', url: 'https://tarztaana.com/', kind: 'Custom Shopify store' },
  { slug: 'fnfm-content', name: 'FNFM Content', image: '/portfolio/10-fnf-content-site.webp', url: 'https://framenflowmediacom.netlify.app/', kind: 'Content service website' },
  { slug: 'jugjis', name: "Jugji's", image: '/portfolio/11-jugjis.webp', url: 'https://jugjis.myshopify.com/', kind: 'Dry fruits and nuts, custom Shopify' },
  { slug: 'house-of-ikaki', name: 'House of Ikaki', image: '/portfolio/12-house-of-ikaki.webp', url: 'https://houseofikaki.myshopify.com/', kind: 'Custom Shopify store' },
  { slug: '642-stitches', name: '642 Stitches', image: '/portfolio/13-642-stitches.webp', url: 'https://ds0adq-3n.myshopify.com/', kind: 'Custom Shopify store' },
  { slug: 'mango-stays', name: 'Mango Stays', image: '/portfolio/14-mango-stays.webp', url: 'https://mangostays.hostingersite.com/', kind: 'Villa stays, custom-coded' },
  { slug: 'tanvis-greeting-cards', name: 'Tanvis Greeting Cards', image: '/portfolio/15-tanvis-greeting-cards.webp', url: 'https://lightsalmon-beaver-934008.hostingersite.com/', kind: 'Greeting cards, custom-coded' },
  { slug: 'sakura-studio', name: 'Sakura Studio', image: '/portfolio/16-sakura-studio.webp', url: 'https://sakurastudio.in/', kind: 'Korean fashion, custom Shopify' },
]

const bySlug = (slug: string) => portfolio.find((item) => item.slug === slug) as PortfolioItem

/**
 * The hero shows the first three columns. The rest wait off the right of the
 * screen and slide in as the visitor scrolls, until websites fill the screen.
 */
export const heroColumns: { items: PortfolioItem[]; duration: number; reverse?: boolean }[] = [
  { items: ['the-grafton-vault', 'archstoreys', 'imbs', 'fnfm-content'].map(bySlug), duration: 38 },
  { items: ['therehva', 'al-mulla-carpentry', 'myalthomes', 'zhai-farms'].map(bySlug), duration: 32, reverse: true },
  { items: ['zhai-farms', 'jobridge', 'tarz-taana', 'mango-stays'].map(bySlug), duration: 44 },
  { items: ['jugjis', 'sakura-studio', 'tanvis-greeting-cards', 'house-of-ikaki'].map(bySlug), duration: 36, reverse: true },
  { items: ['642-stitches', 'the-grafton-vault', 'jobridge', 'archstoreys'].map(bySlug), duration: 40 },
  { items: ['al-mulla-carpentry', 'fnfm-content', 'therehva', 'imbs'].map(bySlug), duration: 34, reverse: true },
  { items: ['house-of-ikaki', 'myalthomes', 'jugjis', 'tarz-taana'].map(bySlug), duration: 42 },
]

export const homePortfolio = portfolio.slice(0, 10)

/** Live sites checked on 2026-11-01: each list holds only sites really built that way. */
const pick = (slugs: string[]) => slugs.map(bySlug)

export const shopifyStores = pick(['jugjis', 'therehva', 'sakura-studio', 'tarz-taana', 'house-of-ikaki', '642-stitches'])

export const builtWith: Record<string, PortfolioItem[]> = {
  'custom-coded-websites': pick(['archstoreys', 'myalthomes', 'mango-stays', 'fnfm-content']),
  'custom-coded-ecommerce': pick(['zhai-farms', 'tanvis-greeting-cards']),
  'custom-shopify-development': shopifyStores,
  'custom-software-development': pick(['jobridge']),
}
