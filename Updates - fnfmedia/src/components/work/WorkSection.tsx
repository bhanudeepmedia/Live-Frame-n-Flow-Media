import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { caseStudies } from '@/data/case-studies'
import CaseStudyCard from '@/components/work/CaseStudyCard'
import { useMaskReveal } from '@/hooks/useMaskReveal'

/** DESIGN.md §14 / PRD.md §16. OBSERVED (IMG-006–IMG-010). */
export default function WorkSection() {
  const headingRef = useMaskReveal<HTMLHeadingElement>()

  return (
    <section id="work" aria-label="Work" className="w-full bg-[var(--bg-primary)] py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14 px-[clamp(20px,4vw,86px)]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2
            ref={headingRef}
            className="mask-reveal-heading font-display text-[clamp(3.25rem,6.8vw,7rem)] font-normal uppercase leading-[0.95] tracking-[0.02em]"
          >
            Built. Launched.
            <br />
            Grown.
          </h2>
          <Link
            to="/portfolio"
            className="inline-flex shrink-0 items-center gap-2 text-[0.9375rem] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] transition-colors duration-[var(--motion-ui)] hover:text-[var(--accent-blue-light)]"
          >
            See all case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
