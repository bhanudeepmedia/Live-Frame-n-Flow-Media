import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scroller } from '@/components/layout/scroller'

gsap.registerPlugin(ScrollTrigger)

/**
 * MOTION.md §0 — "all motion in this system should read as slow, smooth,
 * cinematic." Lenis smooths native scroll and is synced onto GSAP's ticker
 * so every ScrollTrigger-driven effect (MOT-03 mask reveals, MOT-05 Earth
 * parallax, MOT-09-count) stays frame-accurate against the smoothed
 * position rather than the raw scroll event. Skipped entirely under
 * prefers-reduced-motion — native scroll only, no dependency on this at all.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    })

    scroller.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    function onTick(time: number) {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    // Scrolling runs on this ticker, so it must not sleep while no tween is active.
    gsap.config({ autoSleep: 0 })

    return () => {
      gsap.ticker.remove(onTick)
      scroller.lenis = null
      lenis.destroy()
    }
  }, [])

  return null
}
