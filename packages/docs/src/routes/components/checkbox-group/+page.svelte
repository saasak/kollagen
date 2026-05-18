<script lang="ts">
	import { CheckboxGroup } from '$ui/checkbox-group';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ value: 'analytics', label: 'Analytics' },
		{ value: 'billing', label: 'Billing' },
		{ value: 'support', label: 'Support', disabled: true }
	];

	type ModuleItem = (typeof items)[number];

	let value = $state(['analytics']);
	let selectedModules = $state<ModuleItem[]>([items[0], items[1]]);
	let checkboxGroupApi = $state<{ removeSelected: (item: ModuleItem) => void }>();
	let formResult = $state('');

	const propsData = [
		{ name: 'items', type: 'T[]', default: '—', description: 'Options to render.' },
		{
			name: 'itemToLabel',
			type: '(item: T) => string',
			default: 'item.label ?? String(item)',
			description: 'Maps each item to a visible label.'
		},
		{
			name: 'itemToValue',
			type: '(item: T) => string',
			default: 'item.value ?? String(item)',
			description: 'Maps each item to the submitted value.'
		},
		{
			name: 'value',
			type: 'string[]',
			default: '[]',
			description: 'Selected values. Supports bind:value.'
		},
		{
			name: 'selected',
			type: 'T[]',
			default: '—',
			description: 'Selected item object(s). Supports bind:selected.'
		},
		{ name: 'label', type: 'string', default: '—', description: 'Display label for the group.' },
		{ name: 'name', type: 'string', default: '—', description: 'Form field name.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all options.' },
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required.' },
		{ name: 'readonly', type: 'boolean', default: 'false', description: 'Make read-only.' },
		{
			name: 'orientation',
			type: '"horizontal" | "vertical"',
			default: '"vertical"',
			description: 'Layout orientation.'
		},
		{
			name: 'onValueChange',
			type: '(value: string[]) => void',
			default: '—',
			description: 'Callback when value changes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">CheckboxGroup</h1>
		<p class="text-kl-muted-content mt-2">A simple group for selecting multiple values.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Multiple options with a shared label."
			code={`<CheckboxGroup label="Modules" items={items} />`}
		>
			<CheckboxGroup label="Modules" {items} />
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage selected values with bind:value."
			code={`<CheckboxGroup label="Modules" items={items} bind:value={value} />`}
		>
			<div class="space-y-2">
				<CheckboxGroup label="Modules" {items} bind:value />
				<p class="text-kl-muted-content text-sm">
					Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{value.join(', ') || 'none'}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Horizontal"
			description="Lay out options in a row."
			code={`<CheckboxGroup label="Modules" items={items} orientation="horizontal" />`}
		>
			<CheckboxGroup label="Modules" {items} orientation="horizontal" />
		</DemoCard>

		<DemoCard
			title="Selected objects"
			description="Bind selected item objects and remove a selected item from outside."
			code={`let selectedModules = $state([items[0], items[1]]);
let checkboxGroupApi;

<CheckboxGroup
  bind:this={checkboxGroupApi}
  label="Modules"
  items={items}
  bind:selected={selectedModules}
/>

{#each selectedModules as item}
  <button type="button" onclick={() => checkboxGroupApi.removeSelected(item)}>
    Remove {item.label}
  </button>
{/each}`}
		>
			<div class="space-y-3">
				<CheckboxGroup
					bind:this={checkboxGroupApi}
					label="Modules"
					{items}
					bind:selected={selectedModules}
				/>
				<div class="flex flex-wrap gap-2">
					{#each selectedModules as item (item.value)}
						<button
							type="button"
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 border px-2.5 py-1 text-sm transition-colors"
							onclick={() => checkboxGroupApi?.removeSelected(item)}
						>
							Remove {item.label}
						</button>
					{/each}
				</div>
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Submits the selected string values natively."
			code={`<form>
  <CheckboxGroup label="Modules" name="modules" items={items} />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.getAll('modules').map(String).join(', ') || '(none)';
					}}
					class="space-y-3"
				>
					<CheckboxGroup label="Modules" name="modules" {items} />
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
