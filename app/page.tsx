import { PromptArea } from "@/registry/new-york/blocks/prompt-area/prompt-area"

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Prompt Area</h1>
        <p className="text-muted-foreground">
          A custom registry distributing the prompt-area component via shadcn.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">prompt-area</h2>
          <p className="text-sm text-muted-foreground">
            A textarea component designed for AI prompt input.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <PromptArea />
        </div>
      </div>
    </div>
  )
}
