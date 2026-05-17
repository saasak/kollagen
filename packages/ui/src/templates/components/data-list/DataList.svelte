<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils/cn';
	import type { ButtonGroupItem } from '../button-group';
	import { Checkbox } from '../checkbox';
	import { FiltersInput, countActiveFiltersInputValues } from '../filters-input';
	import { Menu, type MenuEntry } from '../menu';
	import { Multibar, type MultibarItem } from '../multibar';
	import { Pagination } from '../pagination';
	import { SearchInput } from '../search-input';
	import { SortsInput } from '../sorts-input';
	import { Trigger } from '../trigger';
	import { Loader2, MoreHorizontal, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import {
		areDataListQueriesEqual,
		createDataListQueryFromUrl,
		normalizeDataListQuery,
		type DataListUrlStateConfig,
		writeDataListQuerySearchParams
	} from './url-state';
	import {
		createDataListQuery,
		createDataListSelection,
		type DataListBatchAction,
		type DataListBatchActionPayload,
		type DataListColumn,
		type DataListFilter,
		type DataListQuery,
		type DataListRowAction,
		type DataListRowActionMenu,
		type DataListRowActionMenuEntry,
		type DataListRowActionsSize,
		type DataListRowActionsVariant,
		type DataListRowKey,
		type DataListRowUpdatePayload,
		type DataListSelection,
		type DataListUrlStateHistory
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
		action: DataListRowAction<T>;
	};

	interface Props {
		data: T[];
		columns: DataListColumn<T>[];
		totalCount: number;
		filters?: DataListFilter[];
		query?: DataListQuery;
		onQueryChange?: (query: DataListQuery) => void;
		urlState?: DataListUrlStateConfig<T>;
		rowKey?: keyof T | ((row: T) => string | number);
		selection?: DataListSelection;
		onSelectionChange?: (selection: DataListSelection) => void;
		onRowUpdate?: (payload: DataListRowUpdatePayload<T>) => void | Promise<void>;
		rowActions?: DataListRowAction<T>[];
		rowActionsVariant?: DataListRowActionsVariant;
		rowActionsSize?: DataListRowActionsSize;
		batchActions?: DataListBatchAction<T>[];
		loading?: boolean;
		searchPlaceholder?: string;
		showSearch?: boolean;
		showPagination?: boolean;
		pageSizeOptions?: number[];
		emptyText?: string;
		class?: string;
	}

	let {
		data,
		columns,
		totalCount,
		filters = [],
		query = $bindable(createDataListQuery()),
		onQueryChange,
		urlState,
		rowKey,
		selection = $bindable(createDataListSelection()),
		onSelectionChange,
		onRowUpdate,
		rowActions = [],
		rowActionsVariant = 'menu',
		rowActionsSize = 'xs',
		batchActions = [],
		loading = false,
		searchPlaceholder = 'Search...',
		showSearch = true,
		showPagination = true,
		pageSizeOptions = [10, 20, 50],
		emptyText = 'No results found',
		class: className
	}: Props = $props();

	const searchId = $props.id();
	const initialQueryDefaults = createDataListQuery(query);
	const selectedRowsByKey = new SvelteMap<DataListRowKey, T>();

	const hasFilters = $derived(filters.length > 0);
	const activeFilterCount = $derived(countActiveFiltersInputValues(query.filters));
	const defaultQuery = $derived(
		normalizeDataListQuery(createDataListQuery(urlState?.defaults ?? initialQueryDefaults), {
			defaults: urlState?.defaults ?? initialQueryDefaults,
			columns,
			filters,
			pageSizeOptions
		})
	);
	const hasQuery = $derived(!areDataListQueriesEqual(query, defaultQuery));
	const hasRowActions = $derived(rowActions.length > 0);
	const hasRowActionColumn = $derived(hasRowActions && rowActionsVariant !== 'floating-bar');
	const hasFloatingRowActions = $derived(hasRowActions && rowActionsVariant === 'floating-bar');
	const hasBatchActions = $derived(batchActions.length > 0);
	const visibleColumns = $derived(columns.filter((column) => !column.wrap));
	const wrapColumn = $derived(columns.find((column) => column.wrap));
	const resolvedGrowColumnId = $derived(
		visibleColumns.find((column) => column.grow)?.id ??
			visibleColumns[1]?.id ??
			visibleColumns[0]?.id
	);
	const hasSortableColumns = $derived(columns.some((column) => column.sortable));
	const showToolbar = $derived(showSearch || hasFilters || hasSortableColumns || hasQuery);
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
	let urlStateReady = $state(false);
	let openFloatingRowActionMenu = $state<{
		rowKey: DataListRowKey;
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

	function emitQuery(next: DataListQuery, intent: QueryChangeIntent = 'external', syncUrl = true) {
		const normalizedQuery = normalizeQuery(next);
		if (areDataListQueriesEqual(query, normalizedQuery)) {
			if (syncUrl) syncUrlQuery(normalizedQuery, intent);
			return;
		}

		if (syncUrl) syncUrlQuery(normalizedQuery, intent);
		query = normalizedQuery;
		onQueryChange?.(normalizedQuery);
	}

	function normalizeQuery(nextQuery: Partial<DataListQuery>) {
		return normalizeDataListQuery(nextQuery, {
			defaults: urlState?.defaults ?? initialQueryDefaults,
			columns,
			filters,
			pageSizeOptions
		});
	}

	function parseUrlQuery() {
		return createDataListQueryFromUrl(new URLSearchParams(window.location.search), {
			prefix: urlState!.prefix,
			defaults: urlState?.defaults ?? initialQueryDefaults,
			history: urlState?.history,
			columns,
			filters,
			pageSizeOptions
		});
	}

	function syncUrlQuery(nextQuery: DataListQuery, intent: QueryChangeIntent) {
		if (!urlState || !urlStateReady || typeof window === 'undefined') return;

		const nextSearchParams = writeDataListQuerySearchParams(
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

	function getHistoryMode(history: DataListUrlStateHistory, intent: QueryChangeIntent) {
		if (history !== 'auto') return history;
		return intent === 'page' || intent === 'perPage' || intent === 'sort' ? 'push' : 'replace';
	}

	function emitSelection(next: DataListSelection) {
		selection = next;
		onSelectionChange?.(next);
	}

	function updateQuery(
		patch: Partial<DataListQuery>,
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

	function rememberRow(key: DataListRowKey, row: T) {
		selectedRowsByKey.set(key, row);
	}

	function rememberRows(rows: T[]) {
		rows.forEach((row, index) => {
			rememberRow(getSelectionKey(row, index), row);
		});
	}

	function forgetRows(keys: DataListRowKey[]) {
		keys.forEach((key) => selectedRowsByKey.delete(key));
	}

	function getCellValue(row: T, column: DataListColumn<T>) {
		if (typeof column.accessor === 'function') return column.accessor(row);
		if (column.accessor) return row[column.accessor];
		return row[column.id];
	}

	function getRowKey(row: T, index: number) {
		if (typeof rowKey === 'function') return rowKey(row);
		if (rowKey) return row[rowKey];
		return index;
	}

	function getSelectionKey(row: T, index: number): DataListRowKey {
		const key = getRowKey(row, index);
		return typeof key === 'number' || typeof key === 'string' ? key : String(key);
	}

	function isRowSelected(key: DataListRowKey) {
		if (selection.mode === 'all') return !selection.excludedKeys.includes(key);
		return selection.keys.includes(key);
	}

	function uniqueKeys(keys: DataListRowKey[]) {
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

	function toggleRowSelection(row: T, key: DataListRowKey, checked: boolean) {
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
		emitSelection(createDataListSelection());
	}

	function isRowActionDisabled(action: DataListRowAction<T>, row: T) {
		if (typeof action.disabled === 'function') return action.disabled(row);
		return action.disabled ?? false;
	}

	function isRowActionMenu(action: DataListRowAction<T>): action is DataListRowActionMenu<T> {
		return action.type === 'menu';
	}

	function getRowActionMenuValue(actionId: string, value: string) {
		return `${actionId}:${value}`;
	}

	function isRowActionMenuEntryDisabled(entry: DataListRowActionMenuEntry<T>, row: T): boolean {
		if (!('disabled' in entry)) return false;
		if (typeof entry.disabled === 'function') return entry.disabled(row);
		return entry.disabled ?? false;
	}

	function getRowActionMenuEntries(
		action: DataListRowActionMenu<T>,
		entries: DataListRowActionMenuEntry<T>[],
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
		entries: DataListRowActionMenuEntry<T>[],
		value: string
	): DataListRowActionMenuEntry<T> | undefined {
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

	function handleRowActionMenuOpenChange(rowKey: DataListRowKey, actionId: string, open: boolean) {
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

	function isFloatingRowActionMenuOpen(rowKey: DataListRowKey) {
		return openFloatingRowActionMenu?.rowKey === rowKey;
	}

	function getRowActionMultibarItems(row: T, rowKey: DataListRowKey): MultibarItem[] {
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

	function getRowActionMultibarClass(rowKey: DataListRowKey) {
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

	function getBatchActionPayload(): DataListBatchActionPayload<T> {
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

	function isBatchActionDisabled(action: DataListBatchAction<T>) {
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

	function getAlignClass(align: DataListColumn<T>['align']) {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right';
		return 'text-left';
	}

	function getRowGridTemplate() {
		const tracks: string[] = [];
		if (hasBatchActions) tracks.push('minmax(1.75rem,auto)');
		for (const column of visibleColumns) {
			if (column.id === resolvedGrowColumnId) {
				tracks.push(column.width ?? 'minmax(10rem,1fr)');
				continue;
			}
			tracks.push(column.width ?? 'max-content');
		}
		if (hasRowActionColumn) tracks.push('max-content');
		return tracks.join(' ');
	}

	function getColumnClass(column: DataListColumn<T>) {
		return cn(
			'min-w-0',
			column.id === resolvedGrowColumnId ? 'w-full' : 'shrink-0',
			getAlignClass(column.align),
			column.class
		);
	}

	function getValueClass(column: DataListColumn<T>) {
		return cn(
			'text-kl-base-content min-w-0 text-sm',
			column.id === resolvedGrowColumnId ? 'font-medium' : 'font-normal',
			column.align === 'right' && 'tabular-nums',
			column.valueClass
		);
	}

	function updateRow(row: T, rowKey: DataListRowKey, column: DataListColumn<T>, patch: Partial<T>) {
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

{#snippet rowActionMultibar(row: T, rowKey: DataListRowKey)}
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
	{#if showToolbar}
		<div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
			{#if showSearch}
				<div class="min-w-0 flex-1">
					<SearchInput
						id="{searchId}-search"
						value={query.search}
						placeholder={searchPlaceholder}
						onUpdate={(search) => updateQuery({ search }, true, 'search')}
					/>
				</div>
			{/if}

			<div class="flex flex-wrap items-center justify-between gap-2 lg:justify-end">
				{#if hasSortableColumns}
					<SortsInput
						{columns}
						value={query.sort}
						activeCount={query.sort.length}
						onUpdate={(sort) => updateQuery({ sort }, true, 'sort')}
					/>
				{/if}

				{#if hasFilters}
					<FiltersInput
						{filters}
						value={query.filters}
						activeCount={activeFilterCount}
						align="end"
						onUpdate={(nextFilters) => updateQuery({ filters: nextFilters }, true, 'filters')}
					/>
				{/if}

				{#if hasQuery}
					<button
						type="button"
						onclick={resetQuery}
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-md inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)]"
					>
						<X size={16} />
						Reset
					</button>
				{/if}
			</div>
		</div>
	{/if}

	<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 relative overflow-hidden border">
		{#if hasBatchActions}
			<div class="border-kl-base-300 bg-kl-base-200 border-b px-4 py-2">
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
								disabled={selectedCount === 0}
								onSelect={selectBatchAction}
								class="min-w-40"
							>
								<Trigger variant="outline" size="sm" disabled={selectedCount === 0}>
									<MoreHorizontal size={16} />
									Actions
								</Trigger>
							</Menu>
						{/if}

						<button
							type="button"
							disabled={selectedCount === 0}
							onclick={clearSelection}
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-sm inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
						>
							<X size={16} />
							Clear
						</button>
					</div>
				</div>
			</div>
		{/if}

		<ul role="list" class="divide-kl-base-300 divide-y">
			{#each data as row, index (getRowKey(row, index))}
				{@const selectionKey = getSelectionKey(row, index)}
				<li
					class="group/row hover:bg-kl-base-200/60 relative transition-colors duration-[var(--kl-transition-fast)]"
				>
					<div
						class="grid min-w-full items-center gap-x-4 gap-y-2 px-4 py-3"
						style:grid-template-columns={getRowGridTemplate()}
					>
						{#if hasBatchActions}
							<div class="flex items-center">
								<Checkbox
									label="Select row"
									class="[&>span]:sr-only"
									checked={isRowSelected(selectionKey)}
									onCheckedChange={(checked) => toggleRowSelection(row, selectionKey, checked)}
								/>
							</div>
						{/if}

						{#each visibleColumns as column (column.id)}
							{@const value = getCellValue(row, column)}
							{@const cell = column.cell}
							{@const media = column.media}
							<div class={getColumnClass(column)}>
								<div class="flex min-w-0 items-center gap-3">
									{#if media}
										<div class="shrink-0">
											{@render media(row, value, {
												column,
												rowKey: selectionKey,
												updateRow: (patch) => updateRow(row, selectionKey, column, patch)
											})}
										</div>
									{/if}

									<div class="min-w-0 flex-1">
										<div class={getValueClass(column)}>
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
										</div>
									</div>
								</div>
							</div>
						{/each}

						{#if hasRowActionColumn}
							<div class="flex items-center justify-end">
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
							</div>
						{/if}
					</div>

					{#if wrapColumn}
						{@const value = getCellValue(row, wrapColumn)}
						{@const cell = wrapColumn.cell}
						<div class="px-4 pb-4">
							<div
								class={cn(
									'text-kl-muted-content rounded-kl-field bg-kl-base-200/70 px-3 py-2 text-sm leading-6',
									wrapColumn.class
								)}
							>
								<div class={cn('min-w-0', getAlignClass(wrapColumn.align), wrapColumn.valueClass)}>
									{#if cell}
										{@render cell(row, value, {
											column: wrapColumn,
											rowKey: selectionKey,
											updateRow: (patch) => updateRow(row, selectionKey, wrapColumn, patch)
										})}
									{:else if wrapColumn.format}
										{wrapColumn.format(value, row)}
									{:else}
										{value}
									{/if}
								</div>
							</div>
						</div>
					{/if}

					{#if hasFloatingRowActions}
						{@render rowActionMultibar(row, selectionKey)}
					{/if}
				</li>
			{:else}
				<li class="text-kl-muted-content px-4 py-12 text-center text-sm">{emptyText}</li>
			{/each}
		</ul>

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

	{#if showPagination}
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
	{/if}
</div>
