<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Items to scroll through the marquee */
		items: T[];
		/** Scroll direction */
		side?: 'start' | 'end' | 'top' | 'bottom';
		/** Scroll speed in pixels per second */
		speed?: number;
		/** Delay before animation starts (seconds) */
		delay?: number;
		/** Number of loops (0 = infinite) */
		loopCount?: number;
		/** Gap between items (CSS value) */
		spacing?: string;
		/** Auto-duplicate items to fill container */
		autoFill?: boolean;
		/** Pause scrolling on hover or focus */
		pauseOnInteraction?: boolean;
		/** Reverse the scroll direction */
		reverse?: boolean;
		/** Controlled paused state. Supports bind:paused */
		paused?: boolean;
		/** Initial paused state for uncontrolled mode */
		defaultPaused?: boolean;
		/** Show gradient fade overlays at the leading and trailing edges */
		showEdges?: boolean;
		/** Accessible label describing the scrolling content */
		label?: string;
		/** Disable the marquee */
		disabled?: boolean;
		/** Callback when pause state changes */
		onPauseChange?: (details: { paused: boolean }) => void;
		/** Callback on each loop iteration */
		onLoopComplete?: () => void;
		/** Callback when all loops complete (finite loops only) */
		onComplete?: () => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Render snippet for each item — receives item and its index */
		children: Snippet<[T, number]>;
	}

	let {
		items,
		side = 'start',
		speed = 50,
		delay = 0,
		loopCount = 0,
		spacing = '1rem',
		autoFill = false,
		pauseOnInteraction = false,
		reverse = false,
		paused = $bindable(),
		defaultPaused = false,
		showEdges = false,
		label,
		disabled = false,
		onPauseChange,
		onLoopComplete,
		onComplete,
		class: className,
		children: renderItem
	}: Props = $props();

	const isVertical = $derived(side === 'top' || side === 'bottom');
	const shouldReverse = $derived(side === 'end' || side === 'bottom' ? !reverse : reverse);

	let internalPaused = $state(defaultPaused);
	const isPaused = $derived(paused !== undefined ? paused : internalPaused);

	let loopsCompleted = $state(0);

	function handleAnimationIteration() {
		loopsCompleted++;
		onLoopComplete?.();
		if (loopCount > 0 && loopsCompleted >= loopCount) {
			internalPaused = true;
			if (paused !== undefined) paused = true;
			onPauseChange?.({ paused: true });
			onComplete?.();
		}
	}

	function handleMouseEnter() {
		if (!pauseOnInteraction) return;
		internalPaused = true;
		if (paused !== undefined) paused = true;
		onPauseChange?.({ paused: true });
	}

	function handleMouseLeave() {
		if (!pauseOnInteraction) return;
		internalPaused = false;
		if (paused !== undefined) paused = false;
		onPauseChange?.({ paused: false });
	}

	// Duplicate count for seamless scroll
	const duplicates = $derived(autoFill ? 4 : 2);
</script>

<div
	class={disabled ? 'pointer-events-none opacity-50' : undefined}
	aria-disabled={disabled || undefined}
>
	<div
		class="overflow-hidden {className ?? ''}"
		aria-label={label}
		role="marquee"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onfocusin={pauseOnInteraction ? handleMouseEnter : undefined}
		onfocusout={pauseOnInteraction ? handleMouseLeave : undefined}
		style="position: relative;"
	>
		<div
			class="marquee-track flex {isVertical ? 'flex-col' : 'flex-row'}"
			data-vertical={isVertical || undefined}
			style:gap={spacing}
			style:animation-play-state={isPaused ? 'paused' : 'running'}
			style:animation-direction={shouldReverse ? 'reverse' : 'normal'}
			style:animation-delay="{delay}s"
			style:animation-iteration-count={loopCount > 0 ? loopCount : 'infinite'}
			style:--marquee-duration="{items.length * (100 / speed)}s"
			onanimationiteration={handleAnimationIteration}
		>
			{#each { length: duplicates } as _, dupIndex}
				{#each items as item, index (dupIndex + '-' + index)}
					<div class="marquee-item shrink-0">
						{@render renderItem(item, index)}
					</div>
				{/each}
			{/each}
		</div>

		{#if showEdges}
			{#if isVertical}
				<div
					class="from-kl-base-100 pointer-events-none absolute top-0 right-0 left-0 h-16 bg-gradient-to-b to-transparent"
				></div>
				<div
					class="from-kl-base-100 pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t to-transparent"
				></div>
			{:else}
				<div
					class="from-kl-base-100 pointer-events-none absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r to-transparent"
				></div>
				<div
					class="from-kl-base-100 pointer-events-none absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l to-transparent"
				></div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.marquee-track {
		animation-name: marquee-scroll-x;
		animation-timing-function: linear;
		animation-duration: var(--marquee-duration, 20s);
		width: max-content;
	}

	.marquee-track[data-vertical] {
		animation-name: marquee-scroll-y;
		height: max-content;
		width: auto;
	}

	@keyframes marquee-scroll-x {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@keyframes marquee-scroll-y {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-50%);
		}
	}
</style>
