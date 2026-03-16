import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { useFonts } from '../../design/fonts'
import { Background } from '../../design/Background'
import { IntroScene } from './scenes/IntroScene'
import { InstallScene } from './scenes/InstallScene'
import { DarkModeScene } from './scenes/DarkModeScene'
import { ComposableScene } from './scenes/ComposableScene'
import { SegmentsScene } from './scenes/SegmentsScene'
import { OutroScene } from './scenes/OutroScene'

/**
 * Video 3: "Developer Experience"
 * Shows shadcn install, dark mode, composable layouts, segments API.
 * 1080x1080, 30fps, 450 frames (15 seconds)
 */
export const DevExperience: React.FC = () => {
  useFonts()

  return (
    <AbsoluteFill>
      <Background animated />

      {/* Logo intro: frames 0-50 */}
      <Sequence from={0} durationInFrames={50} layout="none">
        <IntroScene />
      </Sequence>

      {/* Install command: frames 45-150 */}
      <Sequence from={45} durationInFrames={105} layout="none">
        <InstallScene />
      </Sequence>

      {/* Dark mode toggle: frames 145-255 */}
      <Sequence from={145} durationInFrames={110} layout="none">
        <DarkModeScene />
      </Sequence>

      {/* Composable UI: frames 250-365 */}
      <Sequence from={250} durationInFrames={115} layout="none">
        <ComposableScene />
      </Sequence>

      {/* Segments API: frames 360-410 */}
      <Sequence from={360} durationInFrames={50} layout="none">
        <SegmentsScene />
      </Sequence>

      {/* Outro: frames 405-450 */}
      <Sequence from={405} durationInFrames={45} layout="none">
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  )
}
