<script lang="ts">
	import { Item } from '$ui/item';
	import { Badge } from '$ui/badge';
	import { Button } from '$ui/button';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { CreditCard, FileText, UserRound } from 'lucide-svelte';

	const propsData = [
		{
			name: 'title',
			type: 'string',
			default: '-',
			description: 'Primary row text.'
		},
		{
			name: 'description',
			type: 'string',
			default: '-',
			description: 'Secondary row text.'
		},
		{
			name: 'media',
			type: 'Snippet',
			default: '-',
			description: 'Leading media.'
		},
		{
			name: 'actions',
			type: 'Snippet',
			default: '-',
			description: 'Trailing actions.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Custom body content.'
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
		<h1 class="text-3xl font-bold">Item</h1>
		<p class="text-kl-muted-content mt-2">A compact row for lists and settings.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Row"
			description="Supports media and action snippets."
			code="<Item title='Billing' />"
		>
			<Item title="Billing" description="Next invoice closes on May 30.">
				{#snippet actions()}<Badge color="success" variant="soft">Active</Badge>{/snippet}
			</Item>
		</DemoCard>

		<DemoCard
			title="Settings list"
			description="Use media snippets for recognizable rows."
			code={`<Item title="Payment method">
  {#snippet media()}<CreditCard />{/snippet}
</Item>`}
		>
			<div class="rounded-kl-box border-kl-base-300 max-w-xl divide-y border">
				<Item title="Payment method" description="Visa ending in 4242">
					{#snippet media()}
						<div class="rounded-kl-selector bg-kl-base-200 p-2">
							<CreditCard size={16} />
						</div>
					{/snippet}
				</Item>
				<Item title="Billing contact" description="finance@northstar.test">
					{#snippet media()}
						<div class="rounded-kl-selector bg-kl-base-200 p-2">
							<UserRound size={16} />
						</div>
					{/snippet}
				</Item>
			</div>
		</DemoCard>

		<DemoCard
			title="Action row"
			description="Place compact commands in the trailing actions slot."
			code={`<Item title="Contract">
  {#snippet actions()}<Button size="sm">Open</Button>{/snippet}
</Item>`}
		>
			<Item
				title="Contract"
				description="MSA signed May 12, 2026"
				class="border-kl-base-300 max-w-xl border"
			>
				{#snippet media()}
					<div class="rounded-kl-selector bg-kl-base-200 p-2">
						<FileText size={16} />
					</div>
				{/snippet}
				{#snippet actions()}<Button size="sm" variant="outline">Open</Button>{/snippet}
			</Item>
		</DemoCard>

		<DemoCard
			title="Custom body"
			description="Render extra metadata below title and description."
			code={`<Item title="Northstar Labs">
  <div class="flex gap-2">...</div>
</Item>`}
		>
			<Item
				title="Northstar Labs"
				description="Enterprise account"
				class="border-kl-base-300 max-w-xl border"
			>
				<div class="flex flex-wrap gap-2 pt-1">
					<Badge variant="soft" color="success">Healthy</Badge>
					<Badge variant="outline">Owner: Maya</Badge>
					<Badge variant="dash">Renewal: Jun 30</Badge>
				</div>
			</Item>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
