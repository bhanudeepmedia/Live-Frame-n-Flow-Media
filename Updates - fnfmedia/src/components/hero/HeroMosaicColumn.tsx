import type { CSSProperties } from 'react'
import type { MosaicColumn } from '@/data/hero-mosaic'
import HeroMosaicTile from '@/components/hero/HeroMosaicTile'

/**
 * MOT-07 — slow, continuous, scroll-independent vertical drift. The tile
 * list is duplicated so the translateY(-50%) loop wraps with zero visible
 * seam, regardless of the (variable) summed card height in the column.
 */
export default function HeroMosaicColumn({ column }: { column: MosaicColumn }) {
  const style = {
    '--marquee-duration': `${column.duration}s`,
    '--marquee-direction': column.direction,
  } as CSSProperties

  return (
    <div className="h-full overflow-hidden">
      <div
        style={style}
        className="hero-marquee-track flex flex-col gap-4"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-4">
            {column.tiles.map((tile) => (
              <HeroMosaicTile key={`${copy}-${tile.id}`} tile={tile} duplicate={copy === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
