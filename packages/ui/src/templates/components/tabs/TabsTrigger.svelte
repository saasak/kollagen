<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof TabsPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Trigger
	{...rest}
	class={cn(
		`text-kl-muted-content hover:text-kl-base-content data-[state=active]:text-kl-primary data-[state=active]:after:bg-kl-primary relative cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:opacity-0 after:transition-all after:duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[state=active]:after:opacity-100`,
		className as string | undefined
	)}
>
	{@render children?.()}
</TabsPrimitive.Trigger>
