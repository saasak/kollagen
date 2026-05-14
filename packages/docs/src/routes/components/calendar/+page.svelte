<script lang="ts">
	import { Calendar } from '$ui/calendar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { CalendarDate } from '@internationalized/date';

	let value = $state(new CalendarDate(2026, 5, 14));

	const propsData = [
		{
			name: 'value',
			type: 'DateValue | undefined',
			default: '-',
			description: 'Selected date. Supports bind:value.'
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
			name: 'preventDeselect',
			type: 'boolean',
			default: 'false',
			description: 'Prevent clearing selected date.'
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
			default: '-',
			description: 'Months shown at once.'
		},
		{
			name: 'weekStartsOn',
			type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
			default: '-',
			description: 'First day of week.'
		},
		{
			name: 'isDateUnavailable',
			type: '(date: DateValue) => boolean',
			default: '-',
			description: 'Mark dates unavailable.'
		},
		{
			name: 'isDateDisabled',
			type: '(date: DateValue) => boolean',
			default: '-',
			description: 'Disable dates.'
		},
		{
			name: 'locale',
			type: 'string',
			default: "'en'",
			description: 'Formatting locale.'
		},
		{
			name: 'onValueChange',
			type: '(value: DateValue | undefined) => void',
			default: '-',
			description: 'Called when selected date changes.'
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
		<h1 class="text-3xl font-bold">Calendar</h1>
		<p class="text-kl-muted-content mt-2">A single-date calendar built with Bits UI.</p>
	</div>
	<DemoCard
		title="Single date"
		description="Supports bind:value."
		code="<Calendar bind:value={value} />"
	>
		<Calendar bind:value />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
