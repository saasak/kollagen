<script lang="ts">
	import { RangeCalendar } from '$ui/range-calendar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { CalendarDate, type DateValue } from '@internationalized/date';

	let value = $state({
		start: new CalendarDate(2026, 5, 14),
		end: new CalendarDate(2026, 5, 18)
	});
	let constrainedValue = $state({
		start: new CalendarDate(2026, 6, 8),
		end: new CalendarDate(2026, 6, 12)
	});
	let singleMonthValue = $state({
		start: new CalendarDate(2026, 8, 3),
		end: new CalendarDate(2026, 8, 7)
	});

	const minDate = new CalendarDate(2026, 6, 1);
	const maxDate = new CalendarDate(2026, 6, 30);

	function isBlockedDate(date: DateValue) {
		return date.toString() === '2026-06-15' || date.toString() === '2026-06-16';
	}

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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Range"
			description="Two-month range selection."
			code="<RangeCalendar bind:value={value} />"
		>
			<div class="space-y-3">
				<RangeCalendar bind:value />
				<p class="text-kl-muted-content text-sm">
					{value.start?.toString()} to {value.end?.toString()}
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Constrained month"
			description="Limit selectable dates while showing the full calendar."
			code={`<RangeCalendar
  bind:value={value}
  minValue={minDate}
  maxValue={maxDate}
/>`}
		>
			<RangeCalendar bind:value={constrainedValue} minValue={minDate} maxValue={maxDate} />
		</DemoCard>

		<DemoCard
			title="Single month"
			description="Use one visible month for compact side panels."
			code={`<RangeCalendar bind:value={value} numberOfMonths={1} />`}
		>
			<RangeCalendar bind:value={singleMonthValue} numberOfMonths={1} />
		</DemoCard>

		<DemoCard
			title="Unavailable dates"
			description="Block maintenance or sold-out dates from the selected range."
			code={`<RangeCalendar
  bind:value={value}
  isDateUnavailable={isBlockedDate}
/>`}
		>
			<RangeCalendar bind:value isDateUnavailable={isBlockedDate} />
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
