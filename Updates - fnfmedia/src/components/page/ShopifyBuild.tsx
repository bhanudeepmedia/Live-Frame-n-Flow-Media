import { useEffect, useRef, useState } from 'react'
import { Check, CreditCard, MessageCircle, PackageCheck, ShoppingBag, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import gsap from 'gsap'
import { brands } from '@/components/home/ServiceIcon'
import './shopify-build.css'

const route = 'M94 89 H506 C 596 89 596 327 467 327 H197'

type Block = [x: number, y: number, width: number, height: number, kind: 'fill' | 'soft' | 'line' | 'accent']

const journey: { name: string; x: number; y: number; blocks: Block[] }[] = [
  {
    name: 'Home',
    x: 30,
    y: 24,
    blocks: [
      [8, 8, 112, 50, 'fill'],
      [8, 66, 34, 28, 'soft'],
      [47, 66, 34, 28, 'soft'],
      [86, 66, 34, 28, 'soft'],
      [8, 102, 70, 7, 'line'],
      [8, 114, 44, 7, 'line'],
    ],
  },
  {
    name: 'Collection',
    x: 236,
    y: 24,
    blocks: [
      [8, 8, 34, 34, 'soft'],
      [47, 8, 34, 34, 'fill'],
      [86, 8, 34, 34, 'soft'],
      [8, 47, 34, 34, 'fill'],
      [47, 47, 34, 34, 'soft'],
      [86, 47, 34, 34, 'fill'],
      [8, 88, 34, 34, 'soft'],
      [47, 88, 34, 34, 'fill'],
      [86, 88, 34, 34, 'soft'],
    ],
  },
  {
    name: 'Product',
    x: 442,
    y: 24,
    blocks: [
      [8, 8, 54, 114, 'fill'],
      [70, 12, 50, 7, 'line'],
      [70, 25, 36, 7, 'line'],
      [70, 44, 50, 5, 'line'],
      [70, 54, 50, 5, 'line'],
      [70, 64, 30, 5, 'line'],
      [70, 100, 50, 22, 'accent'],
    ],
  },
  {
    name: 'Cart',
    x: 339,
    y: 262,
    blocks: [
      [8, 8, 28, 28, 'fill'],
      [44, 12, 76, 6, 'line'],
      [44, 24, 46, 6, 'line'],
      [8, 44, 28, 28, 'soft'],
      [44, 48, 76, 6, 'line'],
      [44, 60, 46, 6, 'line'],
      [8, 96, 112, 26, 'accent'],
    ],
  },
  {
    name: 'Checkout',
    x: 133,
    y: 262,
    blocks: [
      [8, 8, 112, 18, 'soft'],
      [8, 32, 112, 18, 'soft'],
      [8, 56, 53, 18, 'soft'],
      [67, 56, 53, 18, 'soft'],
      [8, 96, 112, 26, 'accent'],
    ],
  },
]

const links: { name: string; y: number; Icon: LucideIcon }[] = [
  { name: 'Payment gateway', y: 72, Icon: CreditCard },
  { name: 'Shipping gateway', y: 220, Icon: Truck },
  { name: 'WhatsApp', y: 368, Icon: MessageCircle },
]

const liquid: { text: string; builds?: string }[] = [
  { text: "{% section 'header' %}", builds: '.sb-store__nav' },
  { text: "{% section 'hero' %}", builds: '.sb-store__hero' },
  { text: '{% for product in products %}' },
  { text: "  {% render 'product-card' %}", builds: '.sb-store__grid i' },
  { text: '{% endfor %}' },
  { text: "{% section 'footer' %}", builds: '.sb-store__foot' },
]

const updates: { text: string; Icon: LucideIcon }[] = [
  { text: 'New order received', Icon: ShoppingBag },
  { text: 'Payment confirmed', Icon: CreditCard },
  { text: 'Shipping label ready', Icon: PackageCheck },
  { text: 'Customer updated on WhatsApp', Icon: MessageCircle },
]

/** Each scene plays through once when its step arrives, then its last part loops. */
function scene(after: () => void) {
  return gsap.timeline({ paused: true, onComplete: after })
}

function planScene(root: HTMLElement) {
  const path = root.querySelector<SVGPathElement>('.sb-route')
  const walker = root.querySelector('.sb-walker')
  const cards = gsap.utils.toArray<SVGGElement>(root.querySelectorAll('.sb-page'))
  if (!path || !walker) return gsap.timeline()

  const length = path.getTotalLength()
  const pass = 5
  const walk = { at: 0 }
  // How far along the route each page sits, found by walking it.
  const stops = cards.map((card) => {
    const box = card.getBBox()
    const middle = { x: box.x + box.width / 2, y: box.y + 65 }
    let closest = 0
    let best = Infinity
    for (let at = 0; at <= 1; at += 0.005) {
      const point = path.getPointAtLength(at * length)
      const gap = Math.hypot(point.x - middle.x, point.y - middle.y)
      if (gap < best) {
        best = gap
        closest = at
      }
    }
    return closest
  })

  const timeline = scene(() => timeline.play('loop'))
  timeline
    .fromTo(
      cards,
      { opacity: 0, y: 16, scale: 0.92, transformOrigin: '50% 50%' },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.12 },
      0.15,
    )
    .fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.3, ease: 'sine.inOut' }, 0.45)
    .addLabel('loop', 1.9)
    .set(walker, { opacity: 1 }, 'loop')
    .fromTo(
      walk,
      { at: 0 },
      {
        at: 1,
        duration: pass,
        ease: 'none',
        onUpdate: () => {
          const point = path.getPointAtLength(walk.at * length)
          walker.setAttribute('cx', String(point.x))
          walker.setAttribute('cy', String(point.y))
        },
      },
      'loop',
    )
  cards.forEach((card, index) => {
    const at = `loop+=${stops[index] * pass}`
    timeline
      .to(card, { scale: 1.07, duration: 0.24, ease: 'sine.out' }, at)
      .to(card, { scale: 1, duration: 0.42, ease: 'sine.inOut' }, `${at}+=0.24`)
      .fromTo(card.querySelector('.sb-page__box'), { stroke: '#153a66' }, { stroke: '#e2a32d', duration: 0.2 }, at)
      .to(card.querySelector('.sb-page__box'), { stroke: '#153a66', duration: 0.5 }, `${at}+=0.5`)
  })
  timeline.fromTo(root.querySelector('.sb-done'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, `loop+=${pass - 0.1}`)
  timeline.to(root.querySelector('.sb-done'), { scale: 0, duration: 0.3, ease: 'sine.in' }, `loop+=${pass + 1}`)
  timeline.set(walker, { opacity: 0 }, `loop+=${pass + 1.3}`)
  return timeline
}

function codeScene(root: HTMLElement) {
  const lines = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.sb-line'))
  const hero = root.querySelector('.sb-store__hero')
  const timeline = scene(() => timeline.play('loop'))
  let at = 0.3

  timeline.fromTo(root.querySelector('.sb-editor'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0)
  timeline.fromTo(root.querySelector('.sb-store'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.1)
  timeline.fromTo(root.querySelector('.sb-admin'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 3.5)

  liquid.forEach((line, index) => {
    const typing = line.text.length * 0.024
    timeline.fromTo(lines[index], { width: 0 }, { width: `${line.text.length}ch`, duration: typing, ease: `steps(${line.text.length})` }, at)
    if (line.builds) {
      const parts = root.querySelectorAll(line.builds)
      timeline.fromTo(
        parts,
        { opacity: 0, scale: 0.86, transformOrigin: '50% 0%' },
        { opacity: 1, scale: 1, duration: 0.42, ease: 'power3.out', stagger: 0.05 },
        at + typing - 0.04,
      )
    }
    at += typing + 0.12
  })

  timeline.addLabel('loop', 4.1)
  ;['#b3221f', '#153a66', '#e2a32d'].forEach((color, index) => {
    timeline.to(hero, { backgroundColor: color, duration: 0.5, ease: 'sine.inOut' }, `loop+=${0.5 + index * 1.6}`)
    timeline.to(root.querySelectorAll('.sb-admin i')[index], { scale: 1.3, duration: 0.2, ease: 'sine.out' }, `loop+=${0.5 + index * 1.6}`)
    timeline.to(root.querySelectorAll('.sb-admin i')[index], { scale: 1, duration: 0.3, ease: 'sine.inOut' }, `loop+=${0.9 + index * 1.6}`)
  })
  timeline.set({}, {}, 'loop+=5.2')
  return timeline
}

function connectScene(root: HTMLElement) {
  const wires = gsap.utils.toArray<SVGPathElement>(root.querySelectorAll('.sb-wire'))
  const nodes = gsap.utils.toArray<SVGGElement>(root.querySelectorAll('.sb-node'))
  const packets = gsap.utils.toArray<SVGCircleElement>(root.querySelectorAll('.sb-packet'))
  const timeline = scene(() => timeline.play('loop'))

  timeline.fromTo(
    root.querySelector('.sb-hub'),
    { opacity: 0, scale: 0.8, transformOrigin: '50% 50%' },
    { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
    0.1,
  )
  wires.forEach((wire, index) => {
    const at = 0.6 + index * 0.55
    timeline
      .fromTo(nodes[index], { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }, at)
      .fromTo(wire, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.55, ease: 'sine.inOut' }, at + 0.05)
      .fromTo(nodes[index].querySelector('.sb-state'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, at + 0.55)
      .fromTo(
        nodes[index].querySelector('.sb-tick'),
        { scale: 0, transformOrigin: '50% 50%' },
        { scale: 1, duration: 0.4, ease: 'back.out(2.4)' },
        at + 0.55,
      )
  })

  timeline.addLabel('loop', 2.6)
  wires.forEach((wire, index) => {
    const length = wire.getTotalLength()
    const packet = packets[index]
    const trip = { at: 0 }
    const start = `loop+=${index * 0.55}`
    timeline
      .set(packet, { opacity: 1 }, start)
      .fromTo(
        trip,
        { at: 0 },
        {
          at: 1,
          duration: 0.95,
          ease: 'sine.inOut',
          onUpdate: () => {
            const point = wire.getPointAtLength(trip.at * length)
            packet.setAttribute('cx', String(point.x))
            packet.setAttribute('cy', String(point.y))
          },
        },
        start,
      )
      .set(packet, { opacity: 0 }, `${start}+=0.95`)
      .to(nodes[index].querySelector('.sb-node__box'), { fill: '#f7e3b7', duration: 0.2 }, `${start}+=0.9`)
      .to(nodes[index].querySelector('.sb-node__box'), { fill: '#f3efe9', duration: 0.5 }, `${start}+=1.15`)
  })
  timeline.set({}, {}, 'loop+=3.2')
  return timeline
}

function liveScene(root: HTMLElement) {
  const notes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.sb-note'))
  const cursor = root.querySelector('.sb-cursor')
  const button = root.querySelector('.sb-cover button')
  const status = root.querySelector('.sb-status')
  const timeline = scene(() => timeline.play('loop'))

  timeline
    .fromTo(root.querySelector('.sb-browser'), { y: 34, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, 0)
    .fromTo(root.querySelector('.sb-url'), { width: 0 }, { width: '13ch', duration: 0.7, ease: 'steps(13)' }, 0.4)
    .set(status, { attr: { 'data-live': 'false' } }, 0)
    .fromTo(cursor, { x: 90, y: 70, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 1.05)
    .to(button, { scale: 0.93, duration: 0.09, ease: 'sine.out' }, 1.9)
    .to(button, { scale: 1, duration: 0.14, ease: 'sine.inOut' }, 1.99)
    .to(cursor, { opacity: 0, duration: 0.25 }, 2.15)
    .fromTo(root.querySelector('.sb-cover'), { yPercent: 0 }, { yPercent: -102, duration: 0.8, ease: 'power3.inOut' }, 2.1)
    .fromTo(root.querySelectorAll('.sb-shop > *'), { y: 16 }, { y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07 }, 2.2)
    .set(status, { attr: { 'data-live': 'true' } }, 2.5)
    .addLabel('loop', 2.9)

  gsap.set(notes, { opacity: 0, y: 18 })
  notes.forEach((note, index) => {
    const at = `loop+=${index * 1.7}`
    timeline
      .fromTo(note, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, at)
      .to(note, { y: -12, opacity: 0, duration: 0.35, ease: 'sine.in' }, `${at}+=1.35`)
  })
  return timeline
}

/**
 * The picture beside "How we build", one short motion graphic per step, in the
 * same order as `shopifySteps`. Only the step on screen plays. With reduced
 * motion the scenes stay as they are in the markup, finished and still.
 */
export default function ShopifyBuild({ active }: { active: number }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const scenes = useRef<gsap.core.Timeline[]>([])
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const parts = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.shopify-show__part'))
    const context = gsap.context(() => {
      scenes.current = [planScene(parts[0]), codeScene(parts[1]), connectScene(parts[2]), liveScene(parts[3])]
    }, root)

    const watcher = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    watcher.observe(root)

    return () => {
      watcher.disconnect()
      context.revert()
      scenes.current = []
    }
  }, [])

  useEffect(() => {
    scenes.current.forEach((timeline, index) => {
      if (inView && index === active) timeline.restart()
      else timeline.pause()
    })
  }, [active, inView])

  return (
    <div ref={rootRef} aria-hidden="true" className="shopify-show">
      <div data-active={active === 0} className="shopify-show__part sb-plan">
        <svg viewBox="0 0 600 440" className="sb-art">
          <path d={route} pathLength={1} className="sb-route" />
          <circle cx={94} cy={89} r={9} className="sb-walker" />
          {journey.map((page) => (
            <g key={page.name} className="sb-page">
              <rect x={page.x} y={page.y} width={128} height={130} rx={10} className="sb-page__box" />
              {page.blocks.map(([x, y, width, height, kind], index) => (
                <rect key={index} x={page.x + x} y={page.y + y} width={width} height={height} rx={3} className={`sb-block sb-block--${kind}`} />
              ))}
              <text x={page.x + 64} y={page.y + 160} textAnchor="middle" className="sb-label">
                {page.name}
              </text>
            </g>
          ))}
          <g className="sb-done">
            <circle cx={261} cy={262} r={18} />
            <Check x={250} y={251} width={22} height={22} strokeWidth={3} />
          </g>
        </svg>
        <p className="sb-caption">Your customer&apos;s path through the store</p>
      </div>

      <div data-active={active === 1} className="shopify-show__part sb-code">
        <div className="sb-split">
          <div className="sb-editor">
            <span className="sb-editor__file">theme.liquid</span>
            {liquid.map((line) => (
              <code key={line.text} className="sb-line" style={{ width: `${line.text.length}ch` }}>
                {line.text}
              </code>
            ))}
          </div>
          <div className="sb-store">
            <div className="sb-store__nav" />
            <div className="sb-store__hero" />
            <div className="sb-store__grid">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <i key={item} />
              ))}
            </div>
            <div className="sb-store__foot" />
          </div>
        </div>
        <p className="sb-admin">
          Editable from the Shopify admin
          <i />
          <i />
          <i />
        </p>
      </div>

      <div data-active={active === 2} className="shopify-show__part sb-connect">
        <svg viewBox="0 0 600 440" className="sb-art">
          {links.map((link) => (
            <path key={link.name} d={`M190 220 C 270 220 270 ${link.y} 342 ${link.y}`} pathLength={1} className="sb-wire" />
          ))}
          {links.map((link) => (
            <circle key={link.name} cx={190} cy={220} r={7} className="sb-packet" />
          ))}
          <g className="sb-hub">
            <rect x={28} y={136} width={168} height={168} rx={16} />
            <svg x={64} y={172} width={96} height={96} viewBox="0 0 24 24">
              <path d={brands.shopify} />
            </svg>
          </g>
          {links.map(({ name, y, Icon }) => (
            <g key={name} className="sb-node">
              <rect x={338} y={y - 50} width={246} height={100} rx={12} className="sb-node__box" />
              <Icon x={354} y={y - 16} width={32} height={32} className="sb-node__icon" />
              <text x={398} y={y - 3} className="sb-node__name">
                {name}
              </text>
              <text x={398} y={y + 24} className="sb-state">
                Connected
              </text>
              <g className="sb-tick">
                <circle cx={556} cy={y + 18} r={13} />
                <Check x={548} y={y + 10} width={16} height={16} strokeWidth={3.4} />
              </g>
            </g>
          ))}
        </svg>
        <p className="sb-caption">Set up and tested before launch</p>
      </div>

      <div data-active={active === 3} className="shopify-show__part sb-live">
        <div className="sb-browser">
          <div className="sb-browser__bar">
            <span className="sb-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="sb-url">yourstore.com</span>
            <span data-live="true" className="sb-status">
              <i />
              <b>Preview</b>
              <b>Live</b>
            </span>
          </div>
          <div className="sb-browser__page">
            <div className="sb-shop">
              <div className="sb-shop__nav">
                <i />
                <ShoppingBag />
              </div>
              <div className="sb-shop__hero">
                <span>Shop now</span>
              </div>
              <div className="sb-shop__row">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="sb-cover">
              <span>Coming soon</span>
              <button type="button" tabIndex={-1}>
                Go live
              </button>
              <svg viewBox="0 0 24 24" className="sb-cursor">
                <path d="M5 3l14 9.2-6.3 1.3L16.4 21l-3 1.5-3.6-7.6L5 19z" />
              </svg>
            </div>
          </div>
        </div>
        <ul className="sb-notes">
          {updates.map(({ text, Icon }) => (
            <li key={text} className="sb-note">
              <Icon />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
