<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof PopoverPrimitive.Close> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<PopoverPrimitive.Close
	{...rest}
	class={cn(
		`rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex shrink-0 cursor-pointer items-center justify-center p-1 transition-colors duration-150`,
		className as string | undefined
	)}
>
	{#if children}
		{@render children()}
	{:else}
		<X size={14} />
	{/if}
</PopoverPrimitive.Close>
