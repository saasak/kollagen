<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { browser } from '$app/environment';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import { Dialog } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type PageState = Parameters<typeof pushState>[1];
	const dialogId = $props.id();

	type OverlaySnippetContext = {
		close: () => void;
	};

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		preventScroll?: boolean;
		closeOnInteractOutside?: boolean;
		shallowRouting?: boolean;
		shallowStateKey?: string;
		disabled?: boolean;
		onOpenChange?: (open: boolean) => void;
		footer?: Snippet<[OverlaySnippetContext]>;
		body?: Snippet<[OverlaySnippetContext]>;
		children?: Snippet;
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		description,
		preventScroll = true,
		closeOnInteractOutside = true,
		shallowRouting = true,
		shallowStateKey = `dialog-${dialogId}`,
		disabled = false,
		onOpenChange,
		footer,
		body,
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
</script>

<svelte:window onpopstate={handlePopState} />

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	{#if children}
		<Dialog.Trigger {disabled}>
			{#snippet child({ props })}
				<TriggerProvider {props}>
					{@render children()}
				</TriggerProvider>
			{/snippet}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal>
		<Dialog.Overlay
			class="bg-kl-neutral/50 fixed inset-0 z-[var(--kl-z-overlay)] backdrop-blur-sm"
		/>
		<Dialog.Content
			{preventScroll}
			interactOutsideBehavior={closeOnInteractOutside ? 'close' : 'ignore'}
			class={cn(
				`rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg fixed top-1/2 left-1/2 z-[var(--kl-z-modal)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border p-6`,
				className as string | undefined
			)}
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

			{#if body}
				<div class="mt-4">
					{@render body({ close })}
				</div>
			{/if}

			{#if footer}
				<div class="mt-6 flex items-center justify-end gap-2">
					{@render footer({ close })}
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
