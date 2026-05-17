<script lang="ts">
	import {
		FiltersInput,
		type FiltersInputConfig,
		type FiltersInputValues
	} from '$ui/filters-input';
	import { Badge } from '$ui/badge';
	import { Trigger } from '$ui/trigger';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { SlidersHorizontal } from 'lucide-svelte';

	const filters: FiltersInputConfig[] = [
		{
			id: 'status',
			label: 'Status',
			type: 'multi-select',
			values: [
				{ label: 'Active', value: 'active' },
				{ label: 'Paused', value: 'paused' },
				{ label: 'Churned', value: 'churned' }
			]
		},
		{
			id: 'plan',
			label: 'Plan',
			type: 'select',
			values: [
				{ label: 'Starter', value: 'starter' },
				{ label: 'Growth', value: 'growth' },
				{ label: 'Enterprise', value: 'enterprise' }
			]
		},
		{ id: 'owner', label: 'Owner', type: 'text', placeholder: 'Owner name' },
		{ id: 'trial', label: 'Trial', type: 'boolean', trueLabel: 'Trial', falseLabel: 'Paid' },
		{ id: 'mrr', label: 'MRR', type: 'number-range' },
		{ id: 'createdAt', label: 'Created', type: 'date-range' },
		{ id: 'contactedAt', label: 'Contacted after', type: 'time', hourCycle: 24 },
		{ id: 'supportWindow', label: 'Support window', type: 'time-range', hourCycle: 24 }
	];

	let value: FiltersInputValues = $state({});
	let submitted = $state('');
	const currentJson = $derived(JSON.stringify(value, null, 2));

	const propsData = [
		{
			name: 'filters',
			type: 'FiltersInputConfig[]',
			default: '-',
			description: 'Filter declarations to render.'
		},
		{
			name: 'value',
			type: 'FiltersInputValues',
			default: '{}',
			description: 'Current filter values. Supports bind:value.'
		},
		{
			name: 'onUpdate',
			type: '(value: FiltersInputValues) => void',
			default: '-',
			description: 'Called after filter values change.'
		},
		{
			name: 'name',
			type: 'string',
			default: '-',
			description: 'Hidden JSON input name. No hidden input is rendered when omitted.'
		},
		{
			name: 'form',
			type: 'string',
			default: '-',
			description: 'Associated form id for the hidden JSON input.'
		},
		{
			name: 'title',
			type: 'string',
			default: "'Filters'",
			description: 'Popover title and trigger label.'
		},
		{
			name: 'clearLabel',
			type: 'string',
			default: "'Clear filters'",
			description: 'Clear button label.'
		},
		{
			name: 'activeCount',
			type: 'number',
			default: 'derived from value',
			description: 'Active filter count passed to the trigger snippet.'
		},
		{
			name: 'side',
			type: "'top' | 'right' | 'bottom' | 'left'",
			default: "'bottom'",
			description: 'Popover side.'
		},
		{
			name: 'align',
			type: "'start' | 'center' | 'end'",
			default: "'start'",
			description: 'Popover alignment.'
		},
		{
			name: 'children',
			type: 'Snippet<[{ activeCount: number }]>',
			default: 'default trigger',
			description: 'Custom trigger snippet.'
		},
		{ name: 'class', type: 'string', default: '-', description: 'Additional popover classes.' }
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">FiltersInput</h1>
		<p class="text-kl-muted-content mt-2">
			A composable filter popover with bindable state and optional hidden JSON form output.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Controlled filters"
			description="Bind value to own the filter state outside any table."
			code={`<FiltersInput
  filters={filters}
  bind:value
/>`}
		>
			<div class="space-y-4">
				<FiltersInput {filters} bind:value />
				<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
					<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">Current value</div>
					<pre
						class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{currentJson}</pre>
				</div>
			</div>
		</DemoCard>

		<DemoCard
			title="Custom trigger"
			description="Override the trigger while keeping the filter popover state."
			code={`<FiltersInput filters={filters} bind:value>
  {#snippet children({ activeCount })}
    <Trigger variant="ghost">
      <SlidersHorizontal size={16} />
      Filters
      {#if activeCount > 0}
        <Badge color="primary">{activeCount}</Badge>
      {/if}
    </Trigger>
  {/snippet}
</FiltersInput>`}
		>
			<FiltersInput {filters} bind:value>
				{#snippet children({ activeCount })}
					<Trigger variant="ghost">
						<SlidersHorizontal size={16} />
						Filters
						{#if activeCount > 0}
							<Badge color="primary">{activeCount}</Badge>
						{/if}
					</Trigger>
				{/snippet}
			</FiltersInput>
		</DemoCard>

		<DemoCard
			title="Hidden JSON form value"
			description="Pass name to serialize clean filter values for native submission."
			code={`<form id="filters-form">
  <FiltersInput
    filters={filters}
    bind:value
    form="filters-form"
    name="segment"
  />
</form>`}
		>
			<form
				id="filters-form"
				class="space-y-4"
				onsubmit={(event) => {
					event.preventDefault();
					const data = new FormData(event.currentTarget);
					submitted = data.get('segment')?.toString() ?? '';
				}}
			>
				<FiltersInput {filters} bind:value form="filters-form" name="segment" />
				<button
					type="submit"
					class="rounded-kl-field bg-kl-primary text-kl-primary-content h-kl-field-sm inline-flex cursor-pointer items-center px-3 text-sm font-medium transition-opacity hover:opacity-90"
				>
					Submit
				</button>
				<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 overflow-hidden border">
					<div class="border-kl-base-300 border-b px-4 py-2 text-sm font-medium">
						Submitted JSON
					</div>
					<pre class="text-kl-muted-content overflow-x-auto p-4 font-mono text-xs">{submitted ||
							'{}'}</pre>
				</div>
			</form>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
