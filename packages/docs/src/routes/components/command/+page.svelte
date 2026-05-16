<script lang="ts">
	import { Command } from '$ui/command';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ label: 'Open dashboard', value: 'dashboard', group: 'Navigation' },
		{ label: 'Invite member', value: 'invite', group: 'Actions' },
		{ label: 'Create report', value: 'report', group: 'Actions' }
	];
	const adminItems = [
		{ label: 'Open audit log', value: 'audit', group: 'Admin', keywords: ['security'] },
		{ label: 'Manage billing', value: 'billing', group: 'Admin' },
		{ label: 'Suspend workspace', value: 'suspend', group: 'Danger zone', disabled: true },
		{ label: 'Transfer ownership', value: 'transfer', group: 'Danger zone' }
	];
	const emptyItems = [
		{ label: 'Archive customer', value: 'archive', group: 'Customers' },
		{ label: 'Assign owner', value: 'assign', group: 'Customers' }
	];

	let selected = $state('');
	let search = $state('owner');
	let lastSelected = $state('Nothing selected');

	const propsData = [
		{
			name: 'items',
			type: 'CommandItem[]',
			default: '-',
			description: 'Items to render and filter.'
		},
		{
			name: 'value',
			type: 'string',
			default: "''",
			description: 'Selected command value. Supports bind:value.'
		},
		{
			name: 'search',
			type: 'string',
			default: "''",
			description: 'Search query. Supports bind:search.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Search commands...'",
			description: 'Input placeholder.'
		},
		{
			name: 'emptyText',
			type: 'string',
			default: "'No results found.'",
			description: 'Empty state text.'
		},
		{
			name: 'label',
			type: 'string',
			default: "'Command menu'",
			description: 'Accessible menu label.'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'true',
			description: 'Loop keyboard navigation.'
		},
		{
			name: 'onSelect',
			type: '(value: string) => void',
			default: '-',
			description: 'Called when an item is selected.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			default: '-',
			description: 'Called when value changes.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional root classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Command</h1>
		<p class="text-kl-muted-content mt-2">A command menu with built-in filtering.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Palette" description="Data-driven command items." code="<Command {items} />">
			<Command {items} class="max-w-md" />
		</DemoCard>

		<DemoCard
			title="Controlled value"
			description="Bind selected value and react to command selection."
			code={`<Command
  {items}
  bind:value={selected}
  onSelect={(value) => (lastSelected = value)}
/>`}
		>
			<div class="space-y-3">
				<Command
					{items}
					bind:value={selected}
					onSelect={(value) => (lastSelected = `Selected ${value}`)}
					class="max-w-md"
				/>
				<p class="text-kl-muted-content text-sm">{lastSelected}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Grouped admin actions"
			description="Group commands and disable unavailable actions."
			code={`<Command
  items={adminItems}
  placeholder="Search admin actions..."
/>`}
		>
			<Command
				items={adminItems}
				placeholder="Search admin actions..."
				label="Admin actions"
				class="max-w-md"
			/>
		</DemoCard>

		<DemoCard
			title="Search and empty state"
			description="Bind the query and customize empty text."
			code={`<Command
  items={emptyItems}
  bind:search
  emptyText="No customer command matches."
/>`}
		>
			<Command
				items={emptyItems}
				bind:search
				emptyText="No customer command matches."
				class="max-w-md"
			/>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
