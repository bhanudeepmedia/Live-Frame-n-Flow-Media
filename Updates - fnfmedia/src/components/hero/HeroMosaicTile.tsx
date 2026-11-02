import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MosaicTile } from '@/data/hero-mosaic'

/**
 * 3D curved ribbon card tile. Uses subtle cylindrical barrel/pinch SVG
 * clip-paths (`#hero-ribbon-top-clip` / `#hero-ribbon-bottom-clip`) defined in
 * HeroMosaic so the top and bottom edges curve along the 3D ring just like the
 * Contra reference image.
 */
export default function HeroMosaicTile({
  tile,
  variant = 'top',
  duplicate = false,
}: {
  tile: MosaicTile
  variant?: 'top' | 'bottom'
  duplicate?: boolean
}) {
  const clipUrl = variant === 'top' ? 'url(#hero-ribbon-top-clip)' : 'url(#hero-ribbon-bottom-clip)'

  return (
    <Link
      to={tile.href}
      aria-label={`View ${tile.name} project`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className="group relative block h-[clamp(170px,17.2vw,258px)] w-[clamp(192px,19.5vw,292px)] shrink-0 overflow-hidden bg-[#0b1c45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-blue)]"
      style={{
        clipPath: clipUrl,
        WebkitClipPath: clipUrl,
      }}
    >
      <img
        src={tile.image}
        alt={tile.imageAlt}
        loading="eager"
        decoding="async"
        style={{ objectPosition: tile.objectPosition ?? 'center' }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-standard)] group-hover:scale-108 group-focus-visible:scale-108"
      />

      {/* Subtle bottom vignette + project title */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 via-black/15 to-transparent px-5 pb-4 pt-10 opacity-90 transition-opacity duration-[var(--motion-ui)] group-hover:opacity-0"
      >
        <span className="font-display text-[1.05rem] font-normal uppercase tracking-[0.04em] text-white drop-shadow-sm">
          {tile.name}
        </span>
      </div>

      {/* Hover/focus reveal — brand tint + client name */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center p-5 text-center opacity-0 transition-opacity duration-[var(--motion-ui)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{ background: tile.gradient }}
      >
        <span
          className="font-display translate-y-1.5 text-[1.5rem] font-normal uppercase leading-tight tracking-[0.03em] opacity-0 transition-[opacity,transform] duration-[var(--motion-ui)] ease-[var(--ease-standard)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          style={{ color: tile.foreground }}
        >
          {tile.name}
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-4 right-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--text-dark)] opacity-0 transition-opacity duration-[var(--motion-ui)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </span>
    </Link>
  )
}
