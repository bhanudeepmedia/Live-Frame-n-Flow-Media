import { siteName, siteUrl } from '@/data/site'

export type JsonLd = Record<string, unknown>

export function breadcrumbSchema(trail: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}

export function serviceSchema(service: { name: string; description: string; path: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${siteUrl}${service.path}`,
    provider: { '@type': 'Organization', name: siteName, url: `${siteUrl}/` },
    areaServed: ['IN', 'US', 'GB', 'EU'],
  }
}

export function faqSchema(items: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function articleSchema(article: {
  headline: string
  description: string
  path: string
  datePublished: string
  keywords?: string
  image?: string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.headline,
    description: article.description,
    ...(article.image && { image: `${siteUrl}${article.image}` }),
    author: { '@type': 'Organization', name: siteName, url: `${siteUrl}/` },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/fnf-logo.png` },
    },
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}${article.path}` },
    ...(article.keywords && { keywords: article.keywords }),
  }
}

export function personSchema(person: {
  name: string
  jobTitle: string
  description: string
  path: string
  image: string
  knowsAbout: string[]
  sameAs?: string[]
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    url: `${siteUrl}${person.path}`,
    image: `${siteUrl}${person.image}`,
    worksFor: { '@type': 'Organization', name: siteName, url: `${siteUrl}/`, foundingDate: '2025' },
    knowsAbout: person.knowsAbout,
    ...(person.sameAs && { sameAs: person.sameAs }),
  }
}
