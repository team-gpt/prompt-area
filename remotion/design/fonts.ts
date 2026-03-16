import { staticFile } from 'remotion'
import { loadFont } from '@remotion/fonts'
import { delayRender, continueRender } from 'remotion'

let fontsLoaded = false

export const FONT_FAMILY = 'Geist'
export const MONO_FONT_FAMILY = 'Geist Mono'

export function useFonts() {
  if (fontsLoaded) return

  const handle = delayRender('Loading fonts')

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
  ]).then(() => {
    fontsLoaded = true
    continueRender(handle)
  })
}
