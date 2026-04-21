<script lang="ts" generics="T">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import type { EmblaCarouselType } from 'embla-carousel';

	interface Props {
		/** Array of slide data */
		items: T[];
		/** Controlled current page index. Supports bind:page */
		page?: number;
		/** Layout direction */
		orientation?: 'horizontal' | 'vertical';
		/** Auto-advance slides */
		autoplay?: boolean;
		/** Autoplay interval in milliseconds */
		autoplayDelay?: number;
		/** Wrap around to first/last slide */
		loop?: boolean;
		/** Number of slides visible at once */
		slidesPerPage?: number;
		/** Gap between slides (CSS value) */
		spacing?: string;
		/** Show dot indicators */
		showIndicators?: boolean;
		/** Show prev/next arrow buttons */
		showControls?: boolean;
		/** Disable all interaction */
		disabled?: boolean;
		/** Callback when the active page changes */
		onPageChange?: (details: { page: number }) => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Render snippet for each slide — receives the item and its index */
		children: Snippet<[T, number]>;
	}

	let {
		items,
		page = $bindable(0),
		orientation = 'horizontal',
		autoplay: autoplayEnabled = false,
		autoplayDelay = 4000,
		loop = false,
		slidesPerPage = 1,
		spacing = '0px',
		showIndicators = true,
		showControls = true,
		disabled = false,
		onPageChange,
		class: className,
		children
	}: Props = $props();

	let emblaApi: EmblaCarouselType | undefined = $state();
	let canScrollPrev = $state(false);
	let canScrollNext = $state(false);

	const pageCount = $derived(Math.ceil(items.length / slidesPerPage));

	const plugins = $derived(
		autoplayEnabled && !disabled ? [Autoplay({ delay: autoplayDelay })] : []
	);

	const options = $derived({
		loop,
		axis: orientation === 'vertical' ? ('y' as const) : ('x' as const),
		slidesToScroll: slidesPerPage,
		active: !disabled
	});

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
		updateState();
		emblaApi.on('select', updateState);
		emblaApi.on('reInit', updateState);
	}

	function updateState() {
		if (!emblaApi) return;
		const newPage = emblaApi.selectedScrollSnap();
		canScrollPrev = emblaApi.canScrollPrev();
		canScrollNext = emblaApi.canScrollNext();
		if (page !== newPage) {
			page = newPage;
			onPageChange?.({ page: newPage });
		}
	}

	function scrollPrev() {
		emblaApi?.scrollPrev();
	}

	function scrollNext() {
		emblaApi?.scrollNext();
	}

	function scrollTo(index: number) {
		emblaApi?.scrollTo(index);
	}
</script>

<div
	class="relative w-full {disabled ? 'pointer-events-none opacity-50' : ''} {className ?? ''}"
	aria-disabled={disabled || undefined}
	role="region"
	aria-roledescription="carousel"
>
	<div class="overflow-hidden" use:emblaCarouselSvelte={{ options, plugins }} onemblaInit={onInit}>
		<div class="flex {orientation === 'vertical' ? 'flex-col' : ''}" style:gap={spacing}>
			{#each items as item, index (index)}
				<div
					class="min-w-0 flex-shrink-0"
					style:flex="0 0 {100 / slidesPerPage}%"
					role="group"
					aria-roledescription="slide"
					aria-label="Slide {index + 1} of {items.length}"
				>
					{@render children(item, index)}
				</div>
			{/each}
		</div>
	</div>

	{#if showControls}
		<div class="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
			<button
				onclick={scrollPrev}
				disabled={!canScrollPrev}
				class="rounded-kl-selector border-kl-base-300 bg-kl-base-100 text-kl-base-content shadow-kl-sm hover:bg-kl-base-200 flex h-8 w-8 cursor-pointer items-center justify-center border transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Previous slide"
			>
				<ChevronLeft size={18} />
			</button>
			<button
				onclick={scrollNext}
				disabled={!canScrollNext}
				class="rounded-kl-selector border-kl-base-300 bg-kl-base-100 text-kl-base-content shadow-kl-sm hover:bg-kl-base-200 flex h-8 w-8 cursor-pointer items-center justify-center border transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Next slide"
			>
				<ChevronRight size={18} />
			</button>
		</div>
	{/if}

	{#if showIndicators && pageCount > 1}
		<div class="mt-3 flex items-center justify-center gap-1.5" role="tablist">
			{#each { length: pageCount } as _, index (index)}
				<button
					onclick={() => scrollTo(index)}
					class="rounded-kl-selector bg-kl-base-300 hover:bg-kl-muted-content h-2 w-2 cursor-pointer border-none transition-colors duration-150 {page ===
					index
						? 'bg-kl-primary'
						: ''}"
					role="tab"
					aria-selected={page === index}
					aria-label="Go to slide {index + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>
