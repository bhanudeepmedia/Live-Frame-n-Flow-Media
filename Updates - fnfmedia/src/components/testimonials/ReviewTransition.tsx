import { useEffect, useRef } from 'react'
import { Quote } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * DESIGN.md §24 / MOTION.md MOT-08-wipe. Simple fade-up entrance carrying
 * Philosophy into Verified Reviews (the banded gradient wipe was removed —
 * it defaulted to a fully-visible overlay that permanently covered this
 * section's heading whenever GSAP hadn't taken over, e.g. under
 * prefers-reduced-motion).
 */
export default function ReviewTransition() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Client testimonials"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] pb-8 pt-24 sm:pb-10 sm:pt-32"
    >
      <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-strong)] bg-[rgba(8,22,60,0.55)] px-4 py-2">
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)]">
            Client Testimonials
          </span>
        </div>

        <h2 className="font-display max-w-[700px] text-[clamp(3rem,6vw,5.75rem)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-[var(--text-primary)]">
          Trusted across
          <br />
          borders
        </h2>

        <Quote className="h-8 w-8 text-[var(--border-strong)]" aria-hidden="true" />
      </div>
    </section>
  )
}
