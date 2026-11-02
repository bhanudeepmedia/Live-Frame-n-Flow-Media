import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { scroller } from '@/components/layout/scroller'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import WhatsAppWidget from '@/components/layout/WhatsAppWidget'

const DISMISS_KEY = 'fnf:announcement-dismissed'

/**
 * PHASES.md Phase 1 "Global Chrome". The header stays on screen; the
 * announcement bar scrolls away above it, so every section gets the same frame
 * below the header. The bar shows on laptops only, where there is room for it.
 * Pages change straight away, with no route transition.
 */
export default function Layout() {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(DISMISS_KEY) === '1')
  const location = useLocation()
  const lastPage = useRef<string | null>(null)

  // Every new page starts at the top, and so does a link to the page already open,
  // such as the logo on Home. Lenis keeps its own scroll position, so it has to be
  // moved too, or it puts the page back where the last one was. Deep links such as
  // /web-development#custom-shopify-development then go to their section, again each
  // time one is clicked, even if the address already shows that section.
  useLayoutEffect(() => {
    if (location.hash && location.pathname === lastPage.current) return
    lastPage.current = location.pathname
    window.history.scrollRestoration = 'manual'
    scroller.lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [location.pathname, location.key, location.hash])

  useLayoutEffect(() => {
    if (!location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    let tries = 0
    let timer = 0
    const go = () => {
      const target = document.getElementById(id)
      // Anything inside a held section is on its frame, so go to the section.
      // A closing menu keeps the page locked, and a jump made then is undone with the lock.
      if (target && !document.body.hasAttribute('data-scroll-locked')) {
        ;(target.closest('.scene:not(.scene--plain)') ?? target).scrollIntoView({ block: 'start' })
      }
      // A page opened straight from a link may still be loading.
      else if (++tries < 40) timer = window.setTimeout(go, 150)
    }
    timer = window.setTimeout(go, 350)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash, location.key])

  return (
    <div className="page-depth flex min-h-screen flex-col overflow-clip">
      <SmoothScroll />
      {!dismissed && (
        <AnnouncementBar
          onDismiss={() => {
            sessionStorage.setItem(DISMISS_KEY, '1')
            setDismissed(true)
          }}
        />
      )}
      <div className="sticky top-0 z-[100]">
        <Header />
      </div>
      {/* The footer waits for the page, or it would show first and then get pushed down. */}
      <Suspense fallback={<div className="flex-1 bg-[var(--wall-cream)]" />}>
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
      <WhatsAppWidget />
    </div>
  )
}
