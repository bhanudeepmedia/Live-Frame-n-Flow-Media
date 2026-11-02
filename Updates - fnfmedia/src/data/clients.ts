/**
 * Client Trust logo roster — real Frame n Flow Media client projects.
 * Al Mulla, Archstoreys, Jobridge, Jugji's and theRehva are verified from
 * the real project screenshots in public/*-project-assets/; the rest are
 * from the web-dev portfolio list (LEGACY_CONTENT.md §9A). No dedicated
 * case-study pages exist, so every logo links to /case-studies rather than a
 * fabricated case-study slug.
 */
export interface ClientLogo {
  name: string
  href?: string
}

export const clientTrustLogos: ClientLogo[] = [
  { name: 'Al Mulla Carpentry', href: '/portfolio' },
  { name: 'Archstoreys', href: '/portfolio' },
  { name: 'Jobridge', href: '/portfolio' },
  { name: "Jugji's", href: '/portfolio' },
  { name: 'theRehva', href: '/portfolio' },
  { name: 'Nihira Finserv', href: '/portfolio' },
  { name: 'The Grafton Vault', href: '/portfolio' },
  { name: 'IMBS', href: '/portfolio' },
  { name: 'Connvel', href: '/portfolio' },
]

/** Industry tags for the trust bar (Handover §2). */
export const industryTags = ['Jewelry', 'Fashion', 'Real estate', 'Professional services', 'E-commerce']
