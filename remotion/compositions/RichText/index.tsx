import React from 'react'
import { AbsoluteFill, Sequence } from 'remotion'
import { useFonts } from '../../design/fonts'
import { Background } from '../../design/Background'
import { IntroScene } from './scenes/IntroScene'
import { MarkdownScene } from './scenes/MarkdownScene'
import { ListScene } from './scenes/ListScene'
import { ImagePasteScene } from './scenes/ImagePasteScene'
import { FileAttachScene } from './scenes/FileAttachScene'
import { OutroScene } from './scenes/OutroScene'

/**
 * Video 2: "Rich Text & Attachments"
 * Shows inline markdown, lists, image paste, file attachments.
 * 1080x1080, 30fps, 450 frames (15 seconds)
 */
export const RichText: React.FC = () => {
  useFonts()

  return (
    <AbsoluteFill>
      <Background animated />

      {/* Logo intro: frames 0-50 */}
      <Sequence from={0} durationInFrames={50} layout="none">
        <IntroScene />
      </Sequence>

      {/* Markdown typing: frames 45-145 */}
      <Sequence from={45} durationInFrames={100} layout="none">
        <MarkdownScene />
      </Sequence>

      {/* List auto-format: frames 140-240 */}
      <Sequence from={140} durationInFrames={100} layout="none">
        <ListScene />
      </Sequence>

      {/* Image paste: frames 235-330 */}
      <Sequence from={235} durationInFrames={95} layout="none">
        <ImagePasteScene />
      </Sequence>

      {/* File attachment: frames 325-405 */}
      <Sequence from={325} durationInFrames={80} layout="none">
        <FileAttachScene />
      </Sequence>

      {/* Outro: frames 400-450 */}
      <Sequence from={400} durationInFrames={50} layout="none">
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  )
}
