import { ArrowUp } from 'lucide-react'

/**
 * DESIGN.md §40 — 40×40px floating control, smooth-scrolls to top.
 * RULE.md §5.4: explicit prefers-reduced-motion check rather than relying on
 * inconsistent browser-level handling of `behavior: 'smooth'`.
 */
export default function BackToTop() {
  const handleClick = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[rgba(121,170,248,0.12)] text-[var(--text-primary)] transition-colors duration-[var(--motion-ui)] hover:bg-[rgba(121,170,248,0.22)]"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
