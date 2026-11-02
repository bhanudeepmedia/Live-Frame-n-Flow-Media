import { brandLogos } from '@/data/home'

/** The clients' real logos in one colour, the row beneath Flow Ninja's service panel. */
export default function BrandLogos({ className }: { className: string }) {
  return (
    <ul aria-label="Clients" className={className}>
      {brandLogos.map((logo) => (
        <li key={logo.name}>
          <span
            role="img"
            aria-label={logo.name}
            className="brand-logo"
            style={{ '--logo': `url(${logo.src})`, '--ratio': logo.ratio } as React.CSSProperties}
          />
        </li>
      ))}
    </ul>
  )
}
