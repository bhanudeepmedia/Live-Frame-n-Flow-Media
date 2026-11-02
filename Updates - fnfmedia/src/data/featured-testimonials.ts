/**
 * Featured Testimonial selector — real, attributed Frame n Flow Media
 * client quotes (LEGACY_CONTENT.md §12). Ian Conway's video testimonial and
 * the "Ian (Ireland)" marquee quote are recorded separately in the source
 * material, so both are kept as distinct entries rather than merged.
 */
export interface FeaturedTestimonial {
  slug: string
  name: string
  role: string
  company: string
  quote: string
  initials: string
  accent: string
}

export const featuredTestimonials: FeaturedTestimonial[] = [
  {
    slug: 'ian-conway',
    name: 'Ian Conway',
    role: 'Managing Director',
    company: 'Dublin, Ireland',
    quote: "I'm looking forward to working with Bhanu and his team for the next 20 years.",
    initials: 'IC',
    accent: 'linear-gradient(135deg, #5f28e0, #240e5f)',
  },
  {
    slug: 'ian',
    name: 'Ian',
    role: 'Client',
    company: 'Ireland',
    quote: "I'm very happy with the work, the page looks great.",
    initials: 'I',
    accent: 'linear-gradient(135deg, #35a943, #09541c)',
  },
  {
    slug: 'philio',
    name: 'Philio',
    role: 'Client',
    company: 'Cyprus',
    quote: 'Bhanu Deep is exceptional!!',
    initials: 'P',
    accent: 'linear-gradient(135deg, #1860d3, #08285c)',
  },
  {
    slug: 'santosh',
    name: 'Santosh',
    role: 'Client',
    company: 'India',
    quote: 'Excellent result for the investment.',
    initials: 'S',
    accent: 'linear-gradient(135deg, #2e2e37, #18181e)',
  },
  {
    slug: 'mark',
    name: 'Mark',
    role: 'Client',
    company: 'USA',
    quote: 'Frame n Flow Media is a game changer.',
    initials: 'M',
    accent: 'linear-gradient(135deg, #262931, #15171c)',
  },
]
