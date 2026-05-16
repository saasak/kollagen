<script lang="ts">
	import { ToggleGroup } from '$ui/toggle-group';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ label: 'Day', value: 'day' },
		{ label: 'Week', value: 'week' },
		{ label: 'Month', value: 'month' }
	];
	const densityItems = [
		{ label: 'Compact', value: 'compact' },
		{ label: 'Comfortable', value: 'comfortable' },
		{ label: 'Spacious', value: 'spacious', disabled: true }
	];
	const stringItems = ['Draft', 'Published', 'Archived'];
	let value = $state('week');
	let multipleValue = $state(['day', 'month']);
	let density = $state('comfortable');
	let status = $state('published');

	const propsData = [
		{
			name: 'items',
			type: 'T[]',
			default: '-',
			description: 'Toggle item definitions.'
		},
		{
			name: 'itemToLabel',
			type: '(item: T) => string',
			default: 'item.label ?? String(item)',
			description: 'Maps each item to a visible label.'
		},
		{
			name: 'itemToValue',
			type: '(item: T) => string',
			default: 'item.value ?? String(item)',
			description: 'Maps each item to the selected value.'
		},
		{
			name: 'value',
			type: 'string | string[]',
			default: "''",
			description: 'Selected value(s). Supports bind:value.'
		},
		{
			name: 'multiple',
			type: 'boolean',
			default: 'false',
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
		description="Single selected value."
		code={`<ToggleGroup
  items={[
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" }
  ]}
  bind:value
/>`}
	>
		<ToggleGroup {items} bind:value />
	</DemoCard>

	<DemoCard
		title="Multiple"
		description="Multiple selected values."
		code={`<ToggleGroup
  items={[
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" }
  ]}
  multiple
  bind:value={multipleValue}
/>`}
	>
		<div class="space-y-2">
			<ToggleGroup {items} multiple bind:value={multipleValue} />
			<p class="text-kl-muted-content text-sm">
				Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
					>{multipleValue.join(', ')}</code
				>
			</p>
		</div>
	</DemoCard>

	<DemoCard
		title="Disabled item"
		description="Disable individual items from the source data."
		code={`<ToggleGroup
  items={[
    { label: "Compact", value: "compact" },
    { label: "Comfortable", value: "comfortable" },
    { label: "Spacious", value: "spacious", disabled: true }
  ]}
  bind:value={density}
/>`}
	>
		<div class="space-y-2">
			<ToggleGroup items={densityItems} bind:value={density} />
			<p class="text-kl-muted-content text-sm">Density: {density}</p>
		</div>
	</DemoCard>

	<DemoCard
		title="String items"
		description="Use custom mapping when items are plain values."
		code={`<ToggleGroup
  items={["Draft", "Published", "Archived"]}
  itemToLabel={(item) => item}
  itemToValue={(item) => item.toLowerCase()}
/>`}
	>
		<ToggleGroup
			items={stringItems}
			bind:value={status}
			itemToLabel={(item) => item}
			itemToValue={(item) => item.toLowerCase()}
		/>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
