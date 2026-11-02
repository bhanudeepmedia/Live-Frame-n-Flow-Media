import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Wall, { Lines } from '@/components/home/Wall'

gsap.registerPlugin(ScrollTrigger)

/**
 * The steps of a project, travelling across the screen as the page scrolls, with
 * a line running on through them. The section holds still under the header for
 * as long as the track takes to pass. On a phone the steps stay in a column and
 * the line draws down the side.
 */
export default function ProcessFlow({
  id,
  title,
  intro,
  steps,
}: {
  id: string
  title: string
  intro?: string
  steps: { title: string; body: string }[]
}) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const scene = root?.closest<HTMLElement>('.scene')
    if (!root || !scene) return

    const track = root.querySelector<HTMLElement>('.flow__track')
    const line = root.querySelector<HTMLElement>('.flow__line')
    const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.flow__step'))
    const media = gsap.matchMedia()
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header'))
    const mark = (progress: number) => {
      items.forEach((item, index) => item.classList.toggle('is-on', progress >= index / items.length - 0.01))
    }

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      if (!track) return
      const travel = () => track.scrollWidth - root.clientWidth
      const hold = () => scene.style.setProperty('--travel', `${travel() * 1.15}px`)
      hold()
      const tween = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: scene,
          start: `top ${header}px`,
          end: () => `+=${travel() * 1.15}`,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: hold,
          onUpdate: (self) => mark(self.progress),
        },
      })
      tween.to(track, { x: () => -travel(), duration: 1 }, 0)
      if (line) tween.fromTo(line, { scaleX: 0.14 }, { scaleX: 1, duration: 1 }, 0)
      mark(0)
      return () => {
        scene.style.removeProperty('--travel')
      }
    })

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      if (!line) return
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: track,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
            onUpdate: (self) => mark(self.progress),
          },
        },
      )
    })

    return () => media.revert()
  }, [])

  return (
    <Wall id={id} wall="founder" label={title} className="flow">
      <div ref={rootRef} className="wall__body flow__body">
        <div className="page-head">
          <Lines className="wall-h" lines={[title]} />
          {intro && <p className="wall-lead">{intro}</p>}
        </div>
        <div className="flow__rail">
          <span aria-hidden="true" className="flow__line" />
          <ol className="flow__track">
            {steps.map((step, index) => (
              <li key={step.title} className="flow__step">
                <span aria-hidden="true" className="flow__dot">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Wall>
  )
}
