<script lang="ts">
	import { Editable } from '$ui/editable';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledValue = $state('Hello, world!');
	let formResult = $state('');

	const propsData = [
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Optional label rendered above the field'
		},
		{
			name: 'value',
			type: 'string',
			default: '—',
			description: 'Controlled value. Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'string',
			default: '—',
			description: 'Initial value for uncontrolled mode'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: '"Click to edit"',
			description: 'Placeholder shown when empty'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the field' },
		{ name: 'readOnly', type: 'boolean', default: 'false', description: 'Prevent editing' },
		{
			name: 'invalid',
			type: 'boolean',
			default: 'false',
			description: 'Mark the field as invalid with error styling'
		},
		{
			name: 'activationMode',
			type: '"focus" | "dblclick" | "click" | "none"',
			default: '"focus"',
			description: 'How the user enters edit mode'
		},
		{
			name: 'submitMode',
			type: '"enter" | "blur" | "none" | "both"',
			default: '"both"',
			description: 'What triggers saving the value'
		},
		{
			name: 'autoResize',
			type: 'boolean',
			default: 'false',
			description: 'Auto-expand input width with content'
		},
		{
			name: 'selectOnFocus',
			type: 'boolean',
			default: 'true',
			description: 'Select all text when entering edit mode'
		},
		{ name: 'maxLength', type: 'number', default: '—', description: 'Maximum character count' },
		{
			name: 'onValueChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when value changes'
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
		<h1 class="text-3xl font-bold">Editable</h1>
		<p class="text-kl-muted-content mt-2">
			Inline text editing — click to edit, Enter to save, Escape to cancel. Built on bits-ui.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Click the field or pencil icon to enter edit mode. Press Enter or click ✓ to save."
			code="<Editable defaultValue=&quot;Edit me!&quot; />"
		>
			<div class="max-w-sm">
				<Editable defaultValue="Edit me!" />
			</div>
		</DemoCard>

		<DemoCard
			title="With label"
			description="Optional label prop renders above the field."
			code="<Editable label=&quot;Display name&quot; defaultValue=&quot;Jane Doe&quot; />"
		>
			<div class="max-w-sm">
				<Editable label="Display name" defaultValue="Jane Doe" />
			</div>
		</DemoCard>

		<DemoCard
			title="Double-click to edit"
			description="Set activationMode=&quot;dblclick&quot; to require a double-click before entering edit mode."
			code="<Editable activationMode=&quot;dblclick&quot; defaultValue=&quot;Double-click to edit&quot; />"
		>
			<div class="max-w-sm">
				<Editable activationMode="dblclick" defaultValue="Double-click to edit" />
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled value"
			description="Bind value externally with bind:value. The current value is shown below."
			code={`<Editable bind:value={name} label="Name" />
<p>Current: {name}</p>`}
		>
			<div class="max-w-sm space-y-2">
				<Editable bind:value={controlledValue} label="Name" />
				<p class="text-kl-muted-content text-sm">
					Current: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledValue}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Disabled state prevents all interaction."
			code="<Editable disabled defaultValue=&quot;Can't touch this&quot; />"
		>
			<div class="max-w-sm">
				<Editable disabled defaultValue="Can't touch this" />
			</div>
		</DemoCard>

		<DemoCard
			title="Invalid state"
			description="Set invalid to show error-colored border and ring in edit mode."
			code="<Editable invalid label=&quot;Username&quot; defaultValue=&quot;taken@email.com&quot; />"
		>
			<div class="max-w-sm">
				<Editable invalid label="Username" defaultValue="taken@email.com" />
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Use the name prop for native form submission."
			code={`<form onsubmit={handleSubmit}>
  <Editable name="username" label="Username" defaultValue="janedoe" />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="max-w-sm space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('username')?.toString() ?? '(empty)';
					}}
					class="space-y-3"
				>
					<Editable name="username" label="Username" defaultValue="janedoe" />
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
