<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Root> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Root {...rest}>
	{@render children?.()}
</SelectPrimitive.Root>
