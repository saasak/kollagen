<script lang="ts">
	import { Field } from '$ui/field';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let email = $state('');
	let formResult = $state('');

	const propsData = [
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Label text displayed above the input'
		},
		{
			name: 'helperText',
			type: 'string',
			default: '—',
			description: 'Helper text displayed below the input'
		},
		{
			name: 'errorText',
			type: 'string',
			default: '—',
			description: 'Error text displayed when invalid'
		},
		{
			name: 'textarea',
			type: 'boolean',
			default: 'false',
			description: 'Render a textarea instead of an input'
		},
		{
			name: 'type',
			type: 'string',
			default: '"text"',
			description: 'Input type (text, email, password, etc.)'
		},
		{ name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text' },
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{
			name: 'value',
			type: 'string',
			default: '—',
			description: 'Controlled value. Supports bind:value'
		},
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the field' },
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Mark as invalid' },
		{ name: 'readOnly', type: 'boolean', default: 'false', description: 'Make read-only' },
		{ name: 'rows', type: 'number', default: '3', description: 'Number of rows for textarea' },
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
		<h1 class="text-3xl font-bold">Field</h1>
		<p class="text-kl-muted-content mt-2">
			A structured form field with label, input, helper text, and error message. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple text field with a label."
			code="<Field label=&quot;Username&quot; placeholder=&quot;Enter username&quot; />"
		>
			<Field label="Username" placeholder="Enter username" />
		</DemoCard>

		<DemoCard
			title="With helper text"
			description="Provide additional context below the input."
			code="<Field label=&quot;Email&quot; type=&quot;email&quot; placeholder=&quot;you@example.com&quot; helperText=&quot;We'll never share your email.&quot; />"
		>
			<Field
				label="Email"
				type="email"
				placeholder="you@example.com"
				helperText="We'll never share your email."
			/>
		</DemoCard>

		<DemoCard
			title="Required"
			description="Shows a required indicator next to the label."
			code="<Field label=&quot;Full name&quot; required placeholder=&quot;Jane Doe&quot; />"
		>
			<Field label="Full name" required placeholder="Jane Doe" />
		</DemoCard>

		<DemoCard
			title="Invalid with error"
			description="Displays error styling and an error message."
			code="<Field label=&quot;Email&quot; type=&quot;email&quot; invalid errorText=&quot;Please enter a valid email address.&quot; placeholder=&quot;you@example.com&quot; />"
		>
			<Field
				label="Email"
				type="email"
				invalid
				errorText="Please enter a valid email address."
				placeholder="you@example.com"
			/>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Field in disabled state."
			code="<Field label=&quot;API Key&quot; value=&quot;sk-xxxx-xxxx&quot; disabled />"
		>
			<Field label="API Key" value="sk-xxxx-xxxx" disabled />
		</DemoCard>

		<DemoCard
			title="Read-only"
			description="Visible but not editable."
			code="<Field label=&quot;Account ID&quot; value=&quot;acc_12345&quot; readOnly />"
		>
			<Field label="Account ID" value="acc_12345" readOnly />
		</DemoCard>

		<DemoCard
			title="Textarea"
			description="Multi-line text input using the textarea prop."
			code={`<Field label="Bio" textarea placeholder="Tell us about yourself..." helperText="Max 500 characters." rows={4} />`}
		>
			<Field
				label="Bio"
				textarea
				placeholder="Tell us about yourself..."
				helperText="Max 500 characters."
				rows={4}
			/>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage the value externally with bind:value."
			code={`<Field label="Email" bind:value={email} type="email" placeholder="you@example.com" />
<p>Value: {email}</p>`}
		>
			<div class="space-y-2">
				<Field label="Email" bind:value={email} type="email" placeholder="you@example.com" />
				<p class="text-kl-muted-content text-sm">
					Value: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs">{email}</code>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('email')?.toString() ?? '(empty)';
					}}
					class="space-y-3"
				>
					<Field label="Email" name="email" type="email" required placeholder="you@example.com" />
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
