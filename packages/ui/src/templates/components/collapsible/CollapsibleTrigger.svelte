<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof CollapsiblePrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<CollapsiblePrimitive.Trigger
	{...rest}
	class={cn(
		`text-kl-base-content hover:bg-kl-base-200 flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-4 py-3 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 [&[data-state=open]>svg]:rotate-180`,
		className as string | undefined
	)}
>
	<span>{@render children?.()}</span>
	<ChevronDown size={16} class="text-kl-muted-content shrink-0 transition-transform duration-150" />
</CollapsiblePrimitive.Trigger>
