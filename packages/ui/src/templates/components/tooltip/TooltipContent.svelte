<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof TooltipPrimitive.Content> & {
		children?: Snippet;
	};

	let { class: className, children, side = 'top', sideOffset = 6, ...rest }: Props = $props();
</script>

<TooltipPrimitive.Content
	{...rest}
	{side}
	{sideOffset}
	class={cn(
		`rounded-kl-box bg-kl-base-content text-kl-base-100 shadow-kl-sm z-[var(--kl-z-tooltip)] max-w-[min(16rem,calc(100vw-2rem))] px-3 py-1.5 text-left text-xs leading-snug break-words whitespace-normal`,
		className as string | undefined
	)}
>
	{@render children?.()}
</TooltipPrimitive.Content>
