<script lang="ts">
	import { DatePicker } from '$ui/date-picker';
	import { parseDate, type DateValue } from '@internationalized/date';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledValue = $state<DateValue | undefined>();
	let formResult = $state('');

	const propsData = [
		{
			name: 'value',
			type: 'DateValue | undefined',
			default: '—',
			description: 'Controlled selected date. Supports bind:value'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission (on DatePicker.Input)'
		},
		{
			name: 'placeholder',
			type: 'DateValue',
			default: '—',
			description: 'Placeholder date controlling which month is displayed'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the date picker' },
		{
			name: 'readonly',
			type: 'boolean',
			default: 'false',
			description: 'Make the date picker read-only'
		},
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
		{
			name: 'closeOnDateSelect',
			type: 'boolean',
			default: 'true',
			description: 'Close calendar after selection'
		},
		{
			name: 'minValue',
			type: 'DateValue',
			default: '—',
			description: 'Minimum selectable date'
		},
		{
			name: 'maxValue',
			type: 'DateValue',
			default: '—',
			description: 'Maximum selectable date'
		},
		{
			name: 'numberOfMonths',
			type: 'number',
			default: '—',
			description: 'Number of months to display'
		},
		{
			name: 'weekStartsOn',
			type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
			default: '—',
			description: 'First day of the week (0=Sun, 1=Mon, ..., 6=Sat)'
		},
		{
			name: 'isDateUnavailable',
			type: '(date: DateValue) => boolean',
			default: '—',
			description: 'Function to mark specific dates as unavailable'
		},
		{
			name: 'isDateDisabled',
			type: '(date: DateValue) => boolean',
			default: '—',
			description: 'Function to check if a date is disabled'
		},
		{
			name: 'locale',
			type: 'string',
			default: '"en"',
			description: 'Locale for date formatting (BCP 47 tag)'
		},
		{
			name: 'onValueChange',
			type: '(value: DateValue | undefined) => void',
			default: '—',
			description: 'Callback when selected value changes'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">DatePicker</h1>
		<p class="text-kl-muted-content mt-2">
			Calendar-based date input with segment editing and popover calendar. Built on bits-ui.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Basic" description="Simple single-date picker." code="<DatePicker />">
			<div class="max-w-sm">
				<DatePicker />
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Controlled value with live state display."
			code={`<DatePicker bind:value={controlledValue} />`}
		>
			<div class="max-w-sm space-y-2">
				<DatePicker bind:value={controlledValue} />
				<p class="text-kl-muted-content text-sm">
					Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledValue ? controlledValue.toString() : '(none)'}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Min / Max constraints"
			description="Restricts selectable dates to a range."
			code={`import { parseDate } from "@internationalized/date";

<DatePicker
  minValue={parseDate("2025-01-01")}
  maxValue={parseDate("2025-12-31")}
/>`}
		>
			<div class="max-w-sm">
				<DatePicker minValue={parseDate('2025-01-01')} maxValue={parseDate('2025-12-31')} />
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Date picker in disabled state."
			code="<DatePicker disabled />"
		>
			<div class="max-w-sm">
				<DatePicker disabled />
			</div>
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <DatePicker name="date" />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="max-w-sm space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('date')?.toString() ?? '(empty)';
					}}
					class="space-y-3"
				>
					<DatePicker name="date" />
					<button
						type="submit"
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Submit
					</button>
				</form>
				{#if formResult}
					<p class="text-kl-muted-content text-sm">
						Submitted: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{formResult}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
