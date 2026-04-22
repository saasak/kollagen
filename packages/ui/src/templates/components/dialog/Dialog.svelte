<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		preventScroll?: boolean;
		disabled?: boolean;
		onOpenChange?: (open: boolean) => void;
		trigger?: Snippet;
		footer?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		description,
		preventScroll = true,
		disabled = false,
		onOpenChange,
		trigger,
		footer,
		children,
		class: className
	}: Props = $props();
</script>

<Dialog.Root bind:open {onOpenChange}>
	{#if trigger}
		<Dialog.Trigger
			{disabled}
			class="inline-flex cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50"
		>
			{@render trigger()}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm" />
		<Dialog.Content
			{preventScroll}
			class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg fixed top-1/2 left-1/2 z-[var(--kl-z-modal)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border p-6 {className ??
				''}"
		>
			<Dialog.Close
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
			>
				<X size={16} />
			</Dialog.Close>

			{#if title}
				<Dialog.Title class="text-kl-base-content text-lg font-semibold">
					{title}
				</Dialog.Title>
			{/if}

			{#if description}
				<Dialog.Description class="text-kl-muted-content mt-1 text-sm">
					{description}
				</Dialog.Description>
			{/if}

			{#if children}
				<div class="mt-4">
					{@render children()}
				</div>
			{/if}

			{#if footer}
				<div class="mt-6 flex items-center justify-end gap-2">
					{@render footer()}
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
