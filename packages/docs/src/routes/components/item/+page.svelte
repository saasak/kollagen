<script lang="ts">
	import { Item } from '$ui/item';
	import { Badge } from '$ui/badge';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'title',
			type: 'string',
			default: '-',
			description: 'Primary row text.'
		},
		{
			name: 'description',
			type: 'string',
			default: '-',
			description: 'Secondary row text.'
		},
		{
			name: 'media',
			type: 'Snippet',
			default: '-',
			description: 'Leading media.'
		},
		{
			name: 'actions',
			type: 'Snippet',
			default: '-',
			description: 'Trailing actions.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Custom body content.'
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
		<h1 class="text-3xl font-bold">Item</h1>
		<p class="text-kl-muted-content mt-2">A compact row for lists and settings.</p>
	</div>
	<DemoCard
		title="Row"
		description="Supports media and action snippets."
		code="<Item title='Billing' />"
	>
		<Item title="Billing" description="Next invoice closes on May 30.">
			{#snippet actions()}<Badge color="success" variant="soft">Active</Badge>{/snippet}
		</Item>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
