<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Trigger
	{...rest}
	class={cn(
		`inline-flex cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50`,
		className as string | undefined
	)}
>
	{@render children?.()}
</MenuPrimitive.Trigger>
