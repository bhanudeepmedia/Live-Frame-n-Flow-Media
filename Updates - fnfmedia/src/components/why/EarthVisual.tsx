import { Globe3D, type GlobeMarker } from '@/components/ui/3d-globe'
import { clientCountries } from '@/data/home'

/**
 * The real Blue Marble globe with a flag pin on each country we work in. It
 * turns by itself and visitors can spin it. The wheel still scrolls the page,
 * and on phones a vertical swipe does too (see `.globe-canvas`).
 */
const globeMarkers: GlobeMarker[] = clientCountries.map((country) => ({
  lat: country.lat,
  lng: country.lng,
  src: `/flags/${country.code}.svg`,
  label: country.name,
}))

/** Opens with all six flags on view, then turns India to the middle. */
const initialView = { lat: 34, lng: 28 }

const config = {
  // A phone shows the earth too small to need the full map, which is 700 KB.
  textureUrl: window.innerWidth <= 900 ? '/globe/earth-phone.webp' : '/globe/earth.webp',
  radius: 1.6,
  showAtmosphere: false,
  bumpScale: 4,
  autoRotateSpeed: -0.7,
  enableZoom: false,
  enablePan: false,
  ambientIntensity: 1.5,
  pointLightIntensity: 2.4,
  backgroundColor: null,
  initialView,
}

export default function EarthVisual({
  reducedMotion = false,
  active = true,
  onReady,
}: {
  reducedMotion?: boolean
  active?: boolean
  onReady?: () => void
}) {
  return (
    <div aria-hidden="true" className="h-full w-full">
      <Globe3D className="h-full w-full" active={active && !reducedMotion} markers={globeMarkers} config={config} onReady={onReady} />
    </div>
  )
}
