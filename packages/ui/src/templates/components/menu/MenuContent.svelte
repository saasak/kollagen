<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Content> & {
		children?: Snippet;
	};

	let { class: className, children, sideOffset = 4, ...rest }: Props = $props();
</script>

<MenuPrimitive.Content
	{...rest}
	{sideOffset}
	class={cn(
		`rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] min-w-[8rem] border p-1 outline-none`,
		className as string | undefined
	)}
>
	{@render children?.()}
</MenuPrimitive.Content>
