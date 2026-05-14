<script lang="ts">
	import { ListBox } from '$ui/list-box';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'date', label: 'Date', disabled: true }
	];

	let value = $state('banana');
	let values = $state(['apple', 'cherry']);
	let formResult = $state('');

	const propsData = [
		{ name: 'items', type: 'T[]', default: '—', description: 'Options to render.' },
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
			description: 'Maps each item to the submitted value.'
		},
		{
			name: 'value',
			type: 'string | string[]',
			default: "'' | []",
			description: 'Selected value(s). Supports bind:value.'
		},
		{
			name: 'multiple',
			type: 'boolean',
			default: 'false',
			description: 'Allow multiple selected values.'
		},
		{ name: 'label', type: 'string', default: '—', description: 'Display label.' },
		{ name: 'name', type: 'string', default: '—', description: 'Form field name.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the listbox.' },
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required.' },
		{
			name: 'onValueChange',
			type: '(value: string | string[]) => void',
			default: '—',
			description: 'Callback when value changes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">ListBox</h1>
		<p class="text-kl-muted-content mt-2">An always-visible single or multiple choice list.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Single"
			description="Select one visible option."
			code={`<ListBox label="Fruit" items={fruits} bind:value={value} />`}
		>
			<div class="max-w-sm space-y-2">
				<ListBox label="Fruit" items={fruits} bind:value />
				<p class="text-kl-muted-content text-sm">
					Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{value || 'none'}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Multiple"
			description="Select more than one value."
			code={`<ListBox label="Fruits" items={fruits} multiple bind:value={values} />`}
		>
			<div class="max-w-sm space-y-2">
				<ListBox label="Fruits" items={fruits} multiple bind:value={values} />
				<p class="text-kl-muted-content text-sm">
					Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{values.join(', ') || 'none'}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Submits selected string values with the name prop."
			code={`<form>
  <ListBox label="Fruit" name="fruit" items={fruits} />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="max-w-sm space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.getAll('fruit').map(String).join(', ') || '(none)';
					}}
					class="space-y-3"
				>
					<ListBox label="Fruit" name="fruit" items={fruits} />
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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
