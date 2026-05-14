<script lang="ts">
	import { DateRangeField } from '$ui/date-range-field';
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
			name: 'label',
			type: 'string',
			default: '-',
			description: 'Visible label.'
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
			name: 'locale',
			type: 'string',
			default: "'en'",
			description: 'Formatting locale.'
		},
		{
			name: 'onValueChange',
			type: '(value: DateRange | undefined) => void',
			default: '-',
			description: 'Called when value changes.'
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
		<h1 class="text-3xl font-bold">DateRangeField</h1>
		<p class="text-kl-muted-content mt-2">Segmented start and end date inputs.</p>
	</div>
	<DemoCard
		title="Range field"
		description="Supports bind:value."
		code="<DateRangeField bind:value={value} />"
	>
		<DateRangeField bind:value label="Booking window" />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
