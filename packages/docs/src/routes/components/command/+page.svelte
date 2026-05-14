<script lang="ts">
	import { Command } from '$ui/command';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ label: 'Open dashboard', value: 'dashboard', group: 'Navigation' },
		{ label: 'Invite member', value: 'invite', group: 'Actions' },
		{ label: 'Create report', value: 'report', group: 'Actions' }
	];

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
	<DemoCard title="Palette" description="Data-driven command items." code="<Command {items} />">
		<Command {items} class="max-w-md" />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
