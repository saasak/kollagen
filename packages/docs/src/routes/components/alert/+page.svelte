<script lang="ts">
	import { Alert } from '$ui/alert';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Info } from 'lucide-svelte';

	const propsData = [
		{
			name: 'variant',
			type: "'base' | 'info' | 'success' | 'warning' | 'error'",
			default: "'base'",
			description: 'Semantic alert tone.'
		},
		{
			name: 'title',
			type: 'string',
			default: '-',
			description: 'Optional heading.'
		},
		{
			name: 'role',
			type: "'alert' | 'status' | 'note'",
			default: "'status'",
			description: 'Accessible landmark role.'
		},
		{
			name: 'icon',
			type: 'Snippet',
			default: '-',
			description: 'Optional leading icon.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Alert body content.'
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
		<h1 class="text-3xl font-bold">Alert</h1>
		<p class="text-kl-muted-content mt-2">A themed callout for contextual feedback.</p>
	</div>
	<DemoCard
		title="Basic"
		description="Semantic variants use Kollagen tokens."
		code="<Alert variant='info' title='Heads up'>Review the deployment window.</Alert>"
	>
		<Alert variant="info" title="Heads up">
			{#snippet icon()}<Info />{/snippet}
			Review the deployment window.
		</Alert>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
