<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof TooltipPrimitive.Provider> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<TooltipPrimitive.Provider {...rest}>
	{@render children?.()}
</TooltipPrimitive.Provider>
