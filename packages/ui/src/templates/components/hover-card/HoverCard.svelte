<script lang="ts">
	import { LinkPreview } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		openDelay?: number;
		closeDelay?: number;
		side?: 'top' | 'bottom' | 'left' | 'right';
		sideOffset?: number;
		align?: 'start' | 'center' | 'end';
		alignOffset?: number;
		onOpenChange?: (open: boolean) => void;
		trigger: Snippet;
		children: Snippet;
		class?: string;
	}

	let {
		open = $bindable(false),
		openDelay = 600,
		closeDelay = 300,
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

<LinkPreview.Root bind:open {openDelay} {closeDelay} {onOpenChange}>
	<LinkPreview.Trigger class="inline-flex">
		{@render trigger()}
	</LinkPreview.Trigger>

	<LinkPreview.Content
		{side}
		{sideOffset}
		{align}
		{alignOffset}
		class="rounded-kl-box border-kl-base-300 bg-kl-base-100 text-kl-base-content shadow-kl-md z-[var(--kl-z-popover)] w-72 border p-4 text-sm {className ??
			''}"
	>
		{@render children()}
	</LinkPreview.Content>
</LinkPreview.Root>
