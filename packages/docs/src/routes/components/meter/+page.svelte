<script lang="ts">
	import { Meter } from '$ui/meter';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'value',
			type: 'number',
			default: '0',
			description: 'Current meter value.'
		},
		{
			name: 'min',
			type: 'number',
			default: '0',
			description: 'Minimum value.'
		},
		{
			name: 'max',
			type: 'number',
			default: '100',
			description: 'Maximum value.'
		},
		{
			name: 'label',
			type: 'string',
			default: "'Meter'",
			description: 'Accessible label.'
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
		<h1 class="text-3xl font-bold">Meter</h1>
		<p class="text-kl-muted-content mt-2">A scalar measurement indicator.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Usage" description="Tone changes by value." code="<Meter value={72} />">
			<Meter value={72} class="max-w-sm" />
		</DemoCard>

		<DemoCard
			title="Health score"
			description="Low, medium, and high values map to semantic tones."
			code={`<Meter value={24} label="Poor health" />
<Meter value={58} label="At risk health" />
<Meter value={91} label="Healthy" />`}
		>
			<div class="grid max-w-md gap-4">
				<div class="space-y-1">
					<p class="text-sm font-medium">Poor health</p>
					<Meter value={24} label="Poor health" />
				</div>
				<div class="space-y-1">
					<p class="text-sm font-medium">At risk health</p>
					<Meter value={58} label="At risk health" />
				</div>
				<div class="space-y-1">
					<p class="text-sm font-medium">Healthy</p>
					<Meter value={91} label="Healthy" />
				</div>
			</div>
		</DemoCard>

		<DemoCard
			title="Custom scale"
			description="Use min and max for non-percent metrics."
			code={`<Meter value={420} min={0} max={500} label="API quota" />`}
		>
			<div class="max-w-sm space-y-1">
				<div class="flex justify-between text-sm">
					<span>API quota</span>
					<span class="text-kl-muted-content">420 / 500</span>
				</div>
				<Meter value={420} min={0} max={500} label="API quota" />
			</div>
		</DemoCard>

		<DemoCard
			title="Dashboard stack"
			description="Stack multiple meters for compact operational summaries."
			code={`<Meter value={82} label="Storage" />
<Meter value={41} label="Seats" />`}
		>
			<div class="grid max-w-lg gap-3 sm:grid-cols-2">
				<div class="rounded-kl-box border-kl-base-300 border p-3">
					<p class="text-sm font-medium">Storage</p>
					<Meter value={82} label="Storage" class="mt-2" />
				</div>
				<div class="rounded-kl-box border-kl-base-300 border p-3">
					<p class="text-sm font-medium">Seats</p>
					<Meter value={41} label="Seats" class="mt-2" />
				</div>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
