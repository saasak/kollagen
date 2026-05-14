<script lang="ts">
	import { Progress } from '$ui/progress';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'value',
			type: 'number | null',
			default: '0',
			description: 'Current value, or null for indeterminate.'
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
			default: "'Progress'",
			description: 'Accessible label.'
		},
		{
			name: 'color',
			type: "'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
			default: "'primary'",
			description: 'Indicator color.'
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
		<h1 class="text-3xl font-bold">Progress</h1>
		<p class="text-kl-muted-content mt-2">Task completion indicator.</p>
	</div>
	<DemoCard title="Upload" description="Determinate progress." code="<Progress value={64} />">
		<Progress value={64} class="max-w-sm" />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
