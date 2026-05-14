<script module lang="ts">
	export type BadgeColor = import('./Badge.variants').BadgeColor;
	export type BadgeVariant = import('./Badge.variants').BadgeVariant;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { badgeVariants } from './Badge.variants';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: BadgeVariant;
		color?: BadgeColor;
		children?: Snippet;
		class?: string;
	}

	let { variant = 'solid', color = 'base', children, class: className }: Props = $props();

	let rootClass = $derived(badgeVariants({ variant, color }));
</script>

<span class={cn(rootClass, className)}>
	{@render children?.()}
</span>
