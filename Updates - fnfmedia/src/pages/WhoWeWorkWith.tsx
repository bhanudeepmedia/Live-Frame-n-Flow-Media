import { Earth } from '@/components/home/GlobeWall'
import { featuredTestimonials } from '@/data/featured-testimonials'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema } from '@/lib/schema'
import { PageHero, PageSection, PageShell, PageSteps } from '@/components/page/PageParts'

/**
 * Handover §6-7: a dedicated "Who We Work With" page — industries served, and
 * the India-metro + international framing with client city/country named.
 * Industry notes only restate claims from the handover or verified projects.
 */
const industries: { name: string; note?: string }[] = [
  { name: 'Jewelry', note: 'Including our flagship case study for a fine jewellery brand in Dublin, Ireland.' },
  { name: 'Fashion', note: 'Streetwear and graphic fashion brands.' },
  { name: 'FMCG', note: 'Direct-to-consumer food brands, such as premium dry fruits and nuts.' },
  { name: 'Real estate', note: 'Meta Ads lead generation built for a steady, qualified pipeline, not just clicks.' },
  { name: 'Professional services', note: 'Consultancies and service firms that need a qualified pipeline.' },
  { name: 'Education', note: 'Institutes and online programmes, such as our website for IMBS, the Institute of Management and Business Studies.' },
]

const markets: { name: string; body: string }[] = [
  {
    name: 'India',
    body: 'We work with businesses across India, with a particular focus on Bangalore, Mumbai, Chennai and Hyderabad, where the concentration of ambitious, growing businesses is highest.',
  },
  {
    name: 'United States',
    body: 'For US brands we lead with what you can judge for yourself: the portfolio, client testimonials and a clear process.',
  },
  {
    name: 'UK & Europe',
    body: 'We work with clients across the UK and Europe, including Dublin, Ireland and Cyprus.',
  },
  {
    name: 'Rest of the world',
    body: 'From the UAE to wherever you are based. Everything runs remotely, so the distance never slows a project down.',
  },
]

export default function WhoWeWorkWith() {
  const meta = pageMeta.whoWeWorkWith
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Who We Work With', path: meta.path },
          ]),
        ]}
      />
      <PageHero
        wall="globe"
        eyebrow="Who We Work With"
        headline="Brands across India, the US, the UK, Europe and the rest of the world"
        intro="Frame n Flow Media is a boutique website, software and marketing studio. We take on a limited number of projects at a time, across industries and countries."
        aside={<Earth />}
        cta
        link={{ label: 'See who we have worked with', to: '/portfolio' }}
      />

      <PageSection wall="services" id="industries" title="Industries">
        <ul className="page-cards">
          {industries.map((industry) => (
            <li key={industry.name} className="page-card">
              <h3>{industry.name}</h3>
              {industry.note && <p>{industry.note}</p>}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection wall="cases" id="markets" title="Markets" intro="One studio, working across the world.">
        <PageSteps columns={4} items={markets.map((market) => ({ title: market.name, body: market.body }))} />
      </PageSection>

      <PageSection wall="work" title="What clients say" intro="Client words, with where they're based.">
        <ul className="page-cards" style={{ '--columns': 2 } as React.CSSProperties}>
          {featuredTestimonials.slice(0, 4).map((testimonial) => (
            <li key={testimonial.slug} className="page-card">
              <blockquote className="page-quote">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <p className="page-card__meta">
                {testimonial.name}, {testimonial.role} · {testimonial.company}
              </p>
            </li>
          ))}
        </ul>
      </PageSection>
    </PageShell>
  )
}
