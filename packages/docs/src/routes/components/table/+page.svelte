<script lang="ts">
	import { Badge } from '$ui/badge';
	import { Table, type TableCellContext, type TableColumn } from '$ui/table';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	type Invoice = {
		id: string;
		customer: string;
		status: 'Paid' | 'Open' | 'Overdue';
		total: number;
		owner: string;
		due: string;
	};

	const invoices: Invoice[] = [
		{
			id: 'INV-001',
			customer: 'Northstar Labs',
			status: 'Paid',
			total: 250,
			owner: 'Maya',
			due: 'May 18'
		},
		{
			id: 'INV-002',
			customer: 'Atlas Supply',
			status: 'Open',
			total: 140,
			owner: 'Iris',
			due: 'May 22'
		},
		{
			id: 'INV-003',
			customer: 'Cedar Bank',
			status: 'Overdue',
			total: 980,
			owner: 'Noah',
			due: 'May 09'
		}
	];

	let reorderableInvoices = $state([...invoices]);

	const columns: TableColumn<Invoice>[] = [
		{ id: 'id', label: 'Invoice' },
		{ id: 'customer', label: 'Customer' },
		{ id: 'status', label: 'Status' },
		{
			id: 'total',
			label: 'Total',
			align: 'right',
			format: (value) => `$${Number(value).toLocaleString()}`
		}
	];

	const usage = [
		{ metric: 'API calls', used: '8.2M', limit: '10M' },
		{ metric: 'Storage', used: '420 GB', limit: '500 GB' },
		{ metric: 'Seats', used: '38', limit: '50' }
	];

	const usageColumns: TableColumn<(typeof usage)[number]>[] = [
		{ id: 'metric', label: 'Metric' },
		{ id: 'used', label: 'Used', align: 'right' },
		{ id: 'limit', label: 'Limit', align: 'right' }
	];

	const propsData = [
		{ name: 'data', type: 'T[]', default: '-', description: 'Rows to render.' },
		{
			name: 'columns',
			type: 'TableColumn<T>[]',
			default: '-',
			description: 'Column definitions compatible with DataTable columns.'
		},
		{ name: 'caption', type: 'string', default: '-', description: 'Optional table caption.' },
		{
			name: 'emptyText',
			type: 'string',
			default: '"No results found"',
			description: 'Message shown when data is empty.'
		},
		{
			name: 'rowKey',
			type: 'keyof T | ((row: T) => string | number)',
			default: 'row index',
			description: 'Stable key for each rendered row.'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
			default: "'md'",
			description: 'Controls row density.'
		},
		{
			name: 'reorderable',
			type: 'boolean',
			default: 'false',
			description: 'Shows a row drag handle and enables row reordering.'
		},
		{
			name: 'onReorder',
			type: '(nextData, details) => void',
			default: '-',
			description: 'Callback fired with the reordered rows.'
		},
		{ name: 'class', type: 'string', default: '-', description: 'Additional table classes.' }
	];

	function getAccountColumns(
		statusCellSnippet: NonNullable<TableColumn<Invoice>['cell']>
	): TableColumn<Invoice>[] {
		return columns.map((column) => {
			if (column.id === 'status') return { ...column, cell: statusCellSnippet };
			return column;
		});
	}

	function handleReorder(nextData: Invoice[]) {
		reorderableInvoices = nextData;
	}

	const scriptOpen = '<' + 'script lang="ts">';
	const scriptClose = '</' + 'script>';

	const invoiceCode = `${scriptOpen}
  import { Table, type TableColumn } from "$ui/table";

  type Invoice = {
    id: string;
    customer: string;
    status: "Paid" | "Open" | "Overdue";
    total: number;
  };

  const invoices: Invoice[] = [
    { id: "INV-001", customer: "Northstar Labs", status: "Paid", total: 250 },
    { id: "INV-002", customer: "Atlas Supply", status: "Open", total: 140 },
    { id: "INV-003", customer: "Cedar Bank", status: "Overdue", total: 980 }
  ];

  const columns: TableColumn<Invoice>[] = [
    { id: "id", label: "Invoice" },
    { id: "customer", label: "Customer" },
    { id: "status", label: "Status" },
    {
      id: "total",
      label: "Total",
      align: "right",
      format: (value) => \`$\${Number(value).toLocaleString()}\`
    }
  ];
${scriptClose}

<Table data={invoices} {columns} rowKey="id" size="sm" />`;

	const usageCode = `${scriptOpen}
  import { Table, type TableColumn } from "$ui/table";

  const usage = [
    { metric: "API calls", used: "8.2M", limit: "10M" },
    { metric: "Storage", used: "420 GB", limit: "500 GB" },
    { metric: "Seats", used: "38", limit: "50" }
  ];

  const usageColumns: TableColumn<(typeof usage)[number]>[] = [
    { id: "metric", label: "Metric" },
    { id: "used", label: "Used", align: "right" },
    { id: "limit", label: "Limit", align: "right" }
  ];
${scriptClose}

<Table
  data={usage}
  columns={usageColumns}
  caption="Workspace usage for May"
  rowKey="metric"
/>`;

	const customCellCode = `${scriptOpen}
  import { Badge } from "$ui/badge";
  import { Table, type TableCellContext, type TableColumn } from "$ui/table";

  type Invoice = {
    id: string;
    customer: string;
    status: "Paid" | "Open" | "Overdue";
    total: number;
  };

  const invoices: Invoice[] = [
    { id: "INV-001", customer: "Northstar Labs", status: "Paid", total: 250 },
    { id: "INV-002", customer: "Atlas Supply", status: "Open", total: 140 },
    { id: "INV-003", customer: "Cedar Bank", status: "Overdue", total: 980 }
  ];

  const columns: TableColumn<Invoice>[] = [
    { id: "id", label: "Invoice" },
    { id: "customer", label: "Customer" },
    { id: "status", label: "Status" },
    {
      id: "total",
      label: "Total",
      align: "right",
      format: (value) => \`$\${Number(value).toLocaleString()}\`
    }
  ];

  function getColumns(
    statusCellSnippet: NonNullable<TableColumn<Invoice>["cell"]>
  ): TableColumn<Invoice>[] {
    return columns.map((column) => {
      if (column.id === "status") return { ...column, cell: statusCellSnippet };
      return column;
    });
  }
${scriptClose}

{#snippet statusCell(row: Invoice, _value: unknown, _context: TableCellContext<Invoice>)}
  <Badge
    color={row.status === "Paid" ? "success" : row.status === "Open" ? "info" : "error"}
    variant="soft"
  >
    {row.status}
  </Badge>
{/snippet}

<Table data={invoices} columns={getColumns(statusCell)} rowKey="id" />`;

	const reorderableCode = `${scriptOpen}
  import { Table, type TableColumn } from "$ui/table";

  type Invoice = {
    id: string;
    customer: string;
    status: "Paid" | "Open" | "Overdue";
    total: number;
  };

  let invoices = $state<Invoice[]>([
    { id: "INV-001", customer: "Northstar Labs", status: "Paid", total: 250 },
    { id: "INV-002", customer: "Atlas Supply", status: "Open", total: 140 },
    { id: "INV-003", customer: "Cedar Bank", status: "Overdue", total: 980 }
  ]);

  const columns: TableColumn<Invoice>[] = [
    { id: "id", label: "Invoice" },
    { id: "customer", label: "Customer" },
    { id: "status", label: "Status" },
    {
      id: "total",
      label: "Total",
      align: "right",
      format: (value) => \`$\${Number(value).toLocaleString()}\`
    }
  ];

  function handleReorder(nextData: Invoice[]) {
    invoices = nextData;
  }
${scriptClose}

<Table
  data={invoices}
  {columns}
  caption="Drag invoices to reorder"
  rowKey="id"
  size="sm"
  reorderable
  onReorder={handleReorder}
/>`;

	const emptyCode = `${scriptOpen}
  import { Table, type TableColumn } from "$ui/table";

  type Invoice = {
    id: string;
    customer: string;
    status: string;
    total: number;
  };

  const columns: TableColumn<Invoice>[] = [
    { id: "id", label: "Invoice" },
    { id: "customer", label: "Customer" },
    { id: "status", label: "Status" },
    { id: "total", label: "Total", align: "right" }
  ];
${scriptClose}

<Table data={[]} {columns} emptyText="No invoices found" />`;
</script>

{#snippet statusCell(row: Invoice, _value: unknown, _context: TableCellContext<Invoice>)}
	<Badge
		color={row.status === 'Paid' ? 'success' : row.status === 'Open' ? 'info' : 'error'}
		variant="soft"
	>
		{row.status}
	</Badge>
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Table</h1>
		<p class="text-kl-muted-content mt-2">A simple data-driven table.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Invoices" description="Render rows from data and columns." code={invoiceCode}>
			<Table data={invoices} {columns} rowKey="id" size="sm" />
		</DemoCard>

		<DemoCard
			title="Captioned usage"
			description="Use captions to describe dense operational data."
			code={usageCode}
		>
			<Table
				data={usage}
				columns={usageColumns}
				caption="Workspace usage for May"
				rowKey="metric"
			/>
		</DemoCard>

		<DemoCard
			title="Custom cell"
			description="Use a column cell snippet for richer values."
			code={customCellCode}
		>
			<Table data={invoices} columns={getAccountColumns(statusCell)} rowKey="id" />
		</DemoCard>

		<DemoCard
			title="Reorderable"
			description="Enable row reordering and keep the ordered data in the parent."
			code={reorderableCode}
		>
			<Table
				data={reorderableInvoices}
				{columns}
				caption="Drag invoices to reorder"
				rowKey="id"
				size="sm"
				reorderable
				onReorder={handleReorder}
			/>
		</DemoCard>

		<DemoCard
			title="Empty state"
			description="Customize the message shown when there are no rows."
			code={emptyCode}
		>
			<Table data={[]} {columns} emptyText="No invoices found" />
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
