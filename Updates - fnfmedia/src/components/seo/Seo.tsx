import { useEffect } from 'react'
import type { PageMeta } from '@/data/seo'
import type { JsonLd } from '@/lib/schema'
import { siteName, siteUrl } from '@/data/site'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let node = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attr, key)
    document.head.appendChild(node)
  }
  node.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let node = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', 'canonical')
    document.head.appendChild(node)
  }
  node.setAttribute('href', href)
}

/**
 * Per-page head management (Handover §8): title, description, canonical, OG,
 * Twitter and robots on every route, plus optional JSON-LD structured data.
 * The site is a client-rendered Vite SPA, so index.html carries the homepage
 * defaults for non-JS crawlers and this component rewrites them per route.
 */
export default function Seo({ meta, schema }: { meta: PageMeta; schema?: JsonLd[] }) {
  const url = `${siteUrl}${meta.path === '/' ? '/' : meta.path}`
  const schemaJson = schema ? JSON.stringify(schema) : ''

  useEffect(() => {
    document.title = meta.title
    upsertMeta('name', 'description', meta.description)
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
    upsertCanonical(url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', siteName)
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)

    // Pages change without a reload, so GA4 and Tag Manager hear about each one
    // here, after the title is set. index.html loads the tags themselves.
    const { hash, href, pathname, search } = window.location
    window.gtag?.('event', 'page_view', {
      page_location: href,
      page_path: pathname + search,
      page_title: meta.title,
    })
    window.dataLayer?.push({ event: 'virtualPageview', page: { hash, path: pathname, search, title: meta.title, url: href } })
  }, [meta, url])

  useEffect(() => {
    if (!schemaJson) return
    const node = document.createElement('script')
    node.type = 'application/ld+json'
    node.dataset.pageSchema = 'true'
    node.textContent = schemaJson
    document.head.appendChild(node)
    return () => node.remove()
  }, [schemaJson])

  return null
}
