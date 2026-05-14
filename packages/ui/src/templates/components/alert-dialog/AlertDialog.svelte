<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AlertDialog } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		actionLabel?: string;
		cancelLabel?: string;
		disabled?: boolean;
		onAction?: () => void;
		onCancel?: () => void;
		onOpenChange?: (open: boolean) => void;
		trigger?: Snippet;
		children?: Snippet;
		footer?: Snippet;
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		description,
		actionLabel = 'Continue',
		cancelLabel = 'Cancel',
		disabled = false,
		onAction,
		onCancel,
		onOpenChange,
		trigger,
		children,
		footer,
		class: className
	}: Props = $props();
</script>

<AlertDialog.Root bind:open {onOpenChange}>
	{#if trigger}
		<AlertDialog.Trigger
			{disabled}
			class="inline-flex cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50"
		>
			{@render trigger()}
		</AlertDialog.Trigger>
	{/if}

	<AlertDialog.Portal>
		<AlertDialog.Overlay
			class="fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm"
		/>
		<AlertDialog.Content
			class={cn(
				'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg fixed top-1/2 left-1/2 z-[var(--kl-z-modal)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border p-6',
				className
			)}
		>
			<AlertDialog.Cancel
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
			>
				<X size={16} />
			</AlertDialog.Cancel>

			{#if title}
				<AlertDialog.Title class="text-kl-base-content text-lg font-semibold"
					>{title}</AlertDialog.Title
				>
			{/if}
			{#if description}
				<AlertDialog.Description class="text-kl-muted-content mt-1 text-sm">
					{description}
				</AlertDialog.Description>
			{/if}
			{#if children}
				<div class="text-kl-base-content mt-4 text-sm">
					{@render children()}
				</div>
			{/if}
			<div class="mt-6 flex items-center justify-end gap-2">
				{#if footer}
					{@render footer()}
				{:else}
					<AlertDialog.Cancel
						onclick={onCancel}
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-md cursor-pointer border px-3 text-sm font-medium transition-colors duration-150"
					>
						{cancelLabel}
					</AlertDialog.Cancel>
					<AlertDialog.Action
						onclick={onAction}
						class="rounded-kl-field bg-kl-error text-kl-error-content h-kl-field-md cursor-pointer border border-transparent px-3 text-sm font-medium transition-colors duration-150 hover:brightness-95"
					>
						{actionLabel}
					</AlertDialog.Action>
				{/if}
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
