import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Go from '@/components/page/Go'
import { blogPosts } from '@/data/blog'
import { serviceMenu } from '@/data/navigation'

/** Each service as a banner with its name on it, a line on what it is, and a few ways in. */
export function ServiceCards({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="nav-cards">
      {serviceMenu.map((service) => (
        <li key={service.title}>
          <Go href={service.href} className="nav-banner">
            <img src={service.banner} alt="" loading="lazy" />
            <span>{service.title}</span>
          </Go>
          <p>{service.summary}</p>
          <ul className="nav-links">
            {service.links.map((link) => (
              <li key={link.label} onClick={onNavigate}>
                <Go href={link.href} className="nav-link">
                  {link.label}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Go>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export function BlogCards({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="nav-blog">
      <div className="nav-blog__intro">
        <p className="nav-blog__title">From the blog</p>
        <p>Plain guides on websites, Shopify, search and getting more business online.</p>
        <Link to="/blog" onClick={onNavigate} className="nav-link">
          All articles
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
      <ul className="nav-posts">
        {blogPosts.slice(0, 3).map((post) => (
          <li key={post.slug}>
            <Link to={post.meta.path} onClick={onNavigate} className="nav-post">
              {post.image && <img src={post.image.src} alt="" loading="lazy" />}
              <span className="nav-post__tag">{post.category}</span>
              <span className="nav-post__title">{post.headline}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AllServicesLink({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Link to="/services" onClick={onNavigate} className="nav-link nav-link--all">
      See all our services
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  )
}
