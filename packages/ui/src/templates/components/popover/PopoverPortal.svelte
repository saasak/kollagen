<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof PopoverPrimitive.Portal> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<PopoverPrimitive.Portal {...rest}>
	{@render children?.()}
</PopoverPrimitive.Portal>
