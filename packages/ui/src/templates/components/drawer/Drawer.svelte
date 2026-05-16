<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import { Drawer } from 'vaul-svelte';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type Direction = 'left' | 'right' | 'top' | 'bottom';

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		direction?: Direction;
		snapPoints?: (number | string)[];
		modal?: boolean;
		dismissible?: boolean;
		disabled?: boolean;
		onOpenChange?: (open: boolean) => void;
		footer?: Snippet;
		body?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		description,
		direction = 'bottom',
		snapPoints,
		modal = true,
		dismissible = true,
		disabled = false,
		onOpenChange,
		footer,
		body,
		children,
		class: className
	}: Props = $props();

	let activeSnapPoint = $state<string | number | null>(null);

	let isVertical = $derived(direction === 'bottom' || direction === 'top');
	let isLastSnapPoint = $derived(
		snapPoints && snapPoints.length > 0 && activeSnapPoint === snapPoints[snapPoints.length - 1]
	);

	let contentClass = $derived(
		{
			bottom:
				'fixed inset-x-0 bottom-0 flex h-full w-full max-h-[85dvh] flex-col rounded-t-kl-box border-t border-x',
			top: 'fixed inset-x-0 top-0 flex h-full w-full max-h-[85dvh] flex-col rounded-b-kl-box border-b border-x',
			left: 'fixed inset-y-0 left-0 h-full w-full max-w-sm rounded-r-kl-box border-r border-y',
			right: 'fixed inset-y-0 right-0 h-full w-full max-w-sm rounded-l-kl-box border-l border-y'
		}[direction]
	);

	function handleOpenChange(nextOpen: boolean) {
		if (nextOpen && snapPoints && snapPoints.length > 0 && activeSnapPoint === null) {
			activeSnapPoint = snapPoints[0];
		}
		onOpenChange?.(nextOpen);
	}
</script>

<Drawer.Root
	bind:open
	{direction}
	{snapPoints}
	bind:activeSnapPoint
	{modal}
	{dismissible}
	onOpenChange={handleOpenChange}
>
	{#if children}
		<Drawer.Trigger {disabled}>
			{#snippet child({ props })}
				<TriggerProvider {props}>
					{@render children()}
				</TriggerProvider>
			{/snippet}
		</Drawer.Trigger>
	{/if}

	<Drawer.Overlay class="bg-kl-neutral/50 fixed inset-0 z-[var(--kl-z-overlay)] backdrop-blur-sm" />
	<Drawer.Portal>
		<Drawer.Content
			class={cn(
				`${contentClass} border-kl-base-300 bg-kl-base-100 shadow-kl-lg z-[var(--kl-z-modal)]`,
				className as string | undefined
			)}
		>
			{#if isVertical}
				<Drawer.Handle class="bg-kl-base-300 mx-auto mt-3 mb-1 h-1.5 w-12 shrink-0 rounded-full" />
			{/if}

			<button
				onclick={() => (open = false)}
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 z-10 flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
			>
				<X size={16} />
			</button>

			<div
				class={isVertical
					? `flex-1 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] ${isLastSnapPoint ? 'overflow-y-auto' : 'overflow-hidden'}`
					: 'h-full overflow-y-auto p-6'}
				data-vaul-no-drag
			>
				{#if title}
					<h2 class="text-kl-base-content pr-8 text-lg font-semibold">{title}</h2>
				{/if}

				{#if description}
					<p class="text-kl-muted-content mt-1 text-sm">{description}</p>
				{/if}

				{#if body}
					<div class="mt-4">
						{@render body()}
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
