<script lang="ts">
	import { Toolbar, Button as ToolbarButton } from '$ui/toolbar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Bold, Italic } from 'lucide-svelte';

	const propsData = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Toolbar direction.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Toolbar controls.'
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
		<h1 class="text-3xl font-bold">Toolbar</h1>
		<p class="text-kl-muted-content mt-2">Keyboard-aware toolbar primitive.</p>
	</div>
	<DemoCard
		title="Formatting"
		description="Use exported internals for commands."
		code="<Toolbar><ToolbarButton /></Toolbar>"
	>
		<Toolbar>
			<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2"
				><Bold size={16} /></ToolbarButton
			>
			<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2"
				><Italic size={16} /></ToolbarButton
			>
		</Toolbar>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
