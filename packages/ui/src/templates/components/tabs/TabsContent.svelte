<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof TabsPrimitive.Content> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Content {...rest} class={cn(`pt-4`, className as string | undefined)}>
	{@render children?.()}
</TabsPrimitive.Content>
