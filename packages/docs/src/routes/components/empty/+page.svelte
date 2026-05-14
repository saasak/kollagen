<script lang="ts">
	import { Empty } from '$ui/empty';
	import { Button } from '$ui/button';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Inbox } from 'lucide-svelte';

	const propsData = [
		{
			name: 'title',
			type: 'string',
			default: '-',
			description: 'Empty state title.'
		},
		{
			name: 'description',
			type: 'string',
			default: '-',
			description: 'Supporting text.'
		},
		{
			name: 'icon',
			type: 'Snippet',
			default: '-',
			description: 'Optional icon block.'
		},
		{
			name: 'action',
			type: 'Snippet',
			default: '-',
			description: 'Optional recovery action.'
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
		<h1 class="text-3xl font-bold">Empty</h1>
		<p class="text-kl-muted-content mt-2">A reusable empty state.</p>
	</div>
	<DemoCard
		title="No data"
		description="Use action snippets for recovery."
		code="<Empty title='No messages' />"
	>
		<Empty title="No messages" description="New messages will appear here.">
			{#snippet icon()}<Inbox />{/snippet}
			{#snippet action()}<Button size="sm">Refresh</Button>{/snippet}
		</Empty>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
