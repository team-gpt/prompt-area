import React from 'react'
import { Composition } from 'remotion'
import { VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_FPS, VIDEO_DURATION_FRAMES } from './design/tokens'
import { SmartInput } from './compositions/SmartInput'
import { RichText } from './compositions/RichText'
import { DevExperience } from './compositions/DevExperience'

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="SmartInput"
        component={SmartInput}
        durationInFrames={VIDEO_DURATION_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="RichText"
        component={RichText}
        durationInFrames={VIDEO_DURATION_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="DevExperience"
        component={DevExperience}
        durationInFrames={VIDEO_DURATION_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  )
}
