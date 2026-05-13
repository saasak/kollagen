<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof PopoverPrimitive.Content> & {
		children?: Snippet;
	};

	let {
		class: className,
		children,
		side = 'bottom',
		sideOffset = 8,
		align = 'center',
		...rest
	}: Props = $props();
</script>

<PopoverPrimitive.Content
	{...rest}
	{side}
	{sideOffset}
	{align}
	class={cn(
		`rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg z-[var(--kl-z-popover)] w-72 border p-4`,
		className as string | undefined
	)}
>
	{@render children?.()}
</PopoverPrimitive.Content>
