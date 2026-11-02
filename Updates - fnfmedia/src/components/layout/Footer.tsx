import { Link } from 'react-router-dom'
import FinalCTA from '@/components/cta/FinalCTA'
import BackToTop from '@/components/layout/BackToTop'
import {
  footerCompany,
  footerIndustries,
  footerLegalLinks,
  footerMarketing,
  footerSeo,
  footerSocialLinks,
  footerWebDevelopment,
} from '@/data/footer'
import type { FooterColumn } from '@/data/footer'
import '@/components/home/home.css'

/**
 * The closing wall on every page, one continuous stretch of orange: the call to
 * action with the website trail, the link columns, then a giant wordmark
 * standing on the ledge, the only ground on the wall. Client names run through
 * the letters, tone on tone. The wordmark sets in type until the cut-paper FNFM
 * letters arrive.
 */

const columns = [footerWebDevelopment, footerMarketing, footerSeo, footerIndustries, footerCompany]

function LinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h3>{column.title}</h3>
      <ul>
        {column.links.map((link) => (
          <li key={link.label}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialIcon({ icon }: { icon: (typeof footerSocialLinks)[number]['icon'] }) {
  const common = 'h-4 w-4 fill-current'
  switch (icon) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M13.5 21v-7.9h2.66l.4-3.09h-3.06V8.04c0-.9.25-1.5 1.53-1.5h1.63V3.77C15.94 3.71 15 3.62 13.9 3.62c-2.28 0-3.84 1.39-3.84 3.95v2.44H7.4v3.09h2.66V21z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m6.4-.2a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0M12 4.6c-2.4 0-2.7 0-3.65.05-.94.05-1.58.2-2.14.42a4.3 4.3 0 0 0-1.56 1.01 4.3 4.3 0 0 0-1.01 1.56c-.22.56-.37 1.2-.42 2.14C3.17 10.73 3.17 11.03 3.17 13.4s0 2.68.05 3.62c.05.95.2 1.58.42 2.15a4.3 4.3 0 0 0 1.01 1.55 4.3 4.3 0 0 0 1.56 1.01c.56.23 1.2.38 2.14.43.95.04 1.25.05 3.65.05s2.7 0 3.65-.05c.94-.05 1.58-.2 2.14-.43a4.5 4.5 0 0 0 2.57-2.56c.22-.57.37-1.2.42-2.15.05-.94.05-1.24.05-3.62s0-2.67-.05-3.62c-.05-.94-.2-1.58-.42-2.14a4.3 4.3 0 0 0-1.01-1.56 4.3 4.3 0 0 0-1.56-1.01c-.56-.22-1.2-.37-2.14-.42C14.7 4.6 14.4 4.6 12 4.6" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M21.6 7.2s-.2-1.5-.85-2.16c-.8-.86-1.7-.86-2.12-.91C15.7 4 12 4 12 4h-.01s-3.7 0-6.63.13c-.4.05-1.3.05-2.12.91-.65.66-.85 2.16-.85 2.16S2.2 9 2.2 10.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.85 2.16c.8.86 1.86.84 2.34.93C7.3 19 12 19 12 19s3.7 0 6.63-.15c.4-.05 1.3-.05 2.12-.91.65-.66.85-2.16.85-2.16s.2-1.8.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5M9.9 14.4V8.9l5.4 2.76z" />
        </svg>
      )
    default:
      return null
  }
}

export default function Footer() {
  return (
    <footer className="site-end" data-wall="footer">
      <picture>
        <source media="(max-width: 900px)" srcSet="/walls/footer-tall-phone.webp" />
        <img loading="lazy" src="/walls/footer-tall-laptop.webp" alt="" aria-hidden="true" className="site-end__wallpaper" />
      </picture>

      <FinalCTA />

      <div className="site-end__brand">
        <Link to="/" aria-label="Frame n Flow Media — home">
          <img src="/brand/fnf-logo-full-reversed.svg" alt="" aria-hidden="true" width={541} height={250} />
        </Link>
      </div>

      <div className="site-end__links">
        {columns.map((column) => (
          <LinkColumn key={column.title} column={column} />
        ))}
      </div>

      <div className="site-end__meta">
        <p>Built in India. Clients across India, Ireland, the UK, the US, the UAE and Cyprus.</p>
        <div>
          {footerSocialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
              <SocialIcon icon={social.icon} />
            </a>
          ))}
          <BackToTop />
        </div>
      </div>

      <div aria-hidden="true" className="site-end__base">
        <div className="site-end__mark poster">
          {['F', 'N', 'F', 'M'].map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
      </div>

      <div className="site-end__legal">
        <div>
          {footerLegalLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <span>Designed and developed by Frame n Flow Media</span>
          <span>&copy; {new Date().getFullYear()} Frame n Flow Media. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
