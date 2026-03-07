'use client'

import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment } from '@/registry/new-york/blocks/prompt-area/types'

const COMMANDS = [
  { value: 'summarize', label: 'summarize', description: 'Summarize the conversation' },
  { value: 'translate', label: 'translate', description: 'Translate to another language' },
  { value: 'improve', label: 'improve', description: 'Improve writing quality' },
  { value: 'explain', label: 'explain', description: 'Explain a concept' },
  { value: 'code', label: 'code', description: 'Generate code snippet' },
]

export function CommandsExample() {
  const [segments, setSegments] = useState<Segment[]>([])
  return (
    <div className="rounded-lg border p-4">
      <PromptArea
        value={segments}
        onChange={setSegments}
        triggers={[
          {
            char: '/',
            position: 'start',
            mode: 'dropdown',
            chipStyle: 'inline',
            chipClassName: 'text-violet-700 dark:text-violet-400',
            onSearch: (q) =>
              COMMANDS.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())),
          },
        ]}
        placeholder="Type / at the start for commands..."
        minHeight={48}
      />
    </div>
  )
}

export const commandsCode = `import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment } from '@/registry/new-york/blocks/prompt-area/types'

const COMMANDS = [
  { value: 'summarize', label: 'summarize', description: 'Summarize the conversation' },
  { value: 'translate', label: 'translate', description: 'Translate to another language' },
  { value: 'improve', label: 'improve', description: 'Improve writing quality' },
]

function CommandsExample() {
  const [segments, setSegments] = useState<Segment[]>([])
  return (
    <PromptArea
      value={segments}
      onChange={setSegments}
      triggers={[
        {
          char: '/',
          position: 'start',
          mode: 'dropdown',
          chipStyle: 'inline',
          chipClassName: 'text-violet-700 dark:text-violet-400',
          onSearch: (q) =>
            COMMANDS.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())),
        },
      ]}
      placeholder="Type / at the start for commands..."
      minHeight={48}
    />
  )
}`
