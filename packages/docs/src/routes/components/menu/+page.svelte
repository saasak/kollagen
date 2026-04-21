<script lang="ts">
	import { Menu } from '$ui/menu';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const fileItems = [
		{ label: 'New File', value: 'new-file' },
		{ label: 'Open...', value: 'open' },
		{ label: 'Save', value: 'save' },
		{ label: 'Export as PDF', value: 'export-pdf' }
	];

	const groupedItems = [
		{
			type: 'group' as const,
			label: 'Actions',
			items: [
				{ label: 'Edit', value: 'edit' },
				{ label: 'Duplicate', value: 'duplicate' }
			]
		},
		{ type: 'separator' as const },
		{
			type: 'group' as const,
			label: 'Danger',
			items: [
				{ label: 'Archive', value: 'archive' },
				{ label: 'Delete', value: 'delete' }
			]
		}
	];

	const mixedItems = [
		{ label: 'Cut', value: 'cut' },
		{ label: 'Copy', value: 'copy' },
		{ label: 'Paste', value: 'paste' },
		{ type: 'separator' as const },
		{ label: 'Select All', value: 'select-all' }
	];

	const withDisabledItems = [
		{ label: 'Undo', value: 'undo' },
		{ label: 'Redo', value: 'redo', disabled: true },
		{ type: 'separator' as const },
		{ label: 'Cut', value: 'cut' },
		{ label: 'Copy', value: 'copy', disabled: true },
		{ label: 'Paste', value: 'paste' }
	];

	let lastAction = $state('');

	const propsData = [
		{
			name: 'items',
			type: 'MenuEntry[]',
			default: '—',
			description: 'Array of menu items, groups, and separators'
		},
		{
			name: 'open',
			type: 'boolean',
			default: '—',
			description: 'Controlled open state. Supports bind:open'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the menu trigger'
		},
		{
			name: 'closeOnSelect',
			type: 'boolean',
			default: 'true',
			description: 'Close menu after an item is selected'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'false',
			description: 'Loop keyboard navigation at list boundaries'
		},
		{
			name: 'onSelect',
			type: '(value: string) => void',
			default: '—',
			description: 'Callback when a menu item is selected'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			default: '—',
			description: 'Callback when the menu opens or closes'
		},
		{
			name: 'trigger',
			type: 'Snippet',
			default: '—',
			description: 'Content rendered inside the trigger button'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the menu content'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Menu</h1>
		<p class="text-kl-muted-content mt-2">
			Dropdown menu for actions and navigation. Supports grouping, separators, and disabled items.
			Built on bits-ui.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple dropdown menu with a list of actions."
			code={`<Menu
  items={[
    { label: "New File", value: "new-file" },
    { label: "Open...", value: "open" },
    { label: "Save", value: "save" },
    { label: "Export as PDF", value: "export-pdf" },
  ]}
  onSelect={(value) => console.log(value)}
>
  {#snippet trigger()}File{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu
					items={fileItems}
					onSelect={(value) => {
						lastAction = value;
					}}
				>
					{#snippet trigger()}File{/snippet}
				</Menu>
				{#if lastAction}
					<p class="text-kl-muted-content mt-2 text-sm">
						Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{lastAction}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>

		<DemoCard
			title="With separators"
			description="Use separator entries to visually divide groups of items."
			code={`<Menu
  items={[
    { label: "Cut", value: "cut" },
    { label: "Copy", value: "copy" },
    { label: "Paste", value: "paste" },
    { type: "separator" },
    { label: "Select All", value: "select-all" },
  ]}
>
  {#snippet trigger()}Edit{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={mixedItems}>
					{#snippet trigger()}Edit{/snippet}
				</Menu>
			</div>
		</DemoCard>

		<DemoCard
			title="Grouped items"
			description="Organize items into labeled groups with separators between them."
			code={`<Menu
  items={[
    { type: "group", label: "Actions", items: [
      { label: "Edit", value: "edit" },
      { label: "Duplicate", value: "duplicate" },
    ]},
    { type: "separator" },
    { type: "group", label: "Danger", items: [
      { label: "Archive", value: "archive" },
      { label: "Delete", value: "delete" },
    ]},
  ]}
>
  {#snippet trigger()}Options{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={groupedItems}>
					{#snippet trigger()}Options{/snippet}
				</Menu>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled items"
			description="Individual menu items can be disabled while others remain interactive."
			code={`<Menu
  items={[
    { label: "Undo", value: "undo" },
    { label: "Redo", value: "redo", disabled: true },
    { type: "separator" },
    { label: "Cut", value: "cut" },
    { label: "Copy", value: "copy", disabled: true },
    { label: "Paste", value: "paste" },
  ]}
>
  {#snippet trigger()}Edit{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={withDisabledItems}>
					{#snippet trigger()}Edit{/snippet}
				</Menu>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled trigger"
			description="The entire menu can be disabled via the trigger."
			code={`<Menu items={fileItems} disabled={true}>
  {#snippet trigger()}Disabled{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={fileItems} disabled={true}>
					{#snippet trigger()}Disabled{/snippet}
				</Menu>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
