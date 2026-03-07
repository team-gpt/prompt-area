'use client'

import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment } from '@/registry/new-york/blocks/prompt-area/types'

const TAGS = [
  { value: 'bug', label: 'bug' },
  { value: 'feature', label: 'feature' },
  { value: 'docs', label: 'docs' },
  { value: 'urgent', label: 'urgent' },
  { value: 'question', label: 'question' },
]

export function TagsExample() {
  const [segments, setSegments] = useState<Segment[]>([])
  return (
    <div className="rounded-lg border p-4">
      <PromptArea
        value={segments}
        onChange={setSegments}
        triggers={[
          {
            char: '#',
            position: 'any',
            mode: 'dropdown',
            resolveOnSpace: true,
            chipClassName: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            onSearch: (q) => TAGS.filter((t) => t.label.toLowerCase().includes(q.toLowerCase())),
          },
        ]}
        placeholder="Type # for tags (press space to auto-resolve)..."
        minHeight={48}
      />
    </div>
  )
}

export const tagsCode = `import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment } from '@/registry/new-york/blocks/prompt-area/types'

const TAGS = [
  { value: 'bug', label: 'bug' },
  { value: 'feature', label: 'feature' },
  { value: 'docs', label: 'docs' },
  { value: 'urgent', label: 'urgent' },
]

function TagsExample() {
  const [segments, setSegments] = useState<Segment[]>([])
  return (
    <PromptArea
      value={segments}
      onChange={setSegments}
      triggers={[
        {
          char: '#',
          position: 'any',
          mode: 'dropdown',
          resolveOnSpace: true,
          chipClassName: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
          onSearch: (q) =>
            TAGS.filter((t) => t.label.toLowerCase().includes(q.toLowerCase())),
        },
      ]}
      placeholder="Type # for tags (press space to auto-resolve)..."
      minHeight={48}
    />
  )
}`
