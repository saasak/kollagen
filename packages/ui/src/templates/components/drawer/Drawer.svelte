<script lang="ts">
	import { Drawer } from 'vaul-svelte';
	import { X } from 'lucide-svelte';
	import { tick, type Snippet } from 'svelte';

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
		trigger?: Snippet;
		footer?: Snippet;
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
		trigger,
		footer,
		children,
		class: className
	}: Props = $props();

	let activeSnapPoint = $state<string | number | null>(null);

	$effect(() => {
		if (open && snapPoints && snapPoints.length > 0 && activeSnapPoint === null) {
			tick().then(() => {
				activeSnapPoint = snapPoints[0];
			});
		}
	});

	let isVertical = $derived(direction === 'bottom' || direction === 'top');
	let isLastSnapPoint = $derived(
		snapPoints && snapPoints.length > 0 && activeSnapPoint === snapPoints[snapPoints.length - 1]
	);

	let contentClass = $derived(
		{
			bottom:
				'fixed inset-x-0 bottom-0 flex h-full w-full max-h-[85dvh] flex-col rounded-t-2xl border-t border-x',
			top: 'fixed inset-x-0 top-0 flex h-full w-full max-h-[85dvh] flex-col rounded-b-2xl border-b border-x',
			left: 'fixed inset-y-0 left-0 h-full w-full max-w-sm rounded-r-2xl border-r border-y',
			right: 'fixed inset-y-0 right-0 h-full w-full max-w-sm rounded-l-2xl border-l border-y'
		}[direction]
	);
</script>

<Drawer.Root
	bind:open
	{direction}
	{snapPoints}
	bind:activeSnapPoint
	{modal}
	{dismissible}
	{onOpenChange}
>
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

	<Drawer.Overlay class="fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm" />
	<Drawer.Portal>
		<Drawer.Content
			class="{contentClass} border-kl-base-300 bg-kl-base-100 shadow-kl-lg z-[var(--kl-z-modal)] {className ??
				''}"
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
