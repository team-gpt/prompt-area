import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { type Theme, themeColors, spacing } from './tokens'
import { noiseDrift } from './animation'

interface BackgroundProps {
  theme?: Theme
  /** Enable subtle noise-based drift on the dot pattern */
  animated?: boolean
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const Background: React.FC<BackgroundProps> = ({
  theme = 'light',
  animated = false,
  style,
  children,
}) => {
  const frame = useCurrentFrame()
  const c = themeColors(theme)

  const drift = animated ? noiseDrift(frame, 'bg', 2, 0.005) : { x: 0, y: 0 }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.bg,
        backgroundImage: `radial-gradient(circle, ${c.dotPattern} 1px, transparent 1px)`,
        backgroundSize: `${spacing.dotSize}px ${spacing.dotSize}px`,
        backgroundPosition: animated ? `${drift.x}px ${drift.y}px` : undefined,
        fontFamily: 'Geist, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}>
      {children}
    </AbsoluteFill>
  )
}
