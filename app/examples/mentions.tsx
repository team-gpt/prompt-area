'use client'

import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment } from '@/registry/new-york/blocks/prompt-area/types'

const USERS = [
  { value: 'alice', label: 'Alice', description: 'Engineering' },
  { value: 'bob', label: 'Bob', description: 'Design' },
  { value: 'charlie', label: 'Charlie', description: 'Product' },
  { value: 'diana', label: 'Diana', description: 'Marketing' },
  { value: 'eve', label: 'Eve', description: 'Sales' },
]

export function MentionsExample() {
  const [segments, setSegments] = useState<Segment[]>([])
  return (
    <div className="rounded-lg border p-4">
      <PromptArea
        value={segments}
        onChange={setSegments}
        triggers={[
          {
            char: '@',
            position: 'any',
            mode: 'dropdown',
            chipClassName: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            onSearch: (q) => USERS.filter((u) => u.label.toLowerCase().includes(q.toLowerCase())),
          },
        ]}
        placeholder="Type @ to mention someone..."
        minHeight={48}
      />
    </div>
  )
}

export const mentionsCode = `import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment } from '@/registry/new-york/blocks/prompt-area/types'

const USERS = [
  { value: 'alice', label: 'Alice', description: 'Engineering' },
  { value: 'bob', label: 'Bob', description: 'Design' },
  { value: 'charlie', label: 'Charlie', description: 'Product' },
]

function MentionsExample() {
  const [segments, setSegments] = useState<Segment[]>([])
  return (
    <PromptArea
      value={segments}
      onChange={setSegments}
      triggers={[
        {
          char: '@',
          position: 'any',
          mode: 'dropdown',
          chipClassName: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
          onSearch: (q) =>
            USERS.filter((u) => u.label.toLowerCase().includes(q.toLowerCase())),
        },
      ]}
      placeholder="Type @ to mention someone..."
      minHeight={48}
    />
  )
}`
