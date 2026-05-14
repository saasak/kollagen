<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Toolbar as ToolbarPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		children?: Snippet;
		class?: string;
	}

	let { orientation = 'horizontal', children, class: className }: Props = $props();
</script>

<ToolbarPrimitive.Root
	{orientation}
	class={cn(
		'rounded-kl-field border-kl-base-300 bg-kl-base-100 inline-flex items-center gap-1 border p-1',
		orientation === 'vertical' && 'flex-col',
		className
	)}
>
	{@render children?.()}
</ToolbarPrimitive.Root>
