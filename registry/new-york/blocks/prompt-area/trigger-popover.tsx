'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TriggerSuggestion } from './types'

type TriggerPopoverProps = {
  suggestions: TriggerSuggestion[]
  loading: boolean
  error?: string | null
  emptyMessage?: string
  selectedIndex: number
  onSelect: (suggestion: TriggerSuggestion) => void
  onDismiss: () => void
  triggerRect: DOMRect | null
  triggerChar: string
}

/**
 * Floating popover that displays trigger suggestions.
 * Positioned relative to the trigger character location in the editor.
 */
export function TriggerPopover({
  suggestions,
  loading,
  error,
  emptyMessage,
  selectedIndex,
  onSelect,
  onDismiss,
  triggerRect,
  triggerChar,
}: TriggerPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLButtonElement>(null)

  // Scroll selected item into view
  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  // Track measured popover height for flip logic
  const [measuredHeight, setMeasuredHeight] = useState<number>(0)

  // Measure popover height after render so flip decision uses real size
  useEffect(() => {
    if (popoverRef.current) {
      setMeasuredHeight(popoverRef.current.offsetHeight)
    }
  })

  // Click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target
      if (popoverRef.current && target instanceof Node && !popoverRef.current.contains(target)) {
        onDismiss()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onDismiss])

  // Dismiss on scroll or resize so the popover doesn't drift from its anchor
  useEffect(() => {
    const dismiss = () => onDismiss()
    window.addEventListener('scroll', dismiss, { capture: true })
    window.addEventListener('resize', dismiss)
    return () => {
      window.removeEventListener('scroll', dismiss, { capture: true })
      window.removeEventListener('resize', dismiss)
    }
  }, [onDismiss])

  if (!triggerRect) return null
  if (suggestions.length === 0 && !loading && !error && !emptyMessage) return null

  // Position the popover relative to the trigger character, clamped to viewport.
  // Flip above when there isn't enough room below.
  const popoverMaxWidth = Math.min(320, window.innerWidth - 16)
  const left = Math.min(triggerRect.left, window.innerWidth - popoverMaxWidth - 8)
  const estimatedHeight = measuredHeight || 240 // 240 = max-h fallback
  const spaceBelow = window.innerHeight - triggerRect.bottom - 4
  const spaceAbove = triggerRect.top - 4
  const showAbove = spaceBelow < estimatedHeight && spaceAbove > spaceBelow
  const top = showAbove ? triggerRect.top - 4 - estimatedHeight : triggerRect.bottom + 4
  const style: React.CSSProperties = {
    position: 'fixed',
    left: `${Math.max(8, left)}px`,
    top: `${Math.max(4, top)}px`,
    zIndex: 50,
    maxWidth: `${popoverMaxWidth}px`,
  }

  return (
    <div
      ref={popoverRef}
      className={cn(
        'max-h-[240px] min-w-[200px] overflow-y-auto',
        'bg-popover rounded-xl border p-2 shadow-md',
        'animate-in fade-in-0 zoom-in-95',
      )}
      style={style}
      role="listbox"
      aria-label={`${triggerChar} suggestions`}>
      {loading ? (
        <div
          role="option"
          aria-selected={false}
          className="text-muted-foreground px-3 py-2 text-sm">
          Loading suggestions...
        </div>
      ) : error ? (
        <div role="option" aria-selected={false} className="text-destructive px-3 py-2 text-sm">
          {error}
        </div>
      ) : suggestions.length === 0 && emptyMessage ? (
        <div
          role="option"
          aria-selected={false}
          className="text-muted-foreground px-3 py-2 text-sm">
          {emptyMessage}
        </div>
      ) : (
        suggestions.map((suggestion, index) => (
          <button
            key={suggestion.value}
            ref={index === selectedIndex ? selectedRef : undefined}
            type="button"
            role="option"
            aria-selected={index === selectedIndex}
            className={cn(
              'text-foreground flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm',
              'hover:bg-accent cursor-pointer transition-colors',
              index === selectedIndex && 'bg-accent',
            )}
            onMouseDown={(e) => {
              e.preventDefault() // Prevent blur on the editor
              onSelect(suggestion)
            }}>
            {suggestion.icon && <span className="mt-0.5 shrink-0">{suggestion.icon}</span>}
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{suggestion.label}</div>
              {suggestion.description && (
                <div className="text-muted-foreground truncate text-xs">
                  {suggestion.description}
                </div>
              )}
            </div>
          </button>
        ))
      )}
    </div>
  )
}
