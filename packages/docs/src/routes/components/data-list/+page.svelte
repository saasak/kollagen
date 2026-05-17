<script lang="ts">
	import {
		DataList,
		createDataListQuery,
		createDataListSelection,
		type DataListBatchAction,
		type DataListBatchActionPayload,
		type DataListCellContext,
		type DataListColumn,
		type DataListFilter,
		type DataListQuery,
		type DataListRowAction,
		type DataListSelection,
		type DataListUrlStateConfig
	} from '$ui/data-list';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Building2, Eye, Mail, MoreHorizontal } from 'lucide-svelte';

	type Account = {
		id: string;
		name: string;
		email: string;
		plan: 'Starter' | 'Growth' | 'Scale' | 'Enterprise';
		status: 'Active' | 'Paused' | 'Churned';
		owner: string;
		mrr: number;
		lastSeen: string;
		notes: string;
	};

	const accounts: Account[] = [
		{
			id: 'acc_101',
			name: 'Northstar Labs',
			email: 'ops@northstar.test',
			plan: 'Enterprise',
			status: 'Active',
			owner: 'Maya',
			mrr: 8400,
			lastSeen: '2026-05-14',
			notes:
				'Enterprise workspace with procurement review, security questionnaire, and rollout planning.'
		},
		{
			id: 'acc_102',
			name: 'Luma Health',
			email: 'finance@luma.test',
			plan: 'Scale',
			status: 'Active',
			owner: 'Noah',
			mrr: 4200,
			lastSeen: '2026-05-12',
			notes:
				'Expanding seats after billing consolidation. Finance contact asked for invoice previews.'
		},
		{
			id: 'acc_103',
			name: 'Atlas Supply',
			email: 'admin@atlas.test',
			plan: 'Growth',
			status: 'Paused',
			owner: 'Iris',
			mrr: 1900,
			lastSeen: '2026-05-08',
			notes: 'Paused during warehouse migration. Follow up when integration team reopens access.'
		},
		{
			id: 'acc_104',
			name: 'Kairo Studio',
			email: 'hello@kairo.test',
			plan: 'Starter',
			status: 'Active',
			owner: 'Maya',
			mrr: 290,
			lastSeen: '2026-05-16',
			notes: 'Trial converted from design partner account. Keep onboarding lightweight.'
		},
		{
			id: 'acc_105',
			name: 'Cedar Bank',
			email: 'risk@cedar.test',
			plan: 'Enterprise',
			status: 'Active',
			owner: 'Noah',
			mrr: 9700,
			lastSeen: '2026-05-10',
			notes: 'Risk team needs quarterly access exports and stricter workspace role defaults.'
		},
		{
			id: 'acc_106',
			name: 'Rune Retail',
			email: 'it@rune.test',
			plan: 'Growth',
			status: 'Churned',
			owner: 'Iris',
			mrr: 0,
			lastSeen: '2026-04-30',
			notes: 'Churned after POS migration. Preserve history for win-back review.'
		}
	];

	const columns: DataListColumn<Account>[] = [
		{
			id: 'name',
			label: 'Account',
			sortable: true,
			grow: true,
			media: accountMedia,
			cell: accountCell,
			valueClass: 'font-semibold'
		},
		{ id: 'plan', label: 'Plan', sortable: true },
		{ id: 'status', label: 'Status', sortable: true, cell: statusCell },
		{ id: 'owner', label: 'Owner', sortable: true },
		{
			id: 'mrr',
			label: 'MRR',
			sortable: true,
			align: 'right',
			format: (value) => `$${Number(value).toLocaleString()}`
		},
		{ id: 'lastSeen', label: 'Last seen', sortable: true, format: (value) => formatDate(value) },
		{ id: 'notes', label: 'Notes', wrap: true, cell: notesCell }
	];

	const compactColumns = columns.filter((column) =>
		['name', 'status', 'owner', 'mrr', 'notes'].includes(column.id)
	);

	const filters: DataListFilter[] = [
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
		{ id: 'owner', label: 'Owner', type: 'text', placeholder: 'Owner name' }
	];

	const pageSizeOptions = [3, 6, 12];
	const urlState = {
		prefix: 'accounts',
		defaults: { perPage: 3 },
		columns,
		filters,
		pageSizeOptions
	} satisfies DataListUrlStateConfig<Account>;

	let query: DataListQuery = $state(createDataListQuery(urlState.defaults));
	let compactQuery: DataListQuery = $state(createDataListQuery({ perPage: 3 }));
	let loadingQuery: DataListQuery = $state(createDataListQuery({ perPage: 3 }));
	let emptyQuery: DataListQuery = $state(createDataListQuery({ perPage: 3 }));
	let selection: DataListSelection = $state(createDataListSelection());
	let lastAction = $state('No action yet');

	const filteredRows = $derived(getRows(accounts, query));
	const pageRows = $derived(
		filteredRows.slice((query.page - 1) * query.perPage, query.page * query.perPage)
	);
	const lastQuery = $derived(JSON.stringify(query, null, 2));
	const lastSelection = $derived(JSON.stringify(selection, null, 2));

	const rowActions: DataListRowAction<Account>[] = [
		{
			id: 'open',
			label: 'Open',
			icon: openActionIcon,
			onSelect: (account) => (lastAction = `Open ${account.name}`)
		},
		{
			id: 'email',
			label: 'Email',
			icon: emailActionIcon,
			onSelect: (account) => (lastAction = `Email ${account.email}`)
		},
		{
			id: 'more',
			label: 'More',
			type: 'menu',
			icon: moreActionIcon,
			items: [
				{ label: 'Assign owner', value: 'assign' },
				{
					label: 'Mark at risk',
					value: 'risk',
					disabled: (account) => account.status === 'Churned'
				},
				{ type: 'separator' },
				{ label: 'Archive', value: 'archive' }
			],
			onSelect: (account, value) => (lastAction = `${value} ${account.name}`)
		}
	];

	const batchActions: DataListBatchAction<Account>[] = [
		{
			id: 'assign',
			label: 'Assign owner',
			onSelect: (payload) => describeBatchAction('Assign owner', payload)
		},
		{
			id: 'export',
			label: 'Export',
			onSelect: (payload) => describeBatchAction('Export', payload)
		}
	];

	const demoCode = `<DataList
  data={pageRows}
  columns={columns}
  totalCount={filteredRows.length}
  rowKey="id"
  bind:query
  bind:selection
  {filters}
  {urlState}
  {rowActions}
  {batchActions}
/>`;

	const urlStateCode = `import { createDataListQueryFromUrl } from '$ui/data-list';

const tableState = {
  prefix: 'accounts',
  defaults: { perPage: 3 },
  columns,
  filters,
  pageSizeOptions: [3, 6, 12]
};

const query = createDataListQueryFromUrl(url, tableState);`;

	const propsData = [
		{
			name: 'data',
			type: 'T[]',
			default: '-',
			description: 'Rows for the current page.'
		},
		{
			name: 'columns',
			type: 'DataListColumn<T>[]',
			default: '-',
			description:
				'Column configs. Supports accessor, formatting, custom cells, media, sorting, grow, and wrap.'
		},
		{
			name: 'query',
			type: 'DataListQuery',
			default: 'createDataListQuery()',
			description: 'Controlled search, filter, sort, page, and page size state.'
		},
		{
			name: 'selection',
			type: 'DataListSelection',
			default: 'createDataListSelection()',
			description: 'Controlled selected row state.'
		},
		{
			name: 'urlState',
			type: 'DataListUrlStateConfig<T>',
			default: 'undefined',
			description: 'Serializes query state into prefixed URL search params.'
		},
		{
			name: 'rowActions',
			type: 'DataListRowAction<T>[]',
			default: '[]',
			description: 'Per-row actions rendered as a menu, action bar, or floating action bar.'
		},
		{
			name: 'batchActions',
			type: 'DataListBatchAction<T>[]',
			default: '[]',
			description: 'Enables row selection and renders batch actions for the current selection.'
		},
		{
			name: 'showSearch',
			type: 'boolean',
			default: 'true',
			description: 'Shows or hides the SearchInput toolbar control.'
		},
		{
			name: 'showPagination',
			type: 'boolean',
			default: 'true',
			description: 'Shows or hides the pagination footer.'
		}
	];

	function handleQueryChange(nextQuery: DataListQuery) {
		lastAction = `Query changed: page ${nextQuery.page}`;
	}

	function handleSelectionChange(nextSelection: DataListSelection) {
		if (nextSelection.mode === 'all') {
			lastAction = 'Selection changed: all rows';
			return;
		}
		lastAction = `Selection changed: ${nextSelection.keys.length} rows`;
	}

	function describeBatchAction(label: string, payload: DataListBatchActionPayload<Account>) {
		lastAction =
			payload.mode === 'all'
				? `${label}: all ${payload.totalCount} accounts`
				: `${label}: ${payload.rowKeys.length} accounts`;
	}

	function getRows(rows: Account[], currentQuery: DataListQuery) {
		const search = currentQuery.search.trim().toLowerCase();
		let nextRows = rows.filter((account) => {
			const matchesSearch =
				!search ||
				[account.name, account.email, account.plan, account.status, account.owner]
					.join(' ')
					.toLowerCase()
					.includes(search);
			const statuses = currentQuery.filters.status;
			const matchesStatus =
				!Array.isArray(statuses) || statuses.length === 0 || statuses.includes(account.status);
			const plan = currentQuery.filters.plan;
			const matchesPlan = !plan || account.plan === plan;
			const owner = String(currentQuery.filters.owner ?? '')
				.trim()
				.toLowerCase();
			const matchesOwner = !owner || account.owner.toLowerCase().includes(owner);

			return matchesSearch && matchesStatus && matchesPlan && matchesOwner;
		});

		for (const sort of [...currentQuery.sort].reverse()) {
			nextRows = [...nextRows].sort((a, b) => {
				const first = String(a[sort.id as keyof Account] ?? '');
				const second = String(b[sort.id as keyof Account] ?? '');
				return sort.direction === 'asc'
					? first.localeCompare(second, undefined, { numeric: true })
					: second.localeCompare(first, undefined, { numeric: true });
			});
		}

		return nextRows;
	}

	function formatDate(value: unknown) {
		return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(
			new Date(String(value))
		);
	}
</script>

{#snippet accountMedia(_row: Account, _value: unknown, _context: DataListCellContext<Account>)}
	<div
		class="bg-kl-primary text-kl-primary-content rounded-kl-selector flex size-10 items-center justify-center"
		aria-hidden="true"
	>
		<Building2 size={18} />
	</div>
{/snippet}

{#snippet accountCell(row: Account)}
	<div class="min-w-0">
		<div class="truncate">{row.name}</div>
		<div class="text-kl-muted-content truncate text-xs font-normal">{row.email}</div>
	</div>
{/snippet}

{#snippet statusCell(_row: Account, value: unknown)}
	<span
		class="rounded-kl-selector inline-flex items-center px-2 py-0.5 text-xs font-medium {value ===
		'Active'
			? 'bg-kl-success text-kl-success-content'
			: value === 'Paused'
				? 'bg-kl-warning text-kl-warning-content'
				: 'bg-kl-muted text-kl-muted-content'}"
	>
		{value}
	</span>
{/snippet}

{#snippet notesCell(_row: Account, value: unknown)}
	<span>{value}</span>
{/snippet}

{#snippet openActionIcon(_row: Account)}
	<Eye size={16} />
{/snippet}

{#snippet emailActionIcon(_row: Account)}
	<Mail size={16} />
{/snippet}

{#snippet moreActionIcon(_row: Account)}
	<MoreHorizontal size={16} />
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">DataList</h1>
		<p class="text-kl-muted-content mt-2">
			DataTable-compatible list view rendered with semantic ul/li rows and a DaisyUI-style wrap
			column.
		</p>
	</div>

	<section class="space-y-4">
		<div class="max-w-3xl space-y-3">
			<h2 class="text-xl font-semibold">State, URL, and layout</h2>
			<p class="text-kl-muted-content text-sm leading-6">
				DataList uses the same controlled query, filters, sorting, selection, actions, pagination,
				and URL-state model as DataTable. Sorting is handled by the standalone
				<code class="font-mono">SortsInput</code>. Columns can opt into
				<code class="font-mono">grow</code> to fill available space or
				<code class="font-mono">wrap</code> to render below the row grid.
			</p>
		</div>

		<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
			<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">
				Parse before loading rows
			</div>
			<pre class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{urlStateCode}</pre>
		</div>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Server-controlled"
			description="Search, filters, sorting, selection, row actions, batch actions, URL state, and a wrapped notes column."
			code={demoCode}
		>
			<div class="space-y-4">
				<DataList
					data={pageRows}
					{columns}
					{filters}
					totalCount={filteredRows.length}
					rowKey="id"
					bind:query
					bind:selection
					{urlState}
					{rowActions}
					{batchActions}
					onQueryChange={handleQueryChange}
					onSelectionChange={handleSelectionChange}
					searchPlaceholder="Search accounts..."
					{pageSizeOptions}
				/>

				<div class="grid gap-4 md:grid-cols-3">
					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
						<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">Query</div>
						<pre
							class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{lastQuery}</pre>
					</div>
					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
						<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">Selection</div>
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
			title="Compact action bar"
			description="Use the same row action model as DataTable, but keep the visual density of a list."
			code={`<DataList
  data={accounts.slice(0, 3)}
  columns={compactColumns}
  totalCount={3}
  rowKey="id"
  rowActionsVariant="bar"
/>`}
		>
			<DataList
				data={accounts.slice(0, 3)}
				columns={compactColumns}
				totalCount={3}
				rowKey="id"
				bind:query={compactQuery}
				{rowActions}
				rowActionsVariant="bar"
				pageSizeOptions={[3]}
			/>
		</DemoCard>

		<DemoCard
			title="Loading state"
			description="Keep the list frame visible while the server query is pending."
			code={`<DataList data={accounts.slice(0, 3)} {columns} totalCount={6} loading />`}
		>
			<DataList
				data={accounts.slice(0, 3)}
				{columns}
				totalCount={6}
				rowKey="id"
				bind:query={loadingQuery}
				loading
				pageSizeOptions={[3]}
			/>
		</DemoCard>

		<DemoCard
			title="Empty state"
			description="Customize the no-results message for filtered list views."
			code={`<DataList data={[]} {columns} totalCount={0} emptyText="No accounts match this segment" />`}
		>
			<DataList
				data={[]}
				{columns}
				totalCount={0}
				rowKey="id"
				bind:query={emptyQuery}
				emptyText="No accounts match this segment"
				pageSizeOptions={[3]}
			/>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
