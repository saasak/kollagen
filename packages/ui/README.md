# kollagen

Ready-to-use, themed SvelteKit components built on [bits-ui](https://bits-ui.com) primitives.

## Quick Start

```bash
# Initialize in a SvelteKit project
npx @saasak/kollagen init

# Add a component
npx @saasak/kollagen add combobox

# Update installed components
npx @saasak/kollagen update
```

## Commands

| Command                  | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `kollagen init`          | Install dependencies, copy themes, create `cn.ts`, and configure jsrepo |
| `kollagen add <name...>` | Copy one or more components into `src/lib/components/`                  |
| `kollagen update`        | Update previously added components with interactive jsrepo diffs        |

## Customizing the Theme

After running `kollagen init`, you get `src/lib/styles/kollagen.css`, additional themes in `src/lib/styles/themes/`, a `src/lib/utils/cn.ts` helper, and a local `jsrepo.config.ts`. Override any `--kl-*` token in your app CSS to tweak the theme:

```css
/* app.css — after the kollagen theme import */

:root {
	--kl-density: 1;
	--kl-density-reading: 1;
	--kl-size-field: 0.25rem;
	--kl-size-selector: 0.25rem;

	/* Typography */
	--kl-font-heading: ui-sans-serif, system-ui, sans-serif;

	/* Swap the primary color to a custom blue */
	--kl-primary: oklch(0.55 0.25 260);
	--kl-primary-content: oklch(0.98 0.01 260);

	/* Softer border radius */
	--kl-radius-field: 0.375rem;
	--kl-radius-box: 0.5rem;

	/* Subtler shadows */
	--kl-shadow-md: 0 2px 8px oklch(0 0 0 / 0.08);

	/* Border and motion personality */
	--kl-border-width: 1px;
	--kl-border-style: solid;
	--kl-motion-scale: 1;

	/* Optional page pattern */
	--kl-pattern-image: none;
}

/* Override only in dark mode */
[data-mode='dark'] {
	--kl-base-100: oklch(0.2 0.02 260);
	--kl-base-200: oklch(0.25 0.02 260);
}

/* Override only for a specific theme */
[data-theme='ocean'] {
	--kl-accent: oklch(0.7 0.18 190);
}
```

`--kl-size-field` controls inputs, buttons, and field-like heights. `--kl-size-selector` controls checkboxes, radios, switches, toggles, slider thumbs/tracks, and similar selectors. Density tokens are retained for theme metadata and future use; they do not scale Tailwind spacing.

All components use these variables through Tailwind utilities (`bg-kl-primary`, `rounded-kl-field`, etc.), so overrides apply everywhere automatically.

The included themes include calm low-motion options like `sustainable` and expressive options like `retrofuturism`, which use the same variables without changing component APIs.

## License

[MIT](LICENSE)
