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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
