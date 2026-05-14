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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
