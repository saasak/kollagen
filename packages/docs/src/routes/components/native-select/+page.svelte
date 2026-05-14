<script lang="ts">
	import { NativeSelect } from '$ui/native-select';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ label: 'Starter', value: 'starter' },
		{ label: 'Team', value: 'team' }
	];

	const propsData = [
		{
			name: 'items',
			type: 'T[]',
			default: '-',
			description: 'Option source items.'
		},
		{
			name: 'value',
			type: 'string',
			default: "''",
			description: 'Selected value. Supports bind:value.'
		},
		{
			name: 'itemToLabel',
			type: '(item: T) => string',
			default: 'item.label ?? String(item)',
			description: 'Maps an item to display text.'
		},
		{
			name: 'itemToValue',
			type: '(item: T) => string',
			default: 'item.value ?? String(item)',
			description: 'Maps an item to option value.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: '-',
			description: 'Optional placeholder option.'
		},
		{
			name: 'id',
			type: 'string',
			default: '-',
			description: 'Native id attribute.'
		},
		{
			name: 'name',
			type: 'string',
			default: '-',
			description: 'Native name attribute.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the select.'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Require form value.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			default: '-',
			description: 'Called when value changes.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional wrapper classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">NativeSelect</h1>
		<p class="text-kl-muted-content mt-2">A styled native select.</p>
	</div>
	<DemoCard title="Plan" description="Native select for forms." code="<NativeSelect {items} />">
		<NativeSelect {items} placeholder="Select plan" class="max-w-sm" />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
