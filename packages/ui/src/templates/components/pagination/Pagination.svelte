<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Pagination } from 'bits-ui';
	import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-svelte';

	interface Props {
		/** Total number of data items */
		count: number;
		/** Controlled current page. Supports bind:page */
		page?: number;
		/** Items per page @default 10 */
		perPage?: number;
		/** Number of pages shown beside the active page @default 1 */
		siblingCount?: number;
		/** Show "Showing X–Y of Z" page range text */
		showPageInfo?: boolean;
		/** Show a page size selector */
		showPageSizeControl?: boolean;
		/** Options for the page size selector @default [10, 20, 50] */
		pageSizeOptions?: number[];
		/** Callback when the current page changes */
		onPageChange?: (page: number) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		count,
		page = $bindable(1),
		perPage = $bindable(10),
		siblingCount = 1,
		showPageInfo = false,
		showPageSizeControl = false,
		pageSizeOptions = [10, 20, 50],
		onPageChange,
		class: className
	}: Props = $props();

	const hasExtras = $derived(showPageInfo || showPageSizeControl);
</script>

<Pagination.Root {count} bind:page {perPage} {siblingCount} {onPageChange}>
	{#snippet children({ pages, range })}
		<div
			class={cn(`flex items-center ${hasExtras ? 'w-full justify-between' : ''} gap-4`, className)}
		>
			{#if showPageInfo}
				<span class="text-kl-muted-content text-sm whitespace-nowrap">
					Showing {range.start}–{range.end} of {count}
				</span>
			{/if}

			{#if showPageSizeControl}
				<div class="flex items-center gap-2">
					<label for="km-page-size" class="text-kl-muted-content text-sm whitespace-nowrap">
						Rows per page
					</label>
					<select
						id="km-page-size"
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content focus:border-kl-primary focus:outline-kl-primary h-kl-field-sm cursor-pointer border px-2 text-sm outline-none focus:outline"
						value={perPage}
						onchange={(e) => {
							perPage = Number(e.currentTarget.value);
						}}
					>
						{#each pageSizeOptions as size (size)}
							<option value={size}>{size}</option>
						{/each}
					</select>
				</div>
			{/if}

			<div class="flex items-center gap-1 {hasExtras ? 'ml-auto' : ''}">
				<Pagination.PrevButton
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 size-kl-field-sm inline-flex cursor-pointer items-center justify-center border transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
				>
					<ChevronLeft size={16} />
				</Pagination.PrevButton>

				{#each pages as p (p.key)}
					{#if p.type === 'page'}
						<Pagination.Page
							page={p}
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 data-[selected]:border-kl-primary data-[selected]:bg-kl-primary data-[selected]:text-kl-primary-content focus-visible:outline-kl-primary size-kl-field-sm inline-flex cursor-pointer items-center justify-center border text-sm font-medium transition-colors duration-[var(--kl-transition-fast)] focus-visible:outline"
						>
							{p.value}
						</Pagination.Page>
					{:else}
						<span
							class="text-kl-muted-content size-kl-field-sm inline-flex items-center justify-center"
						>
							<Ellipsis size={16} />
						</span>
					{/if}
				{/each}

				<Pagination.NextButton
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 size-kl-field-sm inline-flex cursor-pointer items-center justify-center border transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
				>
					<ChevronRight size={16} />
				</Pagination.NextButton>
			</div>
		</div>
	{/snippet}
</Pagination.Root>
