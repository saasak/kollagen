<script lang="ts">
	import { NativeSelect } from '$ui/native-select';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ label: 'Starter', value: 'starter' },
		{ label: 'Team', value: 'team' },
		{ label: 'Enterprise', value: 'enterprise' }
	];
	const regions = [
		{ name: 'United States', code: 'us' },
		{ name: 'Europe', code: 'eu' },
		{ name: 'Asia Pacific', code: 'apac', disabled: true }
	];

	let plan = $state('team');
	let region = $state('');
	let lastChange = $state('No change yet');

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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Plan" description="Native select for forms." code="<NativeSelect {items} />">
			<NativeSelect {items} placeholder="Select plan" class="max-w-sm" />
		</DemoCard>

		<DemoCard
			title="Controlled selection"
			description="Bind value and render the selected option elsewhere."
			code={`<NativeSelect {items} bind:value={plan} />`}
		>
			<div class="space-y-3">
				<NativeSelect {items} bind:value={plan} class="max-w-sm" />
				<p class="text-kl-muted-content text-sm">Selected plan: {plan}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Custom item mapping"
			description="Use itemToLabel and itemToValue for arbitrary item shapes."
			code={`<NativeSelect
  items={regions}
  itemToLabel={(region) => region.name}
  itemToValue={(region) => region.code}
/>`}
		>
			<NativeSelect
				items={regions}
				bind:value={region}
				itemToLabel={(region) => region.name}
				itemToValue={(region) => region.code}
				placeholder="Select region"
				class="max-w-sm"
			/>
		</DemoCard>

		<DemoCard
			title="Required form select"
			description="Forward id and name to native forms."
			code={`<NativeSelect
  id="plan"
  name="plan"
  required
  onValueChange={(value) => ...}
/>`}
		>
			<div class="space-y-3">
				<NativeSelect
					id="plan"
					name="plan"
					{items}
					required
					placeholder="Choose a plan"
					onValueChange={(value) => (lastChange = `Changed to ${value}`)}
					class="max-w-sm"
				/>
				<p class="text-kl-muted-content text-sm">{lastChange}</p>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
