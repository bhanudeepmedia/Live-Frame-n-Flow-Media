import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { benefits } from '@/data/benefits'
import { ctaLabels, startProjectHref } from '@/data/site'
import BenefitCard from '@/components/why/BenefitCard'
import { useMaskReveal } from '@/hooks/useMaskReveal'

/**
 * DESIGN.md §18-20 / PRD.md §20. Earth-anchored positioning section.
 * DESIGN.md §20 "Earth motion": scale 1.0→1.06, translateY 40px→-20px
 * during scroll — implemented via Framer Motion's scroll-progress hooks
 * on the section itself (transform/opacity only, RULE.md §2.5).
 *
 * `EarthVisual` (three.js/react-three-fiber) is code-split via `lazy` —
 * it added ~900kB to the main bundle (RULE.md §2.5 performance budget,
 * LCP < 2.5s), and the Earth is below-the-fold decorative content
 * (PRD.md §20 "decorative/experiential, not functional content"), so it
 * has no business being in the critical initial bundle.
 */
const EarthVisual = lazy(() => import('@/components/why/EarthVisual'))
export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useMaskReveal<HTMLHeadingElement>()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const reducedMotion = useReducedMotion()

  const earthScale = useTransform(scrollYProgress, [0.15, 0.65], reducedMotion ? [1.03, 1.03] : [1, 1.06])
  const earthY = useTransform(scrollYProgress, [0.15, 0.65], reducedMotion ? [0, 0] : [40, -20])

  return (
    <section
      ref={sectionRef}
      aria-label="Why us"
      className="relative w-full overflow-hidden bg-[var(--bg-primary)] pt-28 sm:pt-36"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-deep) 70%, #020716 100%)' }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[var(--container-max)] flex-col items-center gap-4 px-[clamp(20px,4vw,86px)] text-center">
        <span aria-hidden="true" className="editorial-rule-dot text-[var(--accent-blue-light)]" />
        <h2
          ref={headingRef}
          className="mask-reveal-heading font-display max-w-[900px] text-[clamp(3rem,6vw,6.25rem)] font-normal uppercase leading-[0.95] tracking-[0.02em]"
        >
          One studio.
          <br />
          Build it. Drive it.
        </h2>
      </div>

      <div className="relative mt-4 h-[760px] w-full sm:h-[940px] lg:h-[1040px]">
        <motion.div
          style={{ scale: earthScale, y: earthY }}
          className="absolute left-1/2 top-[4%] h-[640px] w-[640px] -translate-x-1/2 sm:h-[820px] sm:w-[820px] lg:h-[920px] lg:w-[920px]"
        >
          <Suspense fallback={<div className="h-full w-full rounded-full" style={{ background: 'radial-gradient(circle at 38% 35%, #1f6adc 0%, #08285c 55%, transparent 72%)' }} />}>
            <EarthVisual reducedMotion={!!reducedMotion} />
          </Suspense>
        </motion.div>

        <div className="absolute inset-x-0 bottom-12 z-10 mx-auto flex w-full max-w-[1500px] flex-col items-center gap-y-8 px-[clamp(20px,4vw,86px)]">
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
            {benefits.slice(0, 3).map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
            {benefits.slice(3).map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index + 3} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-24 pt-4">
        <Link
          to={startProjectHref}
          className="inline-flex h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--text-primary)] px-6 text-[16px] font-semibold text-[var(--text-dark)] transition-opacity duration-[var(--motion-ui)] hover:opacity-90"
        >
          {ctaLabels.primary}
        </Link>
      </div>
    </section>
  )
}
