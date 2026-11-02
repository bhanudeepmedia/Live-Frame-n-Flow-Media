import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'

const WebDevelopment = lazy(() => import('@/pages/WebDevelopment'))
const CustomShopify = lazy(() => import('@/pages/CustomShopify'))
const Marketing = lazy(() => import('@/pages/Marketing'))
const SeoAeo = lazy(() => import('@/pages/SeoAeo'))
const Portfolio = lazy(() => import('@/pages/Portfolio'))
const Services = lazy(() => import('@/pages/Services'))
const WhoWeWorkWith = lazy(() => import('@/pages/WhoWeWorkWith'))
const Contact = lazy(() => import('@/pages/Contact'))
const Founder = lazy(() => import('@/pages/Founder'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const WebsiteOffer = lazy(() => import('@/pages/WebsiteOffer'))
const PlaceholderPage = lazy(() => import('@/pages/PlaceholderPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/**
 * Site map per Handover §8 "Page/URL Structure": clean descriptive slugs,
 * each service cluster on its own indexable URL. Legal pages are still
 * placeholders (no legal copy has been supplied). Old-site paths redirect to
 * their closest new equivalent so existing inbound links keep working.
 */
const legalRoutes: { path: string; title: string }[] = [
  { path: '/privacy-policy', title: 'Privacy policy' },
  { path: '/terms-of-service', title: 'Terms of service' },
]

const redirects: { from: string; to: string }[] = [
  { from: '/work', to: '/portfolio' },
  { from: '/portfolio', to: '/portfolio' },
  { from: '/portfolio/:slug', to: '/portfolio' },
  { from: '/services/website-development', to: '/web-development' },
  { from: '/services/marketing', to: '/marketing' },
  { from: '/solutions', to: '/who-we-work-with' },
  { from: '/about', to: '/who-we-work-with' },
  { from: '/work/*', to: '/portfolio' },
  { from: '/services/ai-automation', to: '/web-development#custom-software-development' },
  { from: '/approach', to: '/web-development' },
  { from: '/insights', to: '/blog' },
  { from: '/product-marketing', to: '/marketing' },
  { from: '/service-marketing', to: '/marketing' },
  { from: '/startup-marketing', to: '/marketing' },
  { from: '/realtor-marketing', to: '/who-we-work-with#industries' },
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/custom-shopify-development" element={<CustomShopify />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/seo-aeo" element={<SeoAeo />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/who-we-work-with" element={<WhoWeWorkWith />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founder-bhanudeep" element={<Founder />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/offers/website-25k" element={<WebsiteOffer />} />
          {legalRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<PlaceholderPage title={route.title} />} />
          ))}
          {redirects.map((redirect) => (
            <Route key={redirect.from} path={redirect.from} element={<Navigate to={redirect.to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
