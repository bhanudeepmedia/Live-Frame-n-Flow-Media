import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Wall, { Lines } from '@/components/home/Wall'
import { clientCountries } from '@/data/home'

const loadEarth = () => import('@/components/why/EarthVisual')
const EarthVisual = lazy(loadEarth)

const earthPictures = ['/globe/earth-phone.webp', '/globe/bump.webp', ...clientCountries.map((country) => `/flags/${country.code}.svg`)]

/** The earth's own loaders use CORS, so this fetches the same copy they will ask for. */
function fetchPicture(src: string) {
  const image = new Image()
  image.crossOrigin = 'anonymous'
  // Ahead of the walls further down, because the earth is the next thing a visitor sees.
  image.fetchPriority = 'high'
  image.src = src
  return image.decode().catch(() => undefined)
}

/**
 * The heaviest thing on the page, so it waits for the first screen to come in,
 * then loads when the visitor first moves or after a few seconds, whichever comes
 * first, and draws one still frame, so the earth is already there when its section
 * arrives. It only turns while it is on screen, so a visitor always meets it at
 * its opening view. A phone shows a picture of that same frame from the start, so
 * the earth is there however fast the visitor swipes. Its code and maps download
 * as soon as the page has loaded, the live earth takes over from the picture when
 * no swipe is running, and it starts turning once the hero's websites have gone,
 * so a phone is never doing both at once.
 */
export function Earth() {
  const floatRef = useRef<HTMLDivElement>(null)
  const [phone] = useState(() => window.innerWidth <= 900)
  const [loaded, setLoaded] = useState(false)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(false)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Two frames on, so the live earth has drawn before the picture under it goes.
  const onReady = useCallback(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
  }, [])

  useEffect(() => {
    const load = () => setLoaded(true)
    const moves = ['scroll', 'wheel', 'touchstart', 'pointermove', 'keydown']
    let timer = 0

    if (phone) {
      let fetched = false
      const whenStill = () => {
        window.clearTimeout(timer)
        timer = window.setTimeout(() => fetched && load(), 200)
      }
      const fetchEarth = () => {
        Promise.all([loadEarth(), ...earthPictures.map(fetchPicture)]).then(() => {
          fetched = true
          whenStill()
        })
      }
      if (document.readyState === 'complete') fetchEarth()
      else window.addEventListener('load', fetchEarth, { once: true })
      window.addEventListener('scroll', whenStill, { passive: true })
      return () => {
        window.clearTimeout(timer)
        window.removeEventListener('load', fetchEarth)
        window.removeEventListener('scroll', whenStill)
      }
    }

    timer = window.setTimeout(load, 4000)
    moves.forEach((move) => window.addEventListener(move, load, { once: true, passive: true }))
    return () => {
      window.clearTimeout(timer)
      moves.forEach((move) => window.removeEventListener(move, load))
    }
  }, [phone])

  useEffect(() => {
    const scene = floatRef.current?.closest<HTMLElement>('.scene')
    if (!scene) return
    const held = !scene.matches('.scene--plain') && !reducedMotion
    const root = getComputedStyle(document.documentElement)
    const header = parseFloat(root.getPropertyValue('--header'))
    const next = scene.nextElementSibling
    const stage = scene.querySelector<HTMLElement>('.scene__stage')
    /** How far the section's arrival has to run before the earth starts turning. */
    const wait = () =>
      window.innerWidth <= 900 ? (-parseFloat(getComputedStyle(scene).marginTop) - (stage?.offsetHeight ?? 0)) * 0.95 : scene.offsetHeight * 0.16

    const trigger = ScrollTrigger.create(
      held
        ? {
            trigger: scene,
            // It waits behind the hero's websites until they start to leave.
            start: () => `top ${header + 1 - wait()}px`,
            endTrigger: next ?? scene,
            // A section that flows in pushes it off the screen. Others arrive over it.
            end: () => `top ${next?.matches('[data-flow]') && window.innerWidth <= 900 ? header : header - window.innerHeight}px`,
            onToggle: (self) => setActive(self.isActive),
          }
        : { trigger: scene, start: 'top bottom', end: 'bottom top', onToggle: (self) => setActive(self.isActive) },
    )
    return () => trigger.kill()
  }, [reducedMotion])

  return (
    <div ref={floatRef} className={`globe-float ${ready ? 'is-ready' : ''}`}>
      <span aria-hidden="true" className="globe-shadow" />
      <div className="globe-bob">
        <div className="globe-canvas">
          {phone && <img src="/globe/earth-still.webp" alt="" aria-hidden="true" width="800" height="800" className="globe-still" />}
          {loaded && (
            <Suspense fallback={null}>
              <EarthVisual active={active} reducedMotion={reducedMotion} onReady={onReady} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}

/** The earth floats in front of the wall. It turns by itself, and visitors can spin it. */
export default function GlobeWall() {
  return (
    <Wall id="worldwide" wall="globe" label="Where we work" exit="portal:.globe-float" className="globe-scene">
      <div className="wall__body">
        <div className="globe-copy">
          <Lines className="wall-h" lines={['Built in India.', 'Working worldwide.']} />
          <p className="wall-lead">
            We work with clients across India, Ireland, the UK, the US, the UAE and Cyprus.
          </p>
          <ul className="flag-list">
            {clientCountries.map((country) => (
              <li key={country.code}>
                <img src={`/flags/${country.code}.svg`} alt="" width="28" height="28" />
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Earth />
    </Wall>
  )
}
