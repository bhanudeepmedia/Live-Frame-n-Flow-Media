/**
 * MOT-11 — ambient hero background shimmer. Purely decorative, layered
 * under all hero content, disabled under prefers-reduced-motion (see hero.css).
 * DESIGN.md §11 / MOTION.md MOT-11: a fixed corrugated texture of horizontal
 * blue bands — a mix of wide and narrow strips, not evenly spaced — sits
 * over the navy base at all times. The bands don't move or sweep; instead
 * the whole texture's visibility breathes on a tight ~4s loop, staying
 * lit for most of the cycle and briefly dipping to flat dark navy for
 * under a second before recovering. Confirmed by frame-stepping the
 * reference site's own looping background video (4s duration).
 */
/**
 * Clean, high-key white studio canvas inspired by the Contra 3D ribbon hero
 * reference. Keeps subtle soft ambient radial light so the 3D perspective
 * image cards cast crisp depth over a pure white field.
 */
export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-white">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(255,255,255,1) 0%, rgba(248,250,253,1) 100%)',
        }}
      />
    </div>
  )
}
