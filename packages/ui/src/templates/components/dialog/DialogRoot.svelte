<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DialogPrimitive.Root> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Root {...rest}>
	{@render children?.()}
</DialogPrimitive.Root>
