<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof PopoverPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<PopoverPrimitive.Trigger
	{...rest}
	class={cn(`inline-flex cursor-pointer items-center`, className as string | undefined)}
>
	{@render children?.()}
</PopoverPrimitive.Trigger>
