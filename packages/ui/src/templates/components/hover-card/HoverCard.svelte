<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
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
		arrow?: boolean;
		onOpenChange?: (open: boolean) => void;
		body: Snippet;
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
		arrow = true,
		onOpenChange,
		body,
		children,
		class: className
	}: Props = $props();
</script>

<LinkPreview.Root bind:open {openDelay} {closeDelay} {onOpenChange}>
	<LinkPreview.Trigger>
		{#snippet child({ props })}
			<TriggerProvider {props}>
				{@render children()}
			</TriggerProvider>
		{/snippet}
	</LinkPreview.Trigger>

	<LinkPreview.Content
		{side}
		{sideOffset}
		{align}
		{alignOffset}
		class={cn(
			`rounded-kl-box border-kl-base-300 bg-kl-base-100 text-kl-base-content shadow-kl-md z-[var(--kl-z-popover)] w-72 border p-4 text-sm`,
			className
		)}
	>
		{@render body()}
		{#if arrow}
			<LinkPreview.Arrow class="fill-kl-base-100 stroke-kl-base-300" />
		{/if}
	</LinkPreview.Content>
</LinkPreview.Root>
