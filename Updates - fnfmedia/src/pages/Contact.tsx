import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import { contactChannels } from '@/data/site'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import { OPEN_WHATSAPP } from '@/components/layout/WhatsAppWidget'
import { breadcrumbSchema } from '@/lib/schema'
import { PageChecks, PageHero, PageShell } from '@/components/page/PageParts'

const callIncludes = ['15-Minute Deep Dive Session', 'Competitor & Market Analysis', 'Actionable Revenue Roadmap']

/**
 * The single conversion destination (Handover §7), with what the old site's
 * contact page offered: email, the WhatsApp menu and a free audit call on Calendly.
 */
export default function Contact() {
  const meta = pageMeta.contact
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Start Your Project', path: meta.path },
          ]),
        ]}
      />
      <PageHero
        wall="work"
        eyebrow="Start Your Project"
        headline="Let's Talk Strategy"
        intro="Ready to stop guessing and start scaling? Schedule a direct session with our team to plan your growth."
        className="contact-hero"
        aside={
          <div className="page-card contact-book">
            <h2>Book a Strategy Call</h2>
            <p>
              You will receive a free marketing audit from our business strategist, <strong>Bhanu Deep</strong>. We&apos;ll
              analyze your current funnel, identify leaks, and propose a roadmap for growth.
            </p>
            <PageChecks items={callIncludes} />
            <a href={contactChannels.calendly} className="wall-btn wall-btn--solid">
              Schedule Your Free Audit
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <p className="page-card__meta">Limited spots available for this month.</p>
          </div>
        }
      >
        <ul className="contact-ways">
          <li>
            <a href={`mailto:${contactChannels.email}`}>
              <Mail aria-hidden="true" className="h-5 w-5" />
              <span>
                <strong>Email Us</strong>
                {contactChannels.email}
              </span>
            </a>
          </li>
          <li>
            <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_WHATSAPP))}>
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              <span>
                <strong>WhatsApp Us</strong>
                Directly DM on WhatsApp
              </span>
            </button>
          </li>
        </ul>
      </PageHero>
    </PageShell>
  )
}
