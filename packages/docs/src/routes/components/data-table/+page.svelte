<script lang="ts">
	import {
		DataTable,
		createDataTableQuery,
		createDataTableSelection,
		type DataTableBatchAction,
		type DataTableBatchActionPayload,
		type DataTableColumn,
		type DataTableDateRangeValue,
		type DataTableFilter,
		type DataTableNumberRangeValue,
		type DataTableQuery,
		type DataTableRowAction,
		type DataTableSelection
	} from '$ui/data-table';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
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
	};

	const customers: Customer[] = [
		{
			id: 'cus_101',
			customer: 'Northstar Labs',
			email: 'ops@northstar.test',
			plan: 'Enterprise',
			status: 'Active',
			owner: 'Maya',
			trial: false,
			mrr: 8400,
			createdAt: '2026-01-08'
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
			createdAt: '2026-01-14'
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
			createdAt: '2026-02-03'
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
			createdAt: '2026-02-20'
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
			createdAt: '2026-03-02'
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
			createdAt: '2026-03-11'
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
			createdAt: '2026-03-28'
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
			createdAt: '2026-04-05'
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
			createdAt: '2026-04-18'
		}
	];

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
		{ id: 'createdAt', label: 'Created', sortable: true }
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
		{ id: 'createdAt', label: 'Created', type: 'date-range' }
	];

	const initialQuery = createDataTableQuery({ perPage: 5 });
	let query: DataTableQuery = $state(initialQuery);
	let selection: DataTableSelection = $state(createDataTableSelection());
	let loading = $state(false);
	let lastQuery = $state(JSON.stringify(initialQuery, null, 2));
	let lastSelection = $state('No rows selected');
	let lastAction = $state('No action called');
	let loadingTimer: ReturnType<typeof setTimeout> | undefined;

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

	const demoCode = `<DataTable
  data={rows}
  columns={columns}
  filters={filters}
  selectable
  rowActions={rowActions}
  batchActions={batchActions}
  totalCount={total}
  bind:query
  bind:selection
  onQueryChange={fetchRows}
/>`;

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

		if (query.sort) {
			const direction = query.sort.direction === 'asc' ? 1 : -1;
			rows = [...rows].sort((a, b) => {
				const aValue = a[query.sort!.id as keyof Customer];
				const bValue = b[query.sort!.id as keyof Customer];
				if (aValue < bValue) return -1 * direction;
				if (aValue > bValue) return 1 * direction;
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
			description: 'Per-row menu actions. Each action receives the full row'
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
			description: 'Custom cell snippets by column id'
		}
	];

	function matchesSearch(customer: Customer, search: string) {
		if (!search) return true;
		const value = search.toLowerCase();
		return [customer.customer, customer.email, customer.plan, customer.status, customer.owner].some(
			(field) => field.toLowerCase().includes(value)
		);
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

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">DataTable</h1>
		<p class="text-kl-muted-content mt-2">
			Server-controlled data table with search, filters, sorting, custom cells, and pagination.
		</p>
	</div>

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
					selectable
					{rowActions}
					{batchActions}
					{loading}
					onQueryChange={handleQueryChange}
					onSelectionChange={handleSelectionChange}
					searchPlaceholder="Search customers..."
					pageSizeOptions={[5, 10, 20]}
					cellSnippets={{
						customer: customerCell,
						status: statusCell,
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
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
