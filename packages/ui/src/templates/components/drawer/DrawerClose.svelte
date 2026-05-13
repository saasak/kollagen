<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import { X } from 'lucide-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Close> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Close
	{...rest}
	class={cn(
		`rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 z-10 flex cursor-pointer items-center justify-center p-1 transition-colors duration-150`,
		className as string | undefined
	)}
>
	{#if children}
		{@render children()}
	{:else}
		<X size={16} />
	{/if}
</DrawerPrimitive.Close>
