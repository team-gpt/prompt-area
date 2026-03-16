import React from 'react'
import { FadeIn } from '../../../design/FadeIn'
import { CodeBlock } from '../../../design/CodeBlock'
import { FeatureLabel } from '../../../design/FeatureLabel'

const SEGMENTS_JSON = [
  '[',
  '  { type: "chip", trigger: "/", value: "summarize" },',
  '  { type: "text", value: " the campaign brief from " },',
  '  { type: "chip", trigger: "@", value: "Strategist" },',
  '  { type: "text", value: " and " },',
  '  { type: "chip", trigger: "@", value: "Copywriter" },',
  '  { type: "text", value: ". Tag anything marked " },',
  '  { type: "chip", trigger: "#", value: "campaign" },',
  ']',
]

export const SegmentsScene: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}>
      <FadeIn delay={0} distance={15}>
        <div style={{ position: 'relative' }}>
          <CodeBlock
            lines={SEGMENTS_JSON}
            startFrame={5}
            framesPerLine={5}
            theme="dark"
            style={{ width: 820 }}
          />
          <FeatureLabel
            text="Segments API"
            delay={10}
            position="top-right"
            style={{ top: -16, right: -16 }}
          />
        </div>
      </FadeIn>
    </div>
  )
}
