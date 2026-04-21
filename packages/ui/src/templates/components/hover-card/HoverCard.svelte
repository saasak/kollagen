<script lang="ts">
	import { LinkPreview } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controlled open state. Supports bind:open */
		open?: boolean;
		/** Delay in ms before the hover card opens (default 600) */
		openDelay?: number;
		/** Delay in ms before the hover card closes (default 300) */
		closeDelay?: number;
		/** Prevent the hover card from opening */
		disabled?: boolean;
		/** Side placement */
		side?: 'top' | 'bottom' | 'left' | 'right';
		/** Offset from the trigger */
		sideOffset?: number;
		/** Alignment along the side */
		align?: 'start' | 'center' | 'end';
		/** Alignment offset */
		alignOffset?: number;
		/** Callback when the hover card opens or closes */
		onOpenChange?: (open: boolean) => void;
		/** The trigger element */
		trigger: Snippet;
		/** The hover card content */
		children: Snippet;
		/** Show an arrow pointing to the trigger */
		arrow?: boolean;
		/** Additional CSS classes on the hover card content */
		class?: string;
	}

	let {
		open = $bindable(),
		openDelay = 600,
		closeDelay = 300,
		disabled = false,
		side = 'bottom',
		sideOffset = 8,
		align = 'center',
		alignOffset = 0,
		onOpenChange,
		trigger,
		children,
		arrow = true,
		class: className
	}: Props = $props();
</script>

<LinkPreview.Root bind:open {openDelay} {closeDelay} {disabled} {onOpenChange}>
	<LinkPreview.Trigger>
		{#snippet child({ props })}
			<span
				{...props}
				class="focus-visible:outline-kl-primary inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
			>
				{@render trigger()}
			</span>
		{/snippet}
	</LinkPreview.Trigger>

	<LinkPreview.Content
		{side}
		{sideOffset}
		{align}
		{alignOffset}
		class="rounded-kl-box border-kl-base-300 bg-kl-base-100 text-kl-base-content shadow-kl-md z-[var(--kl-z-popover)] w-72 border p-4 text-sm transition-opacity duration-[var(--kl-transition-fast)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100 {className ??
			''}"
	>
		{#if arrow}
			<LinkPreview.Arrow class="border-kl-base-300" />
		{/if}
		{@render children()}
	</LinkPreview.Content>
</LinkPreview.Root>
