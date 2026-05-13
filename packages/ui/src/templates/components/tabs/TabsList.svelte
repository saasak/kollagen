<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof TabsPrimitive.List> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<TabsPrimitive.List
	{...rest}
	class={cn(`border-kl-base-300 flex border-b`, className as string | undefined)}
>
	{@render children?.()}
</TabsPrimitive.List>
