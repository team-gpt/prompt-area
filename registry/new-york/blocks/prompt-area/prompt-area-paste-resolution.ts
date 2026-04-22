/**
 * Paste-time trigger resolution for the PromptArea component.
 * Pure — no DOM dependencies.
 *
 * Scans pasted text for trigger patterns (e.g., "#readme") at word boundaries
 * and auto-resolves them into chip segments when the trigger config has
 * `resolveOnSpace: true`.
 */
import type { Segment, TriggerConfig } from './types'
import { isValidTriggerPosition, mergeAdjacentTextSegments } from './prompt-area-engine'

/**
 * Scans text segments for trigger patterns and auto-resolves them into chips.
 * Only resolves triggers that have `resolveOnSpace: true`.
 *
 * Trigger patterns must appear at word boundaries: start of text, after
 * whitespace, or after a newline. This avoids false positives like email
 * addresses (user@example.com).
 */
export function resolveTriggersInSegments(
  segments: Segment[],
  triggers: TriggerConfig[],
): Segment[] {
  const autoResolveTriggers = triggers.filter((t) => t.resolveOnSpace)
  if (autoResolveTriggers.length === 0) return segments

  const triggerChars = new Set(autoResolveTriggers.map((t) => t.char))
  const result: Segment[] = []

  for (const seg of segments) {
    if (seg.type === 'chip') {
      result.push(seg)
      continue
    }

    const parts = splitTextByTriggerPatterns(seg.text, autoResolveTriggers, triggerChars)
    result.push(...parts)
  }

  return mergeAdjacentTextSegments(result)
}

/**
 * Splits a text string into text and chip segments based on trigger patterns.
 * A trigger pattern is: (start-of-string | whitespace) + trigger_char + word_chars
 * followed by whitespace or end-of-string.
 */
function splitTextByTriggerPatterns(
  text: string,
  triggers: TriggerConfig[],
  triggerChars: Set<string>,
): Segment[] {
  if (!text) return []

  const segments: Segment[] = []
  let i = 0

  while (i < text.length) {
    const char = text[i]

    if (triggerChars.has(char)) {
      const isAtBoundary =
        i === 0 || text[i - 1] === ' ' || text[i - 1] === '\n' || text[i - 1] === '\t'

      if (isAtBoundary) {
        const trigger = triggers.find((t) => t.char === char)
        if (trigger && isValidTriggerPosition(text, i, trigger.position)) {
          let end = i + 1
          while (
            end < text.length &&
            text[end] !== ' ' &&
            text[end] !== '\n' &&
            text[end] !== '\t'
          ) {
            end++
          }

          const query = text.slice(i + 1, end)
          if (query.length > 0) {
            const displayText = trigger.onSelect?.({ value: query, label: query }) ?? query
            segments.push({
              type: 'chip',
              trigger: char,
              value: query,
              displayText: displayText || query,
              autoResolved: true,
            })
            i = end
            continue
          }
        }
      }
    }

    const start = i
    i++
    while (
      i < text.length &&
      !(
        triggerChars.has(text[i]) &&
        (i === 0 || text[i - 1] === ' ' || text[i - 1] === '\n' || text[i - 1] === '\t')
      )
    ) {
      i++
    }
    segments.push({ type: 'text', text: text.slice(start, i) })
  }

  return segments
}
