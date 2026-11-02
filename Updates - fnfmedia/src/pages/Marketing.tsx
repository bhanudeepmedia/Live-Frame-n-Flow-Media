import { marketingIntro, organicOfferings, performanceIntro, performanceOfferings } from '@/data/offerings'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'
import { PageHero, PageOffering, PageSection, PageShell, ProofLink } from '@/components/page/PageParts'

const organicWalls = ['work', 'cases', 'services']

/** Handover §4. Outcome-focused (leads, pipeline, sales), not vanity metrics. */
export default function Marketing() {
  const meta = pageMeta.marketing
  const all = [
    ...organicOfferings,
    { id: 'performance-marketing', title: 'Performance Marketing (Meta Ads)', pitch: performanceIntro },
  ]
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Marketing', path: meta.path },
          ]),
          ...all.map((offering) =>
            serviceSchema({ name: offering.title, description: offering.pitch, path: `${meta.path}#${offering.id}` }),
          ),
        ]}
      />
      <PageHero
        wall="founder"
        eyebrow="Marketing"
        headline={marketingIntro.headline}
        intro={marketingIntro.intro}
        art={{ src: '/pages/marketing-hero.webp', alt: 'A vintage telephone and a brass megaphone on a plinth' }}
        cta
        link={{ label: 'See the results', to: '/portfolio#grafton-vault' }}
      />
      {organicOfferings.map((offering, index) => (
        <PageOffering
          key={offering.id}
          offering={offering}
          wall={organicWalls[index]}
          kicker={`Organic marketing, ${index + 1} of ${organicOfferings.length}`}
        >
          {index === 0 && <ProofLink>See the results from zero</ProofLink>}
        </PageOffering>
      ))}
      <PageSection wall="green" id="performance-marketing" title="Performance Marketing (Meta Ads)" intro={performanceIntro}>
        <div className="page-cards" style={{ '--columns': 2 } as React.CSSProperties}>
          {performanceOfferings.map((offering) => (
            <article key={offering.id} id={offering.id} className="page-card">
              <img loading="lazy" src={offering.image} alt="" className="page-card__media" />
              <h3>{offering.title}</h3>
              <p>{offering.pitch}</p>
            </article>
          ))}
        </div>
      </PageSection>
    </PageShell>
  )
}
