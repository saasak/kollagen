<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils/cn';
	import type { ButtonGroupItem } from '../button-group';
	import { Checkbox } from '../checkbox';
	import { FiltersInput, countActiveFiltersInputValues } from '../filters-input';
	import { Menu, type MenuEntry } from '../menu';
	import { Multibar, type MultibarItem } from '../multibar';
	import { Pagination } from '../pagination';
	import { SearchInput } from '../search-input';
	import { Trigger } from '../trigger';
	import { ArrowDown, ArrowUp, ArrowUpDown, Loader2, MoreHorizontal, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import {
		areDataTableQueriesEqual,
		createDataTableQueryFromUrl,
		normalizeDataTableQuery,
		type DataTableUrlStateConfig,
		writeDataTableQuerySearchParams
	} from './url-state';
	import {
		createDataTableQuery,
		createDataTableSelection,
		type DataTableBatchAction,
		type DataTableBatchActionPayload,
		type DataTableColumn,
		type DataTableFilter,
		type DataTableQuery,
		type DataTableRowAction,
		type DataTableRowActionMenu,
		type DataTableRowActionMenuEntry,
		type DataTableRowActionsSize,
		type DataTableRowActionsVariant,
		type DataTableRowKey,
		type DataTableRowUpdatePayload,
		type DataTableSelection,
		type DataTableSortRule,
		type DataTableUrlStateHistory
	} from './types';

	type QueryChangeIntent =
		| 'search'
		| 'filters'
		| 'reset'
		| 'page'
		| 'perPage'
		| 'sort'
		| 'external';

	type RowActionMultibarContext = {
		row: T;
		action: DataTableRowAction<T>;
	};

	interface Props {
		data: T[];
		columns: DataTableColumn<T>[];
		totalCount: number;
		filters?: DataTableFilter[];
		query?: DataTableQuery;
		onQueryChange?: (query: DataTableQuery) => void;
		urlState?: DataTableUrlStateConfig<T>;
		rowKey?: keyof T | ((row: T) => string | number);
		selectable?: boolean;
		selection?: DataTableSelection;
		onSelectionChange?: (selection: DataTableSelection) => void;
		onRowUpdate?: (payload: DataTableRowUpdatePayload<T>) => void | Promise<void>;
		rowActions?: DataTableRowAction<T>[];
		rowActionsVariant?: DataTableRowActionsVariant;
		rowActionsSize?: DataTableRowActionsSize;
		batchActions?: DataTableBatchAction<T>[];
		loading?: boolean;
		searchPlaceholder?: string;
		pageSizeOptions?: number[];
		emptyText?: string;
		class?: string;
	}

	let {
		data,
		columns,
		totalCount,
		filters = [],
		query = $bindable(createDataTableQuery()),
		onQueryChange,
		urlState,
		rowKey,
		selectable = false,
		selection = $bindable(createDataTableSelection()),
		onSelectionChange,
		onRowUpdate,
		rowActions = [],
		rowActionsVariant = 'menu',
		rowActionsSize = 'xs',
		batchActions = [],
		loading = false,
		searchPlaceholder = 'Search...',
		pageSizeOptions = [10, 20, 50],
		emptyText = 'No results found',
		class: className
	}: Props = $props();

	const searchId = $props.id();
	const initialQueryDefaults = createDataTableQuery(query);
	const selectedRowsByKey = new SvelteMap<DataTableRowKey, T>();

	const hasFilters = $derived(filters.length > 0);
	const activeFilterCount = $derived(countActiveFiltersInputValues(query.filters));
	const defaultQuery = $derived(
		normalizeDataTableQuery(createDataTableQuery(urlState?.defaults ?? initialQueryDefaults), {
			defaults: urlState?.defaults ?? initialQueryDefaults,
			columns,
			filters,
			pageSizeOptions
		})
	);
	const hasQuery = $derived(!areDataTableQueriesEqual(query, defaultQuery));
	const hasRowActions = $derived(rowActions.length > 0);
	const hasRowActionColumn = $derived(hasRowActions && rowActionsVariant !== 'floating-bar');
	const hasFloatingRowActions = $derived(hasRowActions && rowActionsVariant === 'floating-bar');
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
		Math.max(columns.length + (selectable ? 1 : 0) + (hasRowActionColumn ? 1 : 0), 1)
	);

	let urlStateReady = $state(false);
	let openFloatingRowActionMenu = $state<{
		rowKey: DataTableRowKey;
		actionId: string;
	} | null>(null);

	onMount(() => {
		if (!urlState || typeof window === 'undefined') return;

		urlStateReady = true;

		function handlePopState() {
			emitQuery(parseUrlQuery(), 'external', false);
		}

		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	});

	function emitQuery(next: DataTableQuery, intent: QueryChangeIntent = 'external', syncUrl = true) {
		const normalizedQuery = normalizeQuery(next);
		if (areDataTableQueriesEqual(query, normalizedQuery)) {
			if (syncUrl) syncUrlQuery(normalizedQuery, intent);
			return;
		}

		if (syncUrl) syncUrlQuery(normalizedQuery, intent);
		query = normalizedQuery;
		onQueryChange?.(normalizedQuery);
	}

	function normalizeQuery(nextQuery: Partial<DataTableQuery>) {
		return normalizeDataTableQuery(nextQuery, {
			defaults: urlState?.defaults ?? initialQueryDefaults,
			columns,
			filters,
			pageSizeOptions
		});
	}

	function parseUrlQuery() {
		return createDataTableQueryFromUrl(new URLSearchParams(window.location.search), {
			prefix: urlState!.prefix,
			defaults: urlState?.defaults ?? initialQueryDefaults,
			history: urlState?.history,
			columns,
			filters,
			pageSizeOptions
		});
	}

	function syncUrlQuery(nextQuery: DataTableQuery, intent: QueryChangeIntent) {
		if (!urlState || !urlStateReady || typeof window === 'undefined') return;

		const nextSearchParams = writeDataTableQuerySearchParams(
			new URLSearchParams(window.location.search),
			nextQuery,
			{
				prefix: urlState.prefix,
				defaults: urlState.defaults ?? initialQueryDefaults,
				history: urlState.history,
				columns,
				filters,
				pageSizeOptions
			}
		);
		const nextSearch = nextSearchParams.toString();
		const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
		const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

		if (nextUrl === currentUrl) return;

		const historyMode = getHistoryMode(urlState.history ?? 'auto', intent);
		window.history[historyMode === 'push' ? 'pushState' : 'replaceState'](
			window.history.state,
			'',
			nextUrl
		);
	}

	function getHistoryMode(history: DataTableUrlStateHistory, intent: QueryChangeIntent) {
		if (history !== 'auto') return history;
		return intent === 'page' || intent === 'perPage' || intent === 'sort' ? 'push' : 'replace';
	}

	function emitSelection(next: DataTableSelection) {
		selection = next;
		onSelectionChange?.(next);
	}

	function updateQuery(
		patch: Partial<DataTableQuery>,
		resetPage = false,
		intent: QueryChangeIntent = 'external'
	) {
		emitQuery(
			{
				...query,
				...patch,
				page: resetPage ? defaultQuery.page : (patch.page ?? query.page),
				filters: patch.filters ?? query.filters
			},
			intent
		);
	}

	function resetQuery() {
		emitQuery(defaultQuery, 'reset');
	}

	function toggleSort(column: DataTableColumn<T>, additive = false) {
		if (!column.sortable) return;

		const currentIndex = query.sort.findIndex((sort) => sort.id === column.id);
		const currentRule = currentIndex === -1 ? undefined : query.sort[currentIndex];
		const nextRule = getNextSortRule(column.id, currentRule);

		if (!additive) {
			updateQuery({ sort: nextRule ? [nextRule] : [] }, true, 'sort');
			return;
		}

		const nextSort = [...query.sort];
		if (currentIndex === -1) {
			nextSort.push({ id: column.id, direction: 'asc' });
		} else if (nextRule) {
			nextSort[currentIndex] = nextRule;
		} else {
			nextSort.splice(currentIndex, 1);
		}

		updateQuery({ sort: nextSort }, true, 'sort');
	}

	function getNextSortRule(id: string, currentRule: DataTableSortRule | undefined) {
		if (!currentRule) return { id, direction: 'asc' } satisfies DataTableSortRule;
		if (currentRule.direction === 'asc')
			return { id, direction: 'desc' } satisfies DataTableSortRule;
		return null;
	}

	function getSortRule(columnId: string) {
		return query.sort.find((sort) => sort.id === columnId);
	}

	function getSortIndex(columnId: string) {
		return query.sort.findIndex((sort) => sort.id === columnId);
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

	function isRowActionMenu(action: DataTableRowAction<T>): action is DataTableRowActionMenu<T> {
		return action.type === 'menu';
	}

	function getRowActionMenuValue(actionId: string, value: string) {
		return `${actionId}:${value}`;
	}

	function isRowActionMenuEntryDisabled(entry: DataTableRowActionMenuEntry<T>, row: T): boolean {
		if (!('disabled' in entry)) return false;
		if (typeof entry.disabled === 'function') return entry.disabled(row);
		return entry.disabled ?? false;
	}

	function getRowActionMenuEntries(
		action: DataTableRowActionMenu<T>,
		entries: DataTableRowActionMenuEntry<T>[],
		row: T
	): MenuEntry[] {
		return entries.map((entry) => {
			if ('type' in entry && entry.type === 'separator') return entry;
			if ('type' in entry && entry.type === 'group') {
				return {
					type: 'group',
					label: entry.label,
					items: entry.items ? getRowActionMenuEntries(action, entry.items, row) : undefined
				};
			}
			if ('type' in entry && entry.type === 'submenu') {
				return {
					type: 'submenu',
					label: entry.label,
					disabled: isRowActionMenuEntryDisabled(entry, row),
					items: getRowActionMenuEntries(action, entry.items, row)
				};
			}
			return {
				label: entry.label,
				value: getRowActionMenuValue(action.id, entry.value),
				disabled: isRowActionMenuEntryDisabled(entry, row)
			};
		});
	}

	function getRowActionItems(row: T) {
		return rowActions.map((action) => {
			if (isRowActionMenu(action)) {
				return {
					type: 'submenu',
					label: action.label,
					disabled: isRowActionDisabled(action, row),
					items: getRowActionMenuEntries(action, action.items, row)
				} satisfies MenuEntry;
			}

			return {
				label: action.label,
				value: action.id,
				disabled: isRowActionDisabled(action, row)
			} satisfies MenuEntry;
		});
	}

	function selectRowAction(row: T, actionId: string) {
		const action = rowActions.find((action) => action.id === actionId);
		if (action && !isRowActionMenu(action)) action.onSelect(row);
	}

	function findRowActionMenuEntry(
		entries: DataTableRowActionMenuEntry<T>[],
		value: string
	): DataTableRowActionMenuEntry<T> | undefined {
		for (const entry of entries) {
			if (!('type' in entry) && entry.value === value) return entry;
			if ('type' in entry && (entry.type === 'group' || entry.type === 'submenu')) {
				const nestedEntry = findRowActionMenuEntry(entry.items ?? [], value);
				if (nestedEntry) return nestedEntry;
			}
		}
	}

	function selectRowActionValue(row: T, value: string) {
		const [actionId, menuValue] = value.split(':', 2);
		const action = rowActions.find((action) => action.id === actionId);
		if (!action) return;

		if (!isRowActionMenu(action)) {
			action.onSelect(row);
			return;
		}

		if (!menuValue) return;
		const menuEntry = findRowActionMenuEntry(action.items, menuValue);
		if (menuEntry && !('type' in menuEntry)) menuEntry.onSelect?.(row);
		action.onSelect?.(row, menuValue);
	}

	function handleRowActionMenuOpenChange(rowKey: DataTableRowKey, actionId: string, open: boolean) {
		if (rowActionsVariant !== 'floating-bar') return;

		if (open) {
			openFloatingRowActionMenu = { rowKey, actionId };
			return;
		}

		if (
			openFloatingRowActionMenu?.rowKey === rowKey &&
			openFloatingRowActionMenu.actionId === actionId
		) {
			openFloatingRowActionMenu = null;
		}
	}

	function isFloatingRowActionMenuOpen(rowKey: DataTableRowKey) {
		return openFloatingRowActionMenu?.rowKey === rowKey;
	}

	function getRowActionMultibarItems(row: T, rowKey: DataTableRowKey): MultibarItem[] {
		return [
			{
				id: 'row-actions',
				type: 'buttonGroup',
				ariaLabel: 'Row actions',
				items: rowActions.map((action): ButtonGroupItem => {
					const content = action.icon ? ('icon' as const) : ('normal' as const);
					const item = {
						id: action.id,
						content,
						disabled: isRowActionDisabled(action, row),
						ariaLabel: action.label,
						children: rowActionContent,
						childrenContext: { row, action } satisfies RowActionMultibarContext,
						class: action.icon ? undefined : 'max-w-28'
					};

					if (isRowActionMenu(action)) {
						return {
							...item,
							type: 'menu',
							params: getRowActionMenuEntries(action, action.items, row),
							onSelect: (value) => selectRowActionValue(row, value),
							onOpenChange: (open) => handleRowActionMenuOpenChange(rowKey, action.id, open)
						};
					}

					return {
						...item,
						type: 'button',
						title: action.label,
						onclick: () => selectRowAction(row, action.id)
					};
				})
			}
		];
	}

	function getRowActionsHeaderClass() {
		return 'border-kl-base-300 w-px border-b px-4 py-3';
	}

	function getRowActionsCellClass() {
		return 'px-4 py-3 text-right align-middle';
	}

	function getRowActionMultibarClass(rowKey: DataTableRowKey) {
		const base = 'gap-1';

		if (rowActionsVariant !== 'floating-bar') return base;

		return cn(
			base,
			'border-kl-base-300 bg-kl-base-100/85 absolute top-1/2 right-2 z-[var(--kl-z-dropdown)] -translate-y-1/2 rounded-kl-field border shadow-[var(--kl-shadow-md)] backdrop-blur-md',
			'pointer-events-none opacity-0 transition-opacity duration-[var(--kl-transition-fast)] group-hover/row:pointer-events-auto group-hover/row:opacity-100 group-focus-within/row:pointer-events-auto group-focus-within/row:opacity-100',
			'[@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100',
			isFloatingRowActionMenuOpen(rowKey) && 'pointer-events-auto opacity-100'
		);
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
		const sortRule = getSortRule(column.id);
		if (!column.sortable || !sortRule) return undefined;
		return sortRule.direction === 'asc' ? 'ascending' : 'descending';
	}

	function updateRow(
		row: T,
		rowKey: DataTableRowKey,
		column: DataTableColumn<T>,
		patch: Partial<T>
	) {
		return onRowUpdate?.({
			row,
			rowKey,
			column,
			columnId: column.id,
			value: getCellValue(row, column),
			patch
		});
	}
</script>

{#snippet rowActionContent(context?: unknown)}
	{@const rowActionContext = context as RowActionMultibarContext}
	{#if rowActionContext.action.icon}
		{@render rowActionContext.action.icon(rowActionContext.row)}
	{:else}
		<span class="truncate">{rowActionContext.action.label}</span>
	{/if}
{/snippet}

{#snippet rowActionMultibar(row: T, rowKey: DataTableRowKey)}
	<Multibar
		items={getRowActionMultibarItems(row, rowKey)}
		variant="ghost"
		color="base"
		size={rowActionsSize}
		ariaLabel="Row actions"
		class={getRowActionMultibarClass(rowKey)}
	/>
{/snippet}

<div class={cn('space-y-4', className)}>
	<div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
		<div class="min-w-0 flex-1">
			<SearchInput
				id="{searchId}-search"
				value={query.search}
				placeholder={searchPlaceholder}
				onUpdate={(search) => updateQuery({ search }, true, 'search')}
			/>
		</div>

		<div class="flex items-center justify-between gap-2 lg:justify-end">
			{#if hasFilters}
				<FiltersInput
					{filters}
					value={query.filters}
					activeCount={activeFilterCount}
					align="end"
					onUpdate={(nextFilters) => updateQuery({ filters: nextFilters }, true, 'filters')}
				/>
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

	<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 relative overflow-hidden border">
		<div class="overflow-x-auto">
			<table class="w-full min-w-full text-left text-sm">
				<thead class="bg-kl-base-200 text-kl-muted-content">
					{#if selectable && selectedCount > 0}
						<tr>
							<th
								colspan={colSpan}
								scope="colgroup"
								class="border-kl-base-300 border-b px-4 py-2 text-left font-normal"
							>
								<div
									class="min-h-kl-field-sm flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
								>
									<div class="flex min-w-0 items-center gap-3">
										<Checkbox
											label="Select page rows"
											class="[&>span]:sr-only"
											checked={allVisibleRowsSelected}
											indeterminate={someVisibleRowsSelected}
											onCheckedChange={togglePageSelection}
										/>

										<div class="text-kl-base-content truncate text-sm font-medium">
											{#if allRowsSelected}
												All {totalCount} rows selected
											{:else}
												{selectedCount} selected
											{/if}
										</div>
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
											<Menu
												items={getBatchActionItems()}
												onSelect={selectBatchAction}
												class="min-w-40"
											>
												<Trigger variant="outline" size="sm">
													<MoreHorizontal size={16} />
													Actions
												</Trigger>
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
							</th>
						</tr>
					{:else}
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
										{@const sortRule = getSortRule(column.id)}
										{@const sortIndex = getSortIndex(column.id)}
										<button
											type="button"
											onclick={(event) => toggleSort(column, event.shiftKey)}
											class="text-kl-muted-content hover:text-kl-base-content inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-[var(--kl-transition-fast)] {column.align ===
											'right'
												? 'justify-end'
												: column.align === 'center'
													? 'justify-center'
													: 'justify-start'}"
										>
											<span>{column.label}</span>
											{#if sortRule?.direction === 'asc'}
												<ArrowUp size={14} />
											{:else if sortRule?.direction === 'desc'}
												<ArrowDown size={14} />
											{:else}
												<ArrowUpDown size={14} />
											{/if}
											{#if query.sort.length > 1 && sortIndex !== -1}
												<span
													class="bg-kl-muted text-kl-muted-content rounded-kl-selector inline-flex size-4 items-center justify-center text-[0.625rem] font-semibold"
												>
													{sortIndex + 1}
												</span>
											{/if}
										</button>
									{:else}
										<span>{column.label}</span>
									{/if}
								</th>
							{/each}

							{#if hasRowActionColumn}
								<th scope="col" class={getRowActionsHeaderClass()}>
									<span class="sr-only">Actions</span>
								</th>
							{/if}
						</tr>
					{/if}
				</thead>
				<tbody>
					{#each data as row, index (getRowKey(row, index))}
						{@const selectionKey = getSelectionKey(row, index)}
						<tr
							class="group/row border-kl-base-300 hover:bg-kl-base-200/60 relative border-b last:border-b-0"
						>
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

							{#each columns as column, columnIndex (column.id)}
								{@const value = getCellValue(row, column)}
								{@const cell = column.cell}
								<td
									class={cn(
										'text-kl-base-content px-4 py-3 align-middle',
										getAlignClass(column.align),
										hasFloatingRowActions && columnIndex === columns.length - 1 && 'relative'
									)}
								>
									{#if cell}
										{@render cell(row, value, {
											column,
											rowKey: selectionKey,
											updateRow: (patch) => updateRow(row, selectionKey, column, patch)
										})}
									{:else if column.format}
										{column.format(value, row)}
									{:else}
										{value}
									{/if}

									{#if hasFloatingRowActions && columnIndex === columns.length - 1}
										{@render rowActionMultibar(row, selectionKey)}
									{/if}
								</td>
							{/each}

							{#if hasRowActionColumn}
								<td class={getRowActionsCellClass()}>
									{#if rowActionsVariant === 'menu'}
										<Menu
											items={getRowActionItems(row)}
											onSelect={(value) => selectRowActionValue(row, value)}
											class="min-w-36"
										>
											<Trigger variant="ghost" size="sm" content="icon" ariaLabel="Row actions">
												<MoreHorizontal size={16} />
											</Trigger>
										</Menu>
									{:else if rowActionsVariant === 'bar'}
										{@render rowActionMultibar(row, selectionKey)}
									{/if}
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
					onchange={(event) =>
						updateQuery({ perPage: Number(event.currentTarget.value) }, true, 'perPage')}
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
				onPageChange={(page) => updateQuery({ page }, false, 'page')}
			/>
		</div>
	</div>
</div>
