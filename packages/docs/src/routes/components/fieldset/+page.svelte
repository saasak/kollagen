<script lang="ts">
	import { Fieldset } from '$ui/fieldset';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'legend',
			type: 'string',
			default: '—',
			description: 'Legend text displayed at the top of the fieldset'
		},
		{
			name: 'helperText',
			type: 'string',
			default: '—',
			description: 'Helper text displayed below the grouped fields'
		},
		{
			name: 'errorText',
			type: 'string',
			default: '—',
			description: 'Error text displayed when invalid'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable all fields in the fieldset'
		},
		{
			name: 'invalid',
			type: 'boolean',
			default: 'false',
			description: 'Mark the fieldset as invalid'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Fieldset content (grouped form fields)'
		}
	];

	const inputClass =
		'h-10 w-full rounded-kl-field border border-kl-base-300 bg-kl-base-100 px-3 text-sm text-kl-base-content placeholder:text-kl-muted-content outline-none focus:border-kl-primary focus:ring-1 focus:ring-kl-primary disabled:cursor-not-allowed disabled:opacity-50';
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Fieldset</h1>
		<p class="text-kl-muted-content mt-2">
			Groups related form fields under a common legend with optional helper and error text. Built on
			bits-ui.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Group related fields under a legend."
			code={`<Fieldset legend="Contact info">
  <input placeholder="Name" />
  <input type="email" placeholder="Email" />
</Fieldset>`}
		>
			<Fieldset legend="Contact info">
				<input class={inputClass} placeholder="Name" />
				<input class={inputClass} type="email" placeholder="Email" />
			</Fieldset>
		</DemoCard>

		<DemoCard
			title="With helper text"
			description="Provide context for the group of fields."
			code={`<Fieldset legend="Shipping address" helperText="We only ship within the continental US.">
  <input placeholder="Street" />
  <input placeholder="City" />
  <input placeholder="ZIP" />
</Fieldset>`}
		>
			<Fieldset legend="Shipping address" helperText="We only ship within the continental US.">
				<input class={inputClass} placeholder="Street" />
				<input class={inputClass} placeholder="City" />
				<input class={inputClass} placeholder="ZIP" />
			</Fieldset>
		</DemoCard>

		<DemoCard
			title="Invalid with error"
			description="Shows error styling and an error message for the group."
			code={`<Fieldset legend="Payment" invalid errorText="Please complete all payment fields.">
  <input placeholder="Card number" />
  <input placeholder="Expiry (MM/YY)" />
</Fieldset>`}
		>
			<Fieldset legend="Payment" invalid errorText="Please complete all payment fields.">
				<input class={inputClass} placeholder="Card number" />
				<input class={inputClass} placeholder="Expiry (MM/YY)" />
			</Fieldset>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="All fields within are disabled."
			code={`<Fieldset legend="Account" disabled>
  <input value="janedoe" />
  <input value="jane@example.com" />
</Fieldset>`}
		>
			<Fieldset legend="Account" disabled>
				<input class={inputClass} value="janedoe" />
				<input class={inputClass} value="jane@example.com" />
			</Fieldset>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
