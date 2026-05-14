<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	const dayClass =
		'rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selection-start]:bg-kl-primary data-[selection-start]:text-kl-primary-content data-[selection-end]:bg-kl-primary data-[selection-end]:text-kl-primary-content data-[highlighted]:bg-kl-primary/15 data-[outside-month]:text-kl-muted-content data-[unavailable]:text-kl-muted-content data-[disabled]:text-kl-muted-content inline-flex size-10 items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:pointer-events-none data-[today]:font-semibold data-[unavailable]:line-through';
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
	class={cn(
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm inline-block border p-3',
		className
	)}
>
	{#snippet children({ months, weekdays })}
		<RangeCalendarPrimitive.Header class="mb-2 flex items-center justify-between">
			<RangeCalendarPrimitive.PrevButton
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150"
			>
				<ChevronLeft size={16} />
			</RangeCalendarPrimitive.PrevButton>
			<RangeCalendarPrimitive.Heading class="text-kl-base-content text-sm font-medium" />
			<RangeCalendarPrimitive.NextButton
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150"
			>
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
										<RangeCalendarPrimitive.Day class={dayClass}
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
