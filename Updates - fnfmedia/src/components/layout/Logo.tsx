import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import '@/components/layout/nav.css'

/**
 * The brand mark on its own, on every screen size. The full name sits in the
 * footer. The mark is a mask (public/brand/fnf-mark-black.svg), so in the header
 * it can take the colour of the wall in view; see useWallTint.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Frame n Flow Media — home"
      className={cn(
        'inline-flex shrink-0 items-center transition-opacity duration-[var(--motion-ui)] hover:opacity-85',
        className,
      )}
    >
      <span aria-hidden="true" className="brand-mark" />
    </Link>
  )
}
