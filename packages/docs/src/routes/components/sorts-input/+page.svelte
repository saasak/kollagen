<script lang="ts">
	import { SortsInput, type SortsInputColumn, type SortsInputValue } from '$ui/sorts-input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const columns: SortsInputColumn[] = [
		{ id: 'name', label: 'Account', sortable: true },
		{ id: 'plan', label: 'Plan', sortable: true },
		{ id: 'mrr', label: 'MRR', sortable: true },
		{ id: 'owner', label: 'Owner', sortable: true },
		{ id: 'notes', label: 'Notes' }
	];

	let sort: SortsInputValue = $state([{ id: 'name', direction: 'asc' }]);
	let multiSort: SortsInputValue = $state([
		{ id: 'plan', direction: 'asc' },
		{ id: 'mrr', direction: 'desc' }
	]);

	const sortJson = $derived(JSON.stringify(sort, null, 2));
	const multiSortJson = $derived(JSON.stringify(multiSort, null, 2));

	const basicCode = `<SortsInput
  columns={columns}
  bind:value={sort}
/>`;

	const multiCode = `<SortsInput
  columns={columns}
  bind:value={multiSort}
  multiple
/>`;

	const propsData = [
		{
			name: 'columns',
			type: 'SortsInputColumn[]',
			default: '-',
			description: 'Sortable column definitions. Only columns with sortable: true are shown.'
		},
		{
			name: 'value',
			type: 'SortsInputValue',
			default: '[]',
			description: 'Controlled sort rules. Supports bind:value.'
		},
		{
			name: 'onUpdate',
			type: '(value) => void',
			default: '-',
			description: 'Called when the sort rules change.'
		},
		{
			name: 'multiple',
			type: 'boolean',
			default: 'false',
			description: 'Allows multiple active sort rules.'
		},
		{
			name: 'activeCount',
			type: 'number',
			default: 'value.length',
			description: 'Overrides the badge count.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">SortsInput</h1>
		<p class="text-kl-muted-content mt-2">
			Standalone popover control for data sorting, shared by DataList and available for custom
			toolbars.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Single sort"
			description="Pick one sortable column and direction."
			code={basicCode}
		>
			<div class="flex flex-col gap-4">
				<SortsInput {columns} bind:value={sort} />
				<pre
					class="text-kl-muted-content bg-kl-base-200 rounded-kl-box p-4 font-mono text-xs">{sortJson}</pre>
			</div>
		</DemoCard>

		<DemoCard title="Multiple sorts" description="Keep several sort rules active." code={multiCode}>
			<div class="flex flex-col gap-4">
				<SortsInput {columns} bind:value={multiSort} multiple />
				<pre
					class="text-kl-muted-content bg-kl-base-200 rounded-kl-box p-4 font-mono text-xs">{multiSortJson}</pre>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
