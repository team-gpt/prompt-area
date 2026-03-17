import { staticFile } from 'remotion'
import { loadFont } from '@remotion/fonts'
import { delayRender, continueRender, cancelRender } from 'remotion'
import { useEffect, useRef } from 'react'

export const FONT_FAMILY = 'Geist'
export const MONO_FONT_FAMILY = 'Geist Mono'

export function useFonts() {
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    const handle = delayRender('Loading Geist fonts')

    Promise.all([
      loadFont({
        family: FONT_FAMILY,
        url: staticFile('GeistVF.woff2'),
        weight: '100 900',
      }),
      loadFont({
        family: MONO_FONT_FAMILY,
        url: staticFile('GeistMonoVF.woff2'),
        weight: '100 900',
      }),
    ])
      .then(() => {
        continueRender(handle)
      })
      .catch((err) => {
        console.error('Failed to load fonts:', err)
        cancelRender(err)
      })
  }, [])
}
