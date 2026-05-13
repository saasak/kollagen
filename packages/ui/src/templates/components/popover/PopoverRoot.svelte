<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof PopoverPrimitive.Root> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<PopoverPrimitive.Root {...rest}>
	{@render children?.()}
</PopoverPrimitive.Root>
