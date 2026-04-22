/**
 * Clipboard-related DOM utilities for the PromptArea component.
 * Handles serializing selections and inserting pasted segments at the cursor.
 *
 * Not merged into dom-helpers.ts to avoid overcrowding that file with
 * clipboard I/O concerns alongside its DOM traversal and chip-accessor helpers.
 */
import type { Segment, ChipSegment } from './types'
import {
  getChipAutoResolved,
  getChipData,
  getChipDisplay,
  getChipTrigger,
  getChipValue,
  getSelectionRange,
  isChipElement,
  isHTMLElement,
} from './dom-helpers'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Serializes a DocumentFragment (from selection) to plain text,
 * converting chip elements to their `trigger + displayText` form.
 */
export function serializeFragmentToPlainText(fragment: DocumentFragment): string {
  let text = ''

  const walk = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent ?? ''
    } else if (isChipElement(node)) {
      const trigger = node.dataset.chipTrigger ?? ''
      const display = node.dataset.chipDisplay ?? node.textContent ?? ''
      text += trigger + display
    } else if (isHTMLElement(node) && node.tagName === 'BR') {
      text += '\n'
    } else {
      node.childNodes.forEach(walk)
    }
  }

  fragment.childNodes.forEach(walk)
  return text
}

/**
 * Serializes a DocumentFragment to an array of Segment objects,
 * preserving chip data for internal copy/paste.
 */
export function serializeFragmentToSegments(fragment: DocumentFragment): Segment[] {
  const segments: Segment[] = []

  const walk = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      if (text) {
        segments.push({ type: 'text', text })
      }
    } else if (isChipElement(node)) {
      const trigger = getChipTrigger(node)
      const chipValue = getChipValue(node)
      const display = getChipDisplay(node)
      const data = getChipData(node)
      const autoResolved = getChipAutoResolved(node)

      if (trigger && chipValue !== undefined && display) {
        const chip: ChipSegment = {
          type: 'chip',
          trigger,
          value: chipValue,
          displayText: display,
          ...(data !== undefined ? { data } : {}),
          ...(autoResolved ? { autoResolved: true } : {}),
        }
        segments.push(chip)
      }
    } else if (isHTMLElement(node) && node.tagName === 'BR') {
      segments.push({ type: 'text', text: '\n' })
    } else {
      node.childNodes.forEach(walk)
    }
  }

  fragment.childNodes.forEach(walk)
  return segments
}

/**
 * Parses segment JSON from the clipboard. Returns null if invalid.
 */
export function parseSegmentsFromClipboard(json: string): Segment[] | null {
  try {
    const parsed: unknown = JSON.parse(json)
    if (!Array.isArray(parsed)) return null

    const segments: Segment[] = []
    for (const item of parsed) {
      if (!isRecord(item)) return null

      if (item.type === 'text' && typeof item.text === 'string') {
        segments.push({ type: 'text', text: item.text })
      } else if (
        item.type === 'chip' &&
        typeof item.trigger === 'string' &&
        typeof item.value === 'string' &&
        typeof item.displayText === 'string'
      ) {
        const chip: ChipSegment = {
          type: 'chip',
          trigger: item.trigger,
          value: item.value,
          displayText: item.displayText,
          ...(item.data !== undefined ? { data: item.data } : {}),
          ...(item.autoResolved ? { autoResolved: true } : {}),
        }
        segments.push(chip)
      } else {
        return null
      }
    }

    return segments
  } catch {
    return null
  }
}

/**
 * Inserts pasted segments at the current cursor position within existing segments.
 * Splits the text segment at the cursor to insert the pasted content.
 */
export function insertSegmentsAtCursor(
  currentSegments: Segment[],
  pastedSegments: Segment[],
  editor: HTMLElement,
): Segment[] {
  // Get cursor offset in the editor
  const range = getSelectionRange()
  if (!range) return [...currentSegments, ...pastedSegments]

  const preRange = document.createRange()
  preRange.selectNodeContents(editor)
  preRange.setEnd(range.startContainer, range.startOffset)

  // Calculate character offset by walking the pre-range fragment
  let cursorOffset = 0
  const fragment = preRange.cloneContents()
  const walk = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      cursorOffset += (node.textContent ?? '').length
    } else if (isChipElement(node)) {
      const trigger = node.dataset.chipTrigger ?? ''
      const display = node.dataset.chipDisplay ?? node.textContent ?? ''
      cursorOffset += trigger.length + display.length
    } else if (isHTMLElement(node) && node.tagName === 'BR') {
      cursorOffset += 1
    } else {
      node.childNodes.forEach(walk)
    }
  }
  fragment.childNodes.forEach(walk)

  // Split current segments at cursor offset and insert pasted segments
  const result: Segment[] = []
  let offset = 0

  for (const seg of currentSegments) {
    if (seg.type === 'chip') {
      const chipLen = seg.trigger.length + seg.displayText.length
      if (offset + chipLen <= cursorOffset) {
        result.push(seg)
      } else if (offset >= cursorOffset) {
        // Will be added after pasted segments
        break
      }
      offset += chipLen
    } else {
      if (offset + seg.text.length <= cursorOffset) {
        result.push(seg)
        offset += seg.text.length
      } else if (offset >= cursorOffset) {
        break
      } else {
        // Split this text segment at cursor
        const splitAt = cursorOffset - offset
        const before = seg.text.slice(0, splitAt)
        if (before) {
          result.push({ type: 'text', text: before })
        }
        offset += seg.text.length
        break
      }
    }
  }

  // Insert pasted segments
  result.push(...pastedSegments)

  // Add remaining segments after cursor
  let pastCursor = false
  let remaining = 0
  for (const seg of currentSegments) {
    if (seg.type === 'chip') {
      const chipLen = seg.trigger.length + seg.displayText.length
      if (remaining + chipLen > cursorOffset) {
        if (pastCursor) {
          result.push(seg)
        } else {
          pastCursor = true
        }
      }
      remaining += chipLen
    } else {
      if (remaining >= cursorOffset) {
        if (pastCursor) {
          result.push(seg)
        } else {
          // This text segment was split — add the remainder
          const splitAt = cursorOffset - remaining
          if (splitAt < 0) {
            result.push(seg)
          } else {
            const after = seg.text.slice(cursorOffset - remaining)
            if (after) {
              result.push({ type: 'text', text: after })
            }
          }
          pastCursor = true
        }
      }
      remaining += seg.text.length
    }
  }

  // Merge adjacent text segments
  const merged: Segment[] = []
  for (const seg of result) {
    if (seg.type === 'text' && seg.text === '') continue
    const last = merged[merged.length - 1]
    if (seg.type === 'text' && last?.type === 'text') {
      merged[merged.length - 1] = { type: 'text', text: last.text + seg.text }
    } else {
      merged.push(seg)
    }
  }

  return merged
}
