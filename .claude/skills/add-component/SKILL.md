---
name: add-component
description: Add a new Kollagen component (bits-ui wrapper + docs page + nav entry)
user-invocable: true
allowed-tools: Read, Edit, Write, Glob, Grep, Bash(pnpm:*), Bash(npx:*), Bash(mise:*), Agent, Skill(svelte-autofixer:*)
---

# Add Kollagen Component

You are adding a new component to the Kollagen UI library. Follow every phase in order. Do NOT skip any phase or present the result until ALL validation checks pass.

## Phase 1 — Input & Research

1. Parse `$ARGUMENTS` as the component name (e.g., `accordion`). Derive `<PascalName>` from it (e.g., `Accordion`).
2. Use the Svelte MCP `list-sections` tool to find all relevant bits-ui / SvelteKit documentation sections.
3. Use `get-documentation` to fetch the bits-ui docs for this component. Identify:
   - The bits-ui import path (e.g., `bits-ui`)
   - Available sub-components (e.g., `Accordion.Root`, `Accordion.Item`, etc.)
   - Props, events, and slots
4. Read the existing ComboBox as reference pattern:
   - `packages/ui/src/templates/components/combobox/ComboBox.svelte`
   - `packages/ui/src/templates/components/combobox/index.ts`
5. Read the ComboBox docs page for docs pattern:
   - `packages/docs/src/routes/components/combobox/+page.svelte`
6. Read `packages/docs/src/lib/nav.ts` for the nav structure.

## Phase 2 — Component Template (packages/ui)

Create these files:

- `packages/ui/src/templates/components/<name>/<PascalName>.svelte`
- `packages/ui/src/templates/components/<name>/index.ts`

### Component Rules (MANDATORY)

Follow the ComboBox pattern exactly. Every rule below is non-negotiable:

- Wrap bits-ui primitives into a **single ready-to-use component** with a clean props interface
- `<script lang="ts">` with a typed `Props` interface (use generics only if items are involved)
- Both controlled (`bind:value` via `$bindable()`) and uncontrolled (`defaultValue`) APIs
- Forward `name` prop for native form submission (bits-ui renders hidden input automatically)
- `disabled` and `class` props always present
- Event callbacks: `onValueChange` and any component-specific events
- Async support where applicable (with `onSearch`, `debounceMs` pattern from ComboBox)
- A11y delegated entirely to bits-ui — **no manual ARIA attributes**
- Icons from `lucide-svelte`
- **Tailwind classes only** — use `km-*` tokens exclusively:
  - Surfaces: `bg-kl-base-100`, `bg-kl-base-200`
  - Text: `text-kl-base-content`, `text-kl-muted-content`
  - Borders: `border-kl-base-300`
  - Focus: `focus-within:border-kl-primary`
  - Hover: `hover:bg-kl-muted`
  - Active/selected: `text-kl-primary`, `bg-kl-primary text-kl-primary-content`
  - Radius: `rounded-kl-selector` (checkboxes/toggles/badges), `rounded-kl-field` (inputs/buttons/tabs), `rounded-kl-box` (cards/dropdowns/modals)
  - Shadows: `shadow-kl-sm`, `shadow-kl-md`, `shadow-kl-lg`
  - Z-index: `z-[var(--kl-z-dropdown)]` etc.
  - Transitions: use `duration-150` inline
- Use `Portal` for floating content — bits-ui Content components handle positioning via `side`/`sideOffset`/`align` props
- **No `:global()` CSS blocks**
- **No `<!-- svelte-ignore -->` comments** — fix the root cause instead

### index.ts

Re-export the component as both default and named export:

```ts
export { default as <PascalName> } from './<PascalName>.svelte';
```

## Phase 3 — Validate Component

1. Run `svelte-autofixer` MCP tool on the created `.svelte` file. **Iterate until zero issues.**
2. Run `pnpm build:ui` — must pass with **zero errors AND zero warnings** from the new component files.
3. If either check fails: fix the issues and re-run. Loop until clean.

## Phase 4 — Docs Page (packages/docs)

### Create docs page

Create `packages/docs/src/routes/components/<name>/+page.svelte`

Follow the ComboBox docs page pattern exactly:

1. Import component from `$ui/<name>`
2. Import `DemoCard` from `$lib/components/DemoCard.svelte`
3. Import `PropsTable` from `$lib/components/PropsTable.svelte`
4. Header: `<h1>` with PascalName + description paragraph
5. **Examples section**: minimum 4 `<DemoCard>` demos, each with:
   - `title`, `description`, `code` prop with the Svelte source snippet
   - Live interactive demo inside the children snippet
   - Demos must cover: basic usage, key variants, disabled state, form integration (if `name` prop exists)
6. **Props section**: `<PropsTable>` with ALL props from the component's interface
   - Every prop listed with accurate `name`, `type`, `default`, `description`

### Add nav entry

Add to `packages/docs/src/lib/nav.ts` in the `componentNav` array:

```ts
{ label: "<PascalName>", href: "/components/<name>" }
```

Keep alphabetical order if the existing entries are alphabetical.

## Phase 5 — Validate Everything

ALL of these checks MUST pass. If ANY fails, fix and re-run:

1. `pnpm build:ui` — zero errors, zero warnings from new component
2. `pnpm build:docs` — zero errors, zero warnings from new docs page
3. Verify the new route appears in the build output
4. Run `svelte-autofixer` on the docs page `.svelte` file — zero issues
5. Verify nav entry in `nav.ts` links to the correct route (`/components/<name>`)
6. Verify props table has **every** prop from the component's `Props` interface (count must match)

**Do NOT present the result until all 6 checks pass.**

## Phase 6 — Summary

Report:

- Component path: `packages/ui/src/templates/components/<name>/<PascalName>.svelte`
- Docs route: `/components/<name>`
- Number of demos created
- Number of props documented
