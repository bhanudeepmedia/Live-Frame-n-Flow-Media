/**
 * Work / featured projects — real Frame n Flow Media client work. "quote"
 * holds the client's own real on-site tagline (not a fabricated customer
 * endorsement), attributed to the business itself.
 *
 * `images` drives the card's hover slideshow. The "-01" file in each
 * public/*-project-assets/ folder is a raw full-browser screenshot (nav
 * bar, promo strip, cut-off text) and is intentionally excluded — too messy
 * for a card. The other numbered files are the curated project imagery.
 */

export interface CaseStudyImage {
  src: string
  /** CSS object-position, for framing the interesting part of the shot. */
  position?: string
}

export interface CaseStudy {
  slug: string
  client: string
  gradient: string
  tags: string[]
  quote: string
  authorName: string
  authorRole: string
  images: CaseStudyImage[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'al-mulla',
    client: 'Al Mulla Carpentry',
    gradient: 'linear-gradient(135deg, #433415 0%, #151106 100%)',
    tags: ['Web Development', 'Branding'],
    quote: 'Crafting bespoke spaces where precision meets material excellence — since 2022.',
    authorName: 'Al Mulla Carpentry LLC',
    authorRole: 'Carpentry & Interiors — Ajman, UAE',
    images: [
      { src: '/almulla-project-assets/al-mulla-03.jpeg', position: 'center' },
      { src: '/almulla-project-assets/al-mulla-04.jpeg', position: 'center' },
      { src: '/almulla-project-assets/al-mulla-08.jpeg', position: 'center' },
    ],
  },
  {
    slug: 'jobridge',
    client: 'Jobridge',
    gradient: 'linear-gradient(135deg, #0d3787 0%, #071531 100%)',
    tags: ['Web Development', 'SaaS'],
    quote: 'We help businesses hire better talent, faster.',
    authorName: 'Jobridge',
    authorRole: 'Recruitment Technology Platform',
    images: [
      { src: '/jobridge-project-assets/jobridge-02.jpeg', position: 'center' },
      { src: '/jobridge-project-assets/jobridge-04.jpeg', position: 'center' },
      { src: '/jobridge-project-assets/jobridge-08.png', position: 'center' },
    ],
  },
  {
    slug: 'jugjis',
    client: "Jugji's",
    gradient: 'linear-gradient(135deg, #16643f 0%, #082518 100%)',
    tags: ['E-Commerce', 'Web Development'],
    quote: 'Healthy snacking, made simple.',
    authorName: "Jugji's",
    authorRole: 'Premium Dry Fruits & Nuts — D2C E-Commerce',
    images: [
      { src: '/jugjis-project-assets/jugjis-02.png', position: 'center' },
      { src: '/jugjis-project-assets/jugjis-05.png', position: 'center' },
      { src: '/jugjis-project-assets/jugjis-08.png', position: 'center' },
    ],
  },
  {
    slug: 'archstoreys',
    client: 'Archstoreys',
    gradient: 'linear-gradient(135deg, #24312a 0%, #0c110e 100%)',
    tags: ['Web Development', 'Architecture'],
    quote: 'Spaces that outlast trends.',
    authorName: 'Archstoreys',
    authorRole: 'Architecture, Interiors & Landscape Studio — India',
    images: [
      { src: '/archstoreys-project-assets/archstoreys-05.jpeg', position: 'center' },
      { src: '/archstoreys-project-assets/archstoreys-10.jpeg', position: 'center' },
      { src: '/archstoreys-project-assets/archstoreys-08.jpeg', position: 'center' },
    ],
  },
  {
    slug: 'the-rehva',
    client: 'theRehva',
    gradient: 'linear-gradient(135deg, #3a1c2e 0%, #150a11 100%)',
    tags: ['Web Development', 'Fashion'],
    quote: 'Stories we wear.',
    authorName: 'theRehva',
    authorRole: 'Streetwear & Graphic Fashion',
    images: [
      { src: '/the-rehva-project-assets/therehva-04.png', position: 'center' },
      { src: '/the-rehva-project-assets/therehva-07.png', position: 'center' },
      { src: '/the-rehva-project-assets/therehva-02.png', position: 'center' },
    ],
  },
]
