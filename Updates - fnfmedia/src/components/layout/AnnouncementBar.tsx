import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { startProjectHref } from '@/data/site'

/**
 * DESIGN.md §5 / PRD.md §11.1. OBSERVED content + layout (IMG-001).
 * Dismissal persists for the session via sessionStorage (PRD.md §11.1).
 * The dismiss itself collapses height + fades rather than vanishing instantly.
 */
export default function AnnouncementBar({ onDismiss }: { onDismiss: () => void }) {
  const [closing, setClosing] = useState(false)

  return (
    <div
      role="region"
      aria-label="Announcement"
      style={{ height: closing ? 0 : 52, opacity: closing ? 0 : 1 }}
      className="transition-[height,opacity] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] relative z-[101] hidden w-full items-center justify-center overflow-hidden bg-[var(--wall-blue)] px-4 pr-14 lg:flex"
    >
      <div className="flex min-w-0 max-w-full items-center gap-3 text-center">
        <span className="hidden shrink-0 rounded-[4px] bg-[var(--wall-yellow)] px-3 py-1 text-[13px] font-semibold text-[var(--wall-blue)] sm:inline-block">
          Limited projects
        </span>
        <p className="min-w-0 truncate text-[14px] font-medium text-white sm:text-[15px]">
          We take on a limited number of projects at a time
        </p>
        <Link
          to={startProjectHref}
          className="hidden shrink-0 items-center gap-1.5 rounded-[4px] bg-[rgba(243,239,233,0.14)] px-3.5 py-1.5 text-[13px] font-semibold text-white transition-colors duration-[var(--motion-ui)] hover:bg-[rgba(243,239,233,0.24)] sm:inline-flex"
        >
          Start Your Project
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <button
        type="button"
        onClick={() => {
          setClosing(true)
          window.setTimeout(onDismiss, 320)
        }}
        aria-label="Dismiss announcement"
        className="absolute right-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[rgba(243,239,233,0.14)] text-white transition-colors duration-[var(--motion-ui)] hover:bg-[rgba(243,239,233,0.24)]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
