<script lang="ts">
	import { Progress } from '$ui/progress';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'value',
			type: 'number | null',
			default: '0',
			description: 'Current value, or null for indeterminate.'
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
			default: "'Progress'",
			description: 'Accessible label.'
		},
		{
			name: 'color',
			type: "'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
			default: "'primary'",
			description: 'Indicator color.'
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
		<h1 class="text-3xl font-bold">Progress</h1>
		<p class="text-kl-muted-content mt-2">Task completion indicator.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Upload" description="Determinate progress." code="<Progress value={64} />">
			<Progress value={64} class="max-w-sm" />
		</DemoCard>

		<DemoCard
			title="Indeterminate"
			description="Use null when work is active but the percentage is unknown."
			code="<Progress value={null} label='Syncing records' />"
		>
			<div class="max-w-sm space-y-2">
				<p class="text-sm font-medium">Syncing records</p>
				<Progress value={null} label="Syncing records" />
			</div>
		</DemoCard>

		<DemoCard
			title="Semantic colors"
			description="Choose color by task type instead of current percentage."
			code={`<Progress value={72} color="success" />
<Progress value={38} color="warning" />
<Progress value={12} color="error" />`}
		>
			<div class="grid max-w-md gap-4">
				<Progress value={72} color="success" label="Import complete" />
				<Progress value={38} color="warning" label="Review progress" />
				<Progress value={12} color="error" label="Failed rows" />
			</div>
		</DemoCard>

		<DemoCard
			title="Custom range"
			description="Use min and max for step-based flows."
			code={`<Progress value={3} min={0} max={5} label="Onboarding" />`}
		>
			<div class="max-w-sm space-y-2">
				<div class="flex justify-between text-sm">
					<span>Onboarding</span>
					<span class="text-kl-muted-content">3 of 5</span>
				</div>
				<Progress value={3} min={0} max={5} label="Onboarding" />
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
