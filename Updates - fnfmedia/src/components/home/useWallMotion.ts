import { useEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scroller } from '@/components/layout/scroller'

gsap.registerPlugin(ScrollTrigger)

const REST = 'is-live'

/** Used in turn for sections that do not name their own exit. */
const CYCLE = ['lift', 'dolly', 'tilt', 'dolly-back', 'cascade']

type Move = (timeline: gsap.core.Timeline, from: HTMLElement, to: HTMLElement, target?: string) => void

const screen = () => ({ width: window.innerWidth, height: window.innerHeight })

const phone = () => window.innerWidth <= 900

const STILL = { ease: 'none', immediateRender: false }

/** Everything that follows a section's heading into place. */
const FOLLOWERS = [
  '.wall__body > :not(.wall-h, .page-split, .page-head, .case-grid, .testimonial, .globe-copy, .founder-top)',
  '.globe-copy > :not(.wall-h)',
  '.page-split__copy > :not(h1, h2)',
  '.page-split__side',
  '.page-head > p',
  '.case-grid > *',
  '.testimonial > *',
  '.founder-copy > *',
].join(', ')

/** Where an element sits within its section. */
function place(element: Element, stage: HTMLElement) {
  const box = element.getBoundingClientRect()
  const area = stage.getBoundingClientRect()
  return {
    width: box.width,
    height: box.height,
    centerX: box.left - area.left + box.width / 2,
    centerY: box.top - area.top + box.height / 2,
  }
}

/** Openings as they stand on their walls, measured before any motion moves them. */
const openings = new WeakMap<Element, ReturnType<typeof place>>()

function parts(stage: HTMLElement) {
  return {
    wall: stage.querySelector<HTMLElement>('.scene__wall'),
    frame: stage.querySelector<HTMLElement>('.scene__frame'),
    shade: stage.querySelector<HTMLElement>('.scene__shade'),
  }
}

function show(timeline: gsap.core.Timeline, stage: HTMLElement) {
  timeline.set(stage, { opacity: 1 }, 0.001)
}

/** The heading climbs out of its line, then the rest of the section follows it in. */
function enter(timeline: gsap.core.Timeline, stage: HTMLElement, at: number, skip = '') {
  const lines = stage.querySelectorAll('.wl__in')
  const followers = gsap.utils.toArray<HTMLElement>(stage.querySelectorAll(FOLLOWERS)).filter((item) => !skip || !item.matches(skip))
  if (lines.length) {
    timeline.fromTo(lines, { yPercent: 112 }, { yPercent: 0, duration: 0.34, ease: 'power3.out', stagger: 0.05 }, at)
  }
  if (followers.length) {
    timeline.fromTo(
      followers,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', stagger: { amount: Math.max(1 - at - 0.42, 0.04) } },
      at + 0.1,
    )
  }
}

/** The section falls back into the dark as the next one comes forward. */
function recede(timeline: gsap.core.Timeline, stage: HTMLElement) {
  const { frame, shade } = parts(stage)
  gsap.set(stage, { transformOrigin: '50% 40%' })
  timeline.fromTo(stage, { scale: 1 }, { ...STILL, scale: 0.9, duration: 1, ease: 'power2.inOut' }, 0)
  if (frame) timeline.fromTo(frame, { y: 0 }, { ...STILL, y: -screen().height * 0.05, duration: 1 }, 0)
  if (shade) timeline.fromTo(shade, { opacity: 0 }, { ...STILL, opacity: 0.72, duration: 1 }, 0)
}

/** The camera tracks along the wall. The lettering is nearer than the wall, so it moves further. */
function track(timeline: gsap.core.Timeline, from: HTMLElement, to: HTMLElement, side: number) {
  const { width } = screen()
  const ease = 'power2.inOut'
  const near = parts(from).frame
  const arriving = parts(to).frame
  show(timeline, to)
  timeline
    .fromTo(from, { x: 0 }, { ...STILL, x: -side * width, duration: 1, ease }, 0)
    .fromTo(to, { x: side * width }, { x: 0, duration: 1, ease }, 0)
  if (near) timeline.fromTo(near, { x: 0 }, { ...STILL, x: -side * width * 0.28, duration: 1, ease }, 0)
  if (arriving) timeline.fromTo(arriving, { x: side * width * 0.34 }, { x: 0, duration: 1, ease }, 0)
  enter(timeline, to, 0.44)
}

/**
 * The takeover on a phone, one move from start to finish. The next section stands
 * behind the hero the whole time, so it never has to be drawn in the middle of a
 * swipe. The websites rise with the finger and keep rising as they fade, the hero's
 * wall clears from behind them, and the earth and its words come up as they go.
 */
function rise(timeline: gsap.core.Timeline, from: HTMLElement, to: HTMLElement, band: HTMLElement, strip: HTMLElement) {
  const earth = to.querySelector('.globe-float')
  const words = to.querySelector('.globe-copy')

  gsap.set(to, { opacity: 1 })
  timeline.fromTo(band, { y: 0 }, { ...STILL, y: -strip.offsetTop - band.offsetHeight * 0.24, duration: 0.82 }, 0)
  timeline.fromTo([from.querySelector('.hero-trust'), from.querySelector('.hero-pause')], { opacity: 1 }, { ...STILL, opacity: 0, duration: 0.1 }, 0)
  timeline.fromTo(from.querySelector('.hero-copy'), { opacity: 1 }, { ...STILL, opacity: 0, duration: 0.24 }, 0)
  timeline.fromTo(from.querySelector('.hero-ledge'), { opacity: 1 }, { ...STILL, opacity: 0, duration: 0.3 }, 0)
  timeline.fromTo(parts(from).wall, { opacity: 1 }, { ...STILL, opacity: 0, duration: 0.32, ease: 'sine.inOut' }, 0.18)
  timeline.fromTo(band, { opacity: 1 }, { ...STILL, opacity: 0, duration: 0.38, ease: 'sine.inOut' }, 0.4)

  if (earth) timeline.fromTo(earth, { y: 56, scale: 0.92 }, { y: 0, scale: 1, duration: 0.56, ease: 'sine.out' }, 0.44)
  if (words) timeline.fromTo(words, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: 'sine.out' }, 0.66)
  // Its websites keep running otherwise, for the whole of the page below.
  timeline.set(from, { visibility: 'hidden' }, 1)
}

const moves: Record<string, Move> = {
  /**
   * The hero's websites slide across until they fill the screen. Once they cover
   * it, the next section is put in place behind them and they fade away to show it.
   */
  takeover: (timeline, from, to) => {
    const band = from.querySelector<HTMLElement>('.hero-band')
    const strip = from.querySelector<HTMLElement>('.hero-strip')
    if (!band || !strip) return moves.lift(timeline, from, to)
    if (phone()) return rise(timeline, from, to, band, strip)

    const columns = gsap.utils
      .toArray<HTMLElement>(band.querySelectorAll('.hero-col'))
      .filter((column) => column.offsetWidth > 0)
    const plates = columns.map((column) => column.querySelector('.hero-col__plate'))
    const copy = from.querySelector('.hero-copy')
    const trust = from.querySelector('.hero-trust')
    const pause = from.querySelector('.hero-pause')
    const dim = from.querySelector('.hero-dim')
    const ledge = from.querySelector('.hero-ledge')
    const { wall } = parts(from)
    const earth = to.querySelector('.globe-float')
    const covered = 0.5
    const ease = 'power2.inOut'
    const across = -band.offsetLeft

    timeline.fromTo(band, { x: 0 }, { ...STILL, x: across, duration: covered, ease }, 0)
    timeline.fromTo(copy, { x: 0 }, { ...STILL, x: across * 1.06, duration: covered, ease }, 0)
    timeline.fromTo([trust, pause], { opacity: 1 }, { ...STILL, opacity: 0, duration: 0.12 }, 0)
    timeline.fromTo(dim, { opacity: 0 }, { ...STILL, opacity: 1, duration: covered * 0.8 }, 0)
    timeline.fromTo(ledge, { yPercent: 0 }, { ...STILL, yPercent: 22, duration: covered * 0.6, ease }, 0)

    timeline.set(plates, { opacity: 1 }, covered)
    timeline.set([wall, copy, dim, ledge], { opacity: 0 }, covered)
    timeline.set(to, { opacity: 1 }, covered)

    // The websites fade out together, each column still drifting the way it ran,
    // so the section behind comes through them with no edge to catch the eye.
    columns.forEach((column) => {
      const rising = !column.querySelector('.hero-run--rev')
      timeline.fromTo(column, { yPercent: 0 }, { ...STILL, yPercent: rising ? -9 : 9, duration: 1 - covered, ease: 'sine.inOut' }, covered)
    })
    timeline.fromTo(band, { autoAlpha: 1 }, { ...STILL, autoAlpha: 0, duration: 0.4, ease: 'sine.inOut' }, covered + 0.02)

    if (earth) timeline.fromTo(earth, { scale: 0.84 }, { scale: 1, duration: 0.42, ease: 'sine.out' }, 0.56)
    enter(timeline, to, 0.66)
  },

  /** The next section comes up in front of this one. The earth rises over its horizon. */
  lift: (timeline, from, to) => {
    show(timeline, to)
    recede(timeline, from)
    timeline.fromTo(to, { y: screen().height }, { y: 0, duration: 1, ease: 'power3.inOut' }, 0)
    const earth = to.querySelector('.globe-float')
    if (earth) {
      timeline.fromTo(earth, { y: screen().height * 0.5, scale: 0.56 }, { y: 0, scale: 1, duration: 0.72, ease: 'power2.out' }, 0.28)
    }
    enter(timeline, to, 0.42)
  },

  /** The camera tilts up to the wall above. */
  tilt: (timeline, from, to) => {
    const { shade } = parts(from)
    const height = screen().height
    show(timeline, to)
    timeline
      .fromTo(from, { y: 0 }, { ...STILL, y: height * 0.46, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(to, { y: -height }, { y: 0, duration: 1, ease: 'power2.inOut' }, 0)
    if (shade) timeline.fromTo(shade, { opacity: 0 }, { ...STILL, opacity: 0.6, duration: 1 }, 0)
    enter(timeline, to, 0.44)
  },

  dolly: (timeline, from, to) => track(timeline, from, to, 1),
  'dolly-back': (timeline, from, to) => track(timeline, from, to, -1),

  /** The tiles rise in columns ahead of their wall, which closes in behind them. */
  cascade: (timeline, from, to) => {
    const tiles = gsap.utils.toArray<HTMLElement>(to.querySelectorAll('.work-card, .page-card, .page-steps li'))
    const { wall } = parts(to)
    if (!tiles.length || !wall) return moves.lift(timeline, from, to)

    const lefts = [...new Set(tiles.map((tile) => tile.offsetLeft))].sort((a, b) => a - b)
    show(timeline, to)
    recede(timeline, from)
    timeline.fromTo(
      wall,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.58, ease: 'power2.inOut' },
      0.42,
    )
    tiles.forEach((tile) => {
      const column = lefts.indexOf(tile.offsetLeft)
      timeline.fromTo(
        tile,
        { y: screen().height * (1.1 + (column % 2) * 0.24) },
        { y: 0, duration: 0.6, ease: 'power3.out' },
        0.04 + column * 0.05,
      )
    })
    enter(timeline, to, 0.56, '.work-grid, .page-cards, .page-steps')
  },

  /** The camera flies at an opening in this section, the earth or a picture, and through it. */
  portal: (timeline, from, to, target) => {
    const opening = target ? from.querySelector(target) : null
    const spot = opening && openings.get(opening)
    if (!opening || !spot) return moves.lift(timeline, from, to)

    const round = opening.matches('.globe-float')
    const width = from.offsetWidth
    const height = Math.min(from.offsetHeight, screen().height)
    const middle = { x: width / 2, y: height / 2 }
    const reach = 1.03 * (round ? Math.hypot(width, height) / spot.width : Math.max(width / spot.width, height / spot.height))
    const { wall, frame } = parts(to)
    const copy = from.querySelectorAll('.globe-copy, .page-split__copy, .founder-top > :not(.founder-photo)')
    const camera = { travel: 0, open: 0 }
    const held = parseFloat(getComputedStyle(from).top)

    gsap.set(from, { x: 0, y: 0, scale: 1, transformOrigin: '0 0' })
    const setX = gsap.quickSetter(from, 'x', 'px')
    const setY = gsap.quickSetter(from, 'y', 'px')
    const setScaleX = gsap.quickSetter(from, 'scaleX')
    const setScaleY = gsap.quickSetter(from, 'scaleY')

    const fly = () => {
      const zoom = reach ** camera.travel
      const x = spot.centerX + (middle.x - spot.centerX) * camera.travel
      const y = spot.centerY + (middle.y - spot.centerY) * camera.travel
      setX(x - zoom * spot.centerX)
      setY(y - zoom * spot.centerY)
      setScaleX(zoom)
      setScaleY(zoom)
      const across = spot.width * zoom * camera.open
      const down = spot.height * zoom * camera.open
      // A tall next section is still scrolling up while this one holds, so the opening
      // is cut where this one stands, not at the same spot in the next section.
      const inTo = y + held - to.getBoundingClientRect().top
      if (camera.travel === 1) to.style.clipPath = 'none'
      else if (round) to.style.clipPath = `circle(${across / 2}px at ${x}px ${inTo}px)`
      else to.style.clipPath = `inset(${inTo - down / 2}px ${width - x - across / 2}px ${to.offsetHeight - inTo - down / 2}px ${x - across / 2}px)`
    }

    fly()
    gsap.set(to, { opacity: 1 })
    timeline.eventCallback('onUpdate', fly)
    timeline.to(camera, { travel: 1, duration: 1, ease: 'power2.inOut' }, 0)
    timeline.to(camera, { open: 1, duration: 0.3, ease: 'power2.inOut' }, 0.3)
    timeline.fromTo(copy, { opacity: 1 }, { ...STILL, opacity: 0, duration: 0.2 }, 0)
    timeline.fromTo([wall, frame].filter(Boolean), { scale: 1.5 }, { scale: 1, duration: 0.72, ease: 'power2.out' }, 0.28)
  },
}

/** The founder's frame comes down onto its wall and settles, then he signs. */
function arrive(timeline: gsap.core.Timeline, stage: HTMLElement) {
  const frame = stage.querySelector('[data-hang]')
  const autograph = stage.querySelector('[data-sign]')
  if (frame) {
    timeline
      .fromTo(frame, { y: -screen().height * 1.1 }, { y: 0, duration: 0.3, ease: 'power3.out' }, 0.5)
      .fromTo(frame, { rotation: -7, transformOrigin: '50% -8%' }, { rotation: 2.4, duration: 0.3, ease: 'sine.out' }, 0.5)
      .to(frame, { rotation: -0.9, duration: 0.1, ease: 'sine.inOut' }, 0.8)
      .to(frame, { rotation: 0, duration: 0.1, ease: 'sine.inOut' }, 0.9)
  }
  if (autograph) {
    timeline.fromTo(autograph, { clipPath: 'inset(-10% 100% -10% 0)' }, { clipPath: 'inset(-10% 0% -10% 0)', duration: 0.2, ease: 'sine.inOut' }, 0.8)
  }
}

/**
 * All scroll motion for a page. Each section holds still under the header while
 * the next one arrives through its own transition. The sections overlap by
 * `--cross`, the stretch of scroll a transition takes, and a scroll that stops
 * part way finishes it. Only transforms and clips change on scroll, so client
 * images never repaint. A frame that does not fit the screen (an article, a very
 * short phone) scrolls to its end first. Under prefers-reduced-motion, and on
 * every page but Home (`enabled` is off), the page is plain flow, set in home.css.
 * So are `flow` sections on a phone, which scroll in with no transition.
 */
export default function useWallMotion(rootRef: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const scenes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-wall]'))
    const stages = scenes.map((scene) => scene.querySelector('.scene__stage') as HTMLElement)
    const frames = stages.map((stage) => stage.querySelector('.scene__frame') as HTMLElement)

    document.querySelectorAll<HTMLImageElement>('.scene__wall img, .hero-card img, .globe-still').forEach((image) => {
      image.decode().catch(() => undefined)
    })

    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header'))
    const cross = () => root.querySelector<HTMLElement>('[data-cross]')?.offsetHeight ?? 0
    /** The stretch of scroll a section's arrival takes: how far it overlaps the last one, less a screen. */
    const arrival = (scene: HTMLElement) => Math.max(-parseFloat(getComputedStyle(scene).marginTop) - stages[0].offsetHeight, 0)
    const handover = (scene: HTMLElement) => `top ${header - arrival(scene) / 2}px`
    const flowing = (scene: HTMLElement) => phone() && scene.dataset.flow !== undefined

    let ctx: gsap.Context | undefined
    let settle = 0
    let transitions: gsap.core.Timeline[] = []

    const build = () => {
      ctx?.revert()
      scenes.forEach((scene, index) => {
        const [name, target] = (scene.dataset.exit ?? '').split(':')
        const opening = name === 'portal' && target ? scene.querySelector(target) : null
        if (opening) openings.set(opening, place(opening, stages[index]))
      })

      ctx = gsap.context(() => {
        transitions = []
        const arrivals: [gsap.core.Timeline, HTMLElement][] = []

        scenes.slice(1).forEach((scene, index) => {
          if (flowing(scene)) return
          const from = stages[index]
          const to = stages[index + 1]
          gsap.set(to, { opacity: 0 })

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            // A phone reports scroll in uneven steps, so its one move glides between them.
            scrollTrigger: { trigger: scene, start: `top ${header}px`, end: () => `+=${arrival(scene)}`, scrub: phone() ? 0.3 : true },
          })
          const exit = scenes[index].dataset.exit ?? CYCLE[index % CYCLE.length]
          const split = exit.indexOf(':')
          const name = split < 0 ? exit : exit.slice(0, split)
          ;(moves[name] ?? moves.lift)(timeline, from, to, split < 0 ? undefined : exit.slice(split + 1))
          // Fully covered now, so nothing behind it can show when the next section moves.
          timeline.set(from, { opacity: 0 }, 1)
          transitions.push(timeline)
          arrivals.push([timeline, to])
        })

        // After the moves, which measure sections as they stand on the wall.
        arrivals.forEach(([timeline, to]) => arrive(timeline, to))

        // A trigger is off at its exact start, so the first one starts above the page.
        // At 0, the hero's buttons could not be clicked until the visitor scrolled.
        scenes.forEach((scene, index) => {
          if (flowing(scene)) return
          const next = scenes[index + 1]
          ScrollTrigger.create({
            trigger: scene,
            start: index === 0 ? -1 : () => handover(scene),
            endTrigger: next,
            end: next ? () => handover(next) : 'max',
            toggleClass: { targets: stages[index], className: REST },
          })
        })
      })
      ScrollTrigger.refresh()
    }

    // A scroll that stops inside a transition finishes it, the way the visitor was going.
    // Lenis does this itself, so nothing else pulls on the scroll. `rested` is where they
    // last stopped, because scroll direction can tick backwards as smooth scrolling ends.
    // A phone is left alone: the finish locks the page, and the next swipe gets lost.
    let rested = window.scrollY
    let finishing = false
    let idle = 0
    let fingerDown = false

    const glide = (target: number) => {
      const lenis = scroller.lenis
      if (!lenis) return
      finishing = true
      lenis.scrollTo(target, {
        duration: gsap.utils.clamp(0.9, 2.2, (Math.abs(target - window.scrollY) / cross()) * 1.2),
        easing: (progress) => (1 - Math.cos(Math.PI * progress)) / 2,
        lock: true,
        force: true,
        onComplete: () => {
          finishing = false
          rested = target
        },
      })
    }

    const finish = () => {
      const lenis = scroller.lenis
      if (!lenis || finishing) return
      // Takes over as the wheel's glide fades, so the move doesn't pause and start again.
      // Lenis calls a touch scroll "native" for 400ms after it ends, so that isn't waited for.
      const moving =
        lenis.isScrolling === 'smooth' ? Math.abs(lenis.velocity) > 1.2 : lenis.isScrolling === 'native' ? fingerDown : lenis.isScrolling
      if (moving) {
        idle = window.setTimeout(finish, 40)
        return
      }

      const y = window.scrollY
      const inside = transitions.find(({ scrollTrigger: run }) => run && y > run.start + 1 && y < run.end - 1)?.scrollTrigger
      if (!inside) {
        rested = y
        return
      }

      glide(y > rested ? inside.end : inside.start)
    }

    const onScroll = () => {
      if (finishing || phone()) return
      window.clearTimeout(idle)
      idle = window.setTimeout(finish, 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const fingerOn = () => {
      fingerDown = true
    }
    const fingerOff = () => {
      fingerDown = false
    }
    window.addEventListener('touchstart', fingerOn, { passive: true })
    window.addEventListener('touchend', fingerOff, { passive: true })
    window.addEventListener('touchcancel', fingerOff, { passive: true })

    const rebuild = () => {
      window.clearTimeout(settle)
      settle = window.setTimeout(build, 200)
    }

    // Late images and fonts change frame heights, and the transitions are measured from them.
    // A section in plain flow has no transition to measure, so it can't stall a scroll with a rebuild.
    const heights = new Map<HTMLElement, number>()
    const fit = new ResizeObserver(() => {
      const moved = frames.filter((frame, index) => !flowing(scenes[index]) && frame.offsetHeight !== heights.get(frame))
      if (!moved.length) return
      moved.forEach((frame) => {
        heights.set(frame, frame.offsetHeight)
        const over = frame.offsetHeight - parseFloat(getComputedStyle(frame).minHeight)
        frame.parentElement?.style.setProperty('--over', `${Math.max(over, 0)}px`)
      })
      rebuild()
    })
    frames.forEach((frame) => fit.observe(frame))

    // Tabbing moves through the page, so bring the section with the focus on screen.
    const followFocus = (event: FocusEvent) => {
      const scene = (event.target as Element).closest<HTMLElement>('.scene')
      if (scene && !flowing(scene) && !scene.querySelector(`:scope > .${REST}`)) scene.scrollIntoView({ block: 'start' })
    }
    document.addEventListener('focusin', followFocus)

    let width = window.innerWidth
    const resize = () => {
      if (window.innerWidth === width) return
      width = window.innerWidth
      rebuild()
    }
    window.addEventListener('resize', resize)
    window.addEventListener('load', rebuild)
    document.fonts?.ready.then(rebuild)

    // A first section gets the same arrival when the page loads.
    const first = stages[0]
    const opening = gsap.timeline({ defaults: { ease: 'none' }, delay: 0.4, paused: !first.querySelector('[data-hang], [data-sign]') })
    if (!opening.paused()) {
      arrive(opening, first)
      opening.duration(1.6)
    }

    build()

    return () => {
      window.clearTimeout(settle)
      window.clearTimeout(idle)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', fingerOn)
      window.removeEventListener('touchend', fingerOff)
      window.removeEventListener('touchcancel', fingerOff)
      window.removeEventListener('resize', resize)
      window.removeEventListener('load', rebuild)
      document.removeEventListener('focusin', followFocus)
      fit.disconnect()
      opening.kill()
      gsap.set(first.querySelectorAll('[data-hang], [data-sign]'), { clearProps: 'all' })
      ctx?.revert()
    }
  }, [rootRef, enabled])
}
