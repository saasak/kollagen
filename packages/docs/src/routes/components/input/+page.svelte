<script lang="ts">
	import { Input } from '$ui/input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let value = $state('team@saasak.dev');
	let seatCount = $state(12);
	let invalidValue = $state('not-an-email');

	const propsData = [
		{
			name: 'value',
			type: 'string | number',
			default: "''",
			description: 'Input value. Supports bind:value.'
		},
		{
			name: 'type',
			type: 'string',
			default: "'text'",
			description: 'Native input type.'
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
			name: 'placeholder',
			type: 'string',
			default: '-',
			description: 'Placeholder text.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the field.'
		},
		{
			name: 'readonly',
			type: 'boolean',
			default: 'false',
			description: 'Make the field read-only.'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Require form value.'
		},
		{
			name: 'autocomplete',
			type: 'HTMLInputAttributes["autocomplete"]',
			default: '-',
			description: 'Native autocomplete hint.'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: '-',
			description: 'Accessible label.'
		},
		{
			name: 'invalid',
			type: 'boolean',
			default: 'false',
			description: 'Set aria-invalid and error border.'
		},
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Field size.'
		},
		{
			name: 'oninput',
			type: '(event: Event) => void',
			default: '-',
			description: 'Input handler.'
		},
		{
			name: 'onchange',
			type: '(event: Event) => void',
			default: '-',
			description: 'Change handler.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Input</h1>
		<p class="text-kl-muted-content mt-2">A themed native input.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Text input"
			description="Supports bind:value."
			code="<Input bind:value={value} />"
		>
			<div class="space-y-3">
				<Input bind:value type="email" class="max-w-sm" />
				<p class="text-kl-muted-content text-sm">Value: {value}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Field sizes"
			description="Use fixed sizes to match dense or spacious form rows."
			code={`<Input size="sm" placeholder="Small" />
<Input placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
		>
			<div class="grid max-w-sm gap-3">
				<Input size="sm" placeholder="Small" />
				<Input placeholder="Medium" />
				<Input size="lg" placeholder="Large" />
			</div>
		</DemoCard>

		<DemoCard
			title="Numeric field"
			description="Native input types work with number bindings."
			code={`<Input
  bind:value={seatCount}
  type="number"
  name="seats"
/>`}
		>
			<div class="grid max-w-sm gap-1.5">
				<Input bind:value={seatCount} type="number" name="seats" />
				<p class="text-kl-muted-content text-sm">Seats: {seatCount}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Invalid and disabled"
			description="Set invalid for validation state and disabled for unavailable fields."
			code={`<Input bind:value={email} invalid />
<Input value="locked@example.com" disabled />`}
		>
			<div class="grid max-w-sm gap-3">
				<Input bind:value={invalidValue} type="email" invalid ariaLabel="Invalid email" />
				<Input value="locked@example.com" disabled ariaLabel="Locked email" />
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
