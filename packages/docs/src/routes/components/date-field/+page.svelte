<script lang="ts">
	import { DateField } from '$ui/date-field';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { CalendarDate } from '@internationalized/date';

	let value = $state(new CalendarDate(2026, 5, 14));
	let constrainedValue = $state(new CalendarDate(2026, 5, 20));
	let localizedValue = $state(new CalendarDate(2026, 12, 5));

	const minDate = new CalendarDate(2026, 5, 1);
	const maxDate = new CalendarDate(2026, 5, 31);

	const propsData = [
		{
			name: 'value',
			type: 'DateValue | undefined',
			default: '-',
			description: 'Date value. Supports bind:value.'
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
			description: 'Require form value.'
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
			type: '(value: DateValue | undefined) => void',
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
		<h1 class="text-3xl font-bold">DateField</h1>
		<p class="text-kl-muted-content mt-2">Segmented date input without a calendar popover.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Field"
			description="Editable date segments."
			code="<DateField bind:value={value} />"
		>
			<div class="space-y-3">
				<DateField bind:value label="Start date" class="max-w-sm" />
				<p class="text-kl-muted-content text-sm">Selected: {value.toString()}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Required form field"
			description="Forward names to native form data with a visible required label."
			code={`<DateField
  name="contract-start"
  label="Contract start"
  required
/>`}
		>
			<DateField
				name="contract-start"
				label="Contract start"
				placeholder={new CalendarDate(2026, 5, 1)}
				required
				class="max-w-sm"
			/>
		</DemoCard>

		<DemoCard
			title="Constrained month"
			description="Limit edits to a valid business window."
			code={`<DateField
  bind:value={value}
  minValue={minDate}
  maxValue={maxDate}
/>`}
		>
			<DateField
				bind:value={constrainedValue}
				label="Billing date"
				minValue={minDate}
				maxValue={maxDate}
				class="max-w-sm"
			/>
		</DemoCard>

		<DemoCard
			title="Localized readonly"
			description="Use locale and readonly for review screens."
			code={`<DateField
  value={value}
  locale="fr-FR"
  readonly
/>`}
		>
			<DateField
				value={localizedValue}
				label="Renewal date"
				locale="fr-FR"
				readonly
				class="max-w-sm"
			/>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
