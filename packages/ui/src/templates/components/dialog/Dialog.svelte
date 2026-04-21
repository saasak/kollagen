<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Dialog heading */
		title?: string;
		/** Dialog description text */
		description?: string;
		/** Close on Escape key press */
		closeOnEscape?: boolean;
		/** Close when clicking outside */
		closeOnInteractOutside?: boolean;
		/** Prevent background scrolling when open */
		preventScroll?: boolean;
		/** Disable the dialog trigger */
		disabled?: boolean;
		/** Callback when open state changes */
		onOpenChange?: (open: boolean) => void;
		/** Trigger button content */
		trigger?: Snippet;
		/** Footer content (e.g. action buttons) */
		footer?: Snippet;
		/** Dialog body content */
		children?: Snippet;
		/** Additional CSS classes on the content panel */
		class?: string;
	}

	let {
		open = $bindable(),
		title,
		description,
		closeOnEscape = true,
		closeOnInteractOutside = true,
		preventScroll = true,
		disabled = false,
		onOpenChange,
		trigger,
		footer,
		children,
		class: className
	}: Props = $props();
</script>

<Dialog.Root bind:open {preventScroll} {onOpenChange}>
	{#if trigger}
		<Dialog.Trigger {disabled}>
			{#snippet child({ props })}
				<span {...props} class="inline-flex">
					{@render trigger()}
				</span>
			{/snippet}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm"
		/>
		<Dialog.Content
			escapeKeydownBehavior={closeOnEscape ? 'close' : 'ignore'}
			interactOutsideBehavior={closeOnInteractOutside ? 'close' : 'ignore'}
			class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 fixed relative top-1/2 left-1/2 z-[var(--kl-z-modal)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border p-6 {className ??
				''}"
		>
			<Dialog.Close
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 flex items-center justify-center p-1 transition-colors duration-150"
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
