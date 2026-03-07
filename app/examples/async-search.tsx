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

export function AsyncSearchExample() {
  const [segments, setSegments] = useState<Segment[]>([])
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg border p-4">
        <PromptArea
          value={segments}
          onChange={setSegments}
          triggers={[
            {
              char: '@',
              position: 'any',
              mode: 'dropdown',
              searchDebounceMs: 300,
              emptyMessage: 'No users found',
              accessibilityLabel: 'mention',
              onSearch: async (query, { signal }) => {
                await new Promise<void>((resolve, reject) => {
                  const timer = setTimeout(resolve, 500)
                  signal.addEventListener('abort', () => {
                    clearTimeout(timer)
                    reject(new DOMException('Aborted', 'AbortError'))
                  })
                })
                return USERS.filter(
                  (u) =>
                    u.label.toLowerCase().includes(query.toLowerCase()) ||
                    u.description.toLowerCase().includes(query.toLowerCase()),
                )
              },
              onSearchError: (err) => {
                console.error('Search failed:', err)
              },
            },
          ]}
          placeholder="Type @ to search users (async, 300ms debounce)..."
          minHeight={48}
        />
      </div>
    </div>
  )
}

export const asyncSearchCode = `import { useState } from 'react'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment } from '@/registry/new-york/blocks/prompt-area/types'

const USERS = [
  { value: 'alice', label: 'Alice', description: 'Engineering' },
  { value: 'bob', label: 'Bob', description: 'Design' },
  { value: 'charlie', label: 'Charlie', description: 'Product' },
]

function AsyncSearchExample() {
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
          searchDebounceMs: 300,
          emptyMessage: 'No users found',
          accessibilityLabel: 'mention',
          onSearch: async (query, { signal }) => {
            // Simulate a 500ms API call
            await new Promise<void>((resolve, reject) => {
              const timer = setTimeout(resolve, 500)
              signal.addEventListener('abort', () => {
                clearTimeout(timer)
                reject(new DOMException('Aborted', 'AbortError'))
              })
            })
            return USERS.filter((u) =>
              u.label.toLowerCase().includes(query.toLowerCase()),
            )
          },
          onSearchError: (err) => console.error('Search failed:', err),
        },
      ]}
      placeholder="Type @ to search users (async, 300ms debounce)..."
      minHeight={48}
    />
  )
}`
