<script lang="ts">
	import { NumberInput } from '$ui/number-input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{ name: 'label', type: 'string', default: '—', description: 'Display label above the input' },
		{
			name: 'value',
			type: 'string',
			default: '—',
			description: 'Controlled value. Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'string',
			default: '—',
			description: 'Initial value for uncontrolled mode'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{ name: 'min', type: 'number', default: '—', description: 'Minimum allowed value' },
		{ name: 'max', type: 'number', default: '—', description: 'Maximum allowed value' },
		{ name: 'step', type: 'number', default: '1', description: 'Increment/decrement step' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Mark as invalid' },
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
		{ name: 'readOnly', type: 'boolean', default: 'false', description: 'Make read-only' },
		{
			name: 'allowMouseWheel',
			type: 'boolean',
			default: 'false',
			description: 'Allow mouse wheel to change the value'
		},
		{
			name: 'clampValueOnBlur',
			type: 'boolean',
			default: 'true',
			description: 'Clamp value to min/max on blur'
		},
		{
			name: 'formatOptions',
			type: 'Intl.NumberFormatOptions',
			default: '—',
			description: 'Number formatting options (currency, percent, etc.)'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: '—',
			description: 'Placeholder text shown when empty'
		},
		{
			name: 'onValueChange',
			type: '(details: { value: string; valueAsNumber: number }) => void',
			default: '—',
			description: 'Callback when the value changes'
		},
		{
			name: 'onValueInvalid',
			type: '(details: { value: string; reason: string }) => void',
			default: '—',
			description: 'Callback when the value is outside min/max range'
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
	<div>
		<h1 class="text-3xl font-bold">NumberInput</h1>
		<p class="text-kl-muted-content mt-2">
			A numeric input with increment/decrement controls. Supports min/max, step, formatting, and
			form submission. Built on Ark UI.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A simple number input with a label."
			code={`<NumberInput label="Quantity" defaultValue="1" min={0} max={99} />`}
		>
			<NumberInput label="Quantity" defaultValue="1" min={0} max={99} />
		</DemoCard>

		<DemoCard
			title="Step"
			description="Set a custom step for increment/decrement."
			code={`<NumberInput label="Price" defaultValue="10" step={5} min={0} max={100} />`}
		>
			<NumberInput label="Price" defaultValue="10" step={5} min={0} max={100} />
		</DemoCard>

		<DemoCard
			title="Currency formatting"
			description="Use Intl.NumberFormat options to display as currency."
			code={`<NumberInput
  label="Amount"
  defaultValue="9.99"
  min={0}
  formatOptions={{ style: "currency", currency: "USD" }}
/>`}
		>
			<NumberInput
				label="Amount"
				defaultValue="9.99"
				min={0}
				formatOptions={{ style: 'currency', currency: 'USD' }}
			/>
		</DemoCard>

		<DemoCard
			title="Percentage"
			description="Format as a percentage."
			code={`<NumberInput
  label="Discount"
  defaultValue="0.15"
  min={0}
  max={1}
  step={0.01}
  formatOptions={{ style: "percent" }}
/>`}
		>
			<NumberInput
				label="Discount"
				defaultValue="0.15"
				min={0}
				max={1}
				step={0.01}
				formatOptions={{ style: 'percent' }}
			/>
		</DemoCard>

		<DemoCard
			title="Mouse wheel"
			description="Enable mouse wheel to change the value."
			code={`<NumberInput label="Volume" defaultValue="50" min={0} max={100} allowMouseWheel />`}
		>
			<NumberInput label="Volume" defaultValue="50" min={0} max={100} allowMouseWheel />
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="A disabled number input."
			code="<NumberInput label=&quot;Locked&quot; defaultValue=&quot;42&quot; disabled />"
		>
			<NumberInput label="Locked" defaultValue="42" disabled />
		</DemoCard>

		<DemoCard
			title="Invalid"
			description="Mark the input as invalid for error states."
			code="<NumberInput label=&quot;Age&quot; defaultValue=&quot;-1&quot; invalid />"
		>
			<NumberInput label="Age" defaultValue="-1" invalid />
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
