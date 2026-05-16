<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Collapsible } from 'bits-ui';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Whether the collapsible is disabled */
		disabled?: boolean;
		/** Callback when open state changes */
		onOpenChange?: (open: boolean) => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Content to display when expanded */
		body?: Snippet;
		/** Trigger content */
		children?: Snippet;
	}

	let {
		open = $bindable(false),
		disabled = false,
		onOpenChange,
		class: className,
		body,
		children
	}: Props = $props();
</script>

<Collapsible.Root
	bind:open
	{disabled}
	{onOpenChange}
	class={cn(
		`rounded-kl-box border-kl-base-300 bg-kl-base-100 w-full border`,
		className as string | undefined
	)}
>
	{#if children}
		<Collapsible.Trigger {disabled}>
			{#snippet child({ props })}
				<TriggerProvider {props}>
					{@render children()}
				</TriggerProvider>
			{/snippet}
		</Collapsible.Trigger>
	{/if}
	{#if body}
		<Collapsible.Content class="overflow-hidden">
			<div class="border-kl-base-300 text-kl-base-content border-t px-4 py-3 text-sm">
				{@render body()}
			</div>
		</Collapsible.Content>
	{/if}
</Collapsible.Root>
