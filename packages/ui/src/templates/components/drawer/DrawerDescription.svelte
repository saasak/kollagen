<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Description> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Description
	{...rest}
	class={cn(`text-kl-muted-content mt-1 text-sm`, className as string | undefined)}
>
	{@render children?.()}
</DrawerPrimitive.Description>
