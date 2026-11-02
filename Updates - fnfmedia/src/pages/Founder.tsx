import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { founderPrinciples } from '@/data/home'
import { contactChannels, ctaLabels, socialProfiles, startProjectHref } from '@/data/site'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema, personSchema } from '@/lib/schema'
import { PageHero, PageSection, PageShell, PageSteps } from '@/components/page/PageParts'

/**
 * Founder profile, carried over from the previous site at the same URL so its
 * rankings and the Person entity (for the knowledge panel) are kept. Story is
 * the original, reframed around web development as the lead service.
 */
export default function Founder() {
  const meta = pageMeta.founder
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          personSchema({
            name: 'Bhanu Deep',
            jobTitle: 'Founder & Chief Strategist',
            description: meta.description,
            path: meta.path,
            image: '/founder/bhanu-deep.webp',
            knowsAbout: ['Web Development', 'Marketing Strategy', 'Performance Marketing', 'SEO', 'Answer Engine Optimization'],
            sameAs: socialProfiles,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Founder', path: meta.path },
          ]),
        ]}
      />

      <PageHero
        wall="founder"
        poster
        eyebrow="Founder, Frame n Flow Media"
        headline="Bhanu Deep"
        intro="Founder of Frame n Flow Media. A strategist who believes a website should be your hardest-working salesperson, not an online brochure."
        aside={
          <figure data-hang className="wall-frame page-photo">
            <img
              src="/founder/bhanu-deep.webp"
              alt="Bhanu Deep, founder of Frame n Flow Media"
              width="1086"
              height="1448"
              decoding="sync"
            />
            <figcaption>Founder &amp; Chief Strategist · Built in India</figcaption>
          </figure>
        }
      >
        <div className="page-actions">
          <Link to={startProjectHref} className="wall-btn wall-btn--solid">
            {ctaLabels.primary}
          </Link>
          <a href={contactChannels.calendly} target="_blank" rel="noopener noreferrer" className="case-link">
            Book a call with Bhanu
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <span data-sign role="img" aria-label="Bhanu Deep's autograph" className="autograph" />
      </PageHero>

      <PageSection wall="cases" label="The story">
        <blockquote className="page-closing">
          &ldquo;I started Frame n Flow Media because I was tired of seeing brilliant businesses fail due to{' '}
          <em>poor visibility</em>.&rdquo;
        </blockquote>
        <div className="page-story">
          <div>
            <p>
              In the early days of my career, I noticed a recurring pattern. Companies were spending on &ldquo;pretty&rdquo;
              work that generated zero revenue. They were chasing likes, not leads.
            </p>
            <p>
              I realised the agency model was broken. It was too focused on deliverables and not focused enough on
              outcomes.
            </p>
          </div>
          <div>
            <p>
              So I built something different: a studio that starts with the website, the one asset a business fully
              owns, and engineers it to be fast, findable and built to convert.
            </p>
            <p>
              Marketing, SEO and AEO come next, bringing qualified traffic to what we build. One team, one roadmap, end
              to end.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        wall="work"
        title="The core philosophy"
        intro="Bhanu personally oversees the strategy for every project we take on."
      >
        <PageSteps numbered columns={3} items={founderPrinciples} />
      </PageSection>
    </PageShell>
  )
}
