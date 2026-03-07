import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

export function useShikiHighlight(code: string, lang: string = 'tsx') {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    codeToHtml(code, {
      lang,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    }).then((result) => {
      if (!cancelled) setHtml(result)
    })
    return () => {
      cancelled = true
    }
  }, [code, lang])

  return html
}
