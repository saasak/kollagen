<script lang="ts">
	import { Command } from '$ui/command';
	import type { CommandItem } from '$ui/command';
	import { Trigger } from '$ui/trigger';
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
	let selectedCommand = $state<CommandItem | undefined>();
	let search = $state('owner');
	let lastSelected = $state('Nothing selected');
	let controlledOpen = $state(false);
	let commandApi = $state<{ clearSelected: () => void }>();

	const propsData = [
		{
			name: 'items',
			type: 'CommandItem[]',
			default: '-',
			description: 'Items to render and filter.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Implicit trigger content.'
		},
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			description: 'Controlled palette open state. Supports bind:open.'
		},
		{
			name: 'value',
			type: 'string',
			default: "''",
			description: 'Selected command value. Supports bind:value.'
		},
		{
			name: 'selected',
			type: 'CommandItem',
			default: '—',
			description: 'Selected command item object. Supports bind:selected.'
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
			name: 'shortcut',
			type: 'boolean',
			default: 'true',
			description: 'Open with Cmd+K or Ctrl+K.'
		},
		{
			name: 'shallowRouting',
			type: 'boolean',
			default: 'true',
			description: 'Add a SvelteKit history entry so browser back dismisses the palette.'
		},
		{
			name: 'shallowStateKey',
			type: 'string',
			default: 'auto',
			description: 'Custom SvelteKit page.state key for shallow routing.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger.'
		},
		{
			name: 'preventScroll',
			type: 'boolean',
			default: 'true',
			description: 'Prevent background scrolling when open.'
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
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			default: '-',
			description: 'Called when open state changes.'
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
		<p class="text-kl-muted-content mt-2">A dialog command palette with built-in filtering.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Palette"
			description="Open a data-driven command palette."
			code={`<Command {items}>
  <Trigger color="primary">Open command</Trigger>
</Command>`}
		>
			<Command {items}>
				<Trigger color="primary">Open command</Trigger>
			</Command>
		</DemoCard>

		<DemoCard
			title="Controlled value"
			description="Bind selected value and react to command selection."
			code={`<Command
  {items}
  bind:value={selected}
  onSelect={(value) => (lastSelected = value)}
>
  <Trigger>Search actions</Trigger>
</Command>`}
		>
			<div class="space-y-3">
				<Command
					{items}
					bind:value={selected}
					onSelect={(value) => (lastSelected = `Selected ${value}`)}
				>
					<Trigger>Search actions</Trigger>
				</Command>
				<p class="text-kl-muted-content text-sm">{lastSelected}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled open"
			description="Control the palette state from outside."
			code={`<Command {items} bind:open={controlledOpen}>
  <Trigger color="primary">
    {controlledOpen ? 'Close command' : 'Open command'}
  </Trigger>
</Command>`}
		>
			<Command {items} bind:open={controlledOpen}>
				<Trigger color="primary">{controlledOpen ? 'Close command' : 'Open command'}</Trigger>
			</Command>
		</DemoCard>

		<DemoCard
			title="Selected object"
			description="Bind the selected command object and clear it from outside."
			code={`let selectedCommand = $state();
let commandApi;

<Command
  bind:this={commandApi}
  {items}
  bind:selected={selectedCommand}
>
  <Trigger>Select command</Trigger>
</Command>

{#if selectedCommand}
  <button type="button" onclick={() => commandApi.clearSelected()}>
    Clear {selectedCommand.label}
  </button>
{/if}`}
		>
			<div class="space-y-3">
				<Command bind:this={commandApi} {items} bind:selected={selectedCommand}>
					<Trigger>Select command</Trigger>
				</Command>
				{#if selectedCommand}
					<button
						type="button"
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 border px-2.5 py-1 text-sm transition-colors"
						onclick={() => commandApi?.clearSelected()}
					>
						Clear {selectedCommand.label}
					</button>
				{/if}
			</div>
		</DemoCard>

		<DemoCard
			title="Grouped admin actions"
			description="Group commands and disable unavailable actions."
			code={`<Command
  items={adminItems}
  placeholder="Search admin actions..."
>
  <Trigger>Admin actions</Trigger>
</Command>`}
		>
			<Command items={adminItems} placeholder="Search admin actions..." label="Admin actions">
				<Trigger>Admin actions</Trigger>
			</Command>
		</DemoCard>

		<DemoCard
			title="Search and empty state"
			description="Bind the query and customize empty text."
			code={`<Command
  items={emptyItems}
  bind:search
  emptyText="No customer command matches."
>
  <Trigger>Search customers</Trigger>
</Command>`}
		>
			<Command items={emptyItems} bind:search emptyText="No customer command matches.">
				<Trigger>Search customers</Trigger>
			</Command>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
