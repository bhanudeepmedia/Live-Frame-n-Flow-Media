import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { seoFaq, seoIntro } from '@/data/offerings'
import FaqList from '@/components/sections/FaqList'

/**
 * Handover §5 homepage teaser + the short FAQ block §8 asks for (FAQPage
 * schema). Occupies the slot of the former mock "free website audit"
 * dashboard, which promoted an offering that isn't part of the redesign.
 */
export default function SeoAeoSection() {
  return (
    <section
      aria-label="SEO and AEO"
      className="relative w-full overflow-hidden py-24 sm:py-32"
      style={{ background: 'linear-gradient(125deg, #071531 0%, #0a3783 60%, #1f6adc 100%)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[15%] bottom-0 h-[80%] w-[60%] rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(109, 165, 242, 0.5), transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[var(--container-max)] flex-col items-center gap-14 px-[clamp(20px,4vw,86px)] lg:flex-row lg:items-start lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-[540px] flex-col gap-6"
        >
          <span className="inline-flex w-fit rounded-[var(--radius-pill)] border border-white/30 px-3.5 py-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)]">
            SEO &amp; AEO
          </span>

          <h2 className="font-display text-[clamp(2.75rem,5vw,4.5rem)] font-normal uppercase leading-[0.96] tracking-[0.02em] text-[var(--text-primary)]">
            Found on Google.
            <br />
            Recommended by AI.
          </h2>

          <p className="text-[1.0625rem] leading-[1.55] text-white/85">{seoIntro.intro}</p>
          <p className="text-[1.0625rem] font-semibold leading-[1.55] text-white">{seoIntro.closing}</p>

          <Link
            to="/seo-aeo"
            className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 py-3 text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-[var(--text-dark)] transition-opacity duration-[var(--motion-ui)] hover:opacity-90"
          >
            Explore SEO &amp; AEO
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="w-full max-w-[600px] rounded-[var(--radius-xl)] bg-white p-8 text-[var(--text-dark)] shadow-[0_40px_100px_rgba(2,9,30,0.35)]">
          <p className="mb-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[rgba(8,22,60,0.6)]">
            Common questions
          </p>
          <FaqList items={seoFaq} />
        </div>
      </div>
    </section>
  )
}
