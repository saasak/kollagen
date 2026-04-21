<script lang="ts">
	import { PinInput } from '$ui/pin-input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledValue = $state('');
	let completedCode = $state('');
	let formResult = $state('');

	const propsData = [
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Label text displayed above the input'
		},
		{ name: 'count', type: 'number', default: '4', description: 'Number of input fields' },
		{
			name: 'value',
			type: 'string',
			default: '""',
			description: 'Controlled value as a string. Supports bind:value'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: '"○"',
			description: 'Placeholder character for each input'
		},
		{
			name: 'type',
			type: '"alphanumeric" | "numeric" | "alphabetic"',
			default: '"numeric"',
			description: 'Allowed input type'
		},
		{
			name: 'mask',
			type: 'boolean',
			default: 'false',
			description: 'Mask input like a password field'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all inputs' },
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Mark as invalid' },
		{
			name: 'textalign',
			type: '"left" | "center" | "right"',
			default: '"center"',
			description: 'Text alignment within cells'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			default: '—',
			description: 'Callback when value changes'
		},
		{
			name: 'onComplete',
			type: '(value: string) => void',
			default: '—',
			description: 'Callback when all inputs are filled'
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
		<h1 class="text-3xl font-bold">PinInput</h1>
		<p class="text-kl-muted-content mt-2">
			A segmented input for entering verification codes, OTPs, and PINs. Built on bits-ui.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Default 4-digit numeric pin input."
			code="<PinInput label=&quot;Verification code&quot; />"
		>
			<PinInput label="Verification code" />
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage value externally with bind:value."
			code={`<PinInput label="Enter PIN" bind:value={controlledValue} />
<p>Value: {controlledValue}</p>`}
		>
			<div class="space-y-2">
				<PinInput label="Enter PIN" bind:value={controlledValue} />
				<p class="text-kl-muted-content text-sm">
					Value: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledValue}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="6-digit code"
			description="Customise the number of inputs with the count prop."
			code={`<PinInput label="OTP" count={6} />`}
		>
			<PinInput label="OTP" count={6} />
		</DemoCard>

		<DemoCard
			title="Alphanumeric"
			description="Accept letters and numbers."
			code={`<PinInput label="License key" count={5} type="alphanumeric" />`}
		>
			<PinInput label="License key" count={5} type="alphanumeric" />
		</DemoCard>

		<DemoCard
			title="Masked"
			description="Hide values like a password field."
			code="<PinInput label=&quot;Secret PIN&quot; mask />"
		>
			<PinInput label="Secret PIN" mask />
		</DemoCard>

		<DemoCard
			title="On complete"
			description="React when all fields are filled."
			code={`<PinInput
  label="Enter code"
  onComplete={(value) => completedCode = value}
/>`}
		>
			<div class="space-y-2">
				<PinInput label="Enter code" onComplete={(value) => (completedCode = value)} />
				{#if completedCode}
					<p class="text-kl-muted-content text-sm">
						Completed: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{completedCode}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Disabled state."
			code="<PinInput label=&quot;Disabled&quot; disabled value=&quot;1234&quot; />"
		>
			<PinInput label="Disabled" disabled value="1234" />
		</DemoCard>

		<DemoCard
			title="Invalid"
			description="Shows error styling when validation fails."
			code="<PinInput label=&quot;Invalid code&quot; invalid />"
		>
			<PinInput label="Invalid code" invalid />
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={(e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const pin = data.get("pin")?.toString();
}}>
  <PinInput label="Verification" name="pin" />
  <button type="submit">Verify</button>
</form>`}
		>
			<div class="space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('pin')?.toString() ?? '(empty)';
					}}
					class="space-y-3"
				>
					<PinInput label="Verification" name="pin" />
					<button
						type="submit"
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Verify
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
