import { ImageResponse } from 'next/og'

export const alt = 'Prompt Area — Rich Textarea with Tags, Mentions & AI Prompts'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '60px',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-2px',
          }}>
          Prompt Area
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}>
          Rich textarea with @mentions, /commands, #tags & inline markdown
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '16px',
          }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '8px 20px',
              fontSize: 18,
              color: '#e4e4e7',
            }}>
            shadcn registry component
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '8px 20px',
              fontSize: 18,
              color: '#e4e4e7',
            }}>
            React + TypeScript
          </div>
        </div>
        <div
          style={{
            fontSize: 16,
            color: '#71717a',
            marginTop: '8px',
          }}>
          npx shadcn@latest add https://prompt-area.com/r/prompt-area.json
        </div>
      </div>
    </div>,
    { ...size },
  )
}
