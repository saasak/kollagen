<script lang="ts">
	import { TimeField } from '$ui/time-field';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Time } from '@internationalized/date';

	let value = $state(new Time(9, 30));
	let constrainedValue = $state(new Time(14, 15));
	let readonlyValue = $state(new Time(18, 0));

	const minTime = new Time(9, 0);
	const maxTime = new Time(17, 30);

	const propsData = [
		{
			name: 'value',
			type: 'TimeValue | undefined',
			default: '-',
			description: 'Time value. Supports bind:value.'
		},
		{
			name: 'name',
			type: 'string',
			default: '-',
			description: 'Hidden input name for forms.'
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
			description: 'Require form value.'
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
			type: '(value: TimeValue | undefined) => void',
			default: '-',
			description: 'Called when value changes.'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: '-',
			description: 'Accessible label when no visible label is provided.'
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
		<h1 class="text-3xl font-bold">TimeField</h1>
		<p class="text-kl-muted-content mt-2">Segmented time input without a popover.</p>
	</div>
	<DemoCard
		title="Field"
		description="Editable time segments."
		code="<TimeField bind:value={value} />"
	>
		<TimeField bind:value label="Start time" class="max-w-sm" />
	</DemoCard>

	<DemoCard
		title="Seconds"
		description="Adjust visible precision with granularity."
		code={`<TimeField bind:value={value} granularity="second" hourCycle={24} />`}
	>
		<TimeField
			bind:value
			label="Precise time"
			granularity="second"
			hourCycle={24}
			class="max-w-sm"
		/>
	</DemoCard>

	<DemoCard
		title="Business hours"
		description="Constrain editing to a valid time window."
		code={`<TimeField
  bind:value={value}
  minValue={minTime}
  maxValue={maxTime}
  hourCycle={24}
/>`}
	>
		<TimeField
			bind:value={constrainedValue}
			label="Support starts"
			minValue={minTime}
			maxValue={maxTime}
			hourCycle={24}
			class="max-w-sm"
		/>
	</DemoCard>

	<DemoCard
		title="Named readonly field"
		description="Use readonly when the value is submitted or reviewed but not edited."
		code={`<TimeField
  name="cutoff"
  value={value}
  readonly
/>`}
	>
		<TimeField
			name="cutoff"
			value={readonlyValue}
			label="Daily cutoff"
			readonly
			hourCycle={24}
			class="max-w-sm"
		/>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
