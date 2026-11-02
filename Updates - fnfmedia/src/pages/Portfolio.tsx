import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ClientVideo } from '@/components/home/CasesWall'
import { featuredTestimonials } from '@/data/featured-testimonials'
import { clientVideo } from '@/data/home'
import { portfolio } from '@/data/portfolio'
import { flagshipProof } from '@/data/site'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema } from '@/lib/schema'
import ProjectTiles from '@/components/page/ProjectTiles'
import { PageHero, PageSection, PageShell, ProofLink } from '@/components/page/PageParts'

const flagship = portfolio[0]
const reviews = featuredTestimonials.filter((testimonial) => testimonial.slug !== 'ian-conway')

const columnCount = () => (window.matchMedia('(max-width: 639px)').matches ? 2 : 3)

/** Our websites running up beside the title. A card opens the live site, and hovering holds it still. */
function WebsiteWall() {
  const [count] = useState(columnCount)
  const columns = Array.from({ length: count }, (_, column) => portfolio.filter((_, index) => index % count === column))

  return (
    <div className="site-wall">
      {columns.map((items, column) => (
        <div key={column} className="hero-col">
          <div
            className={`hero-run ${column % 2 ? 'hero-run--rev' : ''}`}
            style={{ '--t': `${(52 + column * 6) * (items.length / 4)}s` } as React.CSSProperties}
          >
            {[0, 1].map((copy) =>
              items.map((item, index) => (
                <a
                  key={`${copy}-${item.slug}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} website`}
                  aria-hidden={copy === 1 || undefined}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="site-card"
                >
                  <span className="site-card__shot">
                    <img loading={copy || index > 1 ? 'lazy' : undefined} src={item.image} alt="" />
                    <span aria-hidden="true" className="hero-card__go">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </span>
                </a>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Moving websites beside the title, then a tile for every project, the case
 * study and every review. Only figures supplied in the handover are shown; no
 * metrics are invented for the other projects.
 */
export default function Portfolio() {
  const meta = pageMeta.portfolio
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Portfolio', path: meta.path },
          ]),
        ]}
      />
      <PageHero
        wall="work"
        headline="Our Portfolio"
        intro="The websites we've built for businesses across India, Ireland, the UK, the US, the UAE and Cyprus. Click any one to open it."
        className="portfolio-hero"
        cta
        aside={<WebsiteWall />}
      />

      <PageSection
        wall="work"
        id="projects"
        title="Businesses we've built with"
        intro="Every tile opens the live website."
      >
        <ProjectTiles items={portfolio} />
        <p className="work-note">
          <strong>This is a selection of our work.</strong> Many of our projects are covered by non-disclosure
          agreements, so we keep them off this page. We&apos;re happy to walk you through more of them, relevant to
          your business, on a discovery call.
        </p>
      </PageSection>

      <PageSection wall="globe" id="grafton-vault" title="Case studies" intro="Real results, not promises.">
        <article className="case-grid">
          <a href={flagship.url} target="_blank" rel="noopener noreferrer" className="case-shot">
            <img loading="lazy" src="/pages/grafton-case-study.webp" alt={`${flagship.name} website on a tablet`} />
          </a>
          <div className="case-copy">
            <span className="case-kicker">
              {flagshipProof.industry}, {flagshipProof.location}
            </span>
            <h3 className="case-name">{flagshipProof.client}</h3>
            <p className="wall-lead">
              {flagshipProof.summary} This is the founder-led model at work: the founder records raw footage, and we
              handle scripting, editing and posting.
            </p>
            <dl className="case-stats">
              {flagshipProof.stats.map((stat) => (
                <div key={stat.label}>
                  <dd>{stat.value}</dd>
                  <dt>{stat.label}</dt>
                </div>
              ))}
            </dl>
            <ProofLink to="/marketing#personal-branding">How Personal Branding for Founders works</ProofLink>
          </div>
        </article>
      </PageSection>

      <PageSection wall="work" id="reviews" title="What clients say">
        <figure className="testimonial m-0">
          <div>
            <blockquote>&ldquo;{clientVideo.quote}&rdquo;</blockquote>
            <figcaption>
              <strong>{clientVideo.author}</strong>
              {clientVideo.role}
            </figcaption>
          </div>
          <ClientVideo />
        </figure>
        <ul className="review-grid">
          {reviews.map((review) => (
            <li key={review.slug} className="page-card">
              <blockquote className="page-quote">&ldquo;{review.quote}&rdquo;</blockquote>
              <p className="page-card__meta">
                {review.name}, {review.company}
              </p>
            </li>
          ))}
        </ul>
      </PageSection>
    </PageShell>
  )
}
