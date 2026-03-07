import type { Metadata } from 'next'
import HomeContent from './home-content'

export const metadata: Metadata = {
  title: 'Prompt Area — Textarea with Tags, Mentions & Commands for React',
  description:
    'An open-source React textarea component with @mentions, /commands, #tags, inline markdown, undo/redo, file attachments, and dark mode. Install via shadcn registry: npx shadcn@latest add.',
  alternates: {
    canonical: 'https://prompt-area.com',
  },
}

export default function Page() {
  return <HomeContent />
}
