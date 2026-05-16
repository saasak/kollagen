<script lang="ts">
	import { Textarea } from '$ui/textarea';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let value = $state('Write a short note...');
	let invalidValue = $state('');

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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Note"
			description="Supports bind:value."
			code="<Textarea bind:value={value} />"
		>
			<div class="space-y-3">
				<Textarea bind:value class="max-w-md" />
				<p class="text-kl-muted-content text-sm">{value.length} characters</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Support reply"
			description="Use rows and placeholder for longer customer responses."
			code={`<Textarea
  rows={6}
  placeholder="Write a reply..."
/>`}
		>
			<Textarea
				rows={6}
				placeholder="Write a reply..."
				ariaLabel="Support reply"
				class="max-w-xl"
			/>
		</DemoCard>

		<DemoCard
			title="Invalid"
			description="Set invalid when validation requires user attention."
			code={`<Textarea bind:value={value} invalid required />`}
		>
			<div class="grid max-w-md gap-1.5">
				<Textarea
					bind:value={invalidValue}
					invalid
					required
					placeholder="Explain why the account should be closed."
					ariaLabel="Closure reason"
				/>
				<p class="text-kl-error text-sm">A closure reason is required.</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Read-only audit note"
			description="Use readonly for system-generated or locked notes."
			code="<Textarea value=&quot;Approved by finance.&quot; readonly />"
		>
			<Textarea
				value="Approved by finance. Renewal quote locked on May 14."
				readonly
				class="max-w-md"
			/>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
