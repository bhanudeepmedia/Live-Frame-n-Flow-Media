import { useContext } from 'react'
import type { ReactNode } from 'react'
import { PlainWalls } from '@/components/home/plainWalls'

export function WallImage({ name, className }: { name: string; className?: string }) {
  return (
    <picture>
      <source media="(max-width: 900px)" srcSet={`/walls/${name}-phone.webp`} />
      <img
        src={`/walls/${name}-laptop.webp`}
        alt=""
        aria-hidden="true"
        decoding="sync"
        fetchPriority={name === 'hero' ? 'high' : 'low'}
        className={className}
      />
    </picture>
  )
}

/** The wall at its true shape, standing on the foot of its box. */
export function WallFit({ name }: { name: string }) {
  return (
    <div className="wall-fit">
      <div className="wall-fit__box">
        <WallImage name={name} />
      </div>
    </div>
  )
}

/**
 * One section: a screen of content on its own wall, held in place while the
 * next section arrives. `exit` names the transition out of this section, read
 * by `useWallMotion`, such as "tilt" or "portal:.page-art".
 */
export default function Wall({
  id,
  wall,
  label,
  exit,
  className = '',
  children,
}: {
  id?: string
  wall: string
  label: string
  exit?: string
  className?: string
  children: ReactNode
}) {
  const plain = useContext(PlainWalls)

  return (
    <section
      id={id}
      aria-label={label}
      data-wall={wall}
      data-exit={exit}
      className={`scene ${plain ? 'scene--plain' : ''} ${className}`}
    >
      <div className="scene__stage">
        <div aria-hidden="true" className="scene__wall">
          {!plain && <WallFit name={wall} />}
        </div>
        <div className="scene__frame">{children}</div>
        <div aria-hidden="true" className="scene__shade" />
      </div>
    </section>
  )
}

/** A heading set line by line, painted on the wall. */
export function Lines({
  as: Tag = 'h2',
  lines,
  className,
}: {
  as?: 'h1' | 'h2'
  lines: ReactNode[]
  className?: string
}) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={index} className="wl">
          <span className="wl__in">{line} </span>
        </span>
      ))}
    </Tag>
  )
}
