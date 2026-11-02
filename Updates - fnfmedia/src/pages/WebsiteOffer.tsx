import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { contactChannels, ctaLabels, siteName, siteUrl, startProjectHref } from '@/data/site'
import { pageMeta } from '@/data/seo'
import Seo from '@/components/seo/Seo'
import FaqList from '@/components/sections/FaqList'
import { Lines } from '@/components/home/Wall'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { PageChecks, PageHero, PageSection, PageShell, PageSteps } from '@/components/page/PageParts'

/**
 * ₹25,000 website offer, carried over from the previous site at the same URL
 * (it carries the Product + FAQ schema and local search work). The old 5-step
 * wizard is condensed into one form that hands off to WhatsApp, as before.
 * The form has a frame of its own, so it fits a phone without scrolling.
 */
const websiteTypes = [
  { id: 'Service Business', label: 'Standard / service business', note: 'Portfolios, studio sites, lead systems' },
  { id: 'E-commerce', label: 'E-commerce store', note: 'Catalogues, shop pages, checkout' },
  { id: 'Custom Coded', label: 'Custom-coded build', note: 'Tailored layout, motion and speed' },
]

const included = [
  { title: 'Standard website', body: 'For local services, portfolios and brand positioning. Structured to turn visits into enquiries.' },
  { title: 'E-commerce store', body: 'Catalogue setup, shop pages and a checkout built for domestic conversion.' },
  { title: 'Custom-coded build', body: 'Tailored components and fast navigation, coded by hand rather than templated.' },
  { title: 'SEO foundation', body: 'Semantic structure, clean metadata and schema mapped to your regional keywords.' },
  { title: 'Google Analytics (GA4)', body: 'Event tracking for views, clicks, scrolls and every lead submission.' },
  { title: 'Speed optimisation', body: 'Fast loads on every device, because every second keeps a prospect on the page.' },
  { title: '1 year of hosting', body: 'Secure, fast hosting with SSL active from day one.' },
  { title: 'Free custom domain', body: 'Your .in, .com or similar domain included for the first full year.' },
]

const steps = [
  { title: 'Discovery', body: 'A 50% start. We map your competitors, brand direction and what the site needs to achieve.' },
  { title: 'Design & build', body: 'We design the layout from scratch and build it responsive across every screen.' },
  { title: 'Analytics & SEO', body: 'GA4, conversion events and search metadata go in before anything goes live.' },
  { title: 'Launch', body: 'Final 50% on completion. We connect your domain, switch on SSL and go live.' },
]

const audiences = [
  'Interior designers & architects',
  'Real estate developers & builders',
  'Boutiques & clothing labels',
  'Consultants, coaches & personal brands',
  'Local service companies',
  'Cafés & hospitality',
]

const faqs = [
  {
    question: 'Who develops the ₹25,000 websites and portals?',
    answer:
      'Every custom project is engineered by the development team at Frame n Flow Media, ensuring maximum loading speeds, dynamic layouts, and premium brand experiences.',
  },
  {
    question: 'Can this ₹25,000 package be used to build a recruitment agency site in Hyderabad?',
    answer:
      'Yes, we design custom systems suited for a wide range of agencies, including a recruitment agency in Hyderabad, with features like job listings, quick job search and application flows.',
  },
  {
    question: 'How is the SEO and AI search performance optimized?',
    answer:
      'We implement structured JSON-LD schemas, clean metadata, semantic HTML5 structure, and static page rendering to ensure search crawlers and AI search agents index your services immediately.',
  },
]

function OfferForm() {
  const [type, setType] = useState(websiteTypes[0].id)
  const [ready, setReady] = useState('Yes')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `Hi Frame n Flow Media, I'm interested in the ₹25,000 Premium Website Offer. Here are my details:
- Name: ${data.get('name')}
- WhatsApp: ${data.get('phone')}
- Business Name: ${data.get('business')}
- Website Focus: ${type}
- Ready to Invest ₹25,000: ${ready}`
    window.location.href = `${contactChannels.whatsapp}?text=${encodeURIComponent(message)}`
  }

  return (
    <form onSubmit={handleSubmit} className="offer-form">
      <div className="offer-form__row">
        <label>
          Your name
          <input name="name" required autoComplete="name" placeholder="Full name" className="offer-field" />
        </label>
        <label>
          WhatsApp number
          <input
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            minLength={10}
            placeholder="+91 98765 43210"
            className="offer-field"
          />
        </label>
      </div>
      <label>
        Business name
        <input name="business" required autoComplete="organization" placeholder="Your business" className="offer-field" />
      </label>

      <fieldset>
        <legend>Website type</legend>
        <div className="offer-choices">
          {websiteTypes.map((option) => {
            const active = type === option.id
            return (
              <label key={option.id} data-active={active} className="offer-choice">
                <input
                  type="radio"
                  name="type"
                  value={option.id}
                  checked={active}
                  onChange={() => setType(option.id)}
                  className="sr-only"
                />
                {option.label}
                <small>{option.note}</small>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend>Ready to invest ₹25,000 in your website?</legend>
        <div className="offer-ready">
          {['Yes', 'Not yet'].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="ready"
                value={option}
                checked={ready === option}
                onChange={() => setReady(option)}
                className="h-4 w-4 accent-[var(--wall-blue)]"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="wall-btn">
        Claim the offer on WhatsApp
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
      <p className="offer-form__note">Opens WhatsApp with your details filled in.</p>
    </form>
  )
}

export default function WebsiteOffer() {
  const meta = pageMeta.websiteOffer
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: '₹25,000 Premium Website Offer',
            description: 'Premium Standard, E-commerce, or Custom Coded website build by Frame n Flow Media.',
            brand: { '@type': 'Brand', name: siteName },
            offers: {
              '@type': 'Offer',
              price: '25000',
              priceCurrency: 'INR',
              url: `${siteUrl}${meta.path}`,
            },
          },
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Website Offer', path: meta.path },
          ]),
        ]}
      />
      <PageHero
        wall="services"
        eyebrow="Website offer · India"
        headline="A premium website for ₹25,000"
        intro="Standard, e-commerce or custom-coded. Includes Google Analytics, SEO foundations, and one year of free domain and hosting. Live in about 10 days."
        art={{ src: '/pages/offer-website.webp', alt: 'A client website on a laptop, with its key on the step below' }}
      >
        <a href="#claim" className="wall-btn wall-btn--solid">
          Claim the offer
        </a>
      </PageHero>

      <PageSection
        wall="work"
        id="whats-included"
        title="What's included"
        intro="Every build is responsive, trackable and ready to be found on Google from day one."
      >
        <PageSteps items={included} className="page-steps--pairs" />
      </PageSection>

      <PageSection wall="cases" title="From brief to live in 10 days">
        <PageSteps numbered items={steps} />
        <div className="page-head">
          <span className="page-kicker">Built for</span>
          <PageChecks inline items={audiences} />
        </div>
      </PageSection>

      <PageSection wall="green" id="claim" label="Claim the offer" className="offer-claim">
        <div className="page-split">
          <div className="page-head">
            <Lines className="wall-h" lines={['Claim the offer']} />
            <p className="wall-lead">
              Tell us a little about your business. It takes a minute, and your details open in WhatsApp.
            </p>
          </div>
          <OfferForm />
        </div>
      </PageSection>

      <PageSection wall="founder" id="faq" title="Common questions">
        <div className="page-sheet">
          <FaqList items={faqs} />
        </div>
        <div className="page-actions">
          <p className="page-note">Prefer to talk it through first? Tell us about your business and we&apos;ll recommend the right build.</p>
          <Link to={startProjectHref} className="wall-btn wall-btn--solid">
            {ctaLabels.primary}
          </Link>
        </div>
      </PageSection>
    </PageShell>
  )
}
