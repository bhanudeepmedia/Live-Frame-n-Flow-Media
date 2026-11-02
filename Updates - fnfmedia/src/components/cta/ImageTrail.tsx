import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './ImageTrail.css'

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  const point = 'touches' in e && e.touches.length > 0 ? e.touches[0] : (e as MouseEvent)
  return { x: point.clientX - rect.left, y: point.clientY - rect.top }
}

function getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

interface TrailImage {
  el: HTMLDivElement
  rect: DOMRect
}

/**
 * React Bits "ImageTrail" (variant 1), ported to track `window` pointer
 * events rather than the container's own — the container stays
 * `pointer-events-none` (ImageTrail.css) so it never intercepts clicks on
 * the CTA content stacked above it, matching the accessibility guarantee
 * CTAMediaStack made for the autoplay loop this replaced (CTA must remain
 * clickable regardless of animation state). Position is still computed
 * relative to the container's own rect and ignored outside it, so the
 * trail only ever appears while the pointer is over this section.
 */
export default function ImageTrail({ items, active }: { items: string[]; active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !active || items.length === 0) return

    const images: TrailImage[] = [...container.querySelectorAll<HTMLDivElement>('.fnf-cta-trail__img')].map(
      (el) => ({ el, rect: el.getBoundingClientRect() }),
    )

    let imgPosition = 0
    let zIndexVal = 1
    let isIdle = true
    let activeCount = 0
    let hasStarted = false
    let rafId: number | null = null
    const threshold = 80
    let mousePos = { x: 0, y: 0 }
    let lastMousePos = { x: 0, y: 0 }
    let cacheMousePos = { x: 0, y: 0 }

    const resize = () => {
      images.forEach((img) => {
        img.rect = img.el.getBoundingClientRect()
      })
    }
    window.addEventListener('resize', resize)

    const showNextImage = () => {
      zIndexVal += 1
      imgPosition = imgPosition < images.length - 1 ? imgPosition + 1 : 0
      const img = images[imgPosition]
      gsap.killTweensOf(img.el)
      gsap
        .timeline({
          onStart: () => {
            activeCount += 1
            isIdle = false
          },
          onComplete: () => {
            activeCount -= 1
            if (activeCount === 0) isIdle = true
          },
        })
        .fromTo(
          img.el,
          {
            opacity: 1,
            scale: 1,
            zIndex: zIndexVal,
            x: cacheMousePos.x - img.rect.width / 2,
            y: cacheMousePos.y - img.rect.height / 2,
          },
          {
            duration: 0.4,
            ease: 'power1',
            x: mousePos.x - img.rect.width / 2,
            y: mousePos.y - img.rect.height / 2,
          },
          0,
        )
        .to(img.el, { duration: 0.4, ease: 'power3', opacity: 0, scale: 0.2 }, 0.4)
    }

    const render = () => {
      const distance = getDistance(mousePos, lastMousePos)
      cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.1)
      cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.1)

      if (distance > threshold) {
        showNextImage()
        lastMousePos = { ...mousePos }
      }
      if (isIdle && zIndexVal !== 1) zIndexVal = 1
      rafId = requestAnimationFrame(render)
    }

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect()
      const pos = getLocalPointerPos(e, rect)
      if (pos.x < 0 || pos.y < 0 || pos.x > rect.width || pos.y > rect.height) return

      mousePos = pos
      if (!hasStarted) {
        hasStarted = true
        cacheMousePos = { ...pos }
        lastMousePos = { ...pos }
        rafId = requestAnimationFrame(render)
      }
    }

    // Scrolling through the section shows sites as well, for touch screens.
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      if (rect.top > window.innerHeight || rect.bottom < 0 || Math.abs(window.scrollY - lastScrollY) < 90) return
      lastScrollY = window.scrollY
      mousePos = {
        x: rect.width * (0.14 + Math.random() * 0.72),
        y: rect.height * (0.2 + Math.random() * 0.6),
      }
      cacheMousePos = { ...mousePos }
      if (!hasStarted) {
        hasStarted = true
        lastMousePos = { ...mousePos }
        rafId = requestAnimationFrame(render)
      }
      showNextImage()
      lastMousePos = { ...mousePos }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('touchmove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
      images.forEach((img) => gsap.killTweensOf(img.el))
    }
  }, [active, items])

  return (
    <div ref={containerRef} aria-hidden="true" className="fnf-cta-trail">
      {items.map((src, i) => (
        <div className="fnf-cta-trail__img" key={i}>
          <div className="fnf-cta-trail__img-inner" style={{ backgroundImage: `url(${src})` }} />
        </div>
      ))}
    </div>
  )
}
