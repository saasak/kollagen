<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils/cn';
	import { Checkbox } from '../checkbox';
	import { DateRangePicker } from '../date-range-picker';
	import { Menu } from '../menu';
	import { Pagination } from '../pagination';
	import { Popover } from '../popover';
	import { Select } from '../select';
	import { TimeField } from '../time-field';
	import { TimeRangeField } from '../time-range-field';
	import { parseDate, parseTime, type DateValue } from '@internationalized/date';
	import type { DateRange, TimeRange, TimeValue } from 'bits-ui';
	import {
		ArrowDown,
		ArrowUp,
		ArrowUpDown,
		Loader2,
		MoreHorizontal,
		Search,
		SlidersHorizontal,
		X
	} from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import {
		createDataTableQuery,
		createDataTableSelection,
		type DataTableBatchAction,
		type DataTableBatchActionPayload,
		type DataTableCellSnippet,
		type DataTableColumn,
		type DataTableDateRangeValue,
		type DataTableFilter,
		type DataTableFilterValue,
		type DataTableNumberRangeValue,
		type DataTableQuery,
		type DataTableRowAction,
		type DataTableRowKey,
		type DataTableSelection,
		type DataTableSort,
		type DataTableTimeGranularity,
		type DataTableTimeRangeValue
	} from './types';

	interface Props {
		data: T[];
		columns: DataTableColumn<T>[];
		totalCount: number;
		filters?: DataTableFilter[];
		query?: DataTableQuery;
		onQueryChange?: (query: DataTableQuery) => void;
		rowKey?: keyof T | ((row: T) => string | number);
		selectable?: boolean;
		selection?: DataTableSelection;
		onSelectionChange?: (selection: DataTableSelection) => void;
		rowActions?: DataTableRowAction<T>[];
		batchActions?: DataTableBatchAction<T>[];
		loading?: boolean;
		searchPlaceholder?: string;
		pageSizeOptions?: number[];
		emptyText?: string;
		cellSnippets?: Record<string, DataTableCellSnippet<T>>;
		class?: string;
	}

	let {
		data,
		columns,
		totalCount,
		filters = [],
		query = $bindable(createDataTableQuery()),
		onQueryChange,
		rowKey,
		selectable = false,
		selection = $bindable(createDataTableSelection()),
		onSelectionChange,
		rowActions = [],
		batchActions = [],
		loading = false,
		searchPlaceholder = 'Search...',
		pageSizeOptions = [10, 20, 50],
		emptyText = 'No results found',
		cellSnippets = {},
		class: className
	}: Props = $props();

	const searchId = $props.id();
	let searchValue = $derived(query.search);
	const selectedRowsByKey = new SvelteMap<DataTableRowKey, T>();
	let searchTimer: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => {
		if (searchTimer) clearTimeout(searchTimer);
	});

	const hasFilters = $derived(filters.length > 0);
	const activeFilterCount = $derived.by(() => {
		return Object.values(query.filters).filter((value) => !isEmptyFilterValue(value)).length;
	});
	const hasQuery = $derived(
		query.search !== '' || activeFilterCount > 0 || query.sort !== null || query.page !== 1
	);
	const hasRowActions = $derived(rowActions.length > 0);
	const hasBatchActions = $derived(batchActions.length > 0);
	const pageRowKeys = $derived(data.map((row, index) => getSelectionKey(row, index)));
	const visibleSelectedCount = $derived.by(() => {
		return pageRowKeys.filter((key) => isRowSelected(key)).length;
	});
	const allVisibleRowsSelected = $derived(
		pageRowKeys.length > 0 && visibleSelectedCount === pageRowKeys.length
	);
	const someVisibleRowsSelected = $derived(visibleSelectedCount > 0 && !allVisibleRowsSelected);
	const selectedCount = $derived.by(() => {
		if (selection.mode === 'all') return Math.max(totalCount - selection.excludedKeys.length, 0);
		return selection.keys.length;
	});
	const allRowsSelected = $derived(selection.mode === 'all' && selection.excludedKeys.length === 0);
	const colSpan = $derived(
		Math.max(columns.length + (selectable ? 1 : 0) + (hasRowActions ? 1 : 0), 1)
	);

	function emitQuery(next: DataTableQuery) {
		query = next;
		onQueryChange?.(next);
	}

	function emitSelection(next: DataTableSelection) {
		selection = next;
		onSelectionChange?.(next);
	}

	function rememberRow(key: DataTableRowKey, row: T) {
		selectedRowsByKey.set(key, row);
	}

	function rememberRows(rows: T[]) {
		rows.forEach((row, index) => {
			rememberRow(getSelectionKey(row, index), row);
		});
	}

	function forgetRows(keys: DataTableRowKey[]) {
		keys.forEach((key) => selectedRowsByKey.delete(key));
	}

	function updateQuery(patch: Partial<DataTableQuery>, resetPage = false) {
		emitQuery({
			...query,
			...patch,
			page: resetPage ? 1 : (patch.page ?? query.page),
			filters: patch.filters ?? query.filters
		});
	}

	function updateSearch(value: string) {
		searchValue = value;
		if (searchTimer) clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			updateQuery({ search: value }, true);
		}, 300);
	}

	function clearSearch() {
		if (searchTimer) clearTimeout(searchTimer);
		searchValue = '';
		updateQuery({ search: '' }, true);
	}

	function updateFilter(id: string, value: DataTableFilterValue) {
		const nextFilters = { ...query.filters };
		if (isEmptyFilterValue(value)) {
			delete nextFilters[id];
		} else {
			nextFilters[id] = value;
		}
		updateQuery({ filters: nextFilters }, true);
	}

	function resetQuery() {
		emitQuery(createDataTableQuery({ perPage: query.perPage }));
	}

	function toggleSort(column: DataTableColumn<T>) {
		if (!column.sortable) return;
		let nextSort: DataTableSort = { id: column.id, direction: 'asc' };
		if (query.sort?.id === column.id && query.sort.direction === 'asc') {
			nextSort = { id: column.id, direction: 'desc' };
		} else if (query.sort?.id === column.id && query.sort.direction === 'desc') {
			nextSort = null;
		}
		updateQuery({ sort: nextSort }, true);
	}

	function getCellValue(row: T, column: DataTableColumn<T>) {
		if (typeof column.accessor === 'function') return column.accessor(row);
		if (column.accessor) return row[column.accessor];
		return row[column.id];
	}

	function getRowKey(row: T, index: number) {
		if (typeof rowKey === 'function') return rowKey(row);
		if (rowKey) return row[rowKey];
		return index;
	}

	function getSelectionKey(row: T, index: number): DataTableRowKey {
		const key = getRowKey(row, index);
		return typeof key === 'number' || typeof key === 'string' ? key : String(key);
	}

	function isRowSelected(key: DataTableRowKey) {
		if (selection.mode === 'all') return !selection.excludedKeys.includes(key);
		return selection.keys.includes(key);
	}

	function uniqueKeys(keys: DataTableRowKey[]) {
		return Array.from(new Set(keys));
	}

	function selectPageRows() {
		rememberRows(data);
		if (selection.mode === 'all') {
			emitSelection({
				mode: 'all',
				excludedKeys: selection.excludedKeys.filter((key) => !pageRowKeys.includes(key))
			});
			return;
		}

		emitSelection({
			mode: 'keys',
			keys: uniqueKeys([...selection.keys, ...pageRowKeys])
		});
	}

	function clearPageRows() {
		forgetRows(pageRowKeys);
		if (selection.mode === 'all') {
			emitSelection({
				mode: 'all',
				excludedKeys: uniqueKeys([...selection.excludedKeys, ...pageRowKeys])
			});
			return;
		}

		emitSelection({
			mode: 'keys',
			keys: selection.keys.filter((key) => !pageRowKeys.includes(key))
		});
	}

	function togglePageSelection(checked: boolean) {
		if (checked) {
			selectPageRows();
			return;
		}
		clearPageRows();
	}

	function toggleRowSelection(row: T, key: DataTableRowKey, checked: boolean) {
		if (checked) {
			rememberRow(key, row);
		} else {
			forgetRows([key]);
		}

		if (selection.mode === 'all') {
			emitSelection({
				mode: 'all',
				excludedKeys: checked
					? selection.excludedKeys.filter((excludedKey) => excludedKey !== key)
					: uniqueKeys([...selection.excludedKeys, key])
			});
			return;
		}

		emitSelection({
			mode: 'keys',
			keys: checked
				? uniqueKeys([...selection.keys, key])
				: selection.keys.filter((rowKey) => rowKey !== key)
		});
	}

	function selectAllRows() {
		rememberRows(data);
		emitSelection({ mode: 'all', excludedKeys: [] });
	}

	function clearSelection() {
		selectedRowsByKey.clear();
		emitSelection(createDataTableSelection());
	}

	function isRowActionDisabled(action: DataTableRowAction<T>, row: T) {
		if (typeof action.disabled === 'function') return action.disabled(row);
		return action.disabled ?? false;
	}

	function getRowActionItems(row: T) {
		return rowActions.map((action) => ({
			label: action.label,
			value: action.id,
			disabled: isRowActionDisabled(action, row)
		}));
	}

	function selectRowAction(row: T, actionId: string) {
		rowActions.find((action) => action.id === actionId)?.onSelect(row);
	}

	function getBatchActionPayload(): DataTableBatchActionPayload<T> {
		if (selection.mode === 'all') {
			return {
				mode: 'all',
				excludedRowKeys: selection.excludedKeys,
				query,
				totalCount
			};
		}

		return {
			mode: 'rows',
			rowKeys: selection.keys,
			rows: selection.keys.flatMap((key) => {
				const row = selectedRowsByKey.get(key);
				return row ? [row] : [];
			}),
			query,
			totalCount
		};
	}

	function isBatchActionDisabled(action: DataTableBatchAction<T>) {
		const payload = getBatchActionPayload();
		if (typeof action.disabled === 'function') return action.disabled(payload);
		return action.disabled ?? false;
	}

	function getBatchActionItems() {
		return batchActions.map((action) => ({
			label: action.label,
			value: action.id,
			disabled: isBatchActionDisabled(action)
		}));
	}

	function selectBatchAction(actionId: string) {
		const action = batchActions.find((item) => item.id === actionId);
		if (!action) return;
		action.onSelect(getBatchActionPayload());
	}

	function getAlignClass(align: DataTableColumn<T>['align']) {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right';
		return 'text-left';
	}

	function getHeaderAriaSort(column: DataTableColumn<T>) {
		if (!column.sortable || query.sort?.id !== column.id) return undefined;
		return query.sort.direction === 'asc' ? 'ascending' : 'descending';
	}

	function getStringFilterValue(id: string) {
		const value = query.filters[id];
		return typeof value === 'string' ? value : '';
	}

	function getStringArrayFilterValue(id: string) {
		const value = query.filters[id];
		return Array.isArray(value) ? value : [];
	}

	function getDateRangeFilterValue(id: string): DataTableDateRangeValue {
		const value = query.filters[id];
		if (!isRangeObject(value)) return {};
		const range = value as DataTableDateRangeValue;
		return {
			from: typeof range.from === 'string' ? range.from : undefined,
			to: typeof range.to === 'string' ? range.to : undefined
		};
	}

	function getDateFilterValue(id: string, key: keyof DataTableDateRangeValue) {
		const value = getDateRangeFilterValue(id)[key];
		if (!value) return undefined;

		try {
			return parseDate(value);
		} catch {
			return undefined;
		}
	}

	function getDateRangePickerValue(id: string): DateRange {
		return {
			start: getDateFilterValue(id, 'from'),
			end: getDateFilterValue(id, 'to')
		};
	}

	function formatDateFilterValue(value: DateValue | undefined) {
		if (!value) return undefined;
		const month = String(value.month).padStart(2, '0');
		const day = String(value.day).padStart(2, '0');
		return `${value.year}-${month}-${day}`;
	}

	function updateDateRangeFilter(id: string, value: DateRange | undefined) {
		updateFilter(id, {
			from: formatDateFilterValue(value?.start),
			to: formatDateFilterValue(value?.end)
		});
	}

	function getNumberRangeFilterValue(id: string): DataTableNumberRangeValue {
		const value = query.filters[id];
		if (!isRangeObject(value)) return {};
		const range = value as DataTableNumberRangeValue;
		return {
			min: typeof range.min === 'number' ? range.min : undefined,
			max: typeof range.max === 'number' ? range.max : undefined
		};
	}

	function getBooleanFilterValue(id: string) {
		const value = query.filters[id];
		if (typeof value !== 'boolean') return '';
		return value ? 'true' : 'false';
	}

	function updateBooleanFilter(id: string, value: string | string[]) {
		if (Array.isArray(value) || value === '') {
			updateFilter(id, null);
			return;
		}
		updateFilter(id, value === 'true');
	}

	function getTimeFilterValue(id: string): TimeValue | undefined {
		const value = query.filters[id];
		if (typeof value !== 'string' || !value) return undefined;

		try {
			return parseTime(value);
		} catch {
			return undefined;
		}
	}

	function formatTimeFilterValue(
		value: TimeValue | undefined,
		granularity: DataTableTimeGranularity = 'minute'
	) {
		if (!value) return undefined;
		const hour = String(value.hour).padStart(2, '0');
		const minute = String(value.minute).padStart(2, '0');
		if (granularity === 'second') {
			const second = String(value.second).padStart(2, '0');
			return `${hour}:${minute}:${second}`;
		}
		return `${hour}:${minute}`;
	}

	function updateTimeFilter(
		id: string,
		value: TimeValue | undefined,
		granularity: DataTableTimeGranularity = 'minute'
	) {
		updateFilter(id, formatTimeFilterValue(value, granularity) ?? null);
	}

	function getTimeRangeFilterValue(id: string): DataTableTimeRangeValue {
		const value = query.filters[id];
		if (!isRangeObject(value)) return {};
		const range = value as DataTableTimeRangeValue;
		return {
			from: typeof range.from === 'string' ? range.from : undefined,
			to: typeof range.to === 'string' ? range.to : undefined
		};
	}

	function getTimeRangeFieldValue(id: string): TimeRange {
		const range = getTimeRangeFilterValue(id);
		return {
			start: parseTimeFilterValue(range.from),
			end: parseTimeFilterValue(range.to)
		};
	}

	function parseTimeFilterValue(value: string | undefined) {
		if (!value) return undefined;
		try {
			return parseTime(value);
		} catch {
			return undefined;
		}
	}

	function updateTimeRangeFilter(
		id: string,
		value: TimeRange | undefined,
		granularity: DataTableTimeGranularity = 'minute'
	) {
		updateFilter(id, {
			from: formatTimeFilterValue(value?.start, granularity),
			to: formatTimeFilterValue(value?.end, granularity)
		});
	}

	function isRangeObject(value: DataTableFilterValue): value is Record<string, string | number> {
		return !!value && typeof value === 'object' && !Array.isArray(value);
	}

	function isEmptyFilterValue(value: DataTableFilterValue) {
		if (value === null || value === undefined) return true;
		if (typeof value === 'string') return value === '';
		if (Array.isArray(value)) return value.length === 0;
		if (typeof value === 'object')
			return Object.values(value).every((entry) => entry === undefined || entry === '');
		return false;
	}
</script>

<div class={cn('space-y-4', className)}>
	<div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
		<div class="min-w-0 flex-1">
			<div class="relative w-full max-w-md">
				<label for="{searchId}-search" class="sr-only">{searchPlaceholder}</label>
				<Search
					size={16}
					class="text-kl-muted-content pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
				/>
				<input
					id="{searchId}-search"
					type="search"
					value={searchValue}
					placeholder={searchPlaceholder}
					oninput={(event) => updateSearch(event.currentTarget.value)}
					class="border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md w-full border pr-10 pl-9 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline"
				/>
				{#if searchValue}
					<button
						type="button"
						onclick={clearSearch}
						aria-label="Clear search"
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-1/2 right-2 flex -translate-y-1/2 cursor-pointer items-center justify-center p-1 transition-colors duration-[var(--kl-transition-fast)]"
					>
						<X size={16} />
					</button>
				{/if}
			</div>
		</div>

		<div class="flex items-center justify-between gap-2 lg:justify-end">
			{#if hasFilters}
				<Popover title="Filters" side="bottom" align="end" class="w-[min(28rem,calc(100vw-2rem))]">
					{#snippet trigger()}
						<button
							type="button"
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-md relative inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)]"
						>
							<SlidersHorizontal size={16} />
							<span>Filters</span>
							{#if activeFilterCount > 0}
								<span
									class="bg-kl-primary text-kl-primary-content rounded-kl-selector h-kl-selector-sm min-w-kl-selector-sm inline-flex items-center justify-center px-1.5 text-xs font-semibold"
								>
									{activeFilterCount}
								</span>
							{/if}
						</button>
					{/snippet}

					<form class="space-y-4" onsubmit={(event) => event.preventDefault()}>
						<div class="grid gap-3">
							{#each filters as filter (filter.id)}
								<div class="space-y-1.5">
									<span class="text-kl-muted-content block text-xs font-medium">
										{filter.label}
									</span>

									{#if filter.type === 'select'}
										<Select
											items={[{ label: filter.placeholder ?? 'Any', value: '' }, ...filter.values]}
											value={getStringFilterValue(filter.id)}
											allowDeselect
											onValueChange={(value) => updateFilter(filter.id, value)}
										/>
									{:else if filter.type === 'multi-select'}
										<Select
											items={filter.values}
											multiple
											value={getStringArrayFilterValue(filter.id)}
											placeholder={filter.placeholder ?? 'Any'}
											onValueChange={(value) => updateFilter(filter.id, value)}
										/>
									{:else if filter.type === 'boolean'}
										<Select
											items={[
												{ label: filter.placeholder ?? 'Any', value: '' },
												{ label: filter.trueLabel ?? 'True', value: 'true' },
												{ label: filter.falseLabel ?? 'False', value: 'false' }
											]}
											value={getBooleanFilterValue(filter.id)}
											allowDeselect
											onValueChange={(value) => updateBooleanFilter(filter.id, value)}
										/>
									{:else if filter.type === 'text'}
										<input
											type="text"
											aria-label={filter.label}
											value={getStringFilterValue(filter.id)}
											placeholder={filter.placeholder ?? filter.label}
											oninput={(event) => updateFilter(filter.id, event.currentTarget.value)}
											class="border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md w-full border px-3 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline"
										/>
									{:else if filter.type === 'date-range'}
										<DateRangePicker
											ariaLabel={filter.label}
											value={getDateRangePickerValue(filter.id)}
											numberOfMonths={filter.numberOfMonths ?? 2}
											weekStartsOn={filter.weekStartsOn}
											locale={filter.locale ?? 'en'}
											onValueChange={(value) => updateDateRangeFilter(filter.id, value)}
										/>
									{:else if filter.type === 'number-range'}
										<div class="grid grid-cols-2 gap-2">
											<input
												type="number"
												aria-label="{filter.label} minimum"
												value={getNumberRangeFilterValue(filter.id).min ?? ''}
												placeholder="Min"
												oninput={(event) =>
													updateFilter(filter.id, {
														...getNumberRangeFilterValue(filter.id),
														min:
															event.currentTarget.value === ''
																? undefined
																: Number(event.currentTarget.value)
													})}
												class="border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md min-w-0 border px-2 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline"
											/>
											<input
												type="number"
												aria-label="{filter.label} maximum"
												value={getNumberRangeFilterValue(filter.id).max ?? ''}
												placeholder="Max"
												oninput={(event) =>
													updateFilter(filter.id, {
														...getNumberRangeFilterValue(filter.id),
														max:
															event.currentTarget.value === ''
																? undefined
																: Number(event.currentTarget.value)
													})}
												class="border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md min-w-0 border px-2 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline"
											/>
										</div>
									{:else if filter.type === 'time'}
										<TimeField
											ariaLabel={filter.label}
											value={getTimeFilterValue(filter.id)}
											placeholder={filter.placeholder}
											hourCycle={filter.hourCycle}
											granularity={filter.granularity ?? 'minute'}
											locale={filter.locale ?? 'en'}
											onValueChange={(value) =>
												updateTimeFilter(filter.id, value, filter.granularity ?? 'minute')}
										/>
									{:else if filter.type === 'time-range'}
										<TimeRangeField
											value={getTimeRangeFieldValue(filter.id)}
											placeholder={filter.placeholder}
											hourCycle={filter.hourCycle}
											granularity={filter.granularity ?? 'minute'}
											locale={filter.locale ?? 'en'}
											onValueChange={(value) =>
												updateTimeRangeFilter(filter.id, value, filter.granularity ?? 'minute')}
										/>
									{/if}
								</div>
							{/each}
						</div>

						<div class="border-kl-base-300 flex justify-end border-t pt-3">
							<button
								type="button"
								disabled={activeFilterCount === 0}
								onclick={() => updateQuery({ filters: {} }, true)}
								class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-sm inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
							>
								<X size={16} />
								Clear filters
							</button>
						</div>
					</form>
				</Popover>
			{/if}

			<button
				type="button"
				disabled={!hasQuery}
				onclick={resetQuery}
				class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-md inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
			>
				<X size={16} />
				Reset
			</button>
		</div>
	</div>

	{#if selectable && selectedCount > 0}
		<div
			class="rounded-kl-box border-kl-base-300 bg-kl-base-200 flex flex-col gap-3 border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
		>
			<div class="text-kl-base-content text-sm font-medium">
				{#if allRowsSelected}
					All {totalCount} rows selected
				{:else}
					{selectedCount} selected
				{/if}
			</div>

			<div class="flex flex-wrap items-center gap-2">
				{#if allVisibleRowsSelected && !allRowsSelected && totalCount > pageRowKeys.length}
					<button
						type="button"
						onclick={selectAllRows}
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-sm inline-flex cursor-pointer items-center border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)]"
					>
						Select all {totalCount}
					</button>
				{/if}

				{#if hasBatchActions}
					<Menu items={getBatchActionItems()} onSelect={selectBatchAction} class="min-w-40">
						{#snippet trigger()}
							<button
								type="button"
								class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-sm inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)]"
							>
								<MoreHorizontal size={16} />
								Actions
							</button>
						{/snippet}
					</Menu>
				{/if}

				<button
					type="button"
					onclick={clearSelection}
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-sm inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)]"
				>
					<X size={16} />
					Clear
				</button>
			</div>
		</div>
	{/if}

	<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 relative overflow-hidden border">
		<div class="overflow-x-auto">
			<table class="w-full min-w-full text-left text-sm">
				<thead class="bg-kl-base-200 text-kl-muted-content">
					<tr>
						{#if selectable}
							<th scope="col" class="border-kl-base-300 w-12 border-b px-4 py-3">
								<Checkbox
									label="Select page rows"
									class="[&>span]:sr-only"
									checked={allVisibleRowsSelected}
									indeterminate={someVisibleRowsSelected}
									onCheckedChange={togglePageSelection}
								/>
							</th>
						{/if}

						{#each columns as column (column.id)}
							<th
								scope="col"
								aria-sort={getHeaderAriaSort(column)}
								style:width={column.width}
								class="border-kl-base-300 border-b px-4 py-3 text-xs font-semibold tracking-normal whitespace-nowrap uppercase {getAlignClass(
									column.align
								)}"
							>
								{#if column.sortable}
									<button
										type="button"
										onclick={() => toggleSort(column)}
										class="text-kl-muted-content hover:text-kl-base-content inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-[var(--kl-transition-fast)] {column.align ===
										'right'
											? 'justify-end'
											: column.align === 'center'
												? 'justify-center'
												: 'justify-start'}"
									>
										<span>{column.label}</span>
										{#if query.sort?.id === column.id && query.sort.direction === 'asc'}
											<ArrowUp size={14} />
										{:else if query.sort?.id === column.id && query.sort.direction === 'desc'}
											<ArrowDown size={14} />
										{:else}
											<ArrowUpDown size={14} />
										{/if}
									</button>
								{:else}
									<span>{column.label}</span>
								{/if}
							</th>
						{/each}

						{#if hasRowActions}
							<th scope="col" class="border-kl-base-300 w-12 border-b px-4 py-3">
								<span class="sr-only">Actions</span>
							</th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each data as row, index (getRowKey(row, index))}
						{@const selectionKey = getSelectionKey(row, index)}
						<tr class="border-kl-base-300 hover:bg-kl-base-200/60 border-b last:border-b-0">
							{#if selectable}
								<td class="px-4 py-3 align-middle">
									<Checkbox
										label="Select row"
										class="[&>span]:sr-only"
										checked={isRowSelected(selectionKey)}
										onCheckedChange={(checked) => toggleRowSelection(row, selectionKey, checked)}
									/>
								</td>
							{/if}

							{#each columns as column (column.id)}
								{@const value = getCellValue(row, column)}
								{@const cell = cellSnippets[column.id] ?? column.cell}
								<td
									class="text-kl-base-content px-4 py-3 align-middle {getAlignClass(column.align)}"
								>
									{#if cell}
										{@render cell(row, value)}
									{:else if column.format}
										{column.format(value, row)}
									{:else}
										{value}
									{/if}
								</td>
							{/each}

							{#if hasRowActions}
								<td class="px-4 py-3 text-right align-middle">
									<Menu
										items={getRowActionItems(row)}
										onSelect={(value) => selectRowAction(row, value)}
										class="min-w-36"
									>
										{#snippet trigger()}
											<button
												type="button"
												class="rounded-kl-selector text-kl-muted-content hover:bg-kl-base-200 hover:text-kl-base-content size-kl-selector-lg inline-flex cursor-pointer items-center justify-center transition-colors duration-[var(--kl-transition-fast)]"
												aria-label="Row actions"
											>
												<MoreHorizontal size={16} />
											</button>
										{/snippet}
									</Menu>
								</td>
							{/if}
						</tr>
					{:else}
						<tr>
							<td colspan={colSpan} class="text-kl-muted-content px-4 py-12 text-center text-sm">
								{emptyText}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if loading}
			<div
				class="bg-kl-base-100/70 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]"
			>
				<div class="text-kl-muted-content flex items-center gap-2 text-sm">
					<Loader2 size={16} class="animate-spin" />
					<span>Loading...</span>
				</div>
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div class="text-kl-muted-content text-sm">
			Showing page {query.page} of {Math.max(1, Math.ceil(totalCount / query.perPage))}
		</div>

		<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
			<div class="flex items-center gap-2">
				<label for="{searchId}-page-size" class="text-kl-muted-content text-sm whitespace-nowrap">
					Rows per page
				</label>
				<select
					id="{searchId}-page-size"
					value={query.perPage}
					onchange={(event) => updateQuery({ perPage: Number(event.currentTarget.value) }, true)}
					class="border-kl-base-300 bg-kl-base-100 text-kl-base-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md cursor-pointer border px-2 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline"
				>
					{#each pageSizeOptions as size (size)}
						<option value={size}>{size}</option>
					{/each}
				</select>
			</div>
			<Pagination
				count={totalCount}
				page={query.page}
				perPage={query.perPage}
				onPageChange={(page) => updateQuery({ page })}
			/>
		</div>
	</div>
</div>
