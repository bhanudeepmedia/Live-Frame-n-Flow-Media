import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { serviceTabs } from '@/data/services'
import ServiceTabs from '@/components/services/ServiceTabs'
import ServicePanel from '@/components/services/ServicePanel'

/**
 * DESIGN.md §15 / PRD.md §18-19. Three-pillar interactive Services module (Handover §2).
 * Two-stage transition (MEMORY.md §7.5): content crossfades immediately,
 * background is a CSS transition on the panel itself so the geometry
 * bloom trails slightly behind (see ServicePanel).
 */
export default function ServicesSection() {
  const [activeId, setActiveId] = useState(serviceTabs[0].id)
  const activeTab = serviceTabs.find((tab) => tab.id === activeId) ?? serviceTabs[0]

  return (
    <section id="services" aria-label="Services" className="w-full border-t border-[rgba(8,22,60,0.08)] bg-[var(--bg-light)] py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14 px-[clamp(20px,4vw,86px)]">
        <div className="flex flex-col items-center gap-5 text-center">
          <span aria-hidden="true" className="editorial-rule-dot text-[var(--text-dark)]/70" />
          <h2 className="font-display max-w-[900px] text-[clamp(2.75rem,5.2vw,4.75rem)] font-normal uppercase leading-[0.96] tracking-[0.02em] text-[var(--text-dark)]">
            Build the asset. <span className="text-[#12805a]">Drive the traffic.</span>
          </h2>
          <p className="max-w-[52ch] text-[1.0625rem] leading-[1.55] text-[rgba(8,22,60,0.68)]">
            One team, one roadmap, end to end: the website or software, and the marketing that brings people to it.
          </p>
        </div>

        <ServiceTabs activeId={activeId} onChange={setActiveId} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServicePanel tab={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
