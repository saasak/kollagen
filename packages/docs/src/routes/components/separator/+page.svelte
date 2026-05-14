<script lang="ts">
	import { Separator } from '$ui/separator';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Separator direction.'
		},
		{
			name: 'decorative',
			type: 'boolean',
			default: 'true',
			description: 'Hide from assistive technology.'
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
		<h1 class="text-3xl font-bold">Separator</h1>
		<p class="text-kl-muted-content mt-2">Visual or semantic content separation.</p>
	</div>
	<DemoCard title="Section" description="Horizontal separator." code="<Separator />">
		<div class="max-w-sm space-y-3">
			<p class="text-sm">Account</p>
			<Separator />
			<p class="text-kl-muted-content text-sm">Billing and profile settings.</p>
		</div>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
