import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import Wall, { Lines } from '@/components/home/Wall'
import { clientVideo } from '@/data/home'
import { portfolio } from '@/data/portfolio'
import { flagshipProof } from '@/data/site'

/** The client on camera, in a clean card rather than a frame. Loads YouTube only on click. */
export function ClientVideo() {
  const [playing, setPlaying] = useState(false)
  const label = `Watch ${clientVideo.author}'s testimonial`

  return (
    <div className="client-video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${clientVideo.id}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" aria-label={label} onClick={() => setPlaying(true)}>
          <img src="/testimonials/ian-conway.webp" alt="" decoding="sync" />
          <span className="client-video__watch">
            <span className="client-video__play">
              <Play aria-hidden="true" className="h-6 w-6 fill-current" />
            </span>
            Watch Ian&apos;s video
          </span>
        </button>
      )}
    </div>
  )
}

/** Ian Conway's words and video, on a wall of their own after the case study. */
export function ClientWall() {
  return (
    <Wall wall="green" label="What our client says" exit="cascade" flow className="client-scene">
      <div className="wall__body">
        <figure className="testimonial m-0">
          <div>
            <blockquote>&ldquo;{clientVideo.quote}&rdquo;</blockquote>
            <figcaption>
              <strong>{clientVideo.author}</strong>
              {clientVideo.role}
            </figcaption>
          </div>
          <ClientVideo />
        </figure>
      </div>
    </Wall>
  )
}

export default function CasesWall() {
  return (
    <Wall id="case-studies" wall="cases" label="Case studies" exit="dolly" flow className="cases-scene">
      <div className="wall__body">
        <Lines className="wall-h" lines={['Real results,', 'not promises.']} />

        <article className="case-grid">
          <a href={portfolio[0].url} target="_blank" rel="noopener noreferrer" className="case-shot">
            <img src="/pages/grafton-home.webp" alt="The Grafton Vault website on a laptop" decoding="sync" />
          </a>
          <div className="case-copy">
            <span className="case-kicker">
              {flagshipProof.industry}, {flagshipProof.location}
            </span>
            <h3 className="case-name">{flagshipProof.client}</h3>
            <p className="wall-lead">{flagshipProof.summary}</p>
            <dl className="case-stats">
              {flagshipProof.stats.map((stat) => (
                <div key={stat.label}>
                  <dd>{stat.value}</dd>
                  <dt>{stat.label}</dt>
                </div>
              ))}
            </dl>
            <Link to="/portfolio#grafton-vault" className="case-link">
              Read the full case study
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>
    </Wall>
  )
}
