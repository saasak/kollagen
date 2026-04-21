<script lang="ts">
	import { TagsInput } from '$ui/tags-input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let formResult = $state('');

	const propsData = [
		{
			name: 'value',
			type: 'string[]',
			default: '—',
			description: 'Controlled tag values. Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'string[]',
			default: '—',
			description: 'Initial tags for uncontrolled mode'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: '""',
			description: 'Placeholder text for the input'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the tags input' },
		{ name: 'max', type: 'number', default: '—', description: 'Maximum number of tags allowed' },
		{
			name: 'delimiter',
			type: 'string | RegExp',
			default: '","',
			description: 'Character to split tags on input and paste'
		},
		{
			name: 'editable',
			type: 'boolean',
			default: 'true',
			description: 'Allow editing tags by double-clicking or pressing Enter'
		},
		{
			name: 'addOnPaste',
			type: 'boolean',
			default: 'false',
			description: 'Automatically add tags when pasting'
		},
		{
			name: 'blurBehavior',
			type: '"clear" | "add"',
			default: '—',
			description: 'What to do with input value on blur'
		},
		{
			name: 'validate',
			type: '(details) => boolean',
			default: '—',
			description: 'Custom validation function for new tags'
		},
		{
			name: 'onValueChange',
			type: '(details: { value: string[] }) => void',
			default: '—',
			description: 'Callback when tags change'
		},
		{
			name: 'onValueInvalid',
			type: '(details) => void',
			default: '—',
			description: 'Callback when a tag is invalid (duplicate, max reached)'
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
	<div>
		<h1 class="text-3xl font-bold">TagsInput</h1>
		<p class="text-kl-muted-content mt-2">
			Multi-value text input for adding and managing tags. Supports keyboard navigation, editing,
			paste, and validation. Built on bits-ui.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Type and press Enter or comma to add tags. Click × to remove."
			code={`<TagsInput placeholder="Add tag..." defaultValue={["svelte", "bits-ui"]} />`}
		>
			<div class="max-w-sm">
				<TagsInput placeholder="Add tag..." defaultValue={['svelte', 'ark-ui']} />
			</div>
		</DemoCard>

		<DemoCard
			title="Max tags"
			description="Limit the number of tags that can be added."
			code={`<TagsInput placeholder="Max 3 tags..." max={3} defaultValue={["one", "two"]} />`}
		>
			<div class="max-w-sm">
				<TagsInput placeholder="Max 3 tags..." max={3} defaultValue={['one', 'two']} />
			</div>
		</DemoCard>

		<DemoCard
			title="Add on paste"
			description="Paste comma-separated values to add multiple tags at once."
			code={`<TagsInput placeholder="Paste values..." addOnPaste={true} />`}
		>
			<div class="max-w-sm">
				<TagsInput placeholder="Paste values..." addOnPaste={true} />
			</div>
		</DemoCard>

		<DemoCard
			title="Custom validation"
			description="Reject duplicate tags with a custom validate function."
			code={`<TagsInput
  placeholder="No duplicates..."
  validate={({ inputValue, value }) =>
    !value.includes(inputValue)
  }
/>`}
		>
			<div class="max-w-sm">
				<TagsInput
					placeholder="No duplicates..."
					validate={({ inputValue, value }) => !value.includes(inputValue)}
				/>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Tags input in disabled state."
			code={`<TagsInput disabled={true} defaultValue={["locked"]} />`}
		>
			<div class="max-w-sm">
				<TagsInput disabled={true} defaultValue={['locked']} />
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Hidden input submits tag values with the form."
			code={`<form onsubmit={handleSubmit}>
  <TagsInput name="tags" placeholder="Add tags..." />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="max-w-sm space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.getAll('tags').join(', ') || '(empty)';
					}}
					class="space-y-3"
				>
					<TagsInput name="tags" placeholder="Add tags..." defaultValue={['example']} />
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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
