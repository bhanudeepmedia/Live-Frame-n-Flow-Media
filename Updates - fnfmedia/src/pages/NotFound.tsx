import { Link } from 'react-router-dom'
import { PageHero, PageShell } from '@/components/page/PageParts'

/** PRD.md §9 — required system page. */
export default function NotFound() {
  return (
    <PageShell>
      <PageHero wall="work" eyebrow="404" headline="We couldn't find that page.">
        <Link to="/" className="wall-btn wall-btn--solid">
          Return home
        </Link>
      </PageHero>
    </PageShell>
  )
}
