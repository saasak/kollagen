<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Viewport> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Viewport {...rest}>
	{@render children?.()}
</SelectPrimitive.Viewport>
