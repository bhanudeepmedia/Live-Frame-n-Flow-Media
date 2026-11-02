import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { clientTrustLogos, industryTags } from '@/data/clients'

/**
 * DESIGN.md §13 / PRD.md §15 layout; copy is the Handover §2 trust bar
 * (statement + client logos + industry tags).
 */
export default function ClientTrust() {
  return (
    <section aria-label="Trusted clients" className="w-full bg-[var(--bg-light)] py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-12 px-[clamp(20px,4vw,86px)] lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display max-w-[460px] shrink-0 text-[clamp(1.75rem,2.6vw,2.5rem)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--text-dark)]"
        >
          India&apos;s leading boutique web development and marketing studio, trusted by brands across{' '}
          <span className="text-[var(--accent-blue)]">India, the US and the UK/Europe</span>
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-10"
        >
          {clientTrustLogos.map((client) => {
            const content = (
              <span className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="font-display truncate text-[1.5rem] font-normal uppercase tracking-[0.03em] text-[var(--text-dark)]">
                  {client.name}
                </span>
              </span>
            )
            return (
              <li key={client.name} className="flex min-w-0 items-center">
                {client.href ? (
                  <Link
                    to={client.href}
                    className="min-w-0 opacity-80 grayscale transition-all duration-[var(--motion-ui)] hover:opacity-100 hover:grayscale-0"
                  >
                    {content}
                  </Link>
                ) : (
                  <span className="min-w-0 opacity-80 grayscale">{content}</span>
                )}
              </li>
            )
          })}
        </motion.ul>
      </div>
      <ul
        aria-label="Industries we work in"
        className="mx-auto mt-12 flex w-full max-w-[var(--container-max)] flex-wrap gap-2.5 px-[clamp(20px,4vw,86px)]"
      >
        {industryTags.map((tag) => (
          <li
            key={tag}
            className="rounded-[var(--radius-pill)] border border-[rgba(8,22,60,0.18)] px-3.5 py-1.5 text-[13px] font-medium text-[rgba(8,22,60,0.75)]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  )
}
