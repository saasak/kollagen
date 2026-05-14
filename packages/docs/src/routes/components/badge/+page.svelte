<script lang="ts">
	import { Badge } from '$ui/badge';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'soft' | 'dash'",
			default: "'solid'",
			description: 'Visual style.'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
			default: "'base'",
			description: 'Semantic color.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Badge content.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Badge</h1>
		<p class="text-kl-muted-content mt-2">Compact labels for metadata and status.</p>
	</div>
	<DemoCard
		title="Variants"
		description="Badges support semantic colors."
		code="<Badge color='primary'>Live</Badge>"
	>
		<div class="flex flex-wrap gap-2">
			<Badge color="primary">Live</Badge>
			<Badge color="success" variant="soft">Healthy</Badge>
			<Badge color="warning" variant="outline">Pending</Badge>
			<Badge color="error" variant="dash">Blocked</Badge>
		</div>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
