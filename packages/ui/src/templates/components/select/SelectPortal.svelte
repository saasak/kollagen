<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Portal> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Portal {...rest}>
	{@render children?.()}
</SelectPrimitive.Portal>
