import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import Wall, { Lines, WallFit } from '@/components/home/Wall'
import { heroColumns } from '@/data/portfolio'
import { ctaLabels, startProjectHref, trustLine } from '@/data/site'

/**
 * Text on one side of the wall, columns of real client sites on the other. On a
 * laptop the ledge is a clipped copy of the wall, sized the same so it lines up,
 * and the columns rise from behind it. On a phone the same copy fades the columns
 * into the wall at the foot of the screen. Each card opens the live site, and
 * hovering a column holds the strip still.
 *
 * Scrolling slides the columns across until websites fill the screen, then they
 * fade away to show the next section (`takeover` in useWallMotion). Only the
 * columns' plates, positions and opacity change, so nothing here repaints.
 */
export default function HeroWall() {
  const [paused, setPaused] = useState(false)

  return (
    <Wall wall="hero" label="Hero" exit="takeover" className="hero-scene">
      <div className="hero-copy">
        <Lines
          as="h1"
          className="poster"
          lines={['Websites', 'and marketing', 'that bring you', <em key="business">business.</em>]}
        />
        <p className="wall-lead">Custom websites, software, content and marketing. One team, built in India.</p>
        <div className="hero-actions">
          <Link to={startProjectHref} className="wall-btn wall-btn--solid">
            {ctaLabels.primary}
          </Link>
          <Link to="#work" className="wall-btn wall-btn--line">
            {ctaLabels.work}
          </Link>
        </div>
        <p className="hero-trust">{trustLine}</p>
      </div>

      <div aria-hidden="true" className="hero-dim" />

      <div className="hero-strip" data-paused={paused}>
        <div className="hero-band">
          {heroColumns.map((column, columnIndex) => {
            const waiting = columnIndex > 2
            return (
              <div key={columnIndex} className="hero-col">
                <span aria-hidden="true" className="hero-col__plate" />
                <div
                  className={`hero-run ${column.reverse ? 'hero-run--rev' : ''}`}
                  style={{ '--t': `${column.duration}s` } as React.CSSProperties}
                >
                  {[0, 1].map((copy) =>
                    column.items.map((item) => (
                      <a
                        key={`${copy}-${item.slug}`}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.name} website`}
                        aria-hidden={copy === 1 || waiting || undefined}
                        tabIndex={copy === 1 || waiting ? -1 : undefined}
                        className="hero-card"
                      >
                        <img loading={waiting ? 'lazy' : undefined} src={item.image} alt="" decoding="sync" />
                        <span aria-hidden="true" className="hero-card__go">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </a>
                    )),
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div aria-hidden="true" className="hero-ledge">
        <WallFit name="hero" />
      </div>

      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? 'Play moving websites' : 'Pause moving websites'}
        aria-pressed={paused}
        className="hero-pause"
      >
        {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </button>
    </Wall>
  )
}
