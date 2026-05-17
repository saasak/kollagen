<script lang="ts">
	import {
		DataTable,
		createDataTableQuery,
		createDataTableQueryFromUrl,
		createDataTableSelection,
		type DataTableBatchAction,
		type DataTableBatchActionPayload,
		type DataTableCellContext,
		type DataTableColumn,
		type DataTableDateRangeValue,
		type DataTableFilter,
		type DataTableNumberRangeValue,
		type DataTableQuery,
		type DataTableRowAction,
		type DataTableSelection,
		type DataTableRowUpdatePayload,
		type DataTableTimeRangeValue,
		type DataTableUrlStateConfig
	} from '$ui/data-table';
	import { Editable } from '$ui/editable';
	import { page } from '$app/state';
	import { FiltersInput, type FiltersInputValues } from '$ui/filters-input';
	import { SearchInput } from '$ui/search-input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Eye, PauseCircle } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

	type Customer = {
		id: string;
		customer: string;
		email: string;
		plan: 'Starter' | 'Growth' | 'Scale' | 'Enterprise';
		status: 'Active' | 'Paused' | 'Churned';
		owner: string;
		trial: boolean;
		mrr: number;
		createdAt: string;
		lastContactTime: string;
		supportWindow: string;
	};

	let customers: Customer[] = $state([
		{
			id: 'cus_101',
			customer: 'Northstar Labs',
			email: 'ops@northstar.test',
			plan: 'Enterprise',
			status: 'Active',
			owner: 'Maya',
			trial: false,
			mrr: 8400,
			createdAt: '2026-01-08',
			lastContactTime: '09:15',
			supportWindow: '08:00-16:00'
		},
		{
			id: 'cus_102',
			customer: 'Luma Health',
			email: 'finance@luma.test',
			plan: 'Scale',
			status: 'Active',
			owner: 'Noah',
			trial: false,
			mrr: 4200,
			createdAt: '2026-01-14',
			lastContactTime: '10:30',
			supportWindow: '09:00-17:00'
		},
		{
			id: 'cus_103',
			customer: 'Atlas Supply',
			email: 'admin@atlas.test',
			plan: 'Growth',
			status: 'Paused',
			owner: 'Iris',
			trial: false,
			mrr: 1900,
			createdAt: '2026-02-03',
			lastContactTime: '15:45',
			supportWindow: '13:00-21:00'
		},
		{
			id: 'cus_104',
			customer: 'Kairo Studio',
			email: 'hello@kairo.test',
			plan: 'Starter',
			status: 'Active',
			owner: 'Maya',
			trial: true,
			mrr: 290,
			createdAt: '2026-02-20',
			lastContactTime: '08:20',
			supportWindow: '08:00-12:00'
		},
		{
			id: 'cus_105',
			customer: 'Cedar Bank',
			email: 'risk@cedar.test',
			plan: 'Enterprise',
			status: 'Active',
			owner: 'Noah',
			trial: false,
			mrr: 9700,
			createdAt: '2026-03-02',
			lastContactTime: '11:05',
			supportWindow: '10:00-18:00'
		},
		{
			id: 'cus_106',
			customer: 'Rune Retail',
			email: 'it@rune.test',
			plan: 'Growth',
			status: 'Churned',
			owner: 'Iris',
			trial: false,
			mrr: 0,
			createdAt: '2026-03-11',
			lastContactTime: '16:50',
			supportWindow: '14:00-22:00'
		},
		{
			id: 'cus_107',
			customer: 'Vector Works',
			email: 'platform@vector.test',
			plan: 'Scale',
			status: 'Active',
			owner: 'Maya',
			trial: false,
			mrr: 5100,
			createdAt: '2026-03-28',
			lastContactTime: '13:10',
			supportWindow: '12:00-20:00'
		},
		{
			id: 'cus_108',
			customer: 'Orbit Foods',
			email: 'ops@orbit.test',
			plan: 'Starter',
			status: 'Paused',
			owner: 'Noah',
			trial: true,
			mrr: 490,
			createdAt: '2026-04-05',
			lastContactTime: '07:55',
			supportWindow: '07:00-15:00'
		},
		{
			id: 'cus_109',
			customer: 'Prism Energy',
			email: 'data@prism.test',
			plan: 'Enterprise',
			status: 'Active',
			owner: 'Iris',
			trial: false,
			mrr: 11200,
			createdAt: '2026-04-18',
			lastContactTime: '18:25',
			supportWindow: '16:00-23:00'
		}
	]);

	const columns: DataTableColumn<Customer>[] = [
		{ id: 'customer', label: 'Customer', sortable: true },
		{ id: 'plan', label: 'Plan', sortable: true },
		{ id: 'status', label: 'Status', sortable: true },
		{ id: 'owner', label: 'Owner', sortable: true },
		{
			id: 'mrr',
			label: 'MRR',
			sortable: true,
			align: 'right',
			format: (value) => `$${Number(value).toLocaleString()}`
		},
		{ id: 'createdAt', label: 'Created', sortable: true },
		{ id: 'lastContactTime', label: 'Contacted', sortable: true },
		{ id: 'supportWindow', label: 'Support', sortable: true }
	];

	const filters: DataTableFilter[] = [
		{
			id: 'status',
			label: 'Status',
			type: 'multi-select',
			values: [
				{ label: 'Active', value: 'Active' },
				{ label: 'Paused', value: 'Paused' },
				{ label: 'Churned', value: 'Churned' }
			]
		},
		{
			id: 'plan',
			label: 'Plan',
			type: 'select',
			values: [
				{ label: 'Starter', value: 'Starter' },
				{ label: 'Growth', value: 'Growth' },
				{ label: 'Scale', value: 'Scale' },
				{ label: 'Enterprise', value: 'Enterprise' }
			]
		},
		{ id: 'owner', label: 'Owner', type: 'text', placeholder: 'Owner name' },
		{ id: 'trial', label: 'Trial', type: 'boolean', trueLabel: 'Trial', falseLabel: 'Paid' },
		{ id: 'mrr', label: 'MRR', type: 'number-range' },
		{ id: 'createdAt', label: 'Created', type: 'date-range' },
		{ id: 'lastContactTime', label: 'Contacted after', type: 'time', hourCycle: 24 },
		{ id: 'supportWindow', label: 'Support window', type: 'time-range', hourCycle: 24 }
	];

	const tablePageSizeOptions = [5, 10, 20];
	const tableUrlState = {
		prefix: 'customers',
		defaults: { perPage: 5 },
		columns,
		filters,
		pageSizeOptions: tablePageSizeOptions
	} satisfies DataTableUrlStateConfig<Customer>;
	const initialQuery = createDataTableQueryFromUrl(page.url, tableUrlState);
	let query: DataTableQuery = $state(initialQuery);
	let simpleQuery: DataTableQuery = $state(createDataTableQuery({ perPage: 3 }));
	let actionBarQuery: DataTableQuery = $state(createDataTableQuery({ perPage: 3 }));
	let floatingActionsQuery: DataTableQuery = $state(createDataTableQuery({ perPage: 3 }));
	let loadingQuery: DataTableQuery = $state(createDataTableQuery({ perPage: 3 }));
	let emptyQuery: DataTableQuery = $state(createDataTableQuery({ perPage: 3 }));
	let selection: DataTableSelection = $state(createDataTableSelection());
	let standaloneSearch = $state('');
	let standaloneFilters: FiltersInputValues = $state({});
	let loading = $state(false);
	let lastQuery = $state(JSON.stringify(initialQuery, null, 2));
	let lastSelection = $state('No rows selected');
	let lastAction = $state('No action called');
	let loadingTimer: ReturnType<typeof setTimeout> | undefined;
	const standaloneFiltersJson = $derived(JSON.stringify(standaloneFilters, null, 2));

	const rowActions: DataTableRowAction<Customer>[] = [
		{
			id: 'open',
			label: 'Open customer',
			onSelect: (row) => {
				lastAction = `Open ${row.customer}`;
			}
		},
		{
			id: 'pause',
			label: 'Pause account',
			disabled: (row) => row.status !== 'Active',
			onSelect: (row) => {
				lastAction = `Pause ${row.customer}`;
			}
		}
	];

	const batchActions: DataTableBatchAction<Customer>[] = [
		{
			id: 'export',
			label: 'Export selection',
			onSelect: (payload) => {
				lastAction = describeBatchAction('Export', payload);
			}
		},
		{
			id: 'assign',
			label: 'Assign owner',
			onSelect: (payload) => {
				lastAction = describeBatchAction('Assign owner', payload);
			}
		}
	];

	const demoCode = `import { page } from '$app/state';
import { DataTable, createDataTableQueryFromUrl } from '$ui/data-table';

const tableState = {
  prefix: 'customers',
  defaults: { perPage: 5 },
  columns,
  filters,
  pageSizeOptions: [5, 10, 20]
};

let query = $state(createDataTableQueryFromUrl(page.url, tableState));

{#snippet ownerCell(_row, value, { updateRow })}
  <Editable
    value={String(value)}
    submitMode="blur"
    onValueChange={({ value }) => updateRow({ owner: value })}
  />
{/snippet}

{#snippet openIcon(_row)}<Eye />{/snippet}
{#snippet pauseIcon(_row)}<PauseCircle />{/snippet}

<DataTable
  data={rows}
  columns={columns}
  filters={filters}
  selectable
  batchActions={batchActions}
  totalCount={total}
  bind:query
  bind:selection
  urlState={tableState}
  rowActions={getRowActionsWithIcons(openIcon, pauseIcon)}
  onQueryChange={fetchRows}
  onRowUpdate={({ rowKey, patch }) => updateCustomer(rowKey, patch)}
  cellSnippets={{ owner: ownerCell }}
/>`;

	const actionBarCode = `<DataTable
  data={rows}
  {columns}
  totalCount={total}
  rowActions={rowActions}
  rowActionsVariant="bar"
  rowActionsSize="sm"
/>`;

	const floatingActionsCode = `<DataTable
  data={rows}
  {columns}
  totalCount={total}
  rowActions={rowActions}
  rowActionsVariant="floating-bar"
  rowActionsSize="xs"
/>`;

	const standaloneInputsCode = `<SearchInput
  bind:value={search}
  placeholder="Search customers..."
/>

<FiltersInput
  filters={filters}
  bind:value={activeFilters}
/>`;

	const urlStateCode = `// shared table-state.ts
export const tableState = {
  prefix: 'customers',
  defaults: { perPage: 25 },
  columns,
  filters,
  pageSizeOptions: [25, 50, 100]
};

// +page.server.ts or +page.ts
import { createDataTableQueryFromUrl } from '$lib/components/data-table/url-state';
import { tableState } from './table-state';

export const load = async ({ url }) => {
  const query = createDataTableQueryFromUrl(url, tableState);
  const { rows, total } = await getCustomers(query);

  return { query, rows, total };
};`;

	onDestroy(() => {
		if (loadingTimer) clearTimeout(loadingTimer);
	});

	const filteredRows = $derived.by(() => {
		let rows = customers.filter((customer) => matchesSearch(customer, query.search));

		const status = query.filters.status;
		if (Array.isArray(status) && status.length > 0) {
			rows = rows.filter((customer) => status.includes(customer.status));
		}

		const plan = query.filters.plan;
		if (typeof plan === 'string' && plan) {
			rows = rows.filter((customer) => customer.plan === plan);
		}

		const owner = query.filters.owner;
		if (typeof owner === 'string' && owner) {
			rows = rows.filter((customer) => customer.owner.toLowerCase().includes(owner.toLowerCase()));
		}

		const trial = query.filters.trial;
		if (typeof trial === 'boolean') {
			rows = rows.filter((customer) => customer.trial === trial);
		}

		const mrr = query.filters.mrr as DataTableNumberRangeValue | undefined;
		if (mrr?.min !== undefined) rows = rows.filter((customer) => customer.mrr >= mrr.min!);
		if (mrr?.max !== undefined) rows = rows.filter((customer) => customer.mrr <= mrr.max!);

		const createdAt = query.filters.createdAt as DataTableDateRangeValue | undefined;
		if (createdAt?.from) rows = rows.filter((customer) => customer.createdAt >= createdAt.from!);
		if (createdAt?.to) rows = rows.filter((customer) => customer.createdAt <= createdAt.to!);

		const lastContactTime = query.filters.lastContactTime;
		if (typeof lastContactTime === 'string' && lastContactTime) {
			rows = rows.filter((customer) => customer.lastContactTime >= lastContactTime);
		}

		const supportWindow = query.filters.supportWindow as DataTableTimeRangeValue | undefined;
		if (supportWindow?.from) {
			rows = rows.filter(
				(customer) => getRangeStart(customer.supportWindow) >= supportWindow.from!
			);
		}
		if (supportWindow?.to) {
			rows = rows.filter((customer) => getRangeEnd(customer.supportWindow) <= supportWindow.to!);
		}

		if (query.sort.length > 0) {
			rows = [...rows].sort((a, b) => {
				for (const sort of query.sort) {
					const direction = sort.direction === 'asc' ? 1 : -1;
					const aValue = a[sort.id as keyof Customer];
					const bValue = b[sort.id as keyof Customer];
					if (aValue < bValue) return -1 * direction;
					if (aValue > bValue) return 1 * direction;
				}
				return 0;
			});
		}

		return rows;
	});

	const pageRows = $derived(
		filteredRows.slice((query.page - 1) * query.perPage, query.page * query.perPage)
	);

	const propsData = [
		{ name: 'data', type: 'T[]', default: '-', description: 'Rows to render' },
		{
			name: 'columns',
			type: 'DataTableColumn<T>[]',
			default: '-',
			description: 'Declarative column definitions. Each column can define a cell snippet'
		},
		{
			name: 'totalCount',
			type: 'number',
			default: '-',
			description: 'Total row count for pagination'
		},
		{
			name: 'filters',
			type: 'DataTableFilter[]',
			default: '[]',
			description: 'Searchable filter declaration'
		},
		{
			name: 'query',
			type: 'DataTableQuery',
			default: 'page 1, 10 rows',
			description: 'Controlled query state. Supports bind:query'
		},
		{
			name: 'onQueryChange',
			type: '(query) => void',
			default: '-',
			description: 'Called with the full query after every change'
		},
		{
			name: 'urlState',
			type: 'DataTableUrlStateConfig',
			default: '-',
			description:
				'Serializes query state into prefixed URL search params. Reuse it with createDataTableQueryFromUrl for initial data.'
		},
		{
			name: 'rowKey',
			type: 'keyof T | function',
			default: 'row index',
			description: 'Stable key for each rendered row. Required for cross-page selection'
		},
		{
			name: 'selectable',
			type: 'boolean',
			default: 'false',
			description: 'Adds row checkboxes, page selection, and all-results selection'
		},
		{
			name: 'selection',
			type: 'DataTableSelection',
			default: 'empty selection',
			description: 'Controlled selection state. Supports bind:selection'
		},
		{
			name: 'rowActions',
			type: 'DataTableRowAction<T>[]',
			default: '[]',
			description:
				'Per-row actions. Each action receives the full row and can define an icon snippet'
		},
		{
			name: 'rowActionsVariant',
			type: "'menu' | 'bar' | 'floating-bar'",
			default: "'menu'",
			description: 'Controls whether row actions render as a dropdown, always-on bar, or hover bar'
		},
		{
			name: 'rowActionsSize',
			type: "'xs' | 'sm'",
			default: "'xs'",
			description: 'Controls row action button size when rendered as a bar'
		},
		{
			name: 'batchActions',
			type: 'DataTableBatchAction<T>[]',
			default: '[]',
			description: 'Selection menu actions. Receives selected rows or all + current query'
		},
		{
			name: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Shows a loading overlay'
		},
		{
			name: 'cellSnippets',
			type: 'Record<string, Snippet>',
			default: '{}',
			description:
				'Custom cell snippets by column id. Snippets receive row, value, and a cell context with updateRow'
		},
		{
			name: 'onRowUpdate',
			type: '(payload) => void',
			default: '-',
			description: 'Called when a cell snippet submits a row patch through updateRow'
		}
	];

	function matchesSearch(customer: Customer, search: string) {
		if (!search) return true;
		const value = search.toLowerCase();
		return [customer.customer, customer.email, customer.plan, customer.status, customer.owner].some(
			(field) => field.toLowerCase().includes(value)
		);
	}

	function getRangeStart(value: string) {
		return value.split('-')[0] ?? '';
	}

	function getRangeEnd(value: string) {
		return value.split('-')[1] ?? '';
	}

	function handleQueryChange(nextQuery: DataTableQuery) {
		lastQuery = JSON.stringify(nextQuery, null, 2);
		loading = true;
		if (loadingTimer) clearTimeout(loadingTimer);
		loadingTimer = setTimeout(() => {
			loading = false;
		}, 220);
	}

	function handleSelectionChange(nextSelection: DataTableSelection) {
		lastSelection = JSON.stringify(nextSelection, null, 2);
	}

	function describeBatchAction(label: string, payload: DataTableBatchActionPayload<Customer>) {
		if (payload.mode === 'all') {
			return `${label}: all ${payload.totalCount} matching rows (${payload.excludedRowKeys.length} excluded)`;
		}

		return `${label}: ${payload.rows.map((row) => row.customer).join(', ') || 'no loaded row'}`;
	}

	function handleRowUpdate(payload: DataTableRowUpdatePayload<Customer>) {
		customers = customers.map((customer) =>
			customer.id === payload.rowKey ? { ...customer, ...payload.patch } : customer
		);
		lastAction = `Updated ${payload.column.label} for ${payload.row.customer}`;
	}

	function getRowActionsWithIcons(
		openIcon: DataTableRowAction<Customer>['icon'],
		pauseIcon: DataTableRowAction<Customer>['icon']
	) {
		return rowActions.map((action) => ({
			...action,
			icon: action.id === 'open' ? openIcon : action.id === 'pause' ? pauseIcon : action.icon
		}));
	}
</script>

{#snippet customerCell(row: Customer, value: unknown)}
	<div>
		<div class="text-kl-base-content font-medium">{value}</div>
		<div class="text-kl-muted-content text-xs">{row.email}</div>
	</div>
{/snippet}

{#snippet statusCell(_row: Customer, value: unknown)}
	<span
		class="rounded-kl-selector inline-flex items-center px-2 py-1 text-xs font-medium {value ===
		'Active'
			? 'bg-kl-success text-kl-success-content'
			: value === 'Paused'
				? 'bg-kl-warning text-kl-warning-content'
				: 'bg-kl-error text-kl-error-content'}"
	>
		{value}
	</span>
{/snippet}

{#snippet mrrCell(_row: Customer, value: unknown)}
	<span class="font-mono tabular-nums">${Number(value).toLocaleString()}</span>
{/snippet}

{#snippet ownerCell(_row: Customer, value: unknown, { updateRow }: DataTableCellContext<Customer>)}
	<Editable
		value={String(value)}
		submitMode="blur"
		class="min-w-32"
		onValueChange={({ value }) => updateRow({ owner: value })}
	/>
{/snippet}

{#snippet openActionIcon(_row: Customer)}
	<Eye size={14} />
{/snippet}

{#snippet pauseActionIcon(_row: Customer)}
	<PauseCircle size={14} />
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">DataTable</h1>
		<p class="text-kl-muted-content mt-2">
			Server-controlled data table with search, filters, sorting, custom cells, and pagination.
		</p>
	</div>

	<section class="space-y-4">
		<div class="max-w-3xl space-y-3">
			<h2 class="text-xl font-semibold">State, URL, and data loading</h2>
			<p class="text-kl-muted-content text-sm leading-6">
				DataTable is a controlled component. It renders the rows you pass in, exposes the current
				query through <code class="font-mono">bind:query</code>, and emits
				<code class="font-mono">onQueryChange</code> when search, filters, sort, page, or page size changes.
			</p>
			<p class="text-kl-muted-content text-sm leading-6">
				When URL state is enabled, keep one shared config for the table and reuse it everywhere:
				initial load, client rendering, and the DataTable itself. The helper reads prefixed search
				params, applies defaults, validates filters and sort ids, and returns the exact query that
				should be used to fetch or compute the first page of rows.
			</p>
		</div>

		<div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
			<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
				<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">
					Parse before loading rows
				</div>
				<pre
					class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{urlStateCode}</pre>
			</div>

			<div class="space-y-3 text-sm leading-6">
				<p class="text-kl-muted-content">
					Use <code class="font-mono">prefix</code> when multiple tables share a page, for example
					<code class="font-mono">customers_page</code> and
					<code class="font-mono">invoices_page</code>.
				</p>
				<p class="text-kl-muted-content">
					DataTable does not fetch by itself. <code class="font-mono">onQueryChange</code> can call your
					API directly, invalidate a SvelteKit load, or update local derived rows.
				</p>
				<p class="text-kl-muted-content">
					The initial rows should already match the parsed query. DataTable will not emit a
					mount-time correction just to sync the URL, which avoids an unnecessary second query.
				</p>
			</div>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Server-controlled"
			description="The table emits query state while the parent owns filtering, sorting, and pagination."
			code={demoCode}
		>
			<div class="space-y-4">
				<DataTable
					data={pageRows}
					{columns}
					{filters}
					totalCount={filteredRows.length}
					rowKey="id"
					bind:query
					bind:selection
					urlState={tableUrlState}
					selectable
					rowActions={getRowActionsWithIcons(openActionIcon, pauseActionIcon)}
					{batchActions}
					{loading}
					onQueryChange={handleQueryChange}
					onSelectionChange={handleSelectionChange}
					onRowUpdate={handleRowUpdate}
					searchPlaceholder="Search customers..."
					pageSizeOptions={tablePageSizeOptions}
					cellSnippets={{
						customer: customerCell,
						status: statusCell,
						owner: ownerCell,
						mrr: mrrCell
					}}
				/>

				<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
					<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">Current query</div>
					<pre class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{lastQuery}</pre>
				</div>

				<div class="grid gap-4 md:grid-cols-2">
					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
						<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">
							Current selection
						</div>
						<pre
							class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{lastSelection}</pre>
					</div>

					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
						<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">Last action</div>
						<pre
							class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{lastAction}</pre>
					</div>
				</div>
			</div>
		</DemoCard>

		<DemoCard
			title="Always-on row actions"
			description="Render row actions as a compact multibar in the final column."
			code={actionBarCode}
		>
			<DataTable
				data={customers.slice(0, 3)}
				columns={columns.slice(0, 4)}
				totalCount={3}
				bind:query={actionBarQuery}
				rowKey="id"
				rowActions={getRowActionsWithIcons(openActionIcon, pauseActionIcon)}
				rowActionsVariant="bar"
				rowActionsSize="sm"
				pageSizeOptions={[3]}
			/>
		</DemoCard>

		<DemoCard
			title="Floating row actions"
			description="Reveal row actions as an overlay on hover or keyboard focus."
			code={floatingActionsCode}
		>
			<DataTable
				data={customers.slice(0, 3)}
				columns={columns.slice(0, 4)}
				totalCount={3}
				bind:query={floatingActionsQuery}
				rowKey="id"
				rowActions={getRowActionsWithIcons(openActionIcon, pauseActionIcon)}
				rowActionsVariant="floating-bar"
				pageSizeOptions={[3]}
			/>
		</DemoCard>

		<DemoCard
			title="Standalone inputs"
			description="SearchInput and FiltersInput can be composed without DataTable."
			code={standaloneInputsCode}
		>
			<div class="space-y-4">
				<div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
					<SearchInput bind:value={standaloneSearch} placeholder="Search customers..." />
					<FiltersInput filters={filters.slice(0, 4)} bind:value={standaloneFilters} />
				</div>

				<div class="grid gap-4 md:grid-cols-2">
					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
						<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">
							Search value
						</div>
						<pre
							class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{standaloneSearch ||
								'No search'}</pre>
					</div>

					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
						<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">
							Filters JSON
						</div>
						<pre
							class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{standaloneFiltersJson}</pre>
					</div>
				</div>
			</div>
		</DemoCard>

		<DemoCard
			title="Read-only table"
			description="Use the same component without filters, selection, or row actions."
			code={`<DataTable
  data={customers.slice(0, 3)}
  columns={columns.slice(0, 4)}
  totalCount={3}
  bind:query={simpleQuery}
/>`}
		>
			<DataTable
				data={customers.slice(0, 3)}
				columns={columns.slice(0, 4)}
				totalCount={3}
				bind:query={simpleQuery}
				rowKey="id"
				pageSizeOptions={[3]}
			/>
		</DemoCard>

		<DemoCard
			title="Loading state"
			description="Keep the table shape visible while a server query is pending."
			code={`<DataTable
  data={customers.slice(0, 3)}
  {columns}
  totalCount={9}
  loading
/>`}
		>
			<DataTable
				data={customers.slice(0, 3)}
				columns={columns.slice(0, 4)}
				totalCount={9}
				bind:query={loadingQuery}
				rowKey="id"
				loading
				pageSizeOptions={[3]}
			/>
		</DemoCard>

		<DemoCard
			title="Empty state"
			description="Customize the no-results message for filtered tables."
			code={`<DataTable
  data={[]}
  {columns}
  totalCount={0}
  emptyText="No customers match this segment"
/>`}
		>
			<DataTable
				data={[]}
				columns={columns.slice(0, 4)}
				totalCount={0}
				bind:query={emptyQuery}
				rowKey="id"
				emptyText="No customers match this segment"
				pageSizeOptions={[3]}
			/>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
