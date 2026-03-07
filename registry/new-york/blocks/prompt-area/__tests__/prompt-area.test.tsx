import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { PromptArea } from '../prompt-area'
import type { PromptAreaHandle, Segment } from '../types'

describe('PromptArea', () => {
  const defaultProps = {
    value: [] as Segment[],
    onChange: vi.fn(),
  }

  it('renders a textbox element', () => {
    render(<PromptArea {...defaultProps} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows placeholder when empty', () => {
    render(<PromptArea {...defaultProps} placeholder="Type here..." />)
    expect(screen.getByText('Type here...')).toBeInTheDocument()
  })

  it('hides placeholder when value is non-empty', () => {
    render(
      <PromptArea
        {...defaultProps}
        value={[{ type: 'text', text: 'hello' }]}
        placeholder="Type here..."
      />,
    )
    expect(screen.queryByText('Type here...')).not.toBeInTheDocument()
  })

  it('applies custom className to container', () => {
    const { container } = render(<PromptArea {...defaultProps} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('disables contentEditable when disabled', () => {
    render(<PromptArea {...defaultProps} disabled />)
    const editor = screen.getByRole('textbox')
    expect(editor).toHaveAttribute('contenteditable', 'false')
    expect(editor).toHaveAttribute('aria-disabled', 'true')
  })

  it('has correct displayName', () => {
    expect(PromptArea.displayName).toBe('PromptArea')
  })

  it('exposes imperative handle via ref', () => {
    const ref = createRef<PromptAreaHandle>()
    render(<PromptArea {...defaultProps} ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(typeof ref.current?.focus).toBe('function')
    expect(typeof ref.current?.blur).toBe('function')
    expect(typeof ref.current?.insertChip).toBe('function')
    expect(typeof ref.current?.getPlainText).toBe('function')
    expect(typeof ref.current?.clear).toBe('function')
  })

  it('sets aria-label', () => {
    render(<PromptArea {...defaultProps} aria-label="Message input" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Message input')
  })

  it('sets data-test-id', () => {
    render(<PromptArea {...defaultProps} data-test-id="prompt-input" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('data-test-id', 'prompt-input')
  })
})
