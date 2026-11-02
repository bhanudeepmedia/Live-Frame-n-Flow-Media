import { useEffect } from 'react'
import type { RefObject } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Gives the header the logo colour (`--logo`, set per wall in home.css) of the
 * section in view. A section that overlaps the last one, as on Home, takes over
 * halfway through its arrival, the same handover as useWallMotion. Any other
 * takes over when it reaches the middle of the screen.
 */
export default function useWallTint(headerRef: RefObject<HTMLElement | null>) {
  const { pathname } = useLocation()

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    let frame = 0
    let current: Element | undefined
    let lines: { section: Element; line: number }[] = []

    const measure = () => {
      const held = document.querySelector<HTMLElement>('.scene__stage')?.offsetHeight ?? 0
      lines = Array.from(document.querySelectorAll('[data-wall]'), (section) => {
        const arrival = -parseFloat(getComputedStyle(section).marginTop) - held
        return { section, line: arrival > 0 ? header.offsetHeight - arrival / 2 : window.innerHeight / 2 }
      })
    }

    const update = () => {
      frame = 0
      let active: Element | undefined
      for (const { section, line } of lines) {
        if (section.getBoundingClientRect().top <= line) active = section
      }
      if (active === current) return
      current = active
      header.style.setProperty('--logo-tint', active ? getComputedStyle(active).getPropertyValue('--logo') : '')
    }

    const schedule = () => {
      frame ||= requestAnimationFrame(update)
    }
    const remeasure = () => {
      measure()
      schedule()
    }

    measure()
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
    }
  }, [headerRef, pathname])
}
