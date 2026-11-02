import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CaseStudy } from '@/data/case-studies'

const SLIDE_INTERVAL_MS = 2200

/**
 * DESIGN.md §14 / PRD.md §16.2. Default state = logo + quote; hover/focus
 * state = a slideshow of project imagery (MEMORY.md G-03: hover-triggered,
 * not scroll-triggered). Keyboard-equivalent
 * via `:focus-visible` on the single `<Link>` that is the whole card
 * (PRD.md §16.2 "keyboard users must be able to trigger the same flip state
 * via focus").
 */
export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [isActive, setIsActive] = useState(false)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (!isActive || study.images.length < 2) return
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % study.images.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [isActive, study.images.length])

  return (
    <Link
      to={`/portfolio#${study.slug}`}
      className="group relative block h-[480px] overflow-hidden rounded-[var(--radius-lg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue-light)]"
      style={{ background: study.gradient }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        setIsActive(false)
        setSlide(0)
      }}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      {/* Default face: logo + quote */}
      <div className="absolute inset-0 flex flex-col justify-between p-7 transition-opacity duration-500 ease-[var(--ease-standard)] group-hover:opacity-0 group-focus-visible:opacity-0">
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[var(--radius-pill)] border border-white/25 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-center text-center">
          <span className="font-display text-[clamp(2.25rem,3vw,3rem)] font-normal uppercase leading-none tracking-[0.03em] text-white">
            {study.client}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[0.9375rem] leading-[1.5] text-white/95">&ldquo;{study.quote}&rdquo;</p>
          <div className="text-[0.8125rem] uppercase tracking-[0.08em] text-white/70">
            <div className="font-semibold text-white/90">{study.authorName}</div>
            <div>{study.authorRole}</div>
          </div>
        </div>
      </div>

      {/* Hover/focus face: slideshow of project imagery */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100">
        {study.images.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={`${study.client} — project imagery ${index + 1}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-standard)]"
            style={{ objectPosition: image.position ?? 'center', opacity: index === slide ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7">
          {study.images.length > 1 && (
            <div className="flex gap-1.5">
              {study.images.map((image, index) => (
                <span key={image.src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                  <span
                    className="block h-full rounded-full bg-white transition-transform duration-500 ease-[var(--ease-standard)]"
                    style={{
                      transform: `scaleX(${index <= slide ? 1 : 0})`,
                      transformOrigin: 'left',
                    }}
                  />
                </span>
              ))}
            </div>
          )}
          <div>
            <div className="font-display text-[1.5rem] font-normal uppercase tracking-[0.03em] text-white">
              {study.client}
            </div>
            <div className="text-[0.8125rem] uppercase tracking-[0.08em] text-white/75">{study.authorRole}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
