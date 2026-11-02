import { useRef } from 'react'
import { serviceTabs } from '@/data/services'

/**
 * DESIGN.md §15 "Service tabs" / PRD.md §19. ARIA tablist with arrow-key
 * navigation (PRD.md §19 "arrow keys should be supported").
 */
export default function ServiceTabs({
  activeId,
  onChange,
}: {
  activeId: string
  onChange: (id: string) => void
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    let nextIndex: number | null = null
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % serviceTabs.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + serviceTabs.length) % serviceTabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = serviceTabs.length - 1
    if (nextIndex !== null) {
      event.preventDefault()
      const next = serviceTabs[nextIndex]
      onChange(next.id)
      refs.current[next.id]?.focus()
    }
  }

  return (
    <div role="tablist" aria-label="Services" className="flex flex-wrap justify-center gap-3">
      {serviceTabs.map((tab, index) => {
        const active = tab.id === activeId
        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[tab.id] = node
            }}
            role="tab"
            id={`service-tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`service-panel-${tab.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`rounded-[var(--radius-pill)] px-6 py-3 text-[0.9375rem] font-semibold uppercase tracking-[0.08em] transition-all duration-[var(--motion-ui)] ${
              active
                ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]'
                : 'bg-[#eaf1fa] text-[var(--text-dark)] hover:bg-[#dbe8f7]'
            }`}
          >
            {tab.tabLabel}
          </button>
        )
      })}
    </div>
  )
}
