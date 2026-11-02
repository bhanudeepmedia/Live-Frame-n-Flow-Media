import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Wall, { Lines } from '@/components/home/Wall'
import { homePortfolio } from '@/data/portfolio'

export default function WorkWall() {
  return (
    <Wall id="work" wall="work" label="Businesses we've built with" exit="tilt" flow className="work-scene">
      <div className="wall__body">
        <Lines className="wall-h" lines={["Businesses we've built with"]} />
        <div className="work-grid">
          {homePortfolio.map((item) => (
            <a key={item.slug} href={item.url} target="_blank" rel="noopener noreferrer" className="work-card">
              <span className="work-card__shot">
                <img src={item.image} alt={`${item.name} website`} decoding="sync" />
                <span aria-hidden="true" className="hero-card__go">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </span>
              <span className="work-card__name">{item.name}</span>
            </a>
          ))}
        </div>
        <Link to="/portfolio" className="wall-btn wall-btn--solid w-fit">
          See all projects
        </Link>
      </div>
    </Wall>
  )
}
