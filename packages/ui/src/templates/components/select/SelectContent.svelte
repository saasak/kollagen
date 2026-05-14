<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Content> & {
		children?: Snippet;
	};

	let {
		class: className,
		children,
		side = 'bottom',
		align = 'start',
		sideOffset = 4,
		...rest
	}: Props = $props();

	const contentClass =
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] max-h-60 w-[var(--bits-floating-anchor-width)] overflow-y-auto border p-1 [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)]';
</script>

<SelectPrimitive.Content
	{...rest}
	{side}
	{align}
	{sideOffset}
	class={cn(contentClass, className as string | undefined)}
>
	{@render children?.()}
</SelectPrimitive.Content>
