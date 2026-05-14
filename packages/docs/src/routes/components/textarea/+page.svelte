<script lang="ts">
	import { Textarea } from '$ui/textarea';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let value = $state('Write a short note...');

	const propsData = [
		{
			name: 'value',
			type: 'string',
			default: "''",
			description: 'Textarea value. Supports bind:value.'
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
			name: 'rows',
			type: 'number',
			default: '4',
			description: 'Visible row count.'
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
		<h1 class="text-3xl font-bold">Textarea</h1>
		<p class="text-kl-muted-content mt-2">A themed native textarea.</p>
	</div>
	<DemoCard title="Note" description="Supports bind:value." code="<Textarea bind:value={value} />">
		<Textarea bind:value class="max-w-md" />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
