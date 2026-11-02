import { motion } from 'framer-motion'
import { processSteps } from '@/data/offerings'

/** Handover §2 "Process strip": Discover → Build → Launch & Optimize → Grow, one line each. */
export default function ProcessStrip() {
  return (
    <section
      id="process"
      aria-label="How we work"
      className="w-full bg-[var(--bg-light)] py-24 text-[var(--text-dark)] sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14 px-[clamp(20px,4vw,86px)]">
        <div className="flex flex-col gap-4">
          <span aria-hidden="true" className="editorial-rule-dot text-[var(--text-dark)]/70" />
          <h2 className="font-display max-w-[760px] text-[clamp(2.75rem,5.2vw,4.75rem)] font-normal uppercase leading-[0.96] tracking-[0.02em]">
            How we <span className="text-[var(--accent-blue)]">work</span>
          </h2>
        </div>

        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, index) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 border-t-2 border-[var(--text-dark)] pt-5"
            >
              <span className="font-display text-[1.125rem] font-normal uppercase tracking-[0.06em] text-[var(--accent-blue)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[1.875rem] font-normal uppercase leading-[1.02] tracking-[0.02em]">
                {item.step}
              </h3>
              <p className="text-[1rem] leading-[1.55] text-[rgba(8,22,60,0.75)]">{item.line}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
