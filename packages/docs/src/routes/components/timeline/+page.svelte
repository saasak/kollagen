<script lang="ts">
	import { Timeline } from '$ui/timeline';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Check, CircleDot, GitBranch, PackageCheck } from 'lucide-svelte';

	type ReleaseEvent = {
		id: string;
		title: string;
		description: string;
		date: string;
		status: 'done' | 'active' | 'queued';
	};

	const events: ReleaseEvent[] = [
		{
			id: 'spec',
			title: 'Component spec',
			description: 'Timeline API, paging contract, and snippets are defined.',
			date: '09:00',
			status: 'done'
		},
		{
			id: 'registry',
			title: 'Registry entry',
			description: 'The component is packaged for jsrepo distribution.',
			date: '10:30',
			status: 'done'
		},
		{
			id: 'docs',
			title: 'Documentation',
			description: 'Examples cover custom markers, states, and pagination.',
			date: '11:15',
			status: 'active'
		}
	];

	let infiniteItems = $state<ReleaseEvent[]>(events.slice(0, 2));
	let page = $state(1);
	let loading = $state(false);
	let hasMore = $state(true);
	let error = $state<string | null>(null);
	let retryLoading = $state(false);
	let retryError = $state<string | null>('Page 2 failed');

	const propsData = [
		{ name: 'items', type: 'T[]', default: '—', description: 'Timeline entries' },
		{
			name: 'page',
			type: 'number',
			default: 'initialPage',
			description: 'Controlled requested page. Supports bind:page'
		},
		{
			name: 'initialPage',
			type: 'number',
			default: '1',
			description: 'First page already represented by items'
		},
		{
			name: 'perPage',
			type: 'number',
			default: '10',
			description: 'Items per page used when requesting more data'
		},
		{
			name: 'hasMore',
			type: 'boolean',
			default: 'false',
			description: 'Whether more pages can be loaded'
		},
		{
			name: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Loading state for the current page request'
		},
		{
			name: 'error',
			type: 'string | null',
			default: 'null',
			description: 'Error message for the current page request'
		},
		{
			name: 'orientation',
			type: '"vertical" | "horizontal"',
			default: '"vertical"',
			description: 'Timeline layout orientation'
		},
		{
			name: 'side',
			type: '"start" | "end" | "alternate"',
			default: '"alternate"',
			description: 'Content placement for vertical timelines'
		},
		{
			name: 'marker',
			type: 'Snippet<[T, number]>',
			default: '—',
			description: 'Render snippet for the timeline marker'
		},
		{
			name: 'opposite',
			type: 'Snippet<[T, number]>',
			default: '—',
			description: 'Render snippet for the opposite side content'
		},
		{
			name: 'children',
			type: 'Snippet<[T, number]>',
			default: '—',
			description: 'Render snippet for each item'
		},
		{ name: 'empty', type: 'Snippet', default: '—', description: 'Empty state snippet' },
		{ name: 'loadingContent', type: 'Snippet', default: '—', description: 'Loading state snippet' },
		{
			name: 'errorContent',
			type: 'Snippet<[string, () => void]>',
			default: '—',
			description: 'Error state snippet. Receives message and retry function'
		},
		{
			name: 'onLoadMore',
			type: '(details: { page: number; perPage: number }) => void',
			default: '—',
			description: 'Callback when another page should be loaded'
		},
		{
			name: 'onPageChange',
			type: '(details: { page: number }) => void',
			default: '—',
			description: 'Callback when the requested page changes'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];

	function getStatusClass(status: ReleaseEvent['status']) {
		if (status === 'done') return 'text-kl-success';
		if (status === 'active') return 'text-kl-primary';
		return 'text-kl-muted-content';
	}

	function loadMore(details: { page: number; perPage: number }) {
		loading = true;
		error = null;

		window.setTimeout(() => {
			const nextItems = Array.from({ length: details.perPage }, (_, index) => {
				const itemNumber = (details.page - 1) * details.perPage + index + 1;
				return {
					id: `event-${itemNumber}`,
					title: `Release event ${itemNumber}`,
					description: 'Loaded from the next page request.',
					date: `Page ${details.page}`,
					status: itemNumber % 3 === 0 ? 'active' : 'queued'
				} satisfies ReleaseEvent;
			});

			infiniteItems = [...infiniteItems, ...nextItems];
			hasMore = details.page < 3;
			loading = false;
		}, 500);
	}

	function failOnce(details: { page: number; perPage: number }) {
		retryLoading = true;
		retryError = null;
		window.setTimeout(() => {
			retryLoading = false;
			retryError = `Page ${details.page} failed`;
		}, 400);
	}
</script>

{#snippet eventCard(item: ReleaseEvent)}
	<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm border p-3">
		<div class="flex items-center justify-between gap-3">
			<h3 class="text-kl-base-content text-sm font-semibold">{item.title}</h3>
			<span class="text-kl-muted-content text-xs">{item.date}</span>
		</div>
		<p class="text-kl-muted-content mt-1 text-sm">{item.description}</p>
	</div>
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Timeline</h1>
		<p class="text-kl-muted-content mt-2">
			Render ordered events with snippets, custom markers, and page-based infinite loading.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A vertical timeline with event content and opposite labels."
			code={`<Timeline items={events}>
  {#snippet opposite(item)}
    <span class="text-xs text-kl-muted-content">{item.date}</span>
  {/snippet}

  {#snippet children(item)}
    <div class="rounded-kl-box border border-kl-base-300 bg-kl-base-100 p-3">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  {/snippet}
</Timeline>`}
		>
			<Timeline items={events}>
				{#snippet opposite(item)}
					<span class="text-kl-muted-content text-xs">{item.date}</span>
				{/snippet}
				{#snippet children(item)}
					{@render eventCard(item)}
				{/snippet}
			</Timeline>
		</DemoCard>

		<DemoCard
			title="One side"
			description="Keep all content on the same side for dense activity feeds."
			code={`<Timeline items={events} side="end">
  {#snippet marker(item)}
    <CircleDot size={14} />
  {/snippet}

  {#snippet children(item)}
    <p>{item.title}</p>
  {/snippet}
</Timeline>`}
		>
			<Timeline items={events} side="end">
				{#snippet marker(item)}
					<CircleDot size={14} class={getStatusClass(item.status)} />
				{/snippet}
				{#snippet children(item)}
					<div class="py-1">
						<p class="text-kl-base-content text-sm font-medium">{item.title}</p>
						<p class="text-kl-muted-content text-sm">{item.description}</p>
					</div>
				{/snippet}
			</Timeline>
		</DemoCard>

		<DemoCard
			title="Custom markers"
			description="Use marker snippets for status-specific icons."
			code={`<Timeline items={events}>
  {#snippet marker(item)}
    {#if item.status === "done"}
      <Check size={14} />
    {:else}
      <GitBranch size={14} />
    {/if}
  {/snippet}

  {#snippet children(item)}
    <p>{item.title}</p>
  {/snippet}
</Timeline>`}
		>
			<Timeline items={events}>
				{#snippet marker(item)}
					{#if item.status === 'done'}
						<Check size={14} class="text-kl-success" />
					{:else}
						<GitBranch size={14} class="text-kl-primary" />
					{/if}
				{/snippet}
				{#snippet opposite(item)}
					<span class="text-kl-muted-content text-xs">{item.date}</span>
				{/snippet}
				{#snippet children(item)}
					{@render eventCard(item)}
				{/snippet}
			</Timeline>
		</DemoCard>

		<DemoCard
			title="Horizontal"
			description="Switch orientation for compact process views."
			code={`<Timeline items={events} orientation="horizontal">
  {#snippet children(item)}
    <p>{item.title}</p>
  {/snippet}
</Timeline>`}
		>
			<Timeline items={events} orientation="horizontal">
				{#snippet opposite(item)}
					<span class="text-kl-muted-content text-xs">{item.date}</span>
				{/snippet}
				{#snippet marker(item)}
					<PackageCheck size={14} class={getStatusClass(item.status)} />
				{/snippet}
				{#snippet children(item)}
					<p class="text-kl-base-content text-sm font-medium">{item.title}</p>
				{/snippet}
			</Timeline>
		</DemoCard>

		<DemoCard
			title="Infinite loading"
			description="The parent owns data and loading state; Timeline requests the next page."
			code={`<Timeline
  items={items}
  bind:page
  initialPage={1}
  perPage={2}
  hasMore={hasMore}
  loading={loading}
  error={error}
  onLoadMore={loadMore}
>
  {#snippet children(item)}
    <p>{item.title}</p>
  {/snippet}
</Timeline>`}
		>
			<Timeline
				items={infiniteItems}
				bind:page
				initialPage={1}
				perPage={2}
				{hasMore}
				{loading}
				{error}
				onLoadMore={loadMore}
			>
				{#snippet opposite(item)}
					<span class="text-kl-muted-content text-xs">{item.date}</span>
				{/snippet}
				{#snippet children(item)}
					{@render eventCard(item)}
				{/snippet}
			</Timeline>
		</DemoCard>

		<DemoCard
			title="Error with retry"
			description="Pass an error message and Timeline renders a retry action."
			code={`<Timeline
  items={events}
  hasMore
  error="Page 2 failed"
  onLoadMore={loadMore}
>
  {#snippet children(item)}
    <p>{item.title}</p>
  {/snippet}
</Timeline>`}
		>
			<Timeline
				items={events}
				hasMore
				loading={retryLoading}
				error={retryError}
				onLoadMore={failOnce}
			>
				{#snippet children(item)}
					{@render eventCard(item)}
				{/snippet}
			</Timeline>
		</DemoCard>

		<DemoCard
			title="Empty"
			description="Provide an empty snippet when there are no events yet."
			code={`<Timeline items={[]}>
  {#snippet empty()}
    <p>No activity yet</p>
  {/snippet}

  {#snippet children(item)}
    <p>{item.title}</p>
  {/snippet}
</Timeline>`}
		>
			<Timeline items={[] as ReleaseEvent[]}>
				{#snippet empty()}
					<div
						class="rounded-kl-box border-kl-base-300 bg-kl-base-100 text-kl-muted-content border border-dashed p-6 text-center text-sm"
					>
						No activity yet
					</div>
				{/snippet}
				{#snippet children(item)}
					{@render eventCard(item)}
				{/snippet}
			</Timeline>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
