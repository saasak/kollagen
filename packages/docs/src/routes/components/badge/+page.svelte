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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

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

		<DemoCard
			title="Status row"
			description="Pair solid and soft badges for operational tables."
			code={`<Badge color="success" variant="soft">Paid</Badge>
<Badge color="warning" variant="outline">Manual review</Badge>`}
		>
			<div class="flex flex-wrap items-center gap-2">
				<Badge color="success" variant="soft">Paid</Badge>
				<Badge color="warning" variant="outline">Manual review</Badge>
				<Badge color="base" variant="dash">Invoice #1048</Badge>
			</div>
		</DemoCard>

		<DemoCard
			title="Navigation count"
			description="Use small numeric badges for counters in navigation or filters."
			code={`<a class="flex items-center gap-2" href="/components/badge">
  Issues <Badge color="error">8</Badge>
</a>`}
		>
			<nav class="flex max-w-sm flex-col gap-1 text-sm">
				<a
					class="rounded-kl-field hover:bg-kl-base-200 flex items-center justify-between px-3 py-2"
					href="/components/badge"
				>
					<span>Inbox</span>
					<Badge color="primary">14</Badge>
				</a>
				<a
					class="rounded-kl-field bg-kl-base-200 flex items-center justify-between px-3 py-2"
					href="/components/badge"
				>
					<span>Incidents</span>
					<Badge color="error">3</Badge>
				</a>
			</nav>
		</DemoCard>

		<DemoCard
			title="Inline metadata"
			description="Keep dense record metadata scannable without adding a table."
			code={`<Badge variant="outline">Enterprise</Badge>
<Badge color="info" variant="soft">SLA: 99.9%</Badge>`}
		>
			<div class="rounded-kl-box border-kl-base-300 max-w-xl border p-4">
				<div class="flex flex-wrap items-center gap-2">
					<p class="mr-2 font-medium">Northstar Labs</p>
					<Badge variant="outline">Enterprise</Badge>
					<Badge color="info" variant="soft">SLA: 99.9%</Badge>
					<Badge color="success" variant="soft">Renewing</Badge>
				</div>
				<p class="text-kl-muted-content mt-2 text-sm">
					Account health, plan tier, and contract signals fit in one row.
				</p>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
