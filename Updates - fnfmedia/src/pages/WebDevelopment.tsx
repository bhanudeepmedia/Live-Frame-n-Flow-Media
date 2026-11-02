import { developmentIntro, developmentOfferings, projectPhases } from '@/data/offerings'
import { builtWith } from '@/data/portfolio'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'
import ProcessFlow from '@/components/page/ProcessFlow'
import { PageHero, PageOffering, PageShell, ProofLink } from '@/components/page/PageParts'

const offeringWalls = ['services', 'work', 'green', 'hero']

/** Handover §3. Development leads the site (§1 "51/49"). */
export default function WebDevelopment() {
  const meta = pageMeta.webDevelopment
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Web Development', path: meta.path },
          ]),
          ...developmentOfferings.map((offering) =>
            serviceSchema({
              name: offering.title,
              description: offering.pitch,
              path: `${meta.path}#${offering.id}`,
            }),
          ),
        ]}
      />
      <PageHero
        wall="cases"
        eyebrow="Websites and custom software"
        headline={developmentIntro.headline}
        intro={developmentIntro.intro}
        art={{ src: '/pages/web-hero.webp', alt: 'A brass key beside a laptop showing a client website' }}
        cta
        link={{ label: 'See what we have built', to: '/portfolio' }}
      />
      {developmentOfferings.map((offering, index) => (
        <PageOffering
          key={offering.id}
          offering={offering}
          wall={offeringWalls[index]}
          kicker={`What we build, ${index + 1} of ${developmentOfferings.length}`}
          projects={builtWith[offering.id]}
        >
          {offering.id === 'custom-shopify-development' && (
            <ProofLink to="/custom-shopify-development">How we build custom Shopify stores</ProofLink>
          )}
        </PageOffering>
      ))}
      <ProcessFlow
        id="process"
        title="How a project runs"
        intro="Every project gets its own scope, and every one moves through the same five stages."
        steps={projectPhases.map((item) => ({ title: item.phase, body: item.line }))}
      />
    </PageShell>
  )
}
