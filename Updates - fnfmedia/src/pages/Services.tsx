import { ArrowRight } from 'lucide-react'
import ServiceIcon from '@/components/home/ServiceIcon'
import Wall, { Lines } from '@/components/home/Wall'
import Go from '@/components/page/Go'
import { serviceBlocks } from '@/data/home'
import type { ServiceOption } from '@/data/home'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema } from '@/lib/schema'
import { PageHero, PageShell } from '@/components/page/PageParts'

const seoOptions: ServiceOption[] = [
  { label: 'Search engine optimization', href: '/seo-aeo#seo', brand: 'google', blurb: 'Technical SEO, on-page work and local SEO for the markets you sell in.' },
  { label: 'Answer engine optimization', href: '/seo-aeo#aeo', blurb: 'Content and schema that AI assistants can understand, trust and cite.' },
  { label: 'Common questions', href: '/seo-aeo#faq', blurb: 'Plain answers on what SEO and AEO cover, and how they differ.' },
]

/** SEO and AEO has its own page, so here it gets its own section rather than a row under Marketing. */
const services = [
  ...serviceBlocks.map((block) => ({ ...block, options: block.options.filter((option) => option.href !== '/seo-aeo') })),
  {
    id: 'seo-aeo',
    title: 'SEO and AEO',
    summary: 'Get found on Google, and get recommended by the AI assistants your customers already ask.',
    href: '/seo-aeo',
    image: '/pages/seo.webp',
    options: seoOptions,
  },
]

/** The four services at a glance, then what each one includes and a way into its own page. */
export default function Services() {
  const meta = pageMeta.services
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Services', path: meta.path },
          ]),
        ]}
      />
      <PageHero
        wall="work"
        headline="Our Services"
        intro="Websites, software, content, marketing and search, from one team on one roadmap. Here's what we do, and what each service includes."
        cta
        link={{ label: 'See our portfolio', to: '/portfolio' }}
        below={
          <ol className="service-index">
            {services.map((service, index) => (
              <li key={service.id}>
                <a href={`#${service.id}`}>
                  <span className="service-index__no">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{service.title}</strong>
                  <span>{service.summary}</span>
                </a>
              </li>
            ))}
          </ol>
        }
      />

      {services.map((service, index) => (
        <Wall key={service.id} id={service.id} wall="work" label={service.title}>
          <div className="wall__body service-band">
            <div className="service-band__head">
              <div className="page-split__copy">
                <span className="page-kicker">
                  Service {index + 1} of {services.length}
                </span>
                <Lines className="wall-h" lines={[service.title]} />
                <p className="wall-lead">{service.summary}</p>
                <Go href={service.href} className="wall-btn wall-btn--solid">
                  Learn more
                </Go>
              </div>
              <img loading={index ? 'lazy' : undefined} src={service.image} alt="" className="service-band__art" />
            </div>
            <div>
              <h3 className="service-band__label">What&apos;s included</h3>
              <ul className="service-grid">
                {service.options.map((option, optionIndex) => (
                  <li key={option.label}>
                    <Go href={option.href} className="service-tile">
                      <div className="service-tile__top">
                        <span aria-hidden="true" className="service-row__no">
                          {String(optionIndex + 1).padStart(2, '0')}
                        </span>
                        {option.brand && <ServiceIcon name={option.brand} />}
                      </div>
                      <strong>{option.label}</strong>
                      <span>{option.blurb}</span>
                      <ArrowRight aria-hidden="true" className="service-row__go" />
                    </Go>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Wall>
      ))}
    </PageShell>
  )
}
