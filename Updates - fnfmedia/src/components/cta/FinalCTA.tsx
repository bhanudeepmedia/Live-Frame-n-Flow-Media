import { Link } from 'react-router-dom'
import { ctaLabels, startProjectHref } from '@/data/site'
import CTAMediaStack from '@/components/cta/CTAMediaStack'
import { Lines } from '@/components/home/Wall'

/** The closing call to action, the top of the footer wall. Client sites trail behind the text on hover. */
export default function FinalCTA() {
  return (
    <div className="site-end__cta">
      <CTAMediaStack />
      <div className="wall__body">
        <Lines className="poster" lines={["Let's build", 'something', 'that works']} />
        <p className="wall-lead">
          Tell us about your business. We&apos;ll tell you exactly what it needs.
        </p>
        <Link to={startProjectHref} className="wall-btn wall-btn--solid">
          {ctaLabels.primary}
        </Link>
      </div>
    </div>
  )
}
