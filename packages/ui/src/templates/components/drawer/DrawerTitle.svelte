<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Title> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Title
	{...rest}
	class={cn(`text-kl-base-content pr-8 text-lg font-semibold`, className as string | undefined)}
>
	{@render children?.()}
</DrawerPrimitive.Title>
