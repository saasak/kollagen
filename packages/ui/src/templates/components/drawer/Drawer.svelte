<script lang="ts">
	import { Drawer as VaulDrawer } from 'vaul-svelte';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type Direction = 'left' | 'right' | 'top' | 'bottom';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Drawer heading */
		title?: string;
		/** Drawer description text */
		description?: string;
		/** Side the drawer slides in from */
		direction?: Direction;
		/** Snap points as fractions (0–1) or pixel strings */
		snapPoints?: (number | string)[];
		/** Whether the drawer blocks outside interaction */
		modal?: boolean;
		/** Close when clicking outside */
		closeOnInteractOutside?: boolean;
		/** Disable the trigger */
		disabled?: boolean;
		/** Callback when open state changes */
		onOpenChange?: (open: boolean) => void;
		/** Trigger button content */
		trigger?: Snippet;
		/** Footer content (e.g. action buttons) */
		footer?: Snippet;
		/** Drawer body content */
		children?: Snippet;
		/** Additional CSS classes on the content panel */
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		description,
		direction = 'bottom',
		snapPoints,
		modal = true,
		closeOnInteractOutside = true,
		disabled = false,
		onOpenChange,
		trigger,
		footer,
		children,
		class: className
	}: Props = $props();

	let isVertical = $derived(direction === 'bottom' || direction === 'top');
	let showGrabber = $derived(isVertical);

	let contentClass = $derived(
		{
			bottom: 'fixed inset-x-0 bottom-0 w-full max-h-[85dvh] rounded-t-2xl border-t border-x',
			top: 'fixed inset-x-0 top-0 w-full max-h-[85dvh] rounded-b-2xl border-b border-x',
			left: 'fixed inset-y-0 left-0 h-full w-full max-w-sm rounded-r-2xl border-r border-y',
			right: 'fixed inset-y-0 right-0 h-full w-full max-w-sm rounded-l-2xl border-l border-y'
		}[direction]
	);
</script>

<VaulDrawer.Root
	bind:open
	{direction}
	{snapPoints}
	{modal}
	dismissible={closeOnInteractOutside}
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
			class="{contentClass} border-kl-base-300 bg-kl-base-100 shadow-kl-lg z-[var(--kl-z-modal)] {className ??
				''}"
		>
			{#if showGrabber}
				<div class="flex justify-center pt-3 pb-1">
					<div class="bg-kl-base-300 h-1.5 w-12 rounded-full"></div>
				</div>
			{/if}

			<VaulDrawer.Close
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 z-10 flex items-center justify-center p-1 transition-colors duration-150"
			>
				<X size={16} />
			</VaulDrawer.Close>

			<div
				class="overflow-y-auto {isVertical
					? 'px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]'
					: 'h-full p-6'}"
			>
				{#if title}
					<VaulDrawer.Title class="text-kl-base-content pr-8 text-lg font-semibold">
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
