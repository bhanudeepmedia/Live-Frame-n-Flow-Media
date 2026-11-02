import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import useWallMotion from '@/components/home/useWallMotion'
import { PlainWalls } from '@/components/home/plainWalls'
import Wall, { Lines } from '@/components/home/Wall'
import ProjectTiles from '@/components/page/ProjectTiles'
import useReveal from '@/components/page/useReveal'
import { ctaLabels, startProjectHref } from '@/data/site'
import type { Offering } from '@/data/offerings'
import type { PortfolioItem } from '@/data/portfolio'
import '@/components/home/home.css'
import '@/components/page/page.css'

/** Only Home keeps the painted `walls` and their scroll motion. Every other page is plain flow. */
export function PageShell({ walls = false, children }: { walls?: boolean; children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  useWallMotion(rootRef, walls)
  useReveal(rootRef, !walls)

  return (
    <div ref={rootRef}>
      <span data-cross className="scene-cross" />
      <PlainWalls.Provider value={!walls}>{children}</PlainWalls.Provider>
    </div>
  )
}

export function PageHero({
  wall,
  eyebrow,
  headline,
  intro,
  art,
  aside,
  poster = false,
  cta = false,
  link,
  below,
  className = '',
  children,
}: {
  wall: string
  eyebrow?: ReactNode
  headline: string
  intro?: string
  art?: { src: string; alt: string }
  aside?: ReactNode
  /** Adds the primary call to action, and `link` beside it. */
  cta?: boolean
  link?: { label: string; to: string }
  /** Runs the full width under the text. */
  below?: ReactNode
  /** Uses the poster type, which belongs in only one or two places. */
  poster?: boolean
  className?: string
  children?: ReactNode
}) {
  const side = aside ?? (art && <img src={art.src} alt={art.alt} decoding="sync" className="page-art" />)

  return (
    <Wall wall={wall} label="Introduction" className={`page-hero ${className}`}>
      <div className={`wall__body ${side ? 'page-split' : ''}`}>
        <div className="page-split__copy">
          {eyebrow && <span className="page-kicker">{eyebrow}</span>}
          <Lines as="h1" className={poster ? 'poster page-hero__name' : 'wall-h page-hero__title'} lines={[headline]} />
          {intro && <p className="wall-lead">{intro}</p>}
          {children}
          {cta && (
            <div className="page-actions">
              <Link to={startProjectHref} className="wall-btn wall-btn--solid">
                {ctaLabels.primary}
              </Link>
              {link && <ProofLink to={link.to}>{link.label}</ProofLink>}
            </div>
          )}
        </div>
        {side && <div className="page-split__side">{side}</div>}
      </div>
      {below}
    </Wall>
  )
}

export function PageSection({
  wall,
  title,
  intro,
  label,
  id,
  className,
  children,
}: {
  wall: string
  title?: string
  intro?: string
  /** Names the section for screen readers when it has no title. */
  label?: string
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <Wall id={id} wall={wall} label={label ?? title ?? ''} className={className}>
      <div className="wall__body">
        {(title || intro) && (
          <div className="page-head">
            {title && <Lines className="wall-h" lines={[title]} />}
            {intro && (
              <p className="wall-lead">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </Wall>
  )
}

/** A short list with a tick on each line, so it can be read at a glance. */
export function PageChecks({ items, inline = false, className = '' }: { items: string[]; inline?: boolean; className?: string }) {
  return (
    <ul className={`page-checks ${inline ? 'page-checks--inline' : ''} ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" className="h-5 w-5" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** One service to a screen: what it is, who it is for and what you get, beside a picture of it. */
export function PageOffering({
  offering,
  wall,
  kicker,
  projects,
  children,
}: {
  offering: Offering
  wall: string
  kicker: string
  /** Sites built this way, under the text. */
  projects?: PortfolioItem[]
  children?: ReactNode
}) {

  return (
    <Wall id={offering.id} wall={wall} label={offering.title}>
      <div className="wall__body page-offer-wrap">
      <div className="page-split page-offer">
        <div className="page-split__copy">
          <span className="page-kicker">{kicker}</span>
          <Lines className="wall-h page-offer__title" lines={[offering.title]} />
          <p className="wall-lead">{offering.pitch}</p>
          {offering.points.length > 0 && <PageChecks items={offering.points} />}
          {offering.keyPhrases && <PageChecks inline items={offering.keyPhrases} className="page-checks--extra" />}
          <div className="page-actions">
            <Link to={startProjectHref} className="wall-btn wall-btn--solid">
              {ctaLabels.primary}
            </Link>
            {children}
          </div>
        </div>
        <div className="page-split__side">
          <img loading="lazy" src={offering.image} alt="" className="page-art" />
        </div>
      </div>
      {projects && projects.length > 0 && (
        <div>
          <h3 className="service-band__label">Built this way</h3>
          <ProjectTiles items={projects} className="project-tiles--row" />
        </div>
      )}
      </div>
    </Wall>
  )
}

/** Numbered or plain steps under a rule, used for process and principles. */
export function PageSteps({
  items,
  numbered = false,
  columns = 4,
  className = '',
}: {
  items: { title: string; body: string }[]
  numbered?: boolean
  columns?: number
  className?: string
}) {
  const List = numbered ? 'ol' : 'ul'
  return (
    <List className={`page-steps ${className}`} style={{ '--columns': columns } as React.CSSProperties}>
      {items.map((item, index) => (
        <li key={item.title}>
          {numbered && <span className="page-steps__no">{String(index + 1).padStart(2, '0')}</span>}
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </List>
  )
}

/** Handover §8 internal linking: every service page links to the proof, and the proof links back. */
export function ProofLink({ children, to = '/portfolio#grafton-vault' }: { children: ReactNode; to?: string }) {
  return (
    <Link to={to} className="case-link">
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  )
}
