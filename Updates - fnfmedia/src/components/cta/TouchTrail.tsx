import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './ImageTrail.css'

/** Pixels a finger travels on the screen before the next site takes over. */
const STEP = 180

/**
 * The trail on a touch screen. Touching the section brings up a site at the finger,
 * and it follows the finger around. As the finger travels, the next site takes over
 * and the last one peels off to the side and fades. Nothing here stops the swipe:
 * the listeners are passive and the sites ignore touches, so the page scrolls as
 * usual. In a swipe the page moves with the finger, so a site sitting on the page
 * stays under it, and only the finger's movement across the page has to be followed.
 */
export default function TouchTrail({ items, active }: { items: string[]; active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !active || items.length === 0) return

    const cards = [...container.querySelectorAll<HTMLDivElement>('.fnf-cta-trail__img')]
    const width = cards[0].offsetWidth
    const height = cards[0].offsetHeight

    let card: HTMLDivElement | null = null
    let next = 0
    let side = 1
    let layer = 1
    let frame = 0
    let travel = 0
    let lastScroll = window.scrollY
    /** The finger on the page, and where the site following it has got to. */
    const finger = { x: 0, y: 0 }
    const site = { x: 0, y: 0 }
    const reported = { x: 0, y: 0 }

    /** The site sits above the fingertip, so the finger never hides it. */
    const spot = () => ({
      x: gsap.utils.clamp(8, container.offsetWidth - width - 8, finger.x - width / 2),
      y: gsap.utils.clamp(8, container.offsetHeight - height - 8, finger.y - height * 0.72),
    })

    const letGo = () => {
      if (!card) return
      side = -side
      gsap.to(card, { x: site.x + side * width * 0.42, y: site.y - 24, rotation: side * 9, scale: 0.86, opacity: 0, duration: 0.7, ease: 'power2.out', overwrite: true })
      card = null
    }

    const bringUp = () => {
      letGo()
      card = cards[next]
      next = (next + 1) % cards.length
      gsap.killTweensOf(card)
      Object.assign(site, spot())
      // Above the site that just left, which is still on its way out.
      layer += 1
      gsap.set(card, { x: site.x, y: site.y, rotation: 0, zIndex: layer })
      gsap.fromTo(card, { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.26, ease: 'power2.out' })
    }

    const follow = () => {
      frame = requestAnimationFrame(follow)
      const scrolled = window.scrollY - lastScroll
      lastScroll = window.scrollY
      travel += Math.hypot(finger.x - reported.x, finger.y - reported.y) + Math.abs(scrolled)
      Object.assign(reported, finger)
      if (travel > STEP) {
        travel = 0
        bringUp()
      }
      if (!card) return
      const target = spot()
      const lean = (target.x - site.x) * 0.1
      site.x += (target.x - site.x) * 0.2
      site.y += (target.y - site.y) * 0.2
      gsap.set(card, { x: site.x, y: site.y, rotation: gsap.utils.clamp(-8, 8, lean) })
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      letGo()
    }

    /** Reads the finger onto the page. Off the section, the trail stops. */
    const read = (event: TouchEvent) => {
      const touch = event.touches[0]
      const box = container.getBoundingClientRect()
      finger.x = touch.clientX - box.left
      finger.y = touch.clientY - box.top
      return finger.x >= 0 && finger.y >= 0 && finger.x <= box.width && finger.y <= box.height
    }

    const start = () => {
      Object.assign(reported, finger)
      lastScroll = window.scrollY
      travel = 0
      bringUp()
      frame = requestAnimationFrame(follow)
    }

    const onMove = (event: TouchEvent) => {
      if (!read(event)) stop()
      else if (!frame) start()
    }

    const onEnd = (event: TouchEvent) => {
      if (!event.touches.length) stop()
    }

    window.addEventListener('touchstart', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    window.addEventListener('touchcancel', onEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('touchcancel', onEnd)
      cancelAnimationFrame(frame)
      gsap.killTweensOf(cards)
      gsap.set(cards, { opacity: 0 })
    }
  }, [active, items])

  return (
    <div ref={containerRef} aria-hidden="true" className="fnf-cta-trail fnf-cta-trail--touch">
      {items.map((src, i) => (
        <div className="fnf-cta-trail__img" key={i}>
          <div className="fnf-cta-trail__img-inner" style={{ backgroundImage: `url(${src})` }} />
        </div>
      ))}
    </div>
  )
}
