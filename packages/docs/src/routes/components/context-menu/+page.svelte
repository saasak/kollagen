<script lang="ts">
	import { ContextMenu } from '$ui/context-menu';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ label: 'Rename', value: 'rename' },
		{ label: 'Duplicate', value: 'duplicate' },
		{ type: 'separator' as const },
		{ label: 'Delete', value: 'delete' }
	];
	const nestedItems = [
		{ label: 'Open', value: 'open' },
		{
			type: 'submenu' as const,
			label: 'Move to',
			items: [
				{ label: 'Backlog', value: 'move.backlog' },
				{ label: 'In progress', value: 'move.progress' },
				{ label: 'Done', value: 'move.done' }
			]
		},
		{ type: 'separator' as const },
		{ label: 'Archive', value: 'archive' }
	];
	const disabledItems = [
		{ label: 'Open invoice', value: 'open' },
		{ label: 'Refund payment', value: 'refund', disabled: true },
		{ type: 'separator' as const },
		{ label: 'Copy payment link', value: 'copy' }
	];

	let lastSelected = $state('Right-click a target');

	const propsData = [
		{
			name: 'items',
			type: 'ContextMenuEntry[]',
			default: '-',
			description: 'Menu item definitions.'
		},
		{
			name: 'onSelect',
			type: '(value: string) => void',
			default: '-',
			description: 'Called when an item is selected.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Right-click target.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional trigger classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">ContextMenu</h1>
		<p class="text-kl-muted-content mt-2">Right-click actions built with Bits UI.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Target"
			description="Right-click the panel."
			code="<ContextMenu {items}>...</ContextMenu>"
		>
			<ContextMenu {items}>
				<div
					class="rounded-kl-box border-kl-base-300 bg-kl-base-200 text-kl-muted-content flex h-32 items-center justify-center border text-sm"
				>
					Right-click here
				</div>
			</ContextMenu>
		</DemoCard>

		<DemoCard
			title="Selection callback"
			description="Use onSelect to route actions by value."
			code={`<ContextMenu
  {items}
  onSelect={(value) => (lastSelected = value)}
>
  ...
</ContextMenu>`}
		>
			<div class="space-y-3">
				<ContextMenu {items} onSelect={(value) => (lastSelected = `Selected ${value}`)}>
					<div
						class="rounded-kl-box border-kl-base-300 bg-kl-base-100 flex h-28 items-center justify-center border text-sm"
					>
						Right-click customer row
					</div>
				</ContextMenu>
				<p class="text-kl-muted-content text-sm">{lastSelected}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Submenu"
			description="Nest secondary actions without crowding the first level."
			code={`const items = [{
  type: "submenu",
  label: "Move to",
  items: [...]
}];`}
		>
			<ContextMenu items={nestedItems}>
				<div
					class="rounded-kl-box border-kl-base-300 bg-kl-base-200 flex h-32 items-center justify-center border text-sm"
				>
					Right-click task card
				</div>
			</ContextMenu>
		</DemoCard>

		<DemoCard
			title="Disabled item"
			description="Keep unavailable contextual actions visible but inactive."
			code={`const items = [{ label: "Refund payment", disabled: true }];`}
		>
			<ContextMenu items={disabledItems}>
				<div
					class="rounded-kl-box border-kl-base-300 bg-kl-base-100 flex h-32 items-center justify-center border text-sm"
				>
					Right-click invoice
				</div>
			</ContextMenu>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
