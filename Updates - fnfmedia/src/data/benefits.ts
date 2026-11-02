/**
 * Why Us benefit cards — differentiators taken from the Handover (§1 one
 * integrated capability, boutique positioning; §3 "key phrases to use").
 */
export interface Benefit {
  title: string
  body: string
}

export const benefits: Benefit[] = [
  {
    title: 'Hand-coded, not templated',
    body: "We don't do templates. Every site is designed around your business and coded by hand.",
  },
  {
    title: 'Built for conversion',
    body: 'Bespoke visuals and conversion-focused copywriting, built to turn visitors into leads, not just to look good.',
  },
  {
    title: 'You own the backend',
    body: 'Every build ships with a custom admin panel, so you can update content, images and pages without calling a developer.',
  },
  {
    title: 'One team, one roadmap',
    body: 'We build the asset and drive the traffic to it, under one roof, with one point of contact.',
  },
  {
    title: 'Limited projects, real attention',
    body: 'We take on a limited number of projects at a time, so every client gets a studio that is fully invested.',
  },
]
