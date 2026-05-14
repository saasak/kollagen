<script lang="ts">
	import { Kbd } from '$ui/kbd';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Key label.'
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
		<h1 class="text-3xl font-bold">Kbd</h1>
		<p class="text-kl-muted-content mt-2">Keyboard input tokens.</p>
	</div>
	<DemoCard title="Shortcut" description="Use inside help text and menus." code="<Kbd>⌘</Kbd>">
		<div class="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
