<script lang="ts">
	import { Item as ToggleGroupItem, Root as ToggleGroupRoot, ToggleGroup } from '$ui/toggle-group';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { AlignCenter, AlignLeft, AlignRight } from 'lucide-svelte';

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
	let alignment = $state('left');

	const iconItemClass =
		'rounded-kl-selector text-kl-base-content data-[state=on]:bg-kl-primary data-[state=on]:text-kl-primary-content hover:bg-kl-base-200 flex size-9 cursor-pointer items-center justify-center outline-none transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50';

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

	<DemoCard
		title="Icons only"
		description="Use the exposed primitives when items need custom content."
		code={`<script lang="ts">
  import { Item, Root } from "$ui/toggle-group";
  import { AlignCenter, AlignLeft, AlignRight } from "lucide-svelte";

  let alignment = $state("left");
</${'script'}>

<Root type="single" bind:value={alignment}>
  <Item value="left" aria-label="Align left">
    <AlignLeft size={16} />
  </Item>
  <Item value="center" aria-label="Align center">
    <AlignCenter size={16} />
  </Item>
  <Item value="right" aria-label="Align right">
    <AlignRight size={16} />
  </Item>
</Root>`}
	>
		<ToggleGroupRoot
			type="single"
			bind:value={alignment}
			class="rounded-kl-field border-kl-base-300 bg-kl-base-100 inline-flex items-center gap-1 border"
		>
			<ToggleGroupItem value="left" aria-label="Align left" class={iconItemClass}>
				<AlignLeft size={16} aria-hidden="true" />
			</ToggleGroupItem>
			<ToggleGroupItem value="center" aria-label="Align center" class={iconItemClass}>
				<AlignCenter size={16} aria-hidden="true" />
			</ToggleGroupItem>
			<ToggleGroupItem value="right" aria-label="Align right" class={iconItemClass}>
				<AlignRight size={16} aria-hidden="true" />
			</ToggleGroupItem>
		</ToggleGroupRoot>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
