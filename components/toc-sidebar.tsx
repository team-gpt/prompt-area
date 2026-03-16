'use client'

import { useActiveSection } from '@/hooks/use-active-section'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

const TOC_ITEMS = [
  { id: 'hero', label: 'Introduction' },
  { id: 'what-is-prompt-area', label: 'What is Prompt Area?' },
  { id: 'demo', label: 'Demo' },
  { id: 'why-prompt-area', label: 'Why Prompt Area?' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'installation', label: 'Installation' },
  { id: 'features', label: 'Features' },
  { id: 'examples', label: 'Examples' },
  { id: 'action-bar', label: 'Action Bar' },
  { id: 'status-bar', label: 'Status Bar' },
  { id: 'compact-prompt-area', label: 'Compact Prompt Area' },
  { id: 'chat-prompt-layout', label: 'Chat Prompt Layout' },
  { id: 'inspector', label: 'Inspector' },
  { id: 'dark-theme', label: 'Dark Theme' },
  { id: 'comparison', label: 'Comparison' },
] as const

export function TocSidebar() {
  const ids = useMemo(() => TOC_ITEMS.map((item) => item.id), [])
  const activeId = useActiveSection(ids)

  return (
    <aside className="hidden w-[200px] shrink-0 xl:block">
      <div className="sticky top-16">
        <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
          On this page
        </p>
        <nav className="flex flex-col gap-0.5">
          {TOC_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(item.id)
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  history.replaceState(null, '', `#${item.id}`)
                }
              }}
              className={cn(
                'border-l-2 py-1 pl-3 text-xs transition-colors duration-150',
                activeId === item.id
                  ? 'border-foreground text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground border-transparent',
              )}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
