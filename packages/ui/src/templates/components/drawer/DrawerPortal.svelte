<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Portal> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Portal {...rest}>
	{@render children?.()}
</DrawerPrimitive.Portal>
