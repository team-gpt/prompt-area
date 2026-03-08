'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SCROLL_THRESHOLD = 200

export function useScrollObserver() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showGoToTop, setShowGoToTop] = useState(false)
  const [showGoToBottom, setShowGoToBottom] = useState(false)

  const update = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setShowGoToTop(el.scrollTop > SCROLL_THRESHOLD)
    setShowGoToBottom(el.scrollTop + el.clientHeight < el.scrollHeight - SCROLL_THRESHOLD)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    el.addEventListener('scroll', update, { passive: true })
    update()

    return () => el.removeEventListener('scroll', update)
  }, [update])

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [])

  return { scrollRef, showGoToTop, showGoToBottom, scrollToTop, scrollToBottom }
}
