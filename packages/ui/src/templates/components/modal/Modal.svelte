<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { Drawer } from 'vaul-svelte';
	import { X } from 'lucide-svelte';
	import { tick, type Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		variant?: 'responsive' | 'drawer';
		breakpoint?: number;
		preventScroll?: boolean;
		snapPoints?: (number | string)[];
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
		variant = 'responsive',
		breakpoint = 768,
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
	let activeSnapPoint = $state<string | number | null>(null);

	$effect(() => {
		if (open && snapPoints && snapPoints.length > 0 && activeSnapPoint === null) {
			tick().then(() => {
				activeSnapPoint = snapPoints[0];
			});
		}
	});

	let isLastSnapPoint = $derived(
		snapPoints && snapPoints.length > 0 && activeSnapPoint === snapPoints[snapPoints.length - 1]
	);
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
	<Drawer.Root bind:open {snapPoints} bind:activeSnapPoint {onOpenChange}>
		{#if trigger}
			<Drawer.Trigger {disabled}>
				{#snippet child({ props })}
					<button
						{...props}
						class="inline-flex cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50"
					>
						{@render trigger()}
					</button>
				{/snippet}
			</Drawer.Trigger>
		{/if}

		<Drawer.Portal>
			<Drawer.Overlay class="fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm" />
			<Drawer.Content
				class="border-kl-base-300 bg-kl-base-100 shadow-kl-lg fixed inset-x-0 bottom-0 z-[var(--kl-z-modal)] flex h-full max-h-[85dvh] w-full flex-col rounded-t-2xl border-x border-t {className ??
					''}"
			>
				<Drawer.Handle class="bg-kl-base-300 mx-auto mt-3 mb-1 h-1.5 w-12 shrink-0 rounded-full" />

				<div
					class="flex-1 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] {isLastSnapPoint
						? 'overflow-y-auto'
						: 'overflow-hidden'}"
					data-vaul-no-drag
				>
					<Drawer.Close
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
					>
						<X size={16} />
					</Drawer.Close>

					{#if title}
						<Drawer.Title class="text-kl-base-content text-lg font-semibold">
							{title}
						</Drawer.Title>
					{/if}

					{#if description}
						<Drawer.Description class="text-kl-muted-content mt-1 text-sm">
							{description}
						</Drawer.Description>
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
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>
{:else}
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
{/if}
