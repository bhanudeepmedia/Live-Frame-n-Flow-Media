import { motion } from 'framer-motion'
import type { Benefit } from '@/data/benefits'

export default function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[280px] h-[210px] flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] px-6 py-5 text-center backdrop-blur-md"
      style={{ background: 'rgba(8, 22, 60, 0.45)' }}
    >
      <h3 className="font-display text-[1.625rem] font-normal uppercase leading-[1.05] tracking-[0.025em] text-[var(--text-primary)]">
        {benefit.title}
      </h3>
      <div className="h-px w-10 bg-[var(--border-subtle)]" />
      <p className="text-[0.9375rem] leading-[1.5] text-[var(--text-primary)]">{benefit.body}</p>
    </motion.div>
  )
}
