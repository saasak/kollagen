<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof TooltipPrimitive.Root> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<TooltipPrimitive.Root {...rest}>
	{@render children?.()}
</TooltipPrimitive.Root>
