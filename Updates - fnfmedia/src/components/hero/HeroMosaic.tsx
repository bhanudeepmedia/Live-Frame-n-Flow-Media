import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import '@/components/hero/hero.css'
import { heroBottomRibbon, heroTopRibbon } from '@/data/hero-mosaic'
import type { MosaicTile } from '@/data/hero-mosaic'
import HeroMosaicTile from '@/components/hero/HeroMosaicTile'

interface RibbonKnot {
  x: number
  y: number
  scale: number
  rotateZ: number
  rotateY: number
  rotateX: number
}

/**
 * 7 knots (s = 0..6) per arc, measured directly from the Contra reference image:
 * - Knots s = 1, 2, 3, 4 are the exact 4 visible cards in each arc.
 * - Knots s = 0 (far left exit) and s = 5..6 (far right entry) lie completely
 *   outside the viewport so every card stays 100% solid opaque while on screen.
 * - Top Arc curves UP-LEFT around an upper-right center -> CLOCKWISE (+rotateZ)
 *   from -8deg on the right to +5deg -> +21deg -> +37deg on the top-left.
 * - Bottom Arc mirrors the Top Arc across the horizontal waist ->
 *   COUNTER-CLOCKWISE (-rotateZ) from +4deg on the right to -4deg -> -14deg -> -31deg
 *   on the bottom-left.
 */
const TOP_KNOTS: RibbonKnot[] = [
  // s = 0: completely offscreen top-left
  { x: -28, y: -32, scale: 2.2, rotateZ: 50, rotateY: -24, rotateX: 24 },
  // s = 1: Card T1 (giant top-left angled card, matching blue asterisk card)
  { x: 15, y: 2, scale: 1.72, rotateZ: 37, rotateY: -18, rotateX: 20 },
  // s = 2: Card T2 (upper-middle angled card, matching yellow brick-wall card)
  { x: 49, y: 17, scale: 1.12, rotateZ: 21, rotateY: -9, rotateX: 14 },
  // s = 3: Card T3 (upper-right portrait card, matching woman portrait card)
  { x: 75, y: 25, scale: 0.88, rotateZ: 5, rotateY: -2, rotateX: 9 },
  // s = 4: Card T4 (far top-right card, matching "TRUEFORM MUSIC" card)
  { x: 95, y: 23, scale: 0.8, rotateZ: -8, rotateY: 6, rotateX: 7 },
  // s = 5: offscreen top-right entry
  { x: 115, y: 17, scale: 0.74, rotateZ: -17, rotateY: 12, rotateX: 5 },
  // s = 6: deep offscreen top-right wrap point
  { x: 135, y: 9, scale: 0.7, rotateZ: -25, rotateY: 16, rotateX: 4 },
]

const BOTTOM_KNOTS: RibbonKnot[] = [
  // s = 0: completely offscreen bottom-left
  { x: -12, y: 128, scale: 2.0, rotateZ: -45, rotateY: -22, rotateX: -22 },
  // s = 1: Card B1 (giant bottom-left angled card, matching blue PMM UI card)
  { x: 28, y: 96, scale: 1.54, rotateZ: -31, rotateY: -16, rotateX: -18 },
  // s = 2: Card B2 (lower-middle angled card, matching warm orange portrait card)
  { x: 58, y: 85, scale: 1.06, rotateZ: -14, rotateY: -8, rotateX: -13 },
  // s = 3: Card B3 (lower-right card, matching blue "Harbor" card)
  { x: 80, y: 79, scale: 0.86, rotateZ: -4, rotateY: -2, rotateX: -9 },
  // s = 4: Card B4 (far bottom-right card, matching tablet/stylus card)
  { x: 98, y: 78, scale: 0.78, rotateZ: 4, rotateY: 5, rotateX: -7 },
  // s = 5: offscreen bottom-right entry
  { x: 116, y: 80, scale: 0.74, rotateZ: 12, rotateY: 10, rotateX: -5 },
  // s = 6: deep offscreen bottom-right wrap point
  { x: 135, y: 84, scale: 0.7, rotateZ: 18, rotateY: 14, rotateX: -4 },
]

/** Smooth C1 Catmull-Rom spline evaluation. */
function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t
  const t3 = t2 * t
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  )
}

function sampleSpline(knots: RibbonKnot[], sClamped: number): RibbonKnot {
  const maxIndex = knots.length - 1
  const s = Math.max(0, Math.min(maxIndex - 0.0001, sClamped))
  const i = Math.floor(s)
  const t = s - i

  const k0 = knots[Math.max(0, i - 1)]
  const k1 = knots[i]
  const k2 = knots[Math.min(maxIndex, i + 1)]
  const k3 = knots[Math.min(maxIndex, i + 2)]

  return {
    x: catmullRom(k0.x, k1.x, k2.x, k3.x, t),
    y: catmullRom(k0.y, k1.y, k2.y, k3.y, t),
    scale: catmullRom(k0.scale, k1.scale, k2.scale, k3.scale, t),
    rotateZ: catmullRom(k0.rotateZ, k1.rotateZ, k2.rotateZ, k3.rotateZ, t),
    rotateY: catmullRom(k0.rotateY, k1.rotateY, k2.rotateY, k3.rotateY, t),
    rotateX: catmullRom(k0.rotateX, k1.rotateX, k2.rotateX, k3.rotateX, t),
  }
}

function applyCardStyle(node: HTMLDivElement | null, pose: RibbonKnot, s: number, zIndex: number) {
  if (!node) return
  // Cards are 100% solid opaque across the entire visible screen; only hide at the deep offscreen wrap points
  const visible = s > 0.04 && s < 5.85
  node.style.left = `${pose.x}%`
  node.style.top = `${pose.y}%`
  node.style.opacity = visible ? '1' : '0'
  node.style.zIndex = `${zIndex}`
  node.style.transform = `translate3d(-50%, -50%, 0) perspective(850px) rotateZ(${pose.rotateZ}deg) rotateX(${pose.rotateX}deg) rotateY(${pose.rotateY}deg) scale(${pose.scale})`
}

const MS_PER_SLOT = 4600
const ACTIVE_SLOTS = 6 // s spans [0, 6) across the 7 knots (0..6)

export default function HeroMosaic() {
  const topRefs = useRef<(HTMLDivElement | null)[]>([])
  const bottomRefs = useRef<(HTMLDivElement | null)[]>([])
  const [paused, setPaused] = useState(false)

  const topTiles = heroTopRibbon.slice(0, ACTIVE_SLOTS)
  const bottomTiles = heroBottomRibbon.slice(0, ACTIVE_SLOTS)

  useEffect(() => {
    const renderAtStep = (stepProgress: number) => {
      for (let i = 0; i < ACTIVE_SLOTS; i++) {
        // Continuous one-direction flow along the upper and lower 3D arcs
        const sTop = (((i - stepProgress) % ACTIVE_SLOTS) + ACTIVE_SLOTS) % ACTIVE_SLOTS
        const poseTop = sampleSpline(TOP_KNOTS, sTop)
        applyCardStyle(topRefs.current[i], poseTop, sTop, Math.round((ACTIVE_SLOTS - sTop) * 10))

        const sBottom = (((i - stepProgress) % ACTIVE_SLOTS) + ACTIVE_SLOTS) % ACTIVE_SLOTS
        const poseBottom = sampleSpline(BOTTOM_KNOTS, sBottom)
        applyCardStyle(bottomRefs.current[i], poseBottom, sBottom, Math.round((ACTIVE_SLOTS - sBottom) * 10))
      }
    }

    renderAtStep(0)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || paused) return

    let frameId = 0
    let startTime: number | null = null

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      const stepProgress = elapsed / MS_PER_SLOT
      renderAtStep(stepProgress)
      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [paused])

  const renderTrack = (
    tiles: MosaicTile[],
    refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
    variant: 'top' | 'bottom',
  ) =>
    tiles.map((tile, index) => (
      <div
        key={`${variant}-${tile.id}`}
        ref={(el) => {
          refs.current[index] = el
        }}
        className="pointer-events-auto absolute will-change-[transform,opacity]"
        style={{
          filter: 'drop-shadow(0 22px 36px rgba(8, 22, 60, 0.22))',
        }}
      >
        <HeroMosaicTile tile={tile} variant={variant} />
      </div>
    ))

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* SVG cylindrical barrel/keystone clipPaths matching the curved edges in the reference image */}
      <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
        <defs>
          <clipPath id="hero-ribbon-top-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.09,0.03 C 0.35,0.075 0.65,0.075 0.91,0.03 C 0.955,0.022 0.975,0.055 0.98,0.11 L 0.995,0.86 C 0.998,0.92 0.965,0.955 0.915,0.965 C 0.64,1.01 0.36,1.01 0.085,0.965 C 0.035,0.955 0.002,0.92 0.005,0.86 L 0.02,0.11 C 0.025,0.055 0.045,0.022 0.09,0.03 Z" />
          </clipPath>
          <clipPath id="hero-ribbon-bottom-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.085,0.035 C 0.36,-0.01 0.64,-0.01 0.915,0.035 C 0.965,0.045 0.998,0.08 0.995,0.14 L 0.98,0.89 C 0.975,0.945 0.955,0.978 0.91,0.97 C 0.65,0.925 0.35,0.925 0.09,0.97 C 0.045,0.978 0.025,0.945 0.02,0.89 L 0.005,0.14 C 0.002,0.08 0.035,0.045 0.085,0.035 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative h-full w-full origin-center scale-[0.68] sm:scale-[0.84] lg:scale-100">
        {renderTrack(topTiles, topRefs, 'top')}
        {renderTrack(bottomTiles, bottomRefs, 'bottom')}
      </div>

      <button
        type="button"
        onClick={() => setPaused((prev) => !prev)}
        aria-label={paused ? 'Play hero image stream' : 'Pause hero image stream'}
        aria-pressed={paused}
        className="pointer-events-auto absolute bottom-4 right-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(8,22,60,0.14)] bg-white/85 text-[var(--text-dark)]/70 shadow-sm backdrop-blur-sm transition-colors duration-[var(--motion-ui)] hover:border-[rgba(8,22,60,0.3)] hover:text-[var(--text-dark)]"
      >
        {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}
