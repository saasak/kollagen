<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof TabsPrimitive.Root> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Root {...rest} class={cn(`w-full`, className as string | undefined)}>
	{@render children?.()}
</TabsPrimitive.Root>
