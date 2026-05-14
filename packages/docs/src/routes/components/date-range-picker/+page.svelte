<script lang="ts">
	import { DateRangePicker } from '$ui/date-range-picker';
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
			description: 'Range value. Supports bind:value.'
		},
		{
			name: 'startName',
			type: 'string',
			default: '-',
			description: 'Start hidden input name.'
		},
		{
			name: 'endName',
			type: 'string',
			default: '-',
			description: 'End hidden input name.'
		},
		{
			name: 'placeholder',
			type: 'DateValue',
			default: '-',
			description: 'Placeholder date and format source.'
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
			description: 'Prevent editing.'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Require form values.'
		},
		{
			name: 'closeOnRangeSelect',
			type: 'boolean',
			default: 'true',
			description: 'Close popover after selecting a range.'
		},
		{
			name: 'minValue',
			type: 'DateValue',
			default: '-',
			description: 'Minimum allowed date.'
		},
		{
			name: 'maxValue',
			type: 'DateValue',
			default: '-',
			description: 'Maximum allowed date.'
		},
		{
			name: 'numberOfMonths',
			type: 'number',
			default: '2',
			description: 'Months shown in the popover.'
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
			name: 'ariaLabel',
			type: 'string',
			default: '-',
			description: 'Accessible label for the start input.'
		},
		{
			name: 'onValueChange',
			type: '(value: DateRange) => void',
			default: '-',
			description: 'Called when range changes.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional wrapper classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">DateRangePicker</h1>
		<p class="text-kl-muted-content mt-2">A range field with a calendar popover.</p>
	</div>
	<DemoCard
		title="Picker"
		description="Two-month range picker."
		code="<DateRangePicker bind:value={value} />"
	>
		<DateRangePicker bind:value class="max-w-lg" />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
