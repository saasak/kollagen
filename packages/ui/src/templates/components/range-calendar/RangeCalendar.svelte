<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { rangeCalendarVariants } from './RangeCalendar.variants';
	import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui';
	import type { DateRange } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Props {
		value?: DateRange;
		placeholder?: DateValue;
		disabled?: boolean;
		readonly?: boolean;
		minValue?: DateValue;
		maxValue?: DateValue;
		numberOfMonths?: number;
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		isDateUnavailable?: (date: DateValue) => boolean;
		isDateDisabled?: (date: DateValue) => boolean;
		locale?: string;
		onValueChange?: (value: DateRange) => void;
		class?: string;
	}

	let {
		value = $bindable({ start: undefined, end: undefined }),
		placeholder,
		disabled = false,
		readonly = false,
		minValue,
		maxValue,
		numberOfMonths = 2,
		weekStartsOn,
		isDateUnavailable,
		isDateDisabled,
		locale = 'en',
		onValueChange,
		class: className
	}: Props = $props();

	const classes = rangeCalendarVariants();
</script>

<RangeCalendarPrimitive.Root
	bind:value
	{placeholder}
	{disabled}
	{readonly}
	{minValue}
	{maxValue}
	{numberOfMonths}
	{weekStartsOn}
	{isDateUnavailable}
	{isDateDisabled}
	{locale}
	{onValueChange}
	weekdayFormat="short"
	fixedWeeks={true}
	class={cn(classes.root(), className)}
>
	{#snippet children({ months, weekdays })}
		<RangeCalendarPrimitive.Header class="mb-2 flex items-center justify-between">
			<RangeCalendarPrimitive.PrevButton class={classes.navButton()}>
				<ChevronLeft size={16} />
			</RangeCalendarPrimitive.PrevButton>
			<RangeCalendarPrimitive.Heading class="text-kl-base-content text-sm font-medium" />
			<RangeCalendarPrimitive.NextButton class={classes.navButton()}>
				<ChevronRight size={16} />
			</RangeCalendarPrimitive.NextButton>
		</RangeCalendarPrimitive.Header>
		<div class="flex flex-wrap gap-4">
			{#each months as month (month.value)}
				<RangeCalendarPrimitive.Grid class="w-full border-collapse space-y-1 select-none">
					<RangeCalendarPrimitive.GridHead>
						<RangeCalendarPrimitive.GridRow class="flex w-full justify-between">
							{#each weekdays as day (day)}
								<RangeCalendarPrimitive.HeadCell
									class="text-kl-muted-content w-10 text-center text-xs font-medium"
								>
									{day}
								</RangeCalendarPrimitive.HeadCell>
							{/each}
						</RangeCalendarPrimitive.GridRow>
					</RangeCalendarPrimitive.GridHead>
					<RangeCalendarPrimitive.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<RangeCalendarPrimitive.GridRow class="flex w-full">
								{#each weekDates as date (date)}
									<RangeCalendarPrimitive.Cell
										{date}
										month={month.value}
										class="relative size-10 p-0 text-center text-sm"
									>
										<RangeCalendarPrimitive.Day class={classes.day()}
											>{date.day}</RangeCalendarPrimitive.Day
										>
									</RangeCalendarPrimitive.Cell>
								{/each}
							</RangeCalendarPrimitive.GridRow>
						{/each}
					</RangeCalendarPrimitive.GridBody>
				</RangeCalendarPrimitive.Grid>
			{/each}
		</div>
	{/snippet}
</RangeCalendarPrimitive.Root>
