<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { toolbarVariants } from './Toolbar.variants';
	import { Toolbar as ToolbarPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		children?: Snippet;
		class?: string;
	}

	let { orientation = 'horizontal', children, class: className }: Props = $props();
</script>

<ToolbarPrimitive.Root {orientation} class={cn(toolbarVariants({ orientation }), className)}>
	{@render children?.()}
</ToolbarPrimitive.Root>
