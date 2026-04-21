<script lang="ts">
	import { Carousel } from '$ui/carousel';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const images = [
		{ src: 'https://picsum.photos/seed/carousel-1/600/300', alt: 'Mountain landscape' },
		{ src: 'https://picsum.photos/seed/carousel-2/600/300', alt: 'Ocean sunset' },
		{ src: 'https://picsum.photos/seed/carousel-3/600/300', alt: 'Forest path' },
		{ src: 'https://picsum.photos/seed/carousel-4/600/300', alt: 'Desert dunes' },
		{ src: 'https://picsum.photos/seed/carousel-5/600/300', alt: 'City skyline' }
	];

	const cards = [
		{ title: 'Design', description: 'Create beautiful interfaces' },
		{ title: 'Develop', description: 'Build with modern tools' },
		{ title: 'Deploy', description: 'Ship to production fast' },
		{ title: 'Iterate', description: 'Improve based on feedback' }
	];

	let controlledPage = $state(0);

	const propsData = [
		{ name: 'items', type: 'T[]', default: '—', description: 'Array of slide data' },
		{
			name: 'page',
			type: 'number',
			default: '—',
			description: 'Controlled current page index. Supports bind:page'
		},
		{
			name: 'defaultPage',
			type: 'number',
			default: '—',
			description: 'Initial page for uncontrolled mode'
		},
		{
			name: 'orientation',
			type: '"horizontal" | "vertical"',
			default: '"horizontal"',
			description: 'Layout direction'
		},
		{ name: 'autoplay', type: 'boolean', default: 'false', description: 'Auto-advance slides' },
		{
			name: 'autoplayDelay',
			type: 'number',
			default: '4000',
			description: 'Autoplay interval in milliseconds'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'false',
			description: 'Wrap around to first/last slide'
		},
		{
			name: 'slidesPerPage',
			type: 'number',
			default: '1',
			description: 'Number of slides visible at once'
		},
		{
			name: 'spacing',
			type: 'string',
			default: '"0px"',
			description: 'Gap between slides (CSS value)'
		},
		{
			name: 'showIndicators',
			type: 'boolean',
			default: 'true',
			description: 'Show dot indicators'
		},
		{
			name: 'showControls',
			type: 'boolean',
			default: 'true',
			description: 'Show prev/next arrow buttons'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all interaction' },
		{
			name: 'onPageChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when the active page changes'
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
			description: 'Render snippet for each slide — receives item and index'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Carousel</h1>
		<p class="text-kl-muted-content mt-2">
			Interactive slideshow for cycling through content. Supports autoplay, looping, and multiple
			slides per page. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple image carousel with navigation arrows and indicators."
			code={`<Carousel items={images}>
  {#snippet children(image)}
    <img src={image.src} alt={image.alt} class="w-full rounded-kl-box object-cover" />
  {/snippet}
</Carousel>`}
		>
			<div class="max-w-lg">
				<Carousel items={images}>
					{#snippet children(image)}
						<img src={image.src} alt={image.alt} class="rounded-kl-box w-full object-cover" />
					{/snippet}
				</Carousel>
			</div>
		</DemoCard>

		<DemoCard
			title="Autoplay with loop"
			description="Automatically cycles through slides and wraps around."
			code={`<Carousel items={images} autoplay loop autoplayDelay={3000}>
  {#snippet children(image)}
    <img src={image.src} alt={image.alt} class="w-full rounded-kl-box object-cover" />
  {/snippet}
</Carousel>`}
		>
			<div class="max-w-lg">
				<Carousel items={images} autoplay loop autoplayDelay={3000}>
					{#snippet children(image)}
						<img src={image.src} alt={image.alt} class="rounded-kl-box w-full object-cover" />
					{/snippet}
				</Carousel>
			</div>
		</DemoCard>

		<DemoCard
			title="Multiple slides per page"
			description="Show multiple cards at once with spacing."
			code={`<Carousel items={cards} slidesPerPage={2} spacing="16px" loop>
  {#snippet children(card)}
    <div class="rounded-kl-box border border-kl-base-300 bg-kl-base-200 p-4">
      <h3 class="font-semibold text-kl-base-content">{card.title}</h3>
      <p class="mt-1 text-sm text-kl-muted-content">{card.description}</p>
    </div>
  {/snippet}
</Carousel>`}
		>
			<div class="max-w-lg">
				<Carousel items={cards} slidesPerPage={2} spacing="16px" loop>
					{#snippet children(card)}
						<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 border p-4">
							<h3 class="text-kl-base-content font-semibold">{card.title}</h3>
							<p class="text-kl-muted-content mt-1 text-sm">{card.description}</p>
						</div>
					{/snippet}
				</Carousel>
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage the current page externally with bind:page."
			code={`<Carousel items={images} bind:page={controlledPage} loop>
  {#snippet children(image)}
    <img src={image.src} alt={image.alt} class="..." />
  {/snippet}
</Carousel>
<p>Current page: {controlledPage}</p>`}
		>
			<div class="max-w-lg space-y-3">
				<Carousel items={images} bind:page={controlledPage} loop>
					{#snippet children(image)}
						<img src={image.src} alt={image.alt} class="rounded-kl-box w-full object-cover" />
					{/snippet}
				</Carousel>
				<p class="text-kl-muted-content text-sm">
					Current page: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledPage}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="No controls"
			description="Hide navigation arrows — use only indicators or external controls."
			code={`<Carousel items={images} showControls={false}>
  {#snippet children(image)}
    <img src={image.src} alt={image.alt} class="..." />
  {/snippet}
</Carousel>`}
		>
			<div class="max-w-lg">
				<Carousel items={images} showControls={false}>
					{#snippet children(image)}
						<img src={image.src} alt={image.alt} class="rounded-kl-box w-full object-cover" />
					{/snippet}
				</Carousel>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Carousel in disabled state — arrows and indicators are non-interactive."
			code={`<Carousel items={images} disabled>
  {#snippet children(image)}
    <img src={image.src} alt={image.alt} class="..." />
  {/snippet}
</Carousel>`}
		>
			<div class="max-w-lg">
				<Carousel items={images} disabled>
					{#snippet children(image)}
						<img src={image.src} alt={image.alt} class="rounded-kl-box w-full object-cover" />
					{/snippet}
				</Carousel>
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
