'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const resolved = theme === 'system' ? getSystemTheme() : theme
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

// Store listeners for useSyncExternalStore
let listeners: Array<() => void> = []

function subscribe(listener: () => void) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function getSnapshot(): Theme {
  return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system'
}

function getServerSnapshot(): Theme {
  return 'system'
}

function emitChange() {
  for (const listener of listeners) listener()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Apply theme class on mount and when theme changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Listen for system preference changes when in system mode
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') applyTheme('system')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
    emitChange()
  }, [])

  return { theme, setTheme }
}

const THEME_OPTIONS: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
]

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  // The server can't know the user's OS preference, so it can't decide which
  // button is "active" when theme === 'system'. Render everything as inactive
  // on the server and on the first client render, then highlight the active
  // button after mount — this keeps SSR output identical to client pre-hydration.
  // `mounted` is deliberately flipped in an effect so the first client render
  // matches the server HTML (all buttons inactive); the active button lights up
  // after hydration. Using useState+useEffect here — not useSyncExternalStore —
  // because we specifically want the pre- and post-hydration renders to differ.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {THEME_OPTIONS.map(({ value, icon: Icon, label }) => {
        const isActive =
          mounted && (theme === value || (theme === 'system' && value === getSystemTheme()))
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-label={label}
            title={label}
            className={cn(
              'rounded-md p-2 transition-colors',
              isActive
                ? 'text-foreground bg-accent'
                : 'text-muted-foreground hover:text-foreground',
            )}>
            <Icon className="size-4" />
          </button>
        )
      })}
    </div>
  )
}
