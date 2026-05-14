<script lang="ts">
	import { Spinner } from '$ui/spinner';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Spinner size.'
		},
		{
			name: 'label',
			type: 'string',
			default: "'Loading'",
			description: 'Accessible label.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional icon classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Spinner</h1>
		<p class="text-kl-muted-content mt-2">Inline loading indicator.</p>
	</div>
	<DemoCard title="Sizes" description="Three fixed sizes." code="<Spinner />">
		<div class="flex items-center gap-4">
			<Spinner size="sm" />
			<Spinner />
			<Spinner size="lg" />
		</div>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
