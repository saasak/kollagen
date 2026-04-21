<script lang="ts">
	import { Marquee } from '$ui/marquee';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const logos = [
		{ name: 'Svelte', color: 'text-orange-500' },
		{ name: 'TypeScript', color: 'text-blue-500' },
		{ name: 'Tailwind', color: 'text-cyan-500' },
		{ name: 'Vite', color: 'text-purple-500' },
		{ name: 'Ark UI', color: 'text-green-500' },
		{ name: 'Zag.js', color: 'text-yellow-500' }
	];

	const reviews = [
		{ author: 'Alice', text: 'Absolutely love this UI library!' },
		{ author: 'Bob', text: 'The components are clean and accessible.' },
		{ author: 'Carol', text: 'Best Svelte component library out there.' },
		{ author: 'Dave', text: 'Super easy to integrate and customize.' }
	];

	let pausedState = $state(false);

	const propsData = [
		{ name: 'items', type: 'T[]', default: '—', description: 'Array of items to scroll' },
		{
			name: 'side',
			type: '"start" | "end" | "top" | "bottom"',
			default: '"start"',
			description: 'Scroll direction'
		},
		{
			name: 'speed',
			type: 'number',
			default: '50',
			description: 'Scroll speed in pixels per second'
		},
		{
			name: 'delay',
			type: 'number',
			default: '0',
			description: 'Delay before animation starts (seconds)'
		},
		{
			name: 'loopCount',
			type: 'number',
			default: '0',
			description: 'Number of loops (0 = infinite)'
		},
		{
			name: 'spacing',
			type: 'string',
			default: '"1rem"',
			description: 'Gap between items (CSS value)'
		},
		{
			name: 'autoFill',
			type: 'boolean',
			default: 'false',
			description: 'Auto-duplicate items to fill the container'
		},
		{
			name: 'pauseOnInteraction',
			type: 'boolean',
			default: 'false',
			description: 'Pause scrolling on hover or focus'
		},
		{
			name: 'reverse',
			type: 'boolean',
			default: 'false',
			description: 'Reverse the scroll direction'
		},
		{ name: 'paused', type: 'boolean', default: '—', description: 'Controlled paused state' },
		{
			name: 'defaultPaused',
			type: 'boolean',
			default: 'false',
			description: 'Initial paused state for uncontrolled mode'
		},
		{
			name: 'showEdges',
			type: 'boolean',
			default: 'false',
			description: 'Show gradient fade overlays at leading and trailing edges'
		},
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Accessible label describing the scrolling content'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the marquee' },
		{
			name: 'onPauseChange',
			type: '(details: { paused: boolean }) => void',
			default: '—',
			description: 'Callback when pause state changes'
		},
		{
			name: 'onLoopComplete',
			type: '() => void',
			default: '—',
			description: 'Callback on each loop iteration'
		},
		{
			name: 'onComplete',
			type: '() => void',
			default: '—',
			description: 'Callback when all loops complete (finite loops only)'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		},
		{
			name: 'children',
			type: 'Snippet<[T, number]>',
			default: '—',
			description: 'Render snippet for each item — receives item and its index'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Marquee</h1>
		<p class="text-kl-muted-content mt-2">
			Continuously scrolling content strip with support for auto-fill, pause on interaction, and
			edge gradients. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Technology logos scrolling horizontally at default speed."
			code={`<Marquee items={logos} label="Technology logos">
  {#snippet children(logo)}
    <div class="flex items-center gap-2 rounded-kl-field border border-kl-base-300 bg-kl-base-100 px-4 py-2 text-sm font-medium">
      <span class={logo.color}>{logo.name}</span>
    </div>
  {/snippet}
</Marquee>`}
		>
			<Marquee items={logos} label="Technology logos">
				{#snippet children(logo)}
					<div
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 flex items-center gap-2 border px-4 py-2 text-sm font-medium"
					>
						<span class={logo.color}>{logo.name}</span>
					</div>
				{/snippet}
			</Marquee>
		</DemoCard>

		<DemoCard
			title="Auto-fill"
			description="Items are automatically duplicated to fill the container width."
			code={`<Marquee items={logos} autoFill label="Technology logos">
  {#snippet children(logo)}
    <span class="rounded-kl-selector bg-kl-base-200 px-3 py-1 text-sm font-medium text-kl-base-content">
      {logo.name}
    </span>
  {/snippet}
</Marquee>`}
		>
			<Marquee items={logos} autoFill label="Technology logos">
				{#snippet children(logo)}
					<span
						class="rounded-kl-selector bg-kl-base-200 text-kl-base-content px-3 py-1 text-sm font-medium"
					>
						{logo.name}
					</span>
				{/snippet}
			</Marquee>
		</DemoCard>

		<DemoCard
			title="Pause on interaction with edge gradients"
			description="Scrolling pauses on hover or focus. Edge gradients fade content in and out."
			code={`<Marquee items={reviews} pauseOnInteraction showEdges speed={40} label="Customer reviews">
  {#snippet children(review)}
    <div class="w-48 rounded-kl-box border border-kl-base-300 bg-kl-base-100 p-3 shadow-kl-sm">
      <p class="text-xs text-kl-muted-content">{review.author}</p>
      <p class="mt-1 text-sm text-kl-base-content">{review.text}</p>
    </div>
  {/snippet}
</Marquee>`}
		>
			<Marquee items={reviews} pauseOnInteraction showEdges speed={40} label="Customer reviews">
				{#snippet children(review)}
					<div
						class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm w-48 border p-3"
					>
						<p class="text-kl-muted-content text-xs">{review.author}</p>
						<p class="text-kl-base-content mt-1 text-sm">{review.text}</p>
					</div>
				{/snippet}
			</Marquee>
		</DemoCard>

		<DemoCard
			title="Reverse direction"
			description="Scroll in the opposite direction using the reverse prop."
			code={`<Marquee items={logos} reverse speed={60} label="Technology logos reversed">
  {#snippet children(logo)}
    <div class="flex items-center gap-2 rounded-kl-field border border-kl-base-300 bg-kl-base-100 px-4 py-2 text-sm font-medium">
      <span class={logo.color}>{logo.name}</span>
    </div>
  {/snippet}
</Marquee>`}
		>
			<Marquee items={logos} reverse speed={60} label="Technology logos reversed">
				{#snippet children(logo)}
					<div
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 flex items-center gap-2 border px-4 py-2 text-sm font-medium"
					>
						<span class={logo.color}>{logo.name}</span>
					</div>
				{/snippet}
			</Marquee>
		</DemoCard>

		<DemoCard
			title="Controlled pause"
			description="Control the paused state externally using the paused prop and onPauseChange callback."
			code={`let paused = $state(false);

<button onclick={() => paused = !paused}>
  {paused ? "Resume" : "Pause"}
</button>
<Marquee items={logos} {paused} onPauseChange={(d) => paused = d.paused} label="Technology logos">
  {#snippet children(logo)}
    <span class="rounded-kl-selector bg-kl-primary px-3 py-1 text-sm font-medium text-kl-primary-content">
      {logo.name}
    </span>
  {/snippet}
</Marquee>`}
		>
			<div class="space-y-3">
				<button
					onclick={() => (pausedState = !pausedState)}
					class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
				>
					{pausedState ? 'Resume' : 'Pause'}
				</button>
				<Marquee
					items={logos}
					paused={pausedState}
					onPauseChange={(d) => (pausedState = d.paused)}
					label="Technology logos"
				>
					{#snippet children(logo)}
						<span
							class="rounded-kl-selector bg-kl-primary text-kl-primary-content px-3 py-1 text-sm font-medium"
						>
							{logo.name}
						</span>
					{/snippet}
				</Marquee>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Marquee in disabled state — animation stops and interaction is blocked."
			code={`<Marquee items={logos} disabled label="Technology logos">
  {#snippet children(logo)}
    <span class="rounded-kl-selector bg-kl-base-200 px-3 py-1 text-sm text-kl-muted-content">
      {logo.name}
    </span>
  {/snippet}
</Marquee>`}
		>
			<Marquee items={logos} disabled label="Technology logos">
				{#snippet children(logo)}
					<span class="rounded-kl-selector bg-kl-base-200 text-kl-muted-content px-3 py-1 text-sm">
						{logo.name}
					</span>
				{/snippet}
			</Marquee>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
