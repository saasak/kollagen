<script lang="ts">
	import { PasswordInput } from '$ui/password-input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	// eslint-disable-next-line no-useless-assignment -- $state() initial value is used by Svelte reactivity
	let visible = $state(false);
	let formResult = $state('');

	const propsData = [
		{
			name: 'value',
			type: 'string',
			default: '—',
			description: 'Controlled input value. Supports bind:value'
		},
		{
			name: 'visible',
			type: 'boolean',
			default: '—',
			description: 'Controlled visibility state. Supports bind:visible'
		},
		{
			name: 'defaultVisible',
			type: 'boolean',
			default: 'false',
			description: 'Initial visibility for uncontrolled mode'
		},
		{ name: 'placeholder', type: 'string', default: '—', description: 'Input placeholder text' },
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
		{
			name: 'invalid',
			type: 'boolean',
			default: 'false',
			description: 'Mark the input as invalid'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Mark the input as required'
		},
		{
			name: 'onVisibilityChange',
			type: '(details: { visible: boolean }) => void',
			default: '—',
			description: 'Callback when visibility state changes'
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
		<h1 class="text-3xl font-bold">Password Input</h1>
		<p class="text-kl-muted-content mt-2">A password field with a show/hide toggle.</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A simple password input with a visibility toggle."
			code="<PasswordInput placeholder=&quot;Enter password...&quot; />"
		>
			<div class="max-w-sm">
				<PasswordInput placeholder="Enter password..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Visible by default"
			description="Start with the password visible using defaultVisible."
			code="<PasswordInput defaultVisible placeholder=&quot;Enter password...&quot; />"
		>
			<div class="max-w-sm">
				<PasswordInput defaultVisible placeholder="Enter password..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Invalid state"
			description="Highlight the field in an error state with the invalid prop."
			code="<PasswordInput invalid placeholder=&quot;Enter password...&quot; />"
		>
			<div class="max-w-sm">
				<PasswordInput invalid placeholder="Enter password..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled visibility"
			description="Control the show/hide state externally with bind:visible."
			code={`<script>
  let visible = $state(false);
</script>

<PasswordInput bind:visible placeholder="Enter password..." />
<p class="text-sm text-kl-muted-content">
  Password is {visible ? "visible" : "hidden"}
</p>`}
		>
			<div class="max-w-sm space-y-2">
				<PasswordInput bind:visible placeholder="Enter password..." />
				<p class="text-kl-muted-content text-sm">
					Password is {visible ? 'visible' : 'hidden'}
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Password input in disabled state."
			code="<PasswordInput disabled placeholder=&quot;Enter password...&quot; />"
		>
			<div class="max-w-sm">
				<PasswordInput disabled placeholder="Enter password..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Use the name prop to include the value in native form submission."
			code={`<form onsubmit={handleSubmit}>
  <PasswordInput name="password" placeholder="Enter password..." />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="max-w-sm space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						const val = data.get('password')?.toString() ?? '';
						formResult = val ? `password=${'*'.repeat(val.length)}` : '(empty)';
					}}
					class="space-y-3"
				>
					<PasswordInput name="password" placeholder="Enter password..." />
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
