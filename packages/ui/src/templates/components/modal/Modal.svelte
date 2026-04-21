<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { Drawer as VaulDrawer } from 'vaul-svelte';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Modal heading */
		title?: string;
		/** Modal description text */
		description?: string;
		/** Display mode: "responsive" auto-switches Dialog/Drawer, "drawer" always uses Drawer */
		variant?: 'responsive' | 'drawer';
		/** Breakpoint in px below which Drawer is used (only for variant="responsive") */
		breakpoint?: number;
		/** Whether the modal blocks outside interaction */
		modal?: boolean;
		/** Close on Escape key press */
		closeOnEscape?: boolean;
		/** Close when clicking outside */
		closeOnInteractOutside?: boolean;
		/** Prevent background scrolling when open */
		preventScroll?: boolean;
		/** Snap points for the drawer as fractions (0–1) or pixel strings. Ignored in dialog mode */
		snapPoints?: (number | string)[];
		/** Disable the trigger */
		disabled?: boolean;
		/** Callback when open state changes */
		onOpenChange?: (open: boolean) => void;
		/** Trigger button content */
		trigger?: Snippet;
		/** Footer content (e.g. action buttons) */
		footer?: Snippet;
		/** Modal body content */
		children?: Snippet;
		/** Additional CSS classes on the content panel */
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		description,
		variant = 'responsive',
		breakpoint = 768,
		modal = true,
		closeOnEscape = true,
		closeOnInteractOutside = true,
		preventScroll = true,
		snapPoints,
		disabled = false,
		onOpenChange,
		trigger,
		footer,
		children,
		class: className
	}: Props = $props();

	let isMobile = $state(false);
	let showDrawer = $derived(variant === 'drawer' || (variant === 'responsive' && isMobile));

	$effect(() => {
		if (variant !== 'responsive') return;
		const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
		isMobile = mql.matches;
		const handler = (e: MediaQueryListEvent) => {
			if (open && isMobile !== e.matches) {
				open = false;
			}
			isMobile = e.matches;
		};
		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	});
</script>

{#if showDrawer}
	<VaulDrawer.Root
		bind:open
		{modal}
		dismissible={closeOnInteractOutside}
		{snapPoints}
		{onOpenChange}
	>
		{#if trigger}
			<VaulDrawer.Trigger {disabled} class="inline-flex">
				{@render trigger()}
			</VaulDrawer.Trigger>
		{/if}

		<VaulDrawer.Portal>
			<VaulDrawer.Overlay
				class="fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm"
			/>
			<VaulDrawer.Content
				class="border-kl-base-300 bg-kl-base-100 shadow-kl-lg fixed inset-x-0 bottom-0 z-[var(--kl-z-modal)] max-h-[85dvh] w-full rounded-t-2xl border-x border-t {className ??
					''}"
			>
				<div class="flex justify-center pt-3 pb-1">
					<div class="bg-kl-base-300 h-1.5 w-12 rounded-full"></div>
				</div>

				<div class="overflow-y-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
					<VaulDrawer.Close
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 flex items-center justify-center p-1 transition-colors duration-150"
					>
						<X size={16} />
					</VaulDrawer.Close>

					{#if title}
						<VaulDrawer.Title class="text-kl-base-content text-lg font-semibold">
							{title}
						</VaulDrawer.Title>
					{/if}

					{#if description}
						<VaulDrawer.Description class="text-kl-muted-content mt-1 text-sm">
							{description}
						</VaulDrawer.Description>
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
				</div>
			</VaulDrawer.Content>
		</VaulDrawer.Portal>
	</VaulDrawer.Root>
{:else}
	<Dialog.Root
		bind:open
		{preventScroll}
		escapeKeydownBehavior={closeOnEscape ? 'close' : 'ignore'}
		interactOutsideBehavior={closeOnInteractOutside ? 'close' : 'ignore'}
		{onOpenChange}
	>
		{#if trigger}
			<Dialog.Trigger {disabled} class="inline-flex">
				{@render trigger()}
			</Dialog.Trigger>
		{/if}

		<Dialog.Portal>
			<Dialog.Overlay
				class="data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm"
			/>
			<Dialog.Content
				class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 fixed top-1/2 left-1/2 z-[var(--kl-z-modal)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border p-6 {className ??
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
{/if}
