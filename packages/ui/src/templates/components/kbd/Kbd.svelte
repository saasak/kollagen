<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<kbd
	class={cn(
		'rounded-kl-selector border-kl-base-300 bg-kl-base-200 text-kl-base-content inline-flex h-5 min-w-5 items-center justify-center border px-1.5 font-mono text-[11px] font-medium shadow-[0_1px_0_color-mix(in_oklab,var(--kl-base-content)_12%,#0000)]',
		className
	)}
>
	{@render children?.()}
</kbd>
