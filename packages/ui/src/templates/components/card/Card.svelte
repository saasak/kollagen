<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Card title displayed in the header */
		title?: string;
		/** Supporting text displayed below the title */
		description?: string;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Main card content */
		children?: Snippet;
		/** Footer content displayed below the main content */
		footer?: Snippet;
	}

	let { title, description, class: className, children, footer }: Props = $props();
</script>

<article
	class="rounded-kl-box border-kl-base-300 text-kl-base-content shadow-kl-sm overflow-hidden border bg-[var(--kl-surface-background)] {className ??
		''}"
>
	{#if title || description}
		<header class="border-kl-base-300 border-b px-4 py-3">
			{#if title}
				<h3 class="text-kl-base-content font-kl-heading text-base font-semibold">{title}</h3>
			{/if}
			{#if description}
				<p class="text-kl-muted-content mt-1 text-sm">{description}</p>
			{/if}
		</header>
	{/if}

	{#if children}
		<div class="p-4">
			{@render children()}
		</div>
	{/if}

	{#if footer}
		<footer class="border-kl-base-300 bg-kl-base-200 border-t px-4 py-3">
			{@render footer()}
		</footer>
	{/if}
</article>
