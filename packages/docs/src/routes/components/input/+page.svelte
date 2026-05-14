<script lang="ts">
	import { Input } from '$ui/input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let value = $state('team@saasak.dev');

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
	<DemoCard
		title="Text input"
		description="Supports bind:value."
		code="<Input bind:value={value} />"
	>
		<Input bind:value type="email" class="max-w-sm" />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
