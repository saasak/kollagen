<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Item> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Item
	{...rest}
	class={cn(
		`rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 flex cursor-pointer items-center px-3 py-2 text-sm transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`,
		className as string | undefined
	)}
>
	{@render children?.()}
</MenuPrimitive.Item>
