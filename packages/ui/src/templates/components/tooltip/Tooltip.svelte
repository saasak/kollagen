<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		content: string;
		open?: boolean;
		delayDuration?: number;
		disabled?: boolean;
		side?: 'top' | 'bottom' | 'left' | 'right';
		sideOffset?: number;
		onOpenChange?: (open: boolean) => void;
		children: Snippet;
		class?: string;
	}

	let {
		content,
		open = $bindable(false),
		delayDuration = 400,
		disabled = false,
		side = 'top',
		sideOffset = 6,
		onOpenChange,
		children,
		class: className
	}: Props = $props();
</script>

{#if disabled}
	{@render children()}
{:else}
	<Tooltip.Provider>
		<Tooltip.Root bind:open {delayDuration} {onOpenChange}>
			<Tooltip.Trigger class="inline-flex">
				{@render children()}
			</Tooltip.Trigger>
			<Tooltip.Content
				{side}
				{sideOffset}
				class="rounded-kl-box bg-kl-base-content text-kl-base-100 shadow-kl-sm z-[var(--kl-z-tooltip)] px-3 py-1.5 text-xs {className ??
					''}"
			>
				{content}
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/if}
