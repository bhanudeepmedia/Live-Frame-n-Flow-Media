import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * MOTION.md MOT-03 — scroll-scrubbed left-to-right text mask reveal (Work
 * and Why Us headings). Drives the `.mask-reveal-heading` background-clip
 * gradient 1:1 with scroll offset via ScrollTrigger's `scrub`, not a
 * fixed-duration fade — confirmed OBSERVED behavior pauses/resumes with
 * scroll. Disabled under prefers-reduced-motion (CSS shows the final state).
 */
export function useMaskReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { backgroundPosition: '100% 0' },
        {
          backgroundPosition: '0% 0',
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            end: 'top 40%',
            scrub: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return ref
}
