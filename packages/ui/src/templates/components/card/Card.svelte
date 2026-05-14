<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	const cardClass =
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 text-kl-base-content overflow-hidden border [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] [box-shadow:0_1px_2px_0_color-mix(in_oklab,#000_calc(var(--kl-depth)*8%),#0000),0_1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset]';
	const footerClass =
		'border-kl-base-300 bg-kl-base-300 border-t px-4 py-3 [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-base-content)_calc(var(--kl-depth)*6%),#0000)_inset]';
</script>

<article class={cn(cardClass, className as string | undefined)}>
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
		<footer class={footerClass}>
			{@render footer()}
		</footer>
	{/if}
</article>
