<script lang="ts">
	import { Meter } from '$ui/meter';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'value',
			type: 'number',
			default: '0',
			description: 'Current meter value.'
		},
		{
			name: 'min',
			type: 'number',
			default: '0',
			description: 'Minimum value.'
		},
		{
			name: 'max',
			type: 'number',
			default: '100',
			description: 'Maximum value.'
		},
		{
			name: 'label',
			type: 'string',
			default: "'Meter'",
			description: 'Accessible label.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional root classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Meter</h1>
		<p class="text-kl-muted-content mt-2">A scalar measurement indicator.</p>
	</div>
	<DemoCard title="Usage" description="Tone changes by value." code="<Meter value={72} />">
		<Meter value={72} class="max-w-sm" />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
