# Prompt Area — Launch & Distribution Playbook

All copy below is ready to paste. Adjust links/handles as needed before posting.

---

## 1. Hacker News — Show HN

**Title:**
```
Show HN: Prompt Area – Rich text input for AI chat UIs (shadcn, zero deps)
```

**Body:**

```
Hi HN,

I built Prompt Area — a contentEditable rich text input component for React,
designed specifically for AI chat interfaces.

The problem: if you're building an AI chat UI, your input needs @mentions
(to reference context), /commands (to trigger actions), #tags, inline markdown,
file attachments, and undo/redo. Existing options are either too limited
(react-mentions only does mentions) or massive overkill (Tiptap, Lexical, and
Plate are full document editors built on ProseMirror/Slate — way too heavy for
a prompt input).

Prompt Area sits in the middle. It uses a segment-based model (array of
{type, text} objects) on top of contentEditable, with all logic extracted into
a pure engine file that's testable without a DOM. Zero dependencies beyond
React and your existing Tailwind/shadcn setup.

Features: trigger-based chips (@, /, # or any character), immutable chip pills,
live inline markdown preview, auto-growing textarea, full undo/redo history,
copy/paste with chip preservation, IME support for CJK input, ARIA accessibility,
dark mode, and file/image attachments.

Install in one command:

    npx shadcn@latest add https://prompt-area.com/r/prompt-area.json

Live demo & docs: https://prompt-area.com
Source: https://github.com/team-gpt/prompt-area

Would love feedback from anyone building AI/LLM interfaces.
```

---

## 2. Product Hunt Launch

**Tagline (56 chars):**
```
The rich text input your AI chat UI deserves
```

**Description:**

```
Every AI chat application needs a great input — one that supports @mentions for
context, /commands for actions, #tags for organization, and inline markdown for
formatting. But existing solutions force you to choose between "too simple"
(react-mentions) and "way too complex" (Tiptap, Lexical, Plate).

Prompt Area is the missing middle ground. It's a production-grade React component
built as a shadcn registry item — install it in one command and it fits right
into your existing Tailwind + shadcn project with zero extra dependencies.

What you get out of the box:
• Trigger-based chips — type @, /, # (or any character) to activate dropdowns
• Immutable chip pills that can't be accidentally edited
• Live inline markdown — bold, italic, auto-linked URLs
• Full undo/redo with debounced history snapshots
• Auto-grow on focus, shrink on blur
• File & image attachments with thumbnails
• IME composition support for CJK languages
• Accessible by default — full ARIA labels and keyboard navigation
• Dark mode ready

The architecture is clean: a pure logic engine (testable without a DOM) drives
a thin contentEditable layer. The entire component is ~320 lines.

Install:
npx shadcn@latest add https://prompt-area.com/r/prompt-area.json

Built for AI chat apps, copilot UIs, and any modern interface that needs a
rich prompt input without the weight of a full document editor.
```

**Maker's First Comment:**

```
Hey Product Hunt! 👋

I'm the maker of Prompt Area. We built this because we kept running into the
same problem across multiple AI projects: the text input is always an
afterthought, but it's the single most-used element in any chat interface.

We tried react-mentions (too limited), Tiptap (too heavy, ProseMirror learning
curve), and Lexical (still in beta territory, complex plugin system). Each time
we ended up building custom solutions from scratch.

So we extracted the best parts into a reusable, well-tested component and
published it as a shadcn registry item — meaning you literally add it with one
command and it becomes part of YOUR codebase. No npm dependency to manage.

A few things I'm particularly proud of:
• The engine is a pure function layer — fully testable in Node without a DOM
• Zero dependencies beyond React
• Full test suite including accessibility tests with jest-axe
• It handles edge cases most inputs ignore: IME composition, chip copy/paste,
  undo across chip insertions

I'd love to hear what features you'd want to see next. Drop a comment or open
an issue on GitHub — I respond to everything.

https://prompt-area.com
https://github.com/team-gpt/prompt-area
```

**5 Key Features for PH Feature List:**

```
🎯 Trigger-Based Chips — Type @, /, or # to activate dropdowns with async search,
   then resolve into immutable pill chips

✍️ Inline Markdown — Live preview of **bold**, *italic*, and auto-linked URLs
   without any toolbar

📎 File & Image Attachments — Drag-and-drop or paste images and files with
   thumbnail previews and remove buttons

⌨️ Full Keyboard Support — Undo/redo, bold/italic shortcuts, submit on Enter,
   and complete ARIA accessibility

📦 One-Command Install — Ships as a shadcn registry component with zero extra
   dependencies. It becomes YOUR code.
```

---

## 3. Twitter/X Thread

**Tweet 1 — Hook:**
```
Every AI chat app needs a great text input.

But your options today are:
→ react-mentions (too basic)
→ Tiptap / Lexical / Plate (full document editors — overkill)

I built the missing middle ground. Here's Prompt Area 🧵
```

**Tweet 2 — What it is:**
```
Prompt Area is a rich text input for React, built as a shadcn registry component.

@mentions, /commands, #tags, inline markdown, undo/redo, file attachments —
everything you need for AI chat UIs.

Zero extra dependencies. Just React + your existing Tailwind setup.
```

**Tweet 3 — Triggers & Chips:**
```
Type any trigger character (@, /, #) and get a dropdown.

Pick an option → it becomes an immutable chip pill that can't be
accidentally edited or broken.

Works with async search, debouncing, and custom rendering.
```

**Tweet 4 — Markdown & Lists:**
```
Inline markdown that just works:

**bold** → bold
*italic* → italic
URLs → clickable links (Cmd+Click)

Type "- " or "* " to start bullet lists with Tab/Shift+Tab indentation.

No toolbar needed.
```

**Tweet 5 — Architecture:**
```
The architecture is unusually clean for a contentEditable component:

• Pure logic engine — testable without a DOM
• Segment-based model (not HTML trees)
• ~320 lines for the main component
• Full test suite including a11y tests

No ProseMirror. No Slate. No bloat.
```

**Tweet 6 — Comparison:**
```
How it stacks up:

                    Prompt Area  react-mentions  Tiptap  Lexical
@Mentions              ✅            ✅           ✅      ✅
/Commands              ✅            ❌           🔌      🔌
Inline Markdown        ✅            ❌           🔌      🔌
Auto-grow              ✅            ❌           ❌      ❌
File Attachments       ✅            ❌           🔌      🔌
Zero Extra Deps        ✅            ❌           ❌      ❌

🔌 = requires plugins
```

**Tweet 7 — Install:**
```
One command to install:

npx shadcn@latest add https://prompt-area.com/r/prompt-area.json

It copies into YOUR codebase. No npm dependency to maintain.
Full ownership of the code.

Also available: ActionBar, StatusBar, CompactPromptArea, and ChatPromptLayout.
```

**Tweet 8 — CTA:**
```
Try the live demo with 15+ interactive examples:
→ https://prompt-area.com

Star it on GitHub:
→ https://github.com/team-gpt/prompt-area

Built by @JumaAI for the AI builder community.
Feedback, issues, and PRs welcome.
```

---

## 4. LinkedIn Post

```
Building AI products? Your chat input matters more than you think.

We spent months building AI interfaces and kept hitting the same wall:
the text input component. Users need @mentions to reference context,
/commands to trigger actions, and inline markdown for formatting.
But existing solutions are either too limited or absurdly complex.

react-mentions? Only handles mentions. Tiptap, Lexical, Plate? They're
full document editors built on ProseMirror or Slate — massive overkill
for a chat prompt.

So we built Prompt Area: a production-grade rich text input designed
specifically for AI chat UIs. It supports trigger-based chips, inline
markdown, undo/redo, file attachments, IME support, and full accessibility
— with zero dependencies beyond React.

It ships as a shadcn registry component. One command to install, and the
source code becomes part of your project. No black-box dependency.

The architecture is clean: a pure logic engine handles all state
transformations, fully testable without a DOM. The component itself
is ~320 lines.

We've open-sourced everything with a comprehensive test suite.

→ Live demo: https://prompt-area.com
→ GitHub: https://github.com/team-gpt/prompt-area
→ Install: npx shadcn@latest add https://prompt-area.com/r/prompt-area.json

If you're building AI-powered products, I'd love to hear what features
matter most to you.
```

---

## 5. Reddit Posts

### r/reactjs

**Title:**
```
I built a rich text input for AI chat UIs — @mentions, /commands, #tags,
inline markdown, zero deps (shadcn registry component)
```

**Body:**
```
Hey r/reactjs,

I've been building AI chat interfaces for a while, and I kept running into the
same problem: the text input needs to support @mentions, /commands, #tags,
inline markdown, and file attachments — but the existing options are either too
basic or too heavy.

So I built **Prompt Area** — a contentEditable-based component that ships as a
shadcn registry item.

**Technical decisions I'm happy to discuss:**

- **Segment-based model** instead of an HTML/DOM tree. The document is an array
  of `{type, text}` and `{type, trigger, value, displayText}` objects. This
  makes the state predictable and serializable.

- **Pure engine architecture.** All logic (trigger detection, chip resolution,
  segment manipulation, markdown handling) lives in `prompt-area-engine.ts` —
  a pure module that's fully testable in Node without any DOM.

- **contentEditable with decoration** rather than a virtual rendering layer.
  We render chip elements directly in the DOM. This gives us free IME
  composition support and better mobile behavior.

- **Zero dependencies** beyond React. No ProseMirror, no Slate, no Yjs.
  Just contentEditable + DOM APIs + a clean data model.

**What it does:**
- Trigger-based chips (type @, /, # to activate dropdowns or callbacks)
- Immutable chip pills (can't be partially edited)
- Live inline markdown (**bold**, *italic*, auto-linked URLs)
- Auto-grow on focus, shrink on blur
- Full undo/redo with debounced snapshots
- Copy/paste with chip data preservation
- File & image attachments
- Full ARIA accessibility
- Dark mode

**Install:**
```
npx shadcn@latest add https://prompt-area.com/r/prompt-area.json
```

Live demo with 15+ examples: https://prompt-area.com
GitHub: https://github.com/team-gpt/prompt-area

Happy to answer any questions about the architecture or contentEditable edge cases.
```

### r/webdev

**Title:**
```
[Showoff Saturday] Prompt Area — a rich text input component for AI chat UIs
(React + shadcn, zero extra dependencies)
```

**Body:**
```
I built a rich text input component specifically for AI chat interfaces.
Think of it as the input component that ChatGPT/Claude/Gemini-style UIs need
but nobody has open-sourced properly.

**What it does:**
- @mentions, /commands, #tags with dropdown suggestions
- Inline markdown preview (bold, italic, auto-links)
- File & image attachments with thumbnails
- Auto-growing textarea
- Full undo/redo
- Keyboard shortcuts
- Accessibility (ARIA, keyboard navigation)
- Dark mode

**Why I built it:**
Every AI chat project I worked on needed this exact component, and I kept
rebuilding it from scratch. react-mentions only handles mentions.
Tiptap/Lexical/Plate are full document editors — way too much for a chat input.

**How it works:**
Ships as a shadcn registry component — one command to install, and it becomes
part of your codebase. No npm dependency. Zero extra packages beyond React +
Tailwind.

Live demo: https://prompt-area.com
GitHub: https://github.com/team-gpt/prompt-area

Feedback welcome!
```

### r/ChatGPT or r/LocalLLaMA

**Title:**
```
Open-source rich text input component for building ChatGPT/Claude-style UIs —
@mentions, /commands, markdown, file attachments
```

**Body:**
```
If you're building your own AI chat interface (for local LLMs, custom
assistants, or any LLM-powered app), here's an open-source component that
handles the text input properly.

**Prompt Area** gives you:
- @mentions to reference documents, users, or any context
- /commands to trigger actions (like switching models, setting system prompts)
- #tags for categorization
- Inline markdown formatting
- File & image attachments
- Auto-growing input that expands as you type

It's a React component that installs with one command:
```
npx shadcn@latest add https://prompt-area.com/r/prompt-area.json
```

Works with any React + Tailwind project. Zero extra dependencies.

Demo: https://prompt-area.com
GitHub: https://github.com/team-gpt/prompt-area

Built for anyone creating AI chat UIs — whether you're wrapping OpenAI,
Anthropic, local models via Ollama, or anything else.
```

---

## 6. Dev.to / Hashnode Article Outline

**Title Options:**
1. `Stop Using Tiptap for Your AI Chat Input — There's a Better Way`
2. `I Built the Text Input That Every AI Chat App Needs`
3. `The Missing React Component for AI Chat UIs: Prompt Area`

**Outline:**

```
## Introduction
- The text input is the most-used element in any chat UI
- Yet it's always an afterthought — a plain <textarea> or a bloated editor
- There's a gap between "too simple" and "too complex"

## The Problem with Existing Solutions
- react-mentions: only handles mentions, no commands/tags/markdown
- Tiptap: full ProseMirror editor, massive bundle, document-editing paradigm
- Lexical: Meta's framework, powerful but complex plugin system
- Plate: built on Slate, heavy, designed for Notion-style editors
- None of these were designed for prompt inputs

## Introducing Prompt Area
- A React component built specifically for AI chat UIs
- Ships as a shadcn registry component (one-command install)
- Zero extra dependencies

## Key Features (with code examples)

### Trigger-Based Chips
```tsx
const triggers = [
  mentionTrigger({ onSearch: searchUsers }),
  commandTrigger({ onSearch: searchCommands }),
  hashtagTrigger({ onResolve: resolveTag }),
]
<PromptArea triggers={triggers} />
```

### Inline Markdown
- Live preview of bold, italic, URLs
- No toolbar, no mode switching

### File Attachments
- Drag-and-drop, paste support
- Thumbnail previews

## Architecture Deep-Dive
- Segment-based document model
- Pure engine (prompt-area-engine.ts) — testable without DOM
- contentEditable with decoration layer
- Debounced undo/redo snapshots

## Installation

```bash
npx shadcn@latest add https://prompt-area.com/r/prompt-area.json
```

## Comparison Table
- Feature matrix vs 7 alternatives

## What's Next
- Invite readers to contribute
- Link to GitHub issues for planned features

## Links
- Demo: https://prompt-area.com
- GitHub: https://github.com/team-gpt/prompt-area
```

---

## 7. Discord / Slack Community One-Liners

**shadcn Discord:**
```
Just published a shadcn registry component for AI chat inputs — @mentions,
/commands, #tags, inline markdown, file attachments, undo/redo. Zero extra deps.
One command to install: npx shadcn@latest add https://prompt-area.com/r/prompt-area.json
Demo: https://prompt-area.com
```

**Vercel / Next.js Community:**
```
Built a rich text input component for AI chat UIs on Next.js + shadcn.
Handles @mentions, /commands, inline markdown, and file attachments with
zero extra dependencies. Ships as a shadcn registry component.
https://prompt-area.com
```

**AI/ML Discord Servers (e.g., Nous Research, EleutherAI, etc.):**
```
If you're building AI chat UIs — I open-sourced a rich text input component
with @mentions (reference docs/context), /commands (trigger actions),
inline markdown, and file attachments. React + shadcn, zero deps.
https://github.com/team-gpt/prompt-area
```

**General Dev Communities:**
```
Open-sourced: Prompt Area — a production-grade text input for AI chat apps.
Think ChatGPT's input box but as a reusable React component with @mentions,
/commands, markdown, and attachments. https://prompt-area.com
```

---

## 8. Launch Day Checklist

- [ ] Submit to Hacker News (Show HN) — best time: 8-9 AM ET, Tuesday-Thursday
- [ ] Launch on Product Hunt — schedule for 12:01 AM PT on a Tuesday or Wednesday
- [ ] Post Twitter/X thread — time it 30 min after HN submission
- [ ] Post to r/reactjs, r/webdev (check subreddit rules for self-promo days)
- [ ] Post LinkedIn article
- [ ] Publish Dev.to / Hashnode article
- [ ] Drop one-liners in relevant Discord/Slack communities
- [ ] Reply to recent tweets/posts asking about "React text input", "AI chat UI components"
- [ ] Cross-post GitHub link to relevant GitHub Discussions / awesome-react lists
- [ ] Email any dev newsletter curators (React Status, JavaScript Weekly, TLDR, etc.)

---

## 9. Engagement Tips

**Hacker News:**
- Reply to every comment within the first 2 hours
- Be technical and honest — HN hates marketing speak
- If someone asks "why not Tiptap?" have a thoughtful, respectful comparison ready
- Don't ask for upvotes

**Product Hunt:**
- Respond to every comment/question
- Thank hunters and upvoters
- Share behind-the-scenes details (architecture decisions, test coverage stats)
- Update the post with milestone badges if you hit top 5

**Twitter/X:**
- Quote-tweet the thread from your company account
- Reply to your own thread with a video demo if possible
- Engage with everyone who comments in the first hour
- Tag relevant accounts (@shadcn, @vercel) only if genuinely relevant

**Reddit:**
- Follow each subreddit's self-promotion rules
- Be genuinely helpful in comments — answer technical questions in depth
- Don't cross-post the same content to multiple subreddits simultaneously
