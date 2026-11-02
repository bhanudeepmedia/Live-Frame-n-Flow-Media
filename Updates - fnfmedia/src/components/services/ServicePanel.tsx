import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { ServiceTab } from '@/data/services'
import { serviceThemeBackground } from '@/data/services'
import '@/components/services/services.css'

/**
 * DESIGN.md §16 SERVICE PANEL SYSTEM. One structural component reused by
 * all four variants (RULE.md §2.1) — only theme/copy/logos vary.
 *
 * MOTION.md MOT-08b: tab switching is a TWO-STAGE animation — content
 * cross-fades immediately (handled one level up, in ServicesSection's
 * AnimatePresence), but the decorative background-graphic "bloom" is a
 * SEPARATE animation that only begins ~0.75-1s AFTER the content has
 * already settled, not simultaneously. The `delay` below is what encodes
 * that gap; without it the bloom would just fade in with everything else.
 */
export default function ServicePanel({ tab }: { tab: ServiceTab }) {
  const logos = [...tab.clientLogos, ...tab.clientLogos]
  const reducedMotion = useReducedMotion()

  return (
    <div
      role="tabpanel"
      id={`service-panel-${tab.id}`}
      aria-labelledby={`service-tab-${tab.id}`}
      className="relative w-full overflow-hidden rounded-[var(--radius-xl)]"
      style={{ background: serviceThemeBackground[tab.theme] }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-0 h-full w-[70%]"
        style={{
          background:
            tab.theme === 'build'
              ? 'conic-gradient(from 200deg at 80% 20%, rgba(255,255,255,0.25), transparent 40%)'
              : tab.theme === 'growth'
                ? 'radial-gradient(circle at 85% 15%, rgba(255,255,255,0.35), transparent 55%)'
                : 'repeating-linear-gradient(100deg, rgba(255,255,255,0.06) 0 26px, transparent 26px 60px)',
          transformOrigin: '85% 15%',
        }}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }
        }
      />

      <div className="relative z-10 flex flex-col gap-8 p-[clamp(28px,4vw,64px)] pb-0">
        <div className="flex items-center gap-4 text-white/75">
          <span aria-hidden="true" className="editorial-rule-dot" />
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white/80">
            {tab.productLabel}
          </span>
        </div>
        <h3 className="font-display max-w-[640px] text-[clamp(2.5rem,4.8vw,4.5rem)] font-normal uppercase leading-[0.96] tracking-[0.02em] text-white">
          {tab.title}
        </h3>
        <p className="max-w-[48ch] text-[1.0625rem] leading-[1.55] text-white/85">{tab.description}</p>

        <div className="flex flex-wrap gap-2.5">
          {tab.includedServices.map((service) => (
            <span
              key={service}
              className="rounded-[var(--radius-pill)] border border-white/25 bg-white/5 px-3.5 py-1.5 text-[0.8125rem] tracking-[0.03em] text-white/90"
            >
              {service}
            </span>
          ))}
        </div>

        <Link
          to={tab.ctaHref}
          className="inline-flex w-fit items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 py-3 text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-[var(--text-dark)] transition-opacity duration-[var(--motion-ui)] hover:opacity-90"
        >
          Explore {tab.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {tab.clientLogos.length > 0 ? (
        <div className="relative z-10 mt-10 overflow-hidden border-t border-white/15 py-6">
          <div className="service-marquee-track flex w-max items-center gap-14">
            {logos.map((logo, index) => (
              <span
                key={`${logo}-${index}`}
                aria-hidden={index >= tab.clientLogos.length}
                className="font-display shrink-0 text-[1.35rem] font-normal uppercase tracking-[0.04em] text-white/65"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-12" />
      )}
    </div>
  )
}
