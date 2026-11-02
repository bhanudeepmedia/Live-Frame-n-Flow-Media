import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { findPost } from '@/data/blog'
import type { ArticleBlock } from '@/data/blog'
import Seo from '@/components/seo/Seo'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'
import FaqList from '@/components/sections/FaqList'
import { PageHero, PageSection, PageShell } from '@/components/page/PageParts'
import NotFound from '@/pages/NotFound'

const muted = 'text-[rgba(8,22,60,0.84)]'

/** Renders the two inline marks the post data uses: **bold** and [label](url). */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, index) => {
        const bold = part.match(/^\*\*(.+)\*\*$/)
        if (bold) return <strong key={index} className="font-semibold text-[var(--wall-blue)]">{bold[1]}</strong>
        const link = part.match(/^\[(.+)\]\((.+)\)$/)
        if (link) {
          const style =
            'font-semibold text-[var(--wall-blue)] underline decoration-[rgba(31,106,220,0.35)] underline-offset-4 hover:decoration-[var(--accent-blue)]'
          return link[2].startsWith('/') ? (
            <Link key={index} to={link[2]} className={style}>
              {link[1]}
            </Link>
          ) : (
            <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className={style}>
              {link[1]}
            </a>
          )
        }
        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'lead':
      return (
        <p className="border-l-2 border-[var(--wall-blue)] pl-6 text-[clamp(20px,1.8vw,26px)] font-medium leading-[1.4] text-[var(--wall-blue)]">
          <Inline text={block.text} />
        </p>
      )
    case 'p':
      return (
        <p className={muted}>
          <Inline text={block.text} />
        </p>
      )
    case 'h2':
      return (
        <h2 className="article-h2">{block.text}</h2>
      )
    case 'h3':
      return (
        <h3 className="article-h3">{block.text}</h3>
      )
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <div className="rounded-[var(--radius-lg)] border border-[rgba(8,22,60,0.1)] bg-white p-6 sm:p-7">
          {block.title && <p className="mb-4 font-semibold text-[var(--wall-blue)]">{block.title}</p>}
          <List className="flex flex-col gap-3">
            {block.items.map((item, index) => (
              <li key={item} className={`flex gap-3 text-[16px] leading-[1.55] ${muted}`}>
                {block.ordered ? (
                  <span className="w-5 shrink-0 font-semibold text-[var(--wall-blue)]">{index + 1}.</span>
                ) : (
                  <span aria-hidden="true" className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--wall-blue)]" />
                )}
                <span>
                  <Inline text={item} />
                </span>
              </li>
            ))}
          </List>
        </div>
      )
    }
    case 'cards':
      return (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {block.items.map((card) => (
            <li key={card.title} className="rounded-[var(--radius-md)] border border-[rgba(8,22,60,0.1)] bg-white p-5">
              <p className="font-semibold text-[var(--wall-blue)]">{card.title}</p>
              <p className={`mt-1 text-[14px] leading-[1.5] ${muted}`}>{card.text}</p>
            </li>
          ))}
        </ul>
      )
    case 'stats':
      return (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {block.items.map((stat) => (
            <li key={stat.title} className="flex flex-col gap-2 border-t-2 border-[var(--wall-blue)] pt-5">
              <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--wall-blue)]">
                {stat.location}
              </span>
              <span className="article-stat">{stat.value}</span>
              <span className="font-semibold text-[var(--wall-blue)]">{stat.title}</span>
              <span className={`text-[0.875rem] leading-[1.5] ${muted}`}>{stat.text}</span>
            </li>
          ))}
        </ul>
      )
    case 'note':
      return (
        <p className={`mt-6 border-t border-[rgba(8,22,60,0.12)] pt-8 text-[14px] leading-[1.6] ${muted}`}>
          <Inline text={block.text} />
        </p>
      )
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = findPost(slug)
  if (!post) return <NotFound />

  return (
    <PageShell>
      <Seo
        meta={post.meta}
        schema={[
          articleSchema({
            headline: post.headline,
            description: post.meta.description,
            path: post.meta.path,
            datePublished: post.dateISO,
            keywords: post.keywords,
            image: post.image?.src,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.headline, path: post.meta.path },
          ]),
          ...(post.faq ? [faqSchema(post.faq)] : []),
        ]}
      />

      <article>
        <PageHero
          wall="cases"
          eyebrow={
            <Link to="/blog" className="back-link">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Blog
            </Link>
          }
          headline={post.headline}
        >
          <p className="page-note">
            {post.category} · <time dateTime={post.dateISO}>{post.date}</time> · Frame n Flow Team · {post.readTime}
          </p>
        </PageHero>

        <PageSection wall="work" label="Article">
          <div className="page-sheet page-sheet--article">
            {post.image && (
              <img loading="lazy" src={post.image.src} alt={post.image.alt} className="aspect-[16/9] w-full rounded-[12px] object-cover" />
            )}
            {post.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
            {post.faq && (
              <>
                <h2 className="article-h2">Common questions</h2>
                <FaqList items={post.faq} />
              </>
            )}
            <Link to="/blog" className="back-link">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </PageSection>
      </article>
    </PageShell>
  )
}
