import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

/** Accessible disclosure list; content mirrors the FAQPage JSON-LD emitted alongside it. */
export default function FaqList({ items, tone = 'light' }: { items: FaqItem[]; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()
  const light = tone === 'light'

  return (
    <ul className="flex flex-col">
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `${baseId}-panel-${index}`
        return (
          <li
            key={item.question}
            className={`border-b ${light ? 'border-[rgba(8,22,60,0.12)]' : 'border-[var(--border-subtle)]'}`}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-[16px] font-semibold"
              >
                {item.question}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-[var(--motion-ui)] ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              hidden={!isOpen}
              className={`pb-5 text-[15px] leading-[1.55] ${light ? 'text-[rgba(8,22,60,0.72)]' : 'text-[var(--text-muted)]'}`}
            >
              {item.answer}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
