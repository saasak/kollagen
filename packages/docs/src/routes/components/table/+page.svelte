<script lang="ts">
	import { Badge } from '$ui/badge';
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$ui/table';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const invoices = [
		{ id: 'INV-001', status: 'Paid', total: '$250.00' },
		{ id: 'INV-002', status: 'Open', total: '$140.00' }
	];

	const accounts = [
		{ name: 'Northstar Labs', plan: 'Enterprise', health: 'Healthy', mrr: '$8,400' },
		{ name: 'Atlas Supply', plan: 'Growth', health: 'At risk', mrr: '$1,900' },
		{ name: 'Rune Retail', plan: 'Starter', health: 'Churned', mrr: '$0' }
	];

	const usage = [
		{ metric: 'API calls', used: '8.2M', limit: '10M' },
		{ metric: 'Storage', used: '420 GB', limit: '500 GB' },
		{ metric: 'Seats', used: '38', limit: '50' }
	];

	const propsData = [
		{
			name: 'caption',
			type: 'string',
			default: '-',
			description: 'Optional table caption.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Table content.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional table classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Table</h1>
		<p class="text-kl-muted-content mt-2">Responsive table primitives.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Invoices" description="Composable table elements." code="<Table>...</Table>">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Invoice</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each invoices as invoice}
						<TableRow>
							<TableCell>{invoice.id}</TableCell>
							<TableCell>{invoice.status}</TableCell>
							<TableCell>{invoice.total}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DemoCard>

		<DemoCard
			title="Captioned usage"
			description="Use captions to describe dense operational data."
			code={`<Table caption="Workspace usage for May">
  ...
</Table>`}
		>
			<Table caption="Workspace usage for May">
				<TableHeader>
					<TableRow>
						<TableHead>Metric</TableHead>
						<TableHead>Used</TableHead>
						<TableHead>Limit</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each usage as row}
						<TableRow>
							<TableCell>{row.metric}</TableCell>
							<TableCell>{row.used}</TableCell>
							<TableCell>{row.limit}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DemoCard>

		<DemoCard
			title="Account statuses"
			description="Compose table cells with other Kollagen components."
			code={`<TableCell>
  <Badge color="success" variant="soft">Healthy</Badge>
</TableCell>`}
		>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Account</TableHead>
						<TableHead>Plan</TableHead>
						<TableHead>Health</TableHead>
						<TableHead>MRR</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each accounts as account}
						<TableRow>
							<TableCell>{account.name}</TableCell>
							<TableCell>{account.plan}</TableCell>
							<TableCell>
								<Badge
									color={account.health === 'Healthy'
										? 'success'
										: account.health === 'At risk'
											? 'warning'
											: 'error'}
									variant="soft"
								>
									{account.health}
								</Badge>
							</TableCell>
							<TableCell>{account.mrr}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DemoCard>

		<DemoCard
			title="Constrained width"
			description="Wrap the table for horizontal overflow in narrow containers."
			code={`<div class="overflow-x-auto">
  <Table class="min-w-[36rem]">...</Table>
</div>`}
		>
			<div class="rounded-kl-box border-kl-base-300 max-w-md overflow-x-auto border">
				<Table class="min-w-[36rem]">
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead>Owner</TableHead>
							<TableHead>Renewal</TableHead>
							<TableHead>Risk</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Prism Energy</TableCell>
							<TableCell>Iris</TableCell>
							<TableCell>Jun 30</TableCell>
							<TableCell>Low</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cedar Bank</TableCell>
							<TableCell>Noah</TableCell>
							<TableCell>Jul 12</TableCell>
							<TableCell>Medium</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
