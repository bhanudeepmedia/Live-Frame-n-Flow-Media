import { aeoBlock, seoBlock, seoFaq, seoIntro } from '@/data/offerings'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema'
import FaqList from '@/components/sections/FaqList'
import { PageChecks, PageHero, PageSection, PageShell, PageSteps, ProofLink } from '@/components/page/PageParts'

/** Handover §5, plus the FAQ block §8 recommends for FAQPage schema. */
export default function SeoAeo() {
  const meta = pageMeta.seoAeo
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'SEO & AEO', path: meta.path },
          ]),
          serviceSchema({ name: 'SEO (Search Engine Optimization)', description: seoBlock.body, path: `${meta.path}#seo` }),
          serviceSchema({ name: 'AEO (Answer Engine Optimization)', description: aeoBlock.body, path: `${meta.path}#aeo` }),
          faqSchema(seoFaq),
        ]}
      />
      <PageHero
        wall="globe"
        eyebrow="SEO and AEO"
        headline={seoIntro.headline}
        intro={seoIntro.intro}
        art={{ src: '/pages/seo-search.webp', alt: 'A brass magnifying glass aimed at rising blocks' }}
        cta
      >
        <p className="page-note">{seoIntro.whyNow}</p>
      </PageHero>

      <PageSection wall="work" id={seoBlock.id} title="SEO: get found on Google" intro={seoBlock.lead}>
        <PageSteps columns={3} items={seoBlock.parts} />
        <ProofLink>See the results our content has driven</ProofLink>
      </PageSection>

      <PageSection wall="services" id={aeoBlock.id} title="AEO: get recommended by AI" intro={aeoBlock.body}>
        <span className="page-kicker">
          What this includes
        </span>
        <PageChecks items={aeoBlock.includes} />
      </PageSection>

      <PageSection wall="cases" id="faq" title="Common questions">
        <div className="page-sheet">
          <FaqList items={seoFaq} />
        </div>
      </PageSection>
    </PageShell>
  )
}
