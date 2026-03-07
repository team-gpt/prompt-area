'use client'

import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment, TriggerConfig } from '@/registry/new-york/blocks/prompt-area/types'

const USERS = [
  { value: 'alice', label: 'Alice', description: 'Engineering' },
  { value: 'bob', label: 'Bob', description: 'Design' },
  { value: 'charlie', label: 'Charlie', description: 'Product' },
]

const TAGS = [
  { value: 'bug', label: 'bug' },
  { value: 'feature', label: 'feature' },
  { value: 'docs', label: 'docs' },
]

const COPY_PASTE_TRIGGERS: TriggerConfig[] = [
  {
    char: '@',
    position: 'any',
    mode: 'dropdown',
    chipClassName: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    onSearch: (q) => USERS.filter((u) => u.label.toLowerCase().includes(q.toLowerCase())),
  },
  {
    char: '#',
    position: 'any',
    mode: 'dropdown',
    resolveOnSpace: true,
    chipClassName: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    onSearch: (q) => TAGS.filter((t) => t.label.toLowerCase().includes(q.toLowerCase())),
  },
]

const INITIAL_SEGMENTS: Segment[] = [
  { type: 'text', text: 'Hello ' },
  { type: 'chip', trigger: '@', value: 'alice', displayText: 'Alice' },
  { type: 'text', text: ' please review ' },
  { type: 'chip', trigger: '#', value: 'feature', displayText: 'feature' },
  { type: 'text', text: ' when you can' },
]

export function CopyPasteExample() {
  const [sourceSegments, setSourceSegments] = useState<Segment[]>(INITIAL_SEGMENTS)
  const [targetSegments, setTargetSegments] = useState<Segment[]>([])
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="flex flex-col gap-1">
        <div className="text-muted-foreground text-xs">Source (select & copy)</div>
        <div className="rounded-lg border p-4">
          <PromptArea
            value={sourceSegments}
            onChange={setSourceSegments}
            triggers={COPY_PASTE_TRIGGERS}
            placeholder="Type here..."
            minHeight={60}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-muted-foreground text-xs">Target (paste here)</div>
        <div className="rounded-lg border p-4">
          <PromptArea
            value={targetSegments}
            onChange={setTargetSegments}
            triggers={COPY_PASTE_TRIGGERS}
            placeholder="Paste content here..."
            minHeight={60}
          />
        </div>
      </div>
    </div>
  )
}

export const copyPasteCode = `import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment, TriggerConfig } from '@/registry/new-york/blocks/prompt-area/types'

const TRIGGERS: TriggerConfig[] = [
  {
    char: '@',
    position: 'any',
    mode: 'dropdown',
    chipClassName: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    onSearch: (q) => USERS.filter((u) => u.label.toLowerCase().includes(q.toLowerCase())),
  },
  {
    char: '#',
    position: 'any',
    mode: 'dropdown',
    resolveOnSpace: true,
    chipClassName: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    onSearch: (q) => TAGS.filter((t) => t.label.toLowerCase().includes(q.toLowerCase())),
  },
]

function CopyPasteExample() {
  const [sourceSegments, setSourceSegments] = useState<Segment[]>([
    { type: 'text', text: 'Hello ' },
    { type: 'chip', trigger: '@', value: 'alice', displayText: 'Alice' },
    { type: 'text', text: ' please review ' },
    { type: 'chip', trigger: '#', value: 'feature', displayText: 'feature' },
    { type: 'text', text: ' when you can' },
  ])
  const [targetSegments, setTargetSegments] = useState<Segment[]>([])
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="flex flex-col gap-1">
        <div className="text-xs">Source (select & copy)</div>
        <PromptArea
          value={sourceSegments}
          onChange={setSourceSegments}
          triggers={TRIGGERS}
          placeholder="Type here..."
          minHeight={60}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs">Target (paste here)</div>
        <PromptArea
          value={targetSegments}
          onChange={setTargetSegments}
          triggers={TRIGGERS}
          placeholder="Paste content here..."
          minHeight={60}
        />
      </div>
    </div>
  )
}`
