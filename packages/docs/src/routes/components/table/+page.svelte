<script lang="ts">
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$ui/table';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

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
	<DemoCard title="Invoices" description="Composable table elements." code="<Table>...</Table>">
		<Table>
			<TableHeader>
				<TableRow
					><TableHead>Invoice</TableHead><TableHead>Status</TableHead><TableHead>Total</TableHead
					></TableRow
				>
			</TableHeader>
			<TableBody>
				<TableRow
					><TableCell>INV-001</TableCell><TableCell>Paid</TableCell><TableCell>$250.00</TableCell
					></TableRow
				>
				<TableRow
					><TableCell>INV-002</TableCell><TableCell>Open</TableCell><TableCell>$140.00</TableCell
					></TableRow
				>
			</TableBody>
		</Table>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
