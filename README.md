# Kollagen

An opinionated, ready-to-use UI component library for SvelteKit built on [bits-ui](https://bits-ui.com/) primitives.

## Philosophy

ShadCN gives you primitives — you still have to compose 7+ sub-components every time you need a ComboBox. Kollagen wraps those primitives into **single, ready-to-use components** with clean interfaces, while keeping the source in your project so you own it completely.

Think of it as ShadCN + DaisyUI: copy-paste ownership with batteries included.

```svelte
<!-- ShadCN way: 7 primitives to compose yourself -->
<Combobox.Root>
	<Combobox.Control>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox.Control>
	<Combobox.Content>...</Combobox.Content>
</Combobox.Root>

<!-- Kollagen way: one component, done -->
<ComboBox {items} bind:value placeholder="Pick a fruit" />
```

## How it works

Components are distributed via [jsrepo](https://jsrepo.dev) and copied into your project — you own the source.

```bash
# Setup Kollagen in your SvelteKit project (installs deps, base theme, CSS variables)
npx @saasak/kollagen init

# Add components (auto-resolves per-component npm deps)
npx @saasak/kollagen add combobox

# Update previously added components with interactive diffs
npx @saasak/kollagen update
```

Components land in `src/lib/components/` and can be modified freely.

## Theming

DaisyUI-inspired theming system built on CSS variables:

- **Base tokens**: radius, colors, shadows — all configurable via CSS variables
- **Multiple themes**: applied via `data-theme` attribute on the HTML element
- **Styled by default**: every component ships with a polished default look
- **Full control**: tweak global CSS variables for broad changes, or edit the component source directly for deeper customization

```html
<!-- Switch theme -->
<html data-theme="nord"></html>

<!-- Toggle dark mode -->
<html data-theme="nord" data-mode="dark"></html>
```

## Component design

- **40 components + 1 block** — priority on user-input components (ComboBox, Select, DatePicker, etc.)
- **Heterogeneous primitives** — bits-ui for most components, vaul-svelte (Drawer), svelte-sonner (Toast), embla-carousel-svelte (Carousel), paneforge (Splitter), plus custom implementations for niche components
- **Async-ready** — components like ComboBox support async data fetching out of the box
- **Form-ready** — `name` prop forwarded to the native input for proper form submission
- **Controlled & uncontrolled** — supports both `bind:value` and `onValueChange` callbacks
- **Accessible** — inherits bits-ui's WAI-ARIA compliance; custom components include ARIA attributes
- **Slots where it makes sense** — some components expose Svelte 5 snippets for custom rendering

## Project structure

pnpm monorepo:

- **`packages/ui`** — jsrepo registry + init/add/update CLI (published to npm as `@saasak/kollagen`)
- **`packages/docs`** — SvelteKit docs site importing components directly from ui source
- **`jsrepo.config.ts`** — registry configuration (at monorepo root)
- **`registry.json`** — generated component manifest (committed, auto-rebuilt by CI)

## Development

```bash
# Install dependencies
pnpm install

# Build everything
pnpm build

# Run docs dev server
pnpm dev       # or pnpm dev:docs

# Build CLI only
pnpm build:ui

# Lint & format
pnpm code:lint
pnpm code:fix

# Docker (docs site)
pnpm docker:build
pnpm docker:run
```

## Stack

- **SvelteKit** (Svelte 5)
- **bits-ui** — headless primitives & accessibility
- **vaul-svelte, svelte-sonner, embla-carousel-svelte, paneforge** — specialized component libraries
- **Tailwind 4** — styling
- **Vite 8** — build
- **Mise** — runtime version management (node, pnpm)

## Testing

Visual regression testing to ensure components render correctly across themes and states.
