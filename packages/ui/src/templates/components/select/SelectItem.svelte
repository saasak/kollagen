<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { Check } from 'lucide-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Item> & {
		children?: Snippet;
	};

	let { class: className, children: itemChildren, ...rest }: Props = $props();
</script>

<SelectPrimitive.Item
	{...rest}
	class={cn(
		`rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[selected]:text-kl-primary flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`,
		className as string | undefined
	)}
>
	{#snippet children({ selected })}
		<span>{@render itemChildren?.()}</span>
		{#if selected}
			<span class="text-kl-primary flex items-center">
				<Check size={14} />
			</span>
		{/if}
	{/snippet}
</SelectPrimitive.Item>
