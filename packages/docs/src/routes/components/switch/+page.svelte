<script lang="ts">
	import { Switch } from '$ui/switch';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let notifications = $state(false);
	let formResult = $state('');

	const propsData = [
		{ name: 'label', type: 'string', default: '—', description: 'Display label text' },
		{
			name: 'checked',
			type: 'boolean',
			default: '—',
			description: 'Controlled checked state. Supports bind:checked'
		},
		{
			name: 'defaultChecked',
			type: 'boolean',
			default: '—',
			description: 'Initial state for uncontrolled mode'
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
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the switch' },
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Mark as invalid' },
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
		{ name: 'readOnly', type: 'boolean', default: 'false', description: 'Make read-only' },
		{
			name: 'onCheckedChange',
			type: '(details) => void',
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
		<h1 class="text-3xl font-bold">Switch</h1>
		<p class="text-kl-muted-content mt-2">
			A toggle control for switching between on and off states. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple switch with a label."
			code="<Switch label=&quot;Enable notifications&quot; />"
		>
			<Switch label="Enable notifications" />
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage the checked state externally with bind:checked."
			code={`<Switch label="Notifications" bind:checked={notifications} />
<p>State: {notifications}</p>`}
		>
			<div class="space-y-2">
				<Switch label="Notifications" bind:checked={notifications} />
				<p class="text-kl-muted-content text-sm">
					State: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{notifications}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Default checked"
			description="Start in the on state using defaultChecked."
			code={`<Switch label="Dark mode" defaultChecked={true} />`}
		>
			<Switch label="Dark mode" defaultChecked={true} />
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Switch in disabled state."
			code={`<Switch label="Disabled off" disabled />
<Switch label="Disabled on" disabled defaultChecked={true} />`}
		>
			<div class="flex flex-col gap-2">
				<Switch label="Disabled off" disabled />
				<Switch label="Disabled on" disabled defaultChecked={true} />
			</div>
		</DemoCard>

		<DemoCard
			title="Invalid"
			description="Shows error styling when validation fails."
			code="<Switch label=&quot;Required setting&quot; invalid />"
		>
			<Switch label="Required setting" invalid />
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <Switch label="Opt in to emails" name="optIn" />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('optIn')?.toString() ?? '(off)';
					}}
					class="space-y-3"
				>
					<Switch label="Opt in to emails" name="optIn" />
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
