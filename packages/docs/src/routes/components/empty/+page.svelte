<script lang="ts">
	import { Empty } from '$ui/empty';
	import { Button } from '$ui/button';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { FilePlus, Inbox, SearchX } from 'lucide-svelte';

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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

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

		<DemoCard
			title="Search results"
			description="Tell users which query failed and offer a clear reset."
			code={`<Empty title="No results" description="No customers match this filter.">
  {#snippet icon()}<SearchX />{/snippet}
  {#snippet action()}<Button size="sm">Clear filters</Button>{/snippet}
</Empty>`}
		>
			<Empty title="No results" description="No customers match &quot;enterprise overdue&quot;.">
				{#snippet icon()}<SearchX />{/snippet}
				{#snippet action()}<Button size="sm" variant="outline">Clear filters</Button>{/snippet}
			</Empty>
		</DemoCard>

		<DemoCard
			title="First-run setup"
			description="Use a primary action when the empty state is the expected start."
			code={`<Empty title="Create your first report">
  {#snippet icon()}<FilePlus />{/snippet}
  {#snippet action()}<Button size="sm">New report</Button>{/snippet}
</Empty>`}
		>
			<Empty
				title="Create your first report"
				description="Reports combine metrics, owners, and scheduled delivery."
			>
				{#snippet icon()}<FilePlus />{/snippet}
				{#snippet action()}<Button size="sm" color="primary">New report</Button>{/snippet}
			</Empty>
		</DemoCard>

		<DemoCard
			title="Compact panel"
			description="Constrain width and padding for embedded empty states."
			code={`<Empty
  class="max-w-sm"
  title="No attachments"
  description="Files added to this task appear here."
/>`}
		>
			<div class="rounded-kl-box border-kl-base-300 max-w-md border p-4">
				<Empty
					class="py-6"
					title="No attachments"
					description="Files added to this task appear here."
				/>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
