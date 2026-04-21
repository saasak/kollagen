<script lang="ts">
	import { Clipboard } from '$ui/clipboard';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let statusMessage = $state('');
	let formResult = $state('');

	const propsData = [
		{
			name: 'value',
			type: 'string',
			default: '—',
			description: 'Controlled value to copy. Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'string',
			default: '—',
			description: 'Initial value for uncontrolled mode'
		},
		{
			name: 'timeout',
			type: 'number',
			default: '3000',
			description: 'Duration in ms to show the copied indicator'
		},
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Optional label displayed above the input'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the clipboard input and trigger'
		},
		{
			name: 'onValueChange',
			type: '(details: { value: string }) => void',
			default: '—',
			description: 'Callback when the clipboard value changes'
		},
		{
			name: 'onStatusChange',
			type: '(details: { copied: boolean }) => void',
			default: '—',
			description: 'Callback when copy status changes'
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
		<h1 class="text-3xl font-bold">Clipboard</h1>
		<p class="text-kl-muted-content mt-2">
			Copy-to-clipboard input with visual feedback. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Click the copy icon to copy the value to clipboard."
			code="<Clipboard value=&quot;https://kollagen.dev&quot; />"
		>
			<div class="max-w-sm">
				<Clipboard value="https://kollagen.dev" />
			</div>
		</DemoCard>

		<DemoCard
			title="With label"
			description="Display a label above the clipboard input."
			code="<Clipboard value=&quot;npm install kollagen&quot; label=&quot;Install command&quot; />"
		>
			<div class="max-w-sm">
				<Clipboard value="npm install kollagen" label="Install command" />
			</div>
		</DemoCard>

		<DemoCard
			title="Status callback"
			description="React to copy events with onStatusChange."
			code={`<Clipboard
  value="secret-api-key-123"
  onStatusChange={(details) => {
    statusMessage = details.copied ? "Copied!" : "";
  }}
/>`}
		>
			<div class="max-w-sm space-y-2">
				<Clipboard
					value="secret-api-key-123"
					onStatusChange={(details) => {
						statusMessage = details.copied ? 'Copied!' : '';
					}}
				/>
				{#if statusMessage}
					<p class="text-kl-primary text-sm">{statusMessage}</p>
				{/if}
			</div>
		</DemoCard>

		<DemoCard
			title="Custom timeout"
			description="The copied indicator resets after the specified timeout (1 second here)."
			code={`<Clipboard value="short-feedback" timeout={1000} />`}
		>
			<div class="max-w-sm">
				<Clipboard value="short-feedback" timeout={1000} />
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Clipboard in disabled state."
			code={`<Clipboard value="can't copy this" disabled={true} />`}
		>
			<div class="max-w-sm">
				<Clipboard value="can't copy this" disabled={true} />
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Use bind:value to read the clipboard value in a form."
			code={`<form onsubmit={handleSubmit}>
  <Clipboard bind:value={clipboardValue} />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="max-w-sm space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						formResult = 'form-value-example';
					}}
					class="space-y-3"
				>
					<Clipboard value="form-value-example" label="Copy & submit" />
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
