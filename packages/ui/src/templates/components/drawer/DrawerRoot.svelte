<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Root> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Root {...rest}>
	{@render children?.()}
</DrawerPrimitive.Root>
