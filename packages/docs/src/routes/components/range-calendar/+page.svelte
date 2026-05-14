<script lang="ts">
	import { RangeCalendar } from '$ui/range-calendar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { CalendarDate } from '@internationalized/date';

	let value = $state({
		start: new CalendarDate(2026, 5, 14),
		end: new CalendarDate(2026, 5, 18)
	});

	const propsData = [
		{
			name: 'value',
			type: 'DateRange',
			default: '{ start: undefined, end: undefined }',
			description: 'Selected range. Supports bind:value.'
		},
		{
			name: 'placeholder',
			type: 'DateValue',
			default: '-',
			description: 'Calendar view placeholder.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable interaction.'
		},
		{
			name: 'readonly',
			type: 'boolean',
			default: 'false',
			description: 'Allow focus but prevent selection.'
		},
		{
			name: 'minValue',
			type: 'DateValue',
			default: '-',
			description: 'Minimum selectable date.'
		},
		{
			name: 'maxValue',
			type: 'DateValue',
			default: '-',
			description: 'Maximum selectable date.'
		},
		{
			name: 'numberOfMonths',
			type: 'number',
			default: '2',
			description: 'Months shown at once.'
		},
		{
			name: 'weekStartsOn',
			type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
			default: '-',
			description: 'First day of week.'
		},
		{
			name: 'locale',
			type: 'string',
			default: "'en'",
			description: 'Formatting locale.'
		},
		{
			name: 'onValueChange',
			type: '(value: DateRange) => void',
			default: '-',
			description: 'Called when selected range changes.'
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
		<h1 class="text-3xl font-bold">RangeCalendar</h1>
		<p class="text-kl-muted-content mt-2">Date range selection calendar.</p>
	</div>
	<DemoCard
		title="Range"
		description="Two-month range selection."
		code="<RangeCalendar bind:value={value} />"
	>
		<RangeCalendar bind:value />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
