import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { flagshipProof } from '@/data/site'
import { useMaskReveal } from '@/hooks/useMaskReveal'

/**
 * Handover §2 "Proof section": headline "Real Results, Not Promises", the
 * Grafton Vault numbers as a short case-study callout linking to the full
 * case study — not a numbered list buried in paragraph text.
 */
export default function ProofSection() {
  const headingRef = useMaskReveal<HTMLHeadingElement>()

  return (
    <section aria-label="Real results" className="w-full bg-[var(--bg-primary)] py-24 text-[var(--text-primary)] sm:py-32">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-12 px-[clamp(20px,4vw,86px)]">
        <h2
          ref={headingRef}
          className="mask-reveal-heading font-display text-[clamp(3.25rem,6.8vw,7rem)] font-normal uppercase leading-[0.95] tracking-[0.02em]"
        >
          Real Results,
          <br />
          Not Promises
        </h2>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-10 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] p-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center"
          style={{ background: 'linear-gradient(125deg, #071531 0%, #0a3783 70%, #1860d3 100%)' }}
        >
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-[var(--radius-pill)] border border-white/30 px-3.5 py-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.12em]">
              Flagship case study
            </span>
            <h3 className="font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-normal uppercase leading-[0.98] tracking-[0.02em]">
              {flagshipProof.client}
            </h3>
            <p className="text-[0.9375rem] uppercase tracking-[0.08em] text-white/75">
              {flagshipProof.industry} · {flagshipProof.location}
            </p>
            <p className="max-w-[46ch] text-[1.0625rem] leading-[1.55] text-white/90">{flagshipProof.summary}</p>
            <Link
              to="/portfolio#grafton-vault"
              className="mt-2 inline-flex w-fit items-center gap-2 text-[0.9375rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-[var(--motion-ui)] hover:text-[var(--accent-blue-light)]"
            >
              Read the full case study
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {flagshipProof.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 border-t border-white/25 pt-5">
                <dd className="font-display order-1 text-[clamp(2.75rem,4.2vw,4.5rem)] font-normal uppercase leading-none tracking-[0.02em]">
                  {stat.value}
                </dd>
                <dt className="order-2 text-[0.9375rem] text-white/80">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </motion.article>
      </div>
    </section>
  )
}
