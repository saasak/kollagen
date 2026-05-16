<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof CollapsiblePrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<CollapsiblePrimitive.Trigger {...rest} class={cn(className as string | undefined)}>
	{@render children?.()}
</CollapsiblePrimitive.Trigger>
