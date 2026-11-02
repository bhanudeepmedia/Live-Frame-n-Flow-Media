import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog } from 'radix-ui'
import { ArrowLeft, ChevronRight, Menu, X } from 'lucide-react'
import { navItems, startProjectHref } from '@/data/navigation'
import type { NavItem } from '@/data/navigation'
import { ctaLabels } from '@/data/site'
import Logo from '@/components/layout/Logo'
import { AllServicesLink, BlogCards, ServiceCards } from '@/components/layout/NavMenus'
import '@/components/layout/nav.css'

/**
 * Hamburger right, full-screen off-white overlay, stacked items. Built on
 * Radix Dialog for focus-trap +
 * Escape-close + scroll-lock, the exact accessibility behavior PHASES.md
 * Phase 1 requires. Our Services and Blog open their own page of the menu,
 * with a way back.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<NavItem['menu']>()
  const close = () => {
    setOpen(false)
    setMenu(undefined)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => (next ? setOpen(true) : close())}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-[var(--wall-blue)] lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-[var(--wall-cream)] data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[201] flex flex-col overflow-y-auto bg-[var(--wall-cream)] px-6 pb-10 pt-5 focus:outline-none"
        >
          <div className="flex items-center justify-between pb-8">
            <Dialog.Title asChild>
              <Logo onClick={close} />
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-[var(--wall-blue)]"
              >
                <X className="h-6 w-6" />
              </button>
            </Dialog.Close>
          </div>

          {menu ? (
            <div className="nav-sheet">
              <button type="button" onClick={() => setMenu(undefined)} className="nav-back">
                <ArrowLeft aria-hidden="true" className="h-5 w-5" />
                Go back
              </button>
              {menu === 'services' ? (
                <>
                  <ServiceCards onNavigate={close} />
                  <AllServicesLink onNavigate={close} />
                </>
              ) : (
                <BlogCards onNavigate={close} />
              )}
            </div>
          ) : (
            <>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <div key={item.href} className="border-b border-[rgba(21,58,102,0.16)]">
                    {item.menu ? (
                      <button
                        type="button"
                        onClick={() => setMenu(item.menu)}
                        className="flex w-full items-center justify-between py-4 text-left text-[1.625rem] font-bold tracking-[-0.01em] text-[var(--wall-blue)]"
                      >
                        {item.label}
                        <ChevronRight aria-hidden="true" className="h-6 w-6" />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={close}
                        className="block py-4 text-[1.625rem] font-bold tracking-[-0.01em] text-[var(--wall-blue)]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <Link
                to={startProjectHref}
                onClick={close}
                className="mt-8 flex h-[52px] w-full items-center justify-center rounded-[6px] bg-[var(--wall-blue)] text-[1rem] font-bold text-[var(--wall-cream)]"
              >
                {ctaLabels.primary}
              </Link>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
