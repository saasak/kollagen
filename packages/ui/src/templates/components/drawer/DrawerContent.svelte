<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Direction = 'left' | 'right' | 'top' | 'bottom';

	type Props = ComponentProps<typeof DrawerPrimitive.Content> & {
		direction?: Direction;
		children?: Snippet;
	};

	let { class: className, direction = 'bottom', children, ...rest }: Props = $props();

	const placementClass = $derived(
		{
			bottom:
				'fixed inset-x-0 bottom-0 flex h-full w-full max-h-[85dvh] flex-col rounded-t-kl-box border-t border-x',
			top: 'fixed inset-x-0 top-0 flex h-full w-full max-h-[85dvh] flex-col rounded-b-kl-box border-b border-x',
			left: 'fixed inset-y-0 left-0 h-full w-full max-w-sm rounded-r-kl-box border-r border-y',
			right: 'fixed inset-y-0 right-0 h-full w-full max-w-sm rounded-l-kl-box border-l border-y'
		}[direction]
	);
</script>

<DrawerPrimitive.Content
	{...rest}
	class={cn(
		`${placementClass} border-kl-base-300 bg-kl-base-100 shadow-kl-lg z-[var(--kl-z-modal)]`,
		className as string | undefined
	)}
>
	{@render children?.()}
</DrawerPrimitive.Content>
