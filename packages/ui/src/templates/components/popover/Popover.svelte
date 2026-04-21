<script lang="ts">
	import { Popover } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Popover heading */
		title?: string;
		/** Popover description text */
		description?: string;
		/** Side placement */
		side?: 'top' | 'bottom' | 'left' | 'right';
		/** Offset from the trigger */
		sideOffset?: number;
		/** Alignment along the side */
		align?: 'start' | 'center' | 'end';
		/** Alignment offset */
		alignOffset?: number;
		/** Callback when open state changes */
		onOpenChange?: (open: boolean) => void;
		/** Trigger content */
		trigger?: Snippet;
		/** Popover body content */
		children?: Snippet;
		/** Additional CSS classes on the content panel */
		class?: string;
	}

	let {
		open = $bindable(),
		title,
		description,
		side = 'bottom',
		sideOffset = 8,
		align = 'center',
		alignOffset = 0,
		onOpenChange,
		trigger,
		children,
		class: className
	}: Props = $props();
</script>

<Popover.Root bind:open {onOpenChange}>
	{#if trigger}
		<Popover.Trigger>
			{#snippet child({ props })}
				<span {...props} class="inline-flex">
					{@render trigger()}
				</span>
			{/snippet}
		</Popover.Trigger>
	{/if}

	<Popover.Portal>
		<Popover.Content
			{side}
			{sideOffset}
			{align}
			{alignOffset}
			class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 z-[var(--kl-z-popover)] w-72 border p-4 {className ??
				''}"
		>
			<Popover.Arrow class="border-kl-base-300" />

			<div class="flex items-start justify-between gap-2">
				<div>
					{#if title}
						<p class="text-kl-base-content text-sm font-semibold">
							{title}
						</p>
					{/if}

					{#if description}
						<p class="text-kl-muted-content mt-1 text-sm">
							{description}
						</p>
					{/if}
				</div>

				<Popover.Close
					class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex shrink-0 items-center justify-center p-1 transition-colors duration-150"
				>
					<X size={14} />
				</Popover.Close>
			</div>

			{#if children}
				<div class="mt-3">
					{@render children()}
				</div>
			{/if}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
