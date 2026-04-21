<script lang="ts">
	import { ComboBox } from '$ui/combobox';
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

	async function fakeSearch(query: string) {
		await new Promise((r) => setTimeout(r, 500));
		return fruits.filter((f) => f.label.toLowerCase().includes(query.toLowerCase()));
	}

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
		{ name: 'placeholder', type: 'string', default: '""', description: 'Input placeholder text' },
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the combobox' },
		{
			name: 'closeOnSelect',
			type: 'boolean',
			default: '!multiple',
			description: 'Close dropdown after selection'
		},
		{
			name: 'onSearch',
			type: '(query: string) => Promise<T[]> | T[]',
			default: '—',
			description: 'Async search handler. Enables async mode when provided'
		},
		{
			name: 'debounceMs',
			type: 'number',
			default: '300',
			description: 'Debounce delay for async search in ms'
		},
		{
			name: 'filter',
			type: '"contains" | "startsWith" | function',
			default: '"contains"',
			description: 'Sync filter strategy or custom function'
		},
		{
			name: 'onValueChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when selected value(s) change'
		},
		{
			name: 'onInputValueChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when input text changes'
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
		<h1 class="text-3xl font-bold">ComboBox</h1>
		<p class="text-kl-muted-content mt-2">
			Autocomplete input with sync filtering and async search support. Built on bits-ui.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple combobox with contains filtering."
			code={`<ComboBox items={fruits} placeholder="Pick a fruit..." />`}
		>
			<div class="max-w-sm">
				<ComboBox items={fruits} placeholder="Pick a fruit..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Multiple selection"
			description="Select more than one item. Dropdown stays open after each selection."
			code={`<ComboBox items={fruits} multiple={true} placeholder="Select fruits..." />`}
		>
			<div class="max-w-sm">
				<ComboBox items={fruits} multiple={true} placeholder="Select fruits..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Async search"
			description="Fetches results on input with a 500ms simulated delay."
			code={`<ComboBox
  items={[]}
  onSearch={async (query) => {
    await new Promise(r => setTimeout(r, 500));
    return fruits.filter(f =>
      f.label.toLowerCase().includes(query.toLowerCase())
    );
  }}
  placeholder="Search fruits..."
/>`}
		>
			<div class="max-w-sm">
				<ComboBox items={[]} onSearch={fakeSearch} placeholder="Search fruits..." />
			</div>
		</DemoCard>

		<DemoCard
			title="StartsWith filter"
			description="Uses &quot;startsWith&quot; filtering instead of the default &quot;contains&quot;."
			code={`<ComboBox items={fruits} filter="startsWith" placeholder="Type to filter..." />`}
		>
			<div class="max-w-sm">
				<ComboBox items={fruits} filter="startsWith" placeholder="Type to filter..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Combobox in disabled state."
			code={`<ComboBox items={fruits} disabled={true} placeholder="Disabled..." />`}
		>
			<div class="max-w-sm">
				<ComboBox items={fruits} disabled={true} placeholder="Disabled..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <ComboBox items={fruits} name="fruit" placeholder="Pick a fruit..." />
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
					<ComboBox items={fruits} name="fruit" placeholder="Pick a fruit..." />
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
