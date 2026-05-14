<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { selectVariants } from './Select.variants';
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Content> & {
		children?: Snippet;
	};

	let {
		class: className,
		children,
		side = 'bottom',
		align = 'start',
		sideOffset = 4,
		...rest
	}: Props = $props();

	const classes = selectVariants();
</script>

<SelectPrimitive.Content
	{...rest}
	{side}
	{align}
	{sideOffset}
	class={cn(classes.content(), className as string | undefined)}
>
	{@render children?.()}
</SelectPrimitive.Content>
