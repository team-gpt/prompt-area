import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { useFonts } from '../../design/fonts'
import { Background } from '../../design/Background'
import { IntroScene } from './scenes/IntroScene'
import { MentionScene } from './scenes/MentionScene'
import { CommandScene } from './scenes/CommandScene'
import { TagScene } from './scenes/TagScene'
import { FullCardScene } from './scenes/FullCardScene'
import { OutroScene } from './scenes/OutroScene'

/**
 * Video 1: "Smart Input for AI"
 * Shows @mentions, /commands, #tags — the core trigger → dropdown → chip flow.
 * 1080x1080, 30fps, 450 frames (15 seconds)
 */
export const SmartInput: React.FC = () => {
  useFonts()

  return (
    <AbsoluteFill>
      <Background animated />

      {/* Logo intro: frames 0-50 */}
      <Sequence from={0} durationInFrames={50} layout="none">
        <IntroScene />
      </Sequence>

      {/* @mention flow: frames 45-140 */}
      <Sequence from={45} durationInFrames={95} layout="none">
        <MentionScene />
      </Sequence>

      {/* /command flow: frames 140-235 */}
      <Sequence from={140} durationInFrames={95} layout="none">
        <CommandScene />
      </Sequence>

      {/* #tag flow: frames 235-330 */}
      <Sequence from={235} durationInFrames={95} layout="none">
        <TagScene />
      </Sequence>

      {/* Full card reveal: frames 325-405 */}
      <Sequence from={325} durationInFrames={80} layout="none">
        <FullCardScene />
      </Sequence>

      {/* Outro: frames 400-450 */}
      <Sequence from={400} durationInFrames={50} layout="none">
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  )
}
