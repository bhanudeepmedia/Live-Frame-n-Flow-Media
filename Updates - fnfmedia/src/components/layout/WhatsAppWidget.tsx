import { useEffect, useState } from 'react'
import { ChevronRight, X } from 'lucide-react'
import { contactChannels } from '@/data/site'

/** The old site's widget and its four topics, in the new site's colours. */
const topics = [
  {
    title: 'Start a Project',
    note: 'Websites, Apps & Design',
    message: "Hi Bhanu, I'm interested in starting a new project (Website/App).",
  },
  {
    title: 'Growth & Leads',
    note: 'Marketing & Sales Funnels',
    message: 'Hi Bhanu, I need help with Growth and Lead Generation.',
  },
  {
    title: 'AI & Automation',
    note: 'Chatbots & Workflows',
    message: 'Hi Bhanu, I want to explore AI Automations for my business.',
  },
  {
    title: 'General Inquiry',
    note: 'Just saying hi!',
    message: 'Hi Bhanu, I have a general question about Frame n Flow.',
  },
]

export const OPEN_WHATSAPP = 'fnfm:open-whatsapp'

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener(OPEN_WHATSAPP, show)
    return () => window.removeEventListener(OPEN_WHATSAPP, show)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-[150] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        className={`w-[min(288px,calc(100vw-32px))] overflow-hidden rounded-[10px] border border-[rgba(21,58,102,0.14)] bg-[var(--wall-cream)] shadow-[0_18px_40px_rgba(11,26,46,0.28)] transition-all duration-[180ms] ${open ? '' : 'invisible translate-y-3 opacity-0'}`}
      >
        <div className="border-b border-[rgba(21,58,102,0.12)] p-4">
          <h3 className="font-sans text-[0.9375rem] font-bold text-[var(--wall-blue)]">How can we help?</h3>
          <p className="text-[0.8125rem] text-[var(--wall-blue)] opacity-70">Select a topic to chat on WhatsApp</p>
        </div>

        <div className="p-2">
          {topics.map((topic) => (
            <a
              key={topic.title}
              href={`https://wa.me/${contactChannels.whatsappNumber}?text=${encodeURIComponent(topic.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-[6px] p-2.5 text-[var(--wall-blue)] transition-colors duration-[var(--motion-ui)] hover:bg-[rgba(21,58,102,0.08)]"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[0.875rem] font-bold leading-tight">{topic.title}</span>
                <span className="block text-[0.75rem] opacity-70">{topic.note}</span>
              </span>
              <ChevronRight aria-hidden="true" className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close WhatsApp menu' : 'Chat with us on WhatsApp'}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-[6px] bg-[var(--wall-blue)] text-[var(--wall-cream)] shadow-[0_10px_24px_rgba(11,26,46,0.32)] transition-opacity duration-[var(--motion-ui)] hover:opacity-90"
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        )}
      </button>
    </div>
  )
}
