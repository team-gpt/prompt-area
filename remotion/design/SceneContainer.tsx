import React from 'react'
import { Sequence, useCurrentFrame, interpolate } from 'remotion'

interface SceneContainerProps {
  /** Start frame within the composition */
  from: number
  /** Duration in frames */
  durationInFrames: number
  /** Frames for fade-in (default 8) */
  fadeIn?: number
  /** Frames for fade-out (default 8) */
  fadeOut?: number
  children: React.ReactNode
}

/**
 * Wraps children in a Sequence with optional fade-in/out transitions.
 * Scene components inside receive frame=0 at their start (Sequence handles offset).
 */
export const SceneContainer: React.FC<SceneContainerProps> = ({
  from,
  durationInFrames,
  fadeIn = 8,
  fadeOut = 8,
  children,
}) => {
  return (
    <Sequence from={from} durationInFrames={durationInFrames} layout="none">
      <SceneFader fadeIn={fadeIn} fadeOut={fadeOut} duration={durationInFrames}>
        {children}
      </SceneFader>
    </Sequence>
  )
}

function SceneFader({
  fadeIn,
  fadeOut,
  duration,
  children,
}: {
  fadeIn: number
  fadeOut: number
  duration: number
  children: React.ReactNode
}) {
  const frame = useCurrentFrame()

  const fadeInOpacity = interpolate(frame, [0, fadeIn], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const fadeOutOpacity = interpolate(frame, [duration - fadeOut, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return <div style={{ opacity: Math.min(fadeInOpacity, fadeOutOpacity) }}>{children}</div>
}
