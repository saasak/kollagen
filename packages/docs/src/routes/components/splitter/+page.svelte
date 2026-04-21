<script lang="ts">
	import { Splitter } from '$ui/splitter';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'panels',
			type: 'PanelConfig[]',
			default: '—',
			description:
				'Array of panel configurations with id, collapsible, minSize, maxSize, collapsedSize'
		},
		{
			name: 'defaultSize',
			type: 'number[]',
			default: '—',
			description: 'Initial panel sizes as percentages (uncontrolled mode)'
		},
		{
			name: 'size',
			type: 'number[]',
			default: '—',
			description: 'Controlled panel sizes as percentages. Supports bind:size'
		},
		{
			name: 'orientation',
			type: '"horizontal" | "vertical"',
			default: '"horizontal"',
			description: 'Direction of the panel layout'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable all resize interactions'
		},
		{
			name: 'onResize',
			type: '(details) => void',
			default: '—',
			description: 'Callback fired during panel resize with previousSize and size'
		},
		{
			name: 'onResizeEnd',
			type: '(details) => void',
			default: '—',
			description: 'Callback fired when resize interaction completes'
		},
		{
			name: 'panel',
			type: 'Snippet<[{ id, index }]>',
			default: '—',
			description: 'Render snippet for each panel, receives panel id and index'
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
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Splitter</h1>
		<p class="text-kl-muted-content mt-2">
			Resizable split panels for flexible layouts. Built on bits-ui.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Two horizontal panels with a draggable resize handle."
			code={`<Splitter
  panels={[{ id: "left" }, { id: "right" }]}
  defaultSize={[50, 50]}
>
  {#snippet panel({ id })}
    <div class="flex h-32 items-center justify-center">
      {id}
    </div>
  {/snippet}
</Splitter>`}
		>
			<Splitter panels={[{ id: 'left' }, { id: 'right' }]} defaultSize={[50, 50]}>
				{#snippet panel({ id })}
					<div
						class="text-kl-muted-content flex h-32 items-center justify-center text-sm font-medium"
					>
						{id}
					</div>
				{/snippet}
			</Splitter>
		</DemoCard>

		<DemoCard
			title="Vertical orientation"
			description="Stack panels vertically with orientation prop."
			code={`<Splitter
  orientation="vertical"
  panels={[{ id: "top" }, { id: "bottom" }]}
  defaultSize={[40, 60]}
>
  {#snippet panel({ id })}
    <div class="flex h-24 items-center justify-center">
      {id}
    </div>
  {/snippet}
</Splitter>`}
		>
			<Splitter
				orientation="vertical"
				panels={[{ id: 'top' }, { id: 'bottom' }]}
				defaultSize={[40, 60]}
			>
				{#snippet panel({ id })}
					<div
						class="text-kl-muted-content flex h-24 items-center justify-center text-sm font-medium"
					>
						{id}
					</div>
				{/snippet}
			</Splitter>
		</DemoCard>

		<DemoCard
			title="Constrained sizes"
			description="Panels with min and max size constraints."
			code={`<Splitter
  panels={[
    { id: "sidebar", minSize: 20, maxSize: 40 },
    { id: "main", minSize: 40 }
  ]}
  defaultSize={[30, 70]}
>
  {#snippet panel({ id })}
    <div class="flex h-32 items-center justify-center">
      {id}
    </div>
  {/snippet}
</Splitter>`}
		>
			<Splitter
				panels={[
					{ id: 'sidebar', minSize: 20, maxSize: 40 },
					{ id: 'main', minSize: 40 }
				]}
				defaultSize={[30, 70]}
			>
				{#snippet panel({ id })}
					<div
						class="text-kl-muted-content flex h-32 items-center justify-center text-sm font-medium"
					>
						{id}
					</div>
				{/snippet}
			</Splitter>
		</DemoCard>

		<DemoCard
			title="Three panels"
			description="Multiple panels with resize handles between each."
			code={`<Splitter
  panels={[
    { id: "left", minSize: 15 },
    { id: "center", minSize: 30 },
    { id: "right", minSize: 15 }
  ]}
  defaultSize={[20, 60, 20]}
>
  {#snippet panel({ id })}
    <div class="flex h-32 items-center justify-center">
      {id}
    </div>
  {/snippet}
</Splitter>`}
		>
			<Splitter
				panels={[
					{ id: 'left', minSize: 15 },
					{ id: 'center', minSize: 30 },
					{ id: 'right', minSize: 15 }
				]}
				defaultSize={[20, 60, 20]}
			>
				{#snippet panel({ id })}
					<div
						class="text-kl-muted-content flex h-32 items-center justify-center text-sm font-medium"
					>
						{id}
					</div>
				{/snippet}
			</Splitter>
		</DemoCard>

		<DemoCard
			title="Collapsible panel"
			description="Sidebar panel that can collapse to a minimal size."
			code={`<Splitter
  panels={[
    { id: "sidebar", collapsible: true, collapsedSize: 5, minSize: 15, maxSize: 40 },
    { id: "content", minSize: 50 }
  ]}
  defaultSize={[25, 75]}
>
  {#snippet panel({ id })}
    <div class="flex h-32 items-center justify-center">
      {id}
    </div>
  {/snippet}
</Splitter>`}
		>
			<Splitter
				panels={[
					{ id: 'sidebar', collapsible: true, collapsedSize: 5, minSize: 15, maxSize: 40 },
					{ id: 'content', minSize: 50 }
				]}
				defaultSize={[25, 75]}
			>
				{#snippet panel({ id })}
					<div
						class="text-kl-muted-content flex h-32 items-center justify-center text-sm font-medium"
					>
						{id}
					</div>
				{/snippet}
			</Splitter>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Splitter with resize interactions disabled."
			code={`<Splitter
  panels={[{ id: "left" }, { id: "right" }]}
  defaultSize={[50, 50]}
  disabled={true}
>
  {#snippet panel({ id })}
    <div class="flex h-32 items-center justify-center">
      {id}
    </div>
  {/snippet}
</Splitter>`}
		>
			<Splitter panels={[{ id: 'left' }, { id: 'right' }]} defaultSize={[50, 50]} disabled={true}>
				{#snippet panel({ id })}
					<div
						class="text-kl-muted-content flex h-32 items-center justify-center text-sm font-medium"
					>
						{id}
					</div>
				{/snippet}
			</Splitter>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
