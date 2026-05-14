<script lang="ts">
	import { Alert } from '$ui/alert';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Info } from 'lucide-svelte';

	const alertVariants = ['solid', 'outline', 'dash', 'soft', 'ghost'] as const;
	const alertColors = [
		'base',
		'neutral',
		'primary',
		'secondary',
		'accent',
		'info',
		'success',
		'warning',
		'error'
	] as const;

	const propsData = [
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'dash' | 'soft' | 'ghost'",
			default: "'soft'",
			description: 'Visual alert style.'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
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
		description="Semantic colors and visual variants use Kollagen tokens."
		code="<Alert color='info' title='Heads up'>Review the deployment window.</Alert>"
	>
		<Alert color="info" title="Heads up">
			{#snippet icon()}<Info />{/snippet}
			Review the deployment window.
		</Alert>
	</DemoCard>

	<DemoCard
		title="Variants"
		description="Choose the visual treatment independently from the semantic color."
		code={`<Alert variant="solid" color="info" title="Solid">...</Alert>
<Alert variant="outline" color="info" title="Outline">...</Alert>
<Alert variant="dash" color="info" title="Dash">...</Alert>
<Alert variant="soft" color="info" title="Soft">...</Alert>
<Alert variant="ghost" color="info" title="Ghost">...</Alert>`}
	>
		<div class="grid gap-3 md:grid-cols-2">
			{#each alertVariants as variant (variant)}
				<Alert {variant} color="info" title={`${variant[0].toUpperCase()}${variant.slice(1)}`}>
					{#snippet icon()}<Info />{/snippet}
					Independent variant styling with the same status tone.
				</Alert>
			{/each}
		</div>
	</DemoCard>

	<DemoCard
		title="Colors"
		description="Semantic tones use the same variant API."
		code={`<Alert variant="soft" color="success" title="Success">...</Alert>
<Alert variant="soft" color="warning" title="Warning">...</Alert>
<Alert variant="soft" color="error" title="Error">...</Alert>`}
	>
		<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
			{#each alertColors as color (color)}
				<Alert {color} title={`${color[0].toUpperCase()}${color.slice(1)}`}>
					Theme-aware alert tone.
				</Alert>
			{/each}
		</div>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
