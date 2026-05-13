<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DialogPrimitive.Portal> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Portal {...rest}>
	{@render children?.()}
</DialogPrimitive.Portal>
