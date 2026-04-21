<script lang="ts">
	import { Checkbox } from '$ui/checkbox';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let agreedToTerms = $state(false);
	let formResult = $state('');

	const propsData = [
		{ name: 'label', type: 'string', default: '—', description: 'Display label text' },
		{
			name: 'checked',
			type: 'boolean',
			default: 'false',
			description: 'Controlled checked state. Supports bind:checked'
		},
		{
			name: 'indeterminate',
			type: 'boolean',
			default: 'false',
			description: 'Controlled indeterminate state. Supports bind:indeterminate'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{
			name: 'value',
			type: 'string',
			default: '"on"',
			description: 'Form submission value when checked'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the checkbox' },
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
		{ name: 'readonly', type: 'boolean', default: 'false', description: 'Make read-only' },
		{
			name: 'onCheckedChange',
			type: '(checked: boolean) => void',
			default: '—',
			description: 'Callback when checked state changes'
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
		<h1 class="text-3xl font-bold">Checkbox</h1>
		<p class="text-kl-muted-content mt-2">
			A control that allows toggling between checked, unchecked, and indeterminate states. Built on
			bits-ui.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple checkbox with a label."
			code="<Checkbox label=&quot;Accept terms&quot; />"
		>
			<Checkbox label="Accept terms" />
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage the checked state externally with bind:checked."
			code={`<Checkbox label="I agree" bind:checked={agreedToTerms} />
<p>State: {agreedToTerms}</p>`}
		>
			<div class="space-y-2">
				<Checkbox label="I agree" bind:checked={agreedToTerms} />
				<p class="text-kl-muted-content text-sm">
					State: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{agreedToTerms}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Indeterminate"
			description="Third state for partial selections (e.g., &quot;select all&quot; with some items checked)."
			code="<Checkbox label=&quot;Select all&quot; indeterminate />"
		>
			<Checkbox label="Select all" indeterminate />
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Checkbox in disabled state."
			code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled checked />`}
		>
			<div class="flex flex-col gap-2">
				<Checkbox label="Disabled unchecked" disabled />
				<Checkbox label="Disabled checked" disabled checked />
			</div>
		</DemoCard>

		<DemoCard
			title="Required"
			description="Marks the checkbox as required for form validation."
			code="<Checkbox label=&quot;Required field&quot; required />"
		>
			<Checkbox label="Required field" required />
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <Checkbox label="Subscribe to newsletter" name="subscribe" />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('subscribe')?.toString() ?? '(unchecked)';
					}}
					class="space-y-3"
				>
					<Checkbox label="Subscribe to newsletter" name="subscribe" />
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
