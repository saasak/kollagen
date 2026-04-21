<script lang="ts">
	import { Select } from '$ui/select';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const fruits = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Cherry', value: 'cherry' },
		{ label: 'Grape', value: 'grape' },
		{ label: 'Mango', value: 'mango' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Peach', value: 'peach' },
		{ label: 'Strawberry', value: 'strawberry' }
	];

	const priorities = [
		{ label: 'Critical', value: 'critical' },
		{ label: 'High', value: 'high' },
		{ label: 'Medium', value: 'medium' },
		{ label: 'Low', value: 'low' }
	];

	let formResult = $state('');

	const propsData = [
		{ name: 'items', type: 'T[]', default: '—', description: 'Array of items to display' },
		{
			name: 'itemToLabel',
			type: '(item: T) => string',
			default: 'item.label',
			description: 'Extract display label from item'
		},
		{
			name: 'itemToValue',
			type: '(item: T) => string',
			default: 'item.value',
			description: 'Extract unique value from item'
		},
		{
			name: 'value',
			type: 'string[]',
			default: '—',
			description: 'Controlled selected value(s). Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'string[]',
			default: '—',
			description: 'Initial value(s) for uncontrolled mode'
		},
		{
			name: 'multiple',
			type: 'boolean',
			default: 'false',
			description: 'Enable multiple selection'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: '"Select..."',
			description: 'Placeholder text when no value selected'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the select' },
		{
			name: 'closeOnSelect',
			type: 'boolean',
			default: '!multiple',
			description: 'Close dropdown after selection'
		},
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Visible label rendered above the select'
		},
		{
			name: 'onValueChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when selected value(s) change'
		},
		{
			name: 'onOpenChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when dropdown opens or closes'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Select</h1>
		<p class="text-kl-muted-content mt-2">
			Dropdown select for picking one or more items from a list. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple single-value select."
			code={`<Select items={fruits} placeholder="Pick a fruit..." />`}
		>
			<div class="max-w-sm">
				<Select items={fruits} placeholder="Pick a fruit..." />
			</div>
		</DemoCard>

		<DemoCard
			title="With label"
			description="Select with a visible label."
			code={`<Select items={priorities} label="Priority" placeholder="Choose priority..." />`}
		>
			<div class="max-w-sm">
				<Select items={priorities} label="Priority" placeholder="Choose priority..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Multiple selection"
			description="Select more than one item. Dropdown stays open after each selection."
			code={`<Select items={fruits} multiple={true} placeholder="Select fruits..." />`}
		>
			<div class="max-w-sm">
				<Select items={fruits} multiple={true} placeholder="Select fruits..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Select in disabled state."
			code={`<Select items={fruits} disabled={true} placeholder="Disabled..." />`}
		>
			<div class="max-w-sm">
				<Select items={fruits} disabled={true} placeholder="Disabled..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <Select items={fruits} name="fruit" placeholder="Pick a fruit..." />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="max-w-sm space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('fruit')?.toString() ?? '(empty)';
					}}
					class="space-y-3"
				>
					<Select items={fruits} name="fruit" placeholder="Pick a fruit..." />
					<button
						type="submit"
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Submit
					</button>
				</form>
				{#if formResult}
					<p class="text-kl-muted-content text-sm">
						Submitted: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{formResult}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
