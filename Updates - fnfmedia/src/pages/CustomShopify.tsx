import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { shopifyFaq, shopifyIntro, shopifyPoints, shopifySteps } from '@/data/offerings'
import { shopifyStores } from '@/data/portfolio'
import { pageMeta } from '@/data/seo'
import { ctaLabels, startProjectHref } from '@/data/site'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema'
import FaqList from '@/components/sections/FaqList'
import ProjectTiles from '@/components/page/ProjectTiles'
import ShopifyBuild from '@/components/page/ShopifyBuild'
import { PageHero, PageSection, PageShell, PageSteps, ProofLink } from '@/components/page/PageParts'

/** Handover §3. Each step of a custom Shopify build, in words and in a picture. */
export default function CustomShopify() {
  const meta = pageMeta.customShopify
  const [active, setActive] = useState(0)
  const stepsRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const steps = stepsRef.current?.children
    if (!steps) return
    // On a phone the picture holds the top half, so a step counts once it clears it.
    const line = window.matchMedia('(max-width: 900px)').matches ? '-72% 0px -26% 0px' : '-48% 0px -48% 0px'
    const watcher = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive([...steps].indexOf(entry.target))
        })
      },
      { rootMargin: line },
    )
    ;[...steps].forEach((step) => watcher.observe(step))
    return () => watcher.disconnect()
  }, [])

  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Our Services', path: '/services' },
            { name: 'Custom Shopify Development', path: meta.path },
          ]),
          serviceSchema({ name: 'Custom Shopify Development', description: shopifyIntro.intro, path: meta.path }),
          faqSchema(shopifyFaq),
        ]}
      />
      <PageHero
        wall="work"
        eyebrow="Custom Shopify development"
        headline={shopifyIntro.headline}
        intro={shopifyIntro.intro}
        art={{ src: '/pages/shopify-hero.webp', alt: 'A Shopify store we built, on a laptop and a phone' }}
        cta
        link={{ label: "See the stores we've built", to: '#stores' }}
      />

      <PageSection wall="globe" id="what-you-get" title="What makes it custom">
        <PageSteps columns={4} items={shopifyPoints} />
      </PageSection>

      <PageSection wall="work" id="how-we-build" title="How we build a custom Shopify store">
        <div className="shopify-build">
          <ol ref={stepsRef} className="shopify-steps">
            {shopifySteps.map((step, index) => (
              <li key={step.title} data-active={index === active} className="shopify-step">
                <span className="shopify-step__no">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <ShopifyBuild active={active} />
        </div>
      </PageSection>

      <PageSection
        wall="globe"
        id="stores"
        title="Shopify stores we've built"
        intro="Every tile opens the live store."
      >
        <ProjectTiles items={shopifyStores} className="project-tiles--three" />
      </PageSection>

      <PageSection wall="work" id="faq" title="Common questions">
        <div className="page-sheet">
          <FaqList items={shopifyFaq} />
        </div>
        <div className="page-actions">
          <Link to={startProjectHref} className="wall-btn wall-btn--solid">
            {ctaLabels.primary}
          </Link>
          <ProofLink to="/blog/custom-shopify-development-vs-theme">Read: custom Shopify or a theme?</ProofLink>
        </div>
      </PageSection>
    </PageShell>
  )
}
