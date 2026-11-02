import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import MobileMenu from '@/components/layout/MobileMenu'
import { AllServicesLink, BlogCards, ServiceCards } from '@/components/layout/NavMenus'
import { navItems, startProjectHref } from '@/data/navigation'
import type { NavItem } from '@/data/navigation'
import { ctaLabels } from '@/data/site'
import useWallTint from '@/components/layout/useWallTint'
import '@/components/layout/nav.css'

type Menu = NavItem['menu']

/**
 * Off-white header, the same plaster tone as the walls. Logo, nav and call to
 * action, with a thin bottom border. Lives inside the sticky top-chrome wrapper
 * in Layout.tsx. Hovering Our Services or Blog drops a panel under the header;
 * the chevron does the same from a keyboard or a touch screen.
 */
export default function Header() {
  const [open, setOpen] = useState<Menu>()
  const closing = useRef(0)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname, hash } = useLocation()
  useWallTint(headerRef)

  const show = (menu: Menu) => {
    window.clearTimeout(closing.current)
    setOpen(menu)
  }
  const close = () => show(undefined)
  const closeSoon = () => {
    closing.current = window.setTimeout(close, 140)
  }

  useEffect(() => {
    setOpen(undefined)
  }, [pathname, hash])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(undefined)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      ref={headerRef}
      onMouseLeave={closeSoon}
      className="relative w-full border-b border-[rgba(21,58,102,0.12)] bg-[var(--wall-cream)]"
      style={{ height: 70 }}
    >
      <div className="mx-auto flex h-full w-full max-w-[var(--container-max)] items-center justify-between px-[clamp(20px,3vw,64px)]">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <span
              key={item.href}
              onMouseEnter={() => show(item.menu)}
              className="flex h-[70px] items-center gap-1"
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `whitespace-nowrap text-[1rem] font-semibold text-[var(--wall-blue)] transition-colors duration-[var(--motion-ui)] ${
                    isActive ? 'underline decoration-[var(--wall-red)] decoration-2 underline-offset-[10px]' : 'hover:text-[var(--wall-red)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
              {item.menu && (
                <button
                  type="button"
                  aria-label={`Show the ${item.label} menu`}
                  aria-expanded={open === item.menu}
                  aria-controls={`menu-${item.menu}`}
                  onClick={() => show(open === item.menu ? undefined : item.menu)}
                  className="nav-chevron"
                >
                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={startProjectHref}
            onMouseEnter={close}
            className="hidden h-[46px] items-center justify-center whitespace-nowrap rounded-[6px] bg-[var(--wall-blue)] px-5 text-[1rem] font-bold text-[var(--wall-cream)] transition-opacity duration-[var(--motion-ui)] hover:opacity-90 lg:inline-flex"
          >
            {ctaLabels.primary}
          </Link>
          <MobileMenu />
        </div>
      </div>

      <div
        id="menu-services"
        data-open={open === 'services'}
        onMouseEnter={() => show('services')}
        className="nav-panel"
      >
        <div className="nav-panel__in">
          <ServiceCards onNavigate={close} />
          <AllServicesLink onNavigate={close} />
        </div>
      </div>

      <div id="menu-blog" data-open={open === 'blog'} onMouseEnter={() => show('blog')} className="nav-panel">
        <div className="nav-panel__in">
          <BlogCards onNavigate={close} />
        </div>
      </div>
    </header>
  )
}
