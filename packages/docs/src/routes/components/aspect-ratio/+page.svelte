<script lang="ts">
	import { AspectRatio } from '$ui/aspect-ratio';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'ratio',
			type: 'number',
			default: '16 / 9',
			description: 'Width divided by height.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Content constrained by the ratio.'
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
		<h1 class="text-3xl font-bold">AspectRatio</h1>
		<p class="text-kl-muted-content mt-2">Keep media locked to a fixed ratio.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Media frame"
			description="The child fills a 16:9 box."
			code="<AspectRatio><div>Preview</div></AspectRatio>"
		>
			<AspectRatio class="max-w-xl">
				<div
					class="bg-kl-base-200 text-kl-muted-content flex size-full items-center justify-center text-sm"
				>
					Preview
				</div>
			</AspectRatio>
		</DemoCard>

		<DemoCard
			title="Square avatar crop"
			description="Use a 1:1 ratio for profile media and thumbnails."
			code={`<AspectRatio ratio={1} class="size-32">
  <div class="size-full">JD</div>
</AspectRatio>`}
		>
			<AspectRatio ratio={1} class="size-32">
				<div
					class="bg-kl-primary text-kl-primary-content flex size-full items-center justify-center text-2xl font-semibold"
				>
					JD
				</div>
			</AspectRatio>
		</DemoCard>

		<DemoCard
			title="Product tile"
			description="A 4:3 ratio keeps catalog cards aligned across variable content."
			code={`<AspectRatio ratio={4 / 3}>
  <div class="size-full">Product preview</div>
</AspectRatio>`}
		>
			<div class="grid max-w-2xl gap-4 sm:grid-cols-3">
				{#each ['Basic', 'Pro', 'Enterprise'] as plan}
					<div class="space-y-2">
						<AspectRatio ratio={4 / 3}>
							<div
								class="rounded-kl-box bg-kl-base-200 text-kl-muted-content flex size-full items-center justify-center text-sm"
							>
								{plan}
							</div>
						</AspectRatio>
						<p class="text-sm font-medium">{plan}</p>
					</div>
				{/each}
			</div>
		</DemoCard>

		<DemoCard
			title="Video poster"
			description="Layer status and controls inside a stable widescreen frame."
			code={`<AspectRatio class="max-w-xl">
  <div class="size-full">Quarterly review</div>
</AspectRatio>`}
		>
			<AspectRatio class="max-w-xl">
				<div
					class="rounded-kl-box bg-kl-neutral text-kl-neutral-content flex size-full flex-col justify-between p-4"
				>
					<div class="flex items-center justify-between text-sm">
						<span>Quarterly review</span>
						<span class="rounded-kl-selector bg-kl-base-100/15 px-2 py-1 text-xs">42:18</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="bg-kl-primary h-1.5 w-2/5 rounded-full"></div>
						<div class="bg-kl-base-100/25 h-1.5 flex-1 rounded-full"></div>
					</div>
				</div>
			</AspectRatio>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
