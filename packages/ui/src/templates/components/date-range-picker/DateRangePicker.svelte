<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangePicker } from 'bits-ui';
	import type { DateRange, SegmentPart } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';
	import { Calendar, ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Props {
		value?: DateRange;
		startName?: string;
		endName?: string;
		placeholder?: DateValue;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		closeOnRangeSelect?: boolean;
		minValue?: DateValue;
		maxValue?: DateValue;
		numberOfMonths?: number;
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		isDateUnavailable?: (date: DateValue) => boolean;
		isDateDisabled?: (date: DateValue) => boolean;
		locale?: string;
		ariaLabel?: string;
		onValueChange?: (value: DateRange) => void;
		class?: string;
	}

	let {
		value = $bindable({ start: undefined, end: undefined }),
		startName,
		endName,
		placeholder,
		disabled = false,
		readonly = false,
		required = false,
		closeOnRangeSelect = true,
		minValue,
		maxValue,
		numberOfMonths = 2,
		weekStartsOn,
		isDateUnavailable,
		isDateDisabled,
		locale = 'en',
		ariaLabel,
		onValueChange,
		class: className
	}: Props = $props();

	let open = $state(false);
	const fieldShellClass =
		'rounded-kl-field bg-kl-base-100 flex h-kl-field-md items-center border px-3 transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus-within:[--kl-input-border:var(--kl-primary)] focus-within:outline focus-within:outline-[var(--kl-input-border)]';
	const dayClass =
		'rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selection-start]:bg-kl-primary data-[selection-start]:text-kl-primary-content data-[selection-end]:bg-kl-primary data-[selection-end]:text-kl-primary-content data-[highlighted]:bg-kl-primary/15 data-[outside-month]:text-kl-muted-content data-[unavailable]:text-kl-muted-content data-[disabled]:text-kl-muted-content inline-flex size-10 items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:pointer-events-none data-[today]:font-semibold data-[unavailable]:line-through';
</script>

{#snippet inputSegments(segments: Array<{ part: SegmentPart; value: string }>)}
	{#each segments as { part, value: segmentValue }, i (part + i)}
		{#if part === 'literal'}
			<DateRangePicker.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
				{segmentValue}
			</DateRangePicker.Segment>
		{:else}
			<DateRangePicker.Segment
				{part}
				class="text-kl-base-content hover:bg-kl-base-200 focus:bg-kl-primary focus:text-kl-primary-content rounded-kl-selector px-0.5 text-sm outline-none"
			>
				{segmentValue}
			</DateRangePicker.Segment>
		{/if}
	{/each}
{/snippet}

<DateRangePicker.Root
	bind:value
	bind:open
	{placeholder}
	{disabled}
	{readonly}
	{required}
	{minValue}
	{maxValue}
	{numberOfMonths}
	{weekStartsOn}
	{isDateUnavailable}
	{isDateDisabled}
	{locale}
	{closeOnRangeSelect}
	{onValueChange}
	weekdayFormat="short"
	fixedWeeks={true}
>
	<div class={cn('relative w-full', className)}>
		<div class={cn(fieldShellClass, disabled && 'cursor-not-allowed opacity-50')}>
			<DateRangePicker.Input name={startName} type="start" aria-label={ariaLabel}>
				{#snippet children({ segments })}
					{@render inputSegments(segments)}
				{/snippet}
			</DateRangePicker.Input>
			<span class="text-kl-muted-content mx-2 text-sm">to</span>
			<DateRangePicker.Input name={endName} type="end">
				{#snippet children({ segments })}
					{@render inputSegments(segments)}
				{/snippet}
			</DateRangePicker.Input>
			<DateRangePicker.Trigger
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md ml-auto flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150"
			>
				<Calendar size={16} />
			</DateRangePicker.Trigger>
		</div>
	</div>

	<DateRangePicker.Content
		sideOffset={6}
		class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] border p-3"
	>
		<DateRangePicker.Calendar>
			{#snippet children({ months, weekdays })}
				<DateRangePicker.Header class="mb-2 flex items-center justify-between">
					<DateRangePicker.PrevButton
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150"
					>
						<ChevronLeft size={16} />
					</DateRangePicker.PrevButton>
					<DateRangePicker.Heading class="text-kl-base-content text-sm font-medium" />
					<DateRangePicker.NextButton
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150"
					>
						<ChevronRight size={16} />
					</DateRangePicker.NextButton>
				</DateRangePicker.Header>
				<div class="flex flex-wrap gap-4">
					{#each months as month (month.value)}
						<DateRangePicker.Grid class="w-full border-collapse space-y-1 select-none">
							<DateRangePicker.GridHead>
								<DateRangePicker.GridRow class="flex w-full justify-between">
									{#each weekdays as day (day)}
										<DateRangePicker.HeadCell
											class="text-kl-muted-content w-10 text-center text-xs font-medium"
										>
											{day}
										</DateRangePicker.HeadCell>
									{/each}
								</DateRangePicker.GridRow>
							</DateRangePicker.GridHead>
							<DateRangePicker.GridBody>
								{#each month.weeks as weekDates (weekDates)}
									<DateRangePicker.GridRow class="flex w-full">
										{#each weekDates as date (date)}
											<DateRangePicker.Cell
												{date}
												month={month.value}
												class="relative size-10 p-0 text-center text-sm"
											>
												<DateRangePicker.Day class={dayClass}>{date.day}</DateRangePicker.Day>
											</DateRangePicker.Cell>
										{/each}
									</DateRangePicker.GridRow>
								{/each}
							</DateRangePicker.GridBody>
						</DateRangePicker.Grid>
					{/each}
				</div>
			{/snippet}
		</DateRangePicker.Calendar>
	</DateRangePicker.Content>
</DateRangePicker.Root>
