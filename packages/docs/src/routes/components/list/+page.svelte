<script lang="ts">
	import { Badge } from '$ui/badge';
	import { List, type ListCellContext, type ListColumn } from '$ui/list';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Heart, Play } from 'lucide-svelte';

	type Song = {
		id: string;
		artist: string;
		title: string;
		image: string;
	};

	type Account = {
		id: string;
		name: string;
		plan: 'Starter' | 'Growth' | 'Enterprise';
		status: 'Healthy' | 'At risk' | 'Churned';
		owner: string;
		mrr: number;
	};

	const songs: Song[] = [
		{
			id: 'dio-lupa',
			artist: 'Dio Lupa',
			title: 'Remaining Reason',
			image: 'https://img.daisyui.com/images/profile/demo/1@94.webp'
		},
		{
			id: 'ellie-beilish',
			artist: 'Ellie Beilish',
			title: 'Bears of a fever',
			image: 'https://img.daisyui.com/images/profile/demo/2@94.webp'
		},
		{
			id: 'sabrino-gardener',
			artist: 'Sabrino Gardener',
			title: 'Cappuccino',
			image: 'https://img.daisyui.com/images/profile/demo/3@94.webp'
		}
	];

	const accounts: Account[] = [
		{
			id: 'acc_101',
			name: 'Northstar Labs',
			plan: 'Enterprise',
			status: 'Healthy',
			owner: 'Maya',
			mrr: 8400
		},
		{
			id: 'acc_102',
			name: 'Atlas Supply',
			plan: 'Growth',
			status: 'At risk',
			owner: 'Iris',
			mrr: 1900
		},
		{
			id: 'acc_103',
			name: 'Rune Retail',
			plan: 'Starter',
			status: 'Churned',
			owner: 'Noah',
			mrr: 0
		}
	];

	let reorderableAccounts = $state([...accounts]);

	const columns: ListColumn<Account>[] = [
		{ id: 'name', label: 'Account' },
		{ id: 'plan', label: 'Plan' },
		{ id: 'status', label: 'Status' },
		{ id: 'owner', label: 'Owner' },
		{
			id: 'mrr',
			label: 'MRR',
			align: 'right',
			format: (value) => `$${Number(value).toLocaleString()}`
		}
	];

	const songColumns: ListColumn<Song>[] = [
		{ id: 'track', label: 'Track', width: 'minmax(0,1fr)' },
		{ id: 'play', label: 'Play', width: '2.5rem', align: 'center' },
		{ id: 'favorite', label: 'Favorite', width: '2.5rem', align: 'center' }
	];

	const propsData = [
		{ name: 'data', type: 'T[]', default: '-', description: 'Rows to render.' },
		{
			name: 'columns',
			type: 'ListColumn<T>[]',
			default: '-',
			description: 'Column definitions compatible with DataTable columns.'
		},
		{ name: 'caption', type: 'string', default: '-', description: 'Optional list caption.' },
		{
			name: 'emptyText',
			type: 'string',
			default: '"No results found"',
			description: 'Message shown when data is empty.'
		},
		{
			name: 'rowKey',
			type: 'keyof T | ((row: T) => string | number)',
			default: 'row index',
			description: 'Stable key for each rendered row.'
		},
		{
			name: 'reorderable',
			type: 'boolean',
			default: 'false',
			description: 'Shows a drag handle and enables row reordering.'
		},
		{
			name: 'onReorder',
			type: '(nextData, details) => void',
			default: '-',
			description: 'Callback fired with the reordered rows.'
		},
		{ name: 'class', type: 'string', default: '-', description: 'Additional wrapper classes.' }
	];

	function getStatusColumns(
		statusCellSnippet: NonNullable<ListColumn<Account>['cell']>
	): ListColumn<Account>[] {
		return columns.map((column) => {
			if (column.id === 'status') return { ...column, cell: statusCellSnippet };
			return column;
		});
	}

	function getCompactColumns(statusCellSnippet: NonNullable<ListColumn<Account>['cell']>) {
		return getStatusColumns(statusCellSnippet).filter((column) =>
			['name', 'status', 'mrr'].includes(column.id)
		);
	}

	function getSongColumns(
		trackCellSnippet: NonNullable<ListColumn<Song>['cell']>,
		playCellSnippet: NonNullable<ListColumn<Song>['cell']>,
		favoriteCellSnippet: NonNullable<ListColumn<Song>['cell']>
	): ListColumn<Song>[] {
		return songColumns.map((column) => {
			if (column.id === 'track') return { ...column, cell: trackCellSnippet };
			if (column.id === 'play') return { ...column, cell: playCellSnippet };
			if (column.id === 'favorite') return { ...column, cell: favoriteCellSnippet };
			return column;
		});
	}

	function handleReorder(nextData: Account[]) {
		reorderableAccounts = nextData;
	}

	const scriptOpen = '<' + 'script lang="ts">';
	const scriptClose = '</' + 'script>';

	const songsCode = `${scriptOpen}
  import { List, type ListColumn } from "$ui/list";
  import { Heart, Play } from "lucide-svelte";

  type Song = {
    id: string;
    artist: string;
    title: string;
    image: string;
  };

  const songs: Song[] = [
    {
      id: "dio-lupa",
      artist: "Dio Lupa",
      title: "Remaining Reason",
      image: "https://img.daisyui.com/images/profile/demo/1@94.webp"
    },
    {
      id: "ellie-beilish",
      artist: "Ellie Beilish",
      title: "Bears of a fever",
      image: "https://img.daisyui.com/images/profile/demo/2@94.webp"
    },
    {
      id: "sabrino-gardener",
      artist: "Sabrino Gardener",
      title: "Cappuccino",
      image: "https://img.daisyui.com/images/profile/demo/3@94.webp"
    }
  ];

  const columns: ListColumn<Song>[] = [
    { id: "track", label: "Track", width: "minmax(0,1fr)" },
    { id: "play", label: "Play", width: "2.5rem", align: "center" },
    { id: "favorite", label: "Favorite", width: "2.5rem", align: "center" }
  ];

  function getColumns(
    trackCellSnippet: NonNullable<ListColumn<Song>["cell"]>,
    playCellSnippet: NonNullable<ListColumn<Song>["cell"]>,
    favoriteCellSnippet: NonNullable<ListColumn<Song>["cell"]>
  ): ListColumn<Song>[] {
    return columns.map((column) => {
      if (column.id === "track") return { ...column, cell: trackCellSnippet };
      if (column.id === "play") return { ...column, cell: playCellSnippet };
      if (column.id === "favorite") return { ...column, cell: favoriteCellSnippet };
      return column;
    });
  }
${scriptClose}

{#snippet trackCell(row: Song)}
  <div class="flex min-w-0 items-center gap-4">
    <img class="size-14 rounded-kl-box object-cover" src={row.image} alt="" />
    <div class="min-w-0">
      <div class="truncate text-base font-medium">{row.artist}</div>
      <div class="text-kl-muted-content truncate text-xs font-semibold tracking-wide uppercase">
        {row.title}
      </div>
    </div>
  </div>
{/snippet}

{#snippet playCell(row: Song)}
  <button
    type="button"
    aria-label="Play {row.title}"
    class="hover:bg-kl-base-200 inline-flex size-10 items-center justify-center rounded-kl-field"
  >
    <Play size={22} />
  </button>
{/snippet}

{#snippet favoriteCell(row: Song)}
  <button
    type="button"
    aria-label="Favorite {row.title}"
    class="hover:bg-kl-base-200 inline-flex size-10 items-center justify-center rounded-kl-field"
  >
    <Heart size={22} />
  </button>
{/snippet}

<List
  data={songs}
  columns={getColumns(trackCell, playCell, favoriteCell)}
  caption="Most played songs this week"
  rowKey="id"
/>`;

	const captionedCode = `${scriptOpen}
  import { List, type ListColumn } from "$ui/list";

  type Account = {
    id: string;
    name: string;
    status: "Healthy" | "At risk" | "Churned";
    mrr: number;
  };

  const accounts: Account[] = [
    { id: "acc_101", name: "Northstar Labs", status: "Healthy", mrr: 8400 },
    { id: "acc_102", name: "Atlas Supply", status: "At risk", mrr: 1900 }
  ];

  const columns: ListColumn<Account>[] = [
    { id: "name", label: "Account" },
    { id: "status", label: "Status" },
    {
      id: "mrr",
      label: "MRR",
      align: "right",
      format: (value) => \`$\${Number(value).toLocaleString()}\`
    }
  ];
${scriptClose}

<List
  data={accounts}
  {columns}
  caption="Priority accounts"
  rowKey="id"
/>`;

	const customCellCode = `${scriptOpen}
  import { Badge } from "$ui/badge";
  import { List, type ListCellContext, type ListColumn } from "$ui/list";

  type Account = {
    id: string;
    name: string;
    plan: string;
    status: "Healthy" | "At risk" | "Churned";
    owner: string;
    mrr: number;
  };

  const accounts: Account[] = [
    { id: "acc_101", name: "Northstar Labs", plan: "Enterprise", status: "Healthy", owner: "Maya", mrr: 8400 },
    { id: "acc_102", name: "Atlas Supply", plan: "Growth", status: "At risk", owner: "Iris", mrr: 1900 }
  ];

  const columns: ListColumn<Account>[] = [
    { id: "name", label: "Account" },
    { id: "plan", label: "Plan" },
    { id: "status", label: "Status" },
    { id: "owner", label: "Owner" },
    {
      id: "mrr",
      label: "MRR",
      align: "right",
      format: (value) => \`$\${Number(value).toLocaleString()}\`
    }
  ];

  function getColumns(
    statusCellSnippet: NonNullable<ListColumn<Account>["cell"]>
  ): ListColumn<Account>[] {
    return columns.map((column) => {
      if (column.id === "status") return { ...column, cell: statusCellSnippet };
      return column;
    });
  }
${scriptClose}

{#snippet statusCell(row: Account, _value: unknown, _context: ListCellContext<Account>)}
  <Badge
    color={row.status === "Healthy" ? "success" : row.status === "At risk" ? "warning" : "error"}
    variant="soft"
  >
    {row.status}
  </Badge>
{/snippet}

<List data={accounts} columns={getColumns(statusCell)} rowKey="id" />`;

	const reorderableCode = `${scriptOpen}
  import { List, type ListColumn } from "$ui/list";

  type Account = {
    id: string;
    name: string;
    plan: "Starter" | "Growth" | "Enterprise";
    status: "Healthy" | "At risk" | "Churned";
    owner: string;
    mrr: number;
  };

  let accounts = $state<Account[]>([
    { id: "acc_101", name: "Northstar Labs", plan: "Enterprise", status: "Healthy", owner: "Maya", mrr: 8400 },
    { id: "acc_102", name: "Atlas Supply", plan: "Growth", status: "At risk", owner: "Iris", mrr: 1900 },
    { id: "acc_103", name: "Rune Retail", plan: "Starter", status: "Churned", owner: "Noah", mrr: 0 }
  ]);

  const columns: ListColumn<Account>[] = [
    { id: "name", label: "Account" },
    { id: "plan", label: "Plan" },
    { id: "status", label: "Status" },
    { id: "owner", label: "Owner" },
    {
      id: "mrr",
      label: "MRR",
      align: "right",
      format: (value) => \`$\${Number(value).toLocaleString()}\`
    }
  ];

  function handleReorder(nextData: Account[]) {
    accounts = nextData;
  }
${scriptClose}

<List
  data={accounts}
  {columns}
  caption="Drag accounts to reprioritize"
  rowKey="id"
  reorderable
  onReorder={handleReorder}
/>`;

	const emptyCode = `${scriptOpen}
  import { List, type ListColumn } from "$ui/list";

  type Account = {
    id: string;
    name: string;
    status: string;
    owner: string;
  };

  const columns: ListColumn<Account>[] = [
    { id: "name", label: "Account" },
    { id: "status", label: "Status" },
    { id: "owner", label: "Owner" }
  ];
${scriptClose}

<List data={[]} {columns} emptyText="No accounts found" />`;
</script>

{#snippet statusCell(row: Account, _value: unknown, _context: ListCellContext<Account>)}
	<Badge
		color={row.status === 'Healthy' ? 'success' : row.status === 'At risk' ? 'warning' : 'error'}
		variant="soft"
	>
		{row.status}
	</Badge>
{/snippet}

{#snippet trackCell(row: Song)}
	<div class="flex min-w-0 items-center gap-4">
		<img class="rounded-kl-box size-14 object-cover" src={row.image} alt="" />
		<div class="min-w-0">
			<div class="text-kl-base-content truncate text-base font-medium">{row.artist}</div>
			<div class="text-kl-muted-content truncate text-xs font-semibold tracking-wide uppercase">
				{row.title}
			</div>
		</div>
	</div>
{/snippet}

{#snippet playCell(row: Song)}
	<button
		type="button"
		aria-label="Play {row.title}"
		class="hover:bg-kl-base-200 rounded-kl-field inline-flex size-10 cursor-pointer items-center justify-center transition-colors duration-[var(--kl-transition-fast)]"
	>
		<Play size={22} />
	</button>
{/snippet}

{#snippet favoriteCell(row: Song)}
	<button
		type="button"
		aria-label="Favorite {row.title}"
		class="hover:bg-kl-base-200 rounded-kl-field inline-flex size-10 cursor-pointer items-center justify-center transition-colors duration-[var(--kl-transition-fast)]"
	>
		<Heart size={22} />
	</button>
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">List</h1>
		<p class="text-kl-muted-content mt-2">A simple data-driven grid list.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Most played songs"
			description="Use column snippets for rich content and icon actions."
			code={songsCode}
		>
			<List
				data={songs}
				columns={getSongColumns(trackCell, playCell, favoriteCell)}
				caption="Most played songs this week"
				rowKey="id"
			/>
		</DemoCard>

		<DemoCard title="Captioned" description="Add a caption above the list." code={captionedCode}>
			<List
				data={accounts}
				columns={getCompactColumns(statusCell)}
				caption="Priority accounts"
				rowKey="id"
			/>
		</DemoCard>

		<DemoCard
			title="Custom cell"
			description="Use the same cell-snippet pattern as DataTable."
			code={customCellCode}
		>
			<List data={accounts} columns={getStatusColumns(statusCell)} rowKey="id" />
		</DemoCard>

		<DemoCard
			title="Reorderable"
			description="Enable a drag handle and keep the ordered data in the parent."
			code={reorderableCode}
		>
			<List
				data={reorderableAccounts}
				{columns}
				caption="Drag accounts to reprioritize"
				rowKey="id"
				reorderable
				onReorder={handleReorder}
			/>
		</DemoCard>

		<DemoCard
			title="Empty state"
			description="Customize the message shown when there are no rows."
			code={emptyCode}
		>
			<List data={[]} {columns} emptyText="No accounts found" />
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
