import { useEffect } from 'react'
import type { RefObject } from 'react'
import { useLocation } from 'react-router-dom'

const ITEMS = [
  '.page-kicker',
  '.wall-h',
  '.wall-lead',
  '.page-split__side',
  '.page-actions',
  '.page-checks > li',
  '.page-card',
  '.page-steps > li',
  '.page-sheet',
  '.project-tiles > li',
  '.service-index > li',
  '.service-grid > li',
  '.service-band__art',
  '.case-grid > *',
  '.testimonial > *',
  '.shopify-step',
  '.review-grid > li',
  '.work-note',
].join(', ')

/** Items that arrive together follow one another, but never by more than this. */
const STEP = 70
const MOST = 280

/**
 * Inner pages stay in plain flow, and each piece of a section rises into place
 * as it comes on screen. Only opacity and position change, once, so nothing
 * shifts the page. Skipped under prefers-reduced-motion.
 */
export default function useReveal(rootRef: RefObject<HTMLElement | null>, enabled: boolean) {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = rootRef.current
    if (!root || !enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = root.querySelectorAll<HTMLElement>(ITEMS)
    items.forEach((item) => item.setAttribute('data-reveal', ''))

    const watcher = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            const item = entry.target as HTMLElement
            item.style.transitionDelay = `${Math.min(index * STEP, MOST)}ms`
            item.setAttribute('data-reveal', 'in')
            watcher.unobserve(item)
          })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    items.forEach((item) => watcher.observe(item))

    return () => {
      watcher.disconnect()
      items.forEach((item) => {
        item.removeAttribute('data-reveal')
        item.style.removeProperty('transition-delay')
      })
    }
  }, [rootRef, enabled, pathname])
}
