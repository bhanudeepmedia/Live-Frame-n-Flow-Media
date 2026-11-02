/**
 * Hero mosaic tile roster — real Frame n Flow Media project photography,
 * sourced directly from public/*-project-assets/ (the only client work with
 * source imagery). Each tile links to its project's anchor on /case-studies — never a fabricated
 * destination (RULE.md no-fabrication policy).
 */

export interface MosaicTile {
  id: string
  href: string
  name: string
  image: string
  imageAlt: string
  /** CSS object-position for the cover-cropped image; defaults to 'center'. */
  objectPosition?: string
  /** Overlay tint shown on hover, brand-adjacent to the real project. */
  gradient: string
  foreground: string
}

export interface MosaicColumn {
  id: string
  tiles: MosaicTile[]
  duration: number
  direction: 'normal' | 'reverse'
}

const columnOne: MosaicTile[] = [
  {
    id: 'al-mulla-interior',
    href: '/portfolio#al-mulla',
    name: 'Al Mulla Carpentry',
    image: '/almulla-project-assets/al-mulla-10.jpeg',
    imageAlt: 'Al Mulla Carpentry bespoke interior fit-out',
    gradient: 'linear-gradient(155deg, rgba(67,52,21,0.92) 0%, rgba(21,17,6,0.94) 100%)',
    foreground: '#f8ce4c',
  },
  {
    id: 'jobridge-mood',
    href: '/portfolio#jobridge',
    name: 'Jobridge',
    image: '/jobridge-project-assets/jobridge-06.png',
    imageAlt: 'Jobridge brand identity mood board',
    gradient: 'linear-gradient(155deg, rgba(13,55,135,0.92) 0%, rgba(7,21,49,0.94) 100%)',
    foreground: '#f8f8f8',
  },
  {
    id: 'archstoreys-facade',
    href: '/portfolio#archstoreys',
    name: 'Archstoreys',
    image: '/archstoreys-project-assets/archstoreys-10.jpeg',
    imageAlt: 'Archstoreys architectural facade detail',
    gradient: 'linear-gradient(155deg, rgba(46,50,57,0.92) 0%, rgba(13,15,22,0.94) 100%)',
    foreground: '#e8ecf2',
  },
  {
    id: 'jugjis-lifestyle',
    href: '/portfolio#jugjis',
    name: "Jugji's",
    image: '/jugjis-project-assets/jugjis-06.jpeg',
    imageAlt: "Jugji's dried fruit lifestyle photography",
    gradient: 'linear-gradient(155deg, rgba(22,100,63,0.92) 0%, rgba(8,37,24,0.94) 100%)',
    foreground: '#f8f8f8',
  },
]

const columnTwo: MosaicTile[] = [
  {
    id: 'therehva-portrait',
    href: '/portfolio#the-rehva',
    name: 'theRehva',
    image: '/the-rehva-project-assets/therehva-04.png',
    imageAlt: 'theRehva apparel lifestyle shoot at India Gate',
    objectPosition: 'top',
    gradient: 'linear-gradient(155deg, rgba(65,47,27,0.92) 0%, rgba(21,15,9,0.94) 100%)',
    foreground: '#f8f0e2',
  },
  {
    id: 'archstoreys-night',
    href: '/portfolio#archstoreys',
    name: 'Archstoreys',
    image: '/archstoreys-project-assets/archstoreys-05.jpeg',
    imageAlt: 'Archstoreys residence exterior at dusk',
    gradient: 'linear-gradient(155deg, rgba(76,68,11,0.92) 0%, rgba(30,26,4,0.94) 100%)',
    foreground: '#f8ce4c',
  },
  {
    id: 'therehva-teastall',
    href: '/portfolio#the-rehva',
    name: 'theRehva',
    image: '/the-rehva-project-assets/therehva-07.png',
    imageAlt: 'theRehva apparel lifestyle shoot at a tea stall',
    gradient: 'linear-gradient(155deg, rgba(65,47,27,0.92) 0%, rgba(21,15,9,0.94) 100%)',
    foreground: '#f8f0e2',
  },
]

const columnThree: MosaicTile[] = [
  {
    id: 'al-mulla-detail',
    href: '/portfolio#al-mulla',
    name: 'Al Mulla Carpentry',
    image: '/almulla-project-assets/al-mulla-11.jpeg',
    imageAlt: 'Al Mulla Carpentry material detail',
    gradient: 'linear-gradient(155deg, rgba(67,52,21,0.92) 0%, rgba(21,17,6,0.94) 100%)',
    foreground: '#f8ce4c',
  },
  {
    id: 'jugjis-hamper',
    href: '/portfolio#jugjis',
    name: "Jugji's",
    image: '/jugjis-project-assets/jugjis-08.png',
    imageAlt: "Jugji's premium dry fruit gift hamper",
    gradient: 'linear-gradient(155deg, rgba(22,100,63,0.92) 0%, rgba(8,37,24,0.94) 100%)',
    foreground: '#f8f8f8',
  },
  {
    id: 'therehva-tee',
    href: '/portfolio#the-rehva',
    name: 'theRehva',
    image: '/the-rehva-project-assets/therehva-08.png',
    imageAlt: 'theRehva printed t-shirt detail',
    gradient: 'linear-gradient(155deg, rgba(65,47,27,0.92) 0%, rgba(21,15,9,0.94) 100%)',
    foreground: '#f8f0e2',
  },
]

export const heroTopRibbon: MosaicTile[] = [
  {
    id: 'top-al-mulla-interior',
    href: '/portfolio#al-mulla',
    name: 'Al Mulla Carpentry',
    image: '/almulla-project-assets/al-mulla-10.jpeg',
    imageAlt: 'Al Mulla Carpentry bespoke interior fit-out',
    gradient: 'linear-gradient(155deg, rgba(67,52,21,0.92) 0%, rgba(21,17,6,0.94) 100%)',
    foreground: '#f8ce4c',
  },
  {
    id: 'top-jobridge-mood',
    href: '/portfolio#jobridge',
    name: 'Jobridge',
    image: '/jobridge-project-assets/jobridge-06.png',
    imageAlt: 'Jobridge brand identity mood board',
    gradient: 'linear-gradient(155deg, rgba(13,55,135,0.92) 0%, rgba(7,21,49,0.94) 100%)',
    foreground: '#f8f8f8',
  },
  {
    id: 'top-therehva-portrait',
    href: '/portfolio#the-rehva',
    name: 'theRehva',
    image: '/the-rehva-project-assets/therehva-04.png',
    imageAlt: 'theRehva apparel lifestyle shoot at India Gate',
    objectPosition: 'top',
    gradient: 'linear-gradient(155deg, rgba(65,47,27,0.92) 0%, rgba(21,15,9,0.94) 100%)',
    foreground: '#f8f0e2',
  },
  {
    id: 'top-archstoreys-facade',
    href: '/portfolio#archstoreys',
    name: 'Archstoreys',
    image: '/archstoreys-project-assets/archstoreys-10.jpeg',
    imageAlt: 'Archstoreys architectural facade detail',
    gradient: 'linear-gradient(155deg, rgba(46,50,57,0.92) 0%, rgba(13,15,22,0.94) 100%)',
    foreground: '#e8ecf2',
  },
  {
    id: 'top-jugjis-lifestyle',
    href: '/portfolio#jugjis',
    name: "Jugji's",
    image: '/jugjis-project-assets/jugjis-06.jpeg',
    imageAlt: "Jugji's dried fruit lifestyle photography",
    gradient: 'linear-gradient(155deg, rgba(22,100,63,0.92) 0%, rgba(8,37,24,0.94) 100%)',
    foreground: '#f8f8f8',
  },
  {
    id: 'top-al-mulla-06',
    href: '/portfolio#al-mulla',
    name: 'Al Mulla Carpentry',
    image: '/almulla-project-assets/al-mulla-06.jpeg',
    imageAlt: 'Al Mulla Carpentry architectural woodwork',
    gradient: 'linear-gradient(155deg, rgba(67,52,21,0.92) 0%, rgba(21,17,6,0.94) 100%)',
    foreground: '#f8ce4c',
  },
  {
    id: 'top-therehva-01',
    href: '/portfolio#the-rehva',
    name: 'theRehva',
    image: '/the-rehva-project-assets/therehva-01.png',
    imageAlt: 'theRehva digital storefront design',
    gradient: 'linear-gradient(155deg, rgba(65,47,27,0.92) 0%, rgba(21,15,9,0.94) 100%)',
    foreground: '#f8f0e2',
  },
]

export const heroBottomRibbon: MosaicTile[] = [
  {
    id: 'bot-jobridge-03',
    href: '/portfolio#jobridge',
    name: 'Jobridge',
    image: '/jobridge-project-assets/jobridge-03.png',
    imageAlt: 'Jobridge platform interface showcase',
    gradient: 'linear-gradient(155deg, rgba(13,55,135,0.92) 0%, rgba(7,21,49,0.94) 100%)',
    foreground: '#f8f8f8',
  },
  {
    id: 'bot-therehva-teastall',
    href: '/portfolio#the-rehva',
    name: 'theRehva',
    image: '/the-rehva-project-assets/therehva-07.png',
    imageAlt: 'theRehva apparel lifestyle shoot at a tea stall',
    gradient: 'linear-gradient(155deg, rgba(65,47,27,0.92) 0%, rgba(21,15,9,0.94) 100%)',
    foreground: '#f8f0e2',
  },
  {
    id: 'bot-archstoreys-night',
    href: '/portfolio#archstoreys',
    name: 'Archstoreys',
    image: '/archstoreys-project-assets/archstoreys-05.jpeg',
    imageAlt: 'Archstoreys residence exterior at dusk',
    gradient: 'linear-gradient(155deg, rgba(76,68,11,0.92) 0%, rgba(30,26,4,0.94) 100%)',
    foreground: '#f8ce4c',
  },
  {
    id: 'bot-jugjis-hamper',
    href: '/portfolio#jugjis',
    name: "Jugji's",
    image: '/jugjis-project-assets/jugjis-08.png',
    imageAlt: "Jugji's premium dry fruit gift hamper",
    gradient: 'linear-gradient(155deg, rgba(22,100,63,0.92) 0%, rgba(8,37,24,0.94) 100%)',
    foreground: '#f8f8f8',
  },
  {
    id: 'bot-al-mulla-detail',
    href: '/portfolio#al-mulla',
    name: 'Al Mulla Carpentry',
    image: '/almulla-project-assets/al-mulla-11.jpeg',
    imageAlt: 'Al Mulla Carpentry material detail',
    gradient: 'linear-gradient(155deg, rgba(67,52,21,0.92) 0%, rgba(21,17,6,0.94) 100%)',
    foreground: '#f8ce4c',
  },
  {
    id: 'bot-therehva-tee',
    href: '/portfolio#the-rehva',
    name: 'theRehva',
    image: '/the-rehva-project-assets/therehva-08.png',
    imageAlt: 'theRehva printed t-shirt detail',
    gradient: 'linear-gradient(155deg, rgba(65,47,27,0.92) 0%, rgba(21,15,9,0.94) 100%)',
    foreground: '#f8f0e2',
  },
  {
    id: 'bot-archstoreys-07',
    href: '/portfolio#archstoreys',
    name: 'Archstoreys',
    image: '/archstoreys-project-assets/archstoreys-07.jpeg',
    imageAlt: 'Archstoreys modern interior space',
    gradient: 'linear-gradient(155deg, rgba(46,50,57,0.92) 0%, rgba(13,15,22,0.94) 100%)',
    foreground: '#e8ecf2',
  },
]

export const heroMosaicColumns: MosaicColumn[] = [
  { id: 'col-1', tiles: columnOne, duration: 52, direction: 'normal' },
  { id: 'col-2', tiles: columnTwo, duration: 68, direction: 'reverse' },
  { id: 'col-3', tiles: columnThree, duration: 58, direction: 'normal' },
]
