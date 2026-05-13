<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof TooltipPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<TooltipPrimitive.Trigger {...rest} class={cn(`inline-flex`, className as string | undefined)}>
	{@render children?.()}
</TooltipPrimitive.Trigger>
