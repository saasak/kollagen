<script lang="ts" generics="T extends SortsInputColumn">
	import { cn } from '$lib/utils/cn';
	import { Popover } from '../popover';
	import { Trigger } from '../trigger';
	import { ArrowDown, ArrowUp, ArrowUpDown, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import type {
		SortsInputColumn,
		SortsInputDirection,
		SortsInputRule,
		SortsInputValue
	} from './types';

	interface Props {
		columns: T[];
		value?: SortsInputValue;
		onUpdate?: (value: SortsInputValue) => void;
		title?: string;
		clearLabel?: string;
		activeCount?: number;
		multiple?: boolean;
		side?: 'top' | 'right' | 'bottom' | 'left';
		align?: 'start' | 'center' | 'end';
		children?: Snippet<[{ activeCount: number }]>;
		class?: string;
	}

	let {
		columns,
		value = $bindable([]),
		onUpdate,
		title = 'Sort',
		clearLabel = 'Clear sort',
		activeCount,
		multiple = false,
		side = 'bottom',
		align = 'end',
		children,
		class: className
	}: Props = $props();

	const sortableColumns = $derived(columns.filter((column) => column.sortable && !column.disabled));
	const normalizedValue = $derived(
		value.filter((rule) => sortableColumns.some((column) => column.id === rule.id))
	);
	const resolvedActiveCount = $derived(activeCount ?? normalizedValue.length);

	function emitValue(nextValue: SortsInputValue) {
		value = nextValue;
		onUpdate?.(nextValue);
	}

	function getSortRule(columnId: string) {
		return normalizedValue.find((rule) => rule.id === columnId);
	}

	function updateSort(column: SortsInputColumn, direction: SortsInputDirection) {
		const nextRule: SortsInputRule = { id: column.id, direction };

		if (!multiple) {
			emitValue([nextRule]);
			return;
		}

		const currentIndex = normalizedValue.findIndex((rule) => rule.id === column.id);
		if (currentIndex === -1) {
			emitValue([...normalizedValue, nextRule]);
			return;
		}

		const nextValue = [...normalizedValue];
		nextValue[currentIndex] = nextRule;
		emitValue(nextValue);
	}

	function removeSort(columnId: string) {
		emitValue(normalizedValue.filter((rule) => rule.id !== columnId));
	}
</script>

<Popover {title} {side} {align} class={cn('w-[min(24rem,calc(100vw-2rem))]', className)}>
	{#if children}
		{@render children({ activeCount: resolvedActiveCount })}
	{:else}
		<Trigger variant="outline" class="relative">
			<ArrowUpDown size={16} />
			<span>{title}</span>
			{#if resolvedActiveCount > 0}
				<span
					class="bg-kl-primary text-kl-primary-content rounded-kl-selector h-kl-selector-sm min-w-kl-selector-sm inline-flex items-center justify-center px-1.5 text-xs font-semibold"
				>
					{resolvedActiveCount}
				</span>
			{/if}
		</Trigger>
	{/if}

	{#snippet body()}
		<div class="space-y-4">
			{#if sortableColumns.length > 0}
				<div class="grid gap-2">
					{#each sortableColumns as column (column.id)}
						{@const sortRule = getSortRule(column.id)}
						<div
							class="border-kl-base-300 rounded-kl-field flex items-center justify-between gap-2 border p-2"
						>
							<div class="min-w-0">
								<div class="text-kl-base-content truncate text-sm font-medium">{column.label}</div>
								<div class="text-kl-muted-content text-xs">
									{#if sortRule}
										Sorted {sortRule.direction === 'asc' ? 'ascending' : 'descending'}
									{:else}
										Not sorted
									{/if}
								</div>
							</div>

							<div class="flex shrink-0 items-center gap-1">
								<button
									type="button"
									aria-label="Sort {column.label} ascending"
									onclick={() => updateSort(column, 'asc')}
									class={cn(
										'rounded-kl-selector hover:bg-kl-base-200 size-kl-field-sm inline-flex cursor-pointer items-center justify-center transition-colors duration-[var(--kl-transition-fast)]',
										sortRule?.direction === 'asc' &&
											'bg-kl-primary text-kl-primary-content hover:bg-kl-primary'
									)}
								>
									<ArrowUp size={16} />
								</button>
								<button
									type="button"
									aria-label="Sort {column.label} descending"
									onclick={() => updateSort(column, 'desc')}
									class={cn(
										'rounded-kl-selector hover:bg-kl-base-200 size-kl-field-sm inline-flex cursor-pointer items-center justify-center transition-colors duration-[var(--kl-transition-fast)]',
										sortRule?.direction === 'desc' &&
											'bg-kl-primary text-kl-primary-content hover:bg-kl-primary'
									)}
								>
									<ArrowDown size={16} />
								</button>
								<button
									type="button"
									aria-label="Remove {column.label} sort"
									disabled={!sortRule}
									onclick={() => removeSort(column.id)}
									class="rounded-kl-selector text-kl-muted-content hover:bg-kl-base-200 hover:text-kl-base-content size-kl-field-sm inline-flex cursor-pointer items-center justify-center transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-40"
								>
									<X size={16} />
								</button>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="text-kl-muted-content rounded-kl-field bg-kl-base-200 px-3 py-6 text-center text-sm"
				>
					No sortable columns
				</div>
			{/if}

			<div class="border-kl-base-300 flex justify-end border-t pt-3">
				<button
					type="button"
					disabled={resolvedActiveCount === 0}
					onclick={() => emitValue([])}
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-sm inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
				>
					<X size={16} />
					{clearLabel}
				</button>
			</div>
		</div>
	{/snippet}
</Popover>
