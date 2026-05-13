<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Group> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Group {...rest}>
	{@render children?.()}
</SelectPrimitive.Group>
