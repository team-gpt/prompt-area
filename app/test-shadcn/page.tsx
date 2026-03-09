'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PromptArea } from '@/registry/new-york/blocks/prompt-area/prompt-area'
import type { Segment } from '@/registry/new-york/blocks/prompt-area/types'

export default function TestShadcnPage() {
  const [segments, setSegments] = useState<Segment[]>([])
  const [submitted, setSubmitted] = useState<string | null>(null)

  return (
    <div className="container mx-auto max-w-2xl space-y-8 p-8">
      <h1 className="text-3xl font-bold">shadcn/ui Installation Test</h1>
      <p className="text-muted-foreground">
        This page verifies that shadcn/ui components install and work correctly alongside the
        PromptArea registry component.
      </p>

      {/* Button variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>
            All button variants rendered from the installed component.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle>Input Component</CardTitle>
          <CardDescription>Standard input field from shadcn/ui.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Type something here..." />
        </CardContent>
      </Card>

      {/* Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Dialog Component</CardTitle>
          <CardDescription>Modal dialog using Radix UI primitives.</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>It works!</DialogTitle>
                <DialogDescription>
                  The shadcn/ui Dialog component is fully functional with animations and
                  accessibility built in.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* PromptArea + shadcn integration */}
      <Card>
        <CardHeader>
          <CardTitle>PromptArea + shadcn/ui</CardTitle>
          <CardDescription>
            Registry component working alongside installed shadcn/ui components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4">
            <PromptArea
              value={segments}
              onChange={setSegments}
              placeholder="Type a message and press Enter..."
              onSubmit={() => {
                const text = segments.map((s) => (s.type === 'text' ? s.text : '')).join('')
                setSubmitted(text)
                setSegments([])
              }}
              minHeight={48}
            />
          </div>
        </CardContent>
        <CardFooter>
          {submitted && (
            <p className="text-muted-foreground text-sm">Submitted: &quot;{submitted}&quot;</p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
