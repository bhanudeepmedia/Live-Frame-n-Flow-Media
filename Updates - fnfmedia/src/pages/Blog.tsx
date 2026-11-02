import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { pageMeta } from '@/data/seo'
import { siteName, siteUrl } from '@/data/site'
import Seo from '@/components/seo/Seo'
import { breadcrumbSchema } from '@/lib/schema'
import { PageHero, PageSection, PageShell } from '@/components/page/PageParts'

export default function Blog() {
  const meta = pageMeta.blog
  return (
    <PageShell>
      <Seo
        meta={meta}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: meta.title,
            description: meta.description,
            url: `${siteUrl}${meta.path}`,
            publisher: { '@type': 'Organization', name: siteName, url: `${siteUrl}/` },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: blogPosts.map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteUrl}${post.meta.path}`,
                name: post.headline,
              })),
            },
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: meta.path },
          ]),
        ]}
      />
      <PageHero
        wall="cases"
        eyebrow="Blog"
        headline="Guides on websites, search and growing a business online"
        intro="Plain guides on websites, Shopify, SEO, AEO and marketing: what actually moves search visibility, trust and revenue."
        art={{ src: '/pages/blog-hero.webp', alt: 'An open notebook and a brass pen on a plinth' }}
        cta
      />

      <PageSection wall="work" label="Articles">
        <ul className="page-cards">
          {blogPosts.map((post) => (
            <li key={post.slug} className="page-list-item">
              <Link to={post.meta.path} className="page-card page-card--short">
                {post.image && <img src={post.image.src} alt={post.image.alt} loading="lazy" className="page-card__media" />}
                <p className="page-card__meta">
                  {post.category} · <time dateTime={post.dateISO}>{post.date}</time> · {post.readTime}
                </p>
                <h2>{post.headline}</h2>
                <p>{post.excerpt}</p>
                <span className="page-card__go">
                  Read article
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>
    </PageShell>
  )
}
