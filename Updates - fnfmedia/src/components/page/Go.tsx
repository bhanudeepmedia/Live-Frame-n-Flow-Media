import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/** A link that opens other sites in a new tab and stays in the app for our own pages. */
export default function Go({
  href,
  className,
  onClick,
  children,
}: {
  href: string
  className: string
  onClick?: () => void
  children: ReactNode
}) {
  return href.startsWith('http') ? (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
      {children}
      {className.includes('wall-btn') && <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />}
    </a>
  ) : (
    <Link to={href} onClick={onClick} className={className}>
      {children}
    </Link>
  )
}
