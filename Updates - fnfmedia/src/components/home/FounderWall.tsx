import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Wall, { Lines } from '@/components/home/Wall'
import { PageChecks } from '@/components/page/PageParts'
import { founderPrinciples } from '@/data/home'

export default function FounderWall() {
  return (
    <Wall id="founder" wall="founder" label="Founder" exit="portal:.founder-photo" className="founder-scene">
      <div className="wall__body">
        <div className="founder-top">
          <div className="founder-head">
            <span className="case-kicker">
              Founder, Frame n Flow Media
            </span>
            <Lines className="poster founder-name" lines={['Bhanu', 'Deep']} />
          </div>
          <div className="founder-copy">
            <p className="wall-lead">
              A strategist who believes a website should be your hardest-working salesperson, not an online brochure.
            </p>
            <PageChecks inline items={founderPrinciples.map((principle) => principle.title)} />
            <div className="founder-foot">
              <Link to="/founder-bhanudeep" className="case-link">
                Read the full story
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <span data-sign role="img" aria-label="Bhanu Deep's autograph" className="autograph" />
            </div>
          </div>
          <figure data-hang className="wall-frame founder-photo">
            <img
              src="/founder/bhanu-deep.webp"
              alt="Bhanu Deep, founder of Frame n Flow Media"
              width="1086"
              height="1448"
              decoding="sync"
            />
          </figure>
        </div>
      </div>
    </Wall>
  )
}
