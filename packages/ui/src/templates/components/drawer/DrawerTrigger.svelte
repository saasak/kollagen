<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Trigger
	{...rest}
	class={cn(
		`inline-flex cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50`,
		className as string | undefined
	)}
>
	{@render children?.()}
</DrawerPrimitive.Trigger>
