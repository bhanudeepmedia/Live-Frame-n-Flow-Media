import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { featuredTestimonials } from '@/data/featured-testimonials'

/**
 * DESIGN.md §25-26 / PRD.md §25. "Intentionally sparse ... do not add
 * unnecessary cards or background imagery" — kept deliberately minimal.
 */
export default function FeaturedTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = featuredTestimonials[activeIndex]

  return (
    <section aria-label="Featured testimonial" className="w-full bg-[var(--bg-primary)] pb-24 pt-4 sm:pb-32 sm:pt-6">
      <div className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-8 px-[clamp(20px,4vw,86px)] text-center">
        <div className="flex flex-col items-center gap-3">
          <div
            className="font-display flex h-[88px] w-[88px] items-center justify-center rounded-full text-[1.875rem] font-normal uppercase tracking-[0.04em] text-white ring-4 ring-[var(--bg-primary)]"
            style={{ background: active.accent }}
          >
            {active.initials}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-[1rem] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]">
                {active.name}
              </span>
              <span className="text-[0.875rem] text-[var(--text-primary)]/85">{active.role}</span>
              <span className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent-blue-light)]">
                {active.company}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={active.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.5rem,2.6vw,2.35rem)] font-medium leading-[1.35] text-[var(--text-primary)]"
          >
            &ldquo;{active.quote}&rdquo;
          </motion.p>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-center gap-3">
          {featuredTestimonials.map((testimonial, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={testimonial.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                aria-label={`Show testimonial from ${testimonial.name}, ${testimonial.company}`}
                className={`flex shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white transition-all duration-[var(--motion-standard)] ease-[var(--ease-standard)] ${
                  isActive ? 'h-14 w-14 opacity-100' : 'h-10 w-10 opacity-45 hover:opacity-75'
                }`}
                style={{ background: testimonial.accent }}
              >
                {testimonial.initials}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
