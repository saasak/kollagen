<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Overlay> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Overlay
	{...rest}
	class={cn(
		`fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm`,
		className as string | undefined
	)}
>
	{@render children?.()}
</DrawerPrimitive.Overlay>
