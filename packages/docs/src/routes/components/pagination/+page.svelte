<script lang="ts">
	import { Pagination } from '$ui/pagination';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledPage = $state(3);

	const propsData = [
		{ name: 'count', type: 'number', default: '—', description: 'Total number of data items' },
		{
			name: 'page',
			type: 'number',
			default: '—',
			description: 'Controlled current page. Supports bind:page'
		},
		{
			name: 'defaultPage',
			type: 'number',
			default: '1',
			description: 'Initial page for uncontrolled mode'
		},
		{
			name: 'pageSize',
			type: 'number',
			default: '—',
			description: 'Controlled items per page. Supports bind:pageSize'
		},
		{
			name: 'defaultPageSize',
			type: 'number',
			default: '10',
			description: 'Initial page size for uncontrolled mode'
		},
		{
			name: 'siblingCount',
			type: 'number',
			default: '1',
			description: 'Number of pages shown beside the active page'
		},
		{
			name: 'type',
			type: '"button" | "link"',
			default: '"button"',
			description: 'Whether pagination triggers render as buttons or links'
		},
		{
			name: 'getPageUrl',
			type: '(details: { page: number; pageSize: number }) => string',
			default: '—',
			description: 'Href generator when type is "link"'
		},
		{
			name: 'showPageInfo',
			type: 'boolean',
			default: 'false',
			description: 'Show "Showing X–Y of Z" page range text'
		},
		{
			name: 'showPageSizeControl',
			type: 'boolean',
			default: 'false',
			description: 'Show a page size selector'
		},
		{
			name: 'pageSizeOptions',
			type: 'number[]',
			default: '[10, 20, 50]',
			description: 'Options for the page size selector'
		},
		{
			name: 'onPageChange',
			type: '(details: { page: number; pageSize: number }) => void',
			default: '—',
			description: 'Callback when the current page changes'
		},
		{
			name: 'onPageSizeChange',
			type: '(details: { pageSize: number }) => void',
			default: '—',
			description: 'Callback when the page size changes'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Pagination</h1>
		<p class="text-kl-muted-content mt-2">
			Navigate between pages of content. Supports controlled and uncontrolled modes, page info, page
			size control, and link-based navigation. Built on bits-ui.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple pagination with 100 items and 10 per page."
			code={`<Pagination count={100} defaultPageSize={10} />`}
		>
			<Pagination count={100} defaultPageSize={10} />
		</DemoCard>

		<DemoCard
			title="Custom page size"
			description="Show 5 items per page with more page buttons."
			code={`<Pagination count={100} defaultPageSize={5} />`}
		>
			<Pagination count={100} defaultPageSize={5} />
		</DemoCard>

		<DemoCard
			title="More siblings"
			description="Show 2 sibling pages beside the active page for wider ranges."
			code={`<Pagination count={200} defaultPageSize={10} siblingCount={2} />`}
		>
			<Pagination count={200} defaultPageSize={10} siblingCount={2} />
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Bind to a page variable for external control."
			code={`<Pagination count={100} defaultPageSize={10} bind:page />
<p>Current page: {page}</p>`}
		>
			<div class="space-y-3">
				<Pagination count={100} defaultPageSize={10} bind:page={controlledPage} />
				<p class="text-kl-muted-content text-sm">
					Current page: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledPage}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="With page info"
			description="Show the current item range and total count."
			code={`<Pagination count={100} defaultPageSize={10} showPageInfo />`}
		>
			<Pagination count={100} defaultPageSize={10} showPageInfo />
		</DemoCard>

		<DemoCard
			title="With page size control"
			description="Let users choose how many items per page."
			code={`<Pagination count={100} defaultPageSize={10} showPageSizeControl />`}
		>
			<Pagination count={100} defaultPageSize={10} showPageSizeControl />
		</DemoCard>

		<DemoCard
			title="Full-featured"
			description="Page info, page size control, and pagination together."
			code={`<Pagination
  count={100}
  defaultPageSize={10}
  showPageInfo
  showPageSizeControl
  pageSizeOptions={[5, 10, 25, 50]}
/>`}
		>
			<Pagination
				count={100}
				defaultPageSize={10}
				showPageInfo
				showPageSizeControl
				pageSizeOptions={[5, 10, 25, 50]}
			/>
		</DemoCard>

		<DemoCard
			title="Few pages"
			description="When there are few pages, no ellipsis is shown."
			code={`<Pagination count={30} defaultPageSize={10} />`}
		>
			<Pagination count={30} defaultPageSize={10} />
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
