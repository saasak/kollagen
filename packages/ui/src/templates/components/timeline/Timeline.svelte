<script module lang="ts">
	export type TimelineSide = 'start' | 'end' | 'alternate';
	export type TimelineOrientation = 'vertical' | 'horizontal';
</script>

<script lang="ts" generics="T">
	import { cn } from '$lib/utils/cn';
	import { AlertCircle, Loader2 } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	interface Props {
		/** Timeline entries */
		items: T[];
		/** Controlled requested page. Supports bind:page */
		page?: number;
		/** First page already represented by items @default 1 */
		initialPage?: number;
		/** Items per page used when requesting more data @default 10 */
		perPage?: number;
		/** Whether more pages can be loaded */
		hasMore?: boolean;
		/** Loading state for the current page request */
		loading?: boolean;
		/** Error message for the current page request */
		error?: string | null;
		/** Layout orientation @default "vertical" */
		orientation?: TimelineOrientation;
		/** Content placement @default "alternate" */
		side?: TimelineSide;
		/** Render snippet for the timeline marker */
		marker?: Snippet<[T, number]>;
		/** Render snippet for the opposite side content */
		opposite?: Snippet<[T, number]>;
		/** Render snippet for each item */
		children: Snippet<[T, number]>;
		/** Empty state snippet */
		empty?: Snippet;
		/** Loading state snippet */
		loadingContent?: Snippet;
		/** Error state snippet. Receives the error message and retry function */
		errorContent?: Snippet<[string, () => void]>;
		/** Callback when another page should be loaded */
		onLoadMore?: (details: { page: number; perPage: number }) => void;
		/** Callback when the requested page changes */
		onPageChange?: (details: { page: number }) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		items,
		initialPage = 1,
		page = $bindable(initialPage),
		perPage = 10,
		hasMore = false,
		loading = false,
		error = null,
		orientation = 'vertical',
		side = 'alternate',
		marker,
		opposite,
		children: renderItem,
		empty,
		loadingContent,
		errorContent,
		onLoadMore,
		onPageChange,
		class: className
	}: Props = $props();

	let lastRequestedPage = $state(0);

	const isVertical = $derived(orientation === 'vertical');
	const hasItems = $derived(items.length > 0);
	const canLoadMore = $derived(hasMore && !loading && !error && !!onLoadMore);

	function getPlacement(index: number) {
		if (side === 'start') return 'start';
		if (side === 'end') return 'end';
		return index % 2 === 0 ? 'end' : 'start';
	}

	function getContentClass(index: number) {
		const placement = getPlacement(index);
		return placement === 'start'
			? 'col-start-1 row-start-1 pr-2 text-right'
			: 'col-start-3 row-start-1 pl-2 text-left';
	}

	function getOppositeClass(index: number) {
		const placement = getPlacement(index);
		return placement === 'start'
			? 'col-start-3 row-start-1 pl-2 text-left'
			: 'col-start-1 row-start-1 pr-2 text-right';
	}

	function requestPage(nextPage: number, updatePage = true) {
		if (!onLoadMore || loading) return;
		if (updatePage && lastRequestedPage === nextPage) return;

		lastRequestedPage = nextPage;
		if (updatePage) {
			page = nextPage;
			onPageChange?.({ page: nextPage });
		}
		onLoadMore({ page: nextPage, perPage });
	}

	function requestNextPage() {
		if (!canLoadMore) return;
		requestPage(page + 1);
	}

	function retryLoad() {
		if (!onLoadMore || loading) return;
		requestPage(page, false);
	}

	const loadMoreTrigger: Attachment<HTMLDivElement> = (node) => {
		if (typeof IntersectionObserver === 'undefined') return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					requestNextPage();
				}
			},
			{ rootMargin: '160px 0px' }
		);

		observer.observe(node);

		return () => observer.disconnect();
	};
</script>

<div class={cn('w-full', className)}>
	{#if hasItems}
		<div
			role="list"
			class={cn(isVertical ? 'space-y-0' : 'flex gap-0 overflow-x-auto pb-2')}
			aria-busy={loading || undefined}
		>
			{#each items as item, index (index)}
				{#if isVertical}
					<div role="listitem" class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-4">
						<div class={cn('min-w-0 pb-8', getOppositeClass(index))}>
							{#if opposite}
								{@render opposite(item, index)}
							{/if}
						</div>

						<div class="col-start-2 row-start-1 flex flex-col items-center">
							<div class="bg-kl-base-300 h-2 w-px {index === 0 ? 'opacity-0' : ''}"></div>
							<div
								class="border-kl-base-300 bg-kl-base-100 text-kl-base-content shadow-kl-sm z-[1] flex size-8 shrink-0 items-center justify-center rounded-full border"
							>
								{#if marker}
									{@render marker(item, index)}
								{:else}
									<span class="bg-kl-primary size-2.5 rounded-full"></span>
								{/if}
							</div>
							<div
								class="bg-kl-base-300 min-h-8 w-px flex-1 {index === items.length - 1 && !hasMore
									? 'opacity-0'
									: ''}"
							></div>
						</div>

						<div class={cn('min-w-0 pb-8', getContentClass(index))}>
							{@render renderItem(item, index)}
						</div>
					</div>
				{:else}
					<div role="listitem" class="grid min-w-56 flex-1 grid-rows-[1fr_auto_1fr] px-1">
						<div class="min-h-12 pb-3 text-center">
							{#if opposite}
								{@render opposite(item, index)}
							{/if}
						</div>

						<div class="grid grid-cols-[1fr_auto_1fr] items-center">
							<div class="bg-kl-base-300 h-px {index === 0 ? 'opacity-0' : ''}"></div>
							<div
								class="border-kl-base-300 bg-kl-base-100 text-kl-base-content shadow-kl-sm z-[1] flex size-8 shrink-0 items-center justify-center rounded-full border"
							>
								{#if marker}
									{@render marker(item, index)}
								{:else}
									<span class="bg-kl-primary size-2.5 rounded-full"></span>
								{/if}
							</div>
							<div
								class="bg-kl-base-300 h-px {index === items.length - 1 && !hasMore
									? 'opacity-0'
									: ''}"
							></div>
						</div>

						<div class="min-w-0 pt-3 text-center">
							{@render renderItem(item, index)}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{:else if empty && !loading}
		{@render empty()}
	{:else if !loading}
		<p class="text-kl-muted-content text-sm">No timeline items</p>
	{/if}

	<div {@attach loadMoreTrigger} class="h-px" aria-hidden="true"></div>

	{#if loading}
		<div
			class="text-kl-muted-content flex items-center justify-center gap-2 py-3 text-sm"
			aria-live="polite"
		>
			{#if loadingContent}
				{@render loadingContent()}
			{:else}
				<Loader2 size={16} class="animate-spin" />
				<span>Loading</span>
			{/if}
		</div>
	{:else if error}
		<div
			class="border-kl-error/30 bg-kl-error/10 text-kl-error rounded-kl-box flex items-center justify-between gap-3 border px-3 py-2 text-sm"
			aria-live="polite"
		>
			{#if errorContent}
				{@render errorContent(error, retryLoad)}
			{:else}
				<div class="flex min-w-0 items-center gap-2">
					<AlertCircle size={16} class="shrink-0" />
					<span class="truncate">{error}</span>
				</div>
				<button
					type="button"
					onclick={retryLoad}
					class="rounded-kl-field border-kl-error/40 hover:bg-kl-error/15 shrink-0 cursor-pointer border px-2.5 py-1 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)]"
				>
					Retry
				</button>
			{/if}
		</div>
	{:else if hasMore}
		<div class="flex justify-center pt-2">
			<button
				type="button"
				onclick={requestNextPage}
				disabled={!onLoadMore}
				class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-sm cursor-pointer border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
			>
				Load more
			</button>
		</div>
	{/if}
</div>
