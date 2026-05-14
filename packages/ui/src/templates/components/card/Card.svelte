<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { cardVariants } from './Card.variants';
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

	const classes = cardVariants();
</script>

<article class={cn(classes.root(), className as string | undefined)}>
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
		<footer class={classes.footer()}>
			{@render footer()}
		</footer>
	{/if}
</article>
