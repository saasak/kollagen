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
# Setup Kollagen in your SvelteKit project (installs deps, theme CSS, cn helper)
npx @saasak/kollagen init

# Add components (auto-resolves per-component npm deps)
npx @saasak/kollagen add combobox

# Update previously added components with interactive diffs
npx @saasak/kollagen update
```

Components land in `src/lib/components/` and can be modified freely. The init command also creates `src/lib/utils/cn.ts` so component `class` props can override default Tailwind utilities through `tailwind-merge`.

## Theming

DaisyUI-inspired theming system built on CSS variables:

- **Base tokens**: field size, selector size, density, radius, colors, shadows — all configurable via CSS variables
- **Multiple themes**: applied via `data-theme` attribute on the HTML element
- **Typography tokens**: app-wide body, heading, display, and monospace font stacks
- **Styled by default**: every component ships with a polished default look
- **Full control**: tweak global CSS variables for broad changes, or edit the component source directly for deeper customization

```css
:root {
	--kl-density: 1;
	--kl-density-reading: 1;

	/* DaisyUI-style component sizing */
	--kl-size-field: 0.25rem;
	--kl-size-selector: 0.25rem;

	/* Typography */
	--kl-font-body: 'Geist', ui-sans-serif, system-ui, sans-serif;
	--kl-font-heading: var(--kl-font-body);
	--kl-font-display: var(--kl-font-heading);
	--kl-font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, monospace;
}
```

`--kl-size-field` controls inputs, buttons, and field-like heights. `--kl-size-selector` controls checkboxes, radios, switches, toggles, slider thumbs/tracks, and similar selectors. Density tokens are retained for theme metadata and future use; they do not scale global Tailwind spacing.

### Typography and fonts

Kollagen's font API is the `--kl-font-*` token set. Components read these variables through Tailwind theme mappings (`font-kl-body`, `font-kl-heading`, `font-kl-display`, `font-kl-mono`) and global base styles.

Themes are intentionally color/effect-first and generally do not prescribe fonts. The base theme uses system fonts, while a few expressive themes may override heading/display tokens when the theme concept needs it. For product apps, prefer setting fonts at the app level so the same font preset can work with any color theme.

Load the font first, then set the tokens:

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap');

:root {
	--kl-font-body: 'Geist', ui-sans-serif, system-ui, sans-serif;
	--kl-font-heading: var(--kl-font-body);
	--kl-font-display: var(--kl-font-heading);
	--kl-font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, monospace;
}
```

If you want runtime font switching, add a small preset layer in your app and map an attribute to the same tokens:

```css
:root[data-font='geist'] {
	--kl-font-body: 'Geist', ui-sans-serif, system-ui, sans-serif;
	--kl-font-heading: 'Geist', ui-sans-serif, system-ui, sans-serif;
	--kl-font-display: 'Geist', ui-sans-serif, system-ui, sans-serif;
	--kl-font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, monospace;
}
```

Recommended practice:

- Keep color themes and font presets separate.
- Do not hard-code `font-family` inside individual components unless that component is intentionally special.
- Use `--kl-font-body` for app text and controls, `--kl-font-heading` for headings, `--kl-font-display` for large editorial type, and `--kl-font-mono` for code/numeric surfaces.
- Self-host fonts for production if privacy, availability, or performance matters; Google Fonts and Fontshare are fine for previews and internal tools.

```html
<!-- Switch theme -->
<html data-theme="nord"></html>

<!-- Toggle dark mode -->
<html data-theme="nord" data-mode="dark"></html>
```

## Component design

- **79 components + 2 blocks** — priority on ready-to-use UI patterns and user-input components (ActionSheet, ComboBox, Select, DatePicker, DataTable, etc.)
- **Heterogeneous primitives** — bits-ui for most components, vaul-svelte (Drawer), svelte-sonner (Toast), embla-carousel-svelte (Carousel), paneforge (Splitter), plus custom implementations for niche components
- **Async-ready** — components like ComboBox support async data fetching out of the box
- **Form-ready** — `name` prop forwarded to the native input for proper form submission
- **Controlled & uncontrolled** — supports both `bind:value` and `onValueChange` callbacks
- **Accessible** — inherits bits-ui's WAI-ARIA compliance; custom components include ARIA attributes
- **Slots where it makes sense** — some components expose Svelte 5 snippets for custom rendering

### DataTable state and URLs

DataTable is controlled: your page owns the query, rows, and total count. The table emits a full query whenever search, filters, sort, page, or page size changes.

For URL-backed tables, parse the URL before loading rows with `createDataTableQueryFromUrl`. Share the same config between `+page.server.ts` or `+page.ts`, the page component, and `<DataTable urlState={...}>`. Use a `prefix` when several tables live on the same page.

```ts
import { createDataTableQueryFromUrl } from '$lib/components/data-table/url-state';
import { tableState } from './table-state';

export const load = async ({ url }) => {
	const query = createDataTableQueryFromUrl(url, tableState);
	const { rows, total } = await getCustomers(query);

	return { query, rows, total };
};
```

The first render should already use rows matching the parsed query. DataTable does not emit a mount-time correction for URL state, so you avoid a duplicate initial fetch.

## Project structure

pnpm monorepo:

- **`packages/ui`** — jsrepo registry + init/add/update CLI (published to npm as `@saasak/kollagen`)
- **`packages/docs`** — SvelteKit docs site importing components directly from ui source
- **`jsrepo.config.ts`** — registry configuration (at monorepo root)
- **`registry.json`** — generated component manifest (committed, auto-rebuilt by CI)

The docs app imports raw source from `packages/ui` via `$ui`, `$blocks`, and `$theme` aliases, so component changes are visible in the docs without publishing a package.

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
