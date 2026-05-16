<script lang="ts">
	import { DateRangeField } from '$ui/date-range-field';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { CalendarDate } from '@internationalized/date';

	let value = $state({
		start: new CalendarDate(2026, 5, 14),
		end: new CalendarDate(2026, 5, 18)
	});
	let constrainedValue = $state({
		start: new CalendarDate(2026, 5, 20),
		end: new CalendarDate(2026, 5, 24)
	});
	let localizedValue = $state({
		start: new CalendarDate(2026, 7, 1),
		end: new CalendarDate(2026, 7, 15)
	});

	const minDate = new CalendarDate(2026, 5, 1);
	const maxDate = new CalendarDate(2026, 5, 30);

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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Range field"
			description="Supports bind:value."
			code="<DateRangeField bind:value={value} />"
		>
			<div class="space-y-3">
				<DateRangeField bind:value label="Booking window" />
				<p class="text-kl-muted-content text-sm">
					{value.start?.toString()} to {value.end?.toString()}
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Named form inputs"
			description="Submit start and end values through separate hidden inputs."
			code={`<DateRangeField
  startName="starts_at"
  endName="ends_at"
  label="Campaign dates"
  required
/>`}
		>
			<DateRangeField
				startName="starts_at"
				endName="ends_at"
				label="Campaign dates"
				placeholder={new CalendarDate(2026, 5, 1)}
				required
			/>
		</DemoCard>

		<DemoCard
			title="Constrained sprint"
			description="Keep ranges inside a planning month."
			code={`<DateRangeField
  bind:value={value}
  minValue={minDate}
  maxValue={maxDate}
/>`}
		>
			<DateRangeField
				bind:value={constrainedValue}
				label="Sprint"
				minValue={minDate}
				maxValue={maxDate}
			/>
		</DemoCard>

		<DemoCard
			title="Localized review"
			description="Render localized segments while preventing edits."
			code={`<DateRangeField
  value={value}
  locale="fr-FR"
  readonly
/>`}
		>
			<DateRangeField value={localizedValue} label="Vacation" locale="fr-FR" readonly />
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
