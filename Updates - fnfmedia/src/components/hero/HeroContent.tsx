import { Link } from 'react-router-dom'
import { ctaLabels, startProjectHref } from '@/data/site'

/**
 * Four-pointed diamond star mark matching the editorial lockup in the
 * reference hero ("GET MORE CREATIVE ✦ contra").
 */
function StarMark() {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-[var(--text-dark)]"
      fill="currentColor"
    >
      <path d="M13.2 1L10.3 10.3L1 13.2V13.2L10.3 13.2V3.9Z" />
      <path d="M14.8 1L17.7 10.3L27 13.2H14.8V1Z" />
      <path d="M13.2 27L10.3 17.7L1 14.8H13.2V27Z" />
      <path d="M14.8 27L17.7 17.7L27 14.8H14.8V27Z" />
    </svg>
  )
}

/**
 * Positioned directly in the open horizontal white corridor on the center-right
 * between the upper and lower 3D arcs (the exact negative-space zone where
 * "GET MORE CREATIVE ✦ contra" sits in the reference image).
 */
export default function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[var(--container-max)] px-[clamp(20px,4vw,86px)]">
      <div className="ml-auto flex w-full flex-col gap-3 rounded-2xl bg-white/85 p-4 backdrop-blur-[2px] sm:p-5 lg:w-[58%] lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        {/* Top lockup line matching "GET MORE CREATIVE ✦ contra" */}
        <div className="flex flex-wrap items-center gap-3.5">
          <h1 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-dark)]">
            Websites That Convert · Marketing That Delivers
          </h1>
          <StarMark />
          <span className="font-display text-[1.45rem] font-normal uppercase leading-none tracking-[0.03em] text-[var(--text-dark)]">
            frame n flow
          </span>
        </div>

        {/* Compact display headline + concise editorial copy + pill CTAs */}
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <p className="max-w-[46ch] text-[clamp(0.8125rem,0.9vw,0.9375rem)] leading-[1.45] text-[rgba(8,22,60,0.76)]">
            Frame n Flow Media is a boutique web development and marketing studio. Custom-coded &amp; Shopify websites
            driven by Meta Ads, SEO and AEO — one team, one roadmap, end to end.
          </p>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              to={startProjectHref}
              className="inline-flex h-[38px] items-center justify-center rounded-full bg-[var(--text-dark)] px-4 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white transition-[filter,transform] duration-[var(--motion-ui)] ease-[var(--ease-standard)] hover:brightness-110 active:scale-[0.98]"
            >
              {ctaLabels.primary}
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex h-[38px] items-center justify-center rounded-full border border-[rgba(8,22,60,0.22)] bg-white px-4 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-dark)] transition-colors duration-[var(--motion-ui)] hover:border-[var(--text-dark)] hover:bg-[rgba(8,22,60,0.04)]"
            >
              {ctaLabels.work}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
