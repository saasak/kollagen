<script lang="ts">
	import { ToggleGroup } from '$ui/toggle-group';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ label: 'Day', value: 'day' },
		{ label: 'Week', value: 'week' },
		{ label: 'Month', value: 'month' }
	];
	let value = $state('week');

	const propsData = [
		{
			name: 'items',
			type: 'ToggleGroupItem[]',
			default: '-',
			description: 'Toggle item definitions.'
		},
		{
			name: 'value',
			type: 'string | string[]',
			default: "''",
			description: 'Selected value(s). Supports bind:value.'
		},
		{
			name: 'type',
			type: "'single' | 'multiple'",
			default: "'single'",
			description: 'Selection mode.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the group.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Keyboard orientation.'
		},
		{
			name: 'onValueChange',
			type: '(value: string | string[]) => void',
			default: '-',
			description: 'Called when value changes.'
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
		<h1 class="text-3xl font-bold">ToggleGroup</h1>
		<p class="text-kl-muted-content mt-2">A grouped set of toggle buttons.</p>
	</div>
	<DemoCard
		title="Single"
		description="Supports single and multiple mode."
		code="<ToggleGroup {items} bind:value={value} />"
	>
		<ToggleGroup {items} bind:value />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
