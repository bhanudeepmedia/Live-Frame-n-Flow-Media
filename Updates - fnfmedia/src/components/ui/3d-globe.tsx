import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

export interface GlobeMarker {
  lat: number
  lng: number
  src: string
  label?: string
  size?: number
}

export interface Globe3DConfig {
  radius?: number
  globeColor?: string
  textureUrl?: string
  bumpMapUrl?: string
  showAtmosphere?: boolean
  atmosphereColor?: string
  atmosphereIntensity?: number
  atmosphereBlur?: number
  bumpScale?: number
  autoRotateSpeed?: number
  enableZoom?: boolean
  enablePan?: boolean
  minDistance?: number
  maxDistance?: number
  initialView?: { lat: number; lng: number }
  markerSize?: number
  showWireframe?: boolean
  wireframeColor?: string
  ambientIntensity?: number
  pointLightIntensity?: number
  backgroundColor?: string | null
}

interface Globe3DProps {
  markers?: GlobeMarker[]
  config?: Globe3DConfig
  className?: string
  /** Turns the earth and keeps drawing. Off, it holds its last frame and costs nothing. */
  active?: boolean
  /** Called once the earth, its map and its flags are all ready to draw. */
  onReady?: () => void
}

const DEFAULT_EARTH_TEXTURE = '/globe/earth.webp'
const DEFAULT_BUMP_TEXTURE = '/globe/bump.webp'

/** Radians a second at an `autoRotateSpeed` of 1: one turn a minute. */
const TURN = (Math.PI * 2) / 60
const radians = THREE.MathUtils.degToRad

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return new THREE.Vector3(x, y, z)
}

/** A round flag with a white edge, drawn once onto a texture. */
function useFlag(src: string) {
  const image = useLoader(THREE.ImageLoader, src)

  return useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.fillStyle = '#ffffff'
    context.beginPath()
    context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    context.fill()
    context.beginPath()
    context.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2)
    context.clip()
    context.drawImage(image, 0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [image])
}

interface MarkerProps {
  marker: GlobeMarker
  radius: number
  defaultSize: number
}

/** Flags are drawn with the earth, so they turn with it and it hides them on the far side. */
function Marker({ marker, radius, defaultSize }: MarkerProps) {
  const flag = useFlag(marker.src)
  const size = marker.size ?? defaultSize

  const { surface, top, stem, stemCenter, stemTurn } = useMemo(() => {
    const surface = latLngToVector3(marker.lat, marker.lng, radius * 1.001)
    const top = latLngToVector3(marker.lat, marker.lng, radius * 1.08)
    const stemTurn = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), top.clone().sub(surface).normalize())
    return { surface, top, stem: top.distanceTo(surface), stemCenter: surface.clone().lerp(top, 0.5), stemTurn }
  }, [marker.lat, marker.lng, radius])

  return (
    <group>
      <mesh position={stemCenter} quaternion={stemTurn}>
        <cylinderGeometry args={[0.003, 0.003, stem, 8]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.6} />
      </mesh>

      <mesh position={surface} quaternion={stemTurn}>
        <coneGeometry args={[0.015, 0.04, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      <sprite position={top} scale={[size, size, 1]}>
        <spriteMaterial map={flag} transparent depthWrite={false} toneMapped={false} />
      </sprite>
    </group>
  )
}

interface RotatingGlobeProps {
  config: Required<Globe3DConfig>
  markers: GlobeMarker[]
  active: boolean
}

/**
 * The camera stays put and the earth turns under it, so the light on the earth
 * never changes. `initialView` is what faces the camera before the first turn.
 */
function RotatingGlobe({ config, markers, active }: RotatingGlobeProps) {
  const spinRef = useRef<THREE.Group>(null)

  const [earthTexture, bumpTexture] = useTexture([config.textureUrl, config.bumpMapUrl])

  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace
      earthTexture.anisotropy = 16
    }
    if (bumpTexture) {
      bumpTexture.anisotropy = 8
    }
  }, [earthTexture, bumpTexture])

  const geometry = useMemo(() => new THREE.SphereGeometry(config.radius, 64, 64), [config.radius])
  const wireframeGeometry = useMemo(() => new THREE.SphereGeometry(config.radius * 1.002, 32, 16), [config.radius])

  useLayoutEffect(() => {
    if (spinRef.current) spinRef.current.rotation.y = -radians(config.initialView.lng + 90)
  }, [config.initialView.lng])

  useFrame((_, delta) => {
    if (active && spinRef.current) spinRef.current.rotation.y += config.autoRotateSpeed * TURN * Math.min(delta, 0.1)
  })

  return (
    <group rotation={[radians(config.initialView.lat), 0, 0]}>
      <group ref={spinRef}>
        <mesh geometry={geometry}>
          <meshStandardMaterial map={earthTexture} bumpMap={bumpTexture} bumpScale={config.bumpScale * 0.05} roughness={0.7} metalness={0.0} />
        </mesh>

        {config.showWireframe && (
          <mesh geometry={wireframeGeometry}>
            <meshBasicMaterial color={config.wireframeColor} wireframe transparent opacity={0.08} />
          </mesh>
        )}

        {markers.map((marker, index) => (
          <Marker key={`marker-${index}-${marker.lat}-${marker.lng}`} marker={marker} radius={config.radius} defaultSize={config.markerSize} />
        ))}
      </group>
    </group>
  )
}

interface AtmosphereProps {
  radius: number
  color: string
  intensity: number
  blur: number
}

function Atmosphere({ radius, color, intensity, blur }: AtmosphereProps) {
  const fresnelPower = Math.max(0.5, 5 - blur)

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        fresnelPower: { value: fresnelPower },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })
  }, [color, intensity, fresnelPower])

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 64, 32]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  )
}

interface SceneProps {
  markers: GlobeMarker[]
  config: Required<Globe3DConfig>
  active: boolean
  onReady?: () => void
}

/** Everything above has loaded by the time this mounts, so the earth arrives whole. */
function Ready({ onReady }: { onReady?: () => void }) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    invalidate()
    onReady?.()
  }, [invalidate, onReady])

  return null
}

function Scene({ markers, config, active, onReady }: SceneProps) {
  return (
    <>
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight position={[config.radius * 5, config.radius * 2, config.radius * 5]} intensity={config.pointLightIntensity} color="#ffffff" />
      <directionalLight position={[-config.radius * 3, config.radius, -config.radius * 2]} intensity={config.pointLightIntensity * 0.3} color="#88ccff" />

      <RotatingGlobe config={config} markers={markers} active={active} />

      {config.showAtmosphere && (
        <Atmosphere radius={config.radius} color={config.atmosphereColor} intensity={config.atmosphereIntensity} blur={config.atmosphereBlur} />
      )}

      <OrbitControls
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        rotateSpeed={0.4}
        enableDamping
        dampingFactor={0.1}
      />

      <Ready onReady={onReady} />
    </>
  )
}

const defaultConfig: Required<Globe3DConfig> = {
  radius: 2,
  globeColor: '#1a1a2e',
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false,
  atmosphereColor: '#4da6ff',
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  initialView: { lat: 0, lng: -90 },
  markerSize: 0.2,
  showWireframe: false,
  wireframeColor: '#4a9eff',
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
}

/**
 * The measuring library can drop its first reading, and a canvas that never gets
 * a size never draws. This reports again a few times after it starts, which costs
 * nothing once the size is known.
 */
class SteadyObserver extends ResizeObserver {
  private report: ResizeObserverCallback

  constructor(report: ResizeObserverCallback) {
    super(report)
    this.report = report
  }

  observe(target: Element, options?: ResizeObserverOptions) {
    super.observe(target, options)
    ;[200, 600, 1500, 3000].forEach((delay) => window.setTimeout(() => this.report([], this), delay))
  }
}

/**
 * The canvas takes its size from layout, not from what is on screen. Scroll
 * motion scales this element, and a size read mid-move would shrink the drawing
 * to a corner and clear it.
 */
export function Globe3D({ markers = [], config = {}, className, active = true, onReady }: Globe3DProps) {
  const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config])

  return (
    <div className={cn('relative h-[500px] w-full', className)}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'demand'}
        resize={{ scroll: false, offsetSize: true, polyfill: SteadyObserver }}
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, mergedConfig.radius * 3.5] }}
        style={{ background: mergedConfig.backgroundColor || 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene markers={markers} config={mergedConfig} active={active} onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Globe3D
