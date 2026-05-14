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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
