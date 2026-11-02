import { useEffect, useRef, useState } from 'react'
import ImageTrail from '@/components/cta/ImageTrail'
import TouchTrail from '@/components/cta/TouchTrail'
import { ctaTrailImages } from '@/data/final-cta'

/**
 * DESIGN.md §30 / MOTION.md MOT-10. Cursor-following image trail (React
 * Bits' ImageTrail) scoped to this section only — full-bleed but
 * `pointer-events-none`, so the CTA button stays clickable regardless of
 * animation state (PRD.md §29). Gated by IntersectionObserver (only runs
 * in view) and disabled under prefers-reduced-motion, where a hover trail
 * has no non-motion equivalent worth faking. A screen with no hover gets
 * TouchTrail instead, which follows the finger.
 */
export default function CTAMediaStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [inView, setInView] = useState(false)
  const off = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const touch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  const Trail = touch ? TouchTrail : ImageTrail

  useEffect(() => {
    const node = containerRef.current
    if (!node || off) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    // It sits at the foot of every page, so its pictures wait until a visitor gets close.
    const approach = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), { rootMargin: '100% 0px' })
    approach.observe(node)
    return () => {
      observer.disconnect()
      approach.disconnect()
    }
  }, [off])

  if (off) return null

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {near && <Trail items={ctaTrailImages} active={inView} />}
    </div>
  )
}
