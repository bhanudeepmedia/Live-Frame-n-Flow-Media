/**
 * Video testimonials — real, attributed Frame n Flow Media client quotes
 * (LEGACY_CONTENT.md §12). Ian Conway's is a real embedded YouTube
 * testimonial (youtube.com/embed/L_DryjVTpCY); the card's "Play video"
 * interaction opens a modal with the full quote for every entry (see
 * VideoTestimonialCard.tsx), so no video file is required either way.
 */
export interface VideoTestimonial {
  company: string
  quote: string
  author: string
  role: string
  accent: string
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    company: 'Ian Conway',
    quote: "I'm looking forward to working with Bhanu and his team for the next 20 years.",
    author: 'Ian Conway',
    role: 'Managing Director — Dublin, Ireland',
    accent: 'linear-gradient(160deg, #18181e 0%, #2e2e37 100%)',
  },
  {
    company: 'Mark',
    quote: 'Frame n Flow Media is a game changer.',
    author: 'Mark',
    role: 'Client — USA',
    accent: 'linear-gradient(160deg, #12141b 0%, #242936 100%)',
  },
  {
    company: 'Santosh',
    quote: 'Excellent result for the investment.',
    author: 'Santosh',
    role: 'Client — India',
    accent: 'linear-gradient(160deg, #15171c 0%, #262931 100%)',
  },
]
