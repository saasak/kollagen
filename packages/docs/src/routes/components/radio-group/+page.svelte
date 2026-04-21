<script lang="ts">
	import { RadioGroup } from '$ui/radio-group';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' }
	];

	const plans = [
		{ value: 'free', label: 'Free' },
		{ value: 'pro', label: 'Pro' },
		{ value: 'enterprise', label: 'Enterprise', disabled: true }
	];

	let selectedFruit = $state('banana');
	let formResult = $state('');

	const propsData = [
		{
			name: 'items',
			type: 'Item[]',
			default: '—',
			description: 'Radio options to render. Each item has value, label, and optional disabled'
		},
		{
			name: 'value',
			type: 'string',
			default: '—',
			description: 'Controlled selected value. Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'string',
			default: '—',
			description: 'Initial value for uncontrolled mode'
		},
		{ name: 'label', type: 'string', default: '—', description: 'Display label for the group' },
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all options' },
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Mark as invalid' },
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
		{ name: 'readOnly', type: 'boolean', default: 'false', description: 'Make read-only' },
		{
			name: 'orientation',
			type: '"horizontal" | "vertical"',
			default: '"vertical"',
			description: 'Layout orientation of the group'
		},
		{
			name: 'onValueChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when value changes'
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
		<h1 class="text-3xl font-bold">RadioGroup</h1>
		<p class="text-kl-muted-content mt-2">
			A set of mutually exclusive options where only one can be selected at a time. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple radio group with a label."
			code={`<RadioGroup
  label="Favorite fruit"
  items={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ]}
/>`}
		>
			<RadioGroup label="Favorite fruit" items={fruits} />
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage the selected value externally with bind:value."
			code={`<RadioGroup label="Fruit" items={fruits} bind:value={selectedFruit} />
<p>Selected: {selectedFruit}</p>`}
		>
			<div class="space-y-2">
				<RadioGroup label="Fruit" items={fruits} bind:value={selectedFruit} />
				<p class="text-kl-muted-content text-sm">
					Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{selectedFruit}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Default value"
			description="Start with a pre-selected option using defaultValue."
			code={`<RadioGroup label="Fruit" items={fruits} defaultValue="cherry" />`}
		>
			<RadioGroup label="Fruit" items={fruits} defaultValue="cherry" />
		</DemoCard>

		<DemoCard
			title="Horizontal"
			description="Lay out options in a row with orientation."
			code={`<RadioGroup label="Fruit" items={fruits} orientation="horizontal" />`}
		>
			<RadioGroup label="Fruit" items={fruits} orientation="horizontal" />
		</DemoCard>

		<DemoCard
			title="Disabled item"
			description="Individual items can be disabled while others remain interactive."
			code={`<RadioGroup
  label="Plan"
  items={[
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
    { value: "enterprise", label: "Enterprise", disabled: true },
  ]}
/>`}
		>
			<RadioGroup label="Plan" items={plans} />
		</DemoCard>

		<DemoCard
			title="Disabled group"
			description="Disable all options at once."
			code={`<RadioGroup label="Fruit" items={fruits} disabled defaultValue="apple" />`}
		>
			<RadioGroup label="Fruit" items={fruits} disabled defaultValue="apple" />
		</DemoCard>

		<DemoCard
			title="Invalid"
			description="Shows error styling when validation fails."
			code={`<RadioGroup label="Required selection" items={fruits} invalid required />`}
		>
			<RadioGroup label="Required selection" items={fruits} invalid required />
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <RadioGroup label="Fruit" name="fruit" items={fruits} />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('fruit')?.toString() ?? '(none)';
					}}
					class="space-y-3"
				>
					<RadioGroup label="Pick a fruit" name="fruit" items={fruits} />
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
