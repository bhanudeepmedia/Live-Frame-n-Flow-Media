import { motion } from 'framer-motion'
import { videoTestimonials } from '@/data/video-testimonials'
import VideoTestimonialCard from '@/components/testimonials/VideoTestimonialCard'

/** DESIGN.md §21 / PRD.md §21. OBSERVED (IMG-019/IMG-020). */
export default function VideoTestimonials() {
  return (
    <section aria-label="Video testimonials" className="w-full bg-[var(--bg-primary)] py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-14 px-[clamp(20px,4vw,86px)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="flex flex-col gap-4">
            <span aria-hidden="true" className="editorial-rule-dot text-[var(--accent-blue-light)]" />
            <h2 className="text-gradient-heading font-display text-[clamp(3rem,6vw,5.75rem)] font-normal uppercase leading-[0.95] tracking-[0.02em]">
              Hear it from
              <br />
              the source
            </h2>
          </div>
          <p className="max-w-[34ch] text-[1.0625rem] leading-[1.5] text-[var(--text-primary)]">
            Clients in Ireland, the US and India share what working with us is really like.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {videoTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <VideoTestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
