<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		content: string;
		open?: boolean;
		openDelay?: number;
		closeDelay?: number;
		disabled?: boolean;
		side?: 'top' | 'bottom' | 'left' | 'right';
		sideOffset?: number;
		align?: 'start' | 'center' | 'end';
		alignOffset?: number;
		onOpenChange?: (open: boolean) => void;
		children: Snippet;
		class?: string;
	}

	let {
		content,
		open = $bindable(),
		openDelay = 400,
		closeDelay = 150,
		disabled = false,
		side = 'top',
		sideOffset = 6,
		align = 'center',
		alignOffset = 0,
		onOpenChange,
		children,
		class: className
	}: Props = $props();
</script>

<Tooltip.Provider delayDuration={openDelay} {disabled}>
	<Tooltip.Root bind:open {onOpenChange} delayDuration={openDelay} {closeDelay}>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<span {...props} class="inline-flex">
					{@render children()}
				</span>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Portal>
			<Tooltip.Content
				{side}
				{sideOffset}
				{align}
				{alignOffset}
				class="rounded-kl-box bg-kl-base-content text-kl-base-100 shadow-kl-sm z-[var(--kl-z-tooltip)] px-3 py-1.5 text-xs {className ??
					''}"
			>
				<Tooltip.Arrow class="border-kl-base-content" />
				{content}
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
