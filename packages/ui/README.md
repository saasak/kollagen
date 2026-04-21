# kollagen

Ready-to-use, themed SvelteKit components built on [Ark UI](https://ark-ui.com) / [Zag.js](https://zagjs.com).

## Quick Start

```bash
# Initialize in a SvelteKit project
npx @saasak/kollagen init

# Add a component
npx @saasak/kollagen add combobox
```

## Commands

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `kollagen init`       | Install dependencies and set up theming in your SvelteKit project |
| `kollagen add <name>` | Copy a component into `src/lib/components/<name>`                 |

## Customizing the Theme

After running `kollagen init`, you get a full set of `--kl-*` CSS variables (OKLCH colors, radii, shadows, transitions). Override any of them in your `app.css` to tweak the theme:

```css
/* app.css — after the kollagen theme import */

:root {
	/* Swap the primary color to a custom blue */
	--kl-primary: oklch(0.55 0.25 260);
	--kl-primary-content: oklch(0.98 0.01 260);

	/* Softer border radius */
	--kl-radius-field: 0.375rem;
	--kl-radius-box: 0.5rem;

	/* Subtler shadows */
	--kl-shadow-md: 0 2px 8px oklch(0 0 0 / 0.08);
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

All components use these variables through Tailwind utilities (`bg-kl-primary`, `rounded-kl-field`, etc.), so overrides apply everywhere automatically.

## License

[MIT](LICENSE)
