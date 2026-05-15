<script lang="ts">
	import { ActionSheet } from '$ui/action-sheet';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledOpen = $state(false);

	const places = [
		{ name: 'Market Street Cafe', distance: '0.2 km away' },
		{ name: 'Union Square Books', distance: '0.4 km away' },
		{ name: 'Civic Center Station', distance: '0.6 km away' },
		{ name: 'Hayes Valley Studio', distance: '0.8 km away' },
		{ name: 'Mission Workshop', distance: '1.1 km away' },
		{ name: 'SoMa Gallery', distance: '1.4 km away' }
	];

	const propsData = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			description: 'Controlled open state. Supports bind:open'
		},
		{ name: 'title', type: 'string', default: '—', description: 'Action sheet heading text' },
		{
			name: 'description',
			type: 'string',
			default: '—',
			description: 'Action sheet description text below the title'
		},
		{
			name: 'variant',
			type: '"responsive" | "drawer"',
			default: '"responsive"',
			description:
				"Display mode. 'responsive' shows a dialog on desktop and drawer on mobile. 'drawer' always shows a bottom-sheet drawer."
		},
		{
			name: 'breakpoint',
			type: 'number',
			default: '768',
			description:
				"Viewport width in px below which the drawer is used (only for variant='responsive')"
		},
		{
			name: 'preventScroll',
			type: 'boolean',
			default: 'true',
			description: 'Prevent background scrolling when open'
		},
		{
			name: 'snapPoints',
			type: '(number | string)[]',
			default: '—',
			description:
				'Snap points for the drawer as fractions (0-1) or pixel strings. Ignored in dialog mode.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger button'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			default: '—',
			description: 'Callback when open state changes'
		},
		{
			name: 'trigger',
			type: 'Snippet',
			default: '—',
			description: 'Trigger button content (Svelte 5 snippet)'
		},
		{
			name: 'footer',
			type: 'Snippet',
			default: '—',
			description: 'Footer content, e.g. action buttons (Svelte 5 snippet)'
		},
		{ name: 'children', type: 'Snippet', default: '—', description: 'Action sheet body content' },
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the content panel'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">ActionSheet</h1>
		<p class="text-kl-muted-content mt-2">
			Responsive action sheet that renders as a centered dialog on desktop and a bottom-sheet drawer
			on mobile. Built on bits-ui Dialog + Drawer primitives.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Responsive (default)"
			description="Shows a dialog on desktop and a swipeable bottom-sheet drawer on mobile. Resize your browser to see the switch."
			code={`${'<'}script lang="ts">
  import { ActionSheet } from "$ui/action-sheet";
${'<'}/script>

<ActionSheet title="Welcome" description="This is a responsive action sheet.">
  {#snippet trigger()}
    <button
      class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
    >
      Open ActionSheet
    </button>
  {/snippet}

  <p class="text-kl-base-content text-sm">
    This renders as a dialog on desktop and a drawer on mobile. Try resizing your browser.
  </p>
</ActionSheet>`}
		>
			<ActionSheet title="Welcome" description="This is a responsive action sheet.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open ActionSheet
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">
					This renders as a dialog on desktop and a drawer on mobile. Try resizing your browser.
				</p>
			</ActionSheet>
		</DemoCard>

		<DemoCard
			title="Always drawer"
			description="Use variant=&quot;drawer&quot; to always render as a bottom-sheet, regardless of screen size."
			code={`${'<'}script lang="ts">
  import { ActionSheet } from "$ui/action-sheet";
${'<'}/script>

<ActionSheet variant="drawer" title="Bottom Sheet" description="Always a drawer.">
  {#snippet trigger()}
    <button
      class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
    >
      Open Drawer
    </button>
  {/snippet}

  <p class="text-kl-base-content text-sm">
    This is always a bottom-sheet drawer, even on desktop. Swipe down to dismiss.
  </p>
</ActionSheet>`}
		>
			<ActionSheet variant="drawer" title="Bottom Sheet" description="Always a drawer.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Drawer
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">
					This is always a bottom-sheet drawer, even on desktop. Swipe down to dismiss.
				</p>
			</ActionSheet>
		</DemoCard>

		<DemoCard
			title="Snap points"
			description="Drawer with multiple anchor positions. Drag the grabber to snap between 25%, 50%, and full height."
			code={`${'<'}script lang="ts">
  import { ActionSheet } from "$ui/action-sheet";

  const places = [
    { name: "Market Street Cafe", distance: "0.2 km away" },
    { name: "Union Square Books", distance: "0.4 km away" },
    { name: "Civic Center Station", distance: "0.6 km away" },
    { name: "Hayes Valley Studio", distance: "0.8 km away" },
    { name: "Mission Workshop", distance: "1.1 km away" },
    { name: "SoMa Gallery", distance: "1.4 km away" }
  ];
${'<'}/script>

<ActionSheet
  variant="drawer"
  title="Explore nearby"
  description="Drag the grabber to snap between positions."
  snapPoints={[0.25, 0.5, 1]}
>
  {#snippet trigger()}
    <button
      class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
    >
      Open Map Drawer
    </button>
  {/snippet}

  <div class="space-y-3">
    <p class="text-kl-base-content text-sm">
      This drawer snaps to 25%, 50%, and 100% of the viewport height.
    </p>
    <div class="space-y-2">
      {#each places as place (place.name)}
        <div class="rounded-kl-field border-kl-base-300 flex items-center gap-3 border p-3">
          <div class="bg-kl-muted h-10 w-10 shrink-0 rounded-full"></div>
          <div class="min-w-0 flex-1">
            <div class="text-kl-base-content text-sm font-medium">{place.name}</div>
            <div class="text-kl-muted-content text-xs">{place.distance}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</ActionSheet>`}
		>
			<ActionSheet
				variant="drawer"
				title="Explore nearby"
				description="Drag the grabber to snap between positions."
				snapPoints={[0.25, 0.5, 1]}
			>
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Map Drawer
					</button>
				{/snippet}
				<div class="space-y-3">
					<p class="text-kl-base-content text-sm">
						This drawer snaps to 25%, 50%, and 100% of the viewport height.
					</p>
					<div class="space-y-2">
						{#each places as place (place.name)}
							<div class="rounded-kl-field border-kl-base-300 flex items-center gap-3 border p-3">
								<div class="bg-kl-muted h-10 w-10 shrink-0 rounded-full"></div>
								<div class="min-w-0 flex-1">
									<div class="text-kl-base-content text-sm font-medium">{place.name}</div>
									<div class="text-kl-muted-content text-xs">{place.distance}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</ActionSheet>
		</DemoCard>

		<DemoCard
			title="With footer actions"
			description="Action sheet with action buttons in the footer."
			code={`${'<'}script lang="ts">
  import { ActionSheet } from "$ui/action-sheet";
${'<'}/script>

<ActionSheet title="Confirm action" description="Are you sure you want to proceed?">
  {#snippet trigger()}
    <button
      class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
    >
      Confirm
    </button>
  {/snippet}

  <p class="text-kl-base-content text-sm">This action cannot be undone.</p>

  {#snippet footer()}
    <button
      class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-muted border px-4 py-2 text-sm font-medium transition-colors"
    >
      Cancel
    </button>
    <button
      class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
    >
      Confirm
    </button>
  {/snippet}
</ActionSheet>`}
		>
			<ActionSheet title="Confirm action" description="Are you sure you want to proceed?">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Confirm
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">This action cannot be undone.</p>
				{#snippet footer()}
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-muted border px-4 py-2 text-sm font-medium transition-colors"
					>
						Cancel
					</button>
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Confirm
					</button>
				{/snippet}
			</ActionSheet>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Programmatically control the open state with bind:open."
			code={`${'<'}script lang="ts">
  import { ActionSheet } from "$ui/action-sheet";

  let open = $state(false);
${'<'}/script>

<div class="flex items-center gap-3">
  <button
    onclick={() => (open = true)}
    class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
  >
    Open externally
  </button>
  <span class="text-kl-muted-content text-sm">
    State: {open ? "open" : "closed"}
  </span>
</div>

<ActionSheet
  bind:open
  title="Controlled ActionSheet"
  description="This action sheet is controlled via bind:open."
>
  <p class="text-kl-base-content text-sm">
    Opened via external state. Close me with the X button, Escape key, or swipe down on mobile.
  </p>
</ActionSheet>`}
		>
			<div class="flex items-center gap-3">
				<button
					onclick={() => (controlledOpen = true)}
					class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
				>
					Open externally
				</button>
				<span class="text-kl-muted-content text-sm">
					State: {controlledOpen ? 'open' : 'closed'}
				</span>
			</div>
			<ActionSheet
				bind:open={controlledOpen}
				title="Controlled ActionSheet"
				description="This action sheet is controlled via bind:open."
			>
				<p class="text-kl-base-content text-sm">
					Opened via external state. Close me with the X button, Escape key, or swipe down on
					mobile.
				</p>
			</ActionSheet>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
