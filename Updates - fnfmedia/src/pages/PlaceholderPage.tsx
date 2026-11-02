import { Link } from 'react-router-dom'
import { ctaLabels, startProjectHref } from '@/data/site'
import { PageHero, PageShell } from '@/components/page/PageParts'
import Seo from '@/components/seo/Seo'

/**
 * RULE.md §8.1: every nav/footer link must reach a real destination, never
 * `href="#"`. The 34 reference screenshots only fully design the Home page
 * (PRD.md §9) — every other route in the site map is "Navigation-supported
 * / implementation inference." This is a real, functioning page for those
 * routes (not a fake link) rather than an invented full page design, which
 * RULE.md §8.3 forbids. Full designs land in a future phase per PHASES.md.
 */
export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <PageShell>
      <Seo meta={{ title: `${title} | Frame n Flow Media`, description: `${title} — Frame n Flow Media.`, path: window.location.pathname, noindex: true }} />
      <PageHero
        wall="work"
        eyebrow="Coming soon"
        headline={title}
        intro="This page is being prepared. In the meantime, tell us about your business and we'll be in touch."
      >
        <Link to={startProjectHref} className="wall-btn wall-btn--solid">
          {ctaLabels.primary}
        </Link>
      </PageHero>
    </PageShell>
  )
}
