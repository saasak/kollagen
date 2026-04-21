<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** The trigger label text */
		label: string;
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Whether the collapsible is disabled */
		disabled?: boolean;
		/** Callback when open state changes */
		onOpenChange?: (open: boolean) => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Trigger snippet for custom trigger content */
		trigger?: Snippet;
		/** Content to display when expanded */
		children: Snippet;
	}

	let {
		label,
		open = $bindable(false),
		disabled = false,
		onOpenChange,
		class: className,
		trigger,
		children
	}: Props = $props();
</script>

<Collapsible.Root
	bind:open
	{disabled}
	{onOpenChange}
	class="rounded-kl-box border-kl-base-300 bg-kl-base-100 w-full border {className ?? ''}"
>
	<Collapsible.Trigger
		class="text-kl-base-content hover:bg-kl-base-200 flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-4 py-3 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
	>
		{#if trigger}
			{@render trigger()}
		{:else}
			<span>{label}</span>
		{/if}
		<ChevronDown
			size={16}
			class="text-kl-muted-content transition-transform duration-150 {open ? 'rotate-180' : ''}"
		/>
	</Collapsible.Trigger>
	<Collapsible.Content class="overflow-hidden">
		<div class="border-kl-base-300 text-kl-base-content border-t px-4 py-3 text-sm">
			{@render children()}
		</div>
	</Collapsible.Content>
</Collapsible.Root>
