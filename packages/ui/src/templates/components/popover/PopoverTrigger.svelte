<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof PopoverPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<PopoverPrimitive.Trigger {...rest} class={className as string | undefined}>
	{@render children?.()}
</PopoverPrimitive.Trigger>
