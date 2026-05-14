<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { drawerContentVariants, type DrawerDirection } from './DrawerContent.variants';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Content> & {
		direction?: DrawerDirection;
		children?: Snippet;
	};

	let { class: className, direction = 'bottom', children, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Content
	{...rest}
	class={cn(drawerContentVariants({ direction }), className as string | undefined)}
>
	{@render children?.()}
</DrawerPrimitive.Content>
