import HeroBackground from '@/components/hero/HeroBackground'
import HeroContent from '@/components/hero/HeroContent'
import HeroMosaic from '@/components/hero/HeroMosaic'

/**
 * Continuous 3D ribbon hero inspired by the Contra reference composition:
 * Two continuous 3D-tilted image streams sweep across the top and bottom of a
 * crisp white canvas (with zero scroll dependency), framing a clean horizontal
 * negative-space corridor in the middle for the hero typography and CTAs.
 */
export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative flex h-[clamp(620px,calc(100svh-70px),880px)] w-full items-center justify-center overflow-hidden border-b border-[rgba(8,22,60,0.08)] bg-white text-[var(--text-dark)]"
    >
      <HeroBackground />
      <HeroMosaic />
      <div className="hero-content-enter pointer-events-auto relative z-10 w-full">
        <HeroContent />
      </div>
    </section>
  )
}
