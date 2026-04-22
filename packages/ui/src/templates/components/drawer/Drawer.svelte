<script lang="ts">
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

	let isVertical = $derived(direction === 'bottom' || direction === 'top');

	let contentClass = $derived(
		{
			bottom: 'fixed inset-x-0 bottom-0 w-full max-h-[85dvh] rounded-t-2xl border-t border-x',
			top: 'fixed inset-x-0 top-0 w-full max-h-[85dvh] rounded-b-2xl border-b border-x',
			left: 'fixed inset-y-0 left-0 h-full w-full max-w-sm rounded-r-2xl border-r border-y',
			right: 'fixed inset-y-0 right-0 h-full w-full max-w-sm rounded-l-2xl border-l border-y'
		}[direction]
	);
</script>

<Drawer.Root bind:open {direction} {snapPoints} {modal} {dismissible} {onOpenChange}>
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
				<div class="flex justify-center pt-3 pb-1">
					<div class="bg-kl-base-300 h-1.5 w-12 rounded-full"></div>
				</div>
			{/if}

			<button
				onclick={() => (open = false)}
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-4 right-4 z-10 flex cursor-pointer items-center justify-center p-1 transition-colors duration-150"
			>
				<X size={16} />
			</button>

			<div
				class="overflow-y-auto {isVertical
					? 'px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]'
					: 'h-full p-6'}"
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
