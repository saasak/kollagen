<script lang="ts">
	import { TimeRangeField } from '$ui/time-range-field';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Time } from '@internationalized/date';

	let value = $state({
		start: new Time(9, 0),
		end: new Time(17, 30)
	});

	const propsData = [
		{
			name: 'value',
			type: 'TimeRange',
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
			type: 'TimeValue',
			default: '-',
			description: 'Placeholder time and format source.'
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
			type: 'TimeValue',
			default: '-',
			description: 'Minimum allowed time.'
		},
		{
			name: 'maxValue',
			type: 'TimeValue',
			default: '-',
			description: 'Maximum allowed time.'
		},
		{
			name: 'locale',
			type: 'string',
			default: "'en'",
			description: 'Formatting locale.'
		},
		{
			name: 'hourCycle',
			type: '12 | 24',
			default: '-',
			description: 'Clock format.'
		},
		{
			name: 'granularity',
			type: "'hour' | 'minute' | 'second'",
			default: "'minute'",
			description: 'Visible time precision.'
		},
		{
			name: 'hideTimeZone',
			type: 'boolean',
			default: 'false',
			description: 'Hide the timezone segment.'
		},
		{
			name: 'readonlySegments',
			type: 'EditableTimeSegmentPart[]',
			default: '[]',
			description: 'Segments that cannot be edited.'
		},
		{
			name: 'onValueChange',
			type: '(value: TimeRange | undefined) => void',
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
		<h1 class="text-3xl font-bold">TimeRangeField</h1>
		<p class="text-kl-muted-content mt-2">Segmented start and end time inputs.</p>
	</div>
	<DemoCard
		title="Range field"
		description="Supports bind:value."
		code="<TimeRangeField bind:value={value} />"
	>
		<TimeRangeField bind:value label="Working hours" />
	</DemoCard>

	<DemoCard
		title="24-hour range"
		description="Use hourCycle for compact operational forms."
		code={`<TimeRangeField bind:value={value} hourCycle={24} />`}
	>
		<TimeRangeField bind:value label="Shift window" hourCycle={24} />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
