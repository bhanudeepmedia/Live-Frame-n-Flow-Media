import { useEffect, useRef, useState } from 'react'
import ImageTrail from '@/components/cta/ImageTrail'
import { ctaTrailImages } from '@/data/final-cta'

/**
 * DESIGN.md §30 / MOTION.md MOT-10. Cursor-following image trail (React
 * Bits' ImageTrail) scoped to this section only — full-bleed but
 * `pointer-events-none`, so the CTA button stays clickable regardless of
 * animation state (PRD.md §29). Gated by IntersectionObserver (only runs
 * in view) and disabled under prefers-reduced-motion, where a hover trail
 * has no non-motion equivalent worth faking.
 */
export default function CTAMediaStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [inView, setInView] = useState(false)
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const node = containerRef.current
    if (!node || reducedMotion) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(node)
    // It sits at the foot of every page, so its pictures wait until a visitor gets close.
    const approach = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), { rootMargin: '100% 0px' })
    approach.observe(node)
    return () => {
      observer.disconnect()
      approach.disconnect()
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {near && <ImageTrail items={ctaTrailImages} active={inView} />}
    </div>
  )
}
