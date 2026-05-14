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
		`bg-kl-neutral/50 fixed inset-0 z-[var(--kl-z-overlay)] backdrop-blur-sm`,
		className as string | undefined
	)}
>
	{@render children?.()}
</DrawerPrimitive.Overlay>
