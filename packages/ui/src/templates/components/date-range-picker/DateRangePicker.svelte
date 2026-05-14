<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { dateRangePickerVariants } from './DateRangePicker.variants';
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
	let classes = $derived(dateRangePickerVariants({ disabled }));
</script>

{#snippet inputSegments(segments: Array<{ part: SegmentPart; value: string }>)}
	{#each segments as { part, value: segmentValue }, i (part + i)}
		{#if part === 'literal'}
			<DateRangePicker.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
				{segmentValue}
			</DateRangePicker.Segment>
		{:else}
			<DateRangePicker.Segment {part} class={classes.segment()}>
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
		<div class={classes.fieldShell()}>
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
			<DateRangePicker.Trigger class={classes.trigger()}>
				<Calendar size={16} />
			</DateRangePicker.Trigger>
		</div>
	</div>

	<DateRangePicker.Content sideOffset={6} class={classes.content()}>
		<DateRangePicker.Calendar>
			{#snippet children({ months, weekdays })}
				<DateRangePicker.Header class="mb-2 flex items-center justify-between">
					<DateRangePicker.PrevButton class={classes.iconButton()}>
						<ChevronLeft size={16} />
					</DateRangePicker.PrevButton>
					<DateRangePicker.Heading class="text-kl-base-content text-sm font-medium" />
					<DateRangePicker.NextButton class={classes.iconButton()}>
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
												<DateRangePicker.Day class={classes.day()}>{date.day}</DateRangePicker.Day>
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
