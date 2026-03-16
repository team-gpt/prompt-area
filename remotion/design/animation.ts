import { spring, interpolate } from 'remotion'
import { noise2D } from '@remotion/noise'

// --- Spring presets ---

export const springs = {
  /** Snappy with slight overshoot — logo entrances, card reveals */
  entrance: { damping: 12, stiffness: 200, mass: 0.8 },
  /** Fast bounce — chip pop-ins */
  chipPop: { damping: 10, stiffness: 400, mass: 0.5 },
  /** Smooth slide-in — dropdowns, popovers */
  dropdown: { damping: 15, stiffness: 300 },
  /** Gentle fade — scene transitions */
  sceneTransition: { damping: 20, stiffness: 150 },
  /** Slow and elegant — background elements */
  subtle: { damping: 20, stiffness: 100, mass: 1.2 },
} as const

export type SpringPreset = keyof typeof springs

// --- Helpers ---

/** Get a spring value for a given frame and delay */
export function springValue(
  frame: number,
  fps: number,
  delay: number = 0,
  preset: SpringPreset = 'entrance',
) {
  return spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: springs[preset],
    durationInFrames: 30,
  })
}

/** Organic floating drift using noise — returns { x, y } offsets in px */
export function noiseDrift(
  frame: number,
  seed: string = 'drift',
  amplitude: number = 3,
  speed: number = 0.008,
): { x: number; y: number } {
  return {
    x: noise2D(seed, frame * speed, 0) * amplitude,
    y: noise2D(seed, 0, frame * speed) * amplitude,
  }
}

/** Map a spring progress [0,1] to an opacity + translateY entrance */
export function fadeUpStyle(progress: number, distance: number = 20): React.CSSProperties {
  return {
    opacity: interpolate(progress, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
  }
}

/** Map a spring progress [0,1] to a scale pop entrance */
export function scalePopStyle(progress: number, from: number = 0.6): React.CSSProperties {
  return {
    opacity: interpolate(progress, [0, 0.3], [0, 1], {
      extrapolateRight: 'clamp',
    }),
    transform: `scale(${interpolate(progress, [0, 1], [from, 1])})`,
  }
}

/** Trail config preset for @remotion/motion-blur */
export const trailConfig = {
  layers: 4,
  lagInFrames: 0.3,
  trailOpacity: 0.15,
} as const

/** Blinking cursor opacity (use with frame from useCurrentFrame) */
export function cursorOpacity(frame: number): number {
  return Math.round(Math.sin(frame * 0.15) * 0.5 + 0.5)
}
