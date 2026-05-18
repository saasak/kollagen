<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { browser } from '$app/environment';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import { AlertDialog } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type PageState = Parameters<typeof pushState>[1];
	const alertDialogId = $props.id();

	type OverlaySnippetContext = {
		close: () => void;
		cancel: () => void;
		action: () => void;
	};

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		actionLabel?: string;
		cancelLabel?: string;
		disabled?: boolean;
		shallowRouting?: boolean;
		shallowStateKey?: string;
		onAction?: () => void;
		onCancel?: () => void;
		onOpenChange?: (open: boolean) => void;
		body?: Snippet<[OverlaySnippetContext]>;
		footer?: Snippet<[OverlaySnippetContext]>;
		children?: Snippet;
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		description,
		actionLabel = 'Continue',
		cancelLabel = 'Cancel',
		disabled = false,
		shallowRouting = true,
		shallowStateKey = `alert-dialog-${alertDialogId}`,
		onAction,
		onCancel,
		onOpenChange,
		body,
		footer,
		children,
		class: className
	}: Props = $props();

	const shallowPageState = $derived(page.state as Record<string, unknown>);
	const shallowStateOpen = $derived(Boolean(shallowPageState[shallowStateKey]));
	const shallowRuntime = {
		entryActive: false
	};

	function setOpen(nextOpen: boolean) {
		if (open === nextOpen) return;
		open = nextOpen;
		onOpenChange?.(nextOpen);
		syncShallowHistory(nextOpen);
	}

	function handleOpenChange(nextOpen: boolean) {
		open = nextOpen;
		onOpenChange?.(nextOpen);
		syncShallowHistory(nextOpen);
	}

	function handlePopState() {
		if (!shallowRouting || !browser) return;

		queueMicrotask(() => {
			const nextOpen = Boolean((page.state as Record<string, unknown>)[shallowStateKey]);
			shallowRuntime.entryActive = nextOpen;
			if (open === nextOpen) return;

			open = nextOpen;
			onOpenChange?.(nextOpen);
		});
	}

	function syncShallowHistory(nextOpen: boolean) {
		if (!shallowRouting || !browser) return;

		if (nextOpen) {
			if (shallowStateOpen || shallowRuntime.entryActive) return;
			pushState('', { ...shallowPageState, [shallowStateKey]: true } as PageState);
			shallowRuntime.entryActive = true;
			return;
		}

		if (!shallowStateOpen && !shallowRuntime.entryActive) return;
		shallowRuntime.entryActive = false;
		history.back();
	}

	function close() {
		setOpen(false);
	}

	function cancel() {
		onCancel?.();
		close();
	}

	function action() {
		onAction?.();
	}
</script>

<svelte:window onpopstate={handlePopState} />

<AlertDialog.Root bind:open onOpenChange={handleOpenChange}>
	{#if children}
		<AlertDialog.Trigger {disabled}>
			{#snippet child({ props })}
				<TriggerProvider {props}>
					{@render children()}
				</TriggerProvider>
			{/snippet}
		</AlertDialog.Trigger>
	{/if}

	<AlertDialog.Portal>
		<AlertDialog.Overlay
			class="bg-kl-neutral/50 fixed inset-0 z-[var(--kl-z-overlay)] backdrop-blur-sm"
		/>
		<AlertDialog.Content
			class={cn(
				'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg fixed top-1/2 left-1/2 z-[var(--kl-z-modal)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border p-6',
				className
			)}
		>
			<AlertDialog.Cancel
				aria-label="Close dialog"
				onclick={cancel}
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
			{#if body}
				<div class="text-kl-base-content mt-4 text-sm">
					{@render body({ close, cancel, action })}
				</div>
			{/if}
			<div class="mt-6 flex items-center justify-end gap-2">
				{#if footer}
					{@render footer({ close, cancel, action })}
				{:else}
					<AlertDialog.Cancel
						onclick={cancel}
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-md cursor-pointer border px-3 text-sm font-medium transition-colors duration-150"
					>
						{cancelLabel}
					</AlertDialog.Cancel>
					<AlertDialog.Action
						onclick={action}
						class="rounded-kl-field bg-kl-error text-kl-error-content h-kl-field-md cursor-pointer border border-transparent px-3 text-sm font-medium transition-colors duration-150 hover:brightness-95"
					>
						{actionLabel}
					</AlertDialog.Action>
				{/if}
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
