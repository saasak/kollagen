<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import { Popover } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type OverlaySnippetContext = {
		close: () => void;
	};

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		side?: 'top' | 'bottom' | 'left' | 'right';
		sideOffset?: number;
		align?: 'start' | 'center' | 'end';
		alignOffset?: number;
		onOpenChange?: (open: boolean) => void;
		body?: Snippet<[OverlaySnippetContext]>;
		children?: Snippet;
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		description,
		side = 'bottom',
		sideOffset = 8,
		align = 'center',
		alignOffset = 0,
		onOpenChange,
		body,
		children,
		class: className
	}: Props = $props();

	function close() {
		open = false;
	}
</script>

<Popover.Root bind:open {onOpenChange}>
	{#if children}
		<Popover.Trigger>
			{#snippet child({ props })}
				<TriggerProvider {props}>
					{@render children()}
				</TriggerProvider>
			{/snippet}
		</Popover.Trigger>
	{/if}

	<Popover.Portal>
		<Popover.Content
			{side}
			{sideOffset}
			{align}
			{alignOffset}
			class={cn(
				`rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg z-[var(--kl-z-popover)] w-72 border p-4`,
				className as string | undefined
			)}
		>
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

				<button
					onclick={() => (open = false)}
					class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex shrink-0 cursor-pointer items-center justify-center p-1 transition-colors duration-150"
				>
					<X size={14} />
				</button>
			</div>

			{#if body}
				<div class="mt-3">
					{@render body({ close })}
				</div>
			{/if}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
