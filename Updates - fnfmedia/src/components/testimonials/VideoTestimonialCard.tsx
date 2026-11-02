import { Dialog } from 'radix-ui'
import { Play, X } from 'lucide-react'
import type { VideoTestimonial } from '@/data/video-testimonials'

/**
 * DESIGN.md §21 / PRD.md §21.2. No actual video source files exist in the
 * repo (PHASES.md Phase 6 "Known Risks" — poster frames only, video assets
 * are implementation inference). Rather than fabricate a `<video>` tag
 * pointing at a nonexistent file, "Play video" opens a real, fully
 * accessible modal (focus trap + Escape via Radix Dialog) that presents
 * the complete testimonial — a real interaction, not a fake control.
 */
export default function VideoTestimonialCard({ testimonial }: { testimonial: VideoTestimonial }) {
  return (
    <Dialog.Root>
      <div className="flex flex-col gap-5">
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="group relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-[var(--radius-md)] text-left"
            style={{ background: testimonial.accent }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 55%)' }}
            />
            <div className="relative z-10 flex items-center justify-between p-5">
              <span className="font-display text-[1.35rem] font-normal uppercase tracking-[0.03em] text-white">
                {testimonial.company}
              </span>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] transition-transform duration-[var(--motion-ui)] group-hover:scale-110"
                style={{ background: '#c770e7' }}
              >
                <Play className="h-4 w-4 fill-[var(--text-dark)] text-[var(--text-dark)]" strokeWidth={0} />
              </span>
            </div>
            <span className="relative z-10 px-5 pb-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-white/80">
              Play video
            </span>
          </button>
        </Dialog.Trigger>

        <div className="flex flex-col gap-2">
          <p className="text-[0.9375rem] leading-[1.55] text-[var(--text-primary)]">&ldquo;{testimonial.quote}&rdquo;</p>
          <div className="text-[0.8125rem] uppercase tracking-[0.08em] text-[var(--text-primary)]">
            <div className="font-semibold text-[var(--text-primary)]">{testimonial.author}</div>
            <div className="text-[var(--text-muted)]">{testimonial.role}</div>
          </div>
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[210] bg-black/70 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-[211] w-[92vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-lg)] p-8 focus:outline-none"
          style={{ background: testimonial.accent }}
        >
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="font-display text-[1.5rem] font-normal uppercase tracking-[0.03em] text-white">
              {testimonial.company}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-white/10 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <p className="mt-6 text-[22px] leading-[1.4] text-white">&ldquo;{testimonial.quote}&rdquo;</p>
          <div className="mt-6 text-[14px] text-white/70">
            <div className="font-medium text-white">{testimonial.author}</div>
            <div>{testimonial.role}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
