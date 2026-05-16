<script lang="ts">
	import { Skeleton } from '$ui/skeleton';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Size and shape classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Skeleton</h1>
		<p class="text-kl-muted-content mt-2">Loading placeholders.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Card loading"
			description="Compose skeleton blocks."
			code="<Skeleton class='h-4 w-32' />"
		>
			<div class="space-y-3">
				<Skeleton class="h-4 w-40" />
				<Skeleton class="h-4 w-64" />
				<Skeleton class="h-24 w-full max-w-md" />
			</div>
		</DemoCard>

		<DemoCard
			title="List loading"
			description="Mirror the shape of the loaded rows."
			code={`<Skeleton class="size-10 rounded-full" />
<Skeleton class="h-4 w-48" />`}
		>
			<div class="grid max-w-md gap-4">
				{#each Array.from({ length: 3 }) as _}
					<div class="flex items-center gap-3">
						<Skeleton class="size-10 rounded-full" />
						<div class="min-w-0 flex-1 space-y-2">
							<Skeleton class="h-4 w-40" />
							<Skeleton class="h-3 w-64 max-w-full" />
						</div>
					</div>
				{/each}
			</div>
		</DemoCard>

		<DemoCard
			title="Table rows"
			description="Skeletons can reserve dense table layouts while data loads."
			code="<Skeleton class=&quot;h-8 w-full&quot; />"
		>
			<div class="max-w-xl space-y-2">
				<Skeleton class="h-8 w-full" />
				<Skeleton class="h-8 w-full" />
				<Skeleton class="h-8 w-10/12" />
			</div>
		</DemoCard>

		<DemoCard
			title="Form loading"
			description="Reserve label, input, and helper text space."
			code={`<Skeleton class="h-3 w-20" />
<Skeleton class="h-kl-field-md w-full" />`}
		>
			<div class="grid max-w-sm gap-2">
				<Skeleton class="h-3 w-20" />
				<Skeleton class="h-kl-field-md w-full" />
				<Skeleton class="h-3 w-48" />
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
