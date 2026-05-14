<script lang="ts">
	import { Menubar } from '$ui/menubar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const menus = [
		{
			label: 'File',
			items: [
				{ label: 'New', value: 'new' },
				{ label: 'Export', value: 'export' }
			]
		},
		{
			label: 'Edit',
			items: [
				{ label: 'Undo', value: 'undo' },
				{ label: 'Redo', value: 'redo' }
			]
		}
	];

	const propsData = [
		{
			name: 'menus',
			type: 'MenubarMenu[]',
			default: '-',
			description: 'Top-level menu definitions.'
		},
		{
			name: 'onSelect',
			type: '(value: string) => void',
			default: '-',
			description: 'Called when an item is selected.'
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
		<h1 class="text-3xl font-bold">Menubar</h1>
		<p class="text-kl-muted-content mt-2">Persistent app menus built with Bits UI.</p>
	</div>
	<DemoCard
		title="Application menu"
		description="Keyboard accessible menu bar."
		code="<Menubar {menus} />"
	>
		<Menubar {menus} />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
