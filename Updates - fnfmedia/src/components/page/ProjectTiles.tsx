import { ArrowUpRight } from 'lucide-react'
import type { PortfolioItem } from '@/data/portfolio'

/** One tile to a project, each opening its live site. Mockups always show whole. */
export default function ProjectTiles({ items, className = '' }: { items: PortfolioItem[]; className?: string }) {
  return (
    <ul className={`project-tiles ${className}`}>
      {items.map((item) => (
        <li key={item.slug} id={item.slug}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="project-tile">
            <span className="project-tile__shot">
              <img src={item.image} alt={`${item.name} website`} loading="lazy" />
              <span aria-hidden="true" className="hero-card__go">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </span>
            <strong>{item.name}</strong>
            <span>{item.kind}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
