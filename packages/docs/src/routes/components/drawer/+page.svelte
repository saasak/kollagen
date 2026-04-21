<script lang="ts">
	import { Drawer } from '$ui/drawer';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'open',
			type: 'boolean',
			default: '—',
			description: 'Controlled open state. Supports bind:open'
		},
		{
			name: 'defaultOpen',
			type: 'boolean',
			default: 'false',
			description: 'Initial open state for uncontrolled mode'
		},
		{ name: 'title', type: 'string', default: '—', description: 'Drawer heading text' },
		{
			name: 'description',
			type: 'string',
			default: '—',
			description: 'Drawer description text below the title'
		},
		{
			name: 'direction',
			type: '"left" | "right" | "top" | "bottom"',
			default: '"bottom"',
			description: 'Side the drawer slides in from'
		},
		{
			name: 'snapPoints',
			type: '(number | string)[]',
			default: '—',
			description: 'Snap points as fractions (0–1) or pixel strings'
		},
		{
			name: 'defaultSnapPoint',
			type: 'number | string',
			default: '—',
			description: 'Initial snap point when the drawer opens'
		},
		{
			name: 'onSnapPointChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when the active snap point changes'
		},
		{
			name: 'snapToSequentialPoints',
			type: 'boolean',
			default: 'false',
			description: 'Force sequential snapping between snap points'
		},
		{
			name: 'modal',
			type: 'boolean',
			default: 'true',
			description: 'Whether the drawer blocks outside interaction'
		},
		{
			name: 'closeOnEscape',
			type: 'boolean',
			default: 'true',
			description: 'Close on Escape key press'
		},
		{
			name: 'closeOnInteractOutside',
			type: 'boolean',
			default: 'true',
			description: 'Close when clicking outside'
		},
		{
			name: 'preventScroll',
			type: 'boolean',
			default: 'true',
			description: 'Prevent background scrolling when open'
		},
		{
			name: 'role',
			type: '"dialog" | "alertdialog"',
			default: '"dialog"',
			description: 'Semantic role for the drawer'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger button'
		},
		{
			name: 'onOpenChange',
			type: '(details) => void',
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
		{ name: 'children', type: 'Snippet', default: '—', description: 'Drawer body content' },
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the content panel'
		}
	];

	const navItems = [
		{ label: 'Home', icon: '🏠' },
		{ label: 'Profile', icon: '👤' },
		{ label: 'Settings', icon: '⚙️' },
		{ label: 'Messages', icon: '💬' },
		{ label: 'Notifications', icon: '🔔' }
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Drawer</h1>
		<p class="text-kl-muted-content mt-2">
			Slide-in panel that overlays content from any edge. Built on bits-ui's Drawer with
			swipe-to-dismiss, snap points, and grabber handle.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Bottom (default)"
			description="Bottom sheet drawer with a grabber handle. Swipe down to dismiss."
			code={`<Drawer title="Bottom Sheet" description="Swipe down to dismiss.">
  {#snippet trigger()}
    <button class="btn">Open Bottom Drawer</button>
  {/snippet}
  <p>This is a bottom sheet drawer.</p>
</Drawer>`}
		>
			<Drawer title="Bottom Sheet" description="Swipe down to dismiss.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Bottom Drawer
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">
					This is a bottom sheet drawer with a grabber handle. Swipe down or click outside to
					dismiss.
				</p>
			</Drawer>
		</DemoCard>

		<DemoCard
			title="Left navigation"
			description="A side navigation drawer using direction=&quot;left&quot;."
			code={`<Drawer direction="left" title="Navigation">
  {#snippet trigger()}
    <button class="btn">Open Menu</button>
  {/snippet}
  <!-- nav items -->
</Drawer>`}
		>
			<Drawer direction="left" title="Navigation">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Menu
					</button>
				{/snippet}
				<nav class="space-y-1">
					{#each navItems as item}
						<button
							class="rounded-kl-field text-kl-base-content hover:bg-kl-muted flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-colors"
						>
							<span>{item.icon}</span>
							<span>{item.label}</span>
						</button>
					{/each}
				</nav>
			</Drawer>
		</DemoCard>

		<DemoCard
			title="Right panel"
			description="A detail panel using direction=&quot;right&quot;."
			code={`<Drawer direction="right" title="Details">
  {#snippet trigger()}
    <button class="btn">Open Panel</button>
  {/snippet}
  <p>Side panel content.</p>
</Drawer>`}
		>
			<Drawer direction="right" title="Item Details" description="View and edit item properties.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Panel
					</button>
				{/snippet}
				<div class="space-y-4">
					<div>
						<label class="text-kl-muted-content text-xs font-medium">Name</label>
						<p class="text-kl-base-content text-sm">Example Item</p>
					</div>
					<div>
						<label class="text-kl-muted-content text-xs font-medium">Status</label>
						<p class="text-kl-base-content text-sm">Active</p>
					</div>
					<div>
						<label class="text-kl-muted-content text-xs font-medium">Created</label>
						<p class="text-kl-base-content text-sm">April 12, 2026</p>
					</div>
				</div>
			</Drawer>
		</DemoCard>

		<DemoCard
			title="Snap points"
			description="Bottom drawer with multiple anchor positions. Drag the grabber to snap between 25%, 50%, and full height."
			code={`<Drawer
  title="Explore nearby"
  snapPoints={[0.25, 0.5, 1]}
  defaultSnapPoint={0.5}
  snapToSequentialPoints
>
  {#snippet trigger()}
    <button class="btn">Open Map Drawer</button>
  {/snippet}
  <!-- scrollable content -->
</Drawer>`}
		>
			<Drawer
				title="Explore nearby"
				description="Drag the grabber to snap between positions."
				snapPoints={[0.25, 0.5, 1]}
				defaultSnapPoint={0.5}
				snapToSequentialPoints
			>
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Map Drawer
					</button>
				{/snippet}
				<div class="space-y-2">
					{#each Array(8) as _, i}
						<div class="rounded-kl-field border-kl-base-300 flex items-center gap-3 border p-3">
							<div class="bg-kl-muted h-10 w-10 shrink-0 rounded-full"></div>
							<div class="min-w-0 flex-1">
								<div class="text-kl-base-content text-sm font-medium">Place {i + 1}</div>
								<div class="text-kl-muted-content text-xs">0.{i + 1} km away</div>
							</div>
						</div>
					{/each}
				</div>
			</Drawer>
		</DemoCard>

		<DemoCard
			title="With footer"
			description="Drawer with action buttons in the footer."
			code={`<Drawer title="Filters" description="Adjust your search filters.">
  {#snippet trigger()}
    <button class="btn">Filters</button>
  {/snippet}
  <p>Filter content here.</p>
  {#snippet footer()}
    <button class="btn-secondary">Reset</button>
    <button class="btn-primary">Apply</button>
  {/snippet}
</Drawer>`}
		>
			<Drawer title="Filters" description="Adjust your search filters.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Filters
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">Filter controls would go here.</p>
				{#snippet footer()}
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-muted border px-4 py-2 text-sm font-medium transition-colors"
					>
						Reset
					</button>
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Apply
					</button>
				{/snippet}
			</Drawer>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
